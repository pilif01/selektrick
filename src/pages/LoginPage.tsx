import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, UserCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { PageTransition } from '../components/PageTransition';
import { API_BASE_URL } from '../config/api';

const API_URL = API_BASE_URL;

export const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [userId, setUserId] = useState<number | null>(null);
  const [showVerification, setShowVerification] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      if (isLogin) {
        // Login
        const response = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          // Check if email needs verification
          if (data.needsVerification && data.userId) {
            setUserId(data.userId);
            setShowVerification(true);
            setMessage(data.message || 'Cod de verificare trimis pe email');
            setLoading(false);
            return;
          }
          throw new Error(data.error || 'Eroare la autentificare');
        }

        login(data.token, data.user);
        navigate('/');
      } else {
        // Register
        const response = await fetch(`${API_URL}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Eroare la înregistrare');
        }

        setUserId(data.userId);
        setShowVerification(true);
        setMessage(data.message);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, code: verificationCode }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Eroare la verificare');
      }

      setMessage('Email verificat cu succes! Te poți autentifica acum.');
      setShowVerification(false);
      setIsLogin(true);
      setVerificationCode('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/resend-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Eroare la retrimite cod');
      }

      setMessage(data.message);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (showVerification) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-selectrik-dark via-gray-900 to-selectrik-dark px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl p-8 border border-selectrik-gold/20"
          >
            <div className="text-center mb-8">
              <Mail className="w-16 h-16 text-selectrik-gold mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-2">Verifică Email-ul</h2>
              <p className="text-gray-400">Introdu codul primit pe email</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            {message && (
              <div className="mb-4 p-3 bg-green-500/10 border border-green-500 rounded-lg text-green-400 text-sm">
                {message}
              </div>
            )}

            <form onSubmit={handleVerification} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Cod de verificare"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-selectrik-gold"
                  required
                  maxLength={6}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-selectrik-gold text-selectrik-dark font-bold py-3 rounded-lg hover:bg-selectrik-gold transition-colors disabled:opacity-50"
              >
                {loading ? 'Se verifică...' : 'Verifică'}
              </button>

              <button
                type="button"
                onClick={handleResendCode}
                disabled={loading}
                className="w-full text-selectrik-gold hover:text-selectrik-gold transition-colors text-sm"
              >
                Retrimite codul
              </button>
            </form>
          </motion.div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-selectrik-dark via-gray-900 to-selectrik-dark px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl p-8 border border-selectrik-gold/20"
        >
          <div className="text-center mb-8">
            <UserCircle className="w-16 h-16 text-selectrik-gold mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-2">
              {isLogin ? 'Autentificare' : 'Înregistrare'}
            </h2>
            <p className="text-gray-400">
              {isLogin ? 'Bine ai revenit!' : 'Creează un cont nou'}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          {message && (
            <div className="mb-4 p-3 bg-green-500/10 border border-green-500 rounded-lg text-green-400 text-sm">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-selectrik-gold"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                placeholder="Parolă"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-selectrik-gold"
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-selectrik-gold text-selectrik-dark font-bold py-3 rounded-lg hover:bg-selectrik-gold transition-colors disabled:opacity-50"
            >
              {loading ? 'Se procesează...' : isLogin ? 'Autentificare' : 'Înregistrare'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setMessage('');
              }}
              className="text-gray-400 hover:text-selectrik-gold transition-colors"
            >
              {isLogin ? 'Nu ai cont? Înregistrează-te' : 'Ai deja cont? Autentifică-te'}
            </button>
          </div>

          <div className="mt-4 text-center">
            <Link to="/" className="text-sm text-gray-500 hover:text-selectrik-gold transition-colors">
              ← Înapoi la pagina principală
            </Link>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
};
