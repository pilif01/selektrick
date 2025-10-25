import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, MessageCircle } from 'lucide-react';
import { useProjects } from '../../contexts/ProjectContext';
import { Room, ELECTRICAL_CATALOG } from '../../types/project';
import { ElectricalItemSelector } from './ElectricalItemSelector';
import { CommentModal } from './CommentModal';

interface RoomDetailModalProps {
  room: Room;
  onClose: () => void;
}

export const RoomDetailModal: React.FC<RoomDetailModalProps> = ({ room, onClose }) => {
  const { currentProject, updateRoomItem, deleteRoomItem } = useProjects();
  const [showItemSelector, setShowItemSelector] = useState(false);
  const [editingComment, setEditingComment] = useState<string | null>(null);

  if (!currentProject) return null;

  const getRoomTotal = () => {
    return room.items.reduce((total, item) => {
      const catalogItem = ELECTRICAL_CATALOG.find((ci) => ci.id === item.itemId);
      return total + (catalogItem?.price || 0) * item.quantity;
    }, 0);
  };

  const handleQuantityChange = (itemId: string, delta: number) => {
    const item = room.items.find((i) => i.id === itemId);
    if (!item) return;

    const newQuantity = item.quantity + delta;
    if (newQuantity < 1) return;

    updateRoomItem(currentProject.id, room.id, itemId, { quantity: newQuantity });
  };

  const handleDeleteItem = (itemId: string) => {
    if (confirm('Sigur vrei să ștergi acest obiect?')) {
      deleteRoomItem(currentProject.id, room.id, itemId);
    }
  };

  const handleUpdateComment = (itemId: string, comment: string) => {
    updateRoomItem(currentProject.id, room.id, itemId, { comment });
    setEditingComment(null);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end md:items-center justify-center"
      >
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-t-3xl md:rounded-2xl w-full md:max-w-2xl max-h-[90vh] overflow-hidden border-t md:border border-gray-700 shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700 bg-gray-800/50">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{room.icon}</span>
              <div>
                <h2 className="text-2xl font-bold text-white">{room.name}</h2>
                <p className="text-sm text-gray-400">
                  {room.items.length} {room.items.length === 1 ? 'obiect' : 'obiecte'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-2"
            >
              <X size={24} />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {room.items.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-3">📦</div>
                <p className="text-gray-400 mb-4">Niciun obiect în această cameră</p>
                <button
                  onClick={() => setShowItemSelector(true)}
                  className="bg-selectrik-gold hover:bg-selectrik-gold text-selectrik-dark px-6 py-2 rounded-lg font-semibold inline-flex items-center gap-2 transition-colors"
                >
                  <Plus size={18} />
                  Adaugă Obiect
                </button>
              </div>
            ) : (
              <AnimatePresence>
                {room.items.map((item, index) => {
                  const catalogItem = ELECTRICAL_CATALOG.find((ci) => ci.id === item.itemId);
                  if (!catalogItem) return null;

                  const itemTotal = catalogItem.price * item.quantity;

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-gray-800/50 rounded-xl p-4 border border-gray-700"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">{catalogItem.icon}</span>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold">{catalogItem.name}</h3>
                          <p className="text-sm text-gray-400">{catalogItem.price} RON × {item.quantity}</p>
                          <p className="text-selectrik-gold font-bold mt-1">{itemTotal} RON</p>

                          {/* Comment */}
                          {item.comment ? (
                            <div className="mt-2 p-2 bg-gray-700/50 rounded-lg text-sm text-gray-300 flex items-start gap-2">
                              <MessageCircle size={14} className="mt-0.5 flex-shrink-0" />
                              <span className="flex-1">{item.comment}</span>
                            </div>
                          ) : (
                            <button
                              onClick={() => setEditingComment(item.id)}
                              className="mt-2 text-xs text-gray-400 hover:text-selectrik-gold transition-colors flex items-center gap-1"
                            >
                              <MessageCircle size={12} />
                              Adaugă comentariu
                            </button>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-2">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 bg-gray-700 rounded-lg p-1">
                            <button
                              onClick={() => handleQuantityChange(item.id, -1)}
                              className="p-1 hover:bg-gray-600 rounded transition-colors"
                            >
                              <Minus size={16} className="text-white" />
                            </button>
                            <span className="text-white font-bold min-w-[2ch] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item.id, 1)}
                              className="p-1 hover:bg-gray-600 rounded transition-colors"
                            >
                              <Plus size={16} className="text-white" />
                            </button>
                          </div>

                          {/* Edit Comment */}
                          {item.comment && (
                            <button
                              onClick={() => setEditingComment(item.id)}
                              className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                              title="Editează comentariu"
                            >
                              <MessageCircle size={16} />
                            </button>
                          )}

                          {/* Delete */}
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                            title="Șterge"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-700 p-6 bg-gray-800/50 space-y-4">
            {/* Auto-save indicator */}
            <div className="flex items-center justify-center gap-2 text-xs text-green-400">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span>Modificările se salvează automat</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-white font-semibold">Total cameră:</span>
              <span className="text-2xl font-bold text-selectrik-gold">{getRoomTotal()} RON</span>
            </div>

            <button
              onClick={() => setShowItemSelector(true)}
              className="w-full bg-selectrik-gold hover:bg-selectrik-gold text-selectrik-dark font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <Plus size={20} />
              Adaugă Mai Multe Obiecte
            </button>

            <button
              onClick={onClose}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 rounded-lg transition-colors"
            >
              Gata - Închide
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Item Selector Bottom Sheet */}
      {showItemSelector && (
        <ElectricalItemSelector
          roomId={room.id}
          onClose={() => setShowItemSelector(false)}
        />
      )}

      {/* Comment Modal */}
      {editingComment && (
        <CommentModal
          currentComment={room.items.find((i) => i.id === editingComment)?.comment || ''}
          onSave={(comment) => handleUpdateComment(editingComment, comment)}
          onClose={() => setEditingComment(null)}
        />
      )}
    </>
  );
};
