# CredStack

AI-powered grant and tax credit finder for small businesses. "TurboTax meets Mint for grants."

## Stack
- Next.js 16 App Router, TypeScript, Tailwind CSS v4, shadcn/ui (base-nova), Recharts, Framer Motion, Sonner (toasts), Inter font
- PWA-ready: manifest.json, standalone display, mobile viewport config

## Design System
- Primary: #2563EB (royal blue) — brand, CTAs, navigation active states
- Gold: #F59E0B — money amounts, awards, financial figures (always text-cred-gold)
- Green: #16A34A — eligible/approved status, match strength "strong"
- Text: #0F172A (dark slate), Muted: #64748B
- Background: #FAFAFA, Card: #FFFFFF, Border: #E2E8F0
- Destructive: #EF4444 (red) for denied/urgent
- Custom colors via Tailwind v4: text-cred-blue, bg-cred-gold, text-cred-green, etc.

## Conventions
- PascalCase components, kebab-case routes, camelCase utils
- Route groups: (marketing) for landing/onboarding, (dashboard) for app
- Mock data in lib/mock-data/, types in lib/types/
- shadcn primitives in components/ui/ (base-nova uses `render` prop for polymorphism, NOT asChild)
- Use `cn()` from lib/utils for conditional classes
- Use `toast` from `sonner` for ALL button feedback (no dead buttons)
- All monetary values stored in cents internally, displayed as dollars via formatCurrency()
- Icon map pattern: icons stored as string keys in constants, mapped to Lucide components
- CredStackDataContext provides all mock data to dashboard pages
- Spacing: compact/dense layouts — avoid excessive padding, mobile-first
- All tap targets minimum 44px on mobile
- Framer Motion: page transitions, count-up animations, staggered reveals, AnimatePresence

## Route Map
- / — Landing page (marketing) with animated hero, pricing, waitlist
- /onboarding — 6-step wizard (welcome → business info → financials → demographics → goals → results celebration)
- /dashboard — Matches dashboard with filters, sort, stat cards, chart
- /dashboard/grants/[id] — Grant detail with eligibility checklist, docs, timeline
- /dashboard/tax-credits — Tax credit report with chart, CPA export
- /dashboard/applications — Kanban tracker (Researching → Preparing → Submitted → Review → Approved/Denied)
- /dashboard/calendar — Monthly deadline calendar with urgency coloring
- /dashboard/profile — Business profile display with demographic badges
- /dashboard/settings — Notification toggles, plan info

## Component Patterns
- Forms: controlled state, toast on submit, validation feedback
- Modals: controlled via parent state, always have close mechanism
- Charts: wrap in explicit-height container, Recharts needs "use client"
- Animations: Framer Motion for scroll reveals, count-up counters, stagger delays, AnimatePresence for transitions
- SVG Logo: components/shared/credstack-logo.tsx — use everywhere for brand consistency
- Buttons: every interactive button provides toast feedback, state change, or navigation

## Mock Business
Nexus Digital Solutions — Chicago IT services, 12 employees, $1.8M revenue, minority-owned LLC, NAICS 541512
- 18 matched grants, 5 tax credits, 3 applications in progress

## Key Files
- components/shared/credstack-logo.tsx — SVG logo with shield + coins + checkmark
- lib/hooks/use-credstack-data.ts — Context hook for all data
- lib/utils/constants.ts — NAV_ITEMS, PRICING_TIERS, MATCH_STRENGTH_CONFIG, etc.
- lib/utils/format.ts — formatCurrency, formatCurrencyRange, daysUntil, etc.
- lib/utils/calculations.ts — getTotalGrantRange, getBadgeCounts, etc.
