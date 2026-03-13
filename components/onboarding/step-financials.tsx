"use client";

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

export function StepFinancials({ data, onChange }: StepFinancialsProps) {
  function update(field: keyof FinancialsData, value: string) {
    onChange({ ...data, [field]: value });
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">
          Financial Information
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          We use this to estimate tax credits and match grant requirements.
        </p>
      </div>

      <div className="space-y-6">
        {/* Revenue Range */}
        <div className="space-y-3">
          <Label>Annual Revenue</Label>
          <RadioGroup
            value={data.revenueRange}
            onValueChange={(val: string | null) => { if (val) update("revenueRange", val); }}
            className="grid grid-cols-2 gap-3"
          >
            {REVENUE_RANGES.map((range) => (
              <label
                key={range.value}
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-border px-4 py-3 transition-colors hover:bg-muted has-[:checked]:border-cred-blue has-[:checked]:bg-blue-50"
              >
                <RadioGroupItem value={range.value} />
                <span className="text-sm font-medium">{range.label}</span>
              </label>
            ))}
          </RadioGroup>
        </div>

        {/* Employee Count */}
        <div className="space-y-2">
          <Label htmlFor="employeeCount">Number of Employees</Label>
          <Input
            id="employeeCount"
            type="number"
            placeholder="12"
            min={0}
            value={data.employeeCount}
            onChange={(e) => update("employeeCount", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Employee count affects SBA size standards and program eligibility
          </p>
        </div>

        {/* Annual R&D Spend */}
        <div className="space-y-2">
          <Label htmlFor="rdSpend">Annual R&D Spend (estimate)</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              $
            </span>
            <Input
              id="rdSpend"
              type="number"
              placeholder="50000"
              min={0}
              className="pl-7"
              value={data.annualRdSpend}
              onChange={(e) => update("annualRdSpend", e.target.value)}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            R&D spend includes wages for qualified activities, supplies, and
            contract research
          </p>
        </div>
      </div>
    </div>
  );
}
