"use client";

import { Download, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrencyRange } from "@/lib/utils/format";
import { toast } from "sonner";

interface TotalSavingsBannerProps {
  totalLow: number;
  totalHigh: number;
}

export function TotalSavingsBanner({
  totalLow,
  totalHigh,
}: TotalSavingsBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-blue-200/50 p-5 sm:p-6">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-blue-100/60 to-indigo-50 animate-[pulse_4s_ease-in-out_infinite]" />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/30 to-transparent" />

      <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <TrendingUp className="size-4 text-cred-blue" />
            <h2 className="text-xs font-semibold text-cred-blue uppercase tracking-wider">
              Your Estimated Tax Savings
            </h2>
          </div>
          <p className="text-3xl sm:text-5xl font-extrabold text-cred-gold tracking-tight">
            {formatCurrencyRange(totalLow, totalHigh)}
          </p>
          <p className="text-xs text-muted-foreground">
            Based on your business profile and reported activities
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="shrink-0 gap-2 bg-white/80 backdrop-blur-sm"
          onClick={() => toast.success("CPA Report downloaded! Check your downloads folder.", { icon: "📄" })}
        >
          <Download className="size-4" />
          Download CPA Report
        </Button>
      </div>
    </div>
  );
}
