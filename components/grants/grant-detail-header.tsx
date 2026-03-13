"use client";

import { Clock, Star, ExternalLink, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { GrantMatch } from "@/lib/types";
import { formatCurrencyRange, daysUntil, getDeadlineColor, formatDate } from "@/lib/utils/format";
import { MATCH_STRENGTH_CONFIG, GRANT_TYPE_CONFIG } from "@/lib/utils/constants";
import { toast } from "sonner";

interface GrantDetailHeaderProps {
  grant: GrantMatch;
  onSave?: () => void;
  onStartApplication?: () => void;
}

export function GrantDetailHeader({
  grant,
  onSave,
  onStartApplication,
}: GrantDetailHeaderProps) {
  const daysLeft = daysUntil(grant.deadline);
  const deadlineColor = getDeadlineColor(daysLeft);
  const strengthConfig = MATCH_STRENGTH_CONFIG[grant.matchStrength];
  const typeConfig = GRANT_TYPE_CONFIG[grant.type];

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge className={cn(typeConfig.color, "text-xs")}>
              {typeConfig.label}
            </Badge>
            <Badge className={cn(strengthConfig.color, "text-xs px-3 py-0.5")}>
              {strengthConfig.label}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {grant.status === "open"
                ? "Open"
                : grant.status === "closing-soon"
                ? "Closing Soon"
                : grant.status === "rolling"
                ? "Rolling"
                : "Closed"}
            </Badge>
          </div>

          <h1 className="text-xl font-bold text-foreground sm:text-2xl">
            {grant.name}
          </h1>

          <p className="text-sm text-muted-foreground">{grant.agency}</p>
        </div>

        <div className="flex gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              toast.success("Link copied to clipboard!");
            }}
          >
            <Share2 className="size-4" />
            Share
          </Button>
          <Button variant="outline" size="sm" onClick={onSave}>
            <Star className="size-4" />
            Save
          </Button>
          <Button size="sm" className="bg-cred-blue hover:bg-cred-blue-dark text-white" onClick={onStartApplication}>
            <ExternalLink className="size-4" />
            Start Application
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 sm:gap-6">
        <div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
            Award Range
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-cred-gold">
            {formatCurrencyRange(grant.amountMin, grant.amountMax)}
          </p>
        </div>

        <div className="h-10 w-px bg-border hidden sm:block" />

        <div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
            Deadline
          </p>
          <div className={cn("flex items-center gap-1.5", deadlineColor)}>
            <Clock className="size-3.5" />
            <span className="text-base font-semibold">
              {formatDate(grant.deadline)}
            </span>
            <span className="text-xs">
              {daysLeft > 0
                ? `(${daysLeft}d left)`
                : daysLeft === 0
                ? "(Due today)"
                : "(Expired)"}
            </span>
          </div>
        </div>

        <div className="h-10 w-px bg-border hidden sm:block" />

        <div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
            Match
          </p>
          <p className="text-base font-semibold text-foreground">
            {grant.matchScore}%
          </p>
        </div>

        <div className="h-10 w-px bg-border hidden sm:block" />

        <div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
            Past Awardees
          </p>
          <p className="text-base font-semibold text-foreground">
            {grant.pastAwardees.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
