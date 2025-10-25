import { Facebook, Instagram, Mail, Phone, MessageCircle, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Logo } from './Logo';

export const Footer = () => {
  return (
    <footer className="relative text-white overflow-hidden bg-selectrik-dark/10 backdrop-blur-lg border-t border-selectrik-gold/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-selectrik-blue/10 to-selectrik-gold/10 opacity-10" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-selectrik-blue rounded-full blur-3xl opacity-10" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-selectrik-gold rounded-full blur-3xl opacity-10" />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-8 sm:pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12">
            
            {/* Brand Section - Takes 5 columns */}
            <div className="lg:col-span-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="relative flex-shrink-0">
                  <Logo size="small" />
                  <div className="absolute -inset-2 bg-gradient-to-r from-selectrik-blue/30 to-selectrik-gold/30 rounded-full blur-lg"></div>
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold lowercase text-white mb-1">selectrik</h3>
                  <p className="text-selectrik-gold text-xs sm:text-sm font-medium text-safe">Puterea de a ilumina viitorul</p>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg max-w-md text-safe">
                Soluții electrice moderne pentru o lume mai bună. Instalator autorizat ANRE cu experiență în proiecte complexe.
              </p>
              
              <div className="bg-white/0 backdrop-blur-md rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 border border-selectrik-gold/20">
                <p className="text-xs sm:text-sm text-gray-300 mb-1 text-safe">SMART ELKISS S.R.L.</p>
                <p className="text-[10px] sm:text-xs text-gray-400 text-safe">Instalator autorizat ANRE</p>
              </div>
              
              {/* Social Media */}
              <div>
                <h5 className="font-semibold mb-3 sm:mb-4 text-selectrik-gold text-xs sm:text-sm uppercase tracking-wider">Urmărește-ne</h5>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <a 
                    href="https://facebook.com/selectrik" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-selectrik-blue to-selectrik-blue/80 hover:from-selectrik-gold hover:to-selectrik-gold/80 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300 group shadow-lg hover:shadow-selectrik-gold/25 hover:-translate-y-1"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:scale-110 transition-transform" />
                  </a>
                  <a 
                    href="https://wa.me/40773386299" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-green-600 hover:from-selectrik-gold hover:to-selectrik-gold/80 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300 group shadow-lg hover:shadow-selectrik-gold/25 hover:-translate-y-1"
                    aria-label="WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:scale-110 transition-transform" />
                  </a>
                  <a 
                    href="https://instagram.com/selectrik" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-pink-500 to-purple-600 hover:from-selectrik-gold hover:to-selectrik-gold/80 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300 group shadow-lg hover:shadow-selectrik-gold/25 hover:-translate-y-1"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:scale-110 transition-transform" />
                  </a>
                </div>
              </div>
            </div>

            {/* Navigation Section - Takes 3 columns */}
            <div className="lg:col-span-3">
              <div className="bg-white/0 backdrop-blur-md rounded-lg sm:rounded-xl p-4 sm:p-5 border border-selectrik-gold/20 h-full flex flex-col">
                <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-5 text-white flex items-center gap-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-selectrik-gold rounded-full flex-shrink-0"></div>
                  <span className="text-safe">Navigare</span>
                </h4>
                <ul className="space-y-2 sm:space-y-3 flex-1">
                  <li>
                    <Link to="/" className="text-sm sm:text-base text-gray-300 hover:text-selectrik-gold transition-colors flex items-center gap-2 group">
                      <div className="w-1 h-1 bg-gray-500 group-hover:bg-selectrik-gold rounded-full transition-colors flex-shrink-0"></div>
                      <span className="text-safe">Acasă</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/servicii" className="text-sm sm:text-base text-gray-300 hover:text-selectrik-gold transition-colors flex items-center gap-2 group">
                      <div className="w-1 h-1 bg-gray-500 group-hover:bg-selectrik-gold rounded-full transition-colors flex-shrink-0"></div>
                      <span className="text-safe">Servicii</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/proiecte" className="text-sm sm:text-base text-gray-300 hover:text-selectrik-gold transition-colors flex items-center gap-2 group">
                      <div className="w-1 h-1 bg-gray-500 group-hover:bg-selectrik-gold rounded-full transition-colors flex-shrink-0"></div>
                      <span className="text-safe">Proiecte</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/despre" className="text-sm sm:text-base text-gray-300 hover:text-selectrik-gold transition-colors flex items-center gap-2 group">
                      <div className="w-1 h-1 bg-gray-500 group-hover:bg-selectrik-gold rounded-full transition-colors flex-shrink-0"></div>
                      <span className="text-safe">Despre Noi</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-sm sm:text-base text-gray-300 hover:text-selectrik-gold transition-colors flex items-center gap-2 group">
                      <div className="w-1 h-1 bg-gray-500 group-hover:bg-selectrik-gold rounded-full transition-colors flex-shrink-0"></div>
                      <span className="text-safe">Contact</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Section - Takes 4 columns */}
            <div className="lg:col-span-4">
              <div className="bg-white/0 backdrop-blur-md rounded-lg sm:rounded-xl p-4 sm:p-5 border border-selectrik-gold/20 h-full flex flex-col">
                <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-5 text-white flex items-center gap-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-selectrik-gold rounded-full flex-shrink-0"></div>
                  <span className="text-safe">Contact</span>
                </h4>
                <div className="space-y-2 sm:space-y-3 flex-1">
                  <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white/0 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-selectrik-blue/20 rounded-lg flex items-center justify-center group-hover:bg-selectrik-gold/20 transition-colors flex-shrink-0">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-selectrik-blue group-hover:text-selectrik-gold transition-colors" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider text-safe">Telefon</p>
                      <a href="tel:0773386299" className="text-sm sm:text-base text-gray-200 hover:text-selectrik-gold transition-colors font-medium text-safe break-all">
                        0773 386 299
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white/0 rounded-lg hover:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-selectrik-blue/20 rounded-lg flex items-center justify-center group-hover:bg-selectrik-gold/20 transition-colors flex-shrink-0">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-selectrik-blue group-hover:text-selectrik-gold transition-colors" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider text-safe">Email</p>
                      <a href="mailto:office@selectrik.ro" className="text-xs sm:text-sm text-gray-200 hover:text-selectrik-gold transition-colors font-medium text-safe break-all">
                        office@selectrik.ro
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-white/0 rounded-lg">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-selectrik-blue/20 rounded-lg flex items-center justify-center mt-0.5 sm:mt-1 flex-shrink-0">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-selectrik-blue" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider text-safe">Adresă</p>
                      <p className="text-xs sm:text-sm text-gray-200 font-medium text-safe">Aleea Viilor 24, Timișoara</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-selectrik-gold/20 bg-selectrik-dark/10 backdrop-blur-md">
          <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-3 sm:gap-6">
              
              {/* Copyright & Created with */}
              <div className="flex flex-col lg:flex-row items-center gap-2 sm:gap-4 text-center lg:text-left">
                <p className="text-gray-400 text-xs sm:text-sm text-safe">
                  © 2025 selectrik.ro - toate drepturile rezervate
                </p>
                
                {/* Separator */}
                <div className="hidden lg:block w-px h-4 bg-gradient-to-b from-transparent via-selectrik-gold/50 to-transparent"></div>
                
                {/* Created with section */}
                <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
                  <span className="text-gray-400 text-xs sm:text-sm">created with</span>
                  <motion.span
                    className="text-selectrik-gold text-xs sm:text-sm"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    ♥
                  </motion.span>
                  <span className="text-gray-400 text-xs sm:text-sm">by</span>
                  <a 
                    href="https://blueprint-studio-works.ro" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-selectrik-gold hover:text-white transition-colors text-xs sm:text-sm font-medium hover:underline text-safe"
                  >
                    Blueprint Studio Works
                  </a>
                </div>
              </div>

              {/* Legal Links */}
              <div className="flex flex-wrap justify-center gap-3 sm:gap-6 text-xs sm:text-sm">
                <Link to="/termeni-si-conditii" className="text-gray-400 hover:text-selectrik-gold transition-colors hover:underline text-safe">
                  Termeni și condiții
                </Link>
                <a href="https://anpc.ro" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-selectrik-gold transition-colors hover:underline text-safe">
                  ANPC
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
