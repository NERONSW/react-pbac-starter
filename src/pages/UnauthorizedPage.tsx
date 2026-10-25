import { Link, useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";

export default function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent">
          <Lock className="h-5 w-5" aria-hidden="true" />
        </span>
        <p className="mt-6 font-mono text-sm text-accent">403</p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight">Access denied</h1>
        <p className="mt-2 text-muted">
          This page requires a permission your current account doesn't have.
          Switch accounts, or go back to where you were.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-accent-strong"
          >
            Switch account
          </Link>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-paper px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-surface"
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}