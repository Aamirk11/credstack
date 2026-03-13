export function formatCurrency(cents: number): string {
  const dollars = cents / 100;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(dollars);
}

export function formatCurrencyRange(minCents: number, maxCents: number): string {
  return `${formatCurrency(minCents)} - ${formatCurrency(maxCents)}`;
}

export function formatCurrencyCompact(cents: number): string {
  const dollars = cents / 100;
  if (dollars >= 1_000_000) return `$${(dollars / 1_000_000).toFixed(1)}M`;
  if (dollars >= 1_000) return `$${(dollars / 1_000).toFixed(0)}K`;
  return formatCurrency(cents);
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}

export function formatPercentage(n: number): string {
  return `${Math.round(n)}%`;
}

export function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatDateShort(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function daysUntil(isoDate: string): number {
  const target = new Date(isoDate);
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function getDeadlineColor(daysLeft: number): string {
  if (daysLeft <= 7) return "text-red-600";
  if (daysLeft <= 30) return "text-amber-600";
  if (daysLeft <= 60) return "text-yellow-600";
  return "text-green-600";
}

export function getDeadlineBgColor(daysLeft: number): string {
  if (daysLeft <= 7) return "bg-red-100 text-red-700";
  if (daysLeft <= 30) return "bg-amber-100 text-amber-700";
  if (daysLeft <= 60) return "bg-yellow-100 text-yellow-700";
  return "bg-green-100 text-green-700";
}
