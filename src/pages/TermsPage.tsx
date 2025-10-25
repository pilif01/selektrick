import { motion } from 'framer-motion';
import { FileText, Shield, Cookie, Users, Eye, Lock } from 'lucide-react';
import { TextReveal } from '../components/TextReveal';

export const TermsPage = () => {
  const sections = [
    {
      icon: FileText,
      title: "Condiții Generale",
      content: "Conținutul site-ului și informațiile publicate pe site sunt informații de interes general despre serviciile oferite în domeniul instalațiilor electrice atât ale companiei cât și ale partenerilor săi, precum și alte informații considerate ca fiind de interes pentru utilizatorii site-ului selectrik.ro.",
      details: [
        "Informațiile pot fi modificate în orice moment de către SC Smart Elkiss SRL",
        "Deținătorul tuturor drepturilor de proprietate intelectuală asupra site-ului",
        "Utilizatorul are obligația de a respecta toate drepturile de proprietate intelectuală",
        "Preluarea și reproducerea se poate face doar cu acordul proprietarului"
      ]
    },
    {
      icon: Shield,
      title: "Limitarea Responsabilității",
      content: "SC Smart Elkiss SRL nu garantează că informațiile care apar pe acest site nu conțin erori, cu toate că depune toate eforturile pentru a transmite informații actualizate și exacte.",
      details: [
        "Informații actualizate și exacte",
        "Nu poate fi responsabilă legal pentru daune sau pagube",
        "Eforturi pentru transmiterea informațiilor corecte",
        "Utilizatorul este responsabil pentru interpretarea informațiilor"
      ]
    },
    {
      icon: Cookie,
      title: "Politica Cookie-urilor",
      content: "Prin navigarea pe website-ul www.selectrik.ro vă exprimați acordul cu privire la folosirea datelor stocate de cookies, acesta fiind un acord în sensul articolului 4 (51) din Legea nr. 506/2004.",
      details: [
        "Cookie-uri pentru experiență mai bună de navigare",
        "Fișiere temporare (per sesiune) și fixe",
        "Nu solicită informații cu caracter personal",
        "Configurarea browserului pentru gestionarea cookie-urilor"
      ]
    },
    {
      icon: Users,
      title: "Protecția Datelor",
      content: "În conformitate cu Regulamentul General privind Protecția Datelor și alte legi naționale ale statelor membre privind protecția datelor, responsabilul este SC Smart Elkiss SRL.",
      details: [
        "Prelucrarea datelor doar cu aprobarea utilizatorului",
        "Baza juridică conform RGDP",
        "Ștergerea datelor când scopul stocării expiră",
        "Logfiles cu adrese IP pseudonimizate"
      ]
    },
    {
      icon: Eye,
      title: "Google Analytics",
      content: "Website-ul nostru utilizează Google Analytics, un serviciu pentru analiza web, furnizat de Google. Google Analytics utilizează fișiere de tip cookie pentru a ajuta analiza utilizării site-ului.",
      details: [
        "Analiza comportamentului de navigare",
        "Informații despre tipul browser-ului și versiunea",
        "Sistemul de operare al utilizatorului",
        "Date și ora accesării site-ului"
      ]
    },
    {
      icon: Lock,
      title: "Securitate și Confidențialitate",
      content: "Datele cu caracter personal ale utilizatorilor sunt protejate prin mijloace tehnice și organizatorice adecvate. Implementăm măsuri de securitate pentru protejarea informațiilor.",
      details: [
        "Măsuri tehnice și organizatorice de securitate",
        "Pseudonimizarea datelor utilizatorilor",
        "Durata de păstrare limitată",
        "Dreptul la ștergerea datelor"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-transparent pt-40 pb-16">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-6xl font-bold text-white mb-4"
          >
            Termeni și Condiții
          </motion.h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '8rem' }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="h-1.5 bg-selectrik-gold mx-auto mb-6" 
          />
          <TextReveal 
            delay={0.6}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Politica de utilizare a site-ului și cookies - SC Smart Elkiss SRL
          </TextReveal>
        </motion.div>

        {/* Company Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto bg-gradient-to-br from-selectrik-blue to-selectrik-dark rounded-3xl p-8 mb-12 text-white"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-selectrik-gold">SC Smart Elkiss SRL</h2>
              <div className="space-y-2">
                <p><span className="font-semibold">CUI:</span> RO40535054</p>
                <p><span className="font-semibold">Reg. Com.:</span> J35/626/2019</p>
                <p><span className="font-semibold">Adresa:</span> Aleea Viilor nr. 24, Timișoara</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-selectrik-gold">Contact</h3>
              <div className="space-y-2">
                <p><span className="font-semibold">Telefon:</span> 0773 386 299</p>
                <p><span className="font-semibold">Email:</span> office@selectrik.ro</p>
                <p><span className="font-semibold">Website:</span> www.selectrik.ro</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Terms Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-selectrik-dark/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 group relative overflow-hidden h-full flex flex-col"
            >
              {/* Background gradient on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-selectrik-blue/5 to-selectrik-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />

              <div className="mb-6 relative">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="w-16 h-16 bg-gradient-to-br from-selectrik-blue to-selectrik-gold rounded-xl flex items-center justify-center relative z-10 shadow-lg"
                >
                  <section.icon className="w-8 h-8 text-white" />
                </motion.div>
                <motion.div
                  className="absolute top-0 left-0 w-16 h-16 bg-selectrik-gold/20 rounded-xl -z-10"
                  animate={{
                    x: [0, 6, 0],
                    y: [0, 6, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-selectrik-blue transition-colors duration-300">
                {section.title}
              </h3>
              
              <div className="flex-1 flex flex-col">
                <p className="text-gray-300 leading-relaxed mb-4 flex-1">
                  {section.content}
                </p>
                
                <div className="space-y-2">
                  {section.details.map((detail, detailIndex) => (
                    <motion.div
                      key={detailIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: (index * 0.1) + (detailIndex * 0.1) }}
                      className="flex items-start gap-2 text-sm text-gray-300"
                    >
                      <div className="w-1.5 h-1.5 bg-selectrik-gold rounded-full mt-2 flex-shrink-0"></div>
                      <span>{detail}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto bg-selectrik-dark/50 backdrop-blur-sm rounded-3xl p-8 shadow-lg"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            Informații Importante
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-selectrik-blue mb-3">Durata de Păstrare</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Logfiles: maximum 180 de zile</li>
                <li>• Mailserverlog: 7 zile</li>
                <li>• Apachelog: 6 luni</li>
                <li>• Backup: 14 zile în formă codată</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-selectrik-blue mb-3">Drepturile Utilizatorului</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Dreptul la informare</li>
                <li>• Dreptul la ștergerea datelor</li>
                <li>• Dreptul la portabilitatea datelor</li>
                <li>• Dreptul la opoziție</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">
            Această politică poate fi actualizată periodic. Vă recomandăm să consultați această pagină în mod regulat pentru a fi la curent cu orice modificări.
          </p>
          <p className="text-gray-400 text-xs mt-4">
            Ultima actualizare: {new Date().toLocaleDateString('ro-RO')}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

