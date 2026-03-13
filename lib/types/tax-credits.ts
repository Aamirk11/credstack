export type CreditCategory =
  | "r-and-d"
  | "employment"
  | "energy"
  | "investment"
  | "state-specific"
  | "industry";

export interface TaxCredit {
  id: string;
  name: string;
  category: CreditCategory;
  estimatedValueLow: number; // cents
  estimatedValueHigh: number; // cents
  confidence: number; // 0-100
  eligibilityReasons: string[];
  description: string;
  claimingSteps: string[];
  irsFormNumber: string;
  annualLimit: number; // cents, 0 = unlimited
  carryForwardYears: number;
  qualifyingExpenses: string;
}

export interface TaxCreditSummary {
  totalEstimatedLow: number; // cents
  totalEstimatedHigh: number; // cents
  creditCount: number;
  lastCalculated: string; // ISO date
}
