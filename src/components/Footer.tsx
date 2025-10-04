import { Facebook, Instagram, Mail, Phone, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-selectrik-dark to-slate-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Logo size="small" />
              <h3 className="text-2xl font-bold lowercase">selectrik</h3>
            </div>
            <p className="text-gray-400 leading-relaxed mb-4">
              Puterea de a ilumina viitorul. Soluții electrice moderne pentru o lume mai bună.
            </p>
            <p className="text-sm text-gray-500">
              SMART ELKISS S.R.L.<br />
              Instalator autorizat ANRE
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-selectrik-gold">Servicii</h4>
            <ul className="space-y-2">
              <li><Link to="/servicii" className="text-gray-400 hover:text-selectrik-gold transition-colors">Instalații Electrice</Link></li>
              <li><Link to="/servicii" className="text-gray-400 hover:text-selectrik-gold transition-colors">Energie Verde</Link></li>
              <li><Link to="/servicii" className="text-gray-400 hover:text-selectrik-gold transition-colors">Consultanță și Proiectare</Link></li>
              <li><Link to="/servicii" className="text-gray-400 hover:text-selectrik-gold transition-colors">Sisteme Fotovoltaice</Link></li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-selectrik-gold">Navigare</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-selectrik-gold transition-colors">Acasă</Link></li>
              <li><Link to="/despre" className="text-gray-400 hover:text-selectrik-gold transition-colors">Despre Noi</Link></li>
              <li><Link to="/proiecte" className="text-gray-400 hover:text-selectrik-gold transition-colors">Proiecte</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-selectrik-gold transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-selectrik-gold">Contact</h4>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2 text-gray-400">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href="tel:0376442388" className="hover:text-selectrik-gold transition-colors">
                  0376 442 388
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:office@selectrik.ro" className="hover:text-selectrik-gold transition-colors">
                  office@selectrik.ro
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <span className="text-gray-500">📍</span>
                <span>Aleea Viilor 24, Timișoara</span>
              </li>
            </ul>
            
            <div>
              <h5 className="font-semibold mb-3 text-sm">Ne găsești și pe social media</h5>
              <div className="flex gap-3">
                <a 
                  href="https://facebook.com/selectrik" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-selectrik-blue hover:bg-selectrik-gold rounded-full flex items-center justify-center transition-colors group"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5 group-hover:text-selectrik-dark transition-colors" />
                </a>
                <a 
                  href="https://wa.me/40376442388" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-selectrik-blue hover:bg-selectrik-gold rounded-full flex items-center justify-center transition-colors group"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-5 h-5 group-hover:text-selectrik-dark transition-colors" />
                </a>
                <a 
                  href="https://instagram.com/selectrik" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-selectrik-blue hover:bg-selectrik-gold rounded-full flex items-center justify-center transition-colors group"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 group-hover:text-selectrik-dark transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 selectrik.ro - toate drepturile rezervate
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-selectrik-gold transition-colors">
                Termeni și condiții
              </a>
              <a href="https://anpc.ro" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-selectrik-gold transition-colors">
                ANPC
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
