"use client";

import { createContext, useContext } from "react";
import type { BusinessProfile, GrantMatch, TaxCredit, GrantApplication, DeadlineEvent } from "@/lib/types";

export interface CredStackData {
  business: BusinessProfile;
  grants: GrantMatch[];
  taxCredits: TaxCredit[];
  applications: GrantApplication[];
  deadlines: DeadlineEvent[];
}

export const CredStackDataContext = createContext<CredStackData | null>(null);

export function useCredStackData(): CredStackData {
  const ctx = useContext(CredStackDataContext);
  if (!ctx) {
    throw new Error("useCredStackData must be used within CredStackDataContext.Provider");
  }
  return ctx;
}
