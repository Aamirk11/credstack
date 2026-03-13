"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const DEMOGRAPHICS = [
  {
    id: "minority",
    label: "Minority-owned",
    programs: "1,400+ dedicated programs",
  },
  {
    id: "veteran",
    label: "Veteran-owned",
    programs: "800+ veteran-specific grants",
  },
  {
    id: "woman",
    label: "Woman-owned",
    programs: "1,200+ WBE programs",
  },
  {
    id: "hubzone",
    label: "HUBZone certified",
    programs: "Federal contracting preference",
  },
  {
    id: "disability",
    label: "Disability-owned",
    programs: "500+ accessibility grants",
  },
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

  const selectedCount = Object.values(data).filter(Boolean).length;

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-foreground">
          Business Demographics
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Selecting these can unlock thousands of additional programs with
          priority funding.
        </p>
      </div>

      <div className="space-y-2.5">
        {DEMOGRAPHICS.map((demo) => (
          <label
            key={demo.id}
            className="flex cursor-pointer items-center gap-3 rounded-lg border border-border px-4 py-3 transition-colors hover:bg-muted has-[:checked]:border-cred-blue has-[:checked]:bg-blue-50"
          >
            <Checkbox
              checked={!!data[demo.id]}
              onCheckedChange={() => toggle(demo.id)}
            />
            <div className="flex-1">
              <span className="text-sm font-medium">{demo.label}</span>
              <p className="text-xs text-muted-foreground">{demo.programs}</p>
            </div>
            <AnimatePresence>
              {data[demo.id] && (
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
        ))}
      </div>

      {selectedCount > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="rounded-lg bg-cred-green/10 px-4 py-3"
        >
          <p className="text-xs font-medium text-cred-green">
            {selectedCount} demographic{selectedCount !== 1 ? "s" : ""} selected
            — unlocking additional matching programs
          </p>
        </motion.div>
      )}

      <div className="rounded-lg bg-blue-50 px-4 py-3">
        <p className="text-xs text-muted-foreground">
          All information is optional and kept confidential. It is used solely to
          match you with relevant programs.
        </p>
      </div>
    </div>
  );
}
