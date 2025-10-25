import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, AlertCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  show: boolean;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', show }) => {
  const icons = {
    success: <Check size={20} />,
    error: <X size={20} />,
    info: <AlertCircle size={20} />,
  };

  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] pointer-events-none"
        >
          <div className={`${colors[type]} text-white px-6 py-3 rounded-lg shadow-2xl flex items-center gap-3 min-w-[200px] max-w-md`}>
            {icons[type]}
            <span className="font-semibold">{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
