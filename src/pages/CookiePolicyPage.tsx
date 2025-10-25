import { motion } from 'framer-motion';
import { Cookie, Shield, Settings, Eye, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CookiePolicyPage = () => {
  return (
    <div className="min-h-screen bg-transparent pt-32 pb-16">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-selectrik-dark/60 backdrop-blur-sm border border-selectrik-gold/20 rounded-xl text-gray-200 hover:border-selectrik-gold/50 hover:text-white transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Înapoi</span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-selectrik-blue to-selectrik-gold p-0.5 mb-6"
          >
            <div className="w-full h-full rounded-2xl bg-selectrik-dark flex items-center justify-center">
              <Cookie className="w-10 h-10 text-selectrik-gold" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-white via-selectrik-gold to-white bg-clip-text text-transparent"
          >
            Politica de Cookie-uri
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '8rem' }}
            transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="h-1.5 bg-selectrik-gold mx-auto mb-6"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-gray-300"
          >
            Ultima actualizare: {new Date().toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' })}
          </motion.p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="space-y-8"
        >
          {/* Introduction */}
          <section className="bg-selectrik-dark/40 backdrop-blur-sm border border-selectrik-gold/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Eye className="text-selectrik-gold" />
              Ce sunt cookie-urile?
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Cookie-urile sunt fișiere text de mici dimensiuni pe care site-urile web le salvează pe dispozitivul dumneavoastră (computer, telefon mobil sau alt dispozitiv). Acestea sunt utilizate pentru a face site-ul să funcționeze sau să funcționeze mai eficient, precum și pentru a furniza informații proprietarilor site-ului.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Cookie-urile ne ajută să înțelegem cum vizitatorii interactionează cu site-ul nostru, să îmbunătățim experiența utilizatorului și să personalizăm conținutul.
            </p>
          </section>

          {/* Types of Cookies */}
          <section className="bg-selectrik-dark/40 backdrop-blur-sm border border-selectrik-gold/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Settings className="text-selectrik-gold" />
              Tipuri de cookie-uri pe care le folosim
            </h2>

            <div className="space-y-6">
              {/* Essential Cookies */}
              <div className="border-l-4 border-selectrik-blue pl-6">
                <h3 className="text-xl font-bold text-white mb-2">Cookie-uri esențiale</h3>
                <p className="text-gray-300 leading-relaxed mb-2">
                  Aceste cookie-uri sunt necesare pentru funcționarea corespunzătoare a site-ului. Fără aceste cookie-uri, anumite funcționalități ale site-ului nu vor funcționa.
                </p>
                <p className="text-sm text-gray-400">
                  <strong>Exemple:</strong> Cookie-uri de sesiune, preferințe de limbă, stare de autentificare
                </p>
              </div>

              {/* Analytics Cookies */}
              <div className="border-l-4 border-selectrik-gold pl-6">
                <h3 className="text-xl font-bold text-white mb-2">Cookie-uri de analiză</h3>
                <p className="text-gray-300 leading-relaxed mb-2">
                  Aceste cookie-uri ne permit să înțelegem cum vizitatorii interacționează cu site-ul nostru, colectând și raportând informații în mod anonim. Acestea ne ajută să îmbunătățim funcționarea site-ului.
                </p>
                <p className="text-sm text-gray-400">
                  <strong>Exemple:</strong> Google Analytics, statistici de vizitare, rate de conversie
                </p>
              </div>

              {/* Functionality Cookies */}
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-xl font-bold text-white mb-2">Cookie-uri de funcționalitate</h3>
                <p className="text-gray-300 leading-relaxed mb-2">
                  Aceste cookie-uri permit site-ului să-și amintească alegerile pe care le faceți (cum ar fi numele de utilizator, limba sau regiunea în care vă aflați) și să ofere funcții îmbunătățite și mai personale.
                </p>
                <p className="text-sm text-gray-400">
                  <strong>Exemple:</strong> Preferințe salvate, setări personalizate
                </p>
              </div>

              {/* Marketing Cookies */}
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-xl font-bold text-white mb-2">Cookie-uri de marketing</h3>
                <p className="text-gray-300 leading-relaxed mb-2">
                  Aceste cookie-uri sunt utilizate pentru a urmări vizitatorii pe site-uri web. Intenția este de a afișa reclame care sunt relevante și captivante pentru utilizatorul individual.
                </p>
                <p className="text-sm text-gray-400">
                  <strong>Exemple:</strong> Cookie-uri de remarketing, publicitate personalizată
                </p>
              </div>
            </div>
          </section>

          {/* How to Control Cookies */}
          <section className="bg-selectrik-dark/40 backdrop-blur-sm border border-selectrik-gold/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Shield className="text-selectrik-gold" />
              Cum puteți controla cookie-urile
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Aveți dreptul de a decide dacă să acceptați sau să refuzați cookie-urile. Puteți exercita drepturile privind cookie-urile prin setarea sau modificarea controalelor browser-ului web.
            </p>
            <div className="bg-selectrik-blue/10 border border-selectrik-blue/30 rounded-xl p-6">
              <p className="text-gray-300 leading-relaxed mb-4">
                Majoritatea browserelor web acceptă automat cookie-urile, dar puteți de obicei să modificați setările browser-ului pentru a refuza cookie-urile dacă preferați. Dacă alegeți să refuzați cookie-urile, este posibil să nu puteți experimenta pe deplin funcțiile interactive ale site-ului nostru.
              </p>
              <p className="text-sm text-gray-400">
                Pentru mai multe informații despre cum să gestionați cookie-urile în browserul dvs., vizitați:
              </p>
              <ul className="text-sm text-selectrik-gold mt-2 space-y-1">
                <li>• Chrome: chrome://settings/cookies</li>
                <li>• Firefox: about:preferences#privacy</li>
                <li>• Safari: Preferințe → Confidențialitate</li>
                <li>• Edge: edge://settings/privacy</li>
              </ul>
            </div>
          </section>

          {/* Third Party Cookies */}
          <section className="bg-selectrik-dark/40 backdrop-blur-sm border border-selectrik-gold/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Cookie-uri terță parte</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Pe lângă propriile noastre cookie-uri, putem utiliza și diverse cookie-uri ale terților pentru a raporta statistici de utilizare ale site-ului, pentru a livra anunțuri pe și prin site, și așa mai departe.
            </p>
            <div className="space-y-3">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h4 className="font-bold text-white mb-2">Google Analytics</h4>
                <p className="text-sm text-gray-400">
                  Utilizăm Google Analytics pentru a analiza utilizarea site-ului nostru. Google Analytics generează informații statistice și de altă natură prin cookie-uri stocate pe computerele utilizatorilor.
                </p>
              </div>
            </div>
          </section>

          {/* Updates to Policy */}
          <section className="bg-selectrik-dark/40 backdrop-blur-sm border border-selectrik-gold/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Actualizări ale acestei politici</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Ne rezervăm dreptul de a actualiza această Politică de Cookie-uri din când în când pentru a reflecta modificări în tehnologie sau legislație. Vom afișa orice modificări pe această pagină.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Vă recomandăm să verificați periodic această pagină pentru a fi la curent cu orice modificări. Continuarea utilizării site-ului nostru după orice modificare a acestei politici va reprezenta acceptarea dumneavoastră a modificărilor respective.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-gradient-to-br from-selectrik-blue/10 to-selectrik-gold/10 border border-selectrik-gold/30 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Contact</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Dacă aveți întrebări despre Politica noastră de Cookie-uri, vă rugăm să ne contactați:
            </p>
            <div className="space-y-2 text-gray-300">
              <p><strong className="text-selectrik-gold">Email:</strong> contact@selectrik.ro</p>
              <p><strong className="text-selectrik-gold">Telefon:</strong> 0773 386 299</p>
              <p><strong className="text-selectrik-gold">Adresă:</strong> Timișoara, România</p>
            </div>
          </section>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-selectrik-blue to-selectrik-gold text-white font-bold rounded-full hover:shadow-lg hover:shadow-selectrik-gold/30 transition-all"
            >
              Înapoi la Pagina Principală
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

