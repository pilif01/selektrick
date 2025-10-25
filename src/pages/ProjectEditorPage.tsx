import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Undo2, Redo2, Send, CheckCircle } from 'lucide-react';
import { useProjects } from '../contexts/ProjectContext';
import { useAuth } from '../contexts/AuthContext';
import { PageTransition } from '../components/PageTransition';
import { PhoneNumberModal } from '../components/PhoneNumberModal';
import { TestVersionPopup } from '../components/TestVersionPopup';
import { ProjectCanvas } from '../components/project/ProjectCanvas';
import { PriceCalculator } from '../components/project/PriceCalculator';
import { PowerCalculator } from '../components/project/PowerCalculator';
import { CarbonFootprintCalculator } from '../components/project/CarbonFootprintCalculator';
import { FotovoltaicCalculator } from '../components/project/FotovoltaicCalculator';
import { BransamentCalculator } from '../components/project/BransamentCalculator';
import { PROJECT_TYPES, ELECTRICAL_CATALOG } from '../types/project';
import jsPDF from 'jspdf';
import { API_BASE_URL } from '../config/api';

type Tab = 'canvas' | 'preturi' | 'calculatoare' | 'calculator';

export const ProjectEditorPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { projects, setCurrentProject, currentProject, undo, redo, canUndo, canRedo, saveProjectNow, getTotalPrice } = useProjects();
  const { token, user, updateUserPhone } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('calculator');
  const [saved, setSaved] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [showTestVersionPopup, setShowTestVersionPopup] = useState(false);

  useEffect(() => {
    const project = projects.find((p) => p.id === id);
    if (project) {
      setCurrentProject(project);
      // Set default tab based on project type - rezidential nu mai are tab-uri
      if (project.type !== 'rezidential') {
        setActiveTab('calculator');
      }
    } else {
      navigate('/proiectul-meu');
    }
  }, [id, projects, setCurrentProject, navigate]);

  // Keyboard shortcuts for undo/redo
  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, [undo, redo]);

  // Keep header always visible
  useEffect(() => {
    setHeaderVisible(true);
  }, []);

  // Check if user has seen the test version popup
  useEffect(() => {
    const hasSeenTestVersionPopup = localStorage.getItem('hasSeenTestVersionPopup');
    if (!hasSeenTestVersionPopup) {
      setShowTestVersionPopup(true);
    }
  }, []);

  if (!currentProject) {
    return null;
  }

  const projectType = PROJECT_TYPES.find(t => t.id === currentProject.type);
  const isResidential = currentProject.type === 'rezidential';

  const handleSave = async () => {
    // Check if user has phone number
    if (!user?.phone_number) {
      setShowPhoneModal(true);
      return;
    }

    try {
      await saveProjectNow();
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error('Eroare la salvare:', err);
    }
  };

  const handlePhoneSubmit = async (phoneNumber: string) => {
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE_URL}/auth/update-phone`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await response.json();

      if (response.ok) {
        updateUserPhone(phoneNumber);
        setShowPhoneModal(false);
        // Save project after phone is set
        await saveProjectNow();
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      } else {
        console.error('Failed to update phone:', data.error);
      }
    } catch (err) {
      console.error('Error updating phone:', err);
    }
  };

  const handleTestVersionPopupClose = () => {
    setShowTestVersionPopup(false);
    localStorage.setItem('hasSeenTestVersionPopup', 'true');
  };

  const removeDiacritics = (text: string): string => {
    const diacriticsMap: { [key: string]: string } = {
      'ă': 'a', 'â': 'a', 'î': 'i', 'ș': 's', 'ț': 't',
      'Ă': 'A', 'Â': 'A', 'Î': 'I', 'Ș': 'S', 'Ț': 'T'
    };
    return text.replace(/[ăâîșțĂÂÎȘȚ]/g, match => diacriticsMap[match] || match);
  };

  const generatePDFBase64 = (): string => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Background color for header
    doc.setFillColor(43, 95, 165);
    doc.rect(0, 0, pageWidth, 45, 'F');
    
    // Logo/Brand
    doc.setFontSize(28);
    doc.setTextColor(232, 230, 131);
    doc.setFont('helvetica', 'bold');
    doc.text('SELECTRIK', 20, 25);
    
    doc.setFontSize(11);
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'normal');
    doc.text(removeDiacritics('Instalatii Electrice Profesionale'), 20, 34);
    
    // Project Info Box
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(15, 50, pageWidth - 30, 40, 3, 3, 'F');
    
    // Project Title
    doc.setFontSize(18);
    doc.setTextColor(43, 95, 165);
    doc.setFont('helvetica', 'bold');
    doc.text(removeDiacritics(currentProject!.name), 20, 62);
    
    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    doc.setFont('helvetica', 'italic');
    doc.text(removeDiacritics(projectType?.name || currentProject!.type), 20, 70);
    
    // Client info
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(removeDiacritics(`Client: ${user?.email || ''}`), 20, 78);
    
    const dateText = removeDiacritics(`Generat la: ${new Date().toLocaleDateString('ro-RO', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })}`);
    doc.text(dateText, 20, 84);
    
    let yPos = 100;
    
    // Section Header Function
    const addSection = (title: string, y: number) => {
      doc.setFillColor(43, 95, 165);
      doc.rect(15, y - 5, pageWidth - 30, 10, 'F');
      doc.setFontSize(12);
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.text(removeDiacritics(title), 20, y + 2);
      doc.setFont('helvetica', 'normal');
      return y + 15;
    };
    
    // Add content based on project type (similar to MyProjectsPage logic)
    if (currentProject!.type === 'fotovoltaic' && currentProject!.metadata) {
      const meta = currentProject!.metadata;
      yPos = addSection('DETALII SISTEM FOTOVOLTAIC', yPos);
      
      const addDataRow = (label: string, value: string, y: number, highlight = false) => {
        if (highlight) {
          doc.setFillColor(255, 250, 205);
          doc.rect(15, y - 5, pageWidth - 30, 8, 'F');
        }
        doc.setFontSize(10);
        doc.setTextColor(80, 80, 80);
        doc.text(removeDiacritics(label), 20, y);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 0, 0);
        doc.text(removeDiacritics(value), 120, y);
        doc.setFont('helvetica', 'normal');
        return y + 8;
      };
      
      yPos = addDataRow('Putere sistem:', `${meta.systemPower || 0} kW`, yPos, true);
      yPos = addDataRow('Numar panouri:', `${meta.numberOfPanels || 0}`, yPos);
      yPos = addDataRow('Productie anuala estimata:', `${meta.yearlyProduction || 0} kWh`, yPos, true);
      yPos = addDataRow('Economie lunara:', `${meta.monthlySavings || 0} RON`, yPos);
      
      if (meta.batteryCapacity) {
        yPos = addDataRow('Capacitate baterii:', `${meta.batteryCapacity} kWh`, yPos, true);
      }
      
      yPos = addDataRow('Perioada de recuperare:', `${meta.paybackYears || 0} ani`, yPos, !meta.batteryCapacity);
      yPos += 5;
      
      doc.setFillColor(232, 230, 131);
      doc.roundedRect(15, yPos, pageWidth - 30, 15, 2, 2, 'F');
      doc.setFontSize(14);
      doc.setTextColor(43, 95, 165);
      doc.setFont('helvetica', 'bold');
      doc.text(removeDiacritics(`PRET TOTAL: ${meta.totalCost || 0} RON`), 20, yPos + 10);
      
    } else if (currentProject!.type === 'bransament' && currentProject!.metadata) {
      const meta = currentProject!.metadata;
      yPos = addSection('DETALII BRANSAMENT ELECTRIC', yPos);
      
      const addDataRow = (label: string, value: string, y: number, highlight = false) => {
        if (highlight) {
          doc.setFillColor(240, 255, 240);
          doc.rect(15, y - 5, pageWidth - 30, 8, 'F');
        }
        doc.setFontSize(10);
        doc.setTextColor(80, 80, 80);
        doc.text(removeDiacritics(label), 20, y);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 0, 0);
        doc.text(removeDiacritics(value), 120, y);
        doc.setFont('helvetica', 'normal');
        return y + 8;
      };
      
      yPos = addDataRow('Tip proprietate:', meta.propertyType || '-', yPos, true);
      yPos = addDataRow('Putere solicitata:', `${meta.requestedPower || 0} kW`, yPos);
      yPos = addDataRow('Distanta pana la retea:', `${meta.distance || 0} m`, yPos, true);
      yPos = addDataRow('Faza:', meta.phase || '-', yPos);
      yPos = addDataRow('Durata estimata:', `${meta.estimatedDays || 0} zile`, yPos, true);
      yPos += 5;
      
      doc.setFillColor(16, 185, 129);
      doc.roundedRect(15, yPos, pageWidth - 30, 15, 2, 2, 'F');
      doc.setFontSize(14);
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.text(removeDiacritics(`PRET TOTAL: ${meta.totalCost || 0} RON`), 20, yPos + 10);
      
    } else {
      // Rezidential
      const totalItems = currentProject!.rooms.reduce((sum, room) => sum + room.items.length, 0);
      const totalPrice = getTotalPrice(currentProject!.id);
      
      yPos = addSection('DETALII PROIECT REZIDENTIAL', yPos);
      
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      doc.text(removeDiacritics('Numar camere/spatii:'), 20, yPos);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text(`${currentProject!.rooms.length}`, 120, yPos);
      doc.setFont('helvetica', 'normal');
      yPos += 8;
      
      doc.setTextColor(80, 80, 80);
      doc.text(removeDiacritics('Total obiecte electrice:'), 20, yPos);
      doc.setFont('helvetica', 'bold');
      doc.text(`${totalItems}`, 120, yPos);
      yPos += 15;
      
      doc.setFillColor(43, 95, 165);
      doc.roundedRect(15, yPos, pageWidth - 30, 15, 2, 2, 'F');
      doc.setFontSize(14);
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.text(removeDiacritics(`PRET TOTAL ESTIMAT: ${totalPrice} RON`), 20, yPos + 10);
      yPos += 25;
      
      // Detailed rooms
      if (currentProject!.rooms.length > 0) {
        yPos = addSection('DETALII PE CAMERE', yPos);
        
        currentProject!.rooms.forEach((room) => {
          if (yPos > 250) {
            doc.addPage();
            yPos = 20;
          }
          
          doc.setFillColor(230, 230, 230);
          doc.roundedRect(15, yPos - 4, pageWidth - 30, 10, 2, 2, 'F');
          doc.setFontSize(11);
          doc.setTextColor(43, 95, 165);
          doc.setFont('helvetica', 'bold');
          doc.text(removeDiacritics(room.name), 20, yPos + 3);
          doc.setFont('helvetica', 'normal');
          yPos += 12;
          
          if (room.items && room.items.length > 0) {
            doc.setFontSize(9);
            room.items.forEach((item, index) => {
              if (yPos > 275) {
                doc.addPage();
                yPos = 20;
              }
              
              const catalogItem = ELECTRICAL_CATALOG.find(c => c.id === item.itemId);
              if (catalogItem) {
                const bgColor = index % 2 === 0 ? 250 : 255;
                doc.setFillColor(bgColor, bgColor, bgColor);
                doc.rect(18, yPos - 4, pageWidth - 36, 7, 'F');
                
                doc.setTextColor(0, 0, 0);
                doc.text(removeDiacritics(`• ${catalogItem.name}`), 22, yPos);
                doc.setTextColor(100, 100, 100);
                doc.text(`x${item.quantity || 1}`, pageWidth - 60, yPos);
                doc.setTextColor(43, 95, 165);
                doc.setFont('helvetica', 'bold');
                doc.text(`${catalogItem.price * (item.quantity || 1)} RON`, pageWidth - 40, yPos);
                doc.setFont('helvetica', 'normal');
                yPos += 7;
              }
            });
          } else {
            doc.setFontSize(9);
            doc.setTextColor(150, 150, 150);
            doc.text('Niciun obiect', 22, yPos);
            yPos += 7;
          }
          
          yPos += 5;
        });
      }
    }
    
    // Footer
    const footerY = 275;
    doc.setFillColor(43, 95, 165);
    doc.rect(0, footerY, pageWidth, 22, 'F');
    
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.text('SMART ELKISS S.R.L.', 20, footerY + 7);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(232, 230, 131);
    doc.text('Instalator autorizat ANRE', 20, footerY + 12);
    
    doc.setTextColor(255, 255, 255);
    doc.text('Tel: 0773 386 299  |  Email: contact@selectrik.ro', 20, footerY + 17);
    
    // Return as base64 string
    return doc.output('datauristring').split(',')[1];
  };

  const handleSubmit = async () => {
    if (!currentProject || !token || !user) return;
    
    setSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      // Get server project ID from local ID
      const serverProjectId = currentProject.id.startsWith('server-') 
        ? parseInt(currentProject.id.replace('server-', ''))
        : null;

      if (!serverProjectId) {
        throw new Error('Proiectul trebuie salvat mai întâi');
      }

      // Generate PDF
      const pdfBase64 = generatePDFBase64();

      const response = await fetch(`${API_BASE_URL}/projects/${serverProjectId}/submit`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pdfBase64,
          projectName: currentProject.name,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Eroare la trimiterea proiectului');
      }

      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Eroare la trimiterea proiectului');
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-selectrik-dark via-gray-900 to-black">
        {/* Header */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: headerVisible ? 0 : -100 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed top-0 left-0 right-0 z-30 bg-gradient-to-r from-gray-900/95 to-gray-800/95 backdrop-blur-md border-b border-gray-700 shadow-lg"
        >
          <div className="container mx-auto px-4 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/proiectul-meu')}
                  className="text-gray-400 hover:text-selectrik-gold transition-colors p-2 hover:bg-gray-700/50 rounded-lg"
                  title="Inapoi la proiecte"
                >
                  <ArrowLeft size={24} />
                </motion.button>
                <div>
                  <h1 className="text-lg md:text-xl font-bold text-white">
                    {currentProject.name}
                  </h1>
                  <p className="text-xs" style={{ color: projectType?.color || '#E8E683' }}>
                    {projectType?.name || currentProject.type}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Undo/Redo */}
                <div className="flex gap-1">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={undo}
                    disabled={!canUndo}
                    className={`p-2 rounded-lg transition-all ${
                      canUndo
                        ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                        : 'text-gray-600 cursor-not-allowed'
                    }`}
                    title="Undo (Ctrl+Z)"
                  >
                    <Undo2 size={16} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={redo}
                    disabled={!canRedo}
                    className={`p-2 rounded-lg transition-all ${
                      canRedo
                        ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                        : 'text-gray-600 cursor-not-allowed'
                    }`}
                    title="Redo (Ctrl+Y)"
                  >
                    <Redo2 size={16} />
                  </motion.button>
                </div>

                {/* Success/Error Messages */}
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 bg-green-500/20 text-green-400 px-3 py-1.5 rounded-lg text-sm"
                  >
                    <CheckCircle size={16} />
                    <span>Email-uri trimise cu succes!</span>
                  </motion.div>
                )}

                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSave}
                    className={`px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all ${
                      saved
                        ? 'bg-green-500 text-white'
                        : 'bg-selectrik-gold text-selectrik-dark hover:bg-yellow-500'
                    }`}
                  >
                    <Save size={16} />
                    <span className="hidden sm:inline">{saved ? 'Salvat!' : 'Salvează'}</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSubmit}
                    disabled={submitting}
                    className={`px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all ${
                      submitting
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    <Send size={16} />
                    <span className="hidden sm:inline">{submitting ? 'Se trimite...' : 'Trimite'}</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Success/Error Messages at top */}
        {submitSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2"
          >
            <CheckCircle size={20} />
            <span>Proiect trimis cu succes! Verifică email-ul pentru confirmare.</span>
          </motion.div>
        )}

        {submitError && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg"
          >
            {submitError}
          </motion.div>
        )}

        {/* Content */}
        <div className="container mx-auto px-4 pt-28 pb-8">
          {isResidential ? (
            <div className="space-y-8">
              {/* Canvas - Full Width */}
              <div>
                <ProjectCanvas />
              </div>

              {/* Calculatoare jos sub canvas - Grid frumos */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Preț */}
                <div className="lg:col-span-1">
                  <PriceCalculator />
                </div>
                
                {/* Power Calculator */}
                <div className="lg:col-span-1">
                  <PowerCalculator />
                </div>
                
                {/* Carbon Footprint */}
                <div className="lg:col-span-1">
                  <CarbonFootprintCalculator />
                </div>
              </div>
            </div>
          ) : (
            <>
              {activeTab === 'calculator' && currentProject.type === 'fotovoltaic' && (
                <div className="max-w-7xl mx-auto">
                  <FotovoltaicCalculator />
                </div>
              )}
              {activeTab === 'calculator' && currentProject.type === 'bransament' && (
                <div className="max-w-7xl mx-auto">
                  <BransamentCalculator />
                </div>
              )}
            </>
          )}
        </div>

        {/* Phone Number Modal */}
        {showPhoneModal && (
          <PhoneNumberModal
            onSubmit={handlePhoneSubmit}
            onClose={() => setShowPhoneModal(false)}
          />
        )}

        {/* Test Version Popup */}
        {showTestVersionPopup && (
          <TestVersionPopup onClose={handleTestVersionPopupClose} />
        )}
      </div>
    </PageTransition>
  );
};
