import type { Permission } from "@/lib/auth";

interface PermissionChipProps {
  permission: Permission;
}

export function PermissionChip({ permission }: PermissionChipProps) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface px-2 py-0.5 font-mono text-xs text-muted">
      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
      {permission}
    </span>
  );
}