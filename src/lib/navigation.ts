import {
  BarChart3,
  FileStack,
  ShieldCheck,
  UserCog,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { Role } from "../types/auth";

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
}

const NAV_BY_ROLE: Record<Role, NavItem[]> = {
  CUSTOMER: [
    {
      to: "/my-policies",
      label: "My Policies",
      icon: ShieldCheck,
    },
    {
      to: "/my-claims",
      label: "My Claims",
      icon: FileStack,
    },
  ],

  CLAIMS_OFFICER: [
    {
      to: "/claims-queue",
      label: "Claims Queue",
      icon: FileStack,
    },
  ],

  MANAGER: [
    {
      to: "/claims-queue",
      label: "Claims Queue",
      icon: FileStack,
    },
    {
      to: "/customers",
      label: "Customers",
      icon: Users,
    },
    {
      to: "/analytics",
      label: "Analytics",
      icon: BarChart3,
    },
  ],

  ADMIN: [
    {
      to: "/claims-queue",
      label: "Claims Queue",
      icon: FileStack,
    },
    {
      to: "/customers",
      label: "Customers",
      icon: Users,
    },
    {
      to: "/analytics",
      label: "Analytics",
      icon: BarChart3,
    },
    {
      to: "/admin/staff",
      label: "Staff Management",
      icon: UserCog,
    },
  ],
};

export function navItemsForRole(role: Role): NavItem[] {
  return NAV_BY_ROLE[role];
}
