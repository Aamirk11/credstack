"use client";

import Link from "next/link";
import { Bell, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { DeadlineEvent } from "@/lib/types";
import { formatDate } from "@/lib/utils/format";
import { toast } from "sonner";

interface DeadlineListProps {
  deadlines: DeadlineEvent[];
  selectedDate: Date | null;
}

const URGENCY_CONFIG: Record<string, { color: string; bgColor: string; label: string }> = {
  urgent: { color: "bg-red-500", bgColor: "bg-red-50", label: "Urgent" },
  soon: { color: "bg-amber-500", bgColor: "bg-amber-50", label: "Soon" },
  upcoming: { color: "bg-yellow-500", bgColor: "bg-yellow-50", label: "Upcoming" },
  future: { color: "bg-cred-green", bgColor: "bg-green-50", label: "Future" },
};

const TYPE_COLORS: Record<string, string> = {
  "grant-deadline": "border-l-cred-blue",
  "tax-filing": "border-l-cred-gold",
  "application-due": "border-l-purple-500",
  "review-date": "border-l-amber-500",
  "report-due": "border-l-cred-green",
};

export function DeadlineList({ deadlines, selectedDate }: DeadlineListProps) {
  const filteredDeadlines = selectedDate
    ? deadlines.filter((d) => {
        const dDate = new Date(d.date);
        return (
          dDate.getFullYear() === selectedDate.getFullYear() &&
          dDate.getMonth() === selectedDate.getMonth() &&
          dDate.getDate() === selectedDate.getDate()
        );
      })
    : deadlines
        .filter((d) => new Date(d.date) >= new Date())
        .sort(
          (a, b) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        )
        .slice(0, 10);

  const title = selectedDate
    ? `Deadlines for ${selectedDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })}`
    : "Upcoming Deadlines";

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Calendar className="size-3.5 text-muted-foreground" />
          <CardTitle className="text-base">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {filteredDeadlines.length === 0 ? (
          <p className="text-xs text-muted-foreground text-center py-6">
            {selectedDate ? "No deadlines on this date" : "No upcoming deadlines"}
          </p>
        ) : (
          <div className="space-y-2">
            {filteredDeadlines.map((deadline) => {
              const urgencyConfig = URGENCY_CONFIG[deadline.urgency];
              const typeColor = TYPE_COLORS[deadline.type] || "border-l-slate-400";

              return (
                <div
                  key={deadline.id}
                  className={cn(
                    "border-l-2 pl-2.5 py-1.5 rounded-r-lg transition-colors hover:bg-muted/30",
                    typeColor
                  )}
                >
                  <div className="flex items-start justify-between gap-1.5">
                    <Link
                      href={deadline.relatedId ? `/dashboard/grants/${deadline.relatedId}` : "#"}
                      className="min-w-0 flex-1 group"
                    >
                      <p className="text-xs font-medium text-foreground group-hover:text-cred-blue transition-colors">
                        {deadline.title}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {formatDate(deadline.date)}
                      </p>
                    </Link>
                    <div className="flex items-center gap-1 shrink-0">
                      <span
                        className={cn(
                          "size-1.5 rounded-full",
                          urgencyConfig.color
                        )}
                      />
                      <span className={cn(
                        "text-[9px] px-1 py-0.5 rounded font-medium",
                        urgencyConfig.bgColor
                      )}>
                        {urgencyConfig.label}
                      </span>
                    </div>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">
                    {deadline.description}
                  </p>
                  <Button
                    variant="ghost"
                    size="xs"
                    className="gap-1 text-[10px] text-muted-foreground hover:text-foreground h-5 mt-0.5 px-1"
                    onClick={() =>
                      toast.success("Reminder set! We'll notify you 7 days before.", { icon: "🔔" })
                    }
                  >
                    <Bell className="size-2.5" />
                    Set Reminder
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
