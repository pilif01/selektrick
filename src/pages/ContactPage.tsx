import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Facebook, MessageCircle, Instagram } from 'lucide-react';

export const ContactPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-40 pb-16">
      <div className="container mx-auto px-6">
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
            className="text-5xl md:text-6xl font-bold text-selectrik-dark mb-4"
          >
            Contactează-ne
          </motion.h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '8rem' }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="h-1.5 bg-selectrik-gold mx-auto mb-6" 
          />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Suntem la un mesaj distanță și gata să devenim împreună o echipă
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-2xl shadow-xl"
          >
            <h3 className="text-3xl font-bold text-selectrik-dark mb-6">
              Trimite-ne un mesaj
            </h3>
            
            <form className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Nume Complet
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-full focus:border-selectrik-blue focus:outline-none transition-colors"
                  placeholder="Ion Popescu"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-full focus:border-selectrik-blue focus:outline-none transition-colors"
                  placeholder="ion.popescu@email.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Telefon
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-full focus:border-selectrik-blue focus:outline-none transition-colors"
                  placeholder="+40 7XX XXX XXX"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Mesaj
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-full focus:border-selectrik-blue focus:outline-none transition-colors resize-none"
                  placeholder="Descrie proiectul tău..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-selectrik-blue hover:bg-selectrik-light text-white font-bold py-4 rounded-full transition-colors shadow-lg hover:shadow-selectrik-blue/50"
              >
                Trimite Mesajul
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-br from-selectrik-blue to-selectrik-dark p-8 rounded-2xl shadow-xl text-white">
              <h3 className="text-3xl font-bold mb-6">
                Informații de Contact
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-selectrik-gold rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-selectrik-dark" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Telefon</h4>
                    <a href="tel:0376442388" className="text-gray-200 hover:text-selectrik-gold transition-colors">
                      0376 442 388
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-selectrik-gold rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-selectrik-dark" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Email</h4>
                    <a href="mailto:office@selectrik.ro" className="text-gray-200 hover:text-selectrik-gold transition-colors">
                      office@selectrik.ro
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-selectrik-gold rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-selectrik-dark" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Adresă</h4>
                    <p className="text-gray-200">
                      Aleea Viilor 24<br />
                      Timișoara, România
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-selectrik-gold rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-selectrik-dark" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Program</h4>
                    <p className="text-gray-200">Luni - Vineri: 08:00 - 18:00</p>
                    <p className="text-gray-200">Service disponibil 24/7</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8 pt-8 border-t border-white/20">
                <h4 className="font-bold mb-4">Ne găsești și pe social media</h4>
                <div className="flex gap-3">
                  <a 
                    href="https://facebook.com/selectrik" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/10 hover:bg-selectrik-gold rounded-full flex items-center justify-center transition-colors group"
                  >
                    <Facebook className="w-6 h-6 group-hover:text-selectrik-dark transition-colors" />
                  </a>
                  <a 
                    href="https://wa.me/40376442388" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/10 hover:bg-selectrik-gold rounded-full flex items-center justify-center transition-colors group"
                  >
                    <MessageCircle className="w-6 h-6 group-hover:text-selectrik-dark transition-colors" />
                  </a>
                  <a 
                    href="https://instagram.com/selectrik" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/10 hover:bg-selectrik-gold rounded-full flex items-center justify-center transition-colors group"
                  >
                    <Instagram className="w-6 h-6 group-hover:text-selectrik-dark transition-colors" />
                  </a>
                </div>
              </div>
            </div>

            {/* Company Info */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white p-8 rounded-2xl shadow-xl"
            >
              <h4 className="text-2xl font-bold text-selectrik-dark mb-3">
                SMART ELKISS S.R.L.
              </h4>
              <p className="text-gray-600 mb-4">
                Instalator autorizat ANRE pentru instalații electrice și sisteme fotovoltaice în Timișoara
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-selectrik-blue/10 text-selectrik-blue rounded-full text-sm font-semibold">
                  Autorizat ANRE
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  Certificat ISO
                </span>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-selectrik-gold p-8 rounded-2xl shadow-xl"
            >
              <h4 className="text-2xl font-bold text-selectrik-dark mb-3">
                Service Disponibil 24/7
              </h4>
              <p className="text-selectrik-dark mb-4">
                Oferim servicii de urgență non-stop pentru situații critice
              </p>
              <a href="tel:0376442388">
                <button className="bg-selectrik-dark hover:bg-selectrik-blue text-white font-bold py-3 px-6 rounded-full transition-colors w-full">
                  Apelează Acum: 0376 442 388
                </button>
              </a>
            </motion.div>
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
          <h2 className="text-4xl font-bold mb-4">
            Credem că prin alegeri inteligente creăm un viitor mai bun!
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Oferim soluții personalizate, adaptate nevoilor și dorințelor tale. 
            Suntem aici pentru tine și gata să colaborăm în această misiune de a extinde accesul la energie.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
