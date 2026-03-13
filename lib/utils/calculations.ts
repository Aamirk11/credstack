import type { GrantMatch, TaxCredit, GrantApplication, DeadlineEvent } from "@/lib/types";

export function getTotalGrantRange(grants: GrantMatch[]) {
  const strongMatches = grants.filter((g) => g.matchStrength === "strong");
  const totalMin = strongMatches.reduce((sum, g) => sum + g.amountMin, 0);
  const totalMax = strongMatches.reduce((sum, g) => sum + g.amountMax, 0);
  return { totalMin, totalMax };
}

export function getTotalCreditRange(credits: TaxCredit[]) {
  const totalLow = credits.reduce((sum, c) => sum + c.estimatedValueLow, 0);
  const totalHigh = credits.reduce((sum, c) => sum + c.estimatedValueHigh, 0);
  return { totalLow, totalHigh };
}

export function getActiveApplicationCount(applications: GrantApplication[]) {
  return applications.filter(
    (a) => !["approved", "denied"].includes(a.status)
  ).length;
}

export function getUpcomingDeadlines(events: DeadlineEvent[], limit = 5) {
  const now = new Date();
  return events
    .filter((e) => new Date(e.date) > now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, limit);
}

export function getMatchStrengthCounts(grants: GrantMatch[]) {
  return {
    strong: grants.filter((g) => g.matchStrength === "strong").length,
    possible: grants.filter((g) => g.matchStrength === "possible").length,
    exploring: grants.filter((g) => g.matchStrength === "worth-exploring").length,
  };
}

export function getBadgeCounts(
  grants: GrantMatch[],
  credits: TaxCredit[],
  applications: GrantApplication[],
  deadlines: DeadlineEvent[]
) {
  const now = new Date();
  const urgentDeadlines = deadlines.filter((d) => {
    const daysLeft = Math.ceil(
      (new Date(d.date).getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysLeft > 0 && daysLeft <= 30;
  }).length;

  return {
    matches: grants.filter((g) => g.matchStrength === "strong").length,
    credits: credits.length,
    applications: getActiveApplicationCount(applications),
    deadlines: urgentDeadlines,
  };
}
