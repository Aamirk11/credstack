export type GrantType = "federal" | "state" | "local" | "private";

export type GrantCategory =
  | "grant"
  | "tax-credit"
  | "subsidy"
  | "loan"
  | "incentive";

export type GrantStatus = "open" | "closing-soon" | "closed" | "rolling";

export type MatchStrength = "strong" | "possible" | "worth-exploring";

export interface EligibilityReason {
  criterion: string;
  met: boolean;
  explanation: string;
}

export interface GrantMatch {
  id: string;
  name: string;
  agency: string;
  agencyInitials: string;
  type: GrantType;
  category: GrantCategory;
  status: GrantStatus;
  amountMin: number; // cents
  amountMax: number; // cents
  averageAward: number; // cents
  deadline: string; // ISO date
  matchScore: number; // 0-100
  matchStrength: MatchStrength;
  eligibilityReasons: EligibilityReason[];
  shortDescription: string;
  fullDescription: string;
  requirements: string[];
  documentsRequired: DocumentRequirement[];
  applicationUrl: string;
  tags: string[];
  isFavorited: boolean;
  pastAwardees: number;
  contactEmail: string;
  keyDates: KeyDate[];
  similarProgramIds: string[];
}

export interface DocumentRequirement {
  name: string;
  status: "have" | "need" | "na";
  description: string;
}

export interface KeyDate {
  label: string;
  date: string; // ISO date
  description: string;
}
