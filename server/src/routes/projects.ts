import express, { Response } from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth.js';
import { ProjectModel } from '../models/Project.js';
import { UserModel } from '../models/User.js';
import { sendProjectSubmissionEmail } from '../services/emailService.js';

const router = express.Router();

// All project routes require authentication
router.use(authenticateToken);

// Get all projects for current user
router.get('/', (req: AuthRequest, res: Response) => {
  try {
    const projects = ProjectModel.findByUserId(req.userId!);

    res.json({
      projects: projects.map(p => ({
        id: p.id,
        name: p.name,
        type: p.type,
        data: JSON.parse(p.data),
        created_at: p.created_at,
        updated_at: p.updated_at,
      })),
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ error: 'Eroare la obținerea proiectelor' });
  }
});

// Get specific project
router.get('/:id', (req: AuthRequest, res: Response) => {
  try {
    const projectId = parseInt(req.params.id);

    if (isNaN(projectId)) {
      return res.status(400).json({ error: 'ID proiect invalid' });
    }

    const project = ProjectModel.findById(projectId);

    if (!project) {
      return res.status(404).json({ error: 'Proiect nu a fost găsit' });
    }

    // Check if project belongs to current user
    if (project.user_id !== req.userId) {
      return res.status(403).json({ error: 'Acces interzis' });
    }

    res.json({
      project: {
        id: project.id,
        name: project.name,
        type: project.type,
        data: JSON.parse(project.data),
        created_at: project.created_at,
        updated_at: project.updated_at,
      },
    });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ error: 'Eroare la obținerea proiectului' });
  }
});

// Create or update project (autosave endpoint)
router.post('/autosave', (req: AuthRequest, res: Response) => {
  try {
    const { projectId, name, type, data } = req.body;

    if (!name || !type || !data) {
      return res.status(400).json({ error: 'Nume, tip și date sunt obligatorii' });
    }

    // Validate type
    const validTypes = ['configurator', 'bransament', 'fotovoltaic', 'rezidential', 'other'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ error: 'Tip de proiect invalid' });
    }

    const savedProjectId = ProjectModel.upsert(
      req.userId!,
      projectId || null,
      name,
      type,
      data
    );

    const project = ProjectModel.findById(savedProjectId);

    res.json({
      message: projectId ? 'Proiect actualizat' : 'Proiect creat',
      project: {
        id: project!.id,
        name: project!.name,
        type: project!.type,
        data: JSON.parse(project!.data),
        created_at: project!.created_at,
        updated_at: project!.updated_at,
      },
    });
  } catch (error) {
    console.error('Autosave error:', error);
    res.status(500).json({ error: 'Eroare la salvarea proiectului' });
  }
});

// Create new project
router.post('/', (req: AuthRequest, res: Response) => {
  try {
    const { name, type, data } = req.body;

    if (!name || !type || !data) {
      return res.status(400).json({ error: 'Nume, tip și date sunt obligatorii' });
    }

    const validTypes = ['configurator', 'bransament', 'fotovoltaic', 'rezidential', 'other'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ error: 'Tip de proiect invalid' });
    }

    const projectId = ProjectModel.create(req.userId!, name, type, data);
    const project = ProjectModel.findById(projectId);

    res.status(201).json({
      message: 'Proiect creat cu succes',
      project: {
        id: project!.id,
        name: project!.name,
        type: project!.type,
        data: JSON.parse(project!.data),
        created_at: project!.created_at,
        updated_at: project!.updated_at,
      },
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ error: 'Eroare la crearea proiectului' });
  }
});

// Update project
router.put('/:id', (req: AuthRequest, res: Response) => {
  try {
    const projectId = parseInt(req.params.id);
    const { name, type, data } = req.body;

    if (isNaN(projectId)) {
      return res.status(400).json({ error: 'ID proiect invalid' });
    }

    if (!name || !type || !data) {
      return res.status(400).json({ error: 'Nume, tip și date sunt obligatorii' });
    }

    const project = ProjectModel.findById(projectId);

    if (!project) {
      return res.status(404).json({ error: 'Proiect nu a fost găsit' });
    }

    if (project.user_id !== req.userId) {
      return res.status(403).json({ error: 'Acces interzis' });
    }

    const validTypes = ['configurator', 'bransament', 'fotovoltaic', 'other'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ error: 'Tip de proiect invalid' });
    }

    ProjectModel.update(projectId, name, type, data);
    const updatedProject = ProjectModel.findById(projectId);

    res.json({
      message: 'Proiect actualizat cu succes',
      project: {
        id: updatedProject!.id,
        name: updatedProject!.name,
        type: updatedProject!.type,
        data: JSON.parse(updatedProject!.data),
        created_at: updatedProject!.created_at,
        updated_at: updatedProject!.updated_at,
      },
    });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ error: 'Eroare la actualizarea proiectului' });
  }
});

// Delete project
router.delete('/:id', (req: AuthRequest, res: Response) => {
  try {
    const projectId = parseInt(req.params.id);

    if (isNaN(projectId)) {
      return res.status(400).json({ error: 'ID proiect invalid' });
    }

    const deleted = ProjectModel.delete(projectId, req.userId!);

    if (!deleted) {
      return res.status(404).json({ error: 'Proiect nu a fost găsit sau acces interzis' });
    }

    res.json({ message: 'Proiect șters cu succes' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ error: 'Eroare la ștergerea proiectului' });
  }
});

// Submit project and send emails
router.post('/:id/submit', async (req: AuthRequest, res: Response) => {
  try {
    const projectId = parseInt(req.params.id);
    const { pdfBase64, projectName } = req.body;

    if (isNaN(projectId)) {
      return res.status(400).json({ error: 'ID proiect invalid' });
    }

    if (!pdfBase64) {
      return res.status(400).json({ error: 'PDF lipsește' });
    }

    const project = ProjectModel.findById(projectId);

    if (!project) {
      return res.status(404).json({ error: 'Proiect nu a fost găsit' });
    }

    // Check if project belongs to current user
    if (project.user_id !== req.userId) {
      return res.status(403).json({ error: 'Acces interzis' });
    }

    // Get user email
    const user = UserModel.findById(req.userId!);
    if (!user) {
      return res.status(404).json({ error: 'Utilizator nu a fost găsit' });
    }

    // Send emails with PDF attachment
    await sendProjectSubmissionEmail(
      user.email,
      projectName || project.name,
      project.type,
      pdfBase64
    );

    res.json({ 
      message: 'Proiect trimis cu succes! Veți primi un email de confirmare.',
      success: true 
    });
  } catch (error) {
    console.error('Submit project error:', error);
    res.status(500).json({ error: 'Eroare la trimiterea proiectului' });
  }
});

export default router;
