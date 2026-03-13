"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  color?: "blue" | "green" | "gold" | "slate";
  index?: number;
}

const COLOR_MAP = {
  blue: {
    bg: "bg-cred-blue/10",
    icon: "text-cred-blue",
    gradient: "from-blue-50/80 to-transparent",
  },
  green: {
    bg: "bg-cred-green/10",
    icon: "text-cred-green",
    gradient: "from-green-50/80 to-transparent",
  },
  gold: {
    bg: "bg-cred-gold/10",
    icon: "text-cred-gold",
    gradient: "from-amber-50/80 to-transparent",
  },
  slate: {
    bg: "bg-slate-100",
    icon: "text-slate-500",
    gradient: "from-slate-50/80 to-transparent",
  },
};

function useCountUp(target: number, duration = 800) {
  const [current, setCurrent] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration]);

  return current;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = "blue",
  index = 0,
}: StatCardProps) {
  const colors = COLOR_MAP[color];
  const numericValue = parseInt(value, 10);
  const isNumeric = !isNaN(numericValue) && String(numericValue) === value;
  const animatedValue = useCountUp(isNumeric ? numericValue : 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
    >
      <Card className={cn("bg-gradient-to-br", colors.gradient)}>
        <CardContent className="flex items-start gap-3 p-4">
          <div
            className={cn(
              "flex items-center justify-center w-9 h-9 rounded-lg shrink-0",
              colors.bg
            )}
          >
            <Icon className={cn("w-[18px] h-[18px]", colors.icon)} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-slate-500">{title}</p>
            <p className="text-xl font-bold text-slate-900 mt-0.5">
              {isNumeric ? animatedValue : value}
            </p>
            {subtitle && (
              <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                {trend === "up" && (
                  <span className="text-cred-green font-medium">+</span>
                )}
                {trend === "down" && (
                  <span className="text-red-500 font-medium">-</span>
                )}
                {subtitle}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
