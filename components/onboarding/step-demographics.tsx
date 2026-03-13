"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const DEMOGRAPHICS = [
  { id: "minority", label: "Minority-owned" },
  { id: "veteran", label: "Veteran-owned" },
  { id: "woman", label: "Woman-owned" },
  { id: "hubzone", label: "HUBZone certified" },
  { id: "disability", label: "Disability-owned" },
];

export interface DemographicsData {
  [key: string]: boolean;
}

interface StepDemographicsProps {
  data: DemographicsData;
  onChange: (data: DemographicsData) => void;
}

export function StepDemographics({ data, onChange }: StepDemographicsProps) {
  function toggle(id: string) {
    onChange({ ...data, [id]: !data[id] });
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">
          Business Demographics
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Many programs offer priority or dedicated funding for these groups.
          This info helps us find the best matches.
        </p>
      </div>

      <div className="space-y-4">
        {DEMOGRAPHICS.map((demo) => (
          <label
            key={demo.id}
            className="flex cursor-pointer items-center gap-3 rounded-lg border border-border px-4 py-3 transition-colors hover:bg-muted has-[:checked]:border-cred-blue has-[:checked]:bg-blue-50"
          >
            <Checkbox
              checked={!!data[demo.id]}
              onCheckedChange={() => toggle(demo.id)}
            />
            <span className="text-sm font-medium">{demo.label}</span>
          </label>
        ))}
      </div>

      <div className="rounded-lg bg-blue-50 px-4 py-3">
        <p className="text-xs text-muted-foreground">
          All information is optional and kept confidential. It is used solely to
          match you with relevant programs.
        </p>
      </div>
    </div>
  );
}
