"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { GrantApplication, ApplicationStatus } from "@/lib/types";
import { APPLICATION_STATUS_CONFIG } from "@/lib/utils/constants";
import { ApplicationCard } from "./application-card";
import { ApplicationDetailModal } from "./application-detail-modal";
import { toast } from "sonner";

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

const COLUMN_DOT_COLORS: Record<string, string> = {
  researching: "bg-slate-400",
  preparing: "bg-blue-500",
  submitted: "bg-purple-500",
  "under-review": "bg-amber-500",
  approved: "bg-cred-green",
  denied: "bg-red-500",
};

const COLUMN_HEADER_BG: Record<string, string> = {
  researching: "bg-slate-50",
  preparing: "bg-blue-50",
  submitted: "bg-purple-50",
  "under-review": "bg-amber-50",
  approved: "bg-green-50",
  denied: "bg-red-50",
};

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
      <ScrollArea className="w-full -mx-1 px-1">
        <div className="flex gap-3 pb-4 min-w-[900px]">
          {columns.map((col) => (
            <div
              key={col.status}
              className="flex-1 min-w-[180px] max-w-[260px]"
            >
              {/* Column header */}
              <div className={cn(
                "flex items-center gap-2 mb-2 px-2 py-1.5 rounded-lg",
                COLUMN_HEADER_BG[col.status]
              )}>
                <div
                  className={cn(
                    "size-2 rounded-full",
                    COLUMN_DOT_COLORS[col.status]
                  )}
                />
                <span className="text-xs font-semibold text-foreground">
                  {col.config.label}
                </span>
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 ml-auto h-4">
                  {col.apps.length}
                </Badge>
              </div>

              {/* Column body */}
              <div className="space-y-2 min-h-[180px] rounded-lg bg-muted/20 p-1.5">
                {col.apps.length === 0 ? (
                  <p className="text-[10px] text-muted-foreground text-center py-6">
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
          toast.success(`Status updated to ${APPLICATION_STATUS_CONFIG[status].label}`);
          setModalOpen(false);
        }}
      />
    </>
  );
}
