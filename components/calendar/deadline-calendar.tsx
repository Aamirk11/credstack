"use client";

import { useMemo } from "react";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  isToday,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { DeadlineEvent } from "@/lib/types";

interface DeadlineCalendarProps {
  deadlines: DeadlineEvent[];
  currentMonth: Date;
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  onMonthChange: (date: Date) => void;
}

const DEADLINE_TYPE_COLORS: Record<string, string> = {
  "grant-deadline": "bg-cred-blue",
  "tax-filing": "bg-cred-gold",
  "application-due": "bg-purple-500",
  "review-date": "bg-amber-500",
  "report-due": "bg-cred-green",
};

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function DeadlineCalendar({
  deadlines,
  currentMonth,
  selectedDate,
  onSelectDate,
  onMonthChange,
}: DeadlineCalendarProps) {
  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const calStart = startOfWeek(monthStart);
    const calEnd = endOfWeek(monthEnd);
    return eachDayOfInterval({ start: calStart, end: calEnd });
  }, [currentMonth]);

  const deadlinesByDate = useMemo(() => {
    const map = new Map<string, DeadlineEvent[]>();
    deadlines.forEach((d) => {
      const key = d.date.split("T")[0];
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(d);
    });
    return map;
  }, [deadlines]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{format(currentMonth, "MMMM yyyy")}</CardTitle>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onMonthChange(subMonths(currentMonth, 1))}
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onMonthChange(addMonths(currentMonth, 1))}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Weekday headers */}
        <div className="grid grid-cols-7 mb-2">
          {WEEKDAYS.map((day) => (
            <div
              key={day}
              className="text-center text-xs font-medium text-muted-foreground py-1"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Day grid */}
        <div className="grid grid-cols-7">
          {calendarDays.map((day) => {
            const dateKey = format(day, "yyyy-MM-dd");
            const dayDeadlines = deadlinesByDate.get(dateKey) || [];
            const inMonth = isSameMonth(day, currentMonth);
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            const today = isToday(day);

            return (
              <button
                key={dateKey}
                onClick={() => onSelectDate(day)}
                className={cn(
                  "relative flex flex-col items-center justify-start p-1 h-12 sm:h-14 rounded-md transition-colors",
                  inMonth ? "text-foreground" : "text-muted-foreground/40",
                  isSelected && "bg-cred-blue/10 ring-1 ring-cred-blue",
                  !isSelected && inMonth && "hover:bg-muted/50",
                  today && !isSelected && "bg-muted"
                )}
              >
                <span
                  className={cn(
                    "text-sm leading-none",
                    today && "font-bold text-cred-blue",
                    isSelected && "font-semibold"
                  )}
                >
                  {format(day, "d")}
                </span>

                {/* Deadline dots */}
                {dayDeadlines.length > 0 && (
                  <div className="flex gap-0.5 mt-1 flex-wrap justify-center">
                    {dayDeadlines.slice(0, 3).map((dl, i) => (
                      <span
                        key={i}
                        className={cn(
                          "size-1.5 rounded-full",
                          DEADLINE_TYPE_COLORS[dl.type] || "bg-slate-400"
                        )}
                      />
                    ))}
                    {dayDeadlines.length > 3 && (
                      <span className="text-[8px] text-muted-foreground">
                        +{dayDeadlines.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mt-4 pt-3 border-t">
          {Object.entries(DEADLINE_TYPE_COLORS).map(([type, color]) => (
            <div key={type} className="flex items-center gap-1.5">
              <span className={cn("size-2 rounded-full", color)} />
              <span className="text-[10px] text-muted-foreground capitalize">
                {type.replace(/-/g, " ")}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
