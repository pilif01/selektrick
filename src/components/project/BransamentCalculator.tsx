import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Home, Building2, Store, Calculator, CheckCircle, AlertCircle, Shield, FileText, Clock, MapPin, Ruler } from 'lucide-react';
import { useProjects } from '../../contexts/ProjectContext';

const POWER_PRESETS = [5, 10, 15, 20, 25, 30, 40, 50];

export const BransamentCalculator = () => {
  const { currentProject, updateProject } = useProjects();
  
  // Step 1: Client Details
  const [clientType, setClientType] = useState<'persoana_fizica' | 'companie'>('persoana_fizica');
  const [propertyType, setPropertyType] = useState<'casa' | 'apartament' | 'comercial'>('casa');
  
  // Step 2: Location & Distance
  const [address, setAddress] = useState('');
  const [distance, setDistance] = useState(50);
  const [terrainType, setTerrainType] = useState<'pamant' | 'asfalt' | 'beton'>('pamant');
  
  // Step 3: Power Requirements
  const [requestedPower, setRequestedPower] = useState(10);
  const [phase, setPhase] = useState<'monofazat' | 'trifazat'>('monofazat');
  const [voltage, setVoltage] = useState<'joasa' | 'medie'>('joasa');
  
  // Step 4: Additional Services
  const [includeGrounding, setIncludeGrounding] = useState(true);
  const [includeLightningRod, setIncludeLightningRod] = useState(false);
  const [includeVerification, setIncludeVerification] = useState(true);
  const [includeTableau, setIncludeTableau] = useState(true);
  
  // Step 5: Documentation
  const [documentation, setDocumentation] = useState(true);
  const [urgentProcessing, setUrgentProcessing] = useState(false);

  // Calculations
  const baseCost = propertyType === 'comercial' ? 3500 : propertyType === 'casa' ? 2500 : 1800;
  
  const terrainMultiplier = terrainType === 'asfalt' ? 1.3 : terrainType === 'beton' ? 1.5 : 1;
  const distanceCost = distance * 18 * terrainMultiplier;
  
  const powerCost = requestedPower * 85;
  const phaseCost = phase === 'trifazat' ? 800 : 0;
  const voltageCost = voltage === 'medie' ? 2000 : 0;
  
  const groundingCost = includeGrounding ? 1200 : 0;
  const lightningCost = includeLightningRod ? 2500 : 0;
  const verificationCost = includeVerification ? 350 : 0;
  const tableauCost = includeTableau ? 1500 : 0;
  
  const documentationCost = documentation ? 500 : 0;
  const urgentCost = urgentProcessing ? 800 : 0;
  
  const totalCost = baseCost + distanceCost + powerCost + phaseCost + voltageCost + 
                    groundingCost + lightningCost + verificationCost + tableauCost + 
                    documentationCost + urgentCost;
  
  const estimatedDays = urgentProcessing ? 15 : Math.ceil(20 + (distance / 15) + (propertyType === 'comercial' ? 10 : 0));
  
  const requirements = [
    'Act de proprietate',
    'Plan de situație/amplasament',
    'Carte funciară actualizată',
    'Acord vecini (dacă este cazul)',
    propertyType === 'comercial' ? 'Autorizație de construcție' : null,
    propertyType === 'comercial' ? 'CUI și date firmă' : 'CI/BI proprietar',
    voltage === 'medie' ? 'Aviz ISU' : null,
  ].filter(Boolean) as string[];

  // Save configuration to project when any value changes
  useEffect(() => {
    if (!currentProject) return;

    const metadata = {
      clientType,
      propertyType,
      address,
      distance,
      terrainType,
      requestedPower,
      phase,
      voltage,
      includeGrounding,
      includeLightningRod,
      includeVerification,
      includeTableau,
      documentation,
      urgentProcessing,
      totalCost: parseFloat(totalCost.toFixed(0)),
      estimatedDays,
    };

    const description = `Putere: ${requestedPower}kW, Distanță: ${distance}m, Tip: ${propertyType}`;
    
    updateProject(currentProject.id, { 
      description,
      metadata,
      rooms: [] // Keep rooms empty for bransament projects
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientType, propertyType, address, distance, terrainType, requestedPower, phase, voltage,
      includeGrounding, includeLightningRod, includeVerification, includeTableau, 
      documentation, urgentProcessing]);

  return (
    <div className="max-w-7xl mx-auto pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl mb-4 shadow-lg">
          <Zap className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-4xl font-bold text-white mb-2">Configurator Branșament Electric</h2>
        <p className="text-gray-400 text-lg">Configurează branșamentul electric pentru proprietatea ta</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Left Column - Configuration Steps */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 1. Client & Property Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4">Detalii Client & Imobil</h3>
            
            {/* Client Type */}
            <div className="mb-4">
              <label className="text-sm font-semibold text-gray-300 mb-2 block">Tip client</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setClientType('persoana_fizica')}
                  className={`p-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-3 ${
                    clientType === 'persoana_fizica'
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30'
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
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <Building2 className="w-5 h-5" />
                  Companie
                </button>
              </div>
            </div>

            {/* Property Type */}
            <div>
              <label className="text-sm font-semibold text-gray-300 mb-2 block">Tip imobil</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setPropertyType('casa')}
                  className={`p-4 rounded-xl font-semibold transition-all ${
                    propertyType === 'casa'
                      ? 'bg-gradient-to-r from-selectrik-blue to-blue-600 text-white shadow-lg shadow-selectrik-blue/30'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <Home className="w-5 h-5 mx-auto mb-1" />
                  <div className="text-sm">Casă</div>
                </button>
                <button
                  onClick={() => setPropertyType('apartament')}
                  className={`p-4 rounded-xl font-semibold transition-all ${
                    propertyType === 'apartament'
                      ? 'bg-gradient-to-r from-selectrik-blue to-blue-600 text-white shadow-lg shadow-selectrik-blue/30'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <Building2 className="w-5 h-5 mx-auto mb-1" />
                  <div className="text-sm">Apartament</div>
                </button>
                <button
                  onClick={() => setPropertyType('comercial')}
                  className={`p-4 rounded-xl font-semibold transition-all ${
                    propertyType === 'comercial'
                      ? 'bg-gradient-to-r from-selectrik-blue to-blue-600 text-white shadow-lg shadow-selectrik-blue/30'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <Store className="w-5 h-5 mx-auto mb-1" />
                  <div className="text-sm">Comercial</div>
                </button>
              </div>
            </div>
          </motion.div>

          {/* 2. Location & Distance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-green-500" />
              Locație & Distanță
            </h3>

            {/* Address */}
            <div className="mb-4">
              <label className="text-sm font-semibold text-gray-300 mb-2 block">
                Adresa proprietății (opțional)
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Strada, Număr, Oraș"
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Distance */}
            <div className="mb-4">
              <label className="text-sm font-semibold text-gray-300 flex items-center justify-between mb-2">
                <span>Distanță până la rețea (m)</span>
                <span className="text-green-500 font-bold text-xl">{distance} m</span>
              </label>
              <input
                type="range"
                min="10"
                max="200"
                step="5"
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>10m</span>
                <span>200m</span>
              </div>
            </div>

            {/* Terrain Type */}
            <div>
              <label className="text-sm font-semibold text-gray-300 mb-2 block">Tip teren de parcurs</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setTerrainType('pamant')}
                  className={`py-3 rounded-lg font-semibold transition-all ${
                    terrainType === 'pamant'
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Pământ
                  <div className="text-xs opacity-90">Standard</div>
                </button>
                <button
                  onClick={() => setTerrainType('asfalt')}
                  className={`py-3 rounded-lg font-semibold transition-all ${
                    terrainType === 'asfalt'
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Asfalt
                  <div className="text-xs opacity-90">+30%</div>
                </button>
                <button
                  onClick={() => setTerrainType('beton')}
                  className={`py-3 rounded-lg font-semibold transition-all ${
                    terrainType === 'beton'
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Beton
                  <div className="text-xs opacity-90">+50%</div>
                </button>
              </div>
            </div>
          </motion.div>

          {/* 3. Power Requirements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-selectrik-gold" />
              Cerințe de Putere
            </h3>

            {/* Power Selection */}
            <div className="mb-4">
              <label className="text-sm font-semibold text-gray-300 mb-3 block">
                Putere solicitată (kW)
              </label>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {POWER_PRESETS.map((power) => (
                  <button
                    key={power}
                    onClick={() => setRequestedPower(power)}
                    className={`py-3 px-2 rounded-lg font-bold text-sm transition-all ${
                      requestedPower === power
                        ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30 scale-105'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {power} kW
                  </button>
                ))}
              </div>

              {/* Custom Power Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>Putere personalizată</span>
                  <span className="text-green-500 font-bold text-lg">{requestedPower} kW</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={requestedPower}
                  onChange={(e) => setRequestedPower(Number(e.target.value))}
                  className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>5 kW</span>
                  <span>100 kW</span>
                </div>
              </div>
            </div>

            {/* Phase Type */}
            <div className="mb-4">
              <label className="text-sm font-semibold text-gray-300 mb-2 block">Tip alimentare</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPhase('monofazat')}
                  className={`p-4 rounded-xl font-semibold transition-all ${
                    phase === 'monofazat'
                      ? 'bg-gradient-to-r from-selectrik-blue to-blue-600 text-white shadow-lg shadow-selectrik-blue/30'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <div className="font-bold">Monofazat</div>
                  <div className="text-xs opacity-90">230V • până la 15kW</div>
                </button>
                <button
                  onClick={() => setPhase('trifazat')}
                  className={`p-4 rounded-xl font-semibold transition-all ${
                    phase === 'trifazat'
                      ? 'bg-gradient-to-r from-selectrik-blue to-blue-600 text-white shadow-lg shadow-selectrik-blue/30'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <div className="font-bold">Trifazat</div>
                  <div className="text-xs opacity-90">400V • peste 15kW</div>
                </button>
              </div>
            </div>

            {/* Voltage Level */}
            <div>
              <label className="text-sm font-semibold text-gray-300 mb-2 block">Nivel tensiune</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setVoltage('joasa')}
                  className={`p-4 rounded-xl font-semibold transition-all ${
                    voltage === 'joasa'
                      ? 'bg-gradient-to-r from-selectrik-gold to-selectrik-gold text-white shadow-lg shadow-selectrik-gold/30'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <div className="font-bold">Joasă Tensiune</div>
                  <div className="text-xs opacity-90">Uz casnic</div>
                </button>
                <button
                  onClick={() => setVoltage('medie')}
                  className={`p-4 rounded-xl font-semibold transition-all ${
                    voltage === 'medie'
                      ? 'bg-gradient-to-r from-selectrik-gold to-selectrik-gold text-white shadow-lg shadow-selectrik-gold/30'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <div className="font-bold">Medie Tensiune</div>
                  <div className="text-xs opacity-90">Uz industrial</div>
                </button>
              </div>
            </div>
          </motion.div>

          {/* 4. Additional Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4">Servicii Adiționale</h3>
            
            <div className="space-y-3">
              <label className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl cursor-pointer hover:bg-gray-700/50 transition-all">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-selectrik-blue" />
                  <div>
                    <div className="font-semibold text-white">Priză de pământ</div>
                    <div className="text-sm text-gray-400">Sistem împământare complet</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={includeGrounding}
                  onChange={(e) => setIncludeGrounding(e.target.checked)}
                  className="w-5 h-5 accent-green-500 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl cursor-pointer hover:bg-gray-700/50 transition-all">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-selectrik-gold" />
                  <div>
                    <div className="font-semibold text-white">Sistem Paratrasnet</div>
                    <div className="text-sm text-gray-400">Protecție împotriva trăsnetului</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={includeLightningRod}
                  onChange={(e) => setIncludeLightningRod(e.target.checked)}
                  className="w-5 h-5 accent-green-500 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl cursor-pointer hover:bg-gray-700/50 transition-all">
                <div className="flex items-center gap-3">
                  <Ruler className="w-5 h-5 text-green-500" />
                  <div>
                    <div className="font-semibold text-white">Măsurarea Împământării</div>
                    <div className="text-sm text-gray-400">Verificare și certificare</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={includeVerification}
                  onChange={(e) => setIncludeVerification(e.target.checked)}
                  className="w-5 h-5 accent-green-500 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl cursor-pointer hover:bg-gray-700/50 transition-all">
                <div className="flex items-center gap-3">
                  <Calculator className="w-5 h-5 text-selectrik-blue" />
                  <div>
                    <div className="font-semibold text-white">Tablou Electric de Branșament</div>
                    <div className="text-sm text-gray-400">Tablou complet echipat</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={includeTableau}
                  onChange={(e) => setIncludeTableau(e.target.checked)}
                  className="w-5 h-5 accent-green-500 cursor-pointer"
                />
              </label>
            </div>
          </motion.div>

          {/* 5. Documentation & Processing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-selectrik-gold" />
              Documentație & Procesare
            </h3>
            
            <div className="space-y-3">
              <label className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl cursor-pointer hover:bg-gray-700/50 transition-all">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-selectrik-blue" />
                  <div>
                    <div className="font-semibold text-white">Dosar Branșament Complet</div>
                    <div className="text-sm text-gray-400">Întocmire documentație completă</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={documentation}
                  onChange={(e) => setDocumentation(e.target.checked)}
                  className="w-5 h-5 accent-green-500 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl cursor-pointer hover:bg-gray-700/50 transition-all">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-selectrik-gold" />
                  <div>
                    <div className="font-semibold text-white">Procesare Urgentă</div>
                    <div className="text-sm text-gray-400">Reduce timpul cu ~40% | +800 Lei</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={urgentProcessing}
                  onChange={(e) => setUrgentProcessing(e.target.checked)}
                  className="w-5 h-5 accent-green-500 cursor-pointer"
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
              className="bg-gradient-to-br from-green-500/10 to-selectrik-blue/10 border-2 border-green-500/30 rounded-2xl p-6 shadow-xl"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Sumar Configurație</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between pb-3 border-b border-gray-700">
                  <span className="text-gray-300 text-sm">Tip imobil</span>
                  <span className="font-bold text-white capitalize">{propertyType}</span>
                </div>
                
                <div className="flex items-center justify-between pb-3 border-b border-gray-700">
                  <span className="text-gray-300 text-sm">Distanță rețea</span>
                  <span className="text-xl font-bold text-green-500">{distance} m</span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-gray-700">
                  <span className="text-gray-300 text-sm">Putere solicitată</span>
                  <span className="text-xl font-bold text-selectrik-gold">{requestedPower} kW</span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-gray-700">
                  <span className="text-gray-300 text-sm">Tip alimentare</span>
                  <span className="font-semibold text-white capitalize">{phase}</span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-gray-700">
                  <span className="text-gray-300 text-sm">Nivel tensiune</span>
                  <span className="font-semibold text-white">{voltage === 'joasa' ? 'Joasă' : 'Medie'}</span>
                </div>
              </div>

              {/* Services Included */}
              <div className="mb-6 p-4 bg-gray-700/30 rounded-xl">
                <h4 className="font-bold text-white mb-3 text-sm">Servicii incluse:</h4>
                <div className="space-y-2 text-sm">
                  {includeGrounding && (
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle className="w-4 h-4" />
                      <span>Priză de pământ</span>
                    </div>
                  )}
                  {includeLightningRod && (
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle className="w-4 h-4" />
                      <span>Paratrasnet</span>
                    </div>
                  )}
                  {includeVerification && (
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle className="w-4 h-4" />
                      <span>Măsurare & verificare</span>
                    </div>
                  )}
                  {includeTableau && (
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle className="w-4 h-4" />
                      <span>Tablou electric</span>
                    </div>
                  )}
                  {urgentProcessing && (
                    <div className="flex items-center gap-2 text-selectrik-gold">
                      <Clock className="w-4 h-4" />
                      <span>Procesare urgentă</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Total Cost */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 mb-4 shadow-lg shadow-green-500/30">
                <div className="text-sm text-white/90 mb-1 font-medium">Preț Total Branșament</div>
                <div className="text-4xl font-black text-white mb-2">
                  {totalCost.toLocaleString()} Lei
                </div>
                <div className="text-sm text-white/90">
                  TVA inclus • Manoperă inclusă
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-selectrik-blue/20 border border-selectrik-blue/40 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-selectrik-blue font-semibold text-sm flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Durată estimată
                  </span>
                  <span className="text-2xl font-bold text-white">{estimatedDays}</span>
                </div>
                <div className="text-xs text-gray-400">
                  zile lucrătoare de la depunerea dosarului
                </div>
              </div>

              {/* Documents Required */}
              <div className="mb-6 p-4 bg-selectrik-gold/10 border border-selectrik-gold/30 rounded-xl">
                <h4 className="font-bold text-white mb-2 text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-selectrik-gold" />
                  Documente necesare ({requirements.length})
                </h4>
                <div className="space-y-1">
                  {requirements.slice(0, 3).map((req, index) => (
                    <div key={index} className="text-xs text-gray-400">• {req}</div>
                  ))}
                  {requirements.length > 3 && (
                    <div className="text-xs text-gray-500">+ {requirements.length - 3} altele...</div>
                  )}
                </div>
              </div>

            </motion.div>

            {/* Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-selectrik-blue/10 border border-selectrik-blue/30 rounded-xl p-4"
            >
              <h4 className="font-bold text-white mb-2 text-sm">💡 Informații Utile</h4>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• Gestionăm întregul proces cu furnizorul</li>
                <li>• Documentație completă inclusă</li>
                <li>• Instalator autorizat ANRE</li>
                <li>• Garanție pentru lucrări</li>
              </ul>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
};

