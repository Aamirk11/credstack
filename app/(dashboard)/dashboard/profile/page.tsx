"use client";

import Link from "next/link";
import {
  Building2,
  DollarSign,
  Users,
  Edit,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCredStackData } from "@/lib/hooks/use-credstack-data";
import { formatCurrency } from "@/lib/utils/format";
import { PageTransition } from "@/components/shared/page-transition";

function InfoRow({ label, value }: { label: string; value: string | number | boolean | null | undefined }) {
  if (value === null || value === undefined) return null;
  const displayValue = typeof value === "boolean" ? (value ? "Yes" : "No") : String(value);

  return (
    <div className="flex justify-between py-1.5 border-b border-border/50 last:border-0">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-xs font-medium text-foreground text-right">
        {displayValue}
      </span>
    </div>
  );
}

const DEMOGRAPHIC_LABELS: Record<string, string> = {
  minority: "Minority-Owned",
  women: "Women-Owned",
  veteran: "Veteran-Owned",
  disabled: "Disability-Owned",
  lgbtq: "LGBTQ-Owned",
  hubzone: "HUBZone",
};

const DEMOGRAPHIC_COLORS: Record<string, string> = {
  minority: "bg-blue-100 text-blue-700 border-blue-200",
  women: "bg-pink-100 text-pink-700 border-pink-200",
  veteran: "bg-green-100 text-green-700 border-green-200",
  disabled: "bg-purple-100 text-purple-700 border-purple-200",
  lgbtq: "bg-indigo-100 text-indigo-700 border-indigo-200",
  hubzone: "bg-amber-100 text-amber-700 border-amber-200",
};

const ENTITY_LABELS: Record<string, string> = {
  llc: "LLC",
  "s-corp": "S-Corporation",
  "c-corp": "C-Corporation",
  "sole-prop": "Sole Proprietorship",
  partnership: "Partnership",
  nonprofit: "Nonprofit",
};

const REVENUE_LABELS: Record<string, string> = {
  "under-100k": "Under $100K",
  "100k-500k": "$100K - $500K",
  "500k-1m": "$500K - $1M",
  "1m-5m": "$1M - $5M",
  "5m-10m": "$5M - $10M",
  "10m-50m": "$10M - $50M",
  "50m+": "$50M+",
};

function getProfileStrength(business: ReturnType<typeof useCredStackData>["business"]) {
  const fields = [
    business.name,
    business.legalName,
    business.entityType,
    business.industry,
    business.naicsCode,
    business.city,
    business.state,
    business.zip,
    business.yearFounded,
    business.ownerName,
    business.ownerEmail,
    business.annualRevenue,
    business.employeeCount,
    business.demographics.length > 0 ? true : null,
  ];
  const filled = fields.filter((f) => f !== null && f !== undefined && f !== "").length;
  return Math.round((filled / fields.length) * 100);
}

function ProfileCompletenessRing({ percent }: { percent: number }) {
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const filled = (percent / 100) * circumference;
  const color = percent >= 80 ? "#22c55e" : percent >= 50 ? "#3b82f6" : "#f59e0b";

  return (
    <div className="relative flex items-center justify-center w-[76px] h-[76px]">
      <svg width="76" height="76" viewBox="0 0 76 76" className="-rotate-90">
        <circle cx="38" cy="38" r={radius} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="5" />
        <motion.circle
          cx="38"
          cy="38"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - filled }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-lg font-bold text-white">{percent}%</span>
        <span className="text-[8px] text-slate-300 -mt-0.5">complete</span>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const { business } = useCredStackData();
  const strength = getProfileStrength(business);

  const initials = business.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <PageTransition>
      <div className="space-y-4">
        {/* Business Card Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden rounded-xl border border-border/50 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 p-5 text-white"
        >
          <div className="relative z-10 flex items-center gap-4">
            {/* Logo initial */}
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-xl font-bold shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold truncate">{business.name}</h1>
              <p className="text-sm text-slate-300 mt-0.5">{business.industry}</p>
              <p className="text-xs text-slate-400 mt-0.5">
                {business.city}, {business.state} {business.zip}
              </p>
            </div>
            <div className="hidden sm:flex flex-col items-center gap-1">
              <ProfileCompletenessRing percent={strength} />
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-cred-blue/10 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-cred-gold/5 blur-2xl rounded-full pointer-events-none" />
        </motion.div>

        {/* Mobile completeness ring - shown on dark bg card on mobile */}
        <div className="sm:hidden flex justify-center py-2">
          <div className="relative flex items-center justify-center w-[76px] h-[76px]">
            <svg width="76" height="76" viewBox="0 0 76 76" className="-rotate-90">
              <circle cx="38" cy="38" r={32} fill="none" stroke="#e2e8f0" strokeWidth="5" />
              <motion.circle
                cx="38"
                cy="38"
                r={32}
                fill="none"
                stroke={strength >= 80 ? "#22c55e" : strength >= 50 ? "#3b82f6" : "#f59e0b"}
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 32}
                initial={{ strokeDashoffset: 2 * Math.PI * 32 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 32 - (strength / 100) * 2 * Math.PI * 32 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-lg font-bold text-slate-800">{strength}%</span>
              <span className="text-[8px] text-slate-400 -mt-0.5">complete</span>
            </div>
          </div>
        </div>

        {/* Page header actions */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-foreground">
              Business Details
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Your business information used for matching grants and credits
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 shrink-0"
            render={<Link href="/onboarding" />}
          >
            <Edit className="size-3.5" />
            Edit Profile
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Business Info */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Building2 className="size-3.5 text-cred-blue" />
                <CardTitle className="text-base">Business Information</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <InfoRow label="Business Name" value={business.name} />
              <InfoRow label="Legal Name" value={business.legalName} />
              <InfoRow
                label="Entity Type"
                value={ENTITY_LABELS[business.entityType] || business.entityType}
              />
              <InfoRow label="Industry" value={business.industry} />
              <InfoRow label="NAICS Code" value={business.naicsCode} />
              <InfoRow
                label="Location"
                value={`${business.city}, ${business.state} ${business.zip}`}
              />
              <InfoRow label="Year Founded" value={business.yearFounded} />
              <InfoRow label="Owner" value={business.ownerName} />
              <InfoRow label="Email" value={business.ownerEmail} />
            </CardContent>
          </Card>

          {/* Financials */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <DollarSign className="size-3.5 text-cred-gold" />
                <CardTitle className="text-base">Financials</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <InfoRow
                label="Annual Revenue"
                value={formatCurrency(business.annualRevenue)}
              />
              <InfoRow
                label="Revenue Range"
                value={REVENUE_LABELS[business.revenueRange] || business.revenueRange}
              />
              <InfoRow label="Employees" value={business.employeeCount} />
              <InfoRow
                label="Annual R&D Spend"
                value={formatCurrency(business.annualRdSpend)}
              />
              <InfoRow
                label="Recent Equipment Purchases"
                value={business.recentEquipmentPurchases}
              />
              <InfoRow
                label="New Hires Last Year"
                value={business.newHiresLastYear}
              />
              <InfoRow
                label="Energy Improvements"
                value={business.energyImprovements}
              />
              <InfoRow label="Export Activity" value={business.exportActivity} />
            </CardContent>
          </Card>

          {/* Demographics */}
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Users className="size-3.5 text-purple-600" />
                <CardTitle className="text-base">Demographics & Certifications</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {business.demographics.length === 0 ? (
                <p className="text-xs text-muted-foreground">
                  No demographic certifications on file.
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {business.demographics.map((d) => (
                    <Badge
                      key={d}
                      className={cn(
                        "text-xs px-3 py-1 border",
                        DEMOGRAPHIC_COLORS[d] || "bg-slate-100 text-slate-700 border-slate-200"
                      )}
                    >
                      {DEMOGRAPHIC_LABELS[d] || d}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
}
