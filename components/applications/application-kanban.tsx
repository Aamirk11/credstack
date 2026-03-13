"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { GrantApplication, ApplicationStatus } from "@/lib/types";
import { APPLICATION_STATUS_CONFIG } from "@/lib/utils/constants";
import { ApplicationCard } from "./application-card";
import { ApplicationDetailModal } from "./application-detail-modal";

interface ApplicationKanbanProps {
  applications: GrantApplication[];
}

const COLUMN_ORDER: ApplicationStatus[] = [
  "researching",
  "preparing",
  "submitted",
  "under-review",
  "approved",
  "denied",
];

export function ApplicationKanban({ applications }: ApplicationKanbanProps) {
  const [selectedApp, setSelectedApp] = useState<GrantApplication | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const columns = COLUMN_ORDER.map((status) => ({
    status,
    config: APPLICATION_STATUS_CONFIG[status],
    apps: applications
      .filter((a) => a.status === status)
      .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()),
  }));

  const handleCardClick = (app: GrantApplication) => {
    setSelectedApp(app);
    setModalOpen(true);
  };

  return (
    <>
      <ScrollArea className="w-full">
        <div className="flex gap-4 pb-4 min-w-[900px]">
          {columns.map((col) => (
            <div
              key={col.status}
              className="flex-1 min-w-[200px] max-w-[280px]"
            >
              {/* Column header */}
              <div className="flex items-center gap-2 mb-3 px-1">
                <div
                  className={cn(
                    "size-2.5 rounded-full",
                    col.status === "researching" && "bg-slate-400",
                    col.status === "preparing" && "bg-blue-500",
                    col.status === "submitted" && "bg-purple-500",
                    col.status === "under-review" && "bg-amber-500",
                    col.status === "approved" && "bg-cred-green",
                    col.status === "denied" && "bg-red-500"
                  )}
                />
                <span className="text-sm font-medium text-foreground">
                  {col.config.label}
                </span>
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 ml-auto">
                  {col.apps.length}
                </Badge>
              </div>

              {/* Column body */}
              <div className="space-y-3 min-h-[200px] rounded-lg bg-muted/30 p-2">
                {col.apps.length === 0 ? (
                  <p className="text-xs text-muted-foreground text-center py-8">
                    No applications
                  </p>
                ) : (
                  col.apps.map((app) => (
                    <ApplicationCard
                      key={app.id}
                      application={app}
                      onClick={() => handleCardClick(app)}
                    />
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <ApplicationDetailModal
        application={selectedApp}
        open={modalOpen}
        onOpenChange={setModalOpen}
        onStatusChange={(id, status) => {
          alert(`Status update to "${status}" would be saved. (Demo mode)`);
          setModalOpen(false);
        }}
      />
    </>
  );
}
