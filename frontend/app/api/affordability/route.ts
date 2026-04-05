import { NextResponse } from "next/server";
import { query } from "@/lib/db";

type RequestBody = {
  city: string;
  year?: number;
  monthlyIncome: number;
  monthlyRent: number;
};

function categorize(ratio: number | null) {
  if (ratio == null || !Number.isFinite(ratio)) return "unknown";
  if (ratio <= 0.3) return "comfortable";
  if (ratio <= 0.4) return "stretched";
  return "risky";
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as RequestBody;
    const { city, year = 2024, monthlyIncome, monthlyRent } = body;

    if (!city || !monthlyIncome || !monthlyRent) {
      return NextResponse.json(
        { error: "city, monthlyIncome, and monthlyRent are required" },
        { status: 400 }
      );
    }

    if (monthlyIncome <= 0 || monthlyRent <= 0) {
      return NextResponse.json(
        { error: "Income and rent must be positive numbers." },
        { status: 400 }
      );
    }

    // 1) Find region
    const regionRes = await query<{ id: number }>(
      "SELECT id FROM regions WHERE name = $1 LIMIT 1",
      [city]
    );

    if (regionRes.rowCount === 0) {
      return NextResponse.json(
        { error: `No region found for city ${city}` },
        { status: 404 }
      );
    }
    const regionId = regionRes.rows[0].id;

    // 2) Find time period
    const periodRes = await query<{ id: number }>(
      "SELECT id FROM time_periods WHERE year = $1 AND period_type = 'annual' LIMIT 1",
      [year]
    );
    if (periodRes.rowCount === 0) {
      return NextResponse.json(
        { error: `No time period row found for year ${year}` },
        { status: 404 }
      );
    }
    const timePeriodId = periodRes.rows[0].id;

    // 3) Get metric IDs for rent_overall + median_aftertax_income
    const metricsRes = await query<{ id: number; name: string }>(
      "SELECT id, name FROM metrics WHERE name = 'rent_overall' OR name = 'median_aftertax_income'"
    );

    const rentMetric = metricsRes.rows.find((m) => m.name === "rent_overall");
    const incomeMetric = metricsRes.rows.find(
      (m) => m.name === "median_aftertax_income"
    );

    if (!rentMetric || !incomeMetric) {
      return NextResponse.json(
        { error: "Required metrics not found in database." },
        { status: 500 }
      );
    }

    // 4) Fetch the metric values for this city+year
    const valuesRes = await query<{
      metric_id: number;
      value: string | null;
    }>(
      "SELECT metric_id, value FROM metric_values WHERE region_id = $1 AND time_period_id = $2 AND metric_id IN ($3, $4)",
      [regionId, timePeriodId, rentMetric.id, incomeMetric.id]
    );

    let cityRentMonthly: number | null = null;
    let cityIncomeAnnual: number | null = null;

    for (const row of valuesRes.rows) {
      if (row.metric_id === rentMetric.id) {
        cityRentMonthly =
          row.value !== null ? Number.parseFloat(row.value) : null;
      } else if (row.metric_id === incomeMetric.id) {
        cityIncomeAnnual =
          row.value !== null ? Number.parseFloat(row.value) : null;
      }
    }

    if (cityRentMonthly == null || cityIncomeAnnual == null) {
      return NextResponse.json(
        { error: "Missing rent or income data for that city/year." },
        { status: 404 }
      );
    }

    // 5) Compute rent-to-income ratios
    const cityRentToIncome =
      cityIncomeAnnual > 0 ? (cityRentMonthly * 12) / cityIncomeAnnual : null;
    const userRentToIncome =
      monthlyIncome > 0 ? monthlyRent / monthlyIncome : null;

    const cityZone = categorize(cityRentToIncome);
    const userZone = categorize(userRentToIncome);

    const cityPct =
      cityRentToIncome != null
        ? Math.round(cityRentToIncome * 1000) / 10 // one decimal
        : null;
    const userPct =
      userRentToIncome != null
        ? Math.round(userRentToIncome * 1000) / 10
        : null;

    const diffPctPoints =
      cityPct != null && userPct != null ? userPct - cityPct : null;

    let relation: "higher" | "lower" | "similar" | null = null;
    if (diffPctPoints != null) {
      if (Math.abs(diffPctPoints) < 2) relation = "similar";
      else if (diffPctPoints > 0) relation = "higher";
      else relation = "lower";
    }

    return NextResponse.json({
      city,
      year,
      cityMetrics: {
        rentMonthly: cityRentMonthly,
        incomeAnnual: cityIncomeAnnual,
        rentToIncomePct: cityPct,
        zone: cityZone,
      },
      userMetrics: {
        monthlyIncome,
        monthlyRent,
        rentToIncomePct: userPct,
        zone: userZone,
      },
      comparison: {
        diffPctPoints,
        relationToMedian: relation,
      },
    });
  } catch (error: any) {
    console.error("Affordability API error", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
