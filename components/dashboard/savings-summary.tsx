"use client";

import { DollarSign, TrendingUp, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useCredStackData } from "@/lib/hooks/use-credstack-data";
import {
  getTotalGrantRange,
  getTotalCreditRange,
  getActiveApplicationCount,
} from "@/lib/utils/calculations";
import { formatCurrencyRange, formatCurrency } from "@/lib/utils/format";

export function SavingsSummary() {
  const { grants, taxCredits, applications } = useCredStackData();

  const grantRange = getTotalGrantRange(grants);
  const creditRange = getTotalCreditRange(taxCredits);
  const activeApps = getActiveApplicationCount(applications);

  const totalMin = grantRange.totalMin + creditRange.totalLow;
  const totalMax = grantRange.totalMax + creditRange.totalHigh;

  const grantTotal = grantRange.totalMax;
  const creditTotal = creditRange.totalHigh;
  const combinedTotal = grantTotal + creditTotal;
  const grantPercent = combinedTotal > 0 ? Math.round((grantTotal / combinedTotal) * 100) : 50;
  const creditPercent = 100 - grantPercent;

  // ROI calculation: Pro plan cost ($29/mo = $348/yr) vs potential savings
  const proCost = 348;
  const roiMultiple = totalMax > 0 ? Math.round(totalMax / proCost) : 0;

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

            {/* Mini breakdown bar */}
            <div className="mt-3 space-y-1.5">
              <div className="flex items-center justify-between text-[10px] text-slate-500">
                <span>Grants ({formatCurrency(grantTotal)})</span>
                <span>Tax Credits ({formatCurrency(creditTotal)})</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-200/60 overflow-hidden flex">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${grantPercent}%` }}
                  transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                  className="h-full bg-cred-blue rounded-l-full"
                />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${creditPercent}%` }}
                  transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                  className="h-full bg-cred-gold rounded-r-full"
                />
              </div>
              <div className="flex items-center gap-3 text-[10px] text-slate-400">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-cred-blue" />
                  Grants {grantPercent}%
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-cred-gold" />
                  Tax Credits {creditPercent}%
                </div>
              </div>
            </div>

            {/* ROI + stats row */}
            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-200/60">
              {roiMultiple > 0 && (
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-cred-green/10">
                    <TrendingUp className="w-3.5 h-3.5 text-cred-green" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-cred-green">{roiMultiple}x ROI</p>
                    <p className="text-[9px] text-slate-400">vs Pro cost</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-cred-blue/10">
                  <Zap className="w-3.5 h-3.5 text-cred-blue" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-700">{grants.length + taxCredits.length}</p>
                  <p className="text-[9px] text-slate-400">programs</p>
                </div>
              </div>
              <p className="text-xs text-slate-500 ml-auto">
                {activeApps} in progress
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      {/* Subtle glow effect behind the amount */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-48 h-24 bg-cred-gold/10 blur-3xl rounded-full pointer-events-none" />
    </Card>
  );
}
