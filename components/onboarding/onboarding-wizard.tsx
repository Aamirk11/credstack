"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { StepBusinessInfo, type BusinessInfoData } from "./step-business-info";
import { StepFinancials, type FinancialsData } from "./step-financials";
import { StepDemographics, type DemographicsData } from "./step-demographics";
import { StepGoals, type GoalsData } from "./step-goals";

const STEP_LABELS = [
  "Business Info",
  "Financials",
  "Demographics",
  "Activities",
];

interface FormData {
  businessInfo: BusinessInfoData;
  financials: FinancialsData;
  demographics: DemographicsData;
  goals: GoalsData;
}

const INITIAL_DATA: FormData = {
  businessInfo: {
    businessName: "",
    industry: "",
    state: "",
    city: "",
    yearFounded: "",
  },
  financials: {
    revenueRange: "",
    employeeCount: "",
    annualRdSpend: "",
  },
  demographics: {},
  goals: {
    equipmentPurchases: false,
    newHires: false,
    newHireCount: "",
    energyImprovements: false,
    exportActivity: false,
  },
};

export function OnboardingWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);

  const totalSteps = STEP_LABELS.length;
  const progressValue = ((step + 1) / totalSteps) * 100;
  const isFirstStep = step === 0;
  const isLastStep = step === totalSteps - 1;

  function handleNext() {
    if (isLastStep) {
      router.push("/dashboard");
    } else {
      setStep((s) => s + 1);
    }
  }

  function handleBack() {
    setStep((s) => Math.max(0, s - 1));
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* Logo */}
      <div className="mb-8 flex items-center justify-center gap-2">
        <Shield className="size-7 text-cred-blue" />
        <span className="text-xl font-bold text-cred-blue">CredStack</span>
      </div>

      {/* Step labels */}
      <div className="mb-2 flex items-center justify-between">
        {STEP_LABELS.map((label, i) => (
          <div
            key={label}
            className={cn(
              "flex items-center gap-1.5 text-xs font-medium",
              i <= step ? "text-cred-blue" : "text-muted-foreground"
            )}
          >
            <span
              className={cn(
                "flex size-5 items-center justify-center rounded-full text-[10px] font-bold",
                i < step
                  ? "bg-cred-green text-white"
                  : i === step
                    ? "bg-cred-blue text-white"
                    : "bg-muted text-muted-foreground"
              )}
            >
              {i < step ? (
                <CheckCircle className="size-3" />
              ) : (
                i + 1
              )}
            </span>
            <span className="hidden sm:inline">{label}</span>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <Progress value={progressValue} className="mb-8" />

      {/* Step content */}
      <Card>
        <CardContent className="p-6 sm:p-8">
          {step === 0 && (
            <StepBusinessInfo
              data={formData.businessInfo}
              onChange={(businessInfo) =>
                setFormData((prev) => ({ ...prev, businessInfo }))
              }
            />
          )}
          {step === 1 && (
            <StepFinancials
              data={formData.financials}
              onChange={(financials) =>
                setFormData((prev) => ({ ...prev, financials }))
              }
            />
          )}
          {step === 2 && (
            <StepDemographics
              data={formData.demographics}
              onChange={(demographics) =>
                setFormData((prev) => ({ ...prev, demographics }))
              }
            />
          )}
          {step === 3 && (
            <StepGoals
              data={formData.goals}
              onChange={(goals) =>
                setFormData((prev) => ({ ...prev, goals }))
              }
            />
          )}

          {/* Navigation buttons */}
          <div className="mt-8 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={isFirstStep}
              className="gap-1"
            >
              <ArrowLeft className="size-4" />
              Back
            </Button>
            <Button
              onClick={handleNext}
              className={cn(
                "gap-1",
                isLastStep && "bg-cred-green hover:bg-cred-green-dark"
              )}
            >
              {isLastStep ? (
                <>
                  Complete Profile
                  <CheckCircle className="size-4" />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="size-4" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Step count */}
      <p className="mt-4 text-center text-xs text-muted-foreground">
        Step {step + 1} of {totalSteps}
      </p>
    </div>
  );
}
