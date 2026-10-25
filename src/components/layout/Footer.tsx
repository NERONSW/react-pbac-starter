import { getCurrentUser } from "@/lib/auth";

export function Footer() {
  const user = getCurrentUser();

  return (
    <footer className="border-t border-line bg-paper px-6 py-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
        <p>Permission-based access control demo.</p>
        {user ? (
          <p>
            Signed in as <span className="font-medium text-ink">{user.role}</span>.
          </p>
        ) : null}
      </div>
    </footer>
  );
}