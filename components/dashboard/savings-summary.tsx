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
    <Card className="bg-gradient-to-br from-blue-50 to-blue-50/40 ring-cred-blue/15">
      <CardContent>
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-cred-blue/10 shrink-0">
            <DollarSign className="w-6 h-6 text-cred-blue" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-600">
              Total Potential Value
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-cred-gold mt-1 tracking-tight">
              {formatCurrencyRange(totalMin, totalMax)}
            </p>
            <p className="text-sm text-slate-500 mt-2">
              {grants.length} grant{grants.length !== 1 ? "s" : ""}
              {" \u2022 "}
              {taxCredits.length} tax credit{taxCredits.length !== 1 ? "s" : ""}
              {" \u2022 "}
              {activeApps} in progress
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
