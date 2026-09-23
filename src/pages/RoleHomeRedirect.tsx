import { Navigate } from "react-router-dom";

import { useAuth } from "../context/useAuth";
import { roleHomePath } from "../lib/roleHome";

/**
 * Sits at "/". Sends every authenticated user to their
 * role's default landing page.
 */
export function RoleHomeRedirect() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return <Navigate to={roleHomePath(user.role)} replace />;
}
