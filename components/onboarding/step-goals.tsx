"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Sparkles } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface GoalsData {
  equipmentPurchases: boolean;
  newHires: boolean;
  newHireCount: string;
  energyImprovements: boolean;
  exportActivity: boolean;
}

interface StepGoalsProps {
  data: GoalsData;
  onChange: (data: GoalsData) => void;
}

const ACTIVITIES = [
  {
    id: "equipmentPurchases" as const,
    label: "Equipment purchases in last 12 months",
    detail: "Section 179 deduction + state equipment grants",
    hasCount: false,
  },
  {
    id: "newHires" as const,
    label: "New hires in last 12 months",
    detail: "WOTC credits up to $9,600 per eligible hire",
    hasCount: true,
  },
  {
    id: "energyImprovements" as const,
    label: "Energy efficiency improvements",
    detail: "IRA clean energy credits + utility rebates",
    hasCount: false,
  },
  {
    id: "exportActivity" as const,
    label: "Export/international activity",
    detail: "SBA STEP grants + export financing",
    hasCount: false,
  },
];

export function StepGoals({ data, onChange }: StepGoalsProps) {
  function toggleActivity(id: keyof GoalsData) {
    onChange({ ...data, [id]: !data[id] });
  }

  const checkedCount = ACTIVITIES.filter((a) => !!data[a.id]).length;

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-foreground">
          Recent Activity
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Each activity below can unlock specific credits worth thousands.
        </p>
      </div>

      <div className="space-y-2.5">
        {ACTIVITIES.map((activity) => (
          <div key={activity.id}>
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border px-4 py-3 transition-colors hover:bg-muted has-[:checked]:border-cred-blue has-[:checked]:bg-blue-50">
              <Checkbox
                checked={!!data[activity.id]}
                onCheckedChange={() => toggleActivity(activity.id)}
              />
              <div className="flex-1">
                <span className="text-sm font-medium">{activity.label}</span>
                <p className="text-xs text-muted-foreground">
                  {activity.detail}
                </p>
              </div>
              <AnimatePresence>
                {!!data[activity.id] && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                  >
                    <CheckCircle className="size-4 text-cred-green" />
                  </motion.span>
                )}
              </AnimatePresence>
            </label>

            {/* Conditional count input for new hires */}
            {activity.hasCount && data.newHires && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 ml-7 space-y-1"
              >
                <Label htmlFor="newHireCount" className="text-xs">
                  How many new hires?
                </Label>
                <Input
                  id="newHireCount"
                  type="number"
                  placeholder="5"
                  min={1}
                  className="h-11 w-28"
                  value={data.newHireCount}
                  onChange={(e) =>
                    onChange({ ...data, newHireCount: e.target.value })
                  }
                />
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="flex items-start gap-3 rounded-lg bg-cred-green/10 px-4 py-3">
        <Sparkles className="mt-0.5 size-5 shrink-0 text-cred-green" />
        <div>
          <p className="text-sm font-semibold text-foreground">
            {checkedCount > 0
              ? `${checkedCount} activit${checkedCount !== 1 ? "ies" : "y"} selected — great potential!`
              : "Ready to discover your matches!"}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Complete your profile to see grants, tax credits, and incentives
            tailored to your business.
          </p>
        </div>
      </div>
    </div>
  );
}
