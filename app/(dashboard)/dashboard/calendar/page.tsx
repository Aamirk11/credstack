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
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Deadline Calendar
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Track all your grant and tax deadlines in one place
        </p>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardContent className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cred-blue/10">
              <Clock className="size-5 text-cred-blue" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {upcomingCount}
              </p>
              <p className="text-xs text-muted-foreground">
                Upcoming Deadlines
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-100">
              <AlertTriangle className="size-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {urgentCount}
              </p>
              <p className="text-xs text-muted-foreground">Urgent</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Two-column layout */}
      <div className="grid gap-6 lg:grid-cols-3">
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
