interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({
  status,
}: StatusBadgeProps) {
  const normalizedStatus =
    status.toUpperCase();

  let className: string;

  switch (normalizedStatus) {
    case "CLOSED":
      className =
        "bg-emerald-100 text-emerald-700";
      break;

    case "UNDER_REVIEW":
      className =
        "bg-amber-100 text-amber-700";
      break;

    case "DOCUMENT_PROCESSING":
      className =
        "bg-blue-100 text-blue-700";
      break;

    case "SUBMITTED":
      className =
        "bg-violet-100 text-violet-700";
      break;

    case "APPROVED":
      className =
        "bg-green-100 text-green-700";
      break;

    case "REJECTED":
      className =
        "bg-red-100 text-red-700";
      break;

    case "SETTLEMENT_IN_PROGRESS":
      className =
        "bg-orange-100 text-orange-700";
      break;

    default:
      className =
        "bg-slate-100 text-slate-700";
  }

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${className}`}
    >
      {status.replaceAll("_", " ")}
    </span>
  );
}