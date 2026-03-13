"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Zap,
  Receipt,
  FileText,
  ArrowDownAZ,
  Clock,
  DollarSign,
  ArrowRight,
  ChevronDown,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  BarChart3,
  Users,
} from "lucide-react";
import { useCredStackData } from "@/lib/hooks/use-credstack-data";
import { PageHeader } from "@/components/layout/page-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { SavingsSummary } from "@/components/dashboard/savings-summary";
import { GrantMatchList } from "@/components/dashboard/grant-match-list";
import { MatchScoreChart } from "@/components/dashboard/match-score-chart";
import { DeadlineTicker } from "@/components/dashboard/deadline-ticker";
import { PageTransition } from "@/components/shared/page-transition";
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
import { formatCurrencyRange, formatCurrency } from "@/lib/utils/format";
import type { GrantMatch } from "@/lib/types";

type CategoryFilter = "all" | "grant" | "tax-credit" | "subsidy" | "loan";
type SortOption = "match" | "deadline" | "amount";

export default function DashboardPage() {
  const { grants, taxCredits, applications, business } = useCredStackData();
  const [activeTab, setActiveTab] = useState<CategoryFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("match");
  const [showMethodology, setShowMethodology] = useState(false);

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
    <PageTransition>
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

        {/* Value Callout Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="relative overflow-hidden rounded-xl border border-cred-gold/20 bg-gradient-to-r from-amber-50 via-yellow-50/80 to-orange-50/60 p-5"
        >
          <div className="relative z-10">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-cred-gold/15 shrink-0">
                <Sparkles className="w-5 h-5 text-cred-gold" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-800">
                  Based on your profile, you may qualify for programs worth
                </p>
                <p className="text-2xl sm:text-3xl font-extrabold text-cred-gold mt-1 tracking-tight">
                  {formatCurrencyRange(totalMin, totalMax)}
                </p>
                <button
                  onClick={() => setShowMethodology(!showMethodology)}
                  className="flex items-center gap-1 mt-2 text-xs font-medium text-slate-500 hover:text-slate-700 transition-colors"
                >
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showMethodology ? "rotate-180" : ""}`} />
                  How we calculated this
                </button>
                <AnimatePresence>
                  {showMethodology && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <ul className="mt-3 space-y-2 text-xs text-slate-600">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cred-green shrink-0 mt-0.5" />
                          <span>We analyzed your industry ({business.industry}), revenue, and employee count against {grants.length} active programs</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <BarChart3 className="w-3.5 h-3.5 text-cred-blue shrink-0 mt-0.5" />
                          <span>Award ranges are based on published program guidelines and historical award data for similar businesses</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Users className="w-3.5 h-3.5 text-purple-500 shrink-0 mt-0.5" />
                          <span>Your demographic certifications and location ({business.city}, {business.state}) unlock additional set-aside programs</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <TrendingUp className="w-3.5 h-3.5 text-cred-gold shrink-0 mt-0.5" />
                          <span>Tax credit estimates are based on your R&D spend, employee count, and recent capital expenditures</span>
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
          {/* Decorative gradient blobs */}
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-cred-gold/10 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-amber-200/20 blur-2xl rounded-full pointer-events-none" />
        </motion.div>

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
    </PageTransition>
  );
}
