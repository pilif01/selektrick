import { motion } from 'framer-motion';
import { Spotlight } from '../components/Spotlight';
import { TextReveal } from '../components/TextReveal';
import { Zap, ArrowRight, Phone, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
// import { cn } from '@/lib/utils';

export const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Optimized for Mobile */}
      <section
        className="min-h-screen flex items-center justify-center overflow-hidden relative pt-20 pb-10 md:pb-0 z-0"
      >
        {/* Animated Gradient Background */}
        <motion.div 
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(43, 95, 165, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(232, 197, 71, 0.15) 0%, transparent 50%), linear-gradient(135deg, #0a0f1a 0%, #1a2332 50%, #0f1820 100%)',
              'radial-gradient(circle at 80% 50%, rgba(43, 95, 165, 0.15) 0%, transparent 50%), radial-gradient(circle at 20% 50%, rgba(232, 197, 71, 0.15) 0%, transparent 50%), linear-gradient(135deg, #1a2332 0%, #0a0f1a 50%, #1a2332 100%)',
              'radial-gradient(circle at 20% 50%, rgba(43, 95, 165, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(232, 197, 71, 0.15) 0%, transparent 50%), linear-gradient(135deg, #0a0f1a 0%, #1a2332 50%, #0f1820 100%)',
            ]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Spotlight Effect */}
        <Spotlight
          className="-top-40 left-0 md:-top-20 md:left-60"
          fill="white"
        />
        
        {/* Animated Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(43, 95, 165, 0.3) 0%, transparent 70%)',
            filter: 'blur(80px)'
          }}
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -80, 40, 0],
            scale: [1, 1.3, 0.9, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(232, 197, 71, 0.25) 0%, transparent 70%)',
            filter: 'blur(80px)'
          }}
          animate={{
            x: [0, -100, 60, 0],
            y: [0, 80, -40, 0],
            scale: [1.2, 0.9, 1.3, 1.2],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />

        {/* Geometric Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(232, 197, 71, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(43, 95, 165, 0.2) 1px, transparent 1px),
              linear-gradient(rgba(232, 197, 71, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(43, 95, 165, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px'
          }}
        />
        
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              background: i % 3 === 0 ? '#E8E683' : i % 3 === 1 ? '#2B5FA5' : '#ffffff',
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.3 + 0.1
            }}
            animate={{
              y: [0, -Math.random() * 100 - 50, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0.1, 0.4, 0.1],
              scale: [1, Math.random() + 0.5, 1],
            }}
            transition={{
              duration: Math.random() * 8 + 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3
            }}
          />
        ))}

        {/* Content - Mobile Optimized */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 h-full flex items-center">
          <div className="max-w-5xl mx-auto w-full text-center">
            
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-selectrik-gold/10 border border-selectrik-gold/30 rounded-full mb-6 md:mb-8 backdrop-blur-sm"
            >
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-selectrik-gold" />
              <span className="text-selectrik-gold font-semibold text-xs sm:text-sm">instalator autorizat ANRE</span>
            </motion.div>

            {/* Main Heading with Unique Typography - Larger on Mobile */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-5 md:mb-8"
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.25] mb-4 px-2">
                <span className="block text-white">
                  puterea de a
                </span>
                <span className="block relative inline-block">
                  <motion.span
                    className="relative z-10"
                    style={{
                      background: 'linear-gradient(135deg, #E8E683 0%, #E8E683 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    ilumina
                  </motion.span>
                  {/* Underline effect */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="absolute -bottom-1 md:-bottom-2 left-0 right-0 h-2 md:h-3 bg-selectrik-gold/30 -z-10"
                    style={{ transformOrigin: 'left' }}
                  />
                </span>
                {' '}
                <span className="text-white">viitorul</span>
              </h1>
            </motion.div>

            {/* Subtitle - Larger on Mobile */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 md:mb-12 max-w-3xl mx-auto font-light leading-relaxed px-2"
            >
              transformăm energia în soluții durabile pentru casa ta.
              <span className="block mt-2 md:mt-3 text-selectrik-gold font-medium text-base sm:text-lg md:text-xl">
                instalații electrice • fotovoltaice • branșamente
              </span>
            </motion.p>

            {/* CTA Buttons - Side by Side on Mobile, Smaller */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-row gap-2 sm:gap-4 justify-center items-center mb-8 md:mb-16 px-4"
            >
              <Link to="/contact" className="flex-1 sm:flex-initial">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full group px-4 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-selectrik-gold to-selectrik-gold hover:from-selectrik-gold hover:to-selectrik-gold text-selectrik-dark font-black text-sm sm:text-lg rounded-full shadow-2xl hover:shadow-[0_20px_60px_rgba(232,230,131,0.6)] transition-all duration-300 flex items-center justify-center gap-2"
                  style={{
                    boxShadow: '0 10px 40px rgba(232, 230, 131, 0.4)'
                  }}
                >
                  <span className="whitespace-nowrap hidden sm:inline">cere ofertă gratuită</span>
                  <span className="whitespace-nowrap sm:hidden font-black">ofertă gratuită</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                </motion.button>
              </Link>

              <Link to="/servicii" className="flex-1 sm:flex-initial">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-3 sm:px-8 py-3 sm:py-4 bg-white/5 hover:bg-white/10 border-2 border-white/30 hover:border-selectrik-gold/60 text-white font-semibold text-sm sm:text-lg rounded-full backdrop-blur-sm transition-all duration-300"
                >
                  <span className="hidden sm:inline">descoperă serviciile</span>
                  <span className="sm:hidden">servicii</span>
                </motion.button>
              </Link>
            </motion.div>

          </div>
        </div>

      </section>

      {/* Value Proposition - Slides over hero */}
      <section className="py-32 bg-gradient-to-b from-[#1a2332] via-[#0f1820] to-[#1a2332] relative z-10 overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(232, 197, 71, 0.3) 0%, transparent 70%)',
            filter: 'blur(40px)'
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(43, 95, 165, 0.3) 0%, transparent 70%)',
            filter: 'blur(40px)'
          }}
          animate={{
            x: [0, -40, 0],
            y: [0, -50, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="container mx-auto px-6 relative z-10"
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '4rem' }}
                  transition={{ duration: 1, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="h-1 bg-selectrik-gold mb-6"
                />
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-6xl font-bold mb-6"
                  style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #E8E683 50%, #ffffff 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  suntem aici pentru tine.
                </motion.h2>
                <TextReveal
                  delay={0.4}
                  className="text-xl text-gray-300 leading-relaxed mb-6"
                >
                  și suntem încântați să colaborăm cu tine în această misiune de a extinde accesul la energie.
                </TextReveal>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="flex gap-4"
                >
                  <Link to="/proiecte">
                    <motion.button
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-selectrik-gold/10 border-2 border-selectrik-gold text-selectrik-gold hover:bg-selectrik-gold hover:text-white font-bold rounded-full transition-all duration-300 flex items-center gap-2"
                    >
                      vezi proiecte
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-selectrik-blue/20 to-selectrik-gold/20 rounded-3xl blur-3xl"
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div 
                  className="relative bg-gradient-to-br from-selectrik-blue/10 via-selectrik-dark/50 to-selectrik-gold/10 border border-selectrik-gold/30 rounded-2xl p-8 backdrop-blur-sm"
                  whileHover={{ 
                    scale: 1.02,
                    borderColor: 'rgba(232, 197, 71, 0.6)',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-selectrik-gold/20 rounded-xl">
                      <Zap className="w-8 h-8 text-selectrik-gold" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xl font-bold mb-2 text-white">
                        credem că prin alegeri inteligente creăm un viitor mai bun!
                      </p>
                      <p className="text-gray-200 leading-relaxed">
                        oferim soluții personalizate, adaptate nevoilor și dorințelor tale.
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-selectrik-gold/20">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-selectrik-gold mb-1">100+</div>
                      <div className="text-xs text-gray-400">proiecte</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-selectrik-gold mb-1">5+</div>
                      <div className="text-xs text-gray-400">ani experiență</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-selectrik-gold mb-1">5★</div>
                      <div className="text-xs text-gray-400">rating</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Testimonials removed per request */}

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden z-10 bg-[#1a2332]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Background Card */}
            <div className="bg-gradient-to-br from-slate-900 via-selectrik-dark to-slate-900 rounded-3xl p-12 md:p-16 relative overflow-hidden border border-white/10">
              
              {/* Animated Background Elements */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-selectrik-blue rounded-full blur-3xl"
              />
              <motion.div
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.2, 0.1, 0.2],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 4
                }}
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-selectrik-gold rounded-full blur-3xl"
              />
              
              {/* Content */}
              <div className="relative z-10 text-center text-white max-w-4xl mx-auto">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="mb-8"
                >
                  <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-selectrik-gold to-white bg-clip-text text-transparent">
                    contactează-ne
                  </h2>
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '8rem' }}
                    transition={{ duration: 1, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="h-1.5 bg-selectrik-gold mx-auto" 
                  />
                </motion.div>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="text-xl md:text-2xl mb-10 text-gray-300 leading-relaxed"
                >
                  suntem la un mesaj distanță și gata să devenim împreună o echipă
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                  <Link to="/contact">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      className="px-8 py-4 bg-gradient-to-r from-selectrik-gold to-selectrik-gold hover:from-selectrik-gold hover:to-selectrik-gold text-white font-bold text-lg rounded-full transition-all duration-500 shadow-xl hover:shadow-2xl inline-flex items-center gap-3 group relative overflow-hidden"
                    >
                      <span className="relative z-10">contactează-ne acum</span>
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
                      <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
                    </motion.button>
                  </Link>
                  
                  <div className="flex gap-4">
                    <a 
                      href="tel:0773386299"
                      className="w-14 h-14 bg-white/10 hover:bg-selectrik-gold rounded-full flex items-center justify-center transition-all duration-300 group backdrop-blur-sm border border-white/20"
                    >
                      <Phone className="w-6 h-6 text-white group-hover:text-white transition-colors" />
                    </a>
                    <a 
                      href="https://wa.me/40773386299"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 bg-white/10 hover:bg-green-500 rounded-full flex items-center justify-center transition-all duration-300 group backdrop-blur-sm border border-white/20"
                    >
                      <MessageCircle className="w-6 h-6 text-white group-hover:text-white transition-colors" />
                    </a>
                  </div>
                </motion.div>
                
                {/* Trust Indicators */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  viewport={{ once: true }}
                  className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-gray-400"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-selectrik-gold rounded-full"></div>
                    <span>instalator autorizat ANRE</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-selectrik-gold rounded-full"></div>
                    <span>răspuns în 24h</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-selectrik-gold rounded-full"></div>
                    <span>consultanță gratuită</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};