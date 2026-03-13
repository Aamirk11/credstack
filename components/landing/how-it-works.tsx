"use client";

import { motion, type Variants } from "framer-motion";
import { Building2, Search, FileCheck } from "lucide-react";

const STEPS = [
  {
    number: 1,
    title: "Create Your Profile",
    description: "Tell us about your business in 5 minutes",
    icon: Building2,
    time: "5 min",
  },
  {
    number: 2,
    title: "Get Instant Matches",
    description: "Our AI scans 10,000+ programs to find your matches",
    icon: Search,
    time: "Instant",
  },
  {
    number: 3,
    title: "Apply with Confidence",
    description: "AI pre-fills applications and tracks deadlines",
    icon: FileCheck,
    time: "AI-Assisted",
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
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative mt-12 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8"
        >
          {/* Connecting line (desktop only) */}
          <div className="pointer-events-none absolute top-14 right-[calc(16.67%+1rem)] left-[calc(16.67%+1rem)] hidden h-0.5 bg-border md:block" />

          {STEPS.map((step) => (
            <motion.div
              key={step.number}
              variants={fadeUp}
              className="relative flex flex-col items-center text-center"
            >
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
