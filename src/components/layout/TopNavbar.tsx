import { Link, useLocation, useNavigate } from "react-router-dom";
import { KeyRound, LogOut } from "lucide-react";
import { getCurrentUser, mockLogout } from "@/lib/auth";
import { NAVIGATION_ITEMS } from "@/config/navigation";

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function TopNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getCurrentUser();

  const navItems = NAVIGATION_ITEMS.filter((item) =>
    user?.permissions.includes(item.requiredPermission),
  );

  function handleLogout() {
    mockLogout();
    navigate("/");
  }

  return (
    <header className="flex items-center justify-between border-b border-line bg-paper px-6 py-3">
      <Link to="/" className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-paper">
          <KeyRound className="h-4 w-4" aria-hidden="true" />
        </span>
        <span className="text-sm font-bold tracking-tight">PBAC</span>
        <span className="text-xs text-muted">access demo</span>
      </Link>

      <nav
        aria-label="Primary"
        className="hidden flex-1 items-center justify-center gap-1 md:flex"
      >
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;

          return (
            <Link
              key={item.href}
              to={item.href}
              aria-current={isActive ? "page" : undefined}
              className={[
                "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-accent-soft text-accent"
                  : "text-muted hover:bg-surface hover:text-ink",
              ].join(" ")}
            >
              {item.title}
            </Link>
          );
        })}
      </nav>

      {user ? (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-strong text-xs font-semibold text-ink">
              {initials(user.name)}
            </span>
            <div className="text-right leading-tight">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted">{user.role}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface hover:text-ink"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Log out
          </button>
        </div>
      ) : (
        <Link to="/" className="text-sm font-medium text-accent hover:text-accent-strong">
          Sign in
        </Link>
      )}
    </header>
  );
}