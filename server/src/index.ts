import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeDatabase } from './db/database.js';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import projectRoutes from './routes/projects.js';
import formRoutes from './routes/forms.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175', 
    'http://localhost:5176',
    'http://localhost:5177'
  ],
  credentials: true,
}));
app.use(express.json());

// Initialize database
initializeDatabase();

// API Routes (MUST come before static files!)
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/forms', formRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Serve static files from public_html directory (CloudLinux standard)
// This comes AFTER API routes so API takes precedence
// Path from dist/index.js to /home/selectri/public_html is ../../../public_html
app.use(express.static(path.join(__dirname, '../../../public_html')));

// Handle React Router (SPA) - serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../../public_html/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Frontend served from: ${path.join(__dirname, '../../../public_html')}`);
});
