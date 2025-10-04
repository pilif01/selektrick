import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { LogoAnimation } from './components/LogoAnimation';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingActionButton } from './components/FloatingActionButton';
import { ScrollProgress } from './components/ScrollProgress';
import { PageTransition } from './components/PageTransition';
import { Home } from './pages/Home';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { ProjectsPage } from './pages/ProjectsPage';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/servicii" element={<PageTransition><ServicesPage /></PageTransition>} />
        <Route path="/proiecte" element={<PageTransition><ProjectsPage /></PageTransition>} />
        <Route path="/despre" element={<PageTransition><AboutPage /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [preloadContent, setPreloadContent] = useState(false);

  useEffect(() => {
    // Preload content in background after a short delay
    const preloadTimer = setTimeout(() => {
      setPreloadContent(true);
    }, 500); // Start preloading after 500ms

    return () => clearTimeout(preloadTimer);
  }, []);

  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      // Delay pentru a permite fade-out-ul intro să se termine
      setTimeout(() => setShowContent(true), 100);
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showIntro]);

  return (
    <Router>
      <AnimatePresence mode="wait">
        {showIntro ? (
          <LogoAnimation key="intro" onComplete={() => setShowIntro(false)} />
        ) : showContent ? (
          <motion.div 
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <ScrollProgress />
            <Navbar />
            <AnimatedRoutes />
            <Footer />
            <FloatingActionButton />
          </motion.div>
        ) : null}
      </AnimatePresence>
      
      {/* Preload content in background while intro is showing */}
      {showIntro && preloadContent && (
        <div style={{ position: 'fixed', top: '-9999px', left: '-9999px', visibility: 'hidden' }}>
          <Home />
        </div>
      )}
    </Router>
  );
}

export default App;
