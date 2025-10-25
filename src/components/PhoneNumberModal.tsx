import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone } from 'lucide-react';

interface PhoneNumberModalProps {
  onSubmit: (phoneNumber: string) => void;
  onClose: () => void;
}

export const PhoneNumberModal = ({ onSubmit, onClose }: PhoneNumberModalProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const validatePhoneNumber = (phone: string) => {
    // Romanian phone number validation (simple)
    // Accepts formats like: 0712345678, +40712345678, 0040712345678
    const romanianPhoneRegex = /^(\+40|0040|0)?[7]\d{8}$/;
    return romanianPhoneRegex.test(phone.replace(/\s/g, ''));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const cleanPhone = phoneNumber.replace(/\s/g, '');
    
    if (!cleanPhone) {
      setError('Te rugăm să introduci un număr de telefon');
      return;
    }
    
    if (!validatePhoneNumber(cleanPhone)) {
      setError('Număr de telefon invalid. Format acceptat: 07XXXXXXXX');
      return;
    }
    
    onSubmit(cleanPhone);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="relative bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
        >
          {/* Decorative gradient overlay */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-selectrik-gold via-yellow-400 to-selectrik-gold" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700/50 rounded-lg"
          >
            <X size={20} />
          </button>

          <div className="p-8">
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="bg-selectrik-gold/10 p-4 rounded-full">
                <Phone size={32} className="text-selectrik-gold" />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-white text-center mb-2">
              Număr de telefon
            </h2>
            
            <p className="text-gray-400 text-center mb-6">
              Pentru a salva proiectul, te rugăm să introduci numărul tău de telefon
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                  Număr de telefon
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    setError('');
                  }}
                  placeholder="07XX XXX XXX"
                  className={`w-full px-4 py-3 bg-gray-800 border ${
                    error ? 'border-red-500' : 'border-gray-700'
                  } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-selectrik-gold focus:border-transparent transition-all`}
                  autoFocus
                />
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-2"
                  >
                    {error}
                  </motion.p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <motion.button
                  type="button"
                  onClick={onClose}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
                >
                  Anulează
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-6 py-3 bg-selectrik-gold hover:bg-yellow-500 text-selectrik-dark rounded-lg font-semibold transition-colors"
                >
                  Salvează
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

