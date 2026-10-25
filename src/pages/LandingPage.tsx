import { useNavigate } from "react-router-dom";
import { MOCK_USERS, mockLogin, type PersonaKey } from "@/lib/auth";
import { PermissionChip } from "@/components/PermissionChip";

const PERSONAS: PersonaKey[] = ["user", "admin", "super-admin"];

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function LandingPage() {
  const navigate = useNavigate();

  function signIn(persona: PersonaKey) {
    mockLogin(persona);
    navigate("/dashboard");
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-16">
      <header className="mb-12 max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          One app. Three levels of access.
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted">
          Sign in as any persona to see how the same interface renders a
          different experience from each set of permissions. No account needed.
        </p>
      </header>

      <div className="grid items-stretch gap-4 md:grid-cols-3">
        {PERSONAS.map((key) => {
          const user = MOCK_USERS[key];

          return (
            <div
              key={key}
              className="flex h-full flex-col rounded-xl border border-line bg-paper p-5"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-strong text-sm font-semibold text-ink">
                  {initials(user.name)}
                </span>
                <div>
                  <h2 className="text-base font-semibold">{user.role}</h2>
                  <p className="text-sm text-muted">{user.name}</p>
                </div>
              </div>

              <div className="mb-5 mt-4 flex flex-1 flex-wrap content-start gap-1.5">
                {user.permissions.map((permission) => (
                  <PermissionChip key={permission} permission={permission} />
                ))}
              </div>

              <button
                type="button"
                onClick={() => signIn(key)}
                className="mt-auto inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 text-sm font-medium text-paper transition-colors hover:bg-accent-strong"
              >
                Sign in as {user.role}
              </button>
            </div>
          );
        })}
      </div>

      <p className="mt-8 text-xs text-muted">
        Demo only, no real authentication. Sessions are kept in your browser's
        localStorage.
      </p>
    </div>
  );
}