"use client";

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

export function StepBusinessInfo({ data, onChange }: StepBusinessInfoProps) {
  function update(field: keyof BusinessInfoData, value: string) {
    onChange({ ...data, [field]: value });
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">
          Tell Us About Your Business
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Basic info helps us find the right programs for you.
        </p>
      </div>

      <div className="space-y-4">
        {/* Business Name */}
        <div className="space-y-2">
          <Label htmlFor="businessName">Business Name</Label>
          <Input
            id="businessName"
            placeholder="Acme Corp"
            value={data.businessName}
            onChange={(e) => update("businessName", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Your legal business name as registered
          </p>
        </div>

        {/* Industry */}
        <div className="space-y-2">
          <Label>Industry</Label>
          <Select
            value={data.industry}
            onValueChange={(val: string | null) => { if (val) update("industry", val); }}
          >
            <SelectTrigger className="w-full">
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
            Your NAICS code determines eligibility for industry-specific programs
          </p>
        </div>

        {/* State & City */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>State</Label>
            <Select
              value={data.state}
              onValueChange={(val: string | null) => { if (val) update("state", val); }}
            >
              <SelectTrigger className="w-full">
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

          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              placeholder="Chicago"
              value={data.city}
              onChange={(e) => update("city", e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Some grants target specific cities or zones
            </p>
          </div>
        </div>

        {/* Year Founded */}
        <div className="space-y-2">
          <Label htmlFor="yearFounded">Year Founded</Label>
          <Input
            id="yearFounded"
            type="number"
            placeholder="2019"
            min={1900}
            max={2026}
            value={data.yearFounded}
            onChange={(e) => update("yearFounded", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Some programs require a minimum operating history
          </p>
        </div>
      </div>
    </div>
  );
}
