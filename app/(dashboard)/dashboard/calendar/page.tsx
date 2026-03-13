"use client";

import { useState } from "react";
import { AlertTriangle, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useCredStackData } from "@/lib/hooks/use-credstack-data";
import { DeadlineCalendar } from "@/components/calendar/deadline-calendar";
import { DeadlineList } from "@/components/calendar/deadline-list";
import { PageTransition } from "@/components/shared/page-transition";

const DEADLINE_LEGEND = [
  { label: "Grant Deadline", color: "bg-cred-blue" },
  { label: "Tax Filing", color: "bg-cred-gold" },
  { label: "Application Due", color: "bg-purple-500" },
  { label: "Urgent", color: "bg-red-500" },
];

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

  const handleMonthChange = (newMonth: Date) => {
    setCurrentMonth(newMonth);
  };

  return (
    <PageTransition>
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

        {/* Color Legend */}
        <div className="flex flex-wrap items-center gap-3 px-3 py-2 rounded-lg bg-slate-50 border border-slate-100">
          <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Legend:</span>
          {DEADLINE_LEGEND.map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
              <span className="text-[11px] text-slate-600">{item.label}</span>
            </div>
          ))}
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
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMonth.toISOString().slice(0, 7)}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="lg:col-span-2"
            >
              <DeadlineCalendar
                deadlines={deadlines}
                currentMonth={currentMonth}
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
                onMonthChange={handleMonthChange}
              />
            </motion.div>
          </AnimatePresence>
          <div>
            <DeadlineList
              deadlines={deadlines}
              selectedDate={selectedDate}
            />
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
