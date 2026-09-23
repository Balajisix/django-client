export function formatCurrency(
  value: string | number | null | undefined,
): string {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "₹0";
  }

  const numericValue = Number(value);

  if (Number.isNaN(numericValue)) {
    return "₹0";
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(numericValue);
}

export function formatNumber(
  value: string | number | null | undefined,
): string {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "0";
  }

  const numericValue = Number(value);

  if (Number.isNaN(numericValue)) {
    return "0";
  }

  return new Intl.NumberFormat("en-IN").format(
    numericValue,
  );
}

export function formatPercentage(
  value: string | number | null | undefined,
): string {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "0%";
  }

  const numericValue = Number(value);

  if (Number.isNaN(numericValue)) {
    return "0%";
  }

  return `${(numericValue * 100).toFixed(1)}%`;
}

export function formatDays(
  value: number | null | undefined,
): string {
  if (
    value === null ||
    value === undefined ||
    Number.isNaN(value)
  ) {
    return "—";
  }

  return `${value.toFixed(1)} days`;
}

export function formatDate(
  value: string | null | undefined,
): string {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-IN", {
    month: "short",
    year: "numeric",
  }).format(date);
}

export function toNumber(
  value: string | number | null | undefined,
): number {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return 0;
  }

  const numericValue = Number(value);

  return Number.isNaN(numericValue)
    ? 0
    : numericValue;
}