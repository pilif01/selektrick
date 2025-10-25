import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/User.js';
import { generateVerificationCode, sendVerificationEmail } from '../services/emailService.js';
import { authenticateToken, AuthRequest } from '../middleware/auth.js';

const router = express.Router();

// Register endpoint
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email și parola sunt obligatorii' });
    }

    // Check if user already exists
    const existingUser = UserModel.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email-ul este deja înregistrat' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const userId = UserModel.create(email, hashedPassword);

    // Generate and send verification code
    const code = generateVerificationCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    UserModel.createVerificationCode(userId, code, expiresAt);

    await sendVerificationEmail(email, code);

    res.status(201).json({
      message: 'Cont creat cu succes. Verifică email-ul pentru codul de verificare.',
      userId,
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Eroare la înregistrare' });
  }
});

// Verify email endpoint
router.post('/verify', async (req: Request, res: Response) => {
  try {
    const { userId, code } = req.body;

    console.log('Verification attempt:', { userId, code });

    if (!userId || !code) {
      return res.status(400).json({ error: 'UserId și codul sunt obligatorii' });
    }

    const verificationCode = UserModel.getVerificationCode(userId, code);
    console.log('Verification code from DB:', verificationCode);

    if (!verificationCode) {
      return res.status(400).json({ error: 'Cod invalid sau expirat' });
    }

    // Verify user
    UserModel.verifyUser(userId);
    UserModel.deleteVerificationCode(userId);

    console.log('User verified successfully:', userId);

    res.json({ message: 'Email verificat cu succes' });
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ error: 'Eroare la verificare' });
  }
});

// Login endpoint
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email și parola sunt obligatorii' });
    }

    const user = UserModel.findByEmail(email);

    if (!user) {
      return res.status(401).json({ error: 'Email sau parolă incorectă' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Email sau parolă incorectă' });
    }

    if (!user.is_verified) {
      // Generate a new verification code if needed
      const code = generateVerificationCode();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
      UserModel.createVerificationCode(user.id, code, expiresAt);
      await sendVerificationEmail(user.email, code);
      
      return res.status(403).json({ 
        error: 'Email-ul nu este verificat',
        needsVerification: true,
        userId: user.id,
        message: 'Cod de verificare trimis pe email'
      });
    }

    // Update last login timestamp
    UserModel.updateLastLogin(user.id);

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    });

    res.json({
      message: 'Autentificare reușită',
      token,
      user: {
        id: user.id,
        email: user.email,
        phone_number: user.phone_number,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Eroare la autentificare' });
  }
});

// Resend verification code
router.post('/resend-code', async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'UserId este obligatoriu' });
    }

    const user = UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Utilizator nu a fost găsit' });
    }

    if (user.is_verified) {
      return res.status(400).json({ error: 'Email-ul este deja verificat' });
    }

    const code = generateVerificationCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    UserModel.createVerificationCode(userId, code, expiresAt);

    await sendVerificationEmail(user.email, code);

    res.json({ message: 'Cod de verificare retrimis' });
  } catch (error) {
    console.error('Resend code error:', error);
    res.status(500).json({ error: 'Eroare la retrimite cod' });
  }
});

// Get current user
router.get('/me', authenticateToken, (req: AuthRequest, res: Response) => {
  try {
    const user = UserModel.findById(req.userId!);

    if (!user) {
      return res.status(404).json({ error: 'Utilizator nu a fost găsit' });
    }

    res.json({
      id: user.id,
      email: user.email,
      phone_number: user.phone_number,
      is_verified: user.is_verified,
      role: user.role,
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Eroare la obținerea datelor utilizatorului' });
  }
});

// Update phone number
router.post('/update-phone', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ error: 'Numărul de telefon este obligatoriu' });
    }

    // Validate phone number format (Romanian)
    const phoneRegex = /^(\+40|0040|0)?[7]\d{8}$/;
    if (!phoneRegex.test(phoneNumber.replace(/\s/g, ''))) {
      return res.status(400).json({ error: 'Număr de telefon invalid' });
    }

    // Update user phone number
    UserModel.updatePhoneNumber(req.userId!, phoneNumber);

    res.json({ 
      message: 'Număr de telefon actualizat cu succes',
      phone_number: phoneNumber
    });
  } catch (error) {
    console.error('Update phone error:', error);
    res.status(500).json({ error: 'Eroare la actualizarea numărului de telefon' });
  }
});

export default router;
