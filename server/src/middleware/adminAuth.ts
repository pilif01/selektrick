import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.js';
import { UserModel } from '../models/User.js';

export function requireAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  if (!req.userId) {
    return res.status(401).json({ error: 'Autentificare necesară' });
  }

  const isAdmin = UserModel.isAdmin(req.userId);

  if (!isAdmin) {
    return res.status(403).json({ error: 'Acces interzis. Doar administratorii pot accesa această resursă.' });
  }

  next();
}
