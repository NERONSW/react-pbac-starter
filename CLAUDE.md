# React + Vite PBAC Boilerplate — Claude Code Guidelines

## 1. Primary Commands

- **Dev Server:** `npm run dev`
- **Build:** `npm run build`
- **Type Check:** `tsc --noEmit`
- **Lint:** `npm run lint`

## 2. Protected Foundation Rules & Design System

- **Design System Rules:** Strictly adhere to established Tailwind CSS conventions and UI guidelines. Do not introduce arbitrary inline hex colors outside defined theme tokens.
- **CSS & Styling:** Core Tailwind directives and global styles reside in `src/index.css`. Do NOT modify global setup without explicit permission.
- **Dependencies:** Core packages (`react-router-dom`, `lucide-react`) are installed. Do NOT run package installation commands or modify `package.json` without asking for explicit permission first.
- **Package Manager:** Exclusively use `npm` (or project-defined manager) for script execution.

## 3. Security Architecture (PBAC)

- **Permission Model:** This project uses **Permission-Based Access Control (PBAC)**, not Role-Based (RBAC).
- **Permission Format:** Strings follow the `resource:action` pattern (e.g., `dashboard:read`, `users:write`, `settings:read`).
- **Navigation Mapping:** Every item in `src/config/navigation.ts` MUST include an explicit `requiredPermission`.
- **Route Guarding:** Client-side protection is enforced via the custom `<ProtectedRoute requiredPermission="..." />` component wrapper around `react-router-dom` routes.

## 4. Directory Architecture & Conventions

Always adhere strictly to this standard Vite + React SPA tree inside `src/`:

```text
src/
├── components/
│   ├── layout/            # TopNavbar.tsx, SideNavbar.tsx, Footer.tsx
│   └── ProtectedRoute.tsx # Client-side permission guard wrapper
├── config/
│   └── navigation.ts      # Centralized navigation items & permission maps
├── lib/
│   └── auth.ts            # Mock authentication, localStorage session & types
├── pages/
│   ├── LandingPage.tsx    # Landing / demo mock login page
│   ├── DashboardPage.tsx  # Main user dashboard view
│   ├── ProfilePage.tsx    # User profile view with permission chips
│   ├── UsersPage.tsx      # Admin user management view
│   ├── SettingsPage.tsx   # Super-admin system settings view
│   └── UnauthorizedPage.tsx # 403 access denied fallback page
├── App.tsx                # React Router setup & route definitions
├── main.tsx               # React root entry point
└── index.css              # Tailwind CSS imports & global styles
```
