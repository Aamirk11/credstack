"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { GrantType } from "@/lib/types";

export type GrantSortOption = "matchScore" | "deadline" | "amount";

interface GrantFiltersProps {
  activeType: GrantType | "all";
  sortBy: GrantSortOption;
  onTypeChange: (type: GrantType | "all") => void;
  onSortChange: (sort: GrantSortOption) => void;
}

const TYPE_OPTIONS: { value: GrantType | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "federal", label: "Federal" },
  { value: "state", label: "State" },
  { value: "local", label: "Local" },
  { value: "private", label: "Private" },
];

const SORT_OPTIONS: { value: GrantSortOption; label: string }[] = [
  { value: "matchScore", label: "Match Score" },
  { value: "deadline", label: "Deadline" },
  { value: "amount", label: "Amount" },
];

export function GrantFilters({
  activeType,
  sortBy,
  onTypeChange,
  onSortChange,
}: GrantFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <Tabs
        value={activeType}
        onValueChange={(val) => onTypeChange(val as GrantType | "all")}
      >
        <TabsList>
          {TYPE_OPTIONS.map((opt) => (
            <TabsTrigger key={opt.value} value={opt.value}>
              {opt.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <Select
        value={sortBy}
        onValueChange={(val: string | null) => {
          if (val) onSortChange(val as GrantSortOption);
        }}
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
