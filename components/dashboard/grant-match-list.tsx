"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, Heart, Lock } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardAction } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MatchBadge } from "@/components/shared/match-badge";
import { StatusBadge } from "@/components/shared/status-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { cn } from "@/lib/utils";
import { formatCurrencyRange, daysUntil, formatDateShort, getDeadlineColor } from "@/lib/utils/format";
import { toast } from "sonner";
import type { GrantMatch } from "@/lib/types";

interface GrantMatchListProps {
  grants: GrantMatch[];
}

const MATCH_BORDER_COLOR: Record<string, string> = {
  strong: "border-l-green-500",
  possible: "border-l-amber-500",
  "worth-exploring": "border-l-slate-300",
};

export function GrantMatchList({ grants }: GrantMatchListProps) {
  const sorted = [...grants].sort((a, b) => b.matchScore - a.matchScore);
  const [favorites, setFavorites] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    grants.forEach((g) => {
      map[g.id] = g.isFavorited;
    });
    return map;
  });

  const toggleFavorite = (e: React.MouseEvent, grant: GrantMatch) => {
    e.preventDefault();
    e.stopPropagation();
    const next = !favorites[grant.id];
    setFavorites((prev) => ({ ...prev, [grant.id]: next }));
    toast(next ? `Saved "${grant.name}" to favorites` : `Removed "${grant.name}" from favorites`);
  };

  const handleProAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast("Upgrade to Pro to start applications directly.", {
      action: {
        label: "Learn More",
        onClick: () => {},
      },
    });
  };

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
        <div className="flex flex-col gap-3 px-4">
          <AnimatePresence mode="popLayout">
            {sorted.map((grant) => {
              const days = grant.deadline ? daysUntil(grant.deadline) : null;
              const isFav = favorites[grant.id] ?? false;
              return (
                <motion.div
                  key={grant.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={`/dashboard/grants/${grant.id}`}
                    className={cn(
                      "flex items-center gap-3 px-3 py-3 rounded-lg hover:shadow-md transition-all duration-200 group border-l-[3px] bg-white hover:bg-slate-50/80",
                      MATCH_BORDER_COLOR[grant.matchStrength] || "border-l-slate-200"
                    )}
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

                    {/* Right section */}
                    <div className="flex items-center gap-2 shrink-0">
                      {/* Deadline */}
                      {grant.deadline && days != null && (
                        <div className="text-right hidden sm:block">
                          <p className="text-xs text-slate-500">
                            {formatDateShort(grant.deadline)}
                          </p>
                          <p className={cn("text-xs font-medium", getDeadlineColor(days))}>
                            {days > 0 ? `${days}d left` : "Expired"}
                          </p>
                        </div>
                      )}

                      {/* Favorite toggle */}
                      <button
                        onClick={(e) => toggleFavorite(e, grant)}
                        className="p-1.5 rounded-md hover:bg-slate-100 transition-colors"
                        aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
                      >
                        <Heart
                          className={cn(
                            "w-4 h-4 transition-colors",
                            isFav ? "fill-red-500 text-red-500" : "text-slate-300 hover:text-slate-400"
                          )}
                        />
                      </button>

                      {/* Pro lock for apply */}
                      <button
                        onClick={handleProAction}
                        className="hidden sm:flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 transition-colors"
                        aria-label="Pro feature"
                      >
                        <Lock className="w-3 h-3" />
                        Apply
                      </button>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
