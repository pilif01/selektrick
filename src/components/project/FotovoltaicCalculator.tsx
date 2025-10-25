import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Battery, Home, Building2, MapPin, Shield, FileText, TrendingDown } from 'lucide-react';
import { useProjects } from '../../contexts/ProjectContext';

const POWER_PRESETS = [3.6, 5, 6, 8, 10, 12, 15, 20];
const PANEL_POWER = 0.45; // kW per panel (450W)

export const FotovoltaicCalculator = () => {
  const { currentProject, updateProject } = useProjects();
  
  // Step 1: Client Details
  const [clientType, setClientType] = useState<'persoana_fizica' | 'companie'>('persoana_fizica');
  
  // Step 2: System Power & Panels
  const [numberOfPanels, setNumberOfPanels] = useState(11);
  const [consumptionPeriod, setConsumptionPeriod] = useState<'lunar' | 'anual'>('lunar');
  const [consumption, setConsumption] = useState(0);
  
  // Step 3: Installation Details
  const [mountingStructure, setMountingStructure] = useState<'tigla' | 'tabla' | 'plat'>('tigla');
  const [orientation, setOrientation] = useState<'est' | 'sud' | 'vest'>('sud');
  const [address, setAddress] = useState('');
  
  // Step 4: Components
  const [panelQuality, setPanelQuality] = useState<'premium' | 'standard'>('premium');
  const [phaseType, setPhaseType] = useState<'monofazic' | 'trifazic'>('monofazic');
  const [batteryCapacity, setBatteryCapacity] = useState(0); // kWh
  
  // Step 5: Extra Options
  const [extraWarranty, setExtraWarranty] = useState(false);
  const [prosumatorDoc, setProsumatorDoc] = useState(false);

  // Calculations
  const systemPower = numberOfPanels * PANEL_POWER;
  
  const setSystemPowerPreset = (power: number) => {
    setNumberOfPanels(Math.ceil(power / PANEL_POWER));
  };
  const yearlyProduction = systemPower * 1400; // kWh/year
  const monthlyProduction = yearlyProduction / 12;
  
  const orientationFactor = orientation === 'sud' ? 1 : orientation === 'vest' ? 0.85 : 0.75;
  const adjustedProduction = monthlyProduction * orientationFactor;
  
  const panelCost = systemPower * (panelQuality === 'premium' ? 850 : 700);
  const inverterCost = phaseType === 'trifazic' ? 1500 : 1000;
  const structureCost = numberOfPanels * (mountingStructure === 'tigla' ? 80 : mountingStructure === 'tabla' ? 60 : 100);
  const batteryCost = batteryCapacity * 600;
  const installationCost = systemPower * 250;
  
  let totalCost = panelCost + inverterCost + structureCost + batteryCost + installationCost;
  if (extraWarranty) totalCost += 360;
  if (prosumatorDoc) totalCost += 900;
  
  const monthlySavings = adjustedProduction * 0.65;
  const paybackYears = totalCost / (monthlySavings * 12);
  const autonomy = batteryCapacity > 0 ? (batteryCapacity / (systemPower * 4)) * 100 : 0;

  // Save configuration to project when any value changes
  useEffect(() => {
    if (!currentProject) return;

    const metadata = {
      clientType,
      numberOfPanels,
      consumptionPeriod,
      consumption,
      mountingStructure,
      orientation,
      address,
      panelQuality,
      phaseType,
      batteryCapacity,
      extraWarranty,
      prosumatorDoc,
      systemPower: parseFloat(systemPower.toFixed(2)),
      totalCost: parseFloat(totalCost.toFixed(0)),
      yearlyProduction: parseFloat(yearlyProduction.toFixed(0)),
      monthlySavings: parseFloat(monthlySavings.toFixed(0)),
      paybackYears: parseFloat(paybackYears.toFixed(1)),
    };

    const description = `Putere: ${systemPower.toFixed(2)}kW, Panouri: ${numberOfPanels}, Baterii: ${batteryCapacity}kWh`;
    
    updateProject(currentProject.id, { 
      description,
      metadata,
      rooms: [] // Keep rooms empty for fotovoltaic projects
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientType, numberOfPanels, consumption, consumptionPeriod, mountingStructure, orientation, address,
      panelQuality, phaseType, batteryCapacity, extraWarranty, prosumatorDoc]);

  return (
    <div className="max-w-7xl mx-auto pb-20">
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Left Column - Configuration Steps */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 1. Client Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4">Detalii Client</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setClientType('persoana_fizica')}
                className={`p-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-3 ${
                  clientType === 'persoana_fizica'
                    ? 'bg-gradient-to-r from-selectrik-gold to-selectrik-gold text-white shadow-lg shadow-selectrik-gold/30'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Home className="w-5 h-5" />
                Persoană Fizică
              </button>
              <button
                onClick={() => setClientType('companie')}
                className={`p-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-3 ${
                  clientType === 'companie'
                    ? 'bg-gradient-to-r from-selectrik-gold to-selectrik-gold text-white shadow-lg shadow-selectrik-gold/30'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Building2 className="w-5 h-5" />
                Companie
              </button>
            </div>
          </motion.div>

          {/* 2. System Power */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-selectrik-gold" />
              Putere Sistem
            </h3>

            {/* Consumption Input */}
            <div className="mb-6 p-4 bg-gray-700/30 rounded-xl">
              <label className="text-sm font-semibold text-gray-300 mb-3 block">
                💡 Introdu consumul din factură (opțional)
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="number"
                  value={consumption || ''}
                  onChange={(e) => setConsumption(Number(e.target.value))}
                  placeholder="Consumul tău"
                  className="flex-1 px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-selectrik-gold"
                />
                <select
                  value={consumptionPeriod}
                  onChange={(e) => setConsumptionPeriod(e.target.value as 'lunar' | 'anual')}
                  className="px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-selectrik-gold"
                >
                  <option value="lunar">kWh / lună</option>
                  <option value="anual">kWh / an</option>
                </select>
              </div>
            </div>

            {/* Number of Panels Direct Selection */}
            <div className="mb-6">
              <label className="text-sm font-semibold text-gray-300 mb-3 block">
                Număr de Panouri • {systemPower.toFixed(1)} kW
              </label>
              <div className="space-y-3">
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="1"
                  value={numberOfPanels}
                  onChange={(e) => setNumberOfPanels(Number(e.target.value))}
                  className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-selectrik-gold"
                />
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">5 panouri</span>
                  <div className="text-center">
                    <div className="text-3xl font-black text-selectrik-gold">{numberOfPanels}</div>
                    <div className="text-xs text-gray-400">panouri × 450W</div>
                  </div>
                  <span className="text-gray-400 text-sm">50 panouri</span>
                </div>
              </div>
            </div>

            {/* Power Presets */}
            <div className="mb-4">
              <label className="text-sm font-semibold text-gray-300 mb-3 block">
                Sau alege presetări rapide
              </label>
              <div className="grid grid-cols-4 gap-2">
                {POWER_PRESETS.map((power) => (
                  <button
                    key={power}
                    onClick={() => setSystemPowerPreset(power)}
                    className={`py-3 px-2 rounded-lg font-bold text-sm sm:text-base transition-all ${
                      Math.abs(systemPower - power) < 0.3
                        ? 'bg-gradient-to-r from-selectrik-gold to-selectrik-gold text-white shadow-lg shadow-selectrik-gold/30 scale-105'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {power} kW
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 3. Installation Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4">Detalii Instalare</h3>

            {/* Mounting Structure */}
            <div className="mb-4">
              <label className="text-sm font-semibold text-gray-300 mb-2 block">Structură de prindere</label>
              <div className="grid grid-cols-3 gap-2">
                {([
                  { id: 'tigla', label: 'Țiglă' },
                  { id: 'tabla', label: 'Tablă' },
                  { id: 'plat', label: 'Acoperiș Plat' }
                ] as const).map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setMountingStructure(type.id)}
                    className={`py-3 px-2 rounded-lg font-semibold text-sm transition-all ${
                      mountingStructure === type.id
                        ? 'bg-gradient-to-r from-selectrik-gold to-selectrik-gold text-white shadow-lg shadow-selectrik-gold/30'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Orientation */}
            <div className="mb-4">
              <label className="text-sm font-semibold text-gray-300 mb-2 block">Orientare panouri</label>
              <div className="grid grid-cols-3 gap-2">
                {(['est', 'sud', 'vest'] as const).map((dir) => (
                  <button
                    key={dir}
                    onClick={() => setOrientation(dir)}
                    className={`py-3 rounded-lg font-semibold capitalize transition-all ${
                      orientation === dir
                        ? 'bg-gradient-to-r from-selectrik-blue to-blue-600 text-white shadow-lg shadow-selectrik-blue/30'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {dir}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2">
                {orientation === 'sud' ? '✓ Orientare optimă' : '⚠️ Eficiență redusă cu ~15-25%'}
              </p>
            </div>

            {/* Address (Optional) */}
            <div>
              <label className="text-sm font-semibold text-gray-300 mb-2 block">
                Proiectează-ți sistemul (opțional)
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Introdu adresa ta"
                    className="w-full pl-10 pr-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-selectrik-gold"
                  />
                </div>
                <button className="px-6 py-3 bg-gradient-to-r from-selectrik-gold to-selectrik-gold text-white font-semibold rounded-lg hover:shadow-lg shadow-selectrik-gold/30 transition-all">
                  Începe
                </button>
              </div>
            </div>
          </motion.div>

          {/* 4. Components Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            {/* Panels */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Panouri</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPanelQuality('premium')}
                  className={`p-4 rounded-xl transition-all ${
                    panelQuality === 'premium'
                      ? 'bg-gradient-to-r from-selectrik-gold to-selectrik-gold text-white shadow-lg shadow-selectrik-gold/30'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <div className="font-bold mb-1">Premium</div>
                  <div className="text-xs opacity-90">Eficiență maximă</div>
                </button>
                <button
                  onClick={() => setPanelQuality('standard')}
                  className={`p-4 rounded-xl transition-all ${
                    panelQuality === 'standard'
                      ? 'bg-gradient-to-r from-selectrik-gold to-selectrik-gold text-white shadow-lg shadow-selectrik-gold/30'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <div className="font-bold mb-1">Standard</div>
                  <div className="text-xs opacity-90">Raport calitate-preț</div>
                </button>
              </div>
            </div>

            {/* Phase Type */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Branșament</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPhaseType('monofazic')}
                  className={`p-4 rounded-xl transition-all ${
                    phaseType === 'monofazic'
                      ? 'bg-gradient-to-r from-selectrik-blue to-blue-600 text-white shadow-lg shadow-selectrik-blue/30'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <div className="font-bold">Monofazic</div>
                  <div className="text-xs opacity-90">230V</div>
                </button>
                <button
                  onClick={() => setPhaseType('trifazic')}
                  className={`p-4 rounded-xl transition-all ${
                    phaseType === 'trifazic'
                      ? 'bg-gradient-to-r from-selectrik-blue to-blue-600 text-white shadow-lg shadow-selectrik-blue/30'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <div className="font-bold">Trifazic</div>
                  <div className="text-xs opacity-90">400V</div>
                </button>
              </div>
            </div>

            {/* Inverter - Auto Selected */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Invertor</h3>
              <div className="bg-selectrik-blue/10 border border-selectrik-blue/30 rounded-xl p-4 flex items-center gap-3">
                <Zap className="w-8 h-8 text-selectrik-blue" />
                <div>
                  <div className="font-bold text-white">
                    Invertor {systemPower.toFixed(1)}kW {phaseType === 'trifazic' ? 'Trifazic' : 'Monofazic'}
                  </div>
                  <div className="text-sm text-gray-400">Selectat automat pentru configurația ta</div>
                </div>
              </div>
            </div>

            {/* Batteries */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <Battery className="w-5 h-5 text-selectrik-gold" />
                Baterii
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Autonomie fără baterie: <span className="text-selectrik-gold font-bold">{autonomy.toFixed(1)}%</span>
              </p>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300 flex items-center justify-between">
                  <span>Capacitate baterii (kWh)</span>
                  <span className="text-selectrik-gold font-bold">{batteryCapacity} kWh</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="2.5"
                  value={batteryCapacity}
                  onChange={(e) => setBatteryCapacity(Number(e.target.value))}
                  className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-selectrik-gold"
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Fără baterii</span>
                  <span>20 kWh</span>
                </div>
              </div>

              {batteryCapacity > 0 && (
                <div className="mt-4 p-3 bg-selectrik-gold/10 border border-selectrik-gold/30 rounded-lg">
                  <div className="text-sm text-selectrik-gold">
                    ✓ Autonomie crescută: <strong>{(autonomy * 3).toFixed(0)}%</strong>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* 5. Extra Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4">Alegeți Extra Opțiuni</h3>
            
            <div className="space-y-3">
              <label className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl cursor-pointer hover:bg-gray-700/50 transition-all">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-selectrik-blue" />
                  <div>
                    <div className="font-semibold text-white">Extra Garanție 1 an</div>
                    <div className="text-sm text-gray-400">+360 Lei</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={extraWarranty}
                  onChange={(e) => setExtraWarranty(e.target.checked)}
                  className="w-5 h-5 accent-selectrik-gold cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl cursor-pointer hover:bg-gray-700/50 transition-all">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-selectrik-gold" />
                  <div>
                    <div className="font-semibold text-white">Documentație Prosumator</div>
                    <div className="text-sm text-gray-400">+900 Lei</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={prosumatorDoc}
                  onChange={(e) => setProsumatorDoc(e.target.checked)}
                  className="w-5 h-5 accent-selectrik-gold cursor-pointer"
                />
              </label>
            </div>
          </motion.div>

        </div>

        {/* Right Column - Summary (Sticky) */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-24 space-y-6">
            
            {/* Summary Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-selectrik-gold/10 to-selectrik-blue/10 border-2 border-selectrik-gold/30 rounded-2xl p-6 shadow-xl"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Sumar Configurație</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between pb-3 border-b border-gray-700">
                  <span className="text-gray-300 text-sm">Putere sistem</span>
                  <span className="text-xl font-bold text-selectrik-gold">{systemPower.toFixed(1)} kW</span>
                </div>
                
                <div className="flex items-center justify-between pb-3 border-b border-gray-700">
                  <span className="text-gray-300 text-sm">Panouri ({panelQuality})</span>
                  <span className="font-semibold text-white">{numberOfPanels} buc</span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-gray-700">
                  <span className="text-gray-300 text-sm">Producție anuală</span>
                  <span className="font-semibold text-white">{(yearlyProduction * orientationFactor).toFixed(0)} kWh</span>
                </div>

                {batteryCapacity > 0 && (
                  <div className="flex items-center justify-between pb-3 border-b border-gray-700">
                    <span className="text-gray-300 text-sm">Baterii</span>
                    <span className="font-semibold text-white">{batteryCapacity} kWh</span>
                  </div>
                )}

                <div className="flex items-center justify-between pb-3 border-b border-gray-700">
                  <span className="text-gray-300 text-sm">Branșament</span>
                  <span className="font-semibold text-white capitalize">{phaseType}</span>
                </div>
              </div>

              {/* Total Cost */}
              <div className="bg-gradient-to-r from-selectrik-gold to-selectrik-gold rounded-xl p-6 mb-4 shadow-lg shadow-selectrik-gold/30">
                <div className="text-sm text-white/90 mb-1 font-medium">Preț Total Sistem</div>
                <div className="text-4xl font-black text-white mb-2">
                  {totalCost.toLocaleString()} Lei
                </div>
                <div className="text-sm text-white/90">
                  TVA inclus • Instalare inclusă
                </div>
              </div>

              {/* Savings */}
              <div className="bg-selectrik-blue/20 border border-selectrik-blue/40 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-selectrik-blue font-semibold text-sm">Economie lunară</span>
                  <span className="text-xl font-bold text-selectrik-gold">~{monthlySavings.toFixed(0)} Lei</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm flex items-center gap-1">
                    <TrendingDown className="w-4 h-4" />
                    Perioadă recuperare
                  </span>
                  <span className="font-bold text-white">{paybackYears.toFixed(1)} ani</span>
                </div>
              </div>

              {/* Delivery */}
              <div className="text-sm text-gray-400 text-center p-3 bg-gray-700/30 rounded-lg">
                <span className="font-semibold text-white">Durată estimată livrare:</span><br />
                3-5 zile lucrătoare de la semnarea contractului
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
};
