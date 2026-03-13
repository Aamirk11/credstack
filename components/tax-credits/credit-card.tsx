"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Share2, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { TaxCredit } from "@/lib/types";
import { formatCurrencyRange, formatCurrency, formatPercentage } from "@/lib/utils/format";

interface CreditCardProps {
  credit: TaxCredit;
}

const CATEGORY_LABELS: Record<string, string> = {
  "r-and-d": "R&D",
  employment: "Employment",
  energy: "Energy",
  investment: "Investment",
  "state-specific": "State-Specific",
  industry: "Industry",
};

const CATEGORY_COLORS: Record<string, string> = {
  "r-and-d": "bg-blue-100 text-blue-700",
  employment: "bg-purple-100 text-purple-700",
  energy: "bg-emerald-100 text-emerald-700",
  investment: "bg-amber-100 text-amber-700",
  "state-specific": "bg-rose-100 text-rose-700",
  industry: "bg-slate-100 text-slate-700",
};

export function CreditCard({ credit }: CreditCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Badge
                className={cn(
                  "text-xs",
                  CATEGORY_COLORS[credit.category] || "bg-slate-100 text-slate-700"
                )}
              >
                {CATEGORY_LABELS[credit.category] || credit.category}
              </Badge>
              <span className="text-xs text-muted-foreground">
                IRS Form {credit.irsFormNumber}
              </span>
            </div>
            <CardTitle className="text-lg">{credit.name}</CardTitle>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs text-muted-foreground">Estimated Value</p>
            <p className="text-lg font-bold text-cred-gold">
              {formatCurrencyRange(credit.estimatedValueLow, credit.estimatedValueHigh)}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Confidence meter */}
        <div>
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="font-medium">Confidence</span>
            <span className="text-muted-foreground tabular-nums">
              {formatPercentage(credit.confidence)}
            </span>
          </div>
          <Progress value={credit.confidence} />
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground">{credit.description}</p>

        {/* Eligibility reasons */}
        <div>
          <p className="text-xs font-medium text-foreground mb-2">
            Why you qualify:
          </p>
          <ul className="space-y-1">
            {credit.eligibilityReasons.map((reason, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-cred-green" />
                {reason}
              </li>
            ))}
          </ul>
        </div>

        {/* Annual limit + carry forward */}
        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
          {credit.annualLimit > 0 && (
            <span>
              Annual limit:{" "}
              <span className="font-medium text-foreground">
                {formatCurrency(credit.annualLimit)}
              </span>
            </span>
          )}
          {credit.carryForwardYears > 0 && (
            <span>
              Carry forward:{" "}
              <span className="font-medium text-foreground">
                {credit.carryForwardYears} years
              </span>
            </span>
          )}
        </div>

        {/* Expandable details */}
        {expanded && (
          <div className="space-y-4 pt-2 border-t">
            {/* Claiming steps */}
            <div>
              <p className="text-xs font-medium text-foreground mb-2">
                How to claim:
              </p>
              <ol className="space-y-1.5 list-decimal list-inside">
                {credit.claimingSteps.map((step, i) => (
                  <li key={i} className="text-sm text-muted-foreground">
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            {/* Qualifying expenses */}
            <div>
              <p className="text-xs font-medium text-foreground mb-1">
                Qualifying expenses:
              </p>
              <p className="text-sm text-muted-foreground">
                {credit.qualifyingExpenses}
              </p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 pt-1">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() => alert("Share with CPA feature is available in Pro.")}
          >
            <Share2 className="size-3.5" />
            Share with CPA
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <>
                <ChevronUp className="size-3.5" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="size-3.5" />
                Learn More
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
