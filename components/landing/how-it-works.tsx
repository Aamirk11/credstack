"use client";

import { motion, type Variants } from "framer-motion";
import {
  Building2,
  Search,
  FileCheck,
  ChevronRight,
  Clock,
  User,
  BarChart3,
  FileText,
  CheckCircle,
  Send,
} from "lucide-react";

const STEPS = [
  {
    number: 1,
    title: "Create Your Profile",
    description: "Tell us about your business in 5 minutes",
    icon: Building2,
    time: "5 min",
    previewIcons: [User, Building2, BarChart3],
    previewLabel: "Business Profile",
  },
  {
    number: 2,
    title: "Get Instant Matches",
    description: "Our AI scans 10,000+ programs to find your matches",
    icon: Search,
    time: "Instant",
    previewIcons: [Search, CheckCircle, BarChart3],
    previewLabel: "18 Matches Found",
  },
  {
    number: 3,
    title: "Apply with Confidence",
    description: "AI pre-fills applications and tracks deadlines",
    icon: FileCheck,
    time: "AI-Assisted",
    previewIcons: [FileText, Send, CheckCircle],
    previewLabel: "Application Ready",
  },
];

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How It Works
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground">
            Three simple steps to discover your hidden funding
          </p>
          <div className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full bg-cred-green/10 px-4 py-1.5">
            <Clock className="size-4 text-cred-green" />
            <span className="text-sm font-semibold text-cred-green">
              Average time: 5 minutes
            </span>
          </div>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative mt-12 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6"
        >
          {/* Connecting line (desktop only) */}
          <div className="pointer-events-none absolute top-14 right-[calc(16.67%+1rem)] left-[calc(16.67%+1rem)] hidden h-0.5 bg-border md:block" />

          {STEPS.map((step, idx) => (
            <motion.div
              key={step.number}
              variants={fadeUp}
              className="relative flex flex-col items-center text-center"
            >
              {/* Arrow connector between steps (desktop only) */}
              {idx < STEPS.length - 1 && (
                <div className="pointer-events-none absolute right-0 top-14 z-20 hidden -translate-y-1/2 translate-x-1/2 md:block">
                  <div className="flex size-8 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-border">
                    <ChevronRight className="size-4 text-cred-blue" />
                  </div>
                </div>
              )}

              {/* Numbered circle */}
              <div className="relative z-10 flex size-28 flex-col items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-border">
                <step.icon className="mb-1 size-8 text-cred-blue" />
                <span className="mt-1 flex size-6 items-center justify-center rounded-full bg-cred-blue text-xs font-bold text-white">
                  {step.number}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <span className="mt-1 inline-block rounded-full bg-blue-50 px-3 py-0.5 text-xs font-semibold text-cred-blue">
                {step.time}
              </span>
              <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                {step.description}
              </p>

              {/* Mini UI mockup preview */}
              <div className="mt-4 w-full max-w-[200px] rounded-lg border border-border bg-slate-50 p-3">
                <div className="flex items-center justify-between">
                  {step.previewIcons.map((Icon, i) => (
                    <div
                      key={i}
                      className="flex size-8 items-center justify-center rounded-md bg-white shadow-sm"
                    >
                      <Icon className="size-4 text-cred-blue/60" />
                    </div>
                  ))}
                </div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-blue-100">
                  <div
                    className="h-1.5 rounded-full bg-cred-blue"
                    style={{ width: `${(step.number / 3) * 100}%` }}
                  />
                </div>
                <p className="mt-1.5 text-[10px] font-medium text-muted-foreground">
                  {step.previewLabel}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
