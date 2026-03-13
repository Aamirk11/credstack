"use client";

import { FileText, ArrowRight, Calculator, Send, Download, Share2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCredStackData } from "@/lib/hooks/use-credstack-data";
import { getTotalCreditRange } from "@/lib/utils/calculations";
import { TotalSavingsBanner } from "@/components/tax-credits/total-savings-banner";
import { CreditEstimateChart } from "@/components/tax-credits/credit-estimate-chart";
import { CreditCard } from "@/components/tax-credits/credit-card";
import { toast } from "sonner";

export default function TaxCreditsPage() {
  const { taxCredits } = useCredStackData();
  const { totalLow, totalHigh } = getTotalCreditRange(taxCredits);

  const steps = [
    {
      icon: FileText,
      title: "Review Your Credits",
      description:
        "Review each credit below and expand details to understand qualification criteria.",
    },
    {
      icon: Calculator,
      title: "Gather Documentation",
      description:
        "Collect expense records, payroll data, and other supporting documents for each credit.",
    },
    {
      icon: Send,
      title: "Share with Your CPA",
      description:
        "Download the CPA report or share individual credits directly with your tax professional.",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tax Credit Report</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() => toast.success("Report link copied! Share it with your CPA.", { icon: "📋" })}
          >
            <Share2 className="size-3.5" />
            Share with CPA
          </Button>
          <Button
            size="sm"
            className="gap-1.5 bg-cred-blue hover:bg-cred-blue-dark text-white"
            onClick={() => toast.success("CPA Report downloaded! Check your downloads folder.", { icon: "📄" })}
          >
            <Download className="size-3.5" />
            Download CPA Report
          </Button>
        </div>
      </div>

      {/* Total savings banner */}
      <TotalSavingsBanner totalLow={totalLow} totalHigh={totalHigh} />

      {/* Chart */}
      <CreditEstimateChart credits={taxCredits} />

      {/* Credit cards */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">
          Your Tax Credits ({taxCredits.length})
        </h2>
        <div className="grid gap-3 md:grid-cols-2">
          {taxCredits.map((credit) => (
            <CreditCard key={credit.id} credit={credit} />
          ))}
        </div>
      </div>

      {/* What's Next section */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>What&apos;s Next?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            {steps.map((step, i) => {
              const StepIcon = step.icon;
              return (
                <div key={i} className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cred-blue/10">
                    <StepIcon className="size-4 text-cred-blue" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {i + 1}. {step.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
