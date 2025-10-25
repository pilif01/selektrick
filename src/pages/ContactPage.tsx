import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Facebook, MessageCircle, Instagram } from 'lucide-react';
import { Card3D } from '../components/Card3D';
import { TextReveal } from '../components/TextReveal';
import { MagneticButton } from '../components/MagneticButton';

export const ContactPage = () => {
  return (
    <div className="min-h-screen bg-transparent pt-40 pb-16">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h1 
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white via-selectrik-gold to-white bg-clip-text text-transparent"
          >
            contactează-ne
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '8rem' }}
            transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="h-1.5 bg-selectrik-gold mx-auto mb-6"
          />
          <TextReveal
            delay={0.6}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            suntem la un mesaj distanță și gata să devenim împreună o echipă
          </TextReveal>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-stretch">
          {/* Contact Form */}
          <Card3D>
            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.6 }}
              className="bg-selectrik-dark/60 backdrop-blur-sm border border-selectrik-gold/20 p-8 rounded-2xl shadow-xl"
            >
            <h3 className="text-3xl font-bold text-white mb-6">
              trimite-ne un mesaj
            </h3>
            
            <form className="space-y-6">
              <div>
                <label className="block text-gray-200 font-semibold mb-2">
                  nume complet
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border-2 border-selectrik-gold/30 rounded-full focus:border-selectrik-blue focus:outline-none transition-colors"
                  placeholder="Ion Popescu"
                />
              </div>

              <div>
                <label className="block text-gray-200 font-semibold mb-2">
                  email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border-2 border-selectrik-gold/30 rounded-full focus:border-selectrik-blue focus:outline-none transition-colors"
                  placeholder="ion.popescu@email.com"
                />
              </div>

              <div>
                <label className="block text-gray-200 font-semibold mb-2">
                  telefon
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border-2 border-selectrik-gold/30 rounded-full focus:border-selectrik-blue focus:outline-none transition-colors"
                  placeholder="+40 7XX XXX XXX"
                />
              </div>

              <div>
                <label className="block text-gray-200 font-semibold mb-2">
                  mesaj
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-selectrik-gold/30 rounded-full focus:border-selectrik-blue focus:outline-none transition-colors resize-none"
                  placeholder="Descrie proiectul tău..."
                />
              </div>

              <MagneticButton className="w-full bg-selectrik-blue hover:bg-selectrik-light text-white font-bold py-4 rounded-full transition-colors shadow-lg hover:shadow-selectrik-blue/50">
                trimite mesajul
              </MagneticButton>
            </form>
            </motion.div>
          </Card3D>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8 flex flex-col"
          >
            <div className="bg-gradient-to-br from-selectrik-blue to-selectrik-dark p-8 rounded-2xl shadow-xl text-white">
              <h3 className="text-3xl font-bold mb-6">
                informații de contact
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-selectrik-gold rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">telefon</h4>
                    <a href="tel:0773386299" className="text-gray-200 hover:text-selectrik-gold transition-colors">
                      0773 386 299
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-selectrik-gold rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">email</h4>
                    <a href="mailto:office@selectrik.ro" className="text-gray-200 hover:text-selectrik-gold transition-colors">
                      office@selectrik.ro
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-selectrik-gold rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">adresă</h4>
                    <p className="text-gray-200">
                      Aleea Viilor 24<br />
                      Timișoara, România
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-selectrik-gold rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">program</h4>
                    <p className="text-gray-200">Luni - Vineri: 08:00 - 18:00</p>
                    <p className="text-gray-200">Sâmbătă: 09:00 - 14:00</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8 pt-8 border-t border-white/20">
                <h4 className="font-bold mb-4">ne găsești și pe social media</h4>
                <div className="flex gap-3">
                  <a 
                    href="https://facebook.com/selectrik" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/10 hover:bg-selectrik-gold rounded-full flex items-center justify-center transition-colors group"
                  >
                    <Facebook className="w-6 h-6 group-hover:text-white transition-colors" />
                  </a>
                  <a 
                    href="https://wa.me/40773386299" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/10 hover:bg-selectrik-gold rounded-full flex items-center justify-center transition-colors group"
                  >
                    <MessageCircle className="w-6 h-6 group-hover:text-white transition-colors" />
                  </a>
                  <a 
                    href="https://instagram.com/selectrik" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/10 hover:bg-selectrik-gold rounded-full flex items-center justify-center transition-colors group"
                  >
                    <Instagram className="w-6 h-6 group-hover:text-white transition-colors" />
                  </a>
                </div>
              </div>
            </div>

            {/* Company Info */}
            <Card3D>
              <motion.div
                className="bg-selectrik-dark/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl"
              >
              <h4 className="text-2xl font-bold text-white mb-3">
                SMART ELKISS S.R.L.
              </h4>
              <p className="text-gray-300 mb-4">
                instalator autorizat ANRE pentru instalații electrice și sisteme fotovoltaice în Timișoara
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-selectrik-blue/10 text-selectrik-blue rounded-full text-sm font-semibold">
                  autorizat ANRE
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  certificat ISO
                </span>
              </div>
              </motion.div>
            </Card3D>

            <Card3D>
              <motion.div
                className="bg-selectrik-gold p-8 rounded-2xl shadow-xl"
              >
              <h4 className="text-2xl font-bold text-white mb-3">
                contactează-ne rapid
              </h4>
              <p className="text-white mb-4">
                răspundem prompt la toate solicitările tale
              </p>
              <a href="tel:0773386299">
                <MagneticButton className="bg-selectrik-dark hover:bg-selectrik-blue text-white font-bold py-3 px-6 rounded-full transition-colors w-full">
                  apelează acum: 0376 442 388
                </MagneticButton>
              </a>
              </motion.div>
            </Card3D>
          </motion.div>
        </div>

        {/* Map or Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-br from-selectrik-blue to-selectrik-dark rounded-3xl p-12 text-center text-white"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            credem că prin alegeri inteligente creăm un viitor mai bun!
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            oferim soluții personalizate, adaptate nevoilor și dorințelor tale.
            suntem aici pentru tine și gata să colaborăm în această misiune de a extinde accesul la energie.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
