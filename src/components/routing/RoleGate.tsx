import { ShieldAlert } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

import { useAuth } from "../../context/useAuth";
import { roleHomePath } from "../../lib/roleHome";
import type { Role } from "../../types/auth";

/**
 * Restricts a subtree of routes to specific roles. Used
 * inside a <ProtectedRoute> subtree, so `user` is always
 * present here.
 */
export function RoleGate({
  roles,
}: {
  roles: Role[];
}) {
  const { user } = useAuth();

  if (!user || !roles.includes(user.role)) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <ShieldAlert className="h-6 w-6 text-red-600" />
          </div>

          <h2 className="mt-4 text-lg font-semibold text-slate-900">
            Access restricted
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Your account doesn't have permission to
            view this page.
          </p>

          <Link
            to={
              user
                ? roleHomePath(user.role)
                : "/login"
            }
            className="mt-5 inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Go to your dashboard
          </Link>
        </div>
      </div>
    );
  }

  return <Outlet />;
}
