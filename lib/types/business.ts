export type BusinessSize = "1-10" | "11-50" | "51-200" | "201-500" | "500+";

export type OwnershipDemographic =
  | "minority"
  | "women"
  | "veteran"
  | "disabled"
  | "lgbtq"
  | "hubzone";

export type EntityType =
  | "llc"
  | "s-corp"
  | "c-corp"
  | "sole-prop"
  | "partnership"
  | "nonprofit";

export type RevenueRange =
  | "under-100k"
  | "100k-500k"
  | "500k-1m"
  | "1m-5m"
  | "5m-10m"
  | "10m-50m"
  | "50m+";

export interface BusinessProfile {
  id: string;
  name: string;
  legalName: string;
  city: string;
  state: string;
  zip: string;
  industry: string;
  naicsCode: string;
  employeeCount: number;
  annualRevenue: number; // cents
  yearFounded: number;
  ownerName: string;
  ownerEmail: string;
  demographics: OwnershipDemographic[];
  entityType: EntityType;
  revenueRange: RevenueRange;
  annualRdSpend: number; // cents
  recentEquipmentPurchases: boolean;
  newHiresLastYear: number;
  energyImprovements: boolean;
  exportActivity: boolean;
}
