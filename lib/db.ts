import { sql } from '@vercel/postgres';
import type { ApiError } from '@/types/error';
import type { QueryResultRow } from '@vercel/postgres';

interface DbResult {
  success: boolean;
  message: string;
}

interface User extends QueryResultRow {
  id: number;
  username: string;
}

export async function initDB(): Promise<DbResult> {
  try {
    // Création de la table users
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL
      );
    `;

    // Création de la table workouts
    await sql`
      CREATE TABLE IF NOT EXISTS workouts (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        type VARCHAR(50) NOT NULL,
        date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        comment TEXT
      );
    `;

    // Création de la table exercises
    await sql`
      CREATE TABLE IF NOT EXISTS exercises (
        id SERIAL PRIMARY KEY,
        workout_id INTEGER REFERENCES workouts(id),
        name VARCHAR(255) NOT NULL
      );
    `;

    // Création de la table sets
    await sql`
      CREATE TABLE IF NOT EXISTS sets (
        id SERIAL PRIMARY KEY,
        exercise_id INTEGER REFERENCES exercises(id),
        reps INTEGER NOT NULL,
        weight DECIMAL(5,2) NOT NULL
      );
    `;

    // Insertion des utilisateurs par défaut
    await sql`
      INSERT INTO users (username)
      VALUES ('Léo'), ('Nathan')
      ON CONFLICT (username) DO NOTHING;
    `;

    return { 
      success: true, 
      message: 'Base de données initialisée avec succès' 
    };
  } catch (error) {
    const dbError = error as ApiError;
    console.error('Erreur d\'initialisation de la base de données:', dbError);
    return { 
      success: false, 
      message: dbError.message || 'Erreur inconnue lors de l\'initialisation' 
    };
  }
}

export async function getUser(username: string): Promise<User | null> {
  try {
    const result = await sql<User>`
      SELECT id, username FROM users WHERE username = ${username}
    `;
    return result.rows[0] || null;
  } catch (error) {
    const dbError = error as ApiError;
    console.error('Erreur lors de la récupération de l\'utilisateur:', dbError);
    throw new Error(dbError.message || 'Erreur lors de la récupération de l\'utilisateur');
  }
}