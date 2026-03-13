"use client";

import { use } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  AlertTriangle,
  Minus,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCredStackData } from "@/lib/hooks/use-credstack-data";
import { formatCurrencyRange } from "@/lib/utils/format";
import { GRANT_TYPE_CONFIG } from "@/lib/utils/constants";
import { GrantDetailHeader } from "@/components/grants/grant-detail-header";
import { EligibilityChecklist } from "@/components/grants/eligibility-checklist";
import { GrantTimeline } from "@/components/grants/grant-timeline";
import { PageTransition } from "@/components/shared/page-transition";
import { toast } from "sonner";

const DOC_STATUS_CONFIG = {
  have: {
    icon: CheckCircle2,
    color: "text-cred-green",
    bgColor: "bg-cred-green/10",
    label: "Have",
  },
  need: {
    icon: AlertTriangle,
    color: "text-amber-500",
    bgColor: "bg-amber-50",
    label: "Need",
  },
  na: {
    icon: Minus,
    color: "text-muted-foreground",
    bgColor: "bg-muted/50",
    label: "N/A",
  },
} as const;

function MatchScoreMeter({ score }: { score: number }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const filled = (score / 100) * circumference;
  const color = score >= 80 ? "#22c55e" : score >= 60 ? "#3b82f6" : score >= 40 ? "#f59e0b" : "#94a3b8";
  const bgGradientId = `meter-grad-${score}`;

  return (
    <div className="relative flex items-center justify-center w-24 h-24 mx-auto">
      <svg width="96" height="96" viewBox="0 0 96 96" className="-rotate-90">
        <defs>
          <linearGradient id={bgGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.8" />
            <stop offset="100%" stopColor={color} stopOpacity="1" />
          </linearGradient>
        </defs>
        <circle
          cx="48"
          cy="48"
          r={radius}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="6"
        />
        <motion.circle
          cx="48"
          cy="48"
          r={radius}
          fill="none"
          stroke={`url(#${bgGradientId})`}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - filled }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-bold text-slate-800">{score}</span>
        <span className="text-[9px] text-slate-400 -mt-0.5">match</span>
      </div>
    </div>
  );
}

function DocumentProgress({ documents }: { documents: { status: string }[] }) {
  const total = documents.filter((d) => d.status !== "na").length;
  const ready = documents.filter((d) => d.status === "have").length;
  const percent = total > 0 ? Math.round((ready / total) * 100) : 0;

  return (
    <div className="space-y-2 mb-4">
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-600 font-medium">Document Readiness</span>
        <span className="text-slate-500">
          {ready} of {total} ready ({percent}%)
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-slate-200/60 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className={cn(
            "h-full rounded-full",
            percent === 100
              ? "bg-cred-green"
              : percent >= 60
              ? "bg-cred-blue"
              : "bg-amber-400"
          )}
        />
      </div>
    </div>
  );
}

export default function GrantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { grants } = useCredStackData();
  const grant = grants.find((g) => g.id === id);

  if (!grant) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <h2 className="text-xl font-semibold text-foreground">
          Grant not found
        </h2>
        <p className="text-muted-foreground">
          The grant you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Button variant="outline" render={<Link href="/dashboard" />}>
          <ArrowLeft className="size-4" />
          Back to Dashboard
        </Button>
      </div>
    );
  }

  const similarGrants = grants.filter((g) =>
    grant.similarProgramIds.includes(g.id)
  );

  return (
    <PageTransition>
      <div className="space-y-4">
        {/* Back link */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to Dashboard
        </Link>

        {/* Header */}
        <GrantDetailHeader
          grant={grant}
          onSave={() => toast.success("Grant saved to favorites")}
          onStartApplication={() => {
            toast.success("Application draft created! Redirecting to tracker...", { duration: 3000 });
            setTimeout(() => window.open(grant.applicationUrl, "_blank"), 1500);
          }}
        />

        {/* Match Score Meter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-slate-50 to-white">
            <CardContent className="py-5">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <MatchScoreMeter score={grant.matchScore} />
                <div className="flex-1 text-center sm:text-left">
                  <p className="text-sm font-semibold text-slate-700">Match Score Analysis</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    This program has a {grant.matchScore}% match with your business profile based on industry,
                    location, size, and eligibility criteria.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <Separator />

        {/* Two-column layout */}
        <div className="grid gap-4 lg:grid-cols-3">
          {/* Left column (2/3) */}
          <div className="lg:col-span-2 space-y-4">
            {/* Full Description */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>About This Program</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                  {grant.fullDescription}
                </p>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1.5">
                  {grant.requirements.map((req, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-cred-blue" />
                      {req}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Documents Required */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Required Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <DocumentProgress documents={grant.documentsRequired} />
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document</TableHead>
                      <TableHead className="w-[100px]">Status</TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Description
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {grant.documentsRequired.map((doc, i) => {
                      const statusConfig = DOC_STATUS_CONFIG[doc.status];
                      const StatusIcon = statusConfig.icon;
                      return (
                        <TableRow key={i}>
                          <TableCell className="font-medium text-sm py-2">
                            {doc.name}
                          </TableCell>
                          <TableCell className="py-2">
                            <div
                              className={cn(
                                "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium",
                                statusConfig.color,
                                statusConfig.bgColor
                              )}
                            >
                              <StatusIcon className="size-3.5" />
                              {statusConfig.label}
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell text-muted-foreground text-sm py-2">
                            {doc.description}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Right column (1/3) */}
          <div className="space-y-4">
            <EligibilityChecklist reasons={grant.eligibilityReasons} />

            <GrantTimeline keyDates={grant.keyDates} />

            {/* Similar Programs */}
            {similarGrants.length > 0 && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Similar Programs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {similarGrants.map((sg) => (
                      <Link
                        key={sg.id}
                        href={`/dashboard/grants/${sg.id}`}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div
                          className={cn(
                            "flex h-8 w-8 shrink-0 items-center justify-center rounded text-[10px] font-bold",
                            GRANT_TYPE_CONFIG[sg.type].color
                          )}
                        >
                          {sg.agencyInitials}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">
                            {sg.name}
                          </p>
                          <p className="text-xs text-cred-gold">
                            {formatCurrencyRange(sg.amountMin, sg.amountMax)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Bottom AI button */}
        <div className="flex justify-center pt-2 pb-6">
          <Button
            size="lg"
            className="bg-cred-blue hover:bg-cred-blue-dark text-white gap-2"
            onClick={() => {
              toast("AI is analyzing your profile and pre-filling the application...", { icon: "🤖", duration: 4000 });
              setTimeout(() => {
                toast.success("Application pre-filled with 85% accuracy!");
              }, 2000);
            }}
          >
            <Sparkles className="size-4" />
            AI Pre-Fill Application
          </Button>
        </div>
      </div>
    </PageTransition>
  );
}
