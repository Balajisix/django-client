export function PlaceholderPage({
  title,
  description,
  stageNote,
}: {
  title: string;
  description: string;
  stageNote: string;
}) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-slate-900">
          {title}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {description}
        </p>
      </div>

      <div className="flex min-h-64 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white">
        <div className="max-w-sm px-6 text-center">
          <p className="text-sm font-medium text-slate-700">
            Coming soon
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {stageNote}
          </p>
        </div>
      </div>
    </div>
  );
}
