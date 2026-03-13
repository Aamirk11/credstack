"use client";

import { FileText, ArrowRight, Calculator, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCredStackData } from "@/lib/hooks/use-credstack-data";
import { getTotalCreditRange } from "@/lib/utils/calculations";
import { TotalSavingsBanner } from "@/components/tax-credits/total-savings-banner";
import { CreditEstimateChart } from "@/components/tax-credits/credit-estimate-chart";
import { CreditCard } from "@/components/tax-credits/credit-card";

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
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Tax Credit Report</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </p>
      </div>

      {/* Total savings banner */}
      <TotalSavingsBanner totalLow={totalLow} totalHigh={totalHigh} />

      {/* Chart */}
      <CreditEstimateChart credits={taxCredits} />

      {/* Credit cards */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Your Tax Credits ({taxCredits.length})
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {taxCredits.map((credit) => (
            <CreditCard key={credit.id} credit={credit} />
          ))}
        </div>
      </div>

      {/* What's Next section */}
      <Card>
        <CardHeader>
          <CardTitle>What&apos;s Next?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-3">
            {steps.map((step, i) => {
              const StepIcon = step.icon;
              return (
                <div key={i} className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cred-blue/10">
                    <StepIcon className="size-5 text-cred-blue" />
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
