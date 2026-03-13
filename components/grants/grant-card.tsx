"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
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
  index?: number;
  onToggleFavorite?: (id: string) => void;
}

const MATCH_GRADIENT_BORDERS: Record<string, string> = {
  strong: "from-green-400 to-emerald-600",
  good: "from-blue-400 to-indigo-600",
  moderate: "from-amber-300 to-orange-500",
  weak: "from-slate-300 to-slate-400",
};

function RadialMatchScore({ score }: { score: number }) {
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const filled = (score / 100) * circumference;
  const color = score >= 80 ? "#22c55e" : score >= 60 ? "#3b82f6" : score >= 40 ? "#f59e0b" : "#94a3b8";

  return (
    <div className="relative flex items-center justify-center w-11 h-11 shrink-0">
      <svg width="44" height="44" viewBox="0 0 44 44" className="-rotate-90">
        <circle
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="3"
        />
        <motion.circle
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - filled }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        />
      </svg>
      <span className="absolute text-[10px] font-bold text-slate-700">
        {score}
      </span>
    </div>
  );
}

export function GrantCard({ grant, index = 0, onToggleFavorite }: GrantCardProps) {
  const [isFav, setIsFav] = useState(grant.isFavorited);
  const daysLeft = daysUntil(grant.deadline);
  const deadlineColor = getDeadlineColor(daysLeft);
  const strengthConfig = MATCH_STRENGTH_CONFIG[grant.matchStrength];
  const typeConfig = GRANT_TYPE_CONFIG[grant.type];
  const gradientBorder = MATCH_GRADIENT_BORDERS[grant.matchStrength] || "from-slate-300 to-slate-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
    >
      <Link href={`/dashboard/grants/${grant.id}`} className="block group">
        <Card className="transition-all hover:shadow-md hover:border-blue-200 overflow-hidden relative">
          {/* Gradient left border */}
          <div className={cn(
            "absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b",
            gradientBorder
          )} />

          <CardContent className="space-y-2 p-4 pl-5">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <RadialMatchScore score={grant.matchScore} />
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
              <span className="text-base font-bold text-cred-gold">
                {formatCurrencyRange(grant.amountMin, grant.amountMax)}
              </span>
              <div className={cn(
                "flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full",
                daysLeft <= 7 && daysLeft >= 0
                  ? "bg-red-50 font-semibold"
                  : daysLeft <= 30 && daysLeft > 7
                  ? "bg-amber-50 font-medium"
                  : "",
                deadlineColor
              )}>
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
    </motion.div>
  );
}
