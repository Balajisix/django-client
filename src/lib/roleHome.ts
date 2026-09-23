import type { Role } from "../types/auth";

/**
 * Where a user lands right after login, or when RoleGate
 * bounces them off a page they can't access.
 */
export function roleHomePath(role: Role): string {
  if (role === "CUSTOMER") {
    return "/my-policies";
  }

  // CLAIMS_OFFICER, MANAGER and ADMIN all land on the
  // day-to-day work queue; Analytics and Staff Management
  // are reached from the sidebar, not as the default page.
  return "/claims-queue";
}

const ROLE_LABELS: Record<Role, string> = {
  CUSTOMER: "Customer",
  CLAIMS_OFFICER: "Claims Officer",
  MANAGER: "Manager",
  ADMIN: "Admin",
};

export function roleLabel(role: Role): string {
  return ROLE_LABELS[role];
}
