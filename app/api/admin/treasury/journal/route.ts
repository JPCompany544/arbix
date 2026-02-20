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
      entries: [],
      total: 0,
      page: 1,
      size: 20
    };

    return NextResponse.json(result);
  } catch (e) {
    console.error('journal error', e);
    return NextResponse.json({ error: 'Failed to fetch journal' }, { status: 500 });
  }
}
