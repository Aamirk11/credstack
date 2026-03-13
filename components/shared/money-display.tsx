import { cn } from "@/lib/utils";
import { formatCurrency, formatCurrencyRange } from "@/lib/utils/format";

interface MoneyDisplayProps {
  amount?: number;
  size?: "sm" | "md" | "lg";
  showRange?: boolean;
  min?: number;
  max?: number;
  className?: string;
}

export function MoneyDisplay({
  amount,
  size = "md",
  showRange = false,
  min,
  max,
  className,
}: MoneyDisplayProps) {
  const sizeClasses = {
    sm: "text-sm font-semibold",
    md: "text-lg font-bold",
    lg: "text-3xl font-bold tracking-tight",
  };

  const displayText = showRange && min != null && max != null
    ? formatCurrencyRange(min, max)
    : amount != null
      ? formatCurrency(amount)
      : "$0";

  return (
    <span className={cn("text-cred-gold", sizeClasses[size], className)}>
      {displayText}
    </span>
  );
}
