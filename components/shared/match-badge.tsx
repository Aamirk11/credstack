import { Badge } from "@/components/ui/badge";
import { MATCH_STRENGTH_CONFIG } from "@/lib/utils/constants";
import { cn } from "@/lib/utils";

interface MatchBadgeProps {
  matchStrength: "strong" | "possible" | "worth-exploring";
  className?: string;
}

export function MatchBadge({ matchStrength, className }: MatchBadgeProps) {
  const config = MATCH_STRENGTH_CONFIG[matchStrength];

  return (
    <Badge className={cn(config.color, "border-0", className)}>
      <span
        className={cn("w-1.5 h-1.5 rounded-full bg-white/60")}
      />
      {config.label}
    </Badge>
  );
}
