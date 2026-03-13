"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Search, DollarSign, TrendingUp } from "lucide-react";
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

const PAIN_POINTS = [
  "Missed a $50K grant deadline?",
  "Your CPA missed $12K in R&D credits?",
  "Spent 40 hours on a failed application?",
];

const FEATURED_LOGOS = ["TechCrunch", "Forbes", "Inc.", "Bloomberg"];

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

function usePainPointTicker() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % PAIN_POINTS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return index;
}

export function Hero() {
  const countValue = useCountUp(10.2, 2200);
  const painPointIndex = usePainPointTicker();

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Animated gradient mesh background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-blue-50/60 to-transparent" />
        <div
          className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-400/10 blur-[120px]"
          style={{
            animation: "meshFloat1 12s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -right-20 top-20 h-[400px] w-[400px] rounded-full bg-amber-400/8 blur-[100px]"
          style={{
            animation: "meshFloat2 15s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-0 left-1/3 h-[350px] w-[350px] rounded-full bg-blue-300/8 blur-[100px]"
          style={{
            animation: "meshFloat3 10s ease-in-out infinite",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes meshFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(60px, 40px) scale(1.1); }
          66% { transform: translate(-30px, 60px) scale(0.95); }
        }
        @keyframes meshFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-50px, 30px) scale(0.9); }
          66% { transform: translate(40px, -40px) scale(1.05); }
        }
        @keyframes meshFloat3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(50px, -30px) scale(1.1); }
        }
      `}</style>

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          {/* Pain point ticker */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={0}
            className="mb-6 flex h-8 items-center justify-center"
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={painPointIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-sm font-medium text-red-600"
              >
                {PAIN_POINTS[painPointIndex]}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={1}
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
            custom={2}
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
            custom={3}
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

          {/* Dashboard preview mockup */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={4}
            className="mx-auto mt-10 max-w-lg"
          >
            <div className="rounded-xl border border-border bg-white p-4 shadow-2xl shadow-blue-500/10 ring-1 ring-black/5">
              <div className="flex items-center gap-2 border-b border-border pb-3">
                <div className="flex gap-1.5">
                  <div className="size-2.5 rounded-full bg-red-400" />
                  <div className="size-2.5 rounded-full bg-amber-400" />
                  <div className="size-2.5 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 rounded-md bg-slate-50 px-3 py-1 text-center text-xs text-muted-foreground">
                  credstack.com/dashboard
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Search className="size-4 text-cred-blue" />
                  <span className="text-sm font-semibold text-foreground">Your Matches</span>
                </div>
                <span className="rounded-full bg-cred-green/10 px-2 py-0.5 text-xs font-bold text-cred-green">Live</span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-blue-50 p-3 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <TrendingUp className="size-4 text-cred-blue" />
                    <span className="text-2xl font-extrabold text-cred-blue">18</span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">Matches Found</p>
                </div>
                <div className="rounded-lg bg-amber-50 p-3 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <DollarSign className="size-4 text-cred-gold" />
                    <span className="text-2xl font-extrabold text-cred-gold">$47K-$127K</span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">Estimated Value</p>
                </div>
              </div>
              <div className="mt-3 space-y-2">
                {[
                  { name: "SBIR Phase I", amount: "$50,000", strength: "Strong" },
                  { name: "R&D Tax Credit", amount: "$23,400", strength: "Strong" },
                  { name: "State Innovation Grant", amount: "$15,000", strength: "Good" },
                ].map((item) => (
                  <div key={item.name} className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2">
                    <span className="text-xs font-medium text-foreground">{item.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-cred-green">{item.amount}</span>
                      <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${item.strength === "Strong" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                        {item.strength}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Dollar counter with count-up and floating animation */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={5}
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
            custom={6}
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

          {/* As Featured In logos bar */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={7}
            className="mt-10 border-t border-border pt-8"
          >
            <p className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              As featured in
            </p>
            <div className="flex items-center justify-center gap-2 sm:gap-4">
              {FEATURED_LOGOS.map((logo, i) => (
                <span key={logo} className="flex items-center gap-2 sm:gap-4">
                  <span className="text-base font-semibold italic text-slate-400 sm:text-lg">
                    {logo}
                  </span>
                  {i < FEATURED_LOGOS.length - 1 && (
                    <span className="text-slate-300" aria-hidden="true">
                      &middot;
                    </span>
                  )}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
