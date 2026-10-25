import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Users,
  Settings,
  type LucideIcon,
} from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { NAVIGATION_ITEMS } from "@/config/navigation";

const NAV_ICONS: Record<string, LucideIcon> = {
  "/dashboard": LayoutDashboard,
  "/profile": User,
  "/admin/users": Users,
  "/super-admin/settings": Settings,
};

export function SideNavbar() {
  const user = getCurrentUser();

  const items = NAVIGATION_ITEMS.filter((item) =>
    user?.permissions.includes(item.requiredPermission),
  );

  if (items.length === 0) {
    return null;
  }

  return (
    <aside className="w-52 shrink-0 border-r border-line bg-surface px-3 py-6 md:w-60">
      <nav aria-label="Primary">
        <ul className="flex flex-col gap-1">
          {items.map((item) => {
            const Icon = NAV_ICONS[item.href] ?? LayoutDashboard;

            return (
              <li key={item.href}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    [
                      "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-accent-soft text-accent"
                        : "text-muted hover:bg-surface-strong hover:text-ink",
                    ].join(" ")
                  }
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {item.title}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}