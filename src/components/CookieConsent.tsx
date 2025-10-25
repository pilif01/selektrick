import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Settings, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // Always true, can't be disabled
    analytics: true,
    functionality: true,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Show banner after a short delay
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const acceptAll = () => {
    const consent = {
      essential: true,
      analytics: true,
      functionality: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setShowBanner(false);
  };

  const acceptSelected = () => {
    const consent = {
      ...preferences,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setShowBanner(false);
  };

  const rejectAll = () => {
    const consent = {
      essential: true,
      analytics: false,
      functionality: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="container mx-auto max-w-6xl">
            <div className="bg-gradient-to-br from-gray-900 via-selectrik-dark to-gray-900 border border-selectrik-gold/30 rounded-2xl shadow-2xl backdrop-blur-lg overflow-hidden">
              {!showSettings ? (
                /* Main Banner */
                <div className="p-6 md:p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 bg-selectrik-gold/20 rounded-xl flex-shrink-0">
                      <Cookie className="w-6 h-6 text-selectrik-gold" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                        Folosim cookie-uri
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        Utilizăm cookie-uri pentru a îmbunătăți experiența ta pe site-ul nostru, pentru a analiza traficul și pentru a personaliza conținutul. 
                        Poți alege să accepți toate cookie-urile sau să le configurezi individual.
                      </p>
                      <Link to="/politica-cookies" className="text-selectrik-gold hover:text-selectrik-gold text-sm underline mt-2 inline-block">
                        Citește politica completă de cookie-uri
                      </Link>
                    </div>
                    <button
                      onClick={() => setShowBanner(false)}
                      className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-end">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={rejectAll}
                      className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-full transition-colors"
                    >
                      Refuză toate
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowSettings(true)}
                      className="px-6 py-3 bg-selectrik-blue/20 hover:bg-selectrik-blue/30 border border-selectrik-blue text-white font-semibold rounded-full transition-colors flex items-center gap-2"
                    >
                      <Settings size={18} />
                      Configurează
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={acceptAll}
                      className="px-6 py-3 bg-selectrik-gold hover:bg-selectrik-gold text-selectrik-dark font-bold rounded-full transition-colors flex items-center gap-2"
                    >
                      <Check size={18} />
                      Acceptă toate
                    </motion.button>
                  </div>
                </div>
              ) : (
                /* Settings Panel */
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-6 md:p-8"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                      <Settings className="text-selectrik-gold" />
                      Setări Cookie-uri
                    </h3>
                    <button
                      onClick={() => setShowSettings(false)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <div className="space-y-4 mb-6">
                    {/* Essential */}
                    <div className="bg-gray-800/50 rounded-xl p-4 flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-white mb-1">Cookie-uri esențiale</h4>
                        <p className="text-sm text-gray-400">
                          Necesare pentru funcționarea de bază a site-ului. Nu pot fi dezactivate.
                        </p>
                      </div>
                      <div className="flex items-center">
                        <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold">
                          Întotdeauna active
                        </div>
                      </div>
                    </div>

                    {/* Analytics */}
                    <div className="bg-gray-800/50 rounded-xl p-4 flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-white mb-1">Cookie-uri de analiză</h4>
                        <p className="text-sm text-gray-400">
                          Ne ajută să înțelegem cum vizitatorii interacționează cu site-ul.
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.analytics}
                          onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-selectrik-gold"></div>
                      </label>
                    </div>

                    {/* Functionality */}
                    <div className="bg-gray-800/50 rounded-xl p-4 flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-white mb-1">Cookie-uri de funcționalitate</h4>
                        <p className="text-sm text-gray-400">
                          Permit funcții îmbunătățite și personalizare.
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.functionality}
                          onChange={(e) => setPreferences({ ...preferences, functionality: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-selectrik-gold"></div>
                      </label>
                    </div>

                    {/* Marketing */}
                    <div className="bg-gray-800/50 rounded-xl p-4 flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-white mb-1">Cookie-uri de marketing</h4>
                        <p className="text-sm text-gray-400">
                          Utilizate pentru a afișa reclame relevante pentru tine.
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.marketing}
                          onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-selectrik-gold"></div>
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-end">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowSettings(false)}
                      className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-full transition-colors"
                    >
                      Înapoi
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={acceptSelected}
                      className="px-6 py-3 bg-selectrik-gold hover:bg-selectrik-gold text-selectrik-dark font-bold rounded-full transition-colors flex items-center gap-2"
                    >
                      <Check size={18} />
                      Salvează preferințele
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

