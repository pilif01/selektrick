import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Grid, X } from 'lucide-react';
import { useProjects } from '../../contexts/ProjectContext';
import { DraggableRoom } from './DraggableRoom';
import { ElectricalItemsPalette } from './ElectricalItemsPalette';
import { AddRoomModal } from './AddRoomModal';

// Detect if touch device
const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

export const ProjectCanvas = () => {
  const { currentProject } = useProjects();
  const [showAddRoom, setShowAddRoom] = useState(false);
  const [showPalette, setShowPalette] = useState(false);

  if (!currentProject) return null;

  const backend = isTouchDevice() ? TouchBackend : HTML5Backend;

  return (
    <DndProvider backend={backend}>
      <div className="flex flex-col lg:flex-row gap-4 h-[calc(100vh-200px)]">
        {/* Canvas Area */}
        <div className="flex-1 bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl border-2 border-dashed border-gray-700 relative overflow-hidden">
          {/* Grid Background */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(212, 175, 55, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(212, 175, 55, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}
          />

          {/* Canvas Content */}
          <div className="relative z-10 p-4 h-full overflow-auto">
            {currentProject.rooms.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Grid className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-400 mb-2">Canvas Gol</h3>
                  <p className="text-gray-500 mb-6">Adaugă o cameră pentru a începe</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAddRoom(true)}
                    className="bg-selectrik-gold hover:bg-selectrik-gold text-selectrik-dark px-6 py-3 rounded-lg font-bold inline-flex items-center gap-2 transition-colors"
                  >
                    <Plus size={20} />
                    Adaugă Prima Cameră
                  </motion.button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-full">
                {currentProject.rooms.map((room) => (
                  <DraggableRoom key={room.id} room={room} />
                ))}

                {/* Add Room Card - Last Position (Dreapta) */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowAddRoom(true)}
                  className="bg-gray-800/30 border-2 border-dashed border-gray-600 rounded-xl p-6 flex items-center justify-center cursor-pointer hover:border-selectrik-gold transition-all min-h-[200px]"
                >
                  <div className="text-center">
                    <Plus className="w-12 h-12 text-gray-500 mx-auto mb-2" />
                    <p className="text-gray-400 font-semibold">Adaugă Cameră</p>
                  </div>
                </motion.div>
              </div>
            )}
          </div>

        </div>

        {/* Electrical Items Palette (Desktop) */}
        <div className="hidden lg:block w-80">
          <ElectricalItemsPalette />
        </div>

        {/* Mobile FAB - Palette & Add Room */}
        <div className="lg:hidden fixed bottom-8 right-8 z-40">
          {/* Secondary Actions */}
          <AnimatePresence>
            {showPalette && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute bottom-20 right-0 space-y-3"
              >
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  whileHover={{ scale: 1.1, x: -5 }}
                  onClick={() => setShowAddRoom(true)}
                  className="bg-selectrik-gold hover:bg-selectrik-gold text-selectrik-dark px-4 py-3 rounded-full shadow-lg flex items-center gap-3 group"
                >
                  <Plus className="w-5 h-5" />
                  <span className="font-semibold whitespace-nowrap">Adaugă Cameră</span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main FAB */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowPalette(!showPalette)}
            animate={{ rotate: showPalette ? 45 : 0 }}
            className="w-16 h-16 bg-selectrik-blue hover:bg-selectrik-light text-white rounded-full shadow-2xl flex items-center justify-center relative overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-selectrik-gold"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 2, opacity: 0.2 }}
              transition={{ duration: 0.4 }}
            />
            {showPalette ? <X className="w-7 h-7 relative z-10" /> : <Grid className="w-7 h-7 relative z-10" />}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 border-4 border-selectrik-blue rounded-full"
            />
          </motion.button>
        </div>

      </div>

      {/* Add Room Modal */}
      {showAddRoom && <AddRoomModal onClose={() => setShowAddRoom(false)} />}
    </DndProvider>
  );
};
