"use client";

import { DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useCredStackData } from "@/lib/hooks/use-credstack-data";
import {
  getTotalGrantRange,
  getTotalCreditRange,
  getActiveApplicationCount,
} from "@/lib/utils/calculations";
import { formatCurrencyRange } from "@/lib/utils/format";

export function SavingsSummary() {
  const { grants, taxCredits, applications } = useCredStackData();

  const grantRange = getTotalGrantRange(grants);
  const creditRange = getTotalCreditRange(taxCredits);
  const activeApps = getActiveApplicationCount(applications);

  const totalMin = grantRange.totalMin + creditRange.totalLow;
  const totalMax = grantRange.totalMax + creditRange.totalHigh;

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-blue-50/40 ring-cred-blue/15 overflow-hidden relative">
      <CardContent>
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-cred-blue/10 shrink-0">
            <DollarSign className="w-6 h-6 text-cred-blue" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-600">
              Total Potential Value
            </p>
            <p className="text-3xl sm:text-4xl font-extrabold text-cred-gold mt-1 tracking-tight animate-pulse-subtle">
              {formatCurrencyRange(totalMin, totalMax)}
            </p>
            <p className="text-sm text-slate-600 mt-2 font-medium">
              You may be leaving this on the table
            </p>
            <div className="flex items-center gap-3 mt-1.5">
              <p className="text-xs text-slate-500">
                {grants.length} grant{grants.length !== 1 ? "s" : ""}
                {" \u2022 "}
                {taxCredits.length} tax credit{taxCredits.length !== 1 ? "s" : ""}
                {" \u2022 "}
                {activeApps} in progress
              </p>
              <span className="text-xs font-semibold text-cred-blue cursor-pointer hover:underline">
                View breakdown
              </span>
            </div>
          </div>
        </div>
      </CardContent>
      {/* Subtle glow effect behind the amount */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-48 h-24 bg-cred-gold/10 blur-3xl rounded-full pointer-events-none" />
    </Card>
  );
}
