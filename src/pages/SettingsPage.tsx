const DEMO_SETTINGS = [
  { name: "Session timeout", value: "30 minutes" },
  { name: "Require email verification", value: "On" },
  { name: "Re-authenticate for admin actions", value: "On" },
  { name: "Default new-user role", value: "User" },
];

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-bold tracking-tight">System settings</h1>
      <p className="mt-2 text-muted">Visible to Super Admin only.</p>

      <dl className="mt-8 divide-y divide-line border-y border-line">
        {DEMO_SETTINGS.map((setting) => (
          <div
            key={setting.name}
            className="flex items-center justify-between py-3"
          >
            <dt className="text-sm font-medium">{setting.name}</dt>
            <dd className="font-mono text-xs text-muted">{setting.value}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-4 text-xs text-muted">
        Demo settings. This is a front-end demo, so changes are not persisted.
      </p>
    </div>
  );
}