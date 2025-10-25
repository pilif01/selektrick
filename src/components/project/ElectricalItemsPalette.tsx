import { useState } from 'react';
import { Search, Package, Plug, Lightbulb, ToggleLeft, PanelTop, Shield, Cable, Box } from 'lucide-react';
import { ELECTRICAL_CATALOG } from '../../types/project';
import { DraggableElectricalItem } from './DraggableElectricalItem';

const CATEGORIES = [
  { id: 'all', name: 'Toate', Icon: Package },
  { id: 'prize', name: 'Prize', Icon: Plug },
  { id: 'lumina', name: 'Lumină', Icon: Lightbulb },
  { id: 'switches', name: 'Switches', Icon: ToggleLeft },
  { id: 'tablouri', name: 'Tablouri', Icon: PanelTop },
  { id: 'protectii', name: 'Protecții', Icon: Shield },
  { id: 'cabluri', name: 'Cabluri', Icon: Cable },
  { id: 'doze', name: 'Doze', Icon: Box },
];

export const ElectricalItemsPalette = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredItems = ELECTRICAL_CATALOG.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-700 h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-700 bg-gray-800/50">
        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <Plug className="text-selectrik-gold" size={24} />
          <span>Obiecte Electrice</span>
        </h3>

        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Caută..."
            className="w-full pl-9 pr-3 py-2 bg-gray-700 text-white text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-selectrik-gold placeholder-gray-400"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-600">
          {CATEGORIES.map((category) => {
            const IconComponent = category.Icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-2 py-1 rounded text-xs whitespace-nowrap flex items-center gap-1 transition-all ${
                  selectedCategory === category.id
                    ? 'bg-selectrik-gold text-selectrik-dark font-bold'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <IconComponent size={14} />
                <span className="hidden sm:inline">{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Items List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {filteredItems.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Search className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Niciun obiect găsit</p>
          </div>
        ) : (
          filteredItems.map((item) => (
            <DraggableElectricalItem key={item.id} item={item} />
          ))
        )}
      </div>

      {/* Footer Hint */}
      <div className="p-3 bg-gray-800/50 border-t border-gray-700">
        <p className="text-xs text-gray-400 text-center flex items-center justify-center gap-1">
          <Lightbulb size={12} className="text-selectrik-gold" />
          Trage obiectele în camere pentru a le adăuga
        </p>
      </div>
    </div>
  );
};
