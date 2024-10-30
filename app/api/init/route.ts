import { initDB } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await initDB();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}