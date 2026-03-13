"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Check, X, ShieldCheck, Calculator } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const MONTHLY_PRICE = 29;
const ANNUAL_PRICE = 24;
const ANNUAL_SAVINGS = Math.round(
  ((MONTHLY_PRICE - ANNUAL_PRICE) / MONTHLY_PRICE) * 100
);

interface PricingTier {
  name: string;
  price: string;
  annualPrice?: string;
  period: string;
  annualPeriod?: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
  badge?: string;
}

const PRICING_TIERS: PricingTier[] = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Discover what you qualify for",
    features: [
      "Business profile setup",
      "See matched programs",
      "View match strength",
      "Basic eligibility info",
    ],
    cta: "Start Finding Grants",
    highlighted: false,
  },
  {
    name: "Pro",
    price: `$${MONTHLY_PRICE}`,
    annualPrice: `$${ANNUAL_PRICE}`,
    period: "/month",
    annualPeriod: "/mo billed annually",
    description: "Full access to apply & track",
    features: [
      "Everything in Free",
      "Full eligibility details",
      "AI-assisted applications",
      "Document checklists",
      "Deadline reminders",
      "CPA tax credit report",
      "Application tracker",
      "Priority support",
    ],
    cta: "Start Finding Grants",
    highlighted: true,
  },
  {
    name: "Success Fee",
    price: "5%",
    period: "of won grants",
    description: "We win when you win",
    badge: "Most popular for first-time applicants",
    features: [
      "Everything in Pro",
      "Dedicated grant writer",
      "Full application support",
      "Interview preparation",
      "Post-award compliance",
      "Pay only when approved",
    ],
    cta: "Talk to Sales",
    highlighted: false,
  },
];

const COMPARISON_FEATURES = [
  { label: "Business profile & matching", free: true, pro: true, success: true },
  { label: "View match strength", free: true, pro: true, success: true },
  { label: "Full eligibility details", free: false, pro: true, success: true },
  { label: "AI-assisted applications", free: false, pro: true, success: true },
  { label: "Deadline reminders", free: false, pro: true, success: true },
  { label: "CPA tax credit report", free: false, pro: true, success: true },
  { label: "Application tracker", free: false, pro: true, success: true },
  { label: "Priority support", free: false, pro: true, success: true },
  { label: "Dedicated grant writer", free: false, pro: false, success: true },
  { label: "Interview preparation", free: false, pro: false, success: true },
  { label: "Post-award compliance", free: false, pro: false, success: true },
];

export function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  function handleCTA(tierName: string) {
    toast.success(`Redirecting to signup for ${tierName}...`);
  }

  return (
    <section id="pricing" className="bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground">
            Start for free. Upgrade when you&apos;re ready to apply.
          </p>

          {/* Annual / Monthly Toggle */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <span
              className={cn(
                "text-sm font-medium",
                !isAnnual ? "text-foreground" : "text-muted-foreground"
              )}
            >
              Monthly
            </span>
            <button
              type="button"
              onClick={() => setIsAnnual(!isAnnual)}
              className={cn(
                "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-cred-blue focus-visible:ring-offset-2",
                isAnnual ? "bg-cred-blue" : "bg-slate-200"
              )}
            >
              <span
                className={cn(
                  "pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                  isAnnual ? "translate-x-5" : "translate-x-0"
                )}
              />
            </button>
            <span
              className={cn(
                "text-sm font-medium",
                isAnnual ? "text-foreground" : "text-muted-foreground"
              )}
            >
              Annual
            </span>
            {isAnnual && (
              <Badge className="bg-cred-green text-white">
                Save {ANNUAL_SAVINGS}%
              </Badge>
            )}
          </div>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {PRICING_TIERS.map((tier) => (
            <motion.div key={tier.name} variants={fadeUp}>
              <Card
                className={cn(
                  "relative h-full transition-all duration-200",
                  tier.highlighted
                    ? "border-2 border-cred-blue shadow-xl shadow-blue-500/10 ring-0 scale-[1.02]"
                    : "hover:shadow-md"
                )}
              >
                {tier.highlighted && (
                  <>
                    <div className="pointer-events-none absolute -inset-px rounded-xl bg-gradient-to-b from-blue-400/20 via-transparent to-blue-400/10 blur-sm" />
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-cred-blue text-white shadow-lg">
                        Most Popular
                      </Badge>
                    </div>
                  </>
                )}
                {tier.badge && !tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge
                      variant="outline"
                      className="whitespace-nowrap border-cred-gold bg-amber-50 text-amber-700 shadow-sm"
                    >
                      {tier.badge}
                    </Badge>
                  </div>
                )}
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{tier.name}</CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-foreground">
                      {isAnnual && tier.annualPrice
                        ? tier.annualPrice
                        : tier.price}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {isAnnual && tier.annualPeriod
                        ? tier.annualPeriod
                        : tier.period}
                    </span>
                  </div>
                  {isAnnual && tier.annualPrice && (
                    <p className="mt-1 text-xs text-cred-green font-medium">
                      Save ${(MONTHLY_PRICE - ANNUAL_PRICE) * 12}/year
                    </p>
                  )}
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <ul className="flex-1 space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="mt-0.5 size-4 shrink-0 text-cred-green" />
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    render={<Link href="/onboarding" />}
                    variant={tier.highlighted ? "default" : "outline"}
                    size="lg"
                    className={cn(
                      "mt-8 w-full",
                      tier.highlighted &&
                        "bg-cred-blue hover:bg-cred-blue-dark"
                    )}
                    onClick={() => handleCTA(tier.name)}
                  >
                    {tier.cta}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Money-back guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8 flex flex-col items-center gap-2"
        >
          <div className="flex items-center gap-2 text-muted-foreground">
            <ShieldCheck className="size-5 text-cred-green" />
            <span className="text-sm font-medium">
              30-day money-back guarantee
            </span>
          </div>
        </motion.div>

        {/* Mini ROI Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mx-auto mt-8 max-w-lg rounded-xl border border-border bg-gradient-to-br from-blue-50 to-amber-50/50 p-6"
        >
          <div className="flex items-center gap-2 text-center">
            <Calculator className="size-5 text-cred-blue" />
            <h3 className="text-sm font-bold text-foreground">
              Quick ROI Check
            </h3>
          </div>
          <p className="mt-3 text-center text-sm text-muted-foreground">
            If you find just one{" "}
            <span className="font-bold text-cred-green">$10,000</span> grant,
            Pro pays for itself{" "}
            <span className="font-bold text-cred-blue">28x</span> over.
          </p>
          <p className="mt-1 text-center text-xs text-muted-foreground">
            The average CredStack user discovers $47,000 in opportunities.
          </p>
        </motion.div>

        {/* Feature comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-xl border border-border"
        >
          <div className="bg-slate-50 px-6 py-3">
            <h3 className="text-sm font-bold text-foreground">
              Compare Plans
            </h3>
          </div>
          <div className="divide-y divide-border">
            {/* Header row */}
            <div className="grid grid-cols-4 gap-4 px-6 py-3 text-xs font-semibold text-muted-foreground">
              <span>Feature</span>
              <span className="text-center">Free</span>
              <span className="text-center text-cred-blue">Pro</span>
              <span className="text-center">Success Fee</span>
            </div>
            {COMPARISON_FEATURES.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-4 gap-4 px-6 py-2.5 text-sm"
              >
                <span className="text-muted-foreground">{row.label}</span>
                {[row.free, row.pro, row.success].map((val, i) => (
                  <span key={i} className="flex justify-center">
                    {val ? (
                      <Check className="size-4 text-cred-green" />
                    ) : (
                      <X className="size-4 text-slate-300" />
                    )}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8 text-center text-sm text-muted-foreground"
        >
          We don&apos;t touch your money — we help you find it.
        </motion.p>
      </div>
    </section>
  );
}
