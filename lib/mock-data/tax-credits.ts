import type { TaxCredit } from "@/lib/types";

export const mockTaxCredits: TaxCredit[] = [
  {
    id: "credit-001",
    name: "Research & Development Tax Credit (IRC §41)",
    category: "r-and-d",
    estimatedValueLow: 820_000,
    estimatedValueHigh: 1_450_000,
    confidence: 85,
    eligibilityReasons: [
      "Your $220K annual R&D spend likely includes qualifying activities",
      "Software development and IT services often qualify under the 4-part test",
      "As a small business (<$5M revenue history), you may qualify for the payroll tax offset",
    ],
    description:
      "The R&D Tax Credit rewards companies investing in innovation. Qualifying activities include developing new software, improving existing products, and creating new processes. The credit equals roughly 6-8% of qualifying R&D expenses.",
    claimingSteps: [
      "Document all R&D activities using the 4-part test (permitted purpose, technological uncertainty, process of experimentation, technological in nature)",
      "Calculate qualifying research expenses (wages, supplies, contract research)",
      "Complete IRS Form 6765",
      "File with your annual business tax return",
      "Consider amending prior 3 years if not previously claimed",
    ],
    irsFormNumber: "Form 6765",
    annualLimit: 0,
    carryForwardYears: 20,
    qualifyingExpenses:
      "Employee wages for R&D activities ($132K estimated), supplies ($18K), cloud computing costs for development ($30K), contract development ($40K)",
  },
  {
    id: "credit-002",
    name: "Work Opportunity Tax Credit (WOTC)",
    category: "employment",
    estimatedValueLow: 240_000,
    estimatedValueHigh: 480_000,
    confidence: 70,
    eligibilityReasons: [
      "You hired 4 new employees in the last 12 months",
      "Employees from targeted groups (veterans, SNAP recipients, ex-felons, etc.) qualify",
      "Credit ranges from $2,400 to $9,600 per qualifying employee",
    ],
    description:
      "WOTC provides a tax credit for hiring individuals from certain targeted groups who face barriers to employment. The credit is based on qualified wages paid to eligible workers during their first year of employment.",
    claimingSteps: [
      "Screen new hires for target group eligibility within 28 days of start date",
      "Submit IRS Form 8850 to your state workforce agency",
      "Obtain certification from state agency",
      "Complete IRS Form 5884 with your tax return",
    ],
    irsFormNumber: "Form 5884",
    annualLimit: 0,
    carryForwardYears: 20,
    qualifyingExpenses:
      "First-year wages paid to qualifying new hires. Estimated 1-2 of your 4 new hires may qualify based on statistical eligibility rates.",
  },
  {
    id: "credit-003",
    name: "Illinois Angel Investment Tax Credit",
    category: "state-specific",
    estimatedValueLow: 500_000,
    estimatedValueHigh: 1_000_000,
    confidence: 60,
    eligibilityReasons: [
      "Illinois-based technology company qualifies as investment target",
      "Under $10M annual revenue qualifies",
      "Investors in your company may receive 25% credit on investments up to $2M",
    ],
    description:
      "The Illinois Angel Investment Tax Credit provides a 25% credit to investors who make qualifying investments in Illinois small businesses. While the credit goes to the investor, highlighting this to potential investors can help you raise capital.",
    claimingSteps: [
      "Register your business as a Qualified New Business Venture (QNBV) with DCEO",
      "Provide QNBV certification to angel investors",
      "Investors claim the credit on their Illinois tax return",
      "Credit can offset up to $500K per investor per year",
    ],
    irsFormNumber: "IL Schedule 1299-C",
    annualLimit: 50_000_000,
    carryForwardYears: 5,
    qualifyingExpenses:
      "Qualifying equity investments in your company by angel investors. Estimated based on typical seed round sizes for companies at your stage.",
  },
  {
    id: "credit-004",
    name: "Section 179D Energy-Efficient Commercial Building Deduction",
    category: "energy",
    estimatedValueLow: 180_000,
    estimatedValueHigh: 360_000,
    confidence: 45,
    eligibilityReasons: [
      "If your office space has qualifying energy-efficient systems",
      "Covers lighting, HVAC, and building envelope improvements",
      "Deduction up to $5.00 per square foot for qualifying improvements",
    ],
    description:
      "Section 179D provides a tax deduction for energy-efficient improvements to commercial buildings. The deduction applies to lighting, HVAC, and building envelope systems that meet energy reduction targets.",
    claimingSteps: [
      "Determine if your building/office has qualifying energy-efficient systems",
      "Obtain a certification from a qualified professional engineer",
      "Calculate the deduction based on square footage and efficiency level",
      "Claim on your business tax return",
    ],
    irsFormNumber: "Form 7205",
    annualLimit: 0,
    carryForwardYears: 0,
    qualifyingExpenses:
      "Energy-efficient building improvements. Estimate based on typical office space for a 12-person company (~3,000 sq ft).",
  },
  {
    id: "credit-005",
    name: "Disabled Access Credit (IRC §44)",
    category: "industry",
    estimatedValueLow: 250_000,
    estimatedValueHigh: 500_000,
    confidence: 75,
    eligibilityReasons: [
      "Small business (under $1M revenue or under 30 FTE employees)",
      "Expenses for ADA compliance improvements qualify",
      "Covers sign language interpreters, readers, accessibility technology",
    ],
    description:
      "The Disabled Access Credit helps small businesses cover the costs of making their operations accessible to persons with disabilities. It covers 50% of eligible access expenditures between $250 and $10,250.",
    claimingSteps: [
      "Identify qualifying accessibility expenditures",
      "Ensure expenditures are between $250 and $10,250",
      "Complete IRS Form 8826",
      "File with your annual business tax return",
    ],
    irsFormNumber: "Form 8826",
    annualLimit: 500_000,
    carryForwardYears: 0,
    qualifyingExpenses:
      "ADA compliance improvements, accessible technology, sign language services, document accessibility. Estimated based on typical small business accessibility costs.",
  },
];
