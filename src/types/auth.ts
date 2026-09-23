export type Role =
  | "CUSTOMER"
  | "CLAIMS_OFFICER"
  | "MANAGER"
  | "ADMIN";

export interface AuthUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: Role;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}

export interface LoginPayload {
  email: string;
  password: string;
}
