import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { EligibilityReason } from "@/lib/types";

interface EligibilityChecklistProps {
  reasons: EligibilityReason[];
}

export function EligibilityChecklist({ reasons }: EligibilityChecklistProps) {
  const metCount = reasons.filter((r) => r.met).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Eligibility Checklist</CardTitle>
        <p className="text-sm text-muted-foreground">
          You meet{" "}
          <span className="font-semibold text-cred-green">
            {metCount} of {reasons.length}
          </span>{" "}
          criteria
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {reasons.map((reason, i) => (
            <div key={i} className="flex gap-3">
              {reason.met ? (
                <CheckCircle2 className="size-5 shrink-0 text-cred-green mt-0.5" />
              ) : (
                <Circle className="size-5 shrink-0 text-muted-foreground/40 mt-0.5" />
              )}
              <div className="min-w-0">
                <p
                  className={cn(
                    "text-sm font-medium",
                    reason.met ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {reason.criterion}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {reason.explanation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
