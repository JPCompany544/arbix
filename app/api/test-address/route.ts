import { NextResponse } from "next/server";
import { generateAddress } from "@/lib/wallet/engine";

export async function GET() {
  try {
    const userId = "cmli10j8e0000dj4g2apwdky6";

    const address = await generateAddress(userId, "ETH");

    return NextResponse.json({
      success: true,
      address
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    });
  }
}
