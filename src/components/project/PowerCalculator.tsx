import { motion } from 'framer-motion';
import { Zap, AlertTriangle, CheckCircle2, Info, Lightbulb } from 'lucide-react';
import { useProjects } from '../../contexts/ProjectContext';
import { ELECTRICAL_CATALOG } from '../../types/project';

interface PowerCalculatorProps {
  className?: string;
}

// Putere medie pentru diferite tipuri de obiecte (în Watt)
const POWER_RATINGS: Record<string, number> = {
  'priza-simpla': 0,
  'priza-dubla': 0,
  'priza-usb': 15,
  'priza-schuko': 0,
  'spot-led': 5,
  'plafoniera': 24,
  'banda-led': 50,
  'aplica': 10,
  'intrerupator-simplu': 0,
  'intrerupator-dublu': 0,
  'intrerupator-touch': 0,
  'dimmer': 0,
  'tablou-12': 0,
  'tablou-24': 0,
  'disjunctor': 0,
  'diferential': 0,
  'cablu-1.5': 0,
  'cablu-2.5': 0,
  'doza-aparat': 0,
  'doza-derivatie': 0,
};

// Factor de simultaneitate (nu toate prizele vor fi folosite simultan)
const SIMULTANEITY_FACTOR = 0.7;

export const PowerCalculator: React.FC<PowerCalculatorProps> = ({ className = '' }) => {
  const { currentProject } = useProjects();

  if (!currentProject) return null;

  // Calculează numărul de prize și puterea totală
  let totalOutlets = 0;
  let lightingPower = 0;
  let totalItems = 0;

  currentProject.rooms.forEach(room => {
    room.items.forEach(item => {
      totalItems++;
      const catalogItem = ELECTRICAL_CATALOG.find(ci => ci.id === item.itemId);
      if (!catalogItem) return;

      // Număr prize
      if (catalogItem.category === 'prize') {
        totalOutlets += item.quantity;
      }

      // Putere iluminat
      if (catalogItem.category === 'lumina') {
        lightingPower += (POWER_RATINGS[item.itemId] || 0) * item.quantity;
      }
    });
  });

  // Estimare putere prize (medie 200W per priză, cu factor de simultaneitate)
  const outletPower = totalOutlets * 200 * SIMULTANEITY_FACTOR;

  // Putere totală
  const totalPower = outletPower + lightingPower;
  const totalPowerKW = totalPower / 1000;

  // Curent estimat la 230V
  const estimatedCurrent = totalPower / 230;

  // Recomandare disjunctor principal
  let recommendedBreaker = 16;
  if (estimatedCurrent > 12) recommendedBreaker = 20;
  if (estimatedCurrent > 16) recommendedBreaker = 25;
  if (estimatedCurrent > 20) recommendedBreaker = 32;
  if (estimatedCurrent > 25) recommendedBreaker = 40;

  // Recomandare secțiune cablu principal
  let recommendedCableSize = '3x2.5mm²';
  if (estimatedCurrent > 20) recommendedCableSize = '3x4mm²';
  if (estimatedCurrent > 32) recommendedCableSize = '3x6mm²';

  // Status
  const isOverloaded = estimatedCurrent > 32;
  const isNearLimit = estimatedCurrent > 25 && estimatedCurrent <= 32;

  return (
    <div className={`bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border-2 border-gray-700 hover:border-selectrik-gold/50 rounded-2xl p-6 transition-all ${className}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-selectrik-gold/20 to-selectrik-gold/20 rounded-xl">
          <Zap className="text-selectrik-gold" size={28} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Calculator Putere Electrică</h3>
          <p className="text-sm text-gray-400">Verificare capacitate instalație</p>
        </div>
      </div>

      {/* Warning/Success Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`mb-6 p-4 rounded-xl border-2 ${
          isOverloaded
            ? 'bg-red-500/10 border-red-500/50'
            : isNearLimit
            ? 'bg-selectrik-gold/10 border-selectrik-gold/50'
            : 'bg-selectrik-blue/10 border-selectrik-blue/50'
        }`}
      >
        <div className="flex items-start gap-3">
          {isOverloaded ? (
            <AlertTriangle className="text-red-400 flex-shrink-0 mt-0.5" size={20} />
          ) : isNearLimit ? (
            <Info className="text-selectrik-gold flex-shrink-0 mt-0.5" size={20} />
          ) : (
            <CheckCircle2 className="text-selectrik-blue flex-shrink-0 mt-0.5" size={20} />
          )}
          <div>
            <p className={`font-semibold ${
              isOverloaded ? 'text-red-300' : isNearLimit ? 'text-selectrik-gold' : 'text-selectrik-blue'
            }`}>
              {isOverloaded
                ? 'Atenție: Instalație supradimensionată!'
                : isNearLimit
                ? 'Aproape de limită - Verificați consumatorii'
                : 'Instalație în parametri normali'}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {isOverloaded
                ? 'Recomandăm instalare tablou secundar sau creșterea capacității de branșament.'
                : isNearLimit
                ? 'Considerați instalarea unui tablou secundar pentru siguranță sporită.'
                : 'Instalația nu depășește limitele de siguranță.'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="text-selectrik-blue" size={16} />
            <span className="text-xs font-semibold text-gray-400 uppercase">Prize Totale</span>
          </div>
          <div className="text-2xl font-bold text-white">{totalOutlets}</div>
          <p className="text-xs text-gray-400 mt-1">~{Math.round(outletPower)}W putere estimată</p>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="text-selectrik-blue" size={16} />
            <span className="text-xs font-semibold text-gray-400 uppercase">Iluminat</span>
          </div>
          <div className="text-2xl font-bold text-white">{Math.round(lightingPower)}W</div>
          <p className="text-xs text-gray-400 mt-1">Putere totală lumini</p>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="text-selectrik-gold" size={16} />
            <span className="text-xs font-semibold text-gray-400 uppercase">Putere Totală</span>
          </div>
          <div className="text-2xl font-bold text-selectrik-gold">{totalPowerKW.toFixed(2)} kW</div>
          <p className="text-xs text-gray-400 mt-1">{Math.round(totalPower)}W la vârf</p>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="text-selectrik-gold" size={16} />
            <span className="text-xs font-semibold text-gray-400 uppercase">Curent Estimat</span>
          </div>
          <div className="text-2xl font-bold text-selectrik-gold">{estimatedCurrent.toFixed(1)} A</div>
          <p className="text-xs text-gray-400 mt-1">La 230V, monofazat</p>
        </div>
      </div>

      {/* Recommendations */}
      <div className="space-y-3">
        <div className="bg-gradient-to-r from-selectrik-gold/10 to-selectrik-gold/10 border border-selectrik-gold/30 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
            <Lightbulb className="text-selectrik-gold" size={16} />
            Recomandări Instalație
          </h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Disjunctor principal recomandat:</span>
              <span className="text-selectrik-gold font-bold">{recommendedBreaker}A</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Secțiune cablu principal:</span>
              <span className="text-selectrik-gold font-bold">{recommendedCableSize}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Număr total obiecte:</span>
              <span className="text-white font-semibold">{totalItems}</span>
            </div>
          </div>
        </div>

        {/* Info Note */}
        <div className="bg-selectrik-blue/10 border border-selectrik-blue/30 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <Info className="text-selectrik-blue flex-shrink-0 mt-0.5" size={14} />
            <p className="text-xs text-gray-300 leading-relaxed">
              <span className="font-semibold text-selectrik-blue">Notă:</span> Calculele sunt estimări bazate pe consum mediu.
              Factor de simultaneitate {(SIMULTANEITY_FACTOR * 100)}% aplicat pentru prize.
              Consultați un electrician autorizat pentru verificare finală.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
