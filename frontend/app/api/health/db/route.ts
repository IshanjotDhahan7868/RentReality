// frontend/app/api/health/db/route.ts
import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic"; // avoid caching for health checks

export async function GET() {
  try {
    // Simple test query
    const result = await query<{ ok: number }>("SELECT 1 as ok");

    // Optionally check we can read from regions table too
    const regions = await query<{ name: string }>(
      "SELECT name FROM regions ORDER BY id LIMIT 5"
    );

    return NextResponse.json({
      ok: true,
      db_check: result.rows[0],
      regions: regions.rows,
    });
  } catch (err: any) {
    console.error("DB health error:", err);
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
