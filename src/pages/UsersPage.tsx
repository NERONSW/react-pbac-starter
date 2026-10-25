import { MOCK_USERS } from "@/lib/auth";

export default function UsersPage() {
  const users = Object.values(MOCK_USERS);

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight">User management</h1>
      <p className="mt-2 text-muted">
        Accounts in this demo and what each can do. Visible to Admin and Super
        Admin.
      </p>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left">
              <th className="py-2 pr-4 font-medium text-muted">Name</th>
              <th className="py-2 pr-4 font-medium text-muted">Email</th>
              <th className="py-2 pr-4 font-medium text-muted">Role</th>
              <th className="py-2 font-medium text-muted">Permissions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-line last:border-0">
                <td className="py-3 pr-4 font-medium">{user.name}</td>
                <td className="py-3 pr-4 text-muted">{user.email}</td>
                <td className="py-3 pr-4">{user.role}</td>
                <td className="py-3 font-mono text-xs text-muted">
                  {user.permissions.length} granted
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}