"use client";

import {
  Building2,
  DollarSign,
  Users,
  Edit,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCredStackData } from "@/lib/hooks/use-credstack-data";
import { formatCurrency } from "@/lib/utils/format";
import { toast } from "sonner";

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

export default function ProfilePage() {
  const { business } = useCredStackData();

  return (
    <div className="space-y-4">
      {/* Page header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Business Profile
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Your business information used for matching grants and credits
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 shrink-0"
          onClick={() =>
            toast("Profile editing coming in Pro. Current profile was set during onboarding.", { icon: "✏️" })
          }
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
  );
}
