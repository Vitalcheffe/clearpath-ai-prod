import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // ─── 1. Demo User (for conversation/saved resource features) ──────
  const demoUser = await prisma.user.upsert({
    where: { email: "amine@example.com" },
    update: {},
    create: {
      name: "Amine Harch El Korane",
      email: "amine@example.com",
      username: "amine",
      plan: "free",
      language: "en",
      location: "Houston, TX",
    },
  });

  console.log("Demo user created:", demoUser.id);

  // ─── 2. Default UserSettings ───────────────────────────────────
  await prisma.userSettings.upsert({
    where: { userId: demoUser.id },
    update: {},
    create: {
      userId: demoUser.id,
    },
  });

  console.log("Default settings created for demo user");

  // ─── 3. Community Resources (50+ across 6 cities, 9 categories) ──────

  const resources = [
    // ── Housing Assistance (4) ──
    {
      name: "Houston Housing Authority",
      category: "Housing Assistance",
      description: "Section 8 housing choice vouchers, public housing applications, and emergency housing assistance for low-income families.",
      phone: "713-260-0600",
      address: "2640 Fountain View Dr, Houston, TX 77057",
      hours: "Mon-Fri 8am-5pm",
      eligibility: "Income at or below 50% AMI",
      services: "Section 8 vouchers, Public housing, Emergency housing assistance, Tenant counseling",
      languages: "English, Spanish",
      lastVerified: "2026-05-01",
      url: "https://www.housingforhouston.com",
    },
    {
      name: "Star of Hope Mission",
      category: "Housing Assistance",
      description: "Emergency shelter for men, women, and children experiencing homelessness. Three Houston locations with 24/7 intake.",
      phone: "713-226-6552",
      address: "1811 Ruiz St, Houston, TX 77009",
      hours: "24/7 intake",
      eligibility: "Homeless individuals and families",
      services: "Emergency shelter, Meals, Case management, Transitional housing, Job readiness programs",
      languages: "English, Spanish",
      lastVerified: "2026-05-01",
      url: "https://www.sohmission.org",
    },
    {
      name: "Catholic Charities Housing",
      category: "Housing Assistance",
      description: "Rental assistance, eviction prevention, and transitional housing programs for families in crisis.",
      phone: "713-526-4611",
      address: "2900 Louisiana St, Houston, TX 77006",
      hours: "Mon-Fri 8:30am-5pm",
      eligibility: "Low-income families facing housing crisis",
      services: "Rental assistance, Eviction prevention, Transitional housing, Utility assistance",
      languages: "English, Spanish",
      lastVerified: "2026-04-01",
      url: "https://www.catholiccharities.org",
    },
    {
      name: "Avenue Community Development Corporation",
      category: "Housing Assistance",
      description: "Affordable housing development and homebuyer assistance programs in Houston's historic neighborhoods. Offers down payment help and financial literacy workshops.",
      phone: "713-864-8099",
      address: "3224 Yoakum Blvd, Houston, TX 77006",
      hours: "Mon-Fri 9am-5pm",
      eligibility: "Low-to-moderate income households in Houston",
      services: "Homebuyer assistance, Down payment help, Financial literacy, Affordable housing development",
      languages: "English, Spanish",
      lastVerified: "2026-03-15",
      url: "https://www.avecdc.org",
    },

    // ── Food Assistance (4) ──
    {
      name: "Houston Food Bank",
      category: "Food Assistance",
      description: "Largest food bank in the US. Free groceries, produce, and prepared meals through 1,800+ partner agencies across 18 counties.",
      phone: "832-369-9390",
      address: "535 Portwall St, Houston, TX 77029",
      hours: "Mon-Sat 8am-4pm",
      eligibility: "Anyone in need — no ID required",
      services: "Food distribution, Mobile pantry, SNAP application assistance, Nutrition programs, Prepared meals",
      languages: "English, Spanish, Vietnamese",
      lastVerified: "2026-05-01",
      url: "https://www.houstonfoodbank.org",
    },
    {
      name: "SNAP Benefits (Texas HHSC)",
      category: "Food Assistance",
      description: "Supplemental Nutrition Assistance Program. Monthly food benefits loaded onto Lone Star Card. Apply online or by phone.",
      phone: "877-541-7905",
      address: "Apply online at YourTexasBenefits.com",
      hours: "Apply 24/7 online",
      eligibility: "Income at or below 130% federal poverty level",
      services: "Monthly food benefits, Nutrition education, Employment & training referrals",
      languages: "English, Spanish, Multiple languages",
      lastVerified: "2026-05-01",
      url: "https://www.yourtexasbenefits.com",
    },
    {
      name: "Meals on Wheels Houston",
      category: "Food Assistance",
      description: "Home-delivered meals for homebound seniors and disabled adults. Also serves congregate meals at 40+ community sites.",
      phone: "713-522-6241",
      address: "3221 Pasadena Blvd, Pasadena, TX 77503",
      hours: "Mon-Fri 8am-2pm delivery",
      eligibility: "Homebound adults 60+ or disabled",
      services: "Home-delivered meals, Congregate meals, Wellness checks, Pet food program",
      languages: "English, Spanish",
      lastVerified: "2026-04-01",
      url: "https://www.mealsonwheelsgh.org",
    },
    {
      name: "Target Hunger",
      category: "Food Assistance",
      description: "Community-based food distribution and urban farming program serving Houston's Fifth Ward, Kashmere Gardens, and other underserved neighborhoods.",
      phone: "713-226-4944",
      address: "1102 Telephone Rd, Houston, TX 77023",
      hours: "Mon-Fri 8am-4pm; Distribution days vary",
      eligibility: "Residents of underserved Houston neighborhoods — no ID required for emergency food",
      services: "Food distribution, Urban farming, Nutrition education, Community garden plots",
      languages: "English, Spanish",
      lastVerified: "2026-03-10",
      url: "https://www.targethunger.org",
    },

    // ── Mental Health (4) ──
    {
      name: "The Harris Center for Mental Health",
      category: "Mental Health",
      description: "Outpatient therapy, psychiatric services, crisis stabilization, and substance use treatment. Sliding scale fees based on income.",
      phone: "713-970-7000",
      address: "9401 Southwest Freeway, Houston, TX 77074",
      hours: "Mon-Fri 8am-5pm, Crisis 24/7",
      eligibility: "Harris County residents — all incomes accepted",
      services: "Outpatient therapy, Psychiatric services, Crisis stabilization, Substance use treatment, 24/7 crisis line",
      languages: "English, Spanish",
      lastVerified: "2026-05-01",
      url: "https://www.theharriscenter.org",
    },
    {
      name: "Catholic Charities Counseling",
      category: "Mental Health",
      description: "Individual, family, and group counseling. Specialties include PTSD, depression, anxiety, and immigrant/refugee trauma.",
      phone: "713-526-4611",
      address: "2900 Louisiana St, Houston, TX 77006",
      hours: "Mon-Fri 9am-6pm",
      eligibility: "All ages — sliding scale fees",
      services: "Individual therapy, Family counseling, Group therapy, PTSD treatment, Refugee trauma support",
      languages: "English, Spanish",
      lastVerified: "2026-04-01",
      url: "https://www.catholiccharities.org",
    },
    {
      name: "Memorial Hermann Behavioral Health",
      category: "Mental Health",
      description: "Inpatient and outpatient psychiatric care, substance use treatment, and 24/7 crisis intervention services.",
      phone: "713-222-2273",
      address: "1200 Jamail St, Houston, TX 77002",
      hours: "24/7 crisis line",
      eligibility: "All ages — insurance or self-pay",
      services: "Inpatient psychiatric care, Outpatient treatment, Substance use treatment, Crisis intervention, 24/7 crisis line",
      languages: "English, Spanish",
      lastVerified: "2026-05-01",
      url: "https://www.memorialhermann.org",
    },
    {
      name: "NAMI Greater Houston — Support Groups",
      category: "Mental Health",
      description: "Free peer-led support groups, family education programs, and mental health advocacy for individuals and families affected by mental illness in the Houston area.",
      phone: "713-970-4447",
      address: "3801 Kirby Dr, Ste 440, Houston, TX 77098",
      hours: "Office: Mon-Fri 9am-5pm; Groups: evenings and weekends",
      eligibility: "Free and open to anyone affected by mental health conditions",
      services: "Peer support groups, Family-to-Family education, Mental health presentations, HelpLine",
      languages: "English, Spanish",
      lastVerified: "2026-02-20",
      url: "https://www.namigreaterhouston.org",
    },

    // ── Employment Services (4) ──
    {
      name: "Workforce Solutions Gulf Coast",
      category: "Employment Services",
      description: "Free job search assistance, resume workshops, career training, and unemployment benefits guidance. 8 career offices across Houston.",
      phone: "713-334-5600",
      address: "1200 Travis St, Ste 600, Houston, TX 77002",
      hours: "Mon-Fri 8am-5pm",
      eligibility: "All job seekers — no income requirements",
      services: "Job search assistance, Resume workshops, Career training, Unemployment benefits guidance, Job fairs",
      languages: "English, Spanish",
      lastVerified: "2026-05-01",
      url: "https://www.wrksolutions.com",
    },
    {
      name: "Goodwill Industries of Houston",
      category: "Employment Services",
      description: "Job training programs, career coaching, and direct job placement. Programs for veterans, ex-offenders, and people with disabilities.",
      phone: "713-692-6221",
      address: "1140 W Loop North, Houston, TX 77055",
      hours: "Mon-Fri 8am-5pm",
      eligibility: "Anyone facing employment barriers",
      services: "Career coaching, Job readiness training, Computer literacy, Resume help, Employer connections",
      languages: "English, Spanish",
      lastVerified: "2026-04-01",
      url: "https://www.goodwillhouston.org",
    },
    {
      name: "SER Jobs for Progress",
      category: "Employment Services",
      description: "Workforce development organization providing industry-specific training in construction, healthcare, and technology. Includes certifications and direct employer partnerships.",
      phone: "713-773-6000",
      address: "4610 E Sam Houston Pkwy S, Houston, TX 77048",
      hours: "Mon-Fri 8am-5pm",
      eligibility: "Adults 18+ seeking career training — priority for low-income and displaced workers",
      services: "Industry certifications, Construction training, Healthcare training, IT training, Job placement",
      languages: "English, Spanish",
      lastVerified: "2026-03-01",
      url: "https://www.serhouston.org",
    },
    {
      name: "Houston Community College Workforce Programs",
      category: "Employment Services",
      description: "Affordable continuing education and workforce certificate programs in high-demand fields. Financial aid and scholarships available for qualifying students.",
      phone: "713-718-2000",
      address: "3100 Main St, Houston, TX 77002",
      hours: "Mon-Fri 8am-6pm; Some Saturday classes",
      eligibility: "Open enrollment — financial aid available for low-income students",
      services: "Workforce certificates, Continuing education, Financial aid, Career counseling, Apprenticeships",
      languages: "English, Spanish, Vietnamese",
      lastVerified: "2026-04-15",
      url: "https://www.hccs.edu",
    },

    // ── Legal Aid (4) ──
    {
      name: "Houston Volunteer Lawyers",
      category: "Legal Aid",
      description: "Free civil legal representation for low-income Houstonians. Covers family law, housing, immigration, and consumer issues.",
      phone: "713-228-0735",
      address: "1111 Travis St, Ste 1400, Houston, TX 77002",
      hours: "Mon-Fri 9am-5pm",
      eligibility: "Income at or below 200% federal poverty level",
      services: "Family law, Housing law, Immigration assistance, Consumer protection, Estate planning",
      languages: "English, Spanish",
      lastVerified: "2026-05-01",
      url: "https://www.hvl.org",
    },
    {
      name: "South Texas College of Law Clinic",
      category: "Legal Aid",
      description: "Free immigration law clinic, family law clinic, and consumer protection. Law students supervised by licensed attorneys.",
      phone: "713-646-1760",
      address: "1303 San Jacinto St, Houston, TX 77002",
      hours: "Mon-Fri 9am-4pm by appointment",
      eligibility: "Low-income Harris County residents",
      services: "Immigration law, Family law, Consumer protection, Expungement assistance",
      languages: "English, Spanish",
      lastVerified: "2026-04-01",
      url: "https://www.stcl.edu",
    },
    {
      name: "Texas Legal Services Center",
      category: "Legal Aid",
      description: "Statewide nonprofit providing free legal assistance on civil matters through hotlines and direct representation, with expertise in housing, healthcare, and disaster recovery.",
      phone: "1-800-622-2520",
      address: "1414 W Ben White Blvd, Ste 200, Austin, TX 78704",
      hours: "Hotline: Mon-Fri 8:30am-4:30pm",
      eligibility: "Low-income Texans — varies by program",
      services: "Legal hotline, Housing advocacy, Healthcare access, Disaster legal aid, Veterans legal help",
      languages: "English, Spanish",
      lastVerified: "2026-02-10",
      url: "https://www.tlsc.org",
    },
    {
      name: "American Gateways — Immigration Legal Services",
      category: "Legal Aid",
      description: "Affordable and free immigration legal services including asylum representation, DACA renewals, citizenship applications, and deportation defense.",
      phone: "512-478-0546",
      address: "2200 E MLK Jr Blvd, Austin, TX 78702 (serves Houston area)",
      hours: "Mon-Fri 9am-5pm",
      eligibility: "Low-income immigrants; fees on a sliding scale",
      services: "Asylum representation, DACA renewals, Citizenship applications, Deportation defense, Know Your Rights workshops",
      languages: "English, Spanish, French, Arabic",
      lastVerified: "2025-12-30",
      url: "https://www.americangateways.org",
    },

    // ── Healthcare (4) ──
    {
      name: "Harris Health System (Ben Taub)",
      category: "Healthcare",
      description: "Full-service public hospital and community health centers. Primary care, specialty care, pharmacy, and emergency services on sliding scale.",
      phone: "713-873-2000",
      address: "1504 Taub Loop, Houston, TX 77030",
      hours: "24/7 emergency; clinics Mon-Fri 8am-5pm",
      eligibility: "Harris County residents — sliding scale based on income",
      services: "Primary care, Specialty care, Pharmacy, Emergency services, Dental care",
      languages: "English, Spanish, Vietnamese",
      lastVerified: "2026-05-01",
      url: "https://www.harrishealth.org",
    },
    {
      name: "Legacy Community Health",
      category: "Healthcare",
      description: "Federally qualified health center. Primary care, dental, behavioral health, and pharmacy. Accepts uninsured patients.",
      phone: "832-548-5300",
      address: "1415 California St, Houston, TX 77006",
      hours: "Mon-Fri 8am-7pm, Sat 9am-1pm",
      eligibility: "All ages — sliding scale for uninsured",
      services: "Primary care, Dental, Behavioral health, Pharmacy, Women's health, Pediatrics",
      languages: "English, Spanish",
      lastVerified: "2026-05-01",
      url: "https://www.legacycommunityhealth.org",
    },
    {
      name: "Medicaid — Texas Health and Human Services",
      category: "Healthcare",
      description: "State and federal health insurance program for low-income individuals and families, pregnant women, children, seniors, and people with disabilities.",
      phone: "877-541-7905",
      address: "Apply online at YourTexasBenefits.com",
      hours: "Apply online 24/7; Office: Mon-Fri 8am-5pm",
      eligibility: "Based on income, family size, age, disability, and pregnancy status",
      services: "Doctor visits, Hospital care, Prescriptions, Preventive care, Mental health services, Long-term care",
      languages: "English, Spanish, Multiple languages",
      lastVerified: "2026-03-01",
      url: "https://www.yourtexasbenefits.com",
    },
    {
      name: "Patient Assistance Programs — Prescription Help",
      category: "Healthcare",
      description: "Pharmaceutical company programs providing free or low-cost prescription medications to uninsured and underinsured individuals. Many major medications available.",
      phone: "1-888-477-2669",
      address: "Apply online or through healthcare provider",
      hours: "Applications processed Mon-Fri; Online 24/7",
      eligibility: "Uninsured or underinsured; income typically at or below 300% FPL; varies by program",
      services: "Free medications, Discount drug cards, Copay assistance, Medicare Part D assistance",
      languages: "English, Spanish",
      lastVerified: "2025-12-05",
      url: "https://www.pparx.org",
    },

    // ── Crisis Support (3) ──
    {
      name: "988 Suicide & Crisis Lifeline",
      category: "Crisis Support",
      description: "Free, confidential, 24/7 support for people in suicidal crisis or emotional distress. Call or text 988.",
      phone: "988",
      address: "National — available everywhere",
      hours: "24/7",
      eligibility: "Anyone in crisis — no requirements",
      services: "Crisis counseling, Emotional support, Referral to local resources, Spanish line available",
      languages: "English, Spanish, 200+ languages via interpreters",
      lastVerified: "2026-05-01",
      url: "https://988lifeline.org",
    },
    {
      name: "Crisis Text Line",
      category: "Crisis Support",
      description: "Text HOME to 741741 for free, 24/7 crisis counseling via text message. Trained crisis counselors respond within minutes.",
      phone: "Text HOME to 741741",
      address: "National — text-based service",
      hours: "24/7",
      eligibility: "Anyone in crisis — no requirements",
      services: "Text-based crisis counseling, Active listening, Safety planning, Referrals",
      languages: "English, Spanish",
      lastVerified: "2026-05-01",
      url: "https://www.crisistextline.org",
    },
    {
      name: "National Domestic Violence Hotline",
      category: "Crisis Support",
      description: "Confidential 24/7 support, safety planning, and referrals for domestic violence survivors. Multiple languages available.",
      phone: "1-800-799-7233",
      address: "National — phone and online service",
      hours: "24/7",
      eligibility: "Anyone experiencing domestic violence",
      services: "Crisis support, Safety planning, Shelter referrals, Legal advocacy, Multi-language support",
      languages: "English, Spanish, 200+ languages via interpreters",
      lastVerified: "2026-05-01",
      url: "https://www.thehotline.org",
    },

    // ── Senior Services (3) ──
    {
      name: "Harris County Area Agency on Aging",
      category: "Senior Services",
      description: "Case management, benefits counseling, transportation, meal delivery, and caregiver support for adults 60+.",
      phone: "713-794-9001",
      address: "8000 N Stanton St, Houston, TX 77037",
      hours: "Mon-Fri 8am-5pm",
      eligibility: "Adults 60+ in Harris County",
      services: "Case management, Benefits counseling, Transportation, Meal delivery, Caregiver support",
      languages: "English, Spanish",
      lastVerified: "2026-05-01",
      url: "https://www.hcaaa.org",
    },
    {
      name: "Neighborhood Centers Inc. (Baker-Ripley)",
      category: "Senior Services",
      description: "Senior centers with daily activities, congregate meals, health screenings, and social services for older adults.",
      phone: "713-667-9400",
      address: "6500 Rookin St, Houston, TX 77074",
      hours: "Mon-Fri 8am-4pm",
      eligibility: "Adults 60+ — free membership",
      services: "Daily activities, Congregate meals, Health screenings, Social services, Fitness classes",
      languages: "English, Spanish",
      lastVerified: "2026-04-01",
      url: "https://www.bakerripley.org",
    },
    {
      name: "Medicare Counseling — Benefits Checkup",
      category: "Senior Services",
      description: "Free Medicare counseling through the State Health Insurance Assistance Program (SHIP) helping seniors understand their coverage options, compare plans, and resolve billing issues.",
      phone: "1-800-252-9240",
      address: "Available statewide; local office: 1200 Travis St, Houston, TX 77002",
      hours: "Mon-Fri 8am-5pm",
      eligibility: "Medicare beneficiaries, their families, and caregivers",
      services: "Medicare plan comparison, Prescription drug coverage, Billing disputes, Enrollment assistance, Long-term care insurance",
      languages: "English, Spanish",
      lastVerified: "2026-02-12",
      url: "https://www.benefitscheckup.org",
    },

    // ── Veteran Services (4) ──
    {
      name: "Michael E. DeBakey VA Medical Center",
      category: "Veteran Services",
      description: "Full-service VA hospital providing medical care, mental health services, PTSD treatment, and specialty care for eligible veterans.",
      phone: "713-791-1414",
      address: "2002 Holcombe Blvd, Houston, TX 77030",
      hours: "24/7 emergency; clinics Mon-Fri 8am-5pm",
      eligibility: "Veterans with honorable discharge",
      services: "Medical care, Mental health services, PTSD treatment, Specialty care, Emergency services",
      languages: "English, Spanish",
      lastVerified: "2026-05-01",
      url: "https://www.houston.va.gov",
    },
    {
      name: "VA Texas Valley Coastal Bend Health Care System",
      category: "Veteran Services",
      description: "VA benefits assistance including disability claims, pension, education (GI Bill), and vocational rehabilitation for veterans.",
      phone: "1-800-827-1000",
      address: "Apply online at va.gov or visit Houston VA Regional Office",
      hours: "Mon-Fri 8am-5pm",
      eligibility: "Veterans and eligible dependents",
      services: "Disability claims, Pension benefits, GI Bill education, Vocational rehabilitation, VA benefits assistance",
      languages: "English, Spanish",
      lastVerified: "2026-05-01",
      url: "https://www.va.gov",
    },
    {
      name: "Veterans Housing Program (VASH)",
      category: "Veteran Services",
      description: "HUD-VASH program combining Section 8 housing vouchers with VA case management for homeless veterans. Priority placement available.",
      phone: "713-794-7878",
      address: "2002 Holcombe Blvd, Houston, TX 77030",
      hours: "Mon-Fri 8am-4pm",
      eligibility: "Homeless veterans with VA eligibility",
      services: "Housing vouchers, VA case management, Priority placement, Transitional support",
      languages: "English, Spanish",
      lastVerified: "2026-04-01",
      url: "https://www.va.gov/homeless/hud-vash.asp",
    },
    {
      name: "Goodwill Industries Veterans Program",
      category: "Veteran Services",
      description: "Job training, career coaching, and direct job placement specifically for veterans. Programs for transitioning service members and veterans with disabilities.",
      phone: "713-692-6221",
      address: "1140 W Loop North, Houston, TX 77055",
      hours: "Mon-Fri 8am-5pm",
      eligibility: "Veterans facing employment barriers",
      services: "Job training, Career coaching, Direct job placement, Transition assistance, Disability support",
      languages: "English, Spanish",
      lastVerified: "2026-04-01",
      url: "https://www.goodwillhouston.org",
    },

    // ═══════════════════════════════════════════════════════════
    // ── NEW YORK RESOURCES (5) ──
    // ═══════════════════════════════════════════════════════════
    {
      name: "NYC Housing Authority (NYCHA)",
      category: "Housing Assistance",
      description: "Public housing and Section 8 vouchers for low-income New Yorkers. Largest public housing authority in North America.",
      phone: "718-707-7771",
      address: "90 Church St, New York, NY 10007",
      hours: "Mon-Fri 8am-5pm",
      eligibility: "Income at or below 50% AMI",
      services: "Section 8 vouchers, Public housing, Emergency housing assistance, Tenant counseling",
      languages: "English, Spanish, Multiple languages",
      lastVerified: "2026-05-01",
      url: "https://www.nyc.gov/nycha",
    },
    {
      name: "Coalition for the Homeless",
      category: "Housing Assistance",
      description: "Emergency shelter placement, eviction prevention, and permanent housing assistance for homeless New Yorkers.",
      phone: "212-776-2000",
      address: "129 W 29th St, New York, NY 10001",
      hours: "24/7 hotline",
      eligibility: "Homeless individuals and families in NYC",
      services: "Emergency shelter, Eviction prevention, Permanent housing assistance, Crisis intervention",
      languages: "English, Spanish",
      lastVerified: "2026-04-01",
      url: "https://www.coalitionforthehomeless.org",
    },
    {
      name: "Food Bank For New York City",
      category: "Food Assistance",
      description: "Largest food bank in NYC. Free meals and groceries through 1,000+ soup kitchens and food pantries across all five boroughs.",
      phone: "212-566-7855",
      address: "39 Broadway, 10th Fl, New York, NY 10006",
      hours: "Mon-Fri 9am-5pm",
      eligibility: "Anyone in need — no ID required",
      services: "Food distribution, Mobile pantry, SNAP application assistance, Nutrition programs, Prepared meals",
      languages: "English, Spanish, Multiple languages",
      lastVerified: "2026-05-01",
      url: "https://www.foodbanknyc.org",
    },
    {
      name: "NYC Well (Mental Health)",
      category: "Mental Health",
      description: "Free, confidential mental health hotline. Counselors available 24/7 in 200+ languages. Mobile crisis teams dispatched as needed.",
      phone: "888-692-9355",
      address: "Call or text 988 for immediate support",
      hours: "24/7",
      eligibility: "Anyone in NYC — no requirements",
      services: "Crisis counseling, Mobile crisis teams, Referral to ongoing treatment, Suicide prevention, Peer support",
      languages: "English, Spanish, 200+ languages via interpreters",
      lastVerified: "2026-05-01",
      url: "https://nycwell.cityofnewyork.us",
    },
    {
      name: "NYC Health + Hospitals",
      category: "Healthcare",
      description: "Public hospital system with 11 acute care hospitals and 70+ community health centers. Sliding scale for uninsured. NYC Care program.",
      phone: "844-692-4692",
      address: "125 Worth St, New York, NY 10013",
      hours: "24/7 emergency; clinics vary",
      eligibility: "All NYC residents — sliding scale based on income",
      services: "Primary care, Specialty care, Pharmacy, Emergency services, NYC Care program",
      languages: "English, Spanish, Multiple languages",
      lastVerified: "2026-05-01",
      url: "https://www.nychealthandhospitals.org",
    },

    // ═══════════════════════════════════════════════════════════
    // ── LOS ANGELES RESOURCES (5) ──
    // ═══════════════════════════════════════════════════════════
    {
      name: "LA Housing Authority (HACLA)",
      category: "Housing Assistance",
      description: "Section 8 housing choice vouchers and public housing for low-income LA residents. Multiple housing developments across the city.",
      phone: "213-252-2500",
      address: "2600 Wilshire Blvd, Los Angeles, CA 90057",
      hours: "Mon-Fri 8am-5pm",
      eligibility: "Income at or below 50% AMI",
      services: "Section 8 vouchers, Public housing, Emergency housing assistance, Tenant counseling",
      languages: "English, Spanish, Multiple languages",
      lastVerified: "2026-05-01",
      url: "https://www.hacla.org",
    },
    {
      name: "Midnight Mission",
      category: "Housing Assistance",
      description: "Emergency shelter, transitional housing, and comprehensive services for homeless individuals on Skid Row and throughout LA.",
      phone: "213-624-9258",
      address: "601 S San Pedro St, Los Angeles, CA 90014",
      hours: "24/7 intake",
      eligibility: "Homeless individuals and families",
      services: "Emergency shelter, Transitional housing, Meals, Case management, Job readiness programs",
      languages: "English, Spanish",
      lastVerified: "2026-04-01",
      url: "https://www.midnightmission.org",
    },
    {
      name: "Los Angeles Regional Food Bank",
      category: "Food Assistance",
      description: "Distributes food to 900+ partner agencies across LA County. Mobile pantry program serves underserved communities directly.",
      phone: "323-234-3030",
      address: "1734 E 41st St, Los Angeles, CA 90058",
      hours: "Mon-Fri 8am-4pm",
      eligibility: "Anyone in need — no ID required",
      services: "Food distribution, Mobile pantry, SNAP application assistance, Nutrition programs",
      languages: "English, Spanish",
      lastVerified: "2026-05-01",
      url: "https://www.lafoodbank.org",
    },
    {
      name: "LA County Department of Mental Health",
      category: "Mental Health",
      description: "Outpatient therapy, crisis intervention, and psychiatric services. Largest public mental health department in the US.",
      phone: "800-854-7771",
      address: "550 S Vermont Ave, Los Angeles, CA 90020",
      hours: "24/7 Access Hotline",
      eligibility: "LA County residents — sliding scale",
      services: "Outpatient therapy, Crisis intervention, Psychiatric services, Substance use treatment, 24/7 hotline",
      languages: "English, Spanish, Multiple languages",
      lastVerified: "2026-05-01",
      url: "https://dmh.lacounty.gov",
    },
    {
      name: "Rancho Los Amigos National Rehabilitation Center",
      category: "Healthcare",
      description: "Public rehabilitation hospital and community health center. Primary care, specialty care, and emergency services on sliding scale.",
      phone: "562-401-7100",
      address: "7601 E Imperial Hwy, Downey, CA 90242",
      hours: "Mon-Fri 8am-5pm; ER 24/7",
      eligibility: "LA County residents — sliding scale",
      services: "Primary care, Specialty care, Rehabilitation, Emergency services, Pharmacy",
      languages: "English, Spanish",
      lastVerified: "2026-05-01",
      url: "https://dhs.lacounty.gov",
    },

    // ═══════════════════════════════════════════════════════════
    // ── CHICAGO RESOURCES (5) ──
    // ═══════════════════════════════════════════════════════════
    {
      name: "Chicago Housing Authority (CHA)",
      category: "Housing Assistance",
      description: "Public housing and Section 8 vouchers for low-income Chicago residents. Manages 21,000+ public housing units citywide.",
      phone: "312-742-8500",
      address: "60 E Van Buren St, Chicago, IL 60605",
      hours: "Mon-Fri 8:30am-5pm",
      eligibility: "Income at or below 50% AMI",
      services: "Section 8 vouchers, Public housing, Emergency housing assistance, Tenant counseling",
      languages: "English, Spanish, Multiple languages",
      lastVerified: "2026-05-01",
      url: "https://www.thecha.org",
    },
    {
      name: "Pacific Garden Mission",
      category: "Housing Assistance",
      description: "Chicago's largest homeless shelter. Emergency shelter, transitional housing, and comprehensive rehabilitation programs.",
      phone: "312-922-1462",
      address: "1458 S Canal St, Chicago, IL 60607",
      hours: "24/7 intake",
      eligibility: "Homeless individuals and families",
      services: "Emergency shelter, Transitional housing, Meals, Case management, Rehabilitation programs",
      languages: "English, Spanish",
      lastVerified: "2026-04-01",
      url: "https://www.pgm.org",
    },
    {
      name: "Greater Chicago Food Depository",
      category: "Food Assistance",
      description: "Largest food bank in Chicagoland. Distributes food through 700+ pantries, soup kitchens, and shelters across Cook County.",
      phone: "773-247-3663",
      address: "4100 W Ann Lurie Pl, Chicago, IL 60632",
      hours: "Mon-Fri 8am-5pm",
      eligibility: "Anyone in need — no ID required",
      services: "Food distribution, Mobile pantry, SNAP application assistance, Nutrition programs, Prepared meals",
      languages: "English, Spanish",
      lastVerified: "2026-05-01",
      url: "https://www.chicagosfoodbank.org",
    },
    {
      name: "NAMI Chicago",
      category: "Mental Health",
      description: "Free mental health helpline, support groups, and crisis intervention. Connects callers to counseling and treatment resources.",
      phone: "833-626-4244",
      address: "Helpline — call or text",
      hours: "Mon-Fri 9am-8pm, Sat-Sun 9am-5pm",
      eligibility: "Anyone in Chicago — no requirements",
      services: "Helpline, Support groups, Crisis intervention, Counseling referrals, Education programs",
      languages: "English, Spanish",
      lastVerified: "2026-05-01",
      url: "https://www.namichicago.org",
    },
    {
      name: "Cook County Health (Stroger Hospital)",
      category: "Healthcare",
      description: "Public hospital system with two hospitals and 16 community health centers. Sliding scale for uninsured via CountyCare.",
      phone: "312-864-6000",
      address: "1901 W Harrison St, Chicago, IL 60612",
      hours: "24/7 emergency; clinics Mon-Fri 8am-5pm",
      eligibility: "Cook County residents — sliding scale based on income",
      services: "Primary care, Specialty care, Pharmacy, Emergency services, CountyCare enrollment",
      languages: "English, Spanish, Multiple languages",
      lastVerified: "2026-05-01",
      url: "https://cookcountyhhs.org",
    },

    // ═══════════════════════════════════════════════════════════
    // ── DALLAS RESOURCES (5) ──
    // ═══════════════════════════════════════════════════════════
    {
      name: "Dallas Housing Authority",
      category: "Housing Assistance",
      description: "Section 8 housing choice vouchers, public housing, and emergency housing assistance for low-income Dallas residents.",
      phone: "214-819-1871",
      address: "3939 N Hampton Rd, Dallas, TX 75212",
      hours: "Mon-Fri 8am-5pm",
      eligibility: "Income at or below 50% AMI",
      services: "Section 8 vouchers, Public housing, Emergency housing assistance, Tenant counseling",
      languages: "English, Spanish",
      lastVerified: "2026-05-01",
      url: "https://www.dhadal.com",
    },
    {
      name: "Salvation Army DFW",
      category: "Housing Assistance",
      description: "Emergency shelter, transitional housing, and rapid rehousing programs for individuals and families in the Dallas-Fort Worth area.",
      phone: "214-424-7200",
      address: "5302 Harry Hines Blvd, Dallas, TX 75235",
      hours: "24/7 intake",
      eligibility: "Homeless individuals and families",
      services: "Emergency shelter, Transitional housing, Rapid rehousing, Meals, Case management",
      languages: "English, Spanish",
      lastVerified: "2026-04-01",
      url: "https://www.salvationarmydfw.org",
    },
    {
      name: "North Texas Food Bank",
      category: "Food Assistance",
      description: "Distributes food through 200+ partner agencies across 13 North Texas counties. Mobile pantry and direct distribution programs.",
      phone: "214-330-1396",
      address: "3677 Mapleshade Ln, Plano, TX 75075",
      hours: "Mon-Fri 8am-5pm",
      eligibility: "Anyone in need — no ID required",
      services: "Food distribution, Mobile pantry, SNAP application assistance, Nutrition programs",
      languages: "English, Spanish",
      lastVerified: "2026-05-01",
      url: "https://www.ntfb.org",
    },
    {
      name: "Metrocare Services",
      category: "Mental Health",
      description: "Outpatient therapy, psychiatric services, and substance use treatment for Dallas County residents. Sliding scale fees available.",
      phone: "214-743-1200",
      address: "1250 Mockingbird Ln, Ste 300, Dallas, TX 75247",
      hours: "Mon-Fri 8am-5pm, Crisis 24/7",
      eligibility: "Dallas County residents — sliding scale",
      services: "Outpatient therapy, Psychiatric services, Substance use treatment, Crisis stabilization, 24/7 crisis line",
      languages: "English, Spanish",
      lastVerified: "2026-05-01",
      url: "https://www.metrocareservices.org",
    },
    {
      name: "Parkland Health",
      category: "Healthcare",
      description: "Public hospital system with primary care, specialty care, pharmacy, and emergency services. Sliding scale for uninsured via Parkland FIN.",
      phone: "214-590-8000",
      address: "5200 Harry Hines Blvd, Dallas, TX 75235",
      hours: "24/7 emergency; clinics Mon-Fri 8am-5pm",
      eligibility: "Dallas County residents — sliding scale based on income",
      services: "Primary care, Specialty care, Pharmacy, Emergency services, Parkland FIN enrollment",
      languages: "English, Spanish, Multiple languages",
      lastVerified: "2026-05-01",
      url: "https://www.parklandhealth.org",
    },

    // ═══════════════════════════════════════════════════════════
    // ── MIAMI RESOURCES (5) ──
    // ═══════════════════════════════════════════════════════════
    {
      name: "Miami-Dade Public Housing Authority",
      category: "Housing Assistance",
      description: "Section 8 housing vouchers and public housing for low-income Miami-Dade residents. Manages 10,000+ housing units countywide.",
      phone: "786-469-4100",
      address: "140 W Flagler St, Miami, FL 33130",
      hours: "Mon-Fri 8am-5pm",
      eligibility: "Income at or below 50% AMI",
      services: "Section 8 vouchers, Public housing, Emergency housing assistance, Tenant counseling",
      languages: "English, Spanish, Creole",
      lastVerified: "2026-05-01",
      url: "https://www.miamidade.gov/global/housing/home.page",
    },
    {
      name: "Camillus House",
      category: "Housing Assistance",
      description: "Emergency shelter, transitional housing, and permanent supportive housing for homeless individuals in Miami-Dade County.",
      phone: "305-374-1065",
      address: "1601 NW 7th Ct, Miami, FL 33136",
      hours: "24/7 intake",
      eligibility: "Homeless individuals and families",
      services: "Emergency shelter, Transitional housing, Permanent supportive housing, Meals, Case management",
      languages: "English, Spanish, Creole",
      lastVerified: "2026-04-01",
      url: "https://www.camillus.org",
    },
    {
      name: "Feeding South Florida",
      category: "Food Assistance",
      description: "Largest food bank in South Florida. Distributes food through 400+ partner agencies across Palm Beach, Broward, Miami-Dade, and Monroe counties.",
      phone: "954-518-1818",
      address: "2501 SW 32nd Ave, Pembroke Park, FL 33023",
      hours: "Mon-Fri 8am-4pm",
      eligibility: "Anyone in need — no ID required",
      services: "Food distribution, Mobile pantry, SNAP application assistance, Nutrition programs",
      languages: "English, Spanish, Creole",
      lastVerified: "2026-05-01",
      url: "https://www.feedingsouthflorida.org",
    },
    {
      name: "South Miami Behavioral Health",
      category: "Mental Health",
      description: "Outpatient therapy, psychiatric services, and crisis intervention for Miami-Dade residents. Multilingual counselors available.",
      phone: "305-661-3139",
      address: "6100 SW 70th Ave, Miami, FL 33143",
      hours: "Mon-Fri 8am-6pm",
      eligibility: "Miami-Dade residents — sliding scale",
      services: "Outpatient therapy, Psychiatric services, Crisis intervention, Substance use treatment, Multilingual counseling",
      languages: "English, Spanish, Creole",
      lastVerified: "2026-05-01",
      url: "https://www.southmiamibehavioral.com",
    },
    {
      name: "Jackson Health System",
      category: "Healthcare",
      description: "Public hospital system with Jackson Memorial Hospital and community health centers. Sliding scale for uninsured patients.",
      phone: "305-585-1111",
      address: "1611 NW 12th Ave, Miami, FL 33136",
      hours: "24/7 emergency; clinics Mon-Fri 8am-5pm",
      eligibility: "Miami-Dade residents — sliding scale based on income",
      services: "Primary care, Specialty care, Pharmacy, Emergency services, Jackson Financial Assistance",
      languages: "English, Spanish, Creole",
      lastVerified: "2026-05-01",
      url: "https://jacksonhealth.org",
    },
  ];

  console.log(`Creating ${resources.length} community resources...`);

  // Clear existing resources first to avoid duplicates
  await prisma.resource.deleteMany({});

  for (const resource of resources) {
    await prisma.resource.create({ data: resource });
  }

  console.log(`Created ${resources.length} community resources`);

  // ─── 4. Demo Conversations (5) ────────────────────────────────
  // Clear existing demo conversations for this user
  const existingConvs = await prisma.conversation.findMany({
    where: { userId: demoUser.id },
    select: { id: true },
  });
  if (existingConvs.length > 0) {
    await prisma.message.deleteMany({
      where: { conversationId: { in: existingConvs.map(c => c.id) } },
    });
  }
  await prisma.conversation.deleteMany({
    where: { userId: demoUser.id },
  });

  // Conversation 1: "I lost my job and can't pay rent"
  const conv1 = await prisma.conversation.create({
    data: {
      userId: demoUser.id,
      title: "Lost job and can't pay rent",
      preview: "I lost my job and can't pay rent — need help with housing, food, and employment",
      category: "Housing Assistance",
      categoryColor: "#f59e0b",
      confidence: 78,
      isCrisis: false,
      isGuest: false,
    },
  });

  await prisma.message.createMany({
    data: [
      {
        conversationId: conv1.id,
        role: "user",
        text: "I lost my job and can't pay rent. I'm worried about getting evicted and I don't know where to turn. I also have kids to feed.",
      },
      {
        conversationId: conv1.id,
        role: "ai",
        text: "I understand this is a very stressful situation. Based on what you've shared, I've identified several areas where you can get help right away:\n\n🏠 **Housing Assistance (78% confidence)** — Emergency rental assistance programs can help cover past-due rent and prevent eviction.\n🍎 **Food Assistance (85% confidence)** — SNAP and local food banks can ensure your kids don't go hungry.\n💼 **Employment Services (71% confidence)** — Workforce development centers offer job search help, resume assistance, and training programs.",
        category: "Housing Assistance",
        confidence: 78,
        isCrisis: false,
        resources: JSON.stringify([
          { title: "Catholic Charities Housing", phone: "713-526-4611", action: "Call for emergency rent & eviction help" },
          { title: "Houston Food Bank", phone: "832-369-9390", action: "Visit for emergency food assistance" },
          { title: "Workforce Solutions Gulf Coast", phone: "713-334-5600", action: "Get job search help and training" },
        ]),
        why: "Your mention of job loss and rent trouble strongly indicates housing and employment needs. With kids to feed, food assistance is the highest-priority match.",
        also: "You may also qualify for utility assistance programs and Medicaid for your children.",
        warning: null,
      },
      {
        conversationId: conv1.id,
        role: "user",
        text: "Thank you. How quickly can I get rental assistance? My landlord already gave me a notice.",
      },
      {
        conversationId: conv1.id,
        role: "ai",
        text: "Given that you already have a notice from your landlord, here's what I recommend:\n\n⚡ **Act quickly** — Call Catholic Charities Housing at **713-526-4611** as soon as possible. They can help with eviction prevention and may be able to expedite cases where eviction is imminent.\n📋 **Gather documents** — You'll need your lease, the eviction notice, proof of income loss, and ID.\n🏠 **Legal protection** — Houston Volunteer Lawyers **713-228-0735** can provide free legal help if your landlord proceeds with eviction.\n\nIn Houston, tenants have specific rights during the eviction process, and an attorney can help you understand those protections.",
        category: "Housing Assistance",
        confidence: 85,
        isCrisis: false,
        resources: JSON.stringify([
          { title: "Houston Volunteer Lawyers", phone: "713-228-0735", action: "Free legal help for eviction cases" },
          { title: "Catholic Charities Housing", phone: "713-526-4611", action: "Emergency rental & eviction prevention help" },
        ]),
        why: "With an active eviction notice, legal assistance becomes critical alongside rental help.",
        also: "You may want to also contact Star of Hope Mission for additional housing support if you need emergency shelter.",
        warning: "Eviction timelines can move quickly — please call these resources today.",
      },
    ],
  });

  // Conversation 2: "I need help with my mental health"
  const conv2 = await prisma.conversation.create({
    data: {
      userId: demoUser.id,
      title: "Mental health support needed",
      preview: "I need help with my mental health — feeling overwhelmed and anxious",
      category: "Mental Health",
      categoryColor: "#8b5cf6",
      confidence: 91,
      isCrisis: false,
      isGuest: false,
    },
  });

  await prisma.message.createMany({
    data: [
      {
        conversationId: conv2.id,
        role: "user",
        text: "I need help with my mental health. I've been feeling really overwhelmed and anxious for the past few months. I can barely get out of bed some days.",
      },
      {
        conversationId: conv2.id,
        role: "ai",
        text: "Thank you for reaching out — that takes courage. What you're describing sounds like it could be depression and anxiety, and there is help available.\n\n🧠 **Mental Health (91% confidence)** — Your description strongly matches mental health services. Here are immediate options:\n\n1. **The Harris Center for Mental Health** — 713-970-7000 — Affordable therapy on a sliding scale, 24/7 crisis line\n2. **Catholic Charities Counseling** — 713-526-4611 — Individual, family, and group counseling\n3. **NAMI Greater Houston** — 713-970-4447 — Free support groups and peer support\n\nIf you're ever in a crisis, please call **988** — it's free, confidential, and available 24/7.",
        category: "Mental Health",
        confidence: 91,
        isCrisis: false,
        resources: JSON.stringify([
          { title: "988 Suicide & Crisis Lifeline", phone: "988", action: "Call 24/7 if in crisis" },
          { title: "The Harris Center for Mental Health", phone: "713-970-7000", action: "Schedule affordable therapy" },
          { title: "Catholic Charities Counseling", phone: "713-526-4611", action: "Individual & group counseling" },
          { title: "NAMI Greater Houston", phone: "713-970-4447", action: "Free support groups" },
        ]),
        why: "Your description of feeling overwhelmed, anxious, and struggling to get out of bed are classic indicators of depression and anxiety that mental health services can address.",
        also: "If you have limited income, you may also qualify for Medicaid which covers mental health treatment.",
        warning: "If you ever feel like hurting yourself, please call 988 immediately.",
      },
    ],
  });

  // Conversation 3: "I can't afford my medication"
  const conv3 = await prisma.conversation.create({
    data: {
      userId: demoUser.id,
      title: "Can't afford medication",
      preview: "I can't afford my medication — need help with prescription costs",
      category: "Healthcare",
      categoryColor: "#ef4444",
      confidence: 68,
      isCrisis: false,
      isGuest: false,
    },
  });

  await prisma.message.createMany({
    data: [
      {
        conversationId: conv3.id,
        role: "user",
        text: "I can't afford my medication. I have diabetes and the insulin is so expensive. I don't have insurance right now.",
      },
      {
        conversationId: conv3.id,
        role: "ai",
        text: "I hear you — medication costs, especially insulin, are a serious concern. Here's what can help:\n\n💊 **Healthcare (68% confidence)** — While I'm somewhat confident this is primarily a healthcare issue, the resources below may also connect you with broader financial assistance:\n\n1. **Patient Assistance Programs** — 1-888-477-2669 — Many pharmaceutical companies offer free or low-cost insulin through these programs\n2. **Harris Health System (Ben Taub)** — 713-873-2000 — Sliding-scale clinics that can prescribe and help you access affordable medications\n3. **Legacy Community Health** — 832-548-5300 — Federally qualified health center with pharmacy services for uninsured patients\n4. **Medicaid** — 877-541-7905 — You may qualify for health insurance that covers prescriptions\n\n⚠️ **Important**: Since my confidence is only 68%, I recommend also exploring if you qualify for SNAP food benefits, as diabetes management is closely tied to nutrition.",
        category: "Healthcare",
        confidence: 68,
        isCrisis: false,
        resources: JSON.stringify([
          { title: "Patient Assistance Programs", phone: "1-888-477-2669", action: "Apply for free/low-cost medications" },
          { title: "Harris Health System (Ben Taub)", phone: "713-873-2000", action: "Sliding-scale healthcare & pharmacy" },
          { title: "Legacy Community Health", phone: "832-548-5300", action: "Primary care & pharmacy for uninsured" },
          { title: "Medicaid — Texas", phone: "877-541-7905", action: "Apply for health coverage" },
        ]),
        why: "Medication affordability is primarily a healthcare access issue, but the moderate confidence reflects that financial assistance programs and food access also play a role.",
        also: "Look into insulin manufacturer discount programs — Eli Lilly, Sanofi, and Novo Nordisk all offer capped-price insulin programs.",
        warning: "Never skip insulin doses without consulting a doctor. If you're rationing insulin, seek emergency medical care.",
      },
    ],
  });

  // Conversation 4: "I'm a veteran and need housing"
  const conv4 = await prisma.conversation.create({
    data: {
      userId: demoUser.id,
      title: "Veteran housing assistance",
      preview: "I'm a veteran and need housing — looking for veteran-specific resources",
      category: "Veteran Services",
      categoryColor: "#2563eb",
      confidence: 92,
      isCrisis: false,
      isGuest: false,
    },
  });

  await prisma.message.createMany({
    data: [
      {
        conversationId: conv4.id,
        role: "user",
        text: "I'm a veteran and need housing. I've been staying with friends but I need my own place. Are there programs specifically for veterans?",
      },
      {
        conversationId: conv4.id,
        role: "ai",
        text: "Thank you for your service. There are indeed several programs specifically designed to help veterans with housing:\n\n🎖️ **Veteran Services (92% confidence)** — Your veteran status opens up specialized programs:\n\n1. **Veterans Housing Program (VASH)** — 713-794-7878 — HUD-VASH combines Section 8 housing vouchers with VA case management for homeless veterans\n2. **Michael E. DeBakey VA Medical Center** — 713-791-1414 — Full-service VA hospital that can connect you with social work and housing resources\n3. **Houston Housing Authority** — 713-260-0600 — Veterans receive priority placement on Section 8 waiting lists\n\n🎖️ **Veterans Crisis Line**: If you're in crisis, call **988 then press 1** — dedicated line for veterans.\n\nI'd recommend starting with the VASH program at 713-794-7878 — they can connect you with a case manager who specializes in veteran housing.",
        category: "Veteran Services",
        confidence: 92,
        isCrisis: false,
        resources: JSON.stringify([
          { title: "Veterans Housing Program (VASH)", phone: "713-794-7878", action: "Veteran housing vouchers & case management" },
          { title: "Michael E. DeBakey VA Medical Center", phone: "713-791-1414", action: "VA social work & housing resources" },
          { title: "Goodwill Industries Veterans Program", phone: "713-692-6221", action: "Veteran job training & placement" },
        ]),
        why: "Your veteran status opens up specialized housing programs through the VA that are not available to the general public.",
        also: "You may also qualify for VA healthcare, disability benefits, and employment services through the Goodwill Industries Veterans Program.",
        warning: null,
      },
    ],
  });

  // Conversation 5: "My husband hits me" — Crisis: Domestic Violence
  const conv5 = await prisma.conversation.create({
    data: {
      userId: demoUser.id,
      title: "Crisis: Domestic Violence",
      preview: "I need help — domestic violence situation",
      category: "Crisis Support",
      categoryColor: "#dc2626",
      confidence: 99,
      isCrisis: true,
      isGuest: false,
    },
  });

  await prisma.message.createMany({
    data: [
      {
        conversationId: conv5.id,
        role: "user",
        text: "My husband hits me. I'm scared and I don't know what to do. I have two small children.",
      },
      {
        conversationId: conv5.id,
        role: "ai",
        text: "🚨 **Your safety is the top priority right now.**\n\nIf you are in immediate danger, please call **911**.\n\nHere are resources that can help you right now:\n\n📞 **National Domestic Violence Hotline** — 1-800-799-7233 — Available 24/7, confidential, in 200+ languages\n📞 **988 Suicide & Crisis Lifeline** — Call **988** — Free, confidential, 24/7 crisis support\n📞 **Crisis Text Line** — Text HOME to **741741** — Text-based crisis counseling 24/7\n\n**If you need to leave quickly:**\n- Pack essential documents (ID, birth certificates, medications)\n- The hotline can help you find emergency shelter in Houston\n- You do NOT need money or a plan to call — they will help you create one\n\n**Your children:** Domestic violence shelters accept children, and your kids' safety is also a priority.",
        category: "Crisis Support",
        confidence: 99,
        isCrisis: true,
        resources: JSON.stringify([
          { title: "National Domestic Violence Hotline", phone: "1-800-799-7233", action: "24/7 confidential support & shelter referrals" },
          { title: "988 Suicide & Crisis Lifeline", phone: "988", action: "Crisis support 24/7" },
          { title: "Crisis Text Line", phone: "Text HOME to 741741", action: "Text-based crisis counseling" },
        ]),
        why: "Domestic violence is a crisis situation requiring immediate safety planning and support resources.",
        also: "You may also need legal aid for protective orders and custody matters — the hotline can connect you.",
        warning: "If you feel you are in immediate physical danger, call 911. If it's not safe to make a phone call, you can text LOVEIS to 22522.",
      },
      {
        conversationId: conv5.id,
        role: "user",
        text: "I'm not in immediate danger right now but I want to leave. I don't have anywhere to go.",
      },
      {
        conversationId: conv5.id,
        role: "ai",
        text: "That's an important first step — wanting to leave and reaching out for help. Here's a plan:\n\n1. **Call the National DV Hotline** (1-800-799-7233) when it's safe to talk — they can help you create a detailed safety plan and find shelter space in Houston\n\n2. **Emergency shelter**: Star of Hope Mission has emergency shelter for women and children in Houston. Call **713-226-6552** to check availability.\n\n3. **Legal protection**: You can get a protective order through Houston Volunteer Lawyers — it's free and they'll help you through the process. Call **713-228-0735**.\n\n4. **Financial help**: Once you're in a shelter, a case manager can help you apply for housing assistance through the Houston Housing Authority, SNAP benefits, and other support.\n\n🔒 **Safety tip**: If you're looking at this on a shared device, consider clearing your browser history or using incognito mode.",
        category: "Crisis Support",
        confidence: 99,
        isCrisis: true,
        resources: JSON.stringify([
          { title: "National Domestic Violence Hotline", phone: "1-800-799-7233", action: "Safety planning & shelter" },
          { title: "Star of Hope Mission", phone: "713-226-6552", action: "Emergency shelter for you & children" },
          { title: "Houston Volunteer Lawyers", phone: "713-228-0735", action: "Free protective order help" },
          { title: "Catholic Charities Housing", phone: "713-526-4611", action: "Longer-term housing & rental assistance" },
        ]),
        why: "Continued crisis support — transitioning from immediate safety to longer-term planning.",
        also: "Catholic Charities Housing and Houston Housing Authority can help with longer-term affordable housing once you're in a safe situation.",
        warning: "Please be careful about your digital footprint — clear browser history or use incognito mode.",
      },
    ],
  });

  console.log("Created 5 demo conversations with messages");

  // ─── 5. Demo Saved Resources (3) ──────────────────────────────
  await prisma.savedResource.deleteMany({
    where: { userId: demoUser.id },
  });

  await prisma.savedResource.createMany({
    data: [
      {
        userId: demoUser.id,
        title: "Catholic Charities Housing",
        category: "Housing Assistance",
        categoryColor: "#f59e0b",
        confidence: 78,
        verifiedDate: "2026-04-01",
        action: "Call for rent & eviction help",
        detail: "713-526-4611 — Mon-Fri 8:30am-5pm",
      },
      {
        userId: demoUser.id,
        title: "Houston Food Bank",
        category: "Food Assistance",
        categoryColor: "#22c55e",
        confidence: 85,
        verifiedDate: "2026-05-01",
        action: "Visit for emergency food",
        detail: "832-369-9390 — Mon-Sat 8am-4pm",
      },
      {
        userId: demoUser.id,
        title: "National Domestic Violence Hotline",
        category: "Crisis Support",
        categoryColor: "#dc2626",
        confidence: 99,
        verifiedDate: "2026-05-01",
        action: "Call 24/7 for support",
        detail: "1-800-799-7233 — Confidential, 200+ languages",
      },
    ],
  });

  console.log("Created 3 demo saved resources");

  console.log("\n✅ Seeding complete!");
  console.log(`   User: ${demoUser.email}`);
  console.log(`   Resources: ${resources.length}`);
  console.log(`   Conversations: 5`);
  console.log(`   Saved Resources: 3`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Seed error:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
