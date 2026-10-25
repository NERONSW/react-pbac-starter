import type { Permission } from "@/lib/auth";

export interface NavItem {
  title: string;
  href: string;
  requiredPermission: Permission;
}

export const NAVIGATION_ITEMS: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    requiredPermission: "dashboard:read",
  },
  {
    title: "Profile",
    href: "/profile",
    requiredPermission: "profile:read",
  },
  {
    title: "User Management",
    href: "/admin/users",
    requiredPermission: "users:read",
  },
  {
    title: "System Settings",
    href: "/super-admin/settings",
    requiredPermission: "settings:read",
  },
];