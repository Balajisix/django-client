import { useState } from "react";
import type { FormEvent } from "react";
import { ShieldCheck } from "lucide-react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import { useAuth } from "../../context/useAuth";
import { roleHomePath } from "../../lib/roleHome";

interface LocationState {
  from?: { pathname: string };
}

export function LoginPage() {
  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (isAuthenticated && user) {
    const state = location.state as
      | LocationState
      | null;

    const redirectTo =
      state?.from?.pathname ?? roleHomePath(user.role);

    return <Navigate to={redirectTo} replace />;
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const loggedInUser = await login({
        email: trimmedEmail,
        password,
      });

      const state = location.state as
        | LocationState
        | null;

      const redirectTo =
        state?.from?.pathname ??
        roleHomePath(loggedInUser.role);

      navigate(redirectTo, { replace: true });
    } catch (submitError) {
      if (
        axios.isAxiosError(submitError) &&
        submitError.response?.status === 400
      ) {
        setError(
          "Invalid email or password.",
        );
      } else {
        setError(
          "Unable to sign in right now. Please try again.",
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900">
          <ShieldCheck className="h-6 w-6 text-white" />
        </div>

        <h1 className="mt-5 text-center text-xl font-bold text-slate-900">
          Insurance Claims Platform
        </h1>

        <p className="mt-2 text-center text-sm text-slate-500">
          Sign in to continue
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              autoComplete="email"
              required
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              autoComplete="current-password"
              required
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={
              isSubmitting || !email.trim() || !password
            }
            className="mt-2 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
