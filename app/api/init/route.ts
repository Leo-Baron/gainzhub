import { initDB } from '@/lib/db';
import { NextResponse } from 'next/server';
import type { ApiError } from '@/types/error';

export async function GET() {
  try {
    const result = await initDB();
    return NextResponse.json(result);
  } catch (error) {
    const apiError = error as ApiError;
    console.error('Error in /api/init:', apiError);
    return NextResponse.json(
      { 
        success: false, 
        message: apiError.message || 'Une erreur est survenue'
      },
      { status: 500 }
    );
  }
}