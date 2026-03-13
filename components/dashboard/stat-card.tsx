import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  color?: "blue" | "green" | "gold" | "slate";
}

const COLOR_MAP = {
  blue: {
    bg: "bg-cred-blue/10",
    icon: "text-cred-blue",
  },
  green: {
    bg: "bg-cred-green/10",
    icon: "text-cred-green",
  },
  gold: {
    bg: "bg-cred-gold/10",
    icon: "text-cred-gold",
  },
  slate: {
    bg: "bg-slate-100",
    icon: "text-slate-500",
  },
};

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = "blue",
}: StatCardProps) {
  const colors = COLOR_MAP[color];

  return (
    <Card>
      <CardContent className="flex items-start gap-4">
        <div
          className={cn(
            "flex items-center justify-center w-10 h-10 rounded-lg shrink-0",
            colors.bg
          )}
        >
          <Icon className={cn("w-5 h-5", colors.icon)} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="text-2xl font-bold text-slate-900 mt-0.5">{value}</p>
          {subtitle && (
            <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
              {trend === "up" && (
                <span className="text-cred-green font-medium">+</span>
              )}
              {trend === "down" && (
                <span className="text-red-500 font-medium">-</span>
              )}
              {subtitle}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
