"use client";

import { FileText, Send, Clock, CheckCircle2, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useCredStackData } from "@/lib/hooks/use-credstack-data";
import { getActiveApplicationCount } from "@/lib/utils/calculations";
import { ApplicationKanban } from "@/components/applications/application-kanban";

export default function ApplicationsPage() {
  const { applications } = useCredStackData();

  const totalApps = applications.length;
  const submitted = applications.filter(
    (a) => ["submitted", "under-review", "approved"].includes(a.status)
  ).length;
  const inProgress = getActiveApplicationCount(applications);
  const approved = applications.filter((a) => a.status === "approved").length;
  const successRate = totalApps > 0 ? Math.round((approved / totalApps) * 100) : 0;

  const stats = [
    {
      icon: FileText,
      label: "Total",
      value: totalApps,
      color: "text-cred-blue",
      bgColor: "bg-cred-blue/10",
    },
    {
      icon: Clock,
      label: "In Progress",
      value: inProgress,
      color: "text-amber-600",
      bgColor: "bg-amber-100",
    },
    {
      icon: Send,
      label: "Submitted",
      value: submitted,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      icon: TrendingUp,
      label: "Success Rate",
      value: `${successRate}%`,
      color: "text-cred-green",
      bgColor: "bg-cred-green/10",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Application Tracker
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Track and manage your grant applications
        </p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((stat) => {
          const StatIcon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="flex items-center gap-2.5 p-3">
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${stat.bgColor}`}
                >
                  <StatIcon className={`size-4 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Kanban board */}
      <ApplicationKanban applications={applications} />
    </div>
  );
}
