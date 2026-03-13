"use client";

import { useMemo } from "react";
import { CredStackDataContext } from "@/lib/hooks/use-credstack-data";
import {
  mockBusiness,
  mockGrants,
  mockTaxCredits,
  mockApplications,
  mockDeadlines,
} from "@/lib/mock-data";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { UpgradeModalProvider } from "@/lib/hooks/use-upgrade-modal";
import { UpgradeModal } from "@/components/shared/upgrade-modal";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = useMemo(
    () => ({
      business: mockBusiness,
      grants: mockGrants,
      taxCredits: mockTaxCredits,
      applications: mockApplications,
      deadlines: mockDeadlines,
    }),
    []
  );

  return (
    <CredStackDataContext.Provider value={data}>
      <UpgradeModalProvider>
        <div className="min-h-screen bg-[#FAFAFA]">
          {/* Sidebar - desktop only */}
          <Sidebar />

          {/* Main content area */}
          <div className="lg:pl-64 flex flex-col min-h-screen">
            <Topbar />
            <main className="flex-1 p-4 sm:p-6 pb-20 lg:pb-6">
              {children}
            </main>
          </div>

          {/* Mobile bottom nav */}
          <MobileNav />
          <UpgradeModal />
        </div>
      </UpgradeModalProvider>
    </CredStackDataContext.Provider>
  );
}
