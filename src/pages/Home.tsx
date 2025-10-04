import { motion, useScroll, useTransform } from 'framer-motion';
import { Logo } from '../components/Logo';
import { Testimonials } from '../components/Testimonials';
import { Spotlight } from '../components/Spotlight';
import { Zap, ArrowRight, Award, Clock, Users, ThumbsUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const features = [
  { icon: Award, title: 'Instalator Autorizat', value: 'ANRE' },
  { icon: Clock, title: 'Service', value: '24/7' },
  { icon: Users, title: 'Clienți Mulțumiți', value: '100%' },
  { icon: ThumbsUp, title: 'Instalații Certificate', value: 'Garanție' }
];

export const Home = () => {
  const { scrollY, scrollYProgress } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, -200]); // Hero se mișcă mult mai încet

  return (
    <div className="min-h-screen">
      {/* Hero Section - Slow parallax */}
      <motion.section 
        style={{ y: heroY }}
        className="sticky top-0 min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-selectrik-dark to-slate-900 pt-20 z-10"
      >
        {/* Spotlight Effect */}
        <Spotlight
          className="-top-40 left-0 md:-top-20 md:left-60"
          fill="white"
        />
        
        {/* Animated Blue Gradient Blob */}
        <motion.div 
          className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(43, 95, 165, 0.4) 0%, transparent 70%)',
            filter: 'blur(60px)'
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, 80, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Animated Gold Gradient Blob */}
        <motion.div 
          className="absolute bottom-0 right-0 w-[900px] h-[900px] rounded-full opacity-25"
          style={{
            background: 'radial-gradient(circle, rgba(232, 197, 71, 0.3) 0%, transparent 70%)',
            filter: 'blur(60px)'
          }}
          animate={{
            x: [0, -80, 0],
            y: [0, -60, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Subtle Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(232, 197, 71, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(43, 95, 165, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }}
        />
        
        {/* Floating Dots */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: i % 2 === 0 ? '#E8C547' : '#2B5FA5',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.1
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}

        {/* Content */}
        <div className="relative z-20 container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center">
            {/* Logo cu prezentare elegantă */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="mb-16 flex justify-center"
            >
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Glow ring pe hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ 
                    opacity: 0.3,
                    scale: 1.4 
                  }}
                  transition={{ duration: 0.4 }}
                  className="absolute -inset-12 bg-gradient-to-r from-selectrik-blue to-selectrik-gold rounded-full blur-3xl"
                />
                
                <motion.div
                  animate={{
                    filter: [
                      'drop-shadow(0 10px 30px rgba(11, 95, 165, 0.2))',
                      'drop-shadow(0 10px 50px rgba(232, 197, 71, 0.3))',
                      'drop-shadow(0 10px 30px rgba(11, 95, 165, 0.2))',
                    ],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Logo size="large" />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Heading cu animație elegantă și efect spotlight */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight lowercase relative"
              style={{
                background: 'linear-gradient(45deg, #E8C547, #ffffff, #E8C547)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'gradient-shift 6s ease infinite'
              }}
            >
              selectrik
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="h-1 w-80 bg-gradient-to-r from-transparent via-selectrik-gold to-transparent mx-auto mb-8"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-2xl md:text-3xl text-selectrik-gold mb-6 font-bold uppercase tracking-wider relative"
              style={{
                filter: 'drop-shadow(0 0 5px rgba(232, 197, 71, 0.4))',
                animation: 'text-pulse 6s ease-in-out infinite'
              }}
            >
              Puterea de a ilumina viitorul
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
              style={{
                textShadow: '0 0 5px rgba(255, 255, 255, 0.2)',
                animation: 'text-shimmer 8s ease-in-out infinite'
              }}
            >
              Instalații electrice în Timișoara, sisteme fotovoltaice, bransamente electrice, 
              verificare priză de pământ, dosar prosumator. Instalator autorizat ANRE.
            </motion.p>

            {/* CTA Buttons cu forma rotunjită */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="group px-10 py-4 bg-selectrik-gold hover:bg-yellow-400 text-selectrik-dark font-bold text-lg rounded-full transition-all duration-500 shadow-lg hover:shadow-selectrik-gold/50 flex items-center gap-3 relative overflow-hidden"
                >
                  <Zap className="w-6 h-6" />
                  <span className="relative z-10">Cere Ofertă</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.button>
              </Link>

              <Link to="/servicii">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="px-10 py-4 bg-transparent border-2 border-selectrik-gold hover:bg-selectrik-gold text-selectrik-gold hover:text-selectrik-dark font-bold text-lg rounded-full transition-all duration-500 hover:shadow-lg hover:shadow-selectrik-gold/30"
                >
                  Vezi Serviciile
                </motion.button>
              </Link>
            </motion.div>

          </div>
        </div>

      </motion.section>

      {/* Value Proposition - Slides over hero */}
      <section className="py-32 bg-white relative z-30">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="container mx-auto px-6 relative z-10"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-selectrik-dark mb-8"
            >
              Suntem aici pentru tine
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 mb-8 leading-relaxed"
            >
              și suntem încântați să colaborăm cu tine în această misiune de a extinde accesul la energie.
            </motion.p>
            
            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="text-center group"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-16 h-16 bg-selectrik-blue/20 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-selectrik-blue/30 transition-colors duration-300"
                  >
                    <feature.icon className="w-8 h-8 text-selectrik-blue" />
                  </motion.div>
                  <div className="text-2xl md:text-3xl font-bold text-selectrik-dark mb-2">
                    {feature.value}
                  </div>
                  <div className="text-gray-600 text-sm md:text-base">
                    {feature.title}
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-selectrik-blue to-selectrik-dark text-white p-8 rounded-2xl shadow-xl"
            >
              <p className="text-lg font-semibold mb-2">
                Credem că prin alegeri inteligente creăm un viitor mai bun!
              </p>
              <p className="text-gray-200">
                Oferim soluții personalizate, adaptate nevoilor și dorințelor tale.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Testimonials */}
      <div className="relative z-30 bg-slate-50">
        <Testimonials />
      </div>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-selectrik-blue to-selectrik-dark relative overflow-hidden z-30">
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0.7, 1], [0, -100]) }}
          className="absolute inset-0 opacity-10"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent transform rotate-12 scale-150" />
        </motion.div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="text-center text-white max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Contactează-ne
            </h2>
            <p className="text-xl mb-8 text-gray-200">
              Suntem la un mesaj distanță și gata să devenim împreună o echipă
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
          </motion.div>
        </div>
      </section>
    </div>
  );
};