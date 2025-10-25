import express, { Response } from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/adminAuth.js';
import { UserModel } from '../models/User.js';
import { ProjectModel } from '../models/Project.js';

const router = express.Router();

// All admin routes require authentication and admin role
router.use(authenticateToken);
router.use(requireAdmin);

// Get dashboard statistics
router.get('/dashboard', (req: AuthRequest, res: Response) => {
  try {
    const users = UserModel.getAll();
    const allProjects = ProjectModel.getAll();

    const stats = {
      totalUsers: users.length,
      verifiedUsers: users.filter(u => u.is_verified).length,
      totalProjects: allProjects.length,
      recentUsers: users.slice(0, 5).map(u => ({
        id: u.id,
        email: u.email,
        created_at: u.created_at,
        is_verified: u.is_verified,
      })),
      recentProjects: allProjects.slice(0, 10).map(p => ({
        id: p.id,
        name: p.name,
        type: p.type,
        user_email: p.user_email,
        updated_at: p.updated_at,
      })),
    };

    res.json(stats);
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Eroare la obținerea datelor dashboard-ului' });
  }
});

// Get all users with project counts
router.get('/users', (req: AuthRequest, res: Response) => {
  try {
    const users = UserModel.getAllWithProjectCount();

    const sanitizedUsers = users.map(u => ({
      id: u.id,
      email: u.email,
      phone_number: u.phone_number,
      is_verified: u.is_verified,
      role: u.role,
      created_at: u.created_at,
      last_login: u.last_login,
      project_count: u.project_count,
    }));

    res.json({ users: sanitizedUsers });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Eroare la obținerea utilizatorilor' });
  }
});

// Get specific user with their projects
router.get('/users/:id', (req: AuthRequest, res: Response) => {
  try {
    const userId = parseInt(req.params.id);

    if (isNaN(userId)) {
      return res.status(400).json({ error: 'ID utilizator invalid' });
    }

    const user = UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Utilizator nu a fost găsit' });
    }

    const projects = ProjectModel.findByUserId(userId);

    res.json({
      user: {
        id: user.id,
        email: user.email,
        is_verified: user.is_verified,
        role: user.role,
        created_at: user.created_at,
        last_login: user.last_login,
      },
      projects: projects.map(p => ({
        id: p.id,
        name: p.name,
        type: p.type,
        created_at: p.created_at,
        updated_at: p.updated_at,
      })),
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Eroare la obținerea datelor utilizatorului' });
  }
});

// Get user's projects (admin view)
router.get('/users/:id/projects', (req: AuthRequest, res: Response) => {
  try {
    const userId = parseInt(req.params.id);

    if (isNaN(userId)) {
      return res.status(400).json({ error: 'ID utilizator invalid' });
    }

    const projects = ProjectModel.findByUserId(userId);

    res.json({
      projects: projects.map(p => ({
        id: p.id,
        name: p.name,
        type: p.type,
        data: p.data, // Return as string so client can parse it
        created_at: p.created_at,
        updated_at: p.updated_at,
      })),
    });
  } catch (error) {
    console.error('Get user projects error:', error);
    res.status(500).json({ error: 'Eroare la obținerea proiectelor' });
  }
});

// Get specific project (admin view)
router.get('/projects/:id', (req: AuthRequest, res: Response) => {
  try {
    const projectId = parseInt(req.params.id);

    if (isNaN(projectId)) {
      return res.status(400).json({ error: 'ID proiect invalid' });
    }

    const project = ProjectModel.findById(projectId);

    if (!project) {
      return res.status(404).json({ error: 'Proiect nu a fost găsit' });
    }

    const user = UserModel.findById(project.user_id);

    res.json({
      project: {
        id: project.id,
        name: project.name,
        type: project.type,
        data: JSON.parse(project.data),
        created_at: project.created_at,
        updated_at: project.updated_at,
      },
      user: user ? {
        id: user.id,
        email: user.email,
      } : null,
    });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ error: 'Eroare la obținerea proiectului' });
  }
});

export default router;
