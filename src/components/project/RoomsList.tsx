import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, ChevronRight } from 'lucide-react';
import { useProjects } from '../../contexts/ProjectContext';
import { RoomDetailModal } from './RoomDetailModal';
import { AddRoomModal } from './AddRoomModal';
import { Room } from '../../types/project';
import { ELECTRICAL_CATALOG } from '../../types/project';

export const RoomsList = () => {
  const { currentProject, deleteRoom } = useProjects();
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [showAddRoom, setShowAddRoom] = useState(false);

  if (!currentProject) return null;

  const getRoomPrice = (room: Room): number => {
    return room.items.reduce((total, item) => {
      const catalogItem = ELECTRICAL_CATALOG.find((ci) => ci.id === item.itemId);
      return total + (catalogItem?.price || 0) * item.quantity;
    }, 0);
  };

  const handleDeleteRoom = (roomId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Sigur vrei să ștergi această cameră?')) {
      deleteRoom(currentProject.id, roomId);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          📦 Camerele Tale ({currentProject.rooms.length})
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddRoom(true)}
          className="bg-selectrik-gold hover:bg-selectrik-gold text-selectrik-dark px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">Adaugă Cameră</span>
        </motion.button>
      </div>

      {currentProject.rooms.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 bg-gray-800/30 rounded-2xl border border-gray-700"
        >
          <div className="text-6xl mb-4">🏠</div>
          <h3 className="text-xl font-bold text-white mb-2">Nicio cameră încă</h3>
          <p className="text-gray-400 mb-6">Adaugă prima cameră pentru a începe</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddRoom(true)}
            className="bg-selectrik-gold hover:bg-selectrik-gold text-selectrik-dark px-6 py-3 rounded-lg font-semibold inline-flex items-center gap-2 transition-colors"
          >
            <Plus size={20} />
            <span>Adaugă Cameră</span>
          </motion.button>
        </motion.div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {currentProject.rooms.map((room, index) => {
              const roomPrice = getRoomPrice(room);
              const itemCount = room.items.length;

              return (
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedRoom(room)}
                  className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 hover:border-selectrik-gold rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-selectrik-gold/10"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="text-4xl">{room.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white group-hover:text-selectrik-gold transition-colors">
                          {room.name}
                        </h3>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm text-gray-400">
                            {itemCount} {itemCount === 1 ? 'obiect' : 'obiecte'}
                          </span>
                          <span className="text-selectrik-gold font-semibold">
                            {roomPrice} RON
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => handleDeleteRoom(room.id, e)}
                        className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </motion.button>
                      <ChevronRight className="text-gray-400 group-hover:text-selectrik-gold transition-colors" />
                    </div>
                  </div>

                  {/* Quick preview of items */}
                  {itemCount > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-700 flex gap-2 flex-wrap">
                      {room.items.slice(0, 5).map((item) => {
                        const catalogItem = ELECTRICAL_CATALOG.find((ci) => ci.id === item.itemId);
                        return (
                          <div
                            key={item.id}
                            className="px-2 py-1 bg-gray-700/50 rounded text-xs text-gray-300 flex items-center gap-1"
                          >
                            <span>{catalogItem?.icon}</span>
                            <span>×{item.quantity}</span>
                          </div>
                        );
                      })}
                      {itemCount > 5 && (
                        <div className="px-2 py-1 bg-gray-700/50 rounded text-xs text-gray-400">
                          +{itemCount - 5} mai multe
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Modals */}
      {selectedRoom && (
        <RoomDetailModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />
      )}

      {showAddRoom && <AddRoomModal onClose={() => setShowAddRoom(false)} />}
    </div>
  );
};
