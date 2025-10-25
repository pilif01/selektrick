import { db } from '../db/database.js';

export interface User {
  id: number;
  email: string;
  password: string;
  phone_number?: string;
  is_verified: number;
  role: string;
  created_at: string;
  last_login: string | null;
}

export interface VerificationCode {
  id: number;
  user_id: number;
  code: string;
  expires_at: string;
  created_at: string;
}

export class UserModel {
  static create(email: string, hashedPassword: string): number {
    const stmt = db.prepare('INSERT INTO users (email, password) VALUES (?, ?)');
    const result = stmt.run(email, hashedPassword);
    return result.lastInsertRowid as number;
  }

  static findByEmail(email: string): User | undefined {
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    return stmt.get(email) as User | undefined;
  }

  static findById(id: number): User | undefined {
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    return stmt.get(id) as User | undefined;
  }

  static verifyUser(userId: number): void {
    const stmt = db.prepare('UPDATE users SET is_verified = 1 WHERE id = ?');
    stmt.run(userId);
  }

  static createVerificationCode(userId: number, code: string, expiresAt: Date): void {
    // Delete old codes for this user
    db.prepare('DELETE FROM verification_codes WHERE user_id = ?').run(userId);

    // Insert new code
    const stmt = db.prepare(
      'INSERT INTO verification_codes (user_id, code, expires_at) VALUES (?, ?, ?)'
    );
    stmt.run(userId, code, expiresAt.toISOString());
  }

  static getVerificationCode(userId: number, code: string): VerificationCode | undefined {
    // First check all codes for this user
    const allCodes = db.prepare('SELECT * FROM verification_codes WHERE user_id = ?').all(userId);
    console.log('All codes for user:', allCodes);
    console.log('Looking for code:', code);
    console.log('Current time:', new Date().toISOString());
    
    const stmt = db.prepare(
      "SELECT * FROM verification_codes WHERE user_id = ? AND code = ? AND expires_at > datetime('now')"
    );
    const result = stmt.get(userId, code) as VerificationCode | undefined;
    console.log('Verification code result:', result);
    return result;
  }

  static deleteVerificationCode(userId: number): void {
    const stmt = db.prepare('DELETE FROM verification_codes WHERE user_id = ?');
    stmt.run(userId);
  }

  static updateLastLogin(userId: number): void {
    const stmt = db.prepare('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?');
    stmt.run(userId);
  }

  static getAll(): User[] {
    const stmt = db.prepare('SELECT * FROM users ORDER BY created_at DESC');
    return stmt.all() as User[];
  }

  static getAllWithProjectCount(): Array<User & { project_count: number }> {
    const stmt = db.prepare(`
      SELECT
        users.*,
        COUNT(projects.id) as project_count
      FROM users
      LEFT JOIN projects ON users.id = projects.user_id
      GROUP BY users.id
      ORDER BY users.created_at DESC
    `);
    return stmt.all() as Array<User & { project_count: number }>;
  }

  static isAdmin(userId: number): boolean {
    const user = this.findById(userId);
    return user?.role === 'admin';
  }

  static updatePhoneNumber(userId: number, phoneNumber: string): void {
    const stmt = db.prepare('UPDATE users SET phone_number = ? WHERE id = ?');
    stmt.run(phoneNumber, userId);
  }
}
