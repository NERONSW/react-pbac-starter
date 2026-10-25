import { getCurrentUser } from "@/lib/auth";
import { PermissionChip } from "@/components/PermissionChip";

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function ProfilePage() {
  const user = getCurrentUser();
  if (!user) return null;

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-bold tracking-tight">Your profile</h1>
      <p className="mt-2 text-muted">
        How this account is identified and what it can access.
      </p>

      <div className="mt-8 flex items-center gap-4">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-lg font-semibold text-accent">
          {initials(user.name)}
        </span>
        <div>
          <p className="text-lg font-semibold">{user.name}</p>
          <p className="text-sm text-muted">{user.email}</p>
        </div>
      </div>

      <dl className="mt-8 grid grid-cols-2 gap-6 border-y border-line py-5">
        <div>
          <dt className="text-sm text-muted">Role</dt>
          <dd className="mt-1 text-sm font-medium">{user.role}</dd>
        </div>
        <div>
          <dt className="text-sm text-muted">Account id</dt>
          <dd className="mt-1 font-mono text-sm text-muted">{user.id}</dd>
        </div>
      </dl>

      <section className="mt-8">
        <h2 className="text-sm text-muted">Permissions</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {user.permissions.map((permission) => (
            <PermissionChip key={permission} permission={permission} />
          ))}
        </div>
      </section>
    </div>
  );
}