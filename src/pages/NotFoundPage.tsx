import { Link } from "react-router-dom";

import { useAuth } from "../context/useAuth";
import { roleHomePath } from "../lib/roleHome";

export function NotFoundPage() {
  const { user } = useAuth();

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <p className="text-sm font-medium text-slate-400">
          404
        </p>

        <h1 className="mt-2 text-2xl font-bold text-slate-900">
          Page not found
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          The page you're looking for doesn't exist.
        </p>

        <Link
          to={user ? roleHomePath(user.role) : "/login"}
          className="mt-5 inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Go back
        </Link>
      </div>
    </div>
  );
}
