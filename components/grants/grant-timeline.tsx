import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { KeyDate } from "@/lib/types";
import { formatDate } from "@/lib/utils/format";

interface GrantTimelineProps {
  keyDates: KeyDate[];
}

export function GrantTimeline({ keyDates }: GrantTimelineProps) {
  const now = new Date();
  const sortedDates = [...keyDates].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Key Dates</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {sortedDates.map((kd, i) => {
            const isPast = new Date(kd.date) < now;
            const isLast = i === sortedDates.length - 1;

            return (
              <div key={i} className="flex gap-3 pb-6 last:pb-0 relative">
                {/* Connecting line */}
                {!isLast && (
                  <div className="absolute left-[9px] top-5 bottom-0 w-px bg-border" />
                )}

                {/* Circle node */}
                <div
                  className={cn(
                    "size-[18px] shrink-0 rounded-full border-2 mt-0.5 relative z-10",
                    isPast
                      ? "bg-muted border-muted-foreground/30"
                      : "bg-cred-blue border-cred-blue"
                  )}
                />

                {/* Content */}
                <div className={cn("min-w-0", isPast && "opacity-50")}>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(kd.date)}
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {kd.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {kd.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
