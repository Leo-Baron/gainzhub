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

    return { success: true, message: 'Database initialized successfully' };
  } catch (error) {
    console.error('Database initialization error:', error);
    return { success: false, message: error.message };
  }
}

// Fonction pour récupérer un utilisateur
export async function getUser(username: string) {
  try {
    const { rows } = await sql`
      SELECT * FROM users WHERE username = ${username}
    `;
    return rows[0];
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
}