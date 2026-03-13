import { Badge } from "@/components/ui/badge";
import { GRANT_TYPE_CONFIG } from "@/lib/utils/constants";
import { cn } from "@/lib/utils";

type GrantType = keyof typeof GRANT_TYPE_CONFIG;

interface StatusBadgeProps {
  type: GrantType;
  className?: string;
}

export function StatusBadge({ type, className }: StatusBadgeProps) {
  const config = GRANT_TYPE_CONFIG[type];

  return (
    <Badge className={cn(config.color, "border-0", className)}>
      {config.label}
    </Badge>
  );
}
