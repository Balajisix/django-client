import {
  BarChart3,
  LogOut,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

interface AnalyticsHeaderProps {
  isRefreshing: boolean;
  onRefresh: () => void;
  onLogout: () => void;
}

export function AnalyticsHeader({
  isRefreshing,
  onRefresh,
  onLogout,
}: AnalyticsHeaderProps) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <div className="shrink-0 rounded-xl bg-slate-900 p-2.5">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="truncate text-lg font-bold text-slate-900">
                Insurance Claims Analytics
              </h1>

              <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600" />
            </div>

            <p className="text-xs text-slate-500">
              Snowflake-powered claims intelligence
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw
              className={`h-4 w-4 ${
                isRefreshing ? "animate-spin" : ""
              }`}
            />

            <span className="hidden sm:inline">
              Refresh
            </span>
          </button>

          <button
            type="button"
            onClick={onLogout}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <LogOut className="h-4 w-4" />

            <span className="hidden sm:inline">
              Logout
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}