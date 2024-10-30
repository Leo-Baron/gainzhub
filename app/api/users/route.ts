// app/api/users/route.ts
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username } = await request.json();

    // Validation simple
    if (!username || username.length < 2) {
      return NextResponse.json(
        { error: 'Le nom doit faire au moins 2 caractères' },
        { status: 400 }
      );
    }

    // Vérification si l'utilisateur existe déjà
    const existingUser = await sql`
      SELECT username FROM users WHERE username = ${username}
    `;

    if (existingUser.rowCount > 0) {
      return NextResponse.json(
        { error: 'Cet utilisateur existe déjà' },
        { status: 400 }
      );
    }

    // Création de l'utilisateur
    const result = await sql`
      INSERT INTO users (username)
      VALUES (${username})
      RETURNING id, username
    `;

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création de l\'utilisateur' },
      { status: 500 }
    );
  }
}

export async function GET() {
    try {
      const result = await sql`
        SELECT id, username 
        FROM users 
        ORDER BY username ASC
      `;
      
      return NextResponse.json(result.rows);
    } catch (error) {
      console.error('Error fetching users:', error);
      return NextResponse.json(
        { error: 'Erreur lors de la récupération des utilisateurs' },
        { status: 500 }
      );
    }
  }