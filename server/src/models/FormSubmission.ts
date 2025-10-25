import { db } from '../db/database.js';

export interface FormSubmission {
  id: number;
  form_type: string;
  data: string; // JSON string
  whatsapp_sent: number;
  created_at: string;
}

export class FormSubmissionModel {
  static create(formType: string, data: object): number {
    const stmt = db.prepare(
      'INSERT INTO form_submissions (form_type, data) VALUES (?, ?)'
    );
    const result = stmt.run(formType, JSON.stringify(data));
    return result.lastInsertRowid as number;
  }

  static findById(id: number): FormSubmission | undefined {
    const stmt = db.prepare('SELECT * FROM form_submissions WHERE id = ?');
    return stmt.get(id) as FormSubmission | undefined;
  }

  static getAll(limit?: number): FormSubmission[] {
    const query = limit
      ? 'SELECT * FROM form_submissions ORDER BY created_at DESC LIMIT ?'
      : 'SELECT * FROM form_submissions ORDER BY created_at DESC';

    const stmt = db.prepare(query);
    return limit ? (stmt.all(limit) as FormSubmission[]) : (stmt.all() as FormSubmission[]);
  }

  static getByType(formType: string, limit?: number): FormSubmission[] {
    const query = limit
      ? 'SELECT * FROM form_submissions WHERE form_type = ? ORDER BY created_at DESC LIMIT ?'
      : 'SELECT * FROM form_submissions WHERE form_type = ? ORDER BY created_at DESC';

    const stmt = db.prepare(query);
    return limit ? (stmt.all(formType, limit) as FormSubmission[]) : (stmt.all(formType) as FormSubmission[]);
  }

  static markWhatsAppSent(id: number): void {
    const stmt = db.prepare('UPDATE form_submissions SET whatsapp_sent = 1 WHERE id = ?');
    stmt.run(id);
  }

  static getPendingWhatsApp(): FormSubmission[] {
    const stmt = db.prepare(
      'SELECT * FROM form_submissions WHERE whatsapp_sent = 0 ORDER BY created_at ASC'
    );
    return stmt.all() as FormSubmission[];
  }

  static delete(id: number): boolean {
    const stmt = db.prepare('DELETE FROM form_submissions WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }
}
