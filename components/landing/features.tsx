"use client";

import { motion, type Variants } from "framer-motion";
import {
  Sparkles,
  Receipt,
  Clock,
  CheckCircle,
  FileText,
  Download,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const FEATURES = [
  {
    title: "Smart Matching",
    description:
      "AI analyzes your business profile against thousands of programs",
    icon: Sparkles,
  },
  {
    title: "Tax Credit Discovery",
    description: "Find credits your CPA might miss",
    icon: Receipt,
  },
  {
    title: "Deadline Tracking",
    description: "Never miss an application deadline",
    icon: Clock,
  },
  {
    title: "Eligibility Checker",
    description: "Know exactly what you qualify for",
    icon: CheckCircle,
  },
  {
    title: "Application Help",
    description: "AI pre-fills forms and suggests improvements",
    icon: FileText,
  },
  {
    title: "CPA Reports",
    description: "Share findings with your tax professional",
    icon: Download,
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

export function Features() {
  return (
    <section id="features" className="bg-slate-50 py-20 sm:py-24">
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
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Powerful tools to discover, qualify for, and apply to grants and tax
            credits
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {FEATURES.map((feature) => (
            <motion.div key={feature.title} variants={fadeUp}>
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-blue-50">
                    <feature.icon className="size-5 text-cred-blue" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
