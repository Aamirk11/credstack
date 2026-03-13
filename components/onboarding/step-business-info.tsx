"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { INDUSTRIES, US_STATES } from "@/lib/utils/constants";

export interface BusinessInfoData {
  businessName: string;
  industry: string;
  state: string;
  city: string;
  yearFounded: string;
}

interface StepBusinessInfoProps {
  data: BusinessInfoData;
  onChange: (data: BusinessInfoData) => void;
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

export function StepBusinessInfo({ data, onChange }: StepBusinessInfoProps) {
  function update(field: keyof BusinessInfoData, value: string) {
    onChange({ ...data, [field]: value });
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-foreground">
          Tell Us About Your Business
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          This helps us match you with 3,200+ state-specific programs.
        </p>
      </div>

      <div className="space-y-3">
        {/* Business Name */}
        <div className="space-y-1.5">
          <Label htmlFor="businessName" className="flex items-center gap-1.5">
            Business Name
            <FieldCheck show={data.businessName.length > 0} />
          </Label>
          <Input
            id="businessName"
            placeholder="Acme Corp"
            value={data.businessName}
            onChange={(e) => update("businessName", e.target.value)}
            className="h-11"
          />
          <p className="text-xs text-muted-foreground">
            Your legal business name as registered
          </p>
        </div>

        {/* Industry */}
        <div className="space-y-1.5">
          <Label className="flex items-center gap-1.5">
            Industry
            <FieldCheck show={data.industry.length > 0} />
          </Label>
          <Select
            value={data.industry}
            onValueChange={(val: string | null) => { if (val) update("industry", val); }}
          >
            <SelectTrigger className="h-11 w-full">
              <SelectValue placeholder="Select your industry" />
            </SelectTrigger>
            <SelectContent>
              {INDUSTRIES.map((ind) => (
                <SelectItem key={ind.code} value={ind.code}>
                  {ind.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Unlocks industry-specific grants and credits
          </p>
        </div>

        {/* State & City */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label className="flex items-center gap-1.5">
              State
              <FieldCheck show={data.state.length > 0} />
            </Label>
            <Select
              value={data.state}
              onValueChange={(val: string | null) => { if (val) update("state", val); }}
            >
              <SelectTrigger className="h-11 w-full">
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                {US_STATES.map((st) => (
                  <SelectItem key={st} value={st}>
                    {st}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Many programs are state-specific
            </p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="city" className="flex items-center gap-1.5">
              City
              <FieldCheck show={data.city.length > 0} />
            </Label>
            <Input
              id="city"
              placeholder="Chicago"
              value={data.city}
              onChange={(e) => update("city", e.target.value)}
              className="h-11"
            />
            <p className="text-xs text-muted-foreground">
              Some grants target specific cities or zones
            </p>
          </div>
        </div>

        {/* Year Founded */}
        <div className="space-y-1.5">
          <Label htmlFor="yearFounded" className="flex items-center gap-1.5">
            Year Founded
            <FieldCheck show={data.yearFounded.length > 0} />
          </Label>
          <Input
            id="yearFounded"
            type="number"
            placeholder="2019"
            min={1900}
            max={2026}
            value={data.yearFounded}
            onChange={(e) => update("yearFounded", e.target.value)}
            className="h-11"
          />
          <p className="text-xs text-muted-foreground">
            Newer businesses often qualify for startup-specific funding
          </p>
        </div>
      </div>
    </div>
  );
}
