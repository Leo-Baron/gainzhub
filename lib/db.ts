import { sql } from '@vercel/postgres';

export async function initDB() {
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

    return { success: true, message: 'Base de données initialisée avec succès' };
  } catch (error: unknown) {
    console.error('Erreur d\'initialisation de la base de données:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
    return { success: false, message: errorMessage };
  }
}

// Fonction pour récupérer un utilisateur
export async function getUser(username: string) {
  try {
    const { rows } = await sql`
      SELECT * FROM users WHERE username = ${username}
    `;
    return rows[0];
  } catch (error: unknown) {
    console.error('Erreur lors de la récupération de l\'utilisateur:', error);
    throw error instanceof Error ? error : new Error('Erreur inconnue');
  }
}