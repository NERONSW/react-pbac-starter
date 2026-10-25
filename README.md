# RouteShield — React + Vite Permission-Based Access Control (PBAC) Boilerplate

RouteShield is a lightweight, zero-dependency Permission-Based Access Control (PBAC) system built for **React 19 + Vite + Tailwind CSS**. It provides client-side route interception and dynamic UI component filtering using the `Resource:Action` permission model (`dashboard:read`, `users:write`).

It is designed to run seamlessly **without a backend during early UI development**, while offering a drop-in upgrade path when transitioning to a real authentication server or API.

## Table of Contents

1. [When to Use This Boilerplate](#when-to-use-this-boilerplate)
2. [How It Works](#how-it-works)
3. [Architecture & Copy/Paste Components](#architecture--copypaste-components)
4. [Getting Started (Local Development)](#getting-started-local-development)
5. [How to Use & Customize in Your Project](#how-to-use--customize-in-your-project)
6. [Migrating / Integrating with a Real Backend](#migrating--integrating-with-a-real-backend)

---

## When to Use This Boilerplate

- **Building Client-Side SPAs:** You are using React Router DOM in a Vite single-page application and need client-side route guards.
- **Role & Permission Systems:** Your app requires granular permission controls (e.g., standard users, account managers, admins, super admins).
- **Backend-Less Prototyping:** You want to design dynamic navbars and protected dashboard views before your backend team finishes the API or JWT setup.
- **Decoupled Security:** You want a clean separation between frontend presentation rules and backend data security.

---

## How It Works

RouteShield secures your React SPA across three complementary layers:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   1. Route Guard (<ProtectedRoute />)                  │
│   Intercepts React Router navigations before components render.        │
│   Checks local storage session and redirects unauthorized access.      │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   2. Central Config (src/config/navigation.ts)         │
│   Maps routes and UI links to required granular permission strings.    │
│   Example: '/admin/users'  --> 'users:read'                            │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│               3. Dynamic UI Layer (TopNavbar / SideNavbar)             │
│   Filters navigation items on the fly based on active permissions.     │
│   Only renders authorized links in the DOM.                            │
└────────────────────────────────────────────────────────────────────────┘
```

1. **The `Resource:Action` Format:** Every privilege is expressed as a permission string formatted as `resource:action` (e.g., `users:read`, `settings:write`).
2. **Client-Side Guard (`<ProtectedRoute />`):** Intercepts direct URL changes or deep-links. If a user tries to access a route without the required permission, they are immediately redirected to `/unauthorized`.
3. **Dynamic Menu Filtering:** The Top and Side Navbars inspect the user's active permissions array (`user.permissions`) and strip unauthorized links before rendering the DOM.

---

## Architecture & Copy/Paste Components

If you are incorporating RouteShield into an existing React + Vite project, copy over these core files:

```text
src/
├── lib/
│   └── auth.ts                <-- Mock authentication, localStorage session & types
├── config/
│   └── navigation.ts          <-- Central mapping of permissions to routes & nav items
├── components/
│   ├── ProtectedRoute.tsx     <-- Client-side route guard wrapper
│   └── layout/
│       ├── TopNavbar.tsx      <-- Permission-aware top navigation header
│       └── SideNavbar.tsx     <-- Permission-aware side navigation sidebar
└── pages/
    └── UnauthorizedPage.tsx   <-- 403 Access Denied fallback view
```

---

## Getting Started (Local Development)

### 1. Installation

Clone your project repository and install dependencies using `npm`:

```bash
npm install
```

### 2. Start the Development Server

```bash
npm run dev
```

Navigate to `http://localhost:5173` in your browser.

### 3. Testing Mock Personas

The public landing page (`src/pages/LandingPage.tsx`) contains quick-login buttons to test different access levels:

- **Standard User:** Receives `['dashboard:read', 'profile:read']`.
- **Admin:** Receives `['dashboard:read', 'profile:read', 'users:read', 'users:write']`.
- **Super Admin:** Receives all permissions including `['settings:read', 'settings:write']`.

---

## How to Use & Customize in Your Project

### 1. Adding a New Protected Route

To protect a new page (e.g., `/reports`), complete these steps:

1. **Define the permission in `src/lib/auth.ts`:**

   ```typescript
   export type Permission =
     | "dashboard:read"
     | "profile:read"
     | "users:read"
     | "users:write"
     | "reports:read" // <-- Added
     | "settings:read";
   ```

2. **Wrap the route in `src/App.tsx`:**

   ```tsx
   <Route
     path="/reports"
     element={
       <ProtectedRoute requiredPermission="reports:read">
         <ReportsPage />
       </ProtectedRoute>
     }
   />
   ```

### 2. Adding a Navigation Item

To display the new route in the dynamic sidebar/topbar:

```typescript
// src/config/navigation.ts
export const NAVIGATION_ITEMS: NavItem[] = [
  {
    title: "Reports",
    href: "/reports",
    requiredPermission: "reports:read",
  },
];
```

---

## Migrating / Integrating with a Real Backend

When transitioning from the mock setup to a real production backend (NestJS, Node/Express, Supabase, Auth0, etc.), **no refactoring of your UI component logic is required**.

Follow these integration steps:

### 1. Replace Mock Auth with Real API Login

Update `src/lib/auth.ts` to retrieve token and permission payloads from your authentication endpoint:

```typescript
export async function login(credentials: LoginPayload) {
  const response = await fetch("/api/v1/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  // Save backend session and permissions list
  localStorage.setItem("auth_token", data.token);
  localStorage.setItem("user_session", JSON.stringify(data.user));

  return data.user;
}
```

### 2. Pass Tokens in API Headers

Use an HTTP interceptor or fetch wrapper to send your JWT along with requests:

```typescript
export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem("auth_token");

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });
}
```

### 3. Enforce API-Level Authorization

Remember: Frontend route protection prevents unauthorized users from _seeing specific UI views_. True security requires enforcing permission checks on your backend server:

```typescript
// Example Node/Express Middleware
function requirePermission(permission: string) {
  return (req, res, next) => {
    if (!req.user.permissions.includes(permission)) {
      return res
        .status(403)
        .json({ error: "Forbidden: Insufficient permissions" });
    }
    next();
  };
}

app.get("/api/v1/users", requirePermission("users:read"), getUsersHandler);
```

---

## Command Reference

| Command           | Description                                  |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Starts local Vite development server         |
| `npm run build`   | Builds the application bundle for production |
| `npm run preview` | Previews local production build build        |
| `npm run lint`    | Runs ESLint analysis                         |
| `tsc --noEmit`    | Performs TypeScript type checks              |
