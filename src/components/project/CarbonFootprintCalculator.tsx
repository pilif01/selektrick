import { motion } from 'framer-motion';
import { Leaf, TreeDeciduous, Zap, TrendingDown, Calendar, Coins, Info } from 'lucide-react';
import { useState } from 'react';

interface CarbonFootprintCalculatorProps {
  className?: string;
}

export const CarbonFootprintCalculator: React.FC<CarbonFootprintCalculatorProps> = ({ className = '' }) => {
  const [systemPower, setSystemPower] = useState<number>(5); // kW
  const [sunHoursPerDay, setSunHoursPerDay] = useState<number>(4.5); // ore
  const [electricityPrice, setElectricityPrice] = useState<number>(0.65); // RON/kWh

  // Calcule
  const yearlyProduction = systemPower * sunHoursPerDay * 365; // kWh/an
  const co2Saved = (yearlyProduction * 0.5) / 1000; // tone CO2/an (0.5 kg CO2 per kWh)
  const treesEquivalent = Math.round(co2Saved * 47); // 1 tonă CO2 = ~47 copaci
  const moneySaved = Math.round(yearlyProduction * electricityPrice); // RON/an
  const lifetimeSavings = moneySaved * 25; // 25 ani durată de viață panouri
  const systemCost = systemPower * 5500; // ~5500 RON/kW instalat
  const paybackPeriod = (systemCost / moneySaved).toFixed(1); // ani

  return (
    <div className={`bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border-2 border-gray-700 hover:border-selectrik-gold/50 rounded-2xl p-6 transition-all ${className}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-selectrik-gold/20 to-selectrik-gold/20 rounded-xl">
          <Leaf className="text-selectrik-gold" size={28} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Calculator Impact Ecologic</h3>
          <p className="text-sm text-gray-400">Economii și beneficii panouri fotovoltaice</p>
        </div>
      </div>

      {/* Input Section */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Putere sistem fotovoltaic (kW)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="3"
              max="20"
              step="0.5"
              value={systemPower}
              onChange={(e) => setSystemPower(parseFloat(e.target.value))}
              className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-selectrik-gold"
            />
            <span className="text-white font-bold text-lg w-16 text-right">{systemPower} kW</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Ore soare/zi (medie anuală)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="3"
              max="6"
              step="0.1"
              value={sunHoursPerDay}
              onChange={(e) => setSunHoursPerDay(parseFloat(e.target.value))}
              className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-selectrik-gold"
            />
            <span className="text-white font-bold text-lg w-16 text-right">{sunHoursPerDay} h</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Preț energie (RON/kWh)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="0.4"
              max="1.5"
              step="0.05"
              value={electricityPrice}
              onChange={(e) => setElectricityPrice(parseFloat(e.target.value))}
              className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-selectrik-gold"
            />
            <span className="text-white font-bold text-lg w-20 text-right">{electricityPrice.toFixed(2)} RON</span>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* CO2 Saved */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-selectrik-blue/10 to-blue-600/10 border border-selectrik-blue/30 rounded-xl p-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <TrendingDown className="text-selectrik-blue" size={20} />
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">CO₂ Economisit</span>
          </div>
          <div className="text-3xl font-bold text-selectrik-blue mb-1">
            {co2Saved.toFixed(2)} <span className="text-lg">tone/an</span>
          </div>
          <p className="text-xs text-gray-400">În 25 de ani: {(co2Saved * 25).toFixed(1)} tone CO₂</p>
        </motion.div>

        {/* Trees Equivalent */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-selectrik-blue/10 to-blue-500/10 border border-selectrik-blue/30 rounded-xl p-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <TreeDeciduous className="text-selectrik-blue" size={20} />
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Echivalent Copaci</span>
          </div>
          <div className="text-3xl font-bold text-selectrik-blue mb-1">
            {treesEquivalent} <span className="text-lg">copaci/an</span>
          </div>
          <p className="text-xs text-gray-400">Plantați și crescuți timp de un an</p>
        </motion.div>

        {/* Energy Production */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-selectrik-gold/10 to-selectrik-gold/10 border border-selectrik-gold/30 rounded-xl p-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <Zap className="text-selectrik-gold" size={20} />
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Producție Anuală</span>
          </div>
          <div className="text-3xl font-bold text-selectrik-gold mb-1">
            {yearlyProduction.toLocaleString()} <span className="text-lg">kWh</span>
          </div>
          <p className="text-xs text-gray-400">~{Math.round(yearlyProduction / 365)} kWh/zi în medie</p>
        </motion.div>

        {/* Money Saved */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-selectrik-gold/10 to-selectrik-gold/10 border border-selectrik-gold/30 rounded-xl p-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <Coins className="text-selectrik-gold" size={20} />
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Economii Anuale</span>
          </div>
          <div className="text-3xl font-bold text-selectrik-gold mb-1">
            {moneySaved.toLocaleString()} <span className="text-lg">RON</span>
          </div>
          <p className="text-xs text-gray-400">În 25 ani: {lifetimeSavings.toLocaleString()} RON</p>
        </motion.div>
      </div>

      {/* Investment Info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-4 bg-gray-800/50 border border-gray-700 rounded-xl p-4"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="text-gray-400" size={16} />
              <span className="text-sm font-semibold text-gray-300">Perioada de Amortizare</span>
            </div>
            <p className="text-xs text-gray-400">Cost estimat instalare: {systemCost.toLocaleString()} RON</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">{paybackPeriod} ani</div>
            <p className="text-xs text-gray-400">apoi profit curat</p>
          </div>
        </div>
      </motion.div>

      {/* Info Note */}
      <div className="mt-4 bg-selectrik-blue/10 border border-selectrik-blue/30 rounded-lg p-3">
        <div className="flex items-start gap-2">
          <Info className="text-selectrik-blue flex-shrink-0 mt-0.5" size={14} />
          <p className="text-xs text-gray-300 leading-relaxed">
            <span className="font-semibold text-selectrik-blue">Notă:</span> Calculele sunt estimări bazate pe medie anuală pentru România.
            Producția reală depinde de orientare, înclinare, zonă geografică și calitatea panourilor.
            Beneficiile de mediu sunt calculate conform standardelor EPA.
          </p>
        </div>
      </div>
    </div>
  );
};
