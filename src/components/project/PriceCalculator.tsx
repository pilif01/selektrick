import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Download, Send, DollarSign, Package, Wrench, Gem, Plug, Lightbulb, ToggleLeft, LayoutGrid, Shield, Cable, Box } from 'lucide-react';
import { useProjects } from '../../contexts/ProjectContext';
import { ELECTRICAL_CATALOG } from '../../types/project';

export const PriceCalculator = () => {
  const { currentProject } = useProjects();
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  if (!currentProject) return null;

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  // Calculate totals by category
  const categoryTotals = new Map<string, { total: number; items: Array<{ name: string; quantity: number; price: number }> }>();

  currentProject.rooms.forEach((room) => {
    room.items.forEach((item) => {
      const catalogItem = ELECTRICAL_CATALOG.find((ci) => ci.id === item.itemId);
      if (!catalogItem) return;

      const categoryName = getCategoryName(catalogItem.category);
      const itemTotal = catalogItem.price * item.quantity;

      if (!categoryTotals.has(categoryName)) {
        categoryTotals.set(categoryName, { total: 0, items: [] });
      }

      const category = categoryTotals.get(categoryName)!;
      category.total += itemTotal;
      category.items.push({
        name: catalogItem.name,
        quantity: item.quantity,
        price: itemTotal,
      });
    });
  });

  const materialsTotal = Array.from(categoryTotals.values()).reduce((sum, cat) => sum + cat.total, 0);
  const laborTotal = Math.round(materialsTotal * 0.3); // 30% labor
  const grandTotal = materialsTotal + laborTotal;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 md:p-8">
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <DollarSign className="w-8 h-8 text-selectrik-gold" />
          <span>Estimare Preț</span>
        </h2>

        {/* Materials Breakdown */}
        <div className="space-y-3 mb-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Package className="w-6 h-6 text-selectrik-gold" />
            Materiale
          </h3>

          {Array.from(categoryTotals.entries()).map(([categoryName, data]) => {
            const isExpanded = expandedCategories.has(categoryName);

            return (
              <motion.div
                key={categoryName}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gray-800/50 rounded-lg border border-gray-700 overflow-hidden"
              >
                <button
                  onClick={() => toggleCategory(categoryName)}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-700/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {getCategoryIcon(categoryName)}
                    <span className="text-white font-semibold">{categoryName}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-selectrik-gold font-bold">{data.total} RON</span>
                    {isExpanded ? (
                      <ChevronUp className="text-gray-400" size={20} />
                    ) : (
                      <ChevronDown className="text-gray-400" size={20} />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-gray-700 p-4 space-y-2"
                  >
                    {data.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-gray-300">
                          {item.name} × {item.quantity}
                        </span>
                        <span className="text-gray-400">{item.price} RON</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            );
          })}

          {categoryTotals.size === 0 && (
            <div className="text-center py-8 text-gray-400">
              <p>Niciun obiect adăugat încă</p>
            </div>
          )}

          <div className="flex items-center justify-between pt-3 border-t border-gray-700">
            <span className="text-white font-semibold">Subtotal Materiale</span>
            <span className="text-xl font-bold text-white">{materialsTotal} RON</span>
          </div>
        </div>

        {/* Labor */}
        <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold flex items-center gap-2">
                <Wrench className="w-5 h-5 text-selectrik-gold" />
                <span>Manoperă (30%)</span>
              </h3>
              <p className="text-xs text-gray-400 mt-1">Estimare pentru instalare</p>
            </div>
            <span className="text-xl font-bold text-blue-400">{laborTotal} RON</span>
          </div>
        </div>

        {/* Grand Total */}
        <div className="p-6 bg-gradient-to-r from-selectrik-gold/20 to-selectrik-gold/20 border-2 border-selectrik-gold rounded-xl mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold text-lg flex items-center gap-2">
                <Gem className="w-6 h-6 text-selectrik-gold" />
                TOTAL ESTIMAT
              </h3>
              <p className="text-xs text-gray-300 mt-1">Materiale + Manoperă</p>
            </div>
            <span className="text-4xl font-bold text-selectrik-gold">{grandTotal} RON</span>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Download size={18} />
            <span>Export PDF</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-selectrik-gold hover:bg-selectrik-gold text-selectrik-dark font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Send size={18} />
            <span>Solicită Ofertă</span>
          </motion.button>
        </div>

        {/* Note */}
        <p className="text-xs text-gray-400 text-center mt-4">
          * Prețurile sunt orientative și pot varia în funcție de complexitatea lucrării
        </p>
      </div>
    </div>
  );
};

function getCategoryName(category: string): string {
  const names: Record<string, string> = {
    prize: 'Prize',
    lumina: 'Iluminat',
    switches: 'Întrerupătoare',
    tablouri: 'Tablouri Electrice',
    protectii: 'Protecții',
    cabluri: 'Cabluri',
    doze: 'Doze',
  };
  return names[category] || category;
}

function getCategoryIcon(categoryName: string): JSX.Element {
  const iconMap: Record<string, JSX.Element> = {
    'Prize': <Plug className="w-6 h-6 text-selectrik-gold" />,
    'Iluminat': <Lightbulb className="w-6 h-6 text-selectrik-gold" />,
    'Întrerupătoare': <ToggleLeft className="w-6 h-6 text-selectrik-gold" />,
    'Tablouri Electrice': <LayoutGrid className="w-6 h-6 text-selectrik-gold" />,
    'Protecții': <Shield className="w-6 h-6 text-selectrik-gold" />,
    'Cabluri': <Cable className="w-6 h-6 text-selectrik-gold" />,
    'Doze': <Box className="w-6 h-6 text-selectrik-gold" />,
  };
  return iconMap[categoryName] || <Box className="w-6 h-6 text-selectrik-gold" />;
}
