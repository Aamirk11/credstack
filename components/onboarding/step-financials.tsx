"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const REVENUE_RANGES = [
  { value: "under-100k", label: "Under $100K" },
  { value: "100k-500k", label: "$100K - $500K" },
  { value: "500k-1m", label: "$500K - $1M" },
  { value: "1m-5m", label: "$1M - $5M" },
  { value: "5m-10m", label: "$5M - $10M" },
  { value: "10m-plus", label: "$10M+" },
];

export interface FinancialsData {
  revenueRange: string;
  employeeCount: string;
  annualRdSpend: string;
}

interface StepFinancialsProps {
  data: FinancialsData;
  onChange: (data: FinancialsData) => void;
}

function FieldCheck({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.span
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="inline-flex"
        >
          <CheckCircle className="size-4 text-cred-green" />
        </motion.span>
      )}
    </AnimatePresence>
  );
}

export function StepFinancials({ data, onChange }: StepFinancialsProps) {
  function update(field: keyof FinancialsData, value: string) {
    onChange({ ...data, [field]: value });
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-foreground">
          Financial Information
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          This helps us estimate tax credits and match grant size requirements.
        </p>
      </div>

      <div className="space-y-4">
        {/* Revenue Range */}
        <div className="space-y-2">
          <Label className="flex items-center gap-1.5">
            Annual Revenue
            <FieldCheck show={data.revenueRange.length > 0} />
          </Label>
          <RadioGroup
            value={data.revenueRange}
            onValueChange={(val: string | null) => { if (val) update("revenueRange", val); }}
            className="grid grid-cols-2 gap-2"
          >
            {REVENUE_RANGES.map((range) => (
              <label
                key={range.value}
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-border px-3 py-2.5 transition-colors hover:bg-muted has-[:checked]:border-cred-blue has-[:checked]:bg-blue-50"
              >
                <RadioGroupItem value={range.value} />
                <span className="text-sm font-medium">{range.label}</span>
              </label>
            ))}
          </RadioGroup>
          <p className="text-xs text-muted-foreground">
            Revenue determines eligibility for SBA and size-based programs
          </p>
        </div>

        {/* Employee Count */}
        <div className="space-y-1.5">
          <Label htmlFor="employeeCount" className="flex items-center gap-1.5">
            Number of Employees
            <FieldCheck show={data.employeeCount.length > 0} />
          </Label>
          <Input
            id="employeeCount"
            type="number"
            placeholder="12"
            min={0}
            value={data.employeeCount}
            onChange={(e) => update("employeeCount", e.target.value)}
            className="h-11"
          />
          <p className="text-xs text-muted-foreground">
            Each employee can unlock WOTC, training, and hiring credits
          </p>
        </div>

        {/* Annual R&D Spend */}
        <div className="space-y-1.5">
          <Label htmlFor="rdSpend" className="flex items-center gap-1.5">
            Annual R&D Spend (estimate)
            <FieldCheck show={data.annualRdSpend.length > 0} />
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              $
            </span>
            <Input
              id="rdSpend"
              type="number"
              placeholder="50000"
              min={0}
              className="h-11 pl-7"
              value={data.annualRdSpend}
              onChange={(e) => update("annualRdSpend", e.target.value)}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            R&D tax credits can return 6-14% of qualifying expenses
          </p>
        </div>
      </div>
    </div>
  );
}
