import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { LogoAnimation } from './components/LogoAnimation';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingActionButton } from './components/FloatingActionButton';
import { ScrollProgress } from './components/ScrollProgress';
import { PageTransition } from './components/PageTransition';
import { AnimatedBackground } from './components/AnimatedBackground';
import { AuthProvider } from './contexts/AuthContext';
import { ProjectProvider } from './contexts/ProjectContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Home } from './pages/Home';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectRoadmapPage } from './pages/ProjectRoadmapPage';
import { TermsPage } from './pages/TermsPage';
import { LoginPage } from './pages/LoginPage';
import { MyProjectsPage } from './pages/MyProjectsPage';
import { ProjectEditorPage } from './pages/ProjectEditorPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { CookiePolicyPage } from './pages/CookiePolicyPage';
import { CookieConsent } from './components/CookieConsent';

function ScrollToTop() {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);
  
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  const isProjectEditor = location.pathname.startsWith('/proiectul-meu/') && location.pathname.split('/').length > 2;

  return (
    <>
      <ScrollToTop />
      {!isProjectEditor && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/servicii" element={<PageTransition><ServicesPage /></PageTransition>} />
          <Route path="/proiecte" element={<PageTransition><ProjectsPage /></PageTransition>} />
          <Route path="/proiecte/:id/roadmap" element={<PageTransition><ProjectRoadmapPage /></PageTransition>} />
          <Route path="/despre" element={<PageTransition><AboutPage /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
          <Route path="/termeni-si-conditii" element={<PageTransition><TermsPage /></PageTransition>} />
          <Route path="/politica-cookies" element={<PageTransition><CookiePolicyPage /></PageTransition>} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/proiectul-meu"
            element={
              <ProtectedRoute>
                <MyProjectsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/proiectul-meu/:id"
            element={
              <ProtectedRoute>
                <ProjectEditorPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute requireAdmin>
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
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
    }, 300); // Start preloading after 300ms (faster)

    return () => clearTimeout(preloadTimer);
  }, []);

  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      // Delay pentru a permite fade-out-ul intro să se termine
      setTimeout(() => setShowContent(true), 0);
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showIntro]);

  return (
    <Router>
      <AuthProvider>
        <ProjectProvider>
          <AnimatePresence mode="wait">
            {showIntro ? (
              <LogoAnimation key="intro" onComplete={() => setShowIntro(false)} />
            ) : showContent ? (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <AnimatedBackground />
                <ScrollProgress />
                <AnimatedRoutes />
                <Footer />
                <FloatingActionButton />
                <CookieConsent />
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* Preload content in background while intro is showing */}
          {showIntro && preloadContent && (
            <div style={{ position: 'fixed', top: '-9999px', left: '-9999px', visibility: 'hidden' }}>
              <Home />
            </div>
          )}
        </ProjectProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
