import type { TaxCredit } from "@/lib/types";

export const mockTaxCredits: TaxCredit[] = [
  {
    id: "credit-001",
    name: "Research & Development Tax Credit (IRC Section 41)",
    category: "r-and-d",
    estimatedValueLow: 880_000,
    estimatedValueHigh: 1_540_000,
    confidence: 85,
    eligibilityReasons: [
      "Your $220K annual R&D spend likely includes qualified research expenses (QREs) under the 4-part test",
      "Software development, systems architecture, and IT process innovation typically qualify as technological experimentation",
      "As a company with less than 5 years of gross receipts history and under $5M revenue, you may elect the payroll tax offset (up to $500K/year against FICA) under IRC Section 41(h)",
    ],
    description:
      "The federal R&D Tax Credit (IRC Section 41) provides a credit of 6-8% of qualified research expenses using the Alternative Simplified Credit (ASC) method, which most small businesses use. QREs include W-2 wages for employees performing qualified research (approximately 60% of your R&D spend), supplies consumed in research, and 65% of contract research expenses. For a $1.8M-revenue IT company spending $220K on R&D, estimated QREs are typically $132K-$176K in wages, $18K in supplies, and $40K in contract research (65% = $26K), yielding a credit of roughly $8,800-$15,400. The credit can offset income tax dollar-for-dollar, and unused credits carry forward 20 years.",
    claimingSteps: [
      "Document all R&D activities using the IRS 4-part test: permitted purpose, technological uncertainty, process of experimentation, and technological in nature",
      "Identify and calculate qualified research expenses (QREs): employee wages for R&D, supplies, and 65% of contract research costs",
      "Calculate the credit using the Alternative Simplified Credit (ASC) method on IRS Form 6765, Part II",
      "If eligible, elect the payroll tax offset on Form 6765, Line 44, to apply up to $500K against employer FICA taxes",
      "File Form 6765 with your annual business income tax return (Form 1120 or 1065)",
      "Consider amending prior 3 years' returns (Forms 1040-X or 1120-X) if you have not previously claimed this credit",
    ],
    irsFormNumber: "Form 6765",
    annualLimit: 0,
    carryForwardYears: 20,
    qualifyingExpenses:
      "Employee wages for R&D activities (~$132K estimated based on developer/engineer salaries), supplies consumed in R&D ($18K), cloud computing costs used in experimentation ($30K — note: cloud costs are QREs only if they qualify as supplies), and 65% of contract development payments ($40K x 65% = $26K).",
  },
  {
    id: "credit-002",
    name: "Work Opportunity Tax Credit (WOTC)",
    category: "employment",
    estimatedValueLow: 240_000,
    estimatedValueHigh: 960_000,
    confidence: 65,
    eligibilityReasons: [
      "You hired 4 new employees in the last 12 months — each may qualify if they belong to a WOTC target group",
      "Target groups include veterans, SNAP recipients (food stamps), TANF recipients, designated community residents (Empowerment Zones), ex-felons, SSI recipients, and long-term unemployed",
      "Credit is $2,400 per qualifying employee (40% of first $6,000 in wages) or up to $9,600 for disabled veterans",
    ],
    description:
      "The Work Opportunity Tax Credit (WOTC), authorized under IRC Section 51 and extended through 2025 (typically renewed), incentivizes employers to hire individuals from groups that face barriers to employment. The credit equals 40% of up to $6,000 in first-year wages for most target groups ($2,400 per employee), or 40% of up to $24,000 for qualified veterans with service-connected disabilities ($9,600). To claim WOTC, employers must screen new hires using IRS Form 8850 within 28 days of the employee's start date and submit it to the state workforce agency for certification. Statistically, about 15-25% of new hires in small businesses qualify for WOTC.",
    claimingSteps: [
      "Screen each new hire for WOTC target group eligibility on or before the day the job offer is made",
      "Complete IRS Form 8850 (Pre-Screening Notice) and have the employee sign it within 28 days of their start date",
      "Submit Form 8850 and ETA Form 9061 or 9062 to the Illinois Department of Employment Security (IDES) for certification",
      "Receive certification from IDES confirming the employee belongs to a target group",
      "Calculate the credit on IRS Form 5884 (Work Opportunity Credit) at tax filing time",
      "Carry the credit to Form 3800 (General Business Credit) and file with your business return",
    ],
    irsFormNumber: "Form 5884",
    annualLimit: 0,
    carryForwardYears: 20,
    qualifyingExpenses:
      "First-year wages paid to certified target group employees. With 4 new hires, estimated 1-2 may qualify based on national WOTC certification rates (~20-25%). Credit of $2,400-$9,600 per qualifying hire depending on target group.",
  },
  {
    id: "credit-003",
    name: "Illinois Angel Investment Tax Credit",
    category: "state-specific",
    estimatedValueLow: 500_000,
    estimatedValueHigh: 1_250_000,
    confidence: 55,
    eligibilityReasons: [
      "Illinois technology companies under $10M revenue can register as Qualified New Business Ventures (QNBVs) with DCEO",
      "Investors who make equity investments in QNBVs receive a 25% Illinois income tax credit on investments up to $2M",
      "While the credit goes to the investor, QNBV registration makes your company more attractive to angel investors and can help raise $200K-$500K in capital",
    ],
    description:
      "The Illinois Angel Investment Tax Credit (35 ILCS 10/5-15) provides a 25% income tax credit to individuals and entities that invest in Qualified New Business Ventures (QNBVs). The company itself does not receive the credit — rather, it registers as a QNBV with DCEO, and its investors claim the credit on their Illinois income tax returns using Schedule 1299-C. The program has a $10M annual cap statewide. To qualify as a QNBV, the company must: (1) be headquartered in Illinois, (2) have been in operation for fewer than 10 years, (3) have fewer than 100 employees, and (4) have less than $10M in annual revenue. The program was created by the Illinois Business Tax Reform Act and has been periodically renewed by the General Assembly. As of 2025, the program remains active — verify current authorization with DCEO.",
    claimingSteps: [
      "Apply to DCEO to register your company as a Qualified New Business Venture (QNBV)",
      "Once approved, provide your QNBV certification to prospective angel investors",
      "Investors make qualifying equity investments (not loans or convertible notes) in your company",
      "Investors claim the 25% credit on their Illinois income tax return using Schedule 1299-C",
      "Each investor can claim up to $500K in credits per year (25% of $2M max investment)",
    ],
    irsFormNumber: "IL Schedule 1299-C",
    annualLimit: 50_000_000,
    carryForwardYears: 5,
    qualifyingExpenses:
      "Qualifying equity investments made by angel investors in your company. The estimated value range reflects the potential tax savings to investors on typical seed/angel rounds ($200K-$500K), making your company more competitive for fundraising.",
  },
  {
    id: "credit-004",
    name: "Section 179D Energy-Efficient Commercial Building Deduction",
    category: "energy",
    estimatedValueLow: 150_000,
    estimatedValueHigh: 375_000,
    confidence: 40,
    eligibilityReasons: [
      "If your leased office space has qualifying energy-efficient systems installed after 2022, you may qualify as the building designer/tenant",
      "The Inflation Reduction Act (2022) expanded 179D to allow building tenants to claim the deduction for improvements they pay for",
      "Qualifying systems include interior lighting, HVAC, and building envelope upgrades that achieve 25%+ energy savings vs. ASHRAE 90.1 reference standard",
    ],
    description:
      "Section 179D of the Internal Revenue Code provides a tax deduction for energy-efficient improvements to commercial buildings. As updated by the Inflation Reduction Act of 2022, the deduction ranges from $0.50 to $5.00 per square foot depending on the level of energy savings achieved. To qualify, improvements must reduce total energy costs by at least 25% compared to the ASHRAE 90.1 reference building standard. For a typical 3,000 sq ft office for 12 employees, the deduction could be $1,500-$15,000 (at 22% tax rate, that is $330-$3,300 in tax savings). The deduction is claimed on IRS Form 7205. A certification from a qualified engineer or contractor is required.",
    claimingSteps: [
      "Identify energy-efficient improvements to your office space (lighting, HVAC, insulation, windows)",
      "Engage a qualified professional to perform an energy model and certify that improvements achieve 25%+ savings vs. ASHRAE 90.1",
      "Calculate the deduction ($0.50-$5.00/sq ft) based on certified energy savings percentage",
      "Complete IRS Form 7205 (Energy Efficient Commercial Buildings Deduction) and attach the qualified certification",
      "Claim the deduction on your business income tax return",
    ],
    irsFormNumber: "Form 7205",
    annualLimit: 0,
    carryForwardYears: 0,
    qualifyingExpenses:
      "Energy-efficient building improvements to your office space. Estimated based on ~3,000 sq ft office for a 12-person company. Deduction is $0.50-$5.00/sq ft; actual tax benefit depends on your marginal tax rate (~22% for this revenue level).",
  },
  {
    id: "credit-005",
    name: "Disabled Access Credit (IRC Section 44)",
    category: "industry",
    estimatedValueLow: 125_000,
    estimatedValueHigh: 500_000,
    confidence: 75,
    eligibilityReasons: [
      "Your company qualifies as an eligible small business: under $1M in revenue or under 30 full-time employees (you have 12 FTEs)",
      "Expenses for ADA compliance, accessible technology, and workplace accommodations qualify",
      "Credit covers 50% of eligible expenditures between $250 and $10,250 per year (max credit $5,000/year)",
    ],
    description:
      "The Disabled Access Credit under IRC Section 44 helps small businesses pay for ADA compliance and accessibility improvements. The credit equals 50% of eligible access expenditures that exceed $250 but do not exceed $10,250, for a maximum annual credit of $5,000. Eligible expenditures include: removing architectural barriers, providing accessible formats (Braille, large print, audio), purchasing adaptive equipment, providing sign language interpreters, and making websites/applications accessible (WCAG compliance). For an IT company, web accessibility remediation, screen reader compatibility, and accessible document creation are common qualifying expenses. The credit is non-refundable but can be carried back 1 year or forward 20 years.",
    claimingSteps: [
      "Identify qualifying accessibility expenditures made during the tax year",
      "Verify your business qualifies: gross receipts under $1M OR fewer than 30 full-time employees",
      "Calculate the credit: 50% of eligible costs between $250 and $10,250",
      "Complete IRS Form 8826 (Disabled Access Credit)",
      "Carry the credit to Form 3800 (General Business Credit)",
      "File with your annual business income tax return",
    ],
    irsFormNumber: "Form 8826",
    annualLimit: 500_000,
    carryForwardYears: 20,
    qualifyingExpenses:
      "ADA compliance improvements: website accessibility (WCAG 2.1 compliance), accessible document production, workplace modifications, assistive technology purchases, interpreter services. Estimated $1,250-$10,250 in qualifying expenditures yielding a credit of $500-$5,000.",
  },
];
