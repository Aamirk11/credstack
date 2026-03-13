"use client";

import { motion, type Variants } from "framer-motion";
import { Quote, Star, Play, Briefcase, Cpu, BarChart3, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const TESTIMONIALS = [
  {
    quote:
      "CredStack found $47,000 in grants I didn't know existed within the first week. The R&D credit alone saved us $12K this tax season. We applied to 3 grants in under 2 hours.",
    name: "Sarah Kim",
    title: "CEO",
    company: "Luminary Labs",
    industry: "SaaS / Technology",
    industryIcon: Cpu,
    rating: 5,
    timeframe: "Results in 7 days",
  },
  {
    quote:
      "As a veteran-owned business, I was leaving $38K on the table. CredStack matched us with 12 programs in minutes and their AI pre-filled 80% of the applications. Funded within 90 days.",
    name: "James Rodriguez",
    title: "Founder",
    company: "Atlas Security",
    industry: "Security Services",
    industryIcon: Shield,
    rating: 5,
    timeframe: "Funded in 90 days",
  },
  {
    quote:
      "My CPA was blown away by the tax credit report. We claimed $28K in credits we would have missed — R&D credits, WOTC, and a state innovation grant. Paid for itself 50x over.",
    name: "Priya Patel",
    title: "CFO",
    company: "Brightpath Analytics",
    industry: "Data Analytics",
    industryIcon: BarChart3,
    rating: 5,
    timeframe: "$28K claimed in credits",
  },
];

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function Testimonials() {
  return (
    <section className="bg-slate-50 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Trusted by Small Business Owners
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground">
            See how businesses like yours are finding free money
          </p>
          <p className="mt-2 text-sm font-semibold text-cred-green">
            Trusted by businesses in 47 states
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {TESTIMONIALS.map((testimonial) => (
            <motion.div key={testimonial.name} variants={fadeUp}>
              <Card className="h-full transition-shadow hover:shadow-lg">
                <CardContent className="flex flex-col gap-3 p-5">
                  {/* Star Rating */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-0.5">
                      {Array.from({ length: testimonial.rating }).map(
                        (_, i) => (
                          <Star
                            key={i}
                            className="size-4 fill-cred-gold text-cred-gold"
                          />
                        )
                      )}
                    </div>
                    {/* Industry badge */}
                    <div className="flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5">
                      <testimonial.industryIcon className="size-3 text-cred-blue" />
                      <span className="text-[10px] font-medium text-cred-blue">
                        {testimonial.industry}
                      </span>
                    </div>
                  </div>

                  <Quote className="size-6 text-cred-blue/20" />
                  <blockquote className="flex-1 text-sm leading-relaxed text-foreground">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>

                  {/* Timeframe highlight */}
                  <div className="rounded-md bg-cred-green/10 px-3 py-1.5 text-center">
                    <span className="text-xs font-bold text-cred-green">
                      {testimonial.timeframe}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 border-t border-border pt-3">
                    <div className="flex size-9 items-center justify-center rounded-full bg-cred-blue text-xs font-bold text-white">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.title}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {/* Video testimonial placeholder */}
          <motion.div variants={fadeUp} className="md:col-span-3">
            <Card className="overflow-hidden transition-shadow hover:shadow-lg">
              <CardContent className="flex flex-col items-center justify-center gap-4 p-8 sm:flex-row sm:gap-8">
                {/* Play button area */}
                <div className="relative flex size-24 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cred-blue to-blue-600 shadow-lg">
                  <div className="absolute inset-0 animate-ping rounded-2xl bg-cred-blue/20" style={{ animationDuration: "2s" }} />
                  <Play className="size-10 fill-white text-white" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-lg font-bold text-foreground">
                    Watch: How Atlas Security Found $38K in Grants
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    A 3-minute walkthrough of James Rodriguez&apos;s experience
                    using CredStack to find and apply for veteran-owned business
                    grants.
                  </p>
                  <button
                    type="button"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-cred-blue hover:underline"
                  >
                    <Play className="size-4" />
                    Watch Video (3:12)
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
