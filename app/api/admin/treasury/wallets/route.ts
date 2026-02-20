import { NextRequest, NextResponse } from 'next/server';
import { verifyAdmin } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const admin = await verifyAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Return sample data
    const result = {
      wallets: [],
      total: 0,
      page: 1,
      pages: 0
    };

    return NextResponse.json(result);
  } catch (e) {
    console.error('wallets error', e);
    return NextResponse.json({ error: 'Failed to fetch wallets' }, { status: 500 });
  }
}
