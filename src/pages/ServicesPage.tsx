import { motion } from 'framer-motion';
import { Zap, Home, Building2, Sun, Shield, Wrench, ArrowRight, FileCheck, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: Home,
    title: 'Instalații Electrice Rezidențiale',
    description: 'Instalații electrice complete în Timișoara pentru locuințe și apartamente. Instalator autorizat ANRE cu experiență vastă.',
    details: [
      'Instalații electrice complete',
      'Bransamente electrice',
      'Tablouri electrice moderne',
      'Verificare priză de pământ'
    ],
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: Sun,
    title: 'Sisteme Fotovoltaice',
    description: 'Instalare sisteme fotovoltaice pentru prosumatori. Dosar prosumator complet și consultanță pentru programul AFM.',
    details: [
      'Sisteme fotovoltaice complete',
      'Dosar prosumator',
      'Consultanță program AFM',
      'Montaj și service'
    ],
    color: 'from-yellow-500 to-orange-500'
  },
  {
    icon: Building2,
    title: 'Instalații Electrice Industriale',
    description: 'Soluții complete pentru instalații electrice industriale cu standarde înalte de siguranță și performanță.',
    details: [
      'Instalații industriale',
      'Proiectare complexă',
      'Automatizări industriale',
      'Mentenanță preventivă'
    ],
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: Shield,
    title: 'Sisteme de Detecție',
    description: 'Instalare și configurare sisteme de detecție incendiu și securitate pentru siguranța maximă.',
    details: [
      'Detectie incendiu',
      'Sisteme de securitate',
      'Alarme și senzori',
      'Monitorizare 24/7'
    ],
    color: 'from-red-500 to-red-600'
  },
  {
    icon: Leaf,
    title: 'Energie Verde',
    description: 'Soluții de energie verde și eficiență energetică pentru reducerea costurilor și protecția mediului.',
    details: [
      'Panouri solare',
      'Optimizare consum',
      'Consultanță energetică',
      'Soluții eco-friendly'
    ],
    color: 'from-green-500 to-emerald-600'
  },
  {
    icon: FileCheck,
    title: 'Consultanță și Proiectare',
    description: 'Servicii complete de consultanță și proiectare instalații electrice. Expertiză tehnică și documentație completă.',
    details: [
      'Proiectare instalații',
      'Consultanță tehnică',
      'Documentație ANRE',
      'Audit energetic'
    ],
    color: 'from-indigo-500 to-indigo-600'
  }
];

export const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-40 pb-16">
      <div className="container mx-auto px-6">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-6xl font-bold text-selectrik-dark mb-6"
          >
            Servicii Complete de Instalații Electrice
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '10rem' }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="h-1.5 bg-selectrik-gold mx-auto mb-8"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Instalator autorizat ANRE în Timișoara. Oferim soluții complete pentru instalații electrice, 
            sisteme fotovoltaice, bransamente electrice și verificare priză de pământ.
          </motion.p>
        </motion.div>

        {/* AFM Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="bg-gradient-to-r from-selectrik-gold to-yellow-400 rounded-3xl p-10 mb-20 text-center shadow-2xl relative overflow-hidden"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-white rounded-3xl"
          />
          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-selectrik-dark mb-4">
              🎉 Ai obținut un loc în Programul AFM?
            </h2>
            <p className="text-xl text-selectrik-dark mb-6">
              Solicită acum oferta ideală pentru sistemul tău fotovoltaic!
            </p>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="px-10 py-4 bg-selectrik-dark hover:bg-selectrik-blue text-white font-bold text-lg rounded-full transition-all duration-500 shadow-lg inline-flex items-center gap-3 group"
              >
                Cere Ofertă
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 group relative overflow-hidden"
            >
              {/* Background gradient on hover */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              />

              <div className="mb-6 relative">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center relative z-10 shadow-lg`}
                >
                  <service.icon className="w-8 h-8 text-white" />
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
              
              <h3 className="text-2xl font-bold text-selectrik-dark mb-4 group-hover:text-selectrik-blue transition-colors duration-300">
                {service.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                {service.description}
              </p>

              <ul className="space-y-3 mb-8">
                {service.details.map((detail, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + idx * 0.1, duration: 0.5 }}
                    className="flex items-center gap-3 text-sm text-gray-700"
                  >
                    <motion.div
                      whileHover={{ scale: 1.3 }}
                      className="w-2 h-2 bg-selectrik-gold rounded-full"
                    />
                    {detail}
                  </motion.li>
                ))}
              </ul>

              <Link to="/contact">
                <motion.div
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center text-selectrik-blue font-semibold group-hover:text-selectrik-gold transition-colors duration-300 cursor-pointer"
                >
                  Solicită ofertă
                  <ArrowRight className="ml-2 w-5 h-5" />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Trust Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="mt-24 bg-white rounded-3xl p-12 text-center shadow-2xl"
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-selectrik-dark mb-6">
              Instalator Autorizat ANRE
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Servicii complete de instalații electrice în Timișoara. Lucrăm cu cele mai înalte 
              standarde de calitate și siguranță pentru fiecare proiect.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold text-gray-700">
              {['Autorizat ANRE', 'Instalații Certificate', 'Garanție Extinsă', 'Service 24/7'].map((badge, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="px-6 py-3 bg-slate-100 rounded-full hover:bg-selectrik-blue hover:text-white transition-all duration-300"
                >
                  {badge}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-br from-selectrik-blue to-selectrik-dark rounded-3xl p-12 text-center text-white relative overflow-hidden"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
            }}
            className="absolute top-0 right-0 w-96 h-96 bg-selectrik-gold rounded-full blur-3xl"
          />
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-6">
              Suntem aici pentru tine
            </h2>
            <p className="text-xl mb-8 text-gray-200">
              Contactează-ne pentru soluții personalizate, adaptate nevoilor și dorințelor tale.
            </p>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="px-10 py-4 bg-selectrik-gold hover:bg-yellow-400 text-selectrik-dark font-bold text-lg rounded-full transition-all duration-500 shadow-lg hover:shadow-2xl inline-flex items-center gap-3 group"
              >
                Contactează-ne Acum
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
