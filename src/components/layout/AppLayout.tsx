import { LogOut, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/useAuth";
import { navItemsForRole } from "../../lib/navigation";
import { RoleBadge } from "./RoleBadge";

export function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  if (!user) {
    // ProtectedRoute guarantees this never actually renders,
    // but keeps the component's types honest.
    return null;
  }

  async function handleLogout() {
    setIsLoggingOut(true);

    try {
      await logout();
    } finally {
      setIsLoggingOut(false);
      navigate("/login", { replace: true });
    }
  }

  const navItems = navItemsForRole(user.role);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <div className="shrink-0 rounded-xl bg-slate-900 p-2.5">
              <ShieldCheck className="h-5 w-5 text-white" />
            </div>

            <div className="min-w-0">
              <h1 className="truncate text-lg font-bold text-slate-900">
                Insurance Claims Platform
              </h1>

              <p className="text-xs text-slate-500">
                Claims lifecycle & AI intelligence
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-slate-900">
                {user.first_name} {user.last_name}
              </p>

              <RoleBadge role={user.role} />
            </div>

            <button
              type="button"
              onClick={() => {
                void handleLogout();
              }}
              disabled={isLoggingOut}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <LogOut className="h-4 w-4" />

              <span className="hidden sm:inline">
                {isLoggingOut ? "Signing out…" : "Logout"}
              </span>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1600px] gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <aside className="hidden w-56 shrink-0 md:block">
          <nav className="sticky top-24 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`
                }
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
