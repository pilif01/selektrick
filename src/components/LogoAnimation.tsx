import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LogoAnimationProps {
  onComplete: () => void;
}

export const LogoAnimation = ({ onComplete }: LogoAnimationProps) => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 800); // Mai rapid

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2200); // Mai rapid

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-selectrik-dark to-slate-900"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Subtle animated background */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 1.5 }}
      >
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-selectrik-blue rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-selectrik-gold rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.1, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </motion.div>

      {/* Container centrat cu layout vertical */}
      <div className="flex flex-col items-center justify-center">
        {/* Logo - mișcare smooth cu bounce subtil */}
        <motion.div
          initial={{ scale: 0.3, opacity: 0, y: 30 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            y: showText ? -60 : 0
          }}
          transition={{ 
            duration: 0.8,
            type: "spring",
            stiffness: 200,
            damping: 25,
            delay: 0.2,
            y: {
              type: "spring",
              stiffness: 250,
              damping: 30,
              delay: showText ? 0.1 : 0
            }
          }}
          className="relative mb-8"
        >
          {/* Glow ring effect */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.8
            }}
            className="absolute -inset-8 bg-gradient-to-r from-selectrik-blue to-selectrik-gold rounded-full blur-2xl"
          />
          
          {/* Logo cu animație subtilă */}
          <motion.img
            src="/logo.png"
            alt="Selectrik Logo"
            className="h-32 w-auto relative z-10"
            animate={{
              filter: [
                'drop-shadow(0 0 20px rgba(11, 95, 165, 0.3))',
                'drop-shadow(0 0 40px rgba(232, 197, 71, 0.4))',
                'drop-shadow(0 0 20px rgba(11, 95, 165, 0.3))',
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.8
            }}
          />
        </motion.div>

        {/* Text Container - apare smooth */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ 
            opacity: showText ? 1 : 0, 
            y: showText ? 0 : 40,
            scale: showText ? 1 : 0.9
          }}
          transition={{ 
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="text-center"
        >
          <motion.h1 
            className="text-7xl font-bold text-white tracking-tight lowercase mb-4"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ 
              opacity: showText ? 1 : 0, 
              scale: showText ? 1 : 0.8,
              y: showText ? 0 : 20
            }}
            transition={{ 
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
              delay: showText ? 0.1 : 0
            }}
          >
            selectrik
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: showText ? 1 : 0, 
              y: showText ? 0 : 20
            }}
            transition={{ 
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
              delay: showText ? 0.2 : 0
            }}
            className="text-selectrik-gold text-lg tracking-wider font-semibold mb-6"
          >
            Puterea de a ilumina viitorul
          </motion.p>

          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ 
              width: showText ? '100%' : '0%', 
              opacity: showText ? 1 : 0
            }}
            transition={{ 
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              delay: showText ? 0.3 : 0
            }}
            className="h-0.5 bg-gradient-to-r from-transparent via-selectrik-gold to-transparent mx-auto"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};
