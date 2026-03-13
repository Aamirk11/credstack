import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrencyRange } from "@/lib/utils/format";

interface TotalSavingsBannerProps {
  totalLow: number;
  totalHigh: number;
}

export function TotalSavingsBanner({
  totalLow,
  totalHigh,
}: TotalSavingsBannerProps) {
  return (
    <div className="rounded-xl bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200/50 p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <h2 className="text-sm font-medium text-cred-blue uppercase tracking-wide">
            Total Estimated Tax Credits
          </h2>
          <p className="text-3xl sm:text-4xl font-bold text-cred-gold">
            {formatCurrencyRange(totalLow, totalHigh)}
          </p>
          <p className="text-sm text-muted-foreground">
            Based on your business profile and reported activities
          </p>
        </div>
        <Button
          variant="outline"
          className="shrink-0 gap-2"
          onClick={() => alert("CPA Report download is a Pro feature.")}
        >
          <Download className="size-4" />
          Download CPA Report
        </Button>
      </div>
    </div>
  );
}
