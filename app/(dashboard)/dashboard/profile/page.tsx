"use client";

import {
  Building2,
  DollarSign,
  Users,
  Briefcase,
  Edit,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCredStackData } from "@/lib/hooks/use-credstack-data";
import { formatCurrency } from "@/lib/utils/format";

function InfoRow({ label, value }: { label: string; value: string | number | boolean | null | undefined }) {
  if (value === null || value === undefined) return null;
  const displayValue = typeof value === "boolean" ? (value ? "Yes" : "No") : String(value);

  return (
    <div className="flex justify-between py-2 border-b border-border/50 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground text-right">
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
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Business Profile
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Your business information used for matching grants and credits
          </p>
        </div>
        <Button
          variant="outline"
          className="gap-2"
          onClick={() =>
            alert("Edit Profile would redirect to onboarding flow.")
          }
        >
          <Edit className="size-4" />
          Edit Profile
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Business Info */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Building2 className="size-4 text-cred-blue" />
              <CardTitle>Business Information</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
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
          <CardHeader>
            <div className="flex items-center gap-2">
              <DollarSign className="size-4 text-cred-gold" />
              <CardTitle>Financials</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
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
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="size-4 text-purple-600" />
              <CardTitle>Demographics & Certifications</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {business.demographics.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No demographic certifications on file.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {business.demographics.map((d) => (
                  <Badge
                    key={d}
                    variant="secondary"
                    className="text-sm px-3 py-1"
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
