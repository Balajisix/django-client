import { roleLabel } from "../../lib/roleHome";
import type { Role } from "../../types/auth";

const ROLE_STYLES: Record<Role, string> = {
  CUSTOMER: "bg-slate-100 text-slate-700",
  CLAIMS_OFFICER: "bg-blue-100 text-blue-700",
  MANAGER: "bg-violet-100 text-violet-700",
  ADMIN: "bg-amber-100 text-amber-800",
};

export function RoleBadge({ role }: { role: Role }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${ROLE_STYLES[role]}`}
    >
      {roleLabel(role)}
    </span>
  );
}
