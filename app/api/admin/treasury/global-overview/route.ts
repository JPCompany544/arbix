/**
 * GET /api/admin/treasury/global-overview
 *
 * Returns strict financial integrity snapshot for admin dashboard.
 *
 * Response Contract:
 * - All numeric values serialized as strings (BIGINT safety)
 * - Deterministic asset ordering (alphabetical)
 * - No undefined fields
 * - Strict schema match
 */

import { NextResponse } from "next/server";
import { getGlobalOverview } from "@/src/treasury/integrity/GlobalOverviewService";

const SYNC_THRESHOLD_SECONDS = 300; // 5 minutes

export async function GET() {
  try {
    const overview = await getGlobalOverview(SYNC_THRESHOLD_SECONDS);

    return NextResponse.json(overview, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("[API ERROR] Global overview failed:", error);

    return NextResponse.json(
      {
        error: "Failed to compute global overview",
        details:
          error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
