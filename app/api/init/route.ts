import { initDB } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await initDB();
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error in /api/init:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error?.message || 'Une erreur est survenue'
      },
      { status: 500 }
    );
  }
}