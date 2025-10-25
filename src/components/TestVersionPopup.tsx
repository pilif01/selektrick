import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface TestVersionPopupProps {
  onClose: () => void;
}

export const TestVersionPopup = ({ onClose }: TestVersionPopupProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show popup after a short delay for better UX
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Close after animation completes
    setTimeout(onClose, 300);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              duration: 0.4 
            }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-md mx-4 p-6 border border-gray-200"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1"
            >
              <X size={20} />
            </button>

            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="bg-yellow-100 p-3 rounded-full">
                <AlertTriangle className="text-yellow-600" size={32} />
              </div>
            </div>

            {/* Content */}
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Versiune de Test
              </h3>
              
              <div className="space-y-3 text-gray-700">
                <p className="text-sm leading-relaxed">
                  <strong>Atentie:</strong> Aceasta este o versiune de test a configuratorului.
                </p>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm font-medium text-yellow-800 mb-2">
                    ⚠️ Preturile si produsele sunt fictive
                  </p>
                  <p className="text-xs text-yellow-700">
                    Toate preturile, produsele si calculele din aceasta versiune sunt doar pentru demonstrație.
                  </p>
                </div>

                <p className="text-xs text-gray-600">
                  Pentru informatii reale despre preturi si produse, va rugam sa ne contactati.
                </p>
              </div>

              {/* Action button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleClose}
                className="mt-6 w-full bg-selectrik-blue text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                Am înțeles, continui
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
