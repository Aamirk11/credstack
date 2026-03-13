"use client";

import { motion, type Variants } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const TESTIMONIALS = [
  {
    quote:
      "CredStack found $47,000 in grants I didn't know existed. The R&D credit alone saved us $12K.",
    name: "Sarah Kim",
    title: "CEO",
    company: "Luminary Labs",
    rating: 5,
  },
  {
    quote:
      "As a veteran-owned business, I was leaving money on the table. CredStack made it easy to find and apply.",
    name: "James Rodriguez",
    title: "Founder",
    company: "Atlas Security",
    rating: 5,
  },
  {
    quote:
      "My CPA was impressed with the tax credit report. We claimed $28K in credits we would have missed.",
    name: "Priya Patel",
    title: "CFO",
    company: "Brightpath Analytics",
    rating: 5,
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
              <Card className="h-full">
                <CardContent className="flex flex-col gap-3 p-5">
                  {/* Star Rating */}
                  <div className="flex gap-0.5">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="size-4 fill-cred-gold text-cred-gold"
                      />
                    ))}
                  </div>
                  <Quote className="size-6 text-cred-blue/20" />
                  <blockquote className="flex-1 text-sm leading-relaxed text-foreground">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
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
        </motion.div>
      </div>
    </section>
  );
}
