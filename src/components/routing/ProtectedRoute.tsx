import { Navigate, Outlet, useLocation } from "react-router-dom";

import { FullPageSpinner } from "../layout/FullPageSpinner";
import { useAuth } from "../../context/useAuth";

/**
 * Gates every authenticated route. Unauthenticated visitors
 * are sent to /login, remembering where they were headed so
 * LoginPage can send them back after a successful sign-in.
 */
export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <FullPageSpinner label="Checking your session…" />
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
}
