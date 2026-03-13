"use client";

import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardAction } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MatchBadge } from "@/components/shared/match-badge";
import { StatusBadge } from "@/components/shared/status-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { cn } from "@/lib/utils";
import { formatCurrencyRange, daysUntil, formatDateShort, getDeadlineColor } from "@/lib/utils/format";
import type { GrantMatch } from "@/lib/types";

interface GrantMatchListProps {
  grants: GrantMatch[];
}

export function GrantMatchList({ grants }: GrantMatchListProps) {
  const sorted = [...grants].sort((a, b) => b.matchScore - a.matchScore);

  if (sorted.length === 0) {
    return (
      <Card>
        <CardContent>
          <EmptyState
            icon={Search}
            title="No matches found"
            description="Try adjusting your filters to see more grant opportunities."
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Top Grant Matches</CardTitle>
        <CardAction>
          <Link href="/dashboard">
            <Button variant="ghost" className="text-xs text-cred-blue hover:text-cred-blue-dark gap-1">
              View All
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent className="px-0">
        <div className="divide-y divide-border">
          {sorted.map((grant) => {
            const days = grant.deadline ? daysUntil(grant.deadline) : null;
            return (
              <Link
                key={grant.id}
                href={`/dashboard/grants/${grant.id}`}
                className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors group"
              >
                {/* Agency badge */}
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 text-xs font-bold text-slate-600 shrink-0 uppercase">
                  {grant.agencyInitials}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-medium text-slate-900 truncate group-hover:text-cred-blue transition-colors">
                      {grant.name}
                    </p>
                    <StatusBadge type={grant.type} />
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <MatchBadge matchStrength={grant.matchStrength} />
                    <span className="text-sm font-semibold text-cred-gold">
                      {formatCurrencyRange(grant.amountMin, grant.amountMax)}
                    </span>
                  </div>
                </div>

                {/* Deadline */}
                {grant.deadline && days != null && (
                  <div className="text-right shrink-0 hidden sm:block">
                    <p className="text-xs text-slate-500">
                      {formatDateShort(grant.deadline)}
                    </p>
                    <p className={cn("text-xs font-medium", getDeadlineColor(days))}>
                      {days > 0 ? `${days}d left` : "Expired"}
                    </p>
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
