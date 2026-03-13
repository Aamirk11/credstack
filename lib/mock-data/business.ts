import type { BusinessProfile } from "@/lib/types";

export const mockBusiness: BusinessProfile = {
  id: "biz-001",
  name: "Nexus Digital Solutions",
  legalName: "Nexus Digital Solutions LLC",
  city: "Chicago",
  state: "IL",
  zip: "60607",
  industry: "Computer Systems Design Services",
  naicsCode: "541512",
  employeeCount: 12,
  annualRevenue: 180_000_000, // $1.8M
  yearFounded: 2022,
  ownerName: "Marcus Chen",
  ownerEmail: "marcus@nexusdigital.io",
  demographics: ["minority"],
  entityType: "llc",
  revenueRange: "1m-5m",
  annualRdSpend: 22_000_000, // $220K
  recentEquipmentPurchases: true,
  newHiresLastYear: 4,
  energyImprovements: false,
  exportActivity: false,
};
