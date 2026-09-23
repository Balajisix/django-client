import { apiClient } from "../lib/apiClient";
import type {
  AuthUser,
  LoginPayload,
  LoginResponse,
} from "../types/auth";

export const authApi = {
  async login(
    payload: LoginPayload,
  ): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(
      "/auth/login/",
      payload,
    );

    return response.data;
  },

  async logout(): Promise<void> {
    await apiClient.post("/auth/logout/");
  },

  async me(): Promise<AuthUser> {
    const response = await apiClient.get<AuthUser>(
      "/auth/me/",
    );

    return response.data;
  },
};
