"use client";

import { useState } from "react";
import { AlertTriangle, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useCredStackData } from "@/lib/hooks/use-credstack-data";
import { DeadlineCalendar } from "@/components/calendar/deadline-calendar";
import { DeadlineList } from "@/components/calendar/deadline-list";

export default function CalendarPage() {
  const { deadlines } = useCredStackData();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const now = new Date();
  const upcomingCount = deadlines.filter(
    (d) => new Date(d.date) > now
  ).length;
  const urgentCount = deadlines.filter(
    (d) => d.urgency === "urgent" && new Date(d.date) > now
  ).length;

  return (
    <div className="space-y-4">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Deadline Calendar
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Track all your grant and tax deadlines in one place
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardContent className="flex items-center gap-2.5 p-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cred-blue/10">
              <Clock className="size-4 text-cred-blue" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">
                {upcomingCount}
              </p>
              <p className="text-[10px] text-muted-foreground">
                Upcoming
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-2.5 p-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-100">
              <AlertTriangle className="size-4 text-red-600" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">
                {urgentCount}
              </p>
              <p className="text-[10px] text-muted-foreground">Urgent</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Single column on mobile, two-column on desktop */}
      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DeadlineCalendar
            deadlines={deadlines}
            currentMonth={currentMonth}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            onMonthChange={setCurrentMonth}
          />
        </div>
        <div>
          <DeadlineList
            deadlines={deadlines}
            selectedDate={selectedDate}
          />
        </div>
      </div>
    </div>
  );
}
