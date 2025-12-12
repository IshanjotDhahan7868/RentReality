# RentReality – Product Brief (V1)

## 1. One-liner

We solve housing affordability confusion for young renters and first-time buyers in Canada by turning complex housing/economic data into clear, personal answers about what they can actually afford.

## 2. Problem

- Young Canadians have **no idea** if their rent is reasonable for their income.
- First-time buyers don’t know **how far** they are from realistically owning something.
- Existing tools are either:
  - Too generic (“30% rule” with no local data), or
  - Overly technical charts with no plain-language explanations.

This creates anxiety, bad decisions, and people feeling lost in the housing crisis.

## 3. Target Users (V1)

**Primary:**
- Young renters (20–35) in Canada
- First-time buyers in Canada

**Secondary (future versions):**
- Journalists & housing bloggers
- Policy people and housing advocates
- Financial advisors & mortgage brokers

## 4. Core Value Proposition

RentReality answers two questions fast:

1. “Is my current or planned rent actually affordable for me in my city?”
2. “How far am I from realistically buying something – and what would it look like?”

We do this by:
- Combining real data (CMHC, StatCan, BoC, etc.)
- Computing rent-to-income, affordability scores, and timelines
- Explaining everything in plain language, with AI-generated insights

## 5. V1 Scope (Must-Haves)

1. **Affordability Check (Home page)**
   - Inputs: city, monthly income, rent, household size (optional extra fields).
   - Outputs: rent-to-income ratio, comparison vs local median, simple “green/yellow/red” affordability zone.
   - AI explanation of the result in plain language.

2. **“Can I Buy?” Tool**
   - Inputs: city, income, savings, monthly savings, target home price (or typical starter home).
   - Outputs: years to 20% down, rough monthly mortgage estimate, basic rent vs buy comparison.
   - AI explanation of the scenario.

3. **City & Data Explorer**
   - Pick cities + metrics (e.g. rent, income, rent-to-income).
   - See trends over time (line chart) and a table.
   - AI “Explain this view” button that summarizes patterns.

4. **Basic Learn & Methodology Pages**
   - What is rent-to-income?
   - Why affordability matters.
   - Where our data comes from.
   - Clear statement: “This is educational, not financial advice.”

## 6. Out of Scope for V1

- User accounts / login.
- Saving scenarios or watchlists.
- Real-time scraping of rental listings.
- Super granular neighborhood-level analysis.
- Mobile app (native). V1 is web-only.

## 7. Success Criteria (V1)

- A new user can:
  - Run an affordability check in under 60 seconds and understand the result.
  - Run a basic “Can I Buy?” scenario and understand roughly how far they are.
  - Compare at least 3–5 Canadian cities in the Explorer and get a meaningful AI explanation.
- You feel confident demoing this to:
  - A friend renting in GTA,
  - A random person interested in housing,
  - A potential collaborator or advisor.

## 8. Tech Stack (V1)

- **Frontend:** Next.js 14 (App Router), TypeScript, TailwindCSS
- **Backend:** Next.js API routes (or a small Node backend) + Postgres
- **Database:** Postgres (Supabase or Railway)
- **Data ingestion:** Python scripts to load CSVs (CMHC, StatCan, etc.) into Postgres
- **AI:** OpenAI API for explanations and reports
- **Hosting:** Vercel for frontend/API, DB hosted via Supabase/Railway

## 9. Rough Timeline

- Week 1: Project setup, DB schema, mock data, Affordability Check flow.
- Week 2: Explorer page + ingestion of real rent/income data for a few cities.
- Week 3: AI explanation layer + “Can I Buy?” tool.
- Week 4: Polish, add more cities, methodology page, first “State of Renting” report, launch V1.
