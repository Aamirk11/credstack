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

const DOC_STATUS_CONFIG = {
  have: {
    icon: CheckCircle2,
    color: "text-cred-green",
    label: "Have",
  },
  need: {
    icon: AlertTriangle,
    color: "text-amber-500",
    label: "Need",
  },
  na: {
    icon: Minus,
    color: "text-muted-foreground",
    label: "N/A",
  },
} as const;

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
    <div className="space-y-6">
      {/* Back link */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-4" />
        Back to Grants
      </Link>

      {/* Header */}
      <GrantDetailHeader
        grant={grant}
        onSave={() => alert("Grant saved to favorites!")}
        onStartApplication={() =>
          window.open(grant.applicationUrl, "_blank")
        }
      />

      <Separator />

      {/* Two-column layout */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Full Description */}
          <Card>
            <CardHeader>
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
            <CardHeader>
              <CardTitle>Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
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
            <CardHeader>
              <CardTitle>Required Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document</TableHead>
                    <TableHead>Status</TableHead>
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
                        <TableCell className="font-medium">
                          {doc.name}
                        </TableCell>
                        <TableCell>
                          <div
                            className={cn(
                              "flex items-center gap-1.5",
                              statusConfig.color
                            )}
                          >
                            <StatusIcon className="size-4" />
                            <span className="text-xs">{statusConfig.label}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell text-muted-foreground">
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
        <div className="space-y-6">
          <EligibilityChecklist reasons={grant.eligibilityReasons} />

          <GrantTimeline keyDates={grant.keyDates} />

          {/* Similar Programs */}
          {similarGrants.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Similar Programs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
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
      <div className="flex justify-center pt-4 pb-8">
        <Button
          size="lg"
          className="bg-cred-blue hover:bg-cred-blue-dark text-white gap-2"
          onClick={() =>
            alert(
              "AI Pre-Fill is a Pro feature. Upgrade to auto-fill your application with your business profile data."
            )
          }
        >
          <Sparkles className="size-4" />
          AI Pre-Fill Application
        </Button>
      </div>
    </div>
  );
}
