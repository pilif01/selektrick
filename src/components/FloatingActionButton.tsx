import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, X } from 'lucide-react';
import { useState } from 'react';

export const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { 
      icon: Phone, 
      label: 'Sună acum', 
      color: 'bg-green-500', 
      href: 'tel:0376442388' 
    },
    { 
      icon: MessageCircle, 
      label: 'WhatsApp', 
      color: 'bg-emerald-500', 
      href: 'https://wa.me/40376442388' 
    },
  ];

  return (
    <div className="fixed bottom-8 right-8 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-20 right-0 space-y-3"
          >
            {actions.map((action, index) => (
              <motion.a
                key={index}
                href={action.href}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1, x: -5 }}
                className={`${action.color} text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-3 group`}
              >
                <action.icon className="w-5 h-5" />
                <span className="font-semibold whitespace-nowrap">{action.label}</span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
        className="w-16 h-16 bg-selectrik-blue hover:bg-selectrik-light text-white rounded-full shadow-2xl flex items-center justify-center relative overflow-hidden group"
      >
        <motion.div
          className="absolute inset-0 bg-selectrik-gold"
          initial={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 2, opacity: 0.2 }}
          transition={{ duration: 0.4 }}
        />
        {isOpen ? <X className="w-7 h-7 relative z-10" /> : <Phone className="w-7 h-7 relative z-10" />}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 border-4 border-selectrik-blue rounded-full"
        />
      </motion.button>
    </div>
  );
};
