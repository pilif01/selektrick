import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Sparkles, UtensilsCrossed, Bath, Bed, Sofa } from 'lucide-react';
import { useProjects } from '../../contexts/ProjectContext';
import { ROOM_ICONS } from '../../types/project';
import { IconRenderer } from './IconRenderer';

interface AddRoomModalProps {
  onClose: () => void;
}

export const AddRoomModal: React.FC<AddRoomModalProps> = ({ onClose }) => {
  const { currentProject, addRoom, addRoomFromTemplate } = useProjects();
  const [name, setName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState<keyof typeof ROOM_ICONS>('living');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [useTemplate, setUseTemplate] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProject) return;

    if (useTemplate && ['bucatarie', 'baie', 'dormitor', 'living'].includes(selectedIcon)) {
      addRoomFromTemplate(currentProject.id, selectedIcon as 'bucatarie' | 'baie' | 'dormitor' | 'living');
    } else {
      if (!name) return;
      addRoom(currentProject.id, {
        name,
        icon: ROOM_ICONS[selectedIcon],
        width: width ? parseFloat(width) : undefined,
        height: height ? parseFloat(height) : undefined,
      });
    }

    onClose();
  };

  const templates = [
    { id: 'bucatarie', name: 'Bucătărie', Icon: UtensilsCrossed, desc: '8 obiecte predefinite' },
    { id: 'baie', name: 'Baie', Icon: Bath, desc: '6 obiecte predefinite' },
    { id: 'dormitor', name: 'Dormitor', Icon: Bed, desc: '7 obiecte predefinite' },
    { id: 'living', name: 'Living', Icon: Sofa, desc: '10 obiecte predefinite' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start justify-center p-4 pt-20"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 max-w-md w-full border border-gray-700 shadow-2xl max-h-[90vh] overflow-y-auto overflow-x-hidden"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Cameră Nouă</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Template Toggle */}
          <div className="flex items-center justify-between bg-gradient-to-r from-selectrik-gold/10 to-selectrik-blue/10 border border-selectrik-gold/30 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <Sparkles className="text-selectrik-gold" size={18} />
              <span className="text-sm font-semibold text-white">Folosește șablon predefinit</span>
            </div>
            <button
              type="button"
              onClick={() => setUseTemplate(!useTemplate)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                useTemplate ? 'bg-selectrik-gold' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  useTemplate ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Template Selection */}
          {useTemplate ? (
            <div>
              <label className="block text-white font-semibold mb-3">
                Alege șablonul <span className="text-red-400">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {templates.map((template) => {
                  const IconComponent = template.Icon;
                  return (
                    <button
                      key={template.id}
                      type="button"
                      onClick={() => setSelectedIcon(template.id as keyof typeof ROOM_ICONS)}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        selectedIcon === template.id
                          ? 'border-selectrik-gold bg-selectrik-gold/10'
                          : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                      }`}
                    >
                      <IconComponent
                        size={32}
                        className={selectedIcon === template.id ? 'text-selectrik-gold' : 'text-gray-400'}
                      />
                      <h4 className="text-white font-semibold mt-2">{template.name}</h4>
                      <p className="text-xs text-gray-400 mt-1">{template.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <>
              {/* Name */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  Nume cameră <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ex: Living"
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-selectrik-gold"
                  required={!useTemplate}
                  autoFocus
                />
              </div>

          {/* Icon Selector */}
          <div>
            <label className="block text-white font-semibold mb-2">
              Tip cameră
            </label>
            <div className="grid grid-cols-5 gap-2">
              {(Object.keys(ROOM_ICONS) as Array<keyof typeof ROOM_ICONS>).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedIcon(key)}
                  className={`p-3 rounded-lg transition-all flex items-center justify-center ${
                    selectedIcon === key
                      ? 'bg-selectrik-gold ring-2 ring-selectrik-gold text-selectrik-dark'
                      : 'bg-gray-700 hover:bg-gray-600 text-selectrik-gold'
                  }`}
                >
                  <IconRenderer iconName={ROOM_ICONS[key]} size={28} />
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-1 capitalize">{selectedIcon}</p>
          </div>

              {/* Dimensions (Optional) */}
              <div>
                <label className="block text-white font-semibold mb-2">
                  Dimensiuni (opțional)
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 flex-1">
                    <input
                      type="number"
                      step="0.1"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      placeholder="L"
                      className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-selectrik-gold text-sm"
                    />
                    <span className="text-gray-400 text-xs">m</span>
                  </div>
                  <span className="text-gray-400">×</span>
                  <div className="flex items-center gap-1 flex-1">
                    <input
                      type="number"
                      step="0.1"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="l"
                      className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-selectrik-gold text-sm"
                    />
                    <span className="text-gray-400 text-xs">m</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={!useTemplate && !name}
            className="w-full bg-selectrik-gold hover:bg-selectrik-gold disabled:bg-gray-700 disabled:text-gray-500 text-selectrik-dark font-bold py-3 rounded-lg transition-colors"
          >
            {useTemplate ? 'Adaugă din Șablon' : 'Adaugă Cameră'}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};
