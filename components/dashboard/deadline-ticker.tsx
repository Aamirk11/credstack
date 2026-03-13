"use client";

import Link from "next/link";
import { Calendar, ArrowRight, BellPlus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardAction } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCredStackData } from "@/lib/hooks/use-credstack-data";
import { getUpcomingDeadlines } from "@/lib/utils/calculations";
import { formatDateShort, daysUntil, getDeadlineBgColor } from "@/lib/utils/format";
import { toast } from "sonner";

const URGENCY_DOT_COLORS = {
  urgent: "bg-red-500",
  soon: "bg-amber-500",
  upcoming: "bg-yellow-500",
  future: "bg-green-500",
};

export function DeadlineTicker() {
  const { deadlines } = useCredStackData();
  const upcoming = getUpcomingDeadlines(deadlines, 5);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Upcoming Deadlines</CardTitle>
        <CardAction>
          <Link href="/dashboard/calendar">
            <Button variant="ghost" className="text-xs text-cred-blue hover:text-cred-blue-dark gap-1">
              Calendar
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent className="pt-0">
        {upcoming.length === 0 ? (
          <p className="text-sm text-slate-500 text-center py-4">
            No upcoming deadlines
          </p>
        ) : (
          <div className="space-y-2">
            {upcoming.map((event) => {
              const days = daysUntil(event.date);
              const isUrgent = days >= 0 && days < 7;
              return (
                <Link
                  key={event.id}
                  href={`/dashboard/grants/${event.relatedId}`}
                  className="flex items-start gap-2.5 p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors group"
                >
                  <span
                    className={cn(
                      "mt-1.5 w-2 h-2 rounded-full shrink-0",
                      URGENCY_DOT_COLORS[event.urgency],
                      isUrgent && "animate-pulse"
                    )}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate group-hover:text-cred-blue transition-colors">
                      {event.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-slate-500">
                        {formatDateShort(event.date)}
                      </span>
                      <span
                        className={cn(
                          "inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium",
                          getDeadlineBgColor(days)
                        )}
                      >
                        {days > 0 ? `${days}d` : "Today"}
                      </span>
                    </div>
                  </div>
                  {/* Set Reminder micro-button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toast(`Reminder set for "${event.title}"`, {
                        description: `We'll notify you before ${formatDateShort(event.date)}.`,
                      });
                    }}
                    className="shrink-0 p-1 rounded text-slate-300 hover:text-cred-blue hover:bg-blue-50 transition-colors opacity-0 group-hover:opacity-100"
                    aria-label="Set reminder"
                  >
                    <BellPlus className="w-3.5 h-3.5" />
                  </button>
                </Link>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
