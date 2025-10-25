import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { Menu, X, UserCircle, LogOut, LayoutDashboard, Phone } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InteractiveHoverButton } from './InteractiveHoverButton';
import { useAuth } from '../contexts/AuthContext';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
    };

    if (showUserDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserDropdown]);

  const links = [
    { to: '/', label: 'Acasă' },
    { to: '/despre', label: 'Despre Noi' },
    { to: '/servicii', label: 'Servicii' },
    { to: '/proiecte', label: 'Proiecte' },
    { to: '/proiectul-meu', label: 'Configurator' },
  ];

  const isActive = (path: string) => location.pathname === path;


  const handleUserClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      setShowUserDropdown(!showUserDropdown);
    }
  };

  const handleLogout = () => {
    logout();
    setShowUserDropdown(false);
    navigate('/');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-selectrik-dark/90 backdrop-blur-md shadow-lg border-b border-selectrik-gold/20'
          : 'bg-selectrik-dark/70 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Logo size="small" />
            </motion.div>
            <motion.span
              className="text-xl sm:text-2xl font-bold text-white group-hover:text-selectrik-gold transition-colors lowercase text-safe"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              selectrik
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-semibold text-sm lg:text-base xl:text-lg transition-all duration-300 relative group whitespace-nowrap ${
                  isActive(link.to)
                    ? 'text-selectrik-gold'
                    : 'text-gray-200 hover:text-selectrik-gold'
                }`}
              >
                {link.label}
                {isActive(link.to) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-selectrik-gold"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {!isActive(link.to) && (
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-selectrik-gold group-hover:w-full transition-all duration-300" />
                )}
              </Link>
            ))}

            {/* Login/Account Icon with Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <motion.div
                onClick={handleUserClick}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-200 hover:text-selectrik-gold transition-colors cursor-pointer"
              >
                <UserCircle size={28} />
              </motion.div>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {showUserDropdown && isAuthenticated && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-64 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl overflow-hidden z-50"
                  >
                    {/* User Info */}
                    <div className="p-4 border-b border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900">
                      <div className="flex items-center gap-3">
                        <div className="bg-selectrik-gold/20 p-2 rounded-full">
                          <UserCircle className="text-selectrik-gold" size={24} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-semibold truncate">{user?.email}</p>
                          {user?.phone_number && (
                            <div className="flex items-center gap-1 text-gray-400 text-sm mt-1">
                              <Phone size={12} />
                              <span>{user.phone_number}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      {isAdmin && (
                        <button
                          onClick={() => {
                            navigate('/admin/dashboard');
                            setShowUserDropdown(false);
                          }}
                          className="w-full px-4 py-3 text-left text-gray-200 hover:bg-gray-800 hover:text-selectrik-gold transition-colors flex items-center gap-3"
                        >
                          <LayoutDashboard size={18} />
                          <span>Dashboard Admin</span>
                        </button>
                      )}
                      
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-3 text-left text-gray-200 hover:bg-gray-800 hover:text-red-400 transition-colors flex items-center gap-3"
                      >
                        <LogOut size={18} />
                        <span>Deconectare</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Interactive Button */}
            <Link to="/contact" className="hidden lg:block">
              <InteractiveHoverButton variant="primary">
                <span className="hidden xl:inline">Solicită Ofertă</span>
                <span className="xl:hidden">Contact</span>
              </InteractiveHoverButton>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-selectrik-gold transition-colors flex-shrink-0"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden overflow-hidden border-t border-selectrik-gold/10 mt-3"
            >
              <div className="py-3 space-y-3">
                {links.map((link, index) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.to}
                      onClick={() => setIsOpen(false)}
                      className={`block font-semibold text-base sm:text-lg transition-colors py-1 text-safe ${
                        isActive(link.to)
                          ? 'text-selectrik-gold'
                          : 'text-gray-200 hover:text-selectrik-gold'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: links.length * 0.1 }}
                >
                  <div
                    onClick={() => {
                      handleUserClick();
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-2 font-semibold text-base sm:text-lg text-gray-200 hover:text-selectrik-gold transition-colors py-1 text-safe cursor-pointer"
                  >
                    <UserCircle size={20} className="flex-shrink-0" />
                    <span>{isAuthenticated ? (isAdmin ? 'Dashboard Admin' : 'Proiectele Mele') : 'Contul Meu'}</span>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (links.length + 1) * 0.1 }}
                >
                  <Link to="/contact" onClick={() => setIsOpen(false)}>
                    <InteractiveHoverButton variant="primary" className="w-full justify-center">
                      Solicită Ofertă
                    </InteractiveHoverButton>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};