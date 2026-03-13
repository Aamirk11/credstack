"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  Radar,
  Search,
  Bell,
  Target,
  Bot,
  FileSpreadsheet,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const FEATURES = [
  {
    title: "Never Miss a Grant Again",
    description:
      "Our AI monitors 10,000+ federal, state, and local programs so you don't have to. Get notified the moment you're eligible.",
    icon: Radar,
    detail:
      "Continuous scanning across all major grant databases with real-time eligibility alerts.",
  },
  {
    title: "Credits Your CPA Missed",
    description:
      "The average small business leaves $23,000 in tax credits unclaimed. We find them in minutes.",
    icon: Search,
    detail:
      "Deep analysis of R&D credits, WOTC, energy credits, and 40+ other federal and state programs.",
  },
  {
    title: "Zero Missed Deadlines",
    description:
      "Automatic alerts at 90, 60, 30, and 7 days. We've helped businesses submit 2,400+ applications on time.",
    icon: Bell,
    detail:
      "Smart calendar with email and SMS reminders. Never lose a grant opportunity to a missed deadline.",
  },
  {
    title: "Know Before You Apply",
    description:
      "See exactly which criteria you meet before spending hours on an application. 92% accuracy rate.",
    icon: Target,
    detail:
      "Pre-qualification engine checks your profile against every requirement before you invest time.",
  },
  {
    title: "AI-Powered Applications",
    description:
      "Our AI pre-fills applications using your profile data, saving an average of 12 hours per submission.",
    icon: Bot,
    detail:
      "Intelligent form filling with smart suggestions and compliance checks built in.",
  },
  {
    title: "Tax-Ready Reports",
    description:
      "One-click reports your CPA can immediately use. Includes IRS form references, qualifying expense breakdowns, and claiming instructions.",
    icon: FileSpreadsheet,
    detail:
      "Export-ready PDFs with form references, expense categorization, and step-by-step claiming guides.",
  },
];

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

function FeatureCard({
  feature,
}: {
  feature: (typeof FEATURES)[number];
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="group relative h-full [perspective:1000px]"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div
        className="relative h-full transition-transform duration-500 [transform-style:preserve-3d]"
        style={{
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front */}
        <Card className="h-full [backface-visibility:hidden]">
          <CardHeader>
            <div className="mb-2 flex size-12 items-center justify-center rounded-xl bg-blue-50 transition-colors group-hover:bg-cred-blue/10">
              <feature.icon className="size-6 text-cred-blue" />
            </div>
            <CardTitle className="text-base">{feature.title}</CardTitle>
            <CardDescription className="text-sm leading-relaxed">
              {feature.description}
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Back */}
        <Card className="absolute inset-0 flex items-center justify-center border-cred-blue/30 bg-cred-blue/5 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <CardHeader className="text-center">
            <feature.icon className="mx-auto mb-2 size-6 text-cred-blue" />
            <CardDescription className="text-sm font-medium leading-relaxed text-foreground">
              {feature.detail}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}

export function Features() {
  return (
    <section id="features" className="bg-slate-50 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything You Need to Find Free Money
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground">
            Powerful tools to discover, qualify for, and apply to grants and tax
            credits
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {FEATURES.map((feature) => (
            <motion.div key={feature.title} variants={fadeUp} className="min-h-[200px]">
              <FeatureCard feature={feature} />
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-6 text-center text-xs text-muted-foreground"
        >
          Hover over any feature to learn more
        </motion.p>
      </div>
    </section>
  );
}
