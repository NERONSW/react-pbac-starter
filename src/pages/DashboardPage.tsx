import { Link } from "react-router-dom";
import { getCurrentUser } from "@/lib/auth";
import { NAVIGATION_ITEMS } from "@/config/navigation";

export default function DashboardPage() {
  const user = getCurrentUser();
  if (!user) return null;

  const first = user.name.split(" ")[0];
  const accessible = NAVIGATION_ITEMS.filter((item) =>
    user.permissions.includes(item.requiredPermission),
  );

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight">Welcome back, {first}.</h1>
      <p className="mt-2 text-muted">
        Signed in as <span className="font-medium text-ink">{user.role}</span>{" "}
        with {user.permissions.length} permissions.
      </p>

      <section className="mt-10">
        <h2 className="text-sm text-muted">Sections you can open</h2>
        <ul className="mt-3 divide-y divide-line border-y border-line">
          {accessible.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className="group flex items-center justify-between py-3"
              >
                <span className="text-sm font-medium text-ink transition-colors group-hover:text-accent">
                  {item.title}
                </span>
                <span className="font-mono text-xs text-muted">
                  {item.requiredPermission}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}