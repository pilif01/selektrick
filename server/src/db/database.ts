import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '../../database.db');

export const db = new Database(dbPath);

// Initialize database tables
export function initializeDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      phone_number TEXT,
      is_verified INTEGER DEFAULT 0,
      role TEXT DEFAULT 'user',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      last_login DATETIME
    );

    CREATE TABLE IF NOT EXISTS verification_codes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      code TEXT NOT NULL,
      expires_at DATETIME NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      data TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS form_submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      form_type TEXT NOT NULL,
      data TEXT NOT NULL,
      whatsapp_sent INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    CREATE INDEX IF NOT EXISTS idx_verification_user_id ON verification_codes(user_id);
    CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
  `);

  // Create admin user if doesn't exist
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@selectrik.ro';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin123!';

  const existingAdmin = db.prepare('SELECT * FROM users WHERE email = ?').get(adminEmail);

  if (!existingAdmin) {
    const hashedPassword = bcrypt.hashSync(adminPassword, 10);
    db.prepare('INSERT INTO users (email, password, is_verified, role) VALUES (?, ?, 1, ?)').run(adminEmail, hashedPassword, 'admin');
    console.log(`Admin user created: ${adminEmail}`);
  }

  // Migration: Add phone_number column if it doesn't exist
  try {
    const tableInfo = db.prepare('PRAGMA table_info(users)').all() as Array<{ name: string }>;
    const hasPhoneNumber = tableInfo.some(col => col.name === 'phone_number');
    
    if (!hasPhoneNumber) {
      db.prepare('ALTER TABLE users ADD COLUMN phone_number TEXT').run();
      console.log('Added phone_number column to users table');
    }
  } catch (err) {
    console.log('phone_number column migration check:', err);
  }

  console.log('Database initialized successfully');
}
