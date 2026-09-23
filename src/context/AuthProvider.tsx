import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";

import { authApi } from "../api/authApi";
import { authStorage } from "../lib/authStorage";
import type { AuthUser, LoginPayload } from "../types/auth";
import { AuthContext } from "./AuthContext";
import type { AuthContextValue } from "./AuthContext";

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<AuthUser | null>(
    () => authStorage.getCachedUser(),
  );

  // Only block the UI on the very first render if we have a
  // token but no cached user to paint immediately (an edge
  // case). Otherwise we render optimistically with the
  // cached user and quietly re-validate in the background.
  const [isLoading, setIsLoading] = useState(() => {
    const hasToken = authStorage.getToken() !== null;
    const hasCachedUser =
      authStorage.getCachedUser() !== null;

    return hasToken && !hasCachedUser;
  });

  useEffect(() => {
    const token = authStorage.getToken();

    if (!token) {
      // isLoading's initial value already accounts for the
      // no-token case (false), nothing to synchronize here.
      return;
    }

    let cancelled = false;

    authApi
      .me()
      .then((freshUser) => {
        if (cancelled) {
          return;
        }

        authStorage.setCachedUser(freshUser);
        setUser(freshUser);
      })
      .catch(() => {
        if (cancelled) {
          return;
        }

        // If the token was invalid, apiClient's response
        // interceptor already cleared storage on the 401.
        // Reflect that here rather than trusting stale data.
        if (!authStorage.getToken()) {
          setUser(null);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(
    async (payload: LoginPayload) => {
      const { token, user: loggedInUser } =
        await authApi.login(payload);

      authStorage.setToken(token);
      authStorage.setCachedUser(loggedInUser);
      setUser(loggedInUser);

      return loggedInUser;
    },
    [],
  );

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // Best-effort: still log the user out locally even if
      // the network call to revoke the token fails.
    } finally {
      authStorage.clear();
      setUser(null);
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      isAuthenticated: user !== null,
      login,
      logout,
    }),
    [user, isLoading, login, logout],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
