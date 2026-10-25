import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser, hasPermission, type Permission } from "@/lib/auth";

interface ProtectedRouteProps {
  requiredPermission: Permission;
  children: ReactNode;
}

/**
 * Client-side permission guard. Redirects unauthenticated users to the
 * landing page and unauthorized users to the 403 fallback page.
 */
export function ProtectedRoute({
  requiredPermission,
  children,
}: ProtectedRouteProps) {
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!hasPermission(user, requiredPermission)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}