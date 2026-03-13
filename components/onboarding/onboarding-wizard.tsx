"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Clock,
  HelpCircle,
  AlertTriangle,
  Sparkles,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CredStackLogo } from "@/components/shared/credstack-logo";
import { StepBusinessInfo, type BusinessInfoData } from "./step-business-info";
import { StepFinancials, type FinancialsData } from "./step-financials";
import { StepDemographics, type DemographicsData } from "./step-demographics";
import { StepGoals, type GoalsData } from "./step-goals";

const STEP_LABELS = [
  "Welcome",
  "Business Info",
  "Financials",
  "Demographics",
  "Activities",
  "Results",
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

const PAIN_POINTS = [
  {
    icon: Clock,
    title: "Missing deadlines?",
    description: "Application windows close every month",
  },
  {
    icon: HelpCircle,
    title: "Don't know what's available?",
    description: "There are 10,000+ programs to sift through",
  },
  {
    icon: AlertTriangle,
    title: "Applications too complex?",
    description: "Pages of forms, confusing eligibility rules",
  },
];

// Confetti particle component
function ConfettiParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 24 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 1.5,
        duration: 2 + Math.random() * 2,
        size: 4 + Math.random() * 8,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-cred-gold"
          style={{
            left: `${p.x}%`,
            bottom: -10,
            width: p.size,
            height: p.size,
          }}
          initial={{ y: 0, opacity: 1 }}
          animate={{
            y: -500,
            opacity: [1, 1, 0],
            x: [0, (Math.random() - 0.5) * 80],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

export function OnboardingWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);

  const totalSteps = STEP_LABELS.length;
  const isWelcome = step === 0;
  const isResults = step === totalSteps - 1;
  const formStepIndex = step - 1; // 0-based index into form steps (1-4)

  // Calculate estimated value based on form inputs
  const estimatedValue = useMemo(() => {
    let value = 0;

    // Step 1: Business Info
    if (formData.businessInfo.state) value += 4200;
    if (formData.businessInfo.industry) value += 6800;
    if (formData.businessInfo.yearFounded) value += 2100;

    // Step 2: Financials
    if (formData.financials.revenueRange) value += 8500;
    if (formData.financials.employeeCount) {
      const count = parseInt(formData.financials.employeeCount);
      if (count > 0) value += Math.min(count * 1200, 15000);
    }
    if (formData.financials.annualRdSpend) {
      const spend = parseInt(formData.financials.annualRdSpend);
      if (spend > 0) value += Math.min(Math.round(spend * 0.15), 25000);
    }

    // Step 3: Demographics
    const demoCount = Object.values(formData.demographics).filter(Boolean).length;
    value += demoCount * 5500;

    // Step 4: Goals
    if (formData.goals.equipmentPurchases) value += 7200;
    if (formData.goals.newHires) {
      const hires = parseInt(formData.goals.newHireCount) || 1;
      value += Math.min(hires * 2400, 12000);
    }
    if (formData.goals.energyImprovements) value += 9800;
    if (formData.goals.exportActivity) value += 4600;

    return value;
  }, [formData]);

  // Progress calculation for form steps only (steps 1-4)
  const formSteps = 4;
  const progressValue =
    isWelcome ? 0 : isResults ? 100 : ((formStepIndex) / formSteps) * 100;

  function handleNext() {
    if (isResults) {
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
      <div className="mb-6 flex items-center justify-center">
        <CredStackLogo size="sm" />
      </div>

      {/* Value Estimator - visible during form steps */}
      {!isWelcome && !isResults && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 flex items-center justify-center gap-2 rounded-full bg-cred-green/10 px-4 py-2"
        >
          <DollarSign className="size-4 text-cred-green" />
          <span className="text-sm font-medium text-foreground">
            Based on your profile:{" "}
            <span className="text-cred-green font-bold">
              ~${estimatedValue.toLocaleString()}
            </span>{" "}
            in potential opportunities
          </span>
        </motion.div>
      )}

      {/* Progress indicator - circles connected by lines */}
      {!isWelcome && !isResults && (
        <div className="mb-6">
          <div className="flex items-center justify-between">
            {STEP_LABELS.slice(1, 5).map((label, i) => (
              <div key={label} className="flex flex-1 items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "flex size-8 items-center justify-center rounded-full border-2 text-xs font-bold transition-all",
                      i < formStepIndex
                        ? "border-cred-green bg-cred-green text-white"
                        : i === formStepIndex
                          ? "border-cred-blue bg-cred-blue text-white"
                          : "border-muted bg-background text-muted-foreground"
                    )}
                  >
                    {i < formStepIndex ? (
                      <CheckCircle className="size-4" />
                    ) : (
                      i + 1
                    )}
                  </div>
                  <span
                    className={cn(
                      "mt-1.5 text-[10px] font-medium sm:text-xs",
                      i <= formStepIndex
                        ? "text-cred-blue"
                        : "text-muted-foreground"
                    )}
                  >
                    {label}
                  </span>
                </div>
                {i < 3 && (
                  <div
                    className={cn(
                      "mx-1 h-0.5 flex-1 rounded-full transition-all sm:mx-2",
                      i < formStepIndex ? "bg-cred-green" : "bg-muted"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
        >
          {/* Welcome Step */}
          {isWelcome && (
            <Card>
              <CardContent className="p-6 sm:p-8">
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Sparkles className="mx-auto mb-3 size-10 text-cred-gold" />
                    <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                      Let&apos;s Find Your Free Money
                    </h2>
                    <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
                      In the next 5 minutes, we&apos;ll match you with grants
                      and credits you qualify for.
                    </p>
                  </motion.div>

                  <div className="mt-8 space-y-3">
                    {PAIN_POINTS.map((point, i) => (
                      <motion.div
                        key={point.title}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + i * 0.15 }}
                        className="flex items-start gap-3 rounded-lg border border-border bg-slate-50 p-4 text-left"
                      >
                        <point.icon className="mt-0.5 size-5 shrink-0 text-cred-blue" />
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            {point.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {point.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <Button
                    onClick={handleNext}
                    size="lg"
                    className="mt-8 h-12 w-full gap-2 text-base"
                  >
                    Get Started
                    <ArrowRight className="size-4" />
                  </Button>
                  <p className="mt-3 text-xs text-muted-foreground">
                    Takes about 5 minutes. No credit card required.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Form Steps */}
          {!isWelcome && !isResults && (
            <Card>
              <CardContent className="p-6 sm:p-8">
                {formStepIndex === 0 && (
                  <StepBusinessInfo
                    data={formData.businessInfo}
                    onChange={(businessInfo) =>
                      setFormData((prev) => ({ ...prev, businessInfo }))
                    }
                  />
                )}
                {formStepIndex === 1 && (
                  <StepFinancials
                    data={formData.financials}
                    onChange={(financials) =>
                      setFormData((prev) => ({ ...prev, financials }))
                    }
                  />
                )}
                {formStepIndex === 2 && (
                  <StepDemographics
                    data={formData.demographics}
                    onChange={(demographics) =>
                      setFormData((prev) => ({ ...prev, demographics }))
                    }
                  />
                )}
                {formStepIndex === 3 && (
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
                    className="gap-1"
                  >
                    <ArrowLeft className="size-4" />
                    Back
                  </Button>
                  <Button
                    onClick={handleNext}
                    className={cn(
                      "gap-1",
                      formStepIndex === 3 &&
                        "bg-cred-green hover:bg-cred-green-dark"
                    )}
                  >
                    {formStepIndex === 3 ? (
                      <>
                        See My Results
                        <Sparkles className="size-4" />
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
          )}

          {/* Results / Celebration Step */}
          {isResults && (
            <Card className="relative overflow-hidden">
              <ConfettiParticles />
              <CardContent className="relative p-6 sm:p-10">
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                    }}
                  >
                    <CheckCircle className="mx-auto size-16 text-cred-green" />
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-4 text-2xl font-bold text-foreground sm:text-3xl"
                  >
                    Results Ready!
                  </motion.h2>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-4 rounded-xl bg-cred-green/10 px-6 py-5"
                  >
                    <p className="text-lg font-bold text-foreground sm:text-xl">
                      We found{" "}
                      <span className="text-cred-blue">18 matches</span> worth
                    </p>
                    <p className="mt-1 text-3xl font-extrabold text-cred-green sm:text-4xl">
                      $47,200 - $126,800
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="mt-6 space-y-3"
                  >
                    <Button
                      render={<Link href="/dashboard" />}
                      size="lg"
                      className="h-12 w-full gap-2 bg-cred-green text-base hover:bg-cred-green-dark"
                    >
                      View Your Matches
                      <ArrowRight className="size-4" />
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      Your personalized dashboard is ready
                    </p>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Step count */}
      {!isWelcome && !isResults && (
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Step {formStepIndex + 1} of {formSteps}
        </p>
      )}
    </div>
  );
}
