"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles } from "lucide-react";

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
    hasCount: false,
  },
  {
    id: "newHires" as const,
    label: "New hires in last 12 months",
    hasCount: true,
  },
  {
    id: "energyImprovements" as const,
    label: "Energy efficiency improvements",
    hasCount: false,
  },
  {
    id: "exportActivity" as const,
    label: "Export/international activity",
    hasCount: false,
  },
];

export function StepGoals({ data, onChange }: StepGoalsProps) {
  function toggleActivity(id: keyof GoalsData) {
    onChange({ ...data, [id]: !data[id] });
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">
          Recent Activity
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          These activities often qualify for specific grants and tax credits.
        </p>
      </div>

      <div className="space-y-4">
        {ACTIVITIES.map((activity) => (
          <div key={activity.id}>
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border px-4 py-3 transition-colors hover:bg-muted has-[:checked]:border-cred-blue has-[:checked]:bg-blue-50">
              <Checkbox
                checked={!!data[activity.id]}
                onCheckedChange={() => toggleActivity(activity.id)}
              />
              <span className="text-sm font-medium">{activity.label}</span>
            </label>

            {/* Conditional count input for new hires */}
            {activity.hasCount && data.newHires && (
              <div className="mt-2 ml-7 space-y-1">
                <Label htmlFor="newHireCount" className="text-xs">
                  How many new hires?
                </Label>
                <Input
                  id="newHireCount"
                  type="number"
                  placeholder="5"
                  min={1}
                  className="w-24"
                  value={data.newHireCount}
                  onChange={(e) =>
                    onChange({ ...data, newHireCount: e.target.value })
                  }
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="flex items-start gap-3 rounded-lg bg-cred-green/10 px-4 py-4">
        <Sparkles className="mt-0.5 size-5 shrink-0 text-cred-green" />
        <div>
          <p className="text-sm font-semibold text-foreground">
            Ready to discover your matches!
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Complete your profile to see grants, tax credits, and incentives
            tailored to your business.
          </p>
        </div>
      </div>
    </div>
  );
}
