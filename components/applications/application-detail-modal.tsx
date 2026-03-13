"use client";

import { Clock, FileText, Calendar, StickyNote } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import type { GrantApplication, ApplicationStatus } from "@/lib/types";
import {
  formatCurrency,
  formatDate,
  daysUntil,
  getDeadlineColor,
  formatPercentage,
} from "@/lib/utils/format";
import { APPLICATION_STATUS_CONFIG } from "@/lib/utils/constants";

interface ApplicationDetailModalProps {
  application: GrantApplication | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStatusChange?: (id: string, status: ApplicationStatus) => void;
}

const STATUS_FLOW: ApplicationStatus[] = [
  "researching",
  "preparing",
  "submitted",
  "under-review",
  "approved",
];

export function ApplicationDetailModal({
  application,
  open,
  onOpenChange,
  onStatusChange,
}: ApplicationDetailModalProps) {
  if (!application) return null;

  const statusConfig = APPLICATION_STATUS_CONFIG[application.status];
  const daysLeft = daysUntil(application.deadline);
  const deadlineColor = getDeadlineColor(daysLeft);
  const currentStatusIdx = STATUS_FLOW.indexOf(application.status);
  const nextStatus = currentStatusIdx >= 0 && currentStatusIdx < STATUS_FLOW.length - 1
    ? STATUS_FLOW[currentStatusIdx + 1]
    : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <Badge className={cn(statusConfig.color, "text-xs")}>
              {statusConfig.label}
            </Badge>
          </div>
          <DialogTitle>{application.grantName}</DialogTitle>
          <DialogDescription>{application.agency}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Amount & Deadline */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Amount Requested</p>
              <p className="text-lg font-bold text-cred-gold">
                {formatCurrency(application.amountRequested)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Deadline</p>
              <p className={cn("text-sm font-semibold", deadlineColor)}>
                {formatDate(application.deadline)}
                {daysLeft > 0 && (
                  <span className="font-normal"> ({daysLeft}d left)</span>
                )}
              </p>
            </div>
          </div>

          <Separator />

          {/* Documents progress */}
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <FileText className="size-4 text-muted-foreground" />
              <span className="text-sm font-medium">Documents</span>
            </div>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="font-medium">Progress</span>
              <span className="text-muted-foreground tabular-nums">
                {application.documentsUploaded}/{application.documentsRequired}
              </span>
            </div>
            <Progress
              value={
                application.documentsRequired > 0
                  ? (application.documentsUploaded / application.documentsRequired) * 100
                  : 0
              }
            />
          </div>

          {/* Completion (pre-submission) */}
          {["researching", "preparing"].includes(application.status) && (
            <div>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="font-medium">Completion</span>
                <span className="text-muted-foreground tabular-nums">
                  {formatPercentage(application.completionPercentage)}
                </span>
              </div>
              <Progress value={application.completionPercentage} />
            </div>
          )}

          {/* Notes */}
          {application.notes && (
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <StickyNote className="size-4 text-muted-foreground" />
                <span className="text-sm font-medium">Notes</span>
              </div>
              <p className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
                {application.notes}
              </p>
            </div>
          )}

          {/* Next step */}
          {application.nextStep && (
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Next Step</p>
              <p className="text-sm font-medium text-foreground">
                {application.nextStep}
              </p>
            </div>
          )}

          {/* Timeline info */}
          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
            {application.submittedDate && (
              <span className="flex items-center gap-1">
                <Calendar className="size-3" />
                Submitted: {formatDate(application.submittedDate)}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Clock className="size-3" />
              Updated: {formatDate(application.lastUpdated)}
            </span>
          </div>
        </div>

        <DialogFooter>
          {nextStatus && (
            <Button
              className="bg-cred-blue hover:bg-cred-blue-dark text-white"
              onClick={() => onStatusChange?.(application.id, nextStatus)}
            >
              Move to {APPLICATION_STATUS_CONFIG[nextStatus].label}
            </Button>
          )}
          {application.status !== "denied" && (
            <Button
              variant="destructive"
              onClick={() => onStatusChange?.(application.id, "denied")}
            >
              Mark Denied
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
