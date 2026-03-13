"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Target,
  Zap,
  Receipt,
  FileText,
  ArrowDownAZ,
  Clock,
  DollarSign,
  ArrowRight,
} from "lucide-react";
import { useCredStackData } from "@/lib/hooks/use-credstack-data";
import { PageHeader } from "@/components/layout/page-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { SavingsSummary } from "@/components/dashboard/savings-summary";
import { GrantMatchList } from "@/components/dashboard/grant-match-list";
import { MatchScoreChart } from "@/components/dashboard/match-score-chart";
import { DeadlineTicker } from "@/components/dashboard/deadline-ticker";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getTotalGrantRange,
  getTotalCreditRange,
  getActiveApplicationCount,
  getMatchStrengthCounts,
} from "@/lib/utils/calculations";
import { formatCurrencyRange } from "@/lib/utils/format";
import type { GrantMatch } from "@/lib/types";

type CategoryFilter = "all" | "grant" | "tax-credit" | "subsidy" | "loan";
type SortOption = "match" | "deadline" | "amount";

export default function DashboardPage() {
  const { grants, taxCredits, applications, business } = useCredStackData();
  const [activeTab, setActiveTab] = useState<CategoryFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("match");

  const grantRange = getTotalGrantRange(grants);
  const creditRange = getTotalCreditRange(taxCredits);
  const activeApps = getActiveApplicationCount(applications);
  const matchCounts = getMatchStrengthCounts(grants);

  const totalMin = grantRange.totalMin + creditRange.totalLow;
  const totalMax = grantRange.totalMax + creditRange.totalHigh;

  // Find most recent in-progress application
  const inProgressApp = applications.find((a) => a.status === "researching" || a.status === "preparing");

  const filteredGrants = useMemo(() => {
    let filtered: GrantMatch[] =
      activeTab === "all"
        ? grants
        : grants.filter((g) => g.category === activeTab);

    const sorted = [...filtered];
    switch (sortBy) {
      case "match":
        sorted.sort((a, b) => b.matchScore - a.matchScore);
        break;
      case "deadline":
        sorted.sort((a, b) => {
          if (!a.deadline) return 1;
          if (!b.deadline) return -1;
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        });
        break;
      case "amount":
        sorted.sort((a, b) => b.amountMax - a.amountMax);
        break;
    }

    return sorted;
  }, [grants, activeTab, sortBy]);

  return (
    <div className="space-y-4">
      {/* Welcome greeting */}
      <p className="text-sm text-slate-500">
        Welcome back, <span className="font-medium text-slate-700">{business.name.split(" ")[0]}</span>
      </p>

      {/* Page Header */}
      <PageHeader
        title="Your Opportunities"
        description={`Potential value: ${formatCurrencyRange(totalMin, totalMax)}`}
        breadcrumb="Dashboard / Overview"
      />

      {/* Quick Action Bar */}
      {inProgressApp && (
        <Link
          href={`/dashboard/applications/${inProgressApp.id}`}
          className="flex items-center justify-between gap-3 px-4 py-3 rounded-lg bg-cred-blue/5 border border-cred-blue/15 hover:bg-cred-blue/10 transition-colors group"
        >
          <div className="flex items-center gap-2 min-w-0">
            <FileText className="w-4 h-4 text-cred-blue shrink-0" />
            <span className="text-sm font-medium text-cred-blue truncate">
              Continue: {inProgressApp.grantName}
            </span>
          </div>
          <ArrowRight className="w-4 h-4 text-cred-blue shrink-0 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          title="Total Matches"
          value={String(grants.length)}
          subtitle="programs found"
          icon={Target}
          color="blue"
          index={0}
        />
        <StatCard
          title="Strong Matches"
          value={String(matchCounts.strong)}
          subtitle="high confidence"
          icon={Zap}
          color="green"
          index={1}
        />
        <StatCard
          title="Tax Credits"
          value={String(taxCredits.length)}
          subtitle="identified"
          icon={Receipt}
          color="gold"
          index={2}
        />
        <StatCard
          title="Applications"
          value={String(activeApps)}
          subtitle="in progress"
          icon={FileText}
          color="slate"
          index={3}
        />
      </div>

      {/* Savings Summary */}
      <SavingsSummary />

      {/* Main Content: Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column: Grant List with Filters */}
        <div className="lg:col-span-2 space-y-3">
          {/* Filters Row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <Tabs
              value={activeTab}
              onValueChange={(val) => setActiveTab(val as CategoryFilter)}
            >
              <TabsList className="overflow-x-auto flex-nowrap max-w-full">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="grant">Grants</TabsTrigger>
                <TabsTrigger value="tax-credit">Tax Credits</TabsTrigger>
                <TabsTrigger value="subsidy">Subsidies</TabsTrigger>
                <TabsTrigger value="loan">Loans</TabsTrigger>
              </TabsList>
            </Tabs>

            <Select
              value={sortBy}
              onValueChange={(val: string | null) => { if (val) setSortBy(val as SortOption); }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="match">
                  <div className="flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5" />
                    Match Strength
                  </div>
                </SelectItem>
                <SelectItem value="deadline">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5" />
                    Deadline
                  </div>
                </SelectItem>
                <SelectItem value="amount">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-3.5 h-3.5" />
                    Award Amount
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Grant List */}
          <GrantMatchList grants={filteredGrants} />
        </div>

        {/* Right Column: Chart + Deadlines */}
        <div className="space-y-4">
          <MatchScoreChart />
          <DeadlineTicker />
        </div>
      </div>
    </div>
  );
}
