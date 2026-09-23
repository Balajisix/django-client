interface EmptyStateProps {
  message: string;
}

export function EmptyState({
  message,
}: EmptyStateProps) {
  return (
    <div className="flex min-h-40 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50">
      <p className="text-sm text-slate-500">
        {message}
      </p>
    </div>
  );
}