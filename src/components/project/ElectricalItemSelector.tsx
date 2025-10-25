import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Plus, Check, Package, Plug, Lightbulb, ToggleLeft, LayoutGrid, Shield, Cable, Box, SearchX } from 'lucide-react';
import { useProjects } from '../../contexts/ProjectContext';
import { ELECTRICAL_CATALOG, ElectricalItem } from '../../types/project';
import { Toast } from '../Toast';

interface ElectricalItemSelectorProps {
  roomId: string;
  onClose: () => void;
}

const CATEGORIES = [
  { id: 'all', name: 'Toate', Icon: Package },
  { id: 'prize', name: 'Prize', Icon: Plug },
  { id: 'lumina', name: 'Lumină', Icon: Lightbulb },
  { id: 'switches', name: 'Switches', Icon: ToggleLeft },
  { id: 'tablouri', name: 'Tablouri', Icon: LayoutGrid },
  { id: 'protectii', name: 'Protecții', Icon: Shield },
  { id: 'cabluri', name: 'Cabluri', Icon: Cable },
  { id: 'doze', name: 'Doze', Icon: Box },
];

export const ElectricalItemSelector: React.FC<ElectricalItemSelectorProps> = ({
  roomId,
  onClose,
}) => {
  const { currentProject, addItemToRoom } = useProjects();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  if (!currentProject) return null;

  const filteredItems = ELECTRICAL_CATALOG.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddItem = (item: ElectricalItem) => {
    addItemToRoom(currentProject.id, roomId, {
      itemId: item.id,
      quantity: 1,
    });

    // Show toast notification
    setToastMessage(`${item.icon} ${item.name} adăugat!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);

    // Visual feedback on button
    setAddedItems((prev) => new Set(prev).add(item.id));
    setTimeout(() => {
      setAddedItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(item.id);
        return newSet;
      });
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-end md:items-center justify-center"
    >
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-t-3xl md:rounded-2xl w-full md:max-w-3xl max-h-[85vh] overflow-hidden border-t md:border border-gray-700 shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-700 bg-gray-800/50">
          <h2 className="text-xl md:text-2xl font-bold text-white">Alege Obiect</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2"
          >
            <X size={24} />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Caută obiecte..."
              className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-selectrik-gold placeholder-gray-400"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="px-4 py-3 border-b border-gray-700 overflow-x-auto">
          <div className="flex gap-2">
            {CATEGORIES.map((category) => {
              const IconComponent = category.Icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1.5 rounded-lg font-semibold text-sm whitespace-nowrap flex items-center gap-1.5 transition-all ${
                    selectedCategory === category.id
                      ? 'bg-selectrik-gold text-selectrik-dark'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <SearchX className="w-16 h-16 text-gray-500 mx-auto mb-3" />
              <p className="text-gray-400">Niciun obiect găsit</p>
            </div>
          ) : (
            <div className="space-y-2">
              <AnimatePresence>
                {filteredItems.map((item, index) => {
                  const isAdded = addedItems.has(item.id);

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.02 }}
                      className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 hover:border-selectrik-gold/50 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{item.icon}</span>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold">{item.name}</h3>
                          {item.description && (
                            <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>
                          )}
                          <p className="text-selectrik-gold font-bold mt-1">{item.price} RON</p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleAddItem(item)}
                          className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all ${
                            isAdded
                              ? 'bg-green-500 text-white'
                              : 'bg-selectrik-gold hover:bg-selectrik-gold text-selectrik-dark'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check size={18} />
                              <span className="hidden sm:inline">Adăugat!</span>
                            </>
                          ) : (
                            <>
                              <Plus size={18} />
                              <span className="hidden sm:inline">Adaugă</span>
                            </>
                          )}
                        </motion.button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Footer with Done Button */}
        <div className="p-4 bg-gray-800/50 border-t border-gray-700 space-y-3">
          <p className="text-sm text-center text-gray-300 flex items-center justify-center gap-2">
            <Check className="w-4 h-4 text-green-400" />
            Obiectele se salvează automat când apeși <span className="text-selectrik-gold font-bold">+</span>
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="w-full bg-selectrik-gold hover:bg-selectrik-gold text-selectrik-dark font-bold py-3 rounded-lg transition-colors"
          >
            Gata - Închide
          </motion.button>
        </div>
      </motion.div>

      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        type="success"
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </motion.div>
  );
};
