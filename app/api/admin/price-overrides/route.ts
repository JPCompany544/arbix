/**
 * Admin API: Token Price Overrides
 * GET    /api/admin/price-overrides        — list all overrides
 * POST   /api/admin/price-overrides        — upsert (set/update) an override
 * PATCH  /api/admin/price-overrides        — toggle active flag
 * DELETE /api/admin/price-overrides?symbol — remove an override
 */

import { NextRequest, NextResponse } from "next/server";
import {
  getAllOverrides,
  upsertOverride,
  setOverrideActive,
  deleteOverride,
} from "@/lib/pricing/price-override-store";
import { verifyAdmin } from "@/lib/auth";

// ─── GET ───────────────────────────────────────────────────────────────────────

export async function GET() {
  const admin = await verifyAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const overrides = await getAllOverrides();
    return NextResponse.json({ overrides });
  } catch (error) {
    console.error("[price-overrides GET]", error);
    return NextResponse.json({ error: "Failed to fetch overrides" }, { status: 500 });
  }
}

// ─── POST (upsert) ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const admin = await verifyAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { symbol, priceUsd, note } = body as {
      symbol?: string;
      priceUsd?: number;
      note?: string;
    };

    if (!symbol || typeof symbol !== "string" || symbol.trim() === "") {
      return NextResponse.json({ error: "symbol is required" }, { status: 400 });
    }
    if (typeof priceUsd !== "number" || !isFinite(priceUsd) || priceUsd <= 0) {
      return NextResponse.json({ error: "priceUsd must be a positive number" }, { status: 400 });
    }

    const override = await upsertOverride(symbol, priceUsd, note);
    return NextResponse.json({ override }, { status: 200 });
  } catch (error) {
    console.error("[price-overrides POST]", error);
    return NextResponse.json({ error: "Failed to save override" }, { status: 500 });
  }
}

// ─── PATCH (toggle active) ─────────────────────────────────────────────────────

export async function PATCH(req: NextRequest) {
  const admin = await verifyAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { symbol, isActive } = body as { symbol?: string; isActive?: boolean };

    if (!symbol || typeof symbol !== "string") {
      return NextResponse.json({ error: "symbol is required" }, { status: 400 });
    }
    if (typeof isActive !== "boolean") {
      return NextResponse.json({ error: "isActive must be a boolean" }, { status: 400 });
    }

    const override = await setOverrideActive(symbol, isActive);
    return NextResponse.json({ override }, { status: 200 });
  } catch (error) {
    console.error("[price-overrides PATCH]", error);
    return NextResponse.json({ error: "Failed to toggle override" }, { status: 500 });
  }
}

// ─── DELETE ────────────────────────────────────────────────────────────────────

export async function DELETE(req: NextRequest) {
  const admin = await verifyAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const symbol = searchParams.get("symbol");

    if (!symbol || symbol.trim() === "") {
      return NextResponse.json({ error: "symbol query param is required" }, { status: 400 });
    }

    await deleteOverride(symbol);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[price-overrides DELETE]", error);
    return NextResponse.json({ error: "Failed to delete override" }, { status: 500 });
  }
}
