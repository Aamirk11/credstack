export const APP_NAME = "CredStack";

export const NAV_ITEMS = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: "LayoutDashboard",
    badgeKey: "matches" as const,
  },
  {
    label: "Tax Credits",
    href: "/dashboard/tax-credits",
    icon: "Receipt",
    badgeKey: "credits" as const,
  },
  {
    label: "Applications",
    href: "/dashboard/applications",
    icon: "FileText",
    badgeKey: "applications" as const,
  },
  {
    label: "Calendar",
    href: "/dashboard/calendar",
    icon: "Calendar",
    badgeKey: "deadlines" as const,
  },
  {
    label: "Profile",
    href: "/dashboard/profile",
    icon: "Building2",
    badgeKey: null,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: "Settings",
    badgeKey: null,
  },
] as const;

export const MOBILE_NAV_ITEMS = NAV_ITEMS.slice(0, 4);

export const PRICING_TIERS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Discover what you qualify for",
    features: [
      "Business profile setup",
      "See matched programs",
      "View match strength",
      "Basic eligibility info",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "Full access to apply & track",
    features: [
      "Everything in Free",
      "Full eligibility details",
      "AI-assisted applications",
      "Document checklists",
      "Deadline reminders",
      "CPA tax credit report",
      "Application tracker",
      "Priority support",
    ],
    cta: "Start Pro Trial",
    highlighted: true,
  },
  {
    name: "Success Fee",
    price: "5%",
    period: "of won grants",
    description: "We win when you win",
    features: [
      "Everything in Pro",
      "Dedicated grant writer",
      "Full application support",
      "Interview preparation",
      "Post-award compliance",
      "Pay only when approved",
    ],
    cta: "Talk to Sales",
    highlighted: false,
  },
] as const;

export const MATCH_STRENGTH_CONFIG = {
  strong: {
    label: "Strong Match",
    color: "bg-cred-green text-white",
    dotColor: "bg-cred-green",
  },
  possible: {
    label: "Possible Match",
    color: "bg-amber-500 text-white",
    dotColor: "bg-amber-500",
  },
  "worth-exploring": {
    label: "Worth Exploring",
    color: "bg-slate-400 text-white",
    dotColor: "bg-slate-400",
  },
} as const;

export const GRANT_TYPE_CONFIG = {
  federal: { label: "Federal", color: "bg-blue-100 text-blue-700" },
  state: { label: "State", color: "bg-purple-100 text-purple-700" },
  local: { label: "Local", color: "bg-emerald-100 text-emerald-700" },
  private: { label: "Private", color: "bg-orange-100 text-orange-700" },
} as const;

export const APPLICATION_STATUS_CONFIG = {
  researching: { label: "Researching", color: "bg-slate-100 text-slate-700" },
  preparing: { label: "Preparing", color: "bg-blue-100 text-blue-700" },
  submitted: { label: "Submitted", color: "bg-purple-100 text-purple-700" },
  "under-review": { label: "Under Review", color: "bg-amber-100 text-amber-700" },
  approved: { label: "Approved", color: "bg-green-100 text-green-700" },
  denied: { label: "Denied", color: "bg-red-100 text-red-700" },
} as const;

export const INDUSTRIES = [
  { code: "541512", label: "Computer Systems Design Services" },
  { code: "541511", label: "Custom Computer Programming Services" },
  { code: "541519", label: "Other Computer Related Services" },
  { code: "541611", label: "Administrative Management Consulting" },
  { code: "541613", label: "Marketing Consulting Services" },
  { code: "541711", label: "Research and Development (Physical Sciences)" },
  { code: "541720", label: "Research and Development (Social Sciences)" },
  { code: "611420", label: "Computer Training" },
  { code: "511210", label: "Software Publishers" },
  { code: "518210", label: "Data Processing & Hosting" },
  { code: "238210", label: "Electrical Contractors" },
  { code: "236220", label: "Commercial Construction" },
  { code: "722511", label: "Full-Service Restaurants" },
  { code: "621111", label: "Offices of Physicians" },
  { code: "812111", label: "Barber Shops" },
  { code: "812112", label: "Beauty Salons" },
] as const;

export const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA",
  "HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
  "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
  "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY","DC",
] as const;
