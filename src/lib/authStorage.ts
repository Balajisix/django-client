import type { AuthUser } from "../types/auth";

/**
 * Single source of truth for how the auth token and cached
 * user are persisted in the browser, so apiClient (which
 * needs the token on every request) and AuthContext (which
 * owns the user-facing auth state) never drift apart.
 */

const TOKEN_KEY = "insurance_app_token";
const USER_KEY = "insurance_app_user";

export const authStorage = {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  },

  getCachedUser(): AuthUser | null {
    const raw = localStorage.getItem(USER_KEY);

    if (!raw) {
      return null;
    }

    try {
      return JSON.parse(raw) as AuthUser;
    } catch {
      return null;
    }
  },

  setCachedUser(user: AuthUser): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  clear(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};
