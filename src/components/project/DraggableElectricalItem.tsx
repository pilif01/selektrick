import { useState } from 'react';
import { useDrag } from 'react-dnd';
import { motion, AnimatePresence } from 'framer-motion';
import { GripVertical, Plus, X } from 'lucide-react';
import { ElectricalItem } from '../../types/project';
import { useProjects } from '../../contexts/ProjectContext';
import { ItemTypes } from './DraggableRoom';
import { IconRenderer } from './IconRenderer';

interface DraggableElectricalItemProps {
  item: ElectricalItem;
}

export const DraggableElectricalItem: React.FC<DraggableElectricalItemProps> = ({ item }) => {
  const { currentProject, addItemToRoom } = useProjects();
  const [showRoomSelector, setShowRoomSelector] = useState(false);

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.ELECTRICAL_ITEM,
    item: { ...item, type: ItemTypes.ELECTRICAL_ITEM },
    end: (_draggedItem, monitor) => {
      const dropResult: any = monitor.getDropResult();
      if (dropResult && dropResult.roomId && currentProject) {
        // Add item to the room
        addItemToRoom(currentProject.id, dropResult.roomId, {
          itemId: item.id,
          quantity: 1,
        });
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleQuickAdd = (roomId: string) => {
    if (currentProject) {
      addItemToRoom(currentProject.id, roomId, {
        itemId: item.id,
        quantity: 1,
      });
      setShowRoomSelector(false);
    }
  };

  return (
    <>
      <div className="relative">
        <motion.div
          ref={drag}
          whileHover={{ scale: 1.02, x: 2 }}
          className={`bg-gray-700/50 hover:bg-gray-700 border border-gray-600 hover:border-selectrik-gold rounded-lg p-3 transition-all relative select-none ${
            isDragging ? 'opacity-50 scale-95 cursor-grabbing' : 'cursor-grab'
          }`}
          style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
        >
          <div className="flex items-center gap-2">
            <GripVertical className="text-gray-500 flex-shrink-0" size={16} />
            <IconRenderer iconName={item.icon} size={24} className="flex-shrink-0 text-selectrik-gold" />
            <div className="flex-1 min-w-0 pr-8">
              <h4 className="text-white font-semibold text-sm truncate">{item.name}</h4>
              {item.description && (
                <p className="text-xs text-gray-400 truncate">{item.description}</p>
              )}
              <p className="text-selectrik-gold font-bold text-sm mt-1">{item.price} RON</p>
            </div>
          </div>

          {isDragging && (
            <div className="absolute inset-0 bg-blue-500/20 rounded-lg flex items-center justify-center pointer-events-none">
              <div className="bg-blue-500 text-white px-3 py-1 rounded text-xs font-semibold">
                Trage în cameră
              </div>
            </div>
          )}
        </motion.div>

        {/* Quick Add Button - Positioned absolutely to not interfere with drag */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            setShowRoomSelector(true);
          }}
          className="absolute top-1/2 -translate-y-1/2 right-2 bg-selectrik-gold hover:bg-selectrik-gold text-selectrik-dark p-2 rounded-lg transition-colors z-10 cursor-pointer"
          title="Adaugă rapid"
          style={{ pointerEvents: 'auto' }}
        >
          <Plus size={16} />
        </motion.button>
      </div>

      {/* Room Selector Modal */}
      <AnimatePresence>
        {showRoomSelector && currentProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowRoomSelector(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 max-w-md w-full border border-gray-700 shadow-2xl max-h-[80vh] overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <IconRenderer iconName={item.icon} size={24} className="text-selectrik-gold" />
                  <span>Alege Camera</span>
                </h3>
                <button
                  onClick={() => setShowRoomSelector(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <p className="text-gray-400 text-sm mb-4">
                Adaugă <span className="text-selectrik-gold font-semibold">{item.name}</span> în:
              </p>

              <div className="flex-1 overflow-y-auto space-y-2">
                {currentProject.rooms.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <p>Nicio cameră disponibilă</p>
                    <p className="text-xs mt-2">Creează mai întâi o cameră</p>
                  </div>
                ) : (
                  currentProject.rooms.map((room) => (
                    <motion.button
                      key={room.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleQuickAdd(room.id)}
                      className="w-full bg-gray-700/50 hover:bg-gray-700 border border-gray-600 hover:border-selectrik-gold rounded-lg p-4 transition-all text-left"
                    >
                      <div className="flex items-center gap-3">
                        <IconRenderer iconName={room.icon} size={32} className="text-selectrik-gold" />
                        <div className="flex-1">
                          <h4 className="text-white font-semibold">{room.name}</h4>
                          <p className="text-xs text-gray-400">
                            {room.items.length} {room.items.length === 1 ? 'obiect' : 'obiecte'}
                          </p>
                        </div>
                        <Plus className="text-selectrik-gold" size={20} />
                      </div>
                    </motion.button>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
