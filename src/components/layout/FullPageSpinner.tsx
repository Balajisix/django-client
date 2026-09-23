import { Loader2 } from "lucide-react";

export function FullPageSpinner({
  label = "Loading…",
}: {
  label?: string;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />

        <p className="text-sm text-slate-500">
          {label}
        </p>
      </div>
    </div>
  );
}
