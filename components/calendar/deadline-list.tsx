import { Bell, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { DeadlineEvent } from "@/lib/types";
import { formatDate } from "@/lib/utils/format";

interface DeadlineListProps {
  deadlines: DeadlineEvent[];
  selectedDate: Date | null;
}

const URGENCY_CONFIG: Record<string, { color: string; label: string }> = {
  urgent: { color: "bg-red-500", label: "Urgent" },
  soon: { color: "bg-amber-500", label: "Soon" },
  upcoming: { color: "bg-yellow-500", label: "Upcoming" },
  future: { color: "bg-cred-green", label: "Future" },
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
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calendar className="size-4 text-muted-foreground" />
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {filteredDeadlines.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            {selectedDate ? "No deadlines on this date" : "No upcoming deadlines"}
          </p>
        ) : (
          <div className="space-y-3">
            {filteredDeadlines.map((deadline) => {
              const urgencyConfig = URGENCY_CONFIG[deadline.urgency];
              const typeColor = TYPE_COLORS[deadline.type] || "border-l-slate-400";

              return (
                <div
                  key={deadline.id}
                  className={cn(
                    "border-l-2 pl-3 py-2 space-y-1",
                    typeColor
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {deadline.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(deadline.date)}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span
                        className={cn(
                          "size-2 rounded-full",
                          urgencyConfig.color
                        )}
                      />
                      <span className="text-[10px] text-muted-foreground">
                        {urgencyConfig.label}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {deadline.description}
                  </p>
                  <Button
                    variant="ghost"
                    size="xs"
                    className="gap-1 text-xs text-muted-foreground hover:text-foreground"
                    onClick={() =>
                      alert("Reminder set! (Demo mode)")
                    }
                  >
                    <Bell className="size-3" />
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
