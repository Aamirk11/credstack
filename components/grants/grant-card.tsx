"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { GrantMatch } from "@/lib/types";
import { formatCurrencyRange, daysUntil, getDeadlineColor, formatDateShort } from "@/lib/utils/format";
import { MATCH_STRENGTH_CONFIG, GRANT_TYPE_CONFIG } from "@/lib/utils/constants";
import { toast } from "sonner";

interface GrantCardProps {
  grant: GrantMatch;
  onToggleFavorite?: (id: string) => void;
}

const MATCH_BORDER_COLORS: Record<string, string> = {
  strong: "border-l-cred-green",
  good: "border-l-cred-blue",
  moderate: "border-l-amber-400",
  weak: "border-l-slate-300",
};

export function GrantCard({ grant, onToggleFavorite }: GrantCardProps) {
  const [isFav, setIsFav] = useState(grant.isFavorited);
  const daysLeft = daysUntil(grant.deadline);
  const deadlineColor = getDeadlineColor(daysLeft);
  const strengthConfig = MATCH_STRENGTH_CONFIG[grant.matchStrength];
  const typeConfig = GRANT_TYPE_CONFIG[grant.type];
  const borderColor = MATCH_BORDER_COLORS[grant.matchStrength] || "border-l-slate-300";

  return (
    <Link href={`/dashboard/grants/${grant.id}`} className="block group">
      <Card className={cn(
        "transition-all hover:shadow-md hover:border-blue-200 border-l-3",
        borderColor
      )}>
        <CardContent className="space-y-2 p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold",
                  typeConfig.color
                )}
              >
                {grant.agencyInitials}
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-sm text-foreground truncate group-hover:text-cred-blue transition-colors">
                  {grant.name}
                </h3>
                <p className="text-xs text-muted-foreground">{grant.agency}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              className="shrink-0"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsFav(!isFav);
                if (!isFav) {
                  toast.success("Grant saved to favorites");
                } else {
                  toast("Grant removed from favorites");
                }
                onToggleFavorite?.(grant.id);
              }}
            >
              <Star
                className={cn(
                  "size-4",
                  isFav
                    ? "fill-cred-gold text-cred-gold"
                    : "text-muted-foreground"
                )}
              />
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <Badge className={cn(strengthConfig.color, "text-[10px]")}>
              {strengthConfig.label}
            </Badge>
            <Badge className={cn(typeConfig.color, "text-[10px]")}>
              {typeConfig.label}
            </Badge>
          </div>

          <p className="text-xs text-muted-foreground line-clamp-2">
            {grant.shortDescription}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-cred-gold">
              {formatCurrencyRange(grant.amountMin, grant.amountMax)}
            </span>
            <div className={cn("flex items-center gap-1 text-[11px]", deadlineColor)}>
              <Clock className="size-3" />
              <span>
                {daysLeft > 0
                  ? `${daysLeft}d left`
                  : daysLeft === 0
                  ? "Due today"
                  : "Expired"}
              </span>
              <span className="text-muted-foreground">
                ({formatDateShort(grant.deadline)})
              </span>
            </div>
          </div>

          {grant.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {grant.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">
                  {tag}
                </Badge>
              ))}
              {grant.tags.length > 3 && (
                <span className="text-[10px] text-muted-foreground self-center">
                  +{grant.tags.length - 3} more
                </span>
              )}
            </div>
          )}

          <div className="flex items-center justify-end">
            <span className="text-xs text-cred-blue font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
              View Details <ArrowRight className="size-3" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
