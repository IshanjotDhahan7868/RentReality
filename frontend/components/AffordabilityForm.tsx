"use client";

import React, { useState } from "react";

type Result = {
  city: string;
  year: number;
  cityMetrics: {
    rentMonthly: number;
    incomeAnnual: number;
    rentToIncomePct: number | null;
    zone: string;
  };
  userMetrics: {
    monthlyIncome: number;
    monthlyRent: number;
    rentToIncomePct: number | null;
    zone: string;
  };
  comparison: {
    diffPctPoints: number | null;
    relationToMedian: "higher" | "lower" | "similar" | null;
  };
};

const CITIES = ["Toronto", "Calgary"]; // matches what we seeded in DB

function zoneLabel(zone: string | undefined) {
  if (!zone) return "Unknown";
  if (zone === "comfortable") return "Comfortable";
  if (zone === "stretched") return "Stretched";
  if (zone === "risky") return "Risky";
  return zone;
}

function zoneClass(zone: string | undefined) {
  if (!zone) return "bg-slate-700 text-slate-100";
  if (zone === "comfortable")
    return "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/40";
  if (zone === "stretched")
    return "bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/40";
  if (zone === "risky")
    return "bg-rose-500/15 text-rose-300 ring-1 ring-rose-500/40";
  return "bg-slate-700 text-slate-100";
}

export function AffordabilityForm() {
  const [city, setCity] = useState("Toronto");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [monthlyRent, setMonthlyRent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);

    const incomeNum = Number(monthlyIncome);
    const rentNum = Number(monthlyRent);

    if (!incomeNum || !rentNum || incomeNum <= 0 || rentNum <= 0) {
      setError("Enter positive numbers for income and rent.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/affordability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          city,
          monthlyIncome: incomeNum,
          monthlyRent: rentNum,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
      } else {
        setResult(data);
      }
    } catch (err) {
      setError("Network error. Is the dev server running?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-6"
      >
        <div>
          <h2 className="text-lg font-semibold text-slate-50">
            Affordability Check (prototype)
          </h2>
          <p className="mt-1 max-w-xl text-xs text-slate-400">
            Pick a city and enter your monthly income and rent. We&apos;ll
            compare you to the latest median renter in that city using our early
            dataset.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-1">
            <label className="block text-xs text-slate-300">City</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/70"
            >
              {CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-xs text-slate-300">
              Monthly after-tax income (CAD)
            </label>
            <input
              type="number"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/70"
              min="0"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs text-slate-300">
              Monthly rent (CAD)
            </label>
            <input
              type="number"
              value={monthlyRent}
              onChange={(e) => setMonthlyRent(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/70"
              min="0"
            />
          </div>
        </div>

        {error && (
          <div className="rounded-lg border border-rose-700/60 bg-rose-950/40 px-3 py-2 text-xs text-rose-200">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-emerald-950 shadow hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Checking..." : "Check affordability"}
        </button>
      </form>

      {/* Result */}
      {result && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-sm font-semibold text-slate-50">
                Result for {result.city} – {result.year}
              </div>
              <p className="max-w-xl text-xs text-slate-400">
                Your rent burden compared with the median renter in this city.
              </p>
            </div>
            <span
              className={
                "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium " +
                zoneClass(result.userMetrics.zone)
              }
            >
              {zoneLabel(result.userMetrics.zone)}
            </span>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-slate-950/60 p-3">
              <div className="text-[11px] uppercase tracking-wide text-slate-400">
                You
              </div>
              <div className="mt-1 text-lg font-semibold text-slate-50">
                {result.userMetrics.rentToIncomePct != null
                  ? `${result.userMetrics.rentToIncomePct.toFixed(1)}%`
                  : "—"}
              </div>
              <div className="mt-1 text-[11px] text-slate-400">
                of your income goes to rent.
              </div>
            </div>

            <div className="rounded-xl bg-slate-950/60 p-3">
              <div className="text-[11px] uppercase tracking-wide text-slate-400">
                Median renter in this city
              </div>
              <div className="mt-1 text-lg font-semibold text-slate-50">
                {result.cityMetrics.rentToIncomePct != null
                  ? `${result.cityMetrics.rentToIncomePct.toFixed(1)}%`
                  : "—"}
              </div>
              <div className="mt-1 text-[11px] text-slate-400">
                based on our latest rent &amp; income data.
              </div>
            </div>

            <div className="rounded-xl bg-slate-950/60 p-3">
              <div className="text-[11px] uppercase tracking-wide text-slate-400">
                Difference
              </div>
              <div className="mt-1 text-lg font-semibold text-slate-50">
                {result.comparison.diffPctPoints != null
                  ? `${result.comparison.diffPctPoints.toFixed(1)} pp`
                  : "—"}
              </div>
              <div className="mt-1 text-[11px] text-slate-400">
                {result.comparison.relationToMedian === "higher" &&
                  "You’re spending a higher share of your income on rent than the median renter here."}
                {result.comparison.relationToMedian === "lower" &&
                  "You’re spending a lower share of your income on rent than the median renter here."}
                {result.comparison.relationToMedian === "similar" &&
                  "You’re roughly in line with the median renter in this city."}
                {!result.comparison.relationToMedian &&
                  "We couldn’t compute a clean comparison from the data."}
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-4 text-xs text-slate-400 sm:grid-cols-2">
            <div>
              <div className="font-semibold text-slate-300">
                City baselines
              </div>
              <p className="mt-1">
                Typical overall rent:{" "}
                <span className="text-slate-100">
                  $
                  {result.cityMetrics.rentMonthly.toLocaleString("en-CA", {
                    maximumFractionDigits: 0,
                  })}
                </span>{" "}
                per month. Median after-tax income:{" "}
                <span className="text-slate-100">
                  $
                  {result.cityMetrics.incomeAnnual.toLocaleString("en-CA", {
                    maximumFractionDigits: 0,
                  })}
                </span>{" "}
                per year.
              </p>
            </div>
            <div>
              <div className="font-semibold text-slate-300">
                How to read this
              </div>
              <p className="mt-1">
                Comfortable ≲ 30% of income, Stretched 30–40%, Risky &gt; 40%.
                This is a rule-of-thumb, not financial advice — it&apos;s just a
                way to see how heavy your rent looks versus a typical renter in
                this city.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
