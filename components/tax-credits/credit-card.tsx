"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { TaxCredit } from "@/lib/types";
import { formatCurrencyRange, formatCurrency, formatPercentage } from "@/lib/utils/format";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

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

function getConfidenceColor(confidence: number): string {
  if (confidence >= 70) return "bg-cred-green";
  if (confidence >= 40) return "bg-amber-500";
  return "bg-red-500";
}

function getConfidenceTrackColor(confidence: number): string {
  if (confidence >= 70) return "bg-cred-green/20";
  if (confidence >= 40) return "bg-amber-100";
  return "bg-red-100";
}

export function CreditCard({ credit }: CreditCardProps) {
  const [expanded, setExpanded] = useState(false);
  const confidenceColor = getConfidenceColor(credit.confidence);
  const trackColor = getConfidenceTrackColor(credit.confidence);

  return (
    <Card>
      <CardHeader className="pb-2 px-4 pt-4">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <Badge
                className={cn(
                  "text-[10px]",
                  CATEGORY_COLORS[credit.category] || "bg-slate-100 text-slate-700"
                )}
              >
                {CATEGORY_LABELS[credit.category] || credit.category}
              </Badge>
              <span className="text-[10px] text-muted-foreground">
                Form {credit.irsFormNumber}
              </span>
            </div>
            <CardTitle className="text-base">{credit.name}</CardTitle>
          </div>
          <div className="text-right shrink-0">
            <p className="text-[10px] text-muted-foreground">Est. Value</p>
            <p className="text-base font-bold text-cred-gold">
              {formatCurrencyRange(credit.estimatedValueLow, credit.estimatedValueHigh)}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 px-4 pb-4">
        {/* Confidence meter - colored progress bar */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-medium">Confidence</span>
            <span className="text-muted-foreground tabular-nums">
              {formatPercentage(credit.confidence)}
            </span>
          </div>
          <div className={cn("h-2 rounded-full overflow-hidden", trackColor)}>
            <div
              className={cn("h-full rounded-full transition-all duration-500", confidenceColor)}
              style={{ width: `${credit.confidence}%` }}
            />
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-muted-foreground leading-relaxed">{credit.description}</p>

        {/* Eligibility reasons */}
        <div>
          <p className="text-[10px] font-medium text-foreground mb-1">
            Why you qualify:
          </p>
          <ul className="space-y-0.5">
            {credit.eligibilityReasons.map((reason, i) => (
              <li
                key={i}
                className="flex items-start gap-1.5 text-xs text-muted-foreground"
              >
                <span className="mt-1.5 size-1 shrink-0 rounded-full bg-cred-green" />
                {reason}
              </li>
            ))}
          </ul>
        </div>

        {/* Annual limit + carry forward */}
        <div className="flex flex-wrap gap-3 text-[11px] text-muted-foreground">
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

        {/* Expandable details with AnimatePresence */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="space-y-3 pt-2 border-t">
                {/* Claiming steps */}
                <div>
                  <p className="text-[10px] font-medium text-foreground mb-1">
                    How to claim:
                  </p>
                  <ol className="space-y-1 list-decimal list-inside">
                    {credit.claimingSteps.map((step, i) => (
                      <li key={i} className="text-xs text-muted-foreground">
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Qualifying expenses */}
                <div>
                  <p className="text-[10px] font-medium text-foreground mb-0.5">
                    Qualifying expenses:
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {credit.qualifyingExpenses}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-xs h-7"
            onClick={() => toast.success("Report link copied! Share it with your CPA.", { icon: "📋" })}
          >
            <Share2 className="size-3" />
            Share with CPA
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 text-xs h-7"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <>
                <ChevronUp className="size-3" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="size-3" />
                Learn More
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
