"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, Users, TrendingUp } from "lucide-react";

interface StatConfig {
  rawValue: number;
  prefix: string;
  suffix: string;
  decimals: number;
  description: string;
  icon: typeof DollarSign;
}

const STATS: StatConfig[] = [
  {
    rawValue: 10.2,
    prefix: "$",
    suffix: "B+",
    decimals: 1,
    description: "in R&D credits unclaimed annually",
    icon: DollarSign,
  },
  {
    rawValue: 95,
    prefix: "",
    suffix: "%",
    decimals: 0,
    description: "of eligible businesses never apply",
    icon: Users,
  },
  {
    rawValue: 47,
    prefix: "$",
    suffix: "K",
    decimals: 0,
    description: "Average user finds in opportunities",
    icon: TrendingUp,
  },
];

function useCountUpOnScroll(target: number, decimals: number, duration = 2000) {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const startTime = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Number((eased * target).toFixed(decimals)));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setValue(target);
      }
    }

    requestAnimationFrame(animate);
  }, [started, target, duration, decimals]);

  return { value, ref };
}

function StatCard({ stat }: { stat: StatConfig }) {
  const { value, ref } = useCountUpOnScroll(stat.rawValue, stat.decimals);
  const Icon = stat.icon;

  return (
    <div
      ref={ref}
      className="flex flex-col items-center rounded-xl border border-border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-blue-50">
        <Icon className="size-6 text-cred-blue" />
      </div>
      <p className="text-3xl font-extrabold text-cred-gold sm:text-4xl lg:text-5xl">
        {stat.prefix}
        {stat.decimals > 0 ? value.toFixed(stat.decimals) : Math.round(value)}
        {stat.suffix}
      </p>
      <p className="mt-2 text-center text-sm text-slate-600">
        {stat.description}
      </p>
    </div>
  );
}

export function StatsBar() {
  return (
    <section className="bg-blue-50 py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-3"
        >
          {STATS.map((stat) => (
            <StatCard key={stat.description} stat={stat} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
