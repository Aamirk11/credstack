# CredStack

AI-powered grant and tax credit finder for small businesses. "TurboTax meets Mint for grants."

## Stack
- Next.js 14+ App Router, TypeScript, Tailwind CSS, shadcn/ui, Recharts, Framer Motion, Inter font
- All shadcn components in components/ui/ (base-nova style, lucide icons)

## Design System
- Primary: #2563EB (royal blue) — brand, CTAs, navigation active states
- Gold: #F59E0B — money amounts, awards, financial figures
- Green: #16A34A — eligible/approved status, match strength "strong"
- Text: #0F172A (dark slate), Muted: #64748B
- Background: #FAFAFA, Card: #FFFFFF, Border: #E2E8F0
- Destructive: #EF4444 (red) for denied/urgent
- Amber: #F59E0B for "possible match" and closing-soon deadlines

## Conventions
- PascalCase components, kebab-case routes, camelCase utils
- Route groups: (marketing) for landing/onboarding, (dashboard) for app
- Mock data in lib/mock-data/, types in lib/types/
- shadcn primitives in components/ui/, feature components in feature dirs
- Use `cn()` from lib/utils for conditional classes
- All monetary values stored in cents internally, displayed as dollars via formatCurrency()
- Icon map pattern: icons stored as string keys in constants, mapped to Lucide components in components
- CredStackDataContext provides all mock data to dashboard pages

## Route Map
- / — Landing page (marketing)
- /onboarding — 4-step business profile wizard
- /dashboard — Matches dashboard (main)
- /dashboard/grants/[id] — Grant detail
- /dashboard/tax-credits — Tax credit report
- /dashboard/applications — Application tracker (kanban)
- /dashboard/calendar — Deadline calendar
- /dashboard/profile — Business profile view/edit
- /dashboard/settings — Notification preferences

## Mock Business
Nexus Digital Solutions — Chicago IT services, 12 employees, $1.8M revenue, minority-owned LLC, NAICS 541512
- 18 matched grants, 5 tax credits, 3 applications in progress

## Key Files
- lib/hooks/use-credstack-data.ts — Context hook for all data
- lib/utils/constants.ts — NAV_ITEMS, PRICING_TIERS, MATCH_STRENGTH_CONFIG, etc.
- lib/utils/format.ts — formatCurrency, formatCurrencyRange, daysUntil, etc.
- lib/utils/calculations.ts — getTotalGrantRange, getBadgeCounts, etc.
