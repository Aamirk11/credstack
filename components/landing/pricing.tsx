"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { PRICING_TIERS } from "@/lib/utils/constants";

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

export function Pricing() {
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
          <p className="mt-2 text-sm font-medium text-cred-green">
            Start free, upgrade anytime
          </p>
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
                    {/* Subtle glow effect */}
                    <div className="pointer-events-none absolute -inset-px rounded-xl bg-gradient-to-b from-blue-400/20 via-transparent to-blue-400/10 blur-sm" />
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-cred-blue text-white shadow-lg">
                        Most Popular
                      </Badge>
                    </div>
                  </>
                )}
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{tier.name}</CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-foreground">
                      {tier.price}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {tier.period}
                    </span>
                  </div>
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
                      tier.highlighted && "bg-cred-blue hover:bg-cred-blue-dark"
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
