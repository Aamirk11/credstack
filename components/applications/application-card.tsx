"use client";

import { Clock, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { GrantApplication } from "@/lib/types";
import { formatCurrency, daysUntil, getDeadlineColor } from "@/lib/utils/format";
import { APPLICATION_STATUS_CONFIG } from "@/lib/utils/constants";

interface ApplicationCardProps {
  application: GrantApplication;
  onClick?: () => void;
}

export function ApplicationCard({ application, onClick }: ApplicationCardProps) {
  const daysLeft = daysUntil(application.deadline);
  const deadlineColor = getDeadlineColor(daysLeft);
  const isPreSubmission = ["researching", "preparing"].includes(application.status);

  return (
    <Card
      className="cursor-pointer transition-all hover:shadow-md hover:ring-1 hover:ring-cred-blue/20 active:scale-[0.98]"
      onClick={onClick}
    >
      <CardContent className="space-y-2 p-3">
        <div className="flex items-start justify-between gap-1.5">
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-blue-100 text-[9px] font-bold text-blue-700">
              {application.agencyInitials}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-foreground truncate">
                {application.grantName}
              </p>
              <p className="text-[10px] text-muted-foreground">{application.agency}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-cred-gold">
            {formatCurrency(application.amountRequested)}
          </span>
          <div className={cn("flex items-center gap-1 text-[10px]", deadlineColor)}>
            <Clock className="size-2.5" />
            <span>
              {daysLeft > 0
                ? `${daysLeft}d`
                : daysLeft === 0
                ? "Today"
                : "Expired"}
            </span>
          </div>
        </div>

        {/* Progress bar for pre-submission */}
        {isPreSubmission && (
          <Progress value={application.completionPercentage} className="h-1.5" />
        )}

        {/* Documents indicator */}
        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
          <FileText className="size-2.5" />
          <span>
            {application.documentsUploaded}/{application.documentsRequired} docs
          </span>
        </div>

        {/* Next step */}
        {application.nextStep && (
          <p className="text-[10px] text-muted-foreground border-t pt-1.5">
            <span className="font-medium text-foreground">Next:</span>{" "}
            {application.nextStep}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
