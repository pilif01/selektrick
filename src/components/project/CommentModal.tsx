import { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface CommentModalProps {
  currentComment: string;
  onSave: (comment: string) => void;
  onClose: () => void;
}

export const CommentModal: React.FC<CommentModalProps> = ({
  currentComment,
  onSave,
  onClose,
}) => {
  const [comment, setComment] = useState(currentComment);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(comment);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[70] flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 max-w-md w-full border border-gray-700 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Comentariu</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="ex: Priză pentru TV, înălțime 1.5m de la podea"
            className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-selectrik-gold h-32 resize-none placeholder-gray-400"
            autoFocus
          />

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 rounded-lg transition-colors"
            >
              Anulează
            </button>
            <button
              type="submit"
              className="flex-1 bg-selectrik-gold hover:bg-selectrik-gold text-selectrik-dark font-bold py-2 rounded-lg transition-colors"
            >
              Salvează
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};
