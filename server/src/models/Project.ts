import { db } from '../db/database.js';

export interface Project {
  id: number;
  user_id: number;
  name: string;
  type: string;
  data: string; // JSON string
  created_at: string;
  updated_at: string;
}

export interface ProjectWithUser extends Project {
  user_email: string;
}

export class ProjectModel {
  static create(userId: number, name: string, type: string, data: object): number {
    const stmt = db.prepare(
      'INSERT INTO projects (user_id, name, type, data) VALUES (?, ?, ?, ?)'
    );
    const result = stmt.run(userId, name, type, JSON.stringify(data));
    return result.lastInsertRowid as number;
  }

  static findById(id: number): Project | undefined {
    const stmt = db.prepare('SELECT * FROM projects WHERE id = ?');
    return stmt.get(id) as Project | undefined;
  }

  static findByUserId(userId: number): Project[] {
    const stmt = db.prepare('SELECT * FROM projects WHERE user_id = ? ORDER BY updated_at DESC');
    return stmt.all(userId) as Project[];
  }

  static update(id: number, name: string, type: string, data: object): void {
    const stmt = db.prepare(
      'UPDATE projects SET name = ?, type = ?, data = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
    );
    stmt.run(name, type, JSON.stringify(data), id);
  }

  static upsert(userId: number, projectId: number | null, name: string, type: string, data: object): number {
    if (projectId) {
      // Check if project belongs to user
      const existingProject = this.findById(projectId);
      if (existingProject && existingProject.user_id === userId) {
        this.update(projectId, name, type, data);
        return projectId;
      }
    }
    // Create new project
    return this.create(userId, name, type, data);
  }

  static delete(id: number, userId: number): boolean {
    const stmt = db.prepare('DELETE FROM projects WHERE id = ? AND user_id = ?');
    const result = stmt.run(id, userId);
    return result.changes > 0;
  }

  static getAll(): ProjectWithUser[] {
    const stmt = db.prepare(`
      SELECT
        projects.*,
        users.email as user_email
      FROM projects
      JOIN users ON projects.user_id = users.id
      ORDER BY projects.updated_at DESC
    `);
    return stmt.all() as ProjectWithUser[];
  }

  static countByUserId(userId: number): number {
    const stmt = db.prepare('SELECT COUNT(*) as count FROM projects WHERE user_id = ?');
    const result = stmt.get(userId) as { count: number };
    return result.count;
  }
}
