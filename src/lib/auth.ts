// Mock authentication, localStorage session, and PBAC types.

export type Permission =
  | "dashboard:read"
  | "profile:read"
  | "users:read"
  | "users:write"
  | "settings:read"
  | "settings:write";

export type PersonaKey = "user" | "admin" | "super-admin";

export interface MockUser {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: Permission[];
}

const STORAGE_KEY = "pbac:user";

export const MOCK_USERS: Record<PersonaKey, MockUser> = {
  user: {
    id: "user-1",
    name: "Alex Morgan",
    email: "alex@example.com",
    role: "User",
    permissions: ["dashboard:read", "profile:read"],
  },
  admin: {
    id: "admin-1",
    name: "Jamie Rivera",
    email: "jamie@example.com",
    role: "Admin",
    permissions: ["dashboard:read", "profile:read", "users:read", "users:write"],
  },
  "super-admin": {
    id: "super-admin-1",
    name: "Sam Chen",
    email: "sam@example.com",
    role: "Super Admin",
    permissions: [
      "dashboard:read",
      "profile:read",
      "users:read",
      "users:write",
      "settings:read",
      "settings:write",
    ],
  },
};

export function mockLogin(personaKey: PersonaKey): MockUser {
  const user = MOCK_USERS[personaKey];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  return user;
}

export function mockLogout(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function getCurrentUser(): MockUser | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as MockUser;
  } catch {
    return null;
  }
}

export function hasPermission(
  user: MockUser | null,
  permission: Permission,
): boolean {
  return user?.permissions.includes(permission) ?? false;
}