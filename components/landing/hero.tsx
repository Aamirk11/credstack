"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" as const },
  }),
};

const AVATARS = [
  "bg-blue-400",
  "bg-emerald-400",
  "bg-amber-400",
  "bg-rose-400",
  "bg-violet-400",
];

function useCountUp(target: number, duration = 2000) {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const startTime = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(eased * target);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setValue(target);
      }
    }

    requestAnimationFrame(animate);
  }, [target, duration]);

  return value;
}

export function Hero() {
  const countValue = useCountUp(10.2, 2200);

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Subtle gradient bg */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-blue-50/60 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          {/* Headline */}
          <motion.h1
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={0}
            className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            Your Business Is Leaving{" "}
            <span className="text-cred-blue">Free Money</span> on the Table
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={1}
            className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg"
          >
            95% of small businesses miss out on grants they qualify for.
            CredStack scans 10,000+ programs and shows you exactly what&apos;s
            available — no accountant required.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={2}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button
              render={<Link href="/onboarding" />}
              size="lg"
              className="h-12 gap-2 px-8 text-base"
            >
              Find My Grants
              <ArrowRight className="size-4" />
            </Button>
            <Button
              render={<a href="#how-it-works" />}
              variant="outline"
              size="lg"
              className="h-12 px-8 text-base"
            >
              See How It Works
            </Button>
          </motion.div>

          {/* Dollar counter with count-up and floating animation */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={3}
            className="mt-10 flex flex-col items-center gap-2"
          >
            <motion.p
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-5xl font-extrabold text-cred-gold sm:text-6xl"
            >
              ${countValue.toFixed(1)}B
            </motion.p>
            <p className="text-sm text-muted-foreground">
              in grants and credits go unclaimed every year
            </p>
          </motion.div>

          {/* Trust badge */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={4}
            className="mt-8 flex items-center justify-center gap-3"
          >
            <div className="flex -space-x-2">
              {AVATARS.map((color, i) => (
                <div
                  key={i}
                  className={`size-8 rounded-full border-2 border-white ${color}`}
                />
              ))}
            </div>
            <p className="text-sm font-medium text-muted-foreground">
              Trusted by{" "}
              <span className="text-foreground">2,400+</span> small businesses
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
