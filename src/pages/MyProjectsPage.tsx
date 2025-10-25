import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Trash2, Copy, Calendar, ClipboardList, X, Check, Settings, ArrowRight, ArrowLeft, Phone, User, Download } from 'lucide-react';
import { useProjects } from '../contexts/ProjectContext';
import { useAuth } from '../contexts/AuthContext';
import { PageTransition } from '../components/PageTransition';
import { TestVersionPopup } from '../components/TestVersionPopup';
import { PROJECT_TYPES } from '../types/project';
import { IconRenderer } from '../components/project/IconRenderer';
import jsPDF from 'jspdf';
import { Project, FotovoltaicMetadata, BransamentMetadata, ELECTRICAL_CATALOG } from '../types/project';

export const MyProjectsPage = () => {
  const navigate = useNavigate();
  const { projects, deleteProject, getTotalPrice } = useProjects();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showWizard, setShowWizard] = useState(false);
  const [showTestVersionPopup, setShowTestVersionPopup] = useState(false);

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Check if user has seen the test version popup
  useEffect(() => {
    const hasSeenTestVersionPopup = localStorage.getItem('hasSeenTestVersionPopup');
    if (!hasSeenTestVersionPopup) {
      setShowTestVersionPopup(true);
    }
  }, []);

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Azi';
    if (days === 1) return 'Ieri';
    if (days < 7) return `${days} zile în urmă`;
    return new Date(date).toLocaleDateString('ro-RO');
  };

  const handleDeleteProject = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Sigur vrei să ștergi acest proiect?')) {
      deleteProject(projectId);
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

  const handleDownloadPDF = (project: Project, e: React.MouseEvent) => {
    e.stopPropagation();
    
    const doc = new jsPDF();
    const projectType = PROJECT_TYPES.find((t) => t.id === project.type);
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Background color for header
    doc.setFillColor(43, 95, 165); // Selectrik Blue
    doc.rect(0, 0, pageWidth, 45, 'F');
    
    // Logo/Brand
    doc.setFontSize(28);
    doc.setTextColor(232, 230, 131); // Gold
    doc.setFont('helvetica', 'bold');
    doc.text('SELECTRIK', 20, 25);
    
    doc.setFontSize(11);
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'normal');
    doc.text(removeDiacritics('Instalatii Electrice Profesionale'), 20, 34);
    
    // Project Info Box
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(15, 50, pageWidth - 30, 35, 3, 3, 'F');
    
    // Project Title
    doc.setFontSize(18);
    doc.setTextColor(43, 95, 165);
    doc.setFont('helvetica', 'bold');
    doc.text(removeDiacritics(project.name), 20, 62);
    
    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    doc.setFont('helvetica', 'italic');
    doc.text(removeDiacritics(projectType?.name || project.type), 20, 70);
    
    // Date info
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    const dateText = removeDiacritics(`Generat la: ${new Date().toLocaleDateString('ro-RO', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })}`);
    doc.text(dateText, 20, 78);
    
    let yPos = 95;
    
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
    
    if (project.type === 'fotovoltaic' && project.metadata) {
      const meta = project.metadata as FotovoltaicMetadata;
      
      yPos = addSection('DETALII SISTEM FOTOVOLTAIC', yPos);
      
      // Data rows with alternating background
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
      
      // Total price box
      doc.setFillColor(232, 230, 131);
      doc.roundedRect(15, yPos, pageWidth - 30, 15, 2, 2, 'F');
      doc.setFontSize(14);
      doc.setTextColor(43, 95, 165);
      doc.setFont('helvetica', 'bold');
      doc.text(removeDiacritics(`PRET TOTAL: ${meta.totalCost || 0} RON`), 20, yPos + 10);
      doc.setFont('helvetica', 'normal');
      yPos += 20;
      
    } else if (project.type === 'bransament' && project.metadata) {
      const meta = project.metadata as BransamentMetadata;
      
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
      
      // Total price box
      doc.setFillColor(16, 185, 129);
      doc.roundedRect(15, yPos, pageWidth - 30, 15, 2, 2, 'F');
      doc.setFontSize(14);
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.text(removeDiacritics(`PRET TOTAL: ${meta.totalCost || 0} RON`), 20, yPos + 10);
      doc.setFont('helvetica', 'normal');
      yPos += 20;
      
    } else {
      // Rezidential with full details
      const totalItems = project.rooms.reduce((sum, room) => sum + room.items.length, 0);
      const totalPrice = getTotalPrice(project.id);
      
      yPos = addSection('DETALII PROIECT REZIDENTIAL', yPos);
      
      const addDataRow = (label: string, value: string, y: number, highlight = false) => {
        if (highlight) {
          doc.setFillColor(240, 245, 255);
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
      
      yPos = addDataRow('Numar camere/spatii:', `${project.rooms.length}`, yPos, true);
      yPos = addDataRow('Total obiecte electrice:', `${totalItems}`, yPos);
      yPos += 5;
      
      // Total price box
      doc.setFillColor(43, 95, 165);
      doc.roundedRect(15, yPos, pageWidth - 30, 15, 2, 2, 'F');
      doc.setFontSize(14);
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.text(removeDiacritics(`PRET TOTAL ESTIMAT: ${totalPrice} RON`), 20, yPos + 10);
      doc.setFont('helvetica', 'normal');
      yPos += 25;
      
      // Detailed rooms and items
      if (project.rooms.length > 0) {
        yPos = addSection('DETALII PE CAMERE', yPos);
        
        project.rooms.forEach((room) => {
          if (yPos > 250) {
            doc.addPage();
            yPos = 20;
          }
          
          // Room header
          doc.setFillColor(230, 230, 230);
          doc.roundedRect(15, yPos - 4, pageWidth - 30, 10, 2, 2, 'F');
          doc.setFontSize(11);
          doc.setTextColor(43, 95, 165);
          doc.setFont('helvetica', 'bold');
          doc.text(removeDiacritics(room.name), 20, yPos + 3);
          doc.setFont('helvetica', 'normal');
          yPos += 12;
          
          // Room items
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
    
    // Footer - always at bottom
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
    
    // Save PDF with cleaned filename
    const cleanFilename = removeDiacritics(project.name).replace(/[^a-zA-Z0-9]/g, '_');
    doc.save(`Selectrik_${cleanFilename}.pdf`);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-selectrik-dark via-gray-900 to-black pt-28 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold text-white flex items-center gap-3">
                  <Settings className="text-selectrik-gold" size={48} />
                  Configurator
                </h1>
                <p className="text-gray-400 mt-2">Configurează-ți proiectul electric</p>
                
                {/* User Info */}
                {user && (
                  <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-300 bg-gray-800/50 px-3 py-2 rounded-lg border border-gray-700">
                      <User size={16} className="text-selectrik-gold" />
                      <span>{user.email}</span>
                    </div>
                    {user.phone_number && (
                      <div className="flex items-center gap-2 text-gray-300 bg-gray-800/50 px-3 py-2 rounded-lg border border-gray-700">
                        <Phone size={16} className="text-selectrik-gold" />
                        <span>{user.phone_number}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowWizard(true)}
                className="bg-selectrik-gold hover:bg-selectrik-gold text-selectrik-dark px-6 py-3 rounded-full font-bold flex items-center gap-2 transition-colors shadow-lg self-start"
              >
                <Plus size={20} />
                <span>Proiect Nou</span>
              </motion.button>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Caută proiecte..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-selectrik-gold transition-all"
              />
            </div>
          </motion.div>

          {/* Projects Grid */}
          {filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <ClipboardList className="w-16 h-16 mx-auto mb-4 text-gray-600" />
              <h3 className="text-2xl font-bold text-white mb-2">
                {searchQuery ? 'Niciun proiect găsit' : 'Niciun proiect încă'}
              </h3>
              <p className="text-gray-400 mb-6">
                {searchQuery
                  ? 'Încearcă un alt termen de căutare'
                  : 'Creează primul tău proiect de instalație electrică'}
              </p>
              {!searchQuery && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowWizard(true)}
                  className="bg-selectrik-gold hover:bg-selectrik-gold text-selectrik-dark px-8 py-3 rounded-full font-bold inline-flex items-center gap-2 transition-colors"
                >
                  <Plus size={20} />
                  <span>Creează Proiect</span>
                </motion.button>
              )}
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredProjects.map((project, index) => {
                  const projectType = PROJECT_TYPES.find((t) => t.id === project.type);
                  const totalItems = project.rooms.reduce(
                    (sum, room) => sum + room.items.length,
                    0
                  );
                  const totalPrice = getTotalPrice(project.id);

                  // Get stats based on project type
                  const getStats = () => {
                    if (project.type === 'fotovoltaic' && project.metadata) {
                      return [
                        { label: 'Putere sistem', value: `${project.metadata.systemPower || 0} kW` },
                        { label: 'Panouri', value: `${project.metadata.numberOfPanels || 0}` },
                        { label: 'Preț estimat', value: `${project.metadata.totalCost || 0} RON`, highlight: true },
                      ];
                    } else if (project.type === 'bransament' && project.metadata) {
                      return [
                        { label: 'Putere solicitată', value: `${project.metadata.requestedPower || 0} kW` },
                        { label: 'Distanță', value: `${project.metadata.distance || 0} m` },
                        { label: 'Preț estimat', value: `${project.metadata.totalCost || 0} RON`, highlight: true },
                      ];
                    } else {
                      // Rezidential
                      return [
                        { label: 'Camere', value: `${project.rooms.length}` },
                        { label: 'Obiecte', value: `${totalItems}` },
                        { label: 'Preț estimat', value: `${totalPrice} RON`, highlight: true },
                      ];
                    }
                  };

                  const stats = getStats();

                  return (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => navigate(`/proiectul-meu/${project.id}`)}
                      className="group bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700 hover:border-selectrik-gold rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-selectrik-gold/20"
                    >
                      {/* Icon & Title */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div 
                            className="p-2 rounded-lg"
                            style={{ 
                              backgroundColor: `${projectType?.color || '#E8E683'}20`,
                              border: `2px solid ${projectType?.color || '#E8E683'}`
                            }}
                          >
                            <IconRenderer 
                              iconName={projectType?.icon || 'Home'} 
                              size={32} 
                              style={{ color: projectType?.color || '#E8E683' }}
                            />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white group-hover:text-selectrik-gold transition-colors">
                              {project.name}
                            </h3>
                            <p className="text-sm" style={{ color: projectType?.color || '#E8E683' }}>
                              {projectType?.name}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="space-y-2 mb-4">
                        {stats.map((stat, i) => (
                          <div key={i} className="flex items-center justify-between text-sm">
                            <span className="text-gray-400">{stat.label}</span>
                            <span className={stat.highlight ? "text-selectrik-gold font-bold" : "text-white font-semibold"}>
                              {stat.value}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Date */}
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                        <Calendar size={14} />
                        <span>Modificat {formatDate(project.updatedAt)}</span>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-4 border-t border-gray-700">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => handleDownloadPDF(project, e)}
                          className="flex-1 bg-selectrik-gold/10 hover:bg-selectrik-gold/20 text-selectrik-gold py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                          title="Descarcă PDF"
                        >
                          <Download size={16} />
                          <span className="hidden sm:inline">PDF</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => handleDeleteProject(project.id, e)}
                          className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                        >
                          <Trash2 size={16} />
                          <span className="hidden sm:inline">Șterge</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                        >
                          <Copy size={16} />
                          <span className="hidden sm:inline">Duplică</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Wizard Modal */}
        {showWizard && (
          <ProjectWizardModal onClose={() => setShowWizard(false)} />
        )}

        {/* Test Version Popup */}
        {showTestVersionPopup && (
          <TestVersionPopup onClose={handleTestVersionPopupClose} />
        )}
      </div>
    </PageTransition>
  );
};

// Wizard Modal Component
const ProjectWizardModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const navigate = useNavigate();
  const { createProject } = useProjects();
  const [step, setStep] = useState(1);
  const [type, setType] = useState<'rezidential' | 'fotovoltaic' | 'bransament'>('rezidential');
  const [name, setName] = useState('');
  
  // Parametri specifici pentru fotovoltaic
  const [monthlyConsumption, setMonthlyConsumption] = useState(300);
  const [roofArea, setRoofArea] = useState(50);
  const [includeBattery, setIncludeBattery] = useState(false);
  
  // Parametri specifici pentru branșament
  const [propertyType, setPropertyType] = useState<'casa' | 'apartament' | 'comercial'>('casa');
  const [distance, setDistance] = useState(50);
  const [requestedPower, setRequestedPower] = useState(10);
  
  // Parametri specifici pentru rezidențial
  const [numberOfRooms, setNumberOfRooms] = useState(3);
  const [propertySize, setPropertySize] = useState(100);

  const selectedProjectType = PROJECT_TYPES.find(t => t.id === type);
  const totalSteps = 3; // Tip → Nume → Parametri

  const handleCreate = () => {
    const description = type === 'fotovoltaic' 
      ? `Consum: ${monthlyConsumption}kWh/lună, Acoperiș: ${roofArea}m², Baterii: ${includeBattery ? 'Da' : 'Nu'}`
      : type === 'bransament'
      ? `Tip: ${propertyType}, Distanță: ${distance}m, Putere: ${requestedPower}kW`
      : `${numberOfRooms} camere, ${propertySize}m²`;
    
    const newProject = createProject(name, type, description);
    navigate(`/proiectul-meu/${newProject.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 max-w-3xl w-full border border-gray-700 shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Settings className="text-selectrik-gold" size={28} />
              Configurator Proiect Nou
            </h2>
            <p className="text-gray-400 text-sm mt-1">Pasul {step} din {totalSteps}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2 text-sm text-gray-400">
            <span>Tip proiect</span>
            <span>Nume</span>
            <span>Parametri</span>
          </div>
          <div className="flex gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
                className={`flex-1 h-2 rounded-full transition-all ${
                s === step
                    ? 'bg-selectrik-gold'
                  : s < step
                    ? 'bg-selectrik-gold/50'
                    : 'bg-gray-700'
              }`}
            />
          ))}
          </div>
        </div>

        {/* Step 1: Project Type */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Ce tip de proiect dorești?</h3>
              <p className="text-gray-400">Selectează categoria care se potrivește nevoilor tale</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              {PROJECT_TYPES.map((projectType) => (
                <motion.button
                  key={projectType.id}
                  onClick={() => {
                    setType(projectType.id as any);
                    setName(projectType.name); // Pre-fill with project type name
                  }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-6 rounded-2xl font-semibold text-left transition-all group relative overflow-hidden ${
                    type === projectType.id ? 'shadow-2xl' : 'shadow-lg'
                  }`}
                  style={{
                    background: type === projectType.id 
                      ? `linear-gradient(135deg, ${projectType.color} 0%, ${projectType.color}dd 100%)`
                      : `linear-gradient(135deg, ${projectType.color}40 0%, ${projectType.color}20 100%)`,
                    border: `2px solid ${type === projectType.id ? projectType.color : `${projectType.color}60`}`,
                  }}
                >
                  <div className="relative z-10">
                    <motion.div
                      animate={{ rotate: type === projectType.id ? [0, 5, -5, 0] : 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <IconRenderer 
                        iconName={projectType.icon} 
                        size={48} 
                        className="mb-4 text-white"
                      />
                    </motion.div>
                    <h4 className="text-xl font-bold text-white mb-2">{projectType.name}</h4>
                    <p className="text-sm text-white/80">{projectType.description}</p>
                  </div>
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity bg-white"
                  />
                  {type === projectType.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-4 right-4 bg-white rounded-full p-1 shadow-lg"
                    >
                      <Check size={20} style={{ color: projectType.color }} />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!type}
              className={`w-full disabled:bg-gray-700 disabled:text-gray-500 font-bold py-4 rounded-lg transition-colors mt-6 flex items-center justify-center gap-2 bg-gradient-to-r ${selectedProjectType?.bgGradient || 'from-selectrik-gold to-selectrik-gold'} text-white hover:shadow-lg`}
            >
              <span>Continuă cu {selectedProjectType?.name}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        {/* Step 2: Project Name */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="text-center mb-6">
              <div 
                className="w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                style={{ 
                  backgroundColor: `${selectedProjectType?.color}20`,
                  border: `2px solid ${selectedProjectType?.color}`
                }}
              >
                <IconRenderer 
                  iconName={selectedProjectType?.icon || 'Home'} 
                  size={40} 
                  style={{ color: selectedProjectType?.color }}
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Cum vrei să denumești proiectul?</h3>
              <p className="text-gray-400">Alege un nume sugestiv pentru proiectul tău</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Nume proiect
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={`ex: ${selectedProjectType?.name} Casa Familiei`}
                  className="w-full px-4 py-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-selectrik-gold text-lg"
                  autoFocus
                />
              </div>

              <div className="bg-gray-700/50 rounded-lg p-4">
                <p className="text-sm text-gray-400">
                  <strong className="text-white">Tip selectat:</strong> {selectedProjectType?.name}
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Înapoi
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!name.trim()}
                className={`flex-1 disabled:bg-gray-700 disabled:text-gray-500 font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 bg-gradient-to-r ${selectedProjectType?.bgGradient || 'from-selectrik-gold to-selectrik-gold'} text-white hover:shadow-lg`}
              >
                Continuă
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Specific Parameters */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="text-center mb-6">
              <div 
                className="w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                style={{ 
                  backgroundColor: `${selectedProjectType?.color}20`,
                  border: `2px solid ${selectedProjectType?.color}`
                }}
              >
                <IconRenderer 
                  iconName={selectedProjectType?.icon || 'Home'} 
                  size={40} 
                  style={{ color: selectedProjectType?.color }}
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Configurare {selectedProjectType?.name}</h3>
              <p className="text-gray-400">Setează parametrii pentru proiectul tău</p>
            </div>

            {/* Fotovoltaic Parameters */}
            {type === 'fotovoltaic' && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-300 flex items-center justify-between mb-2">
                    <span>Consum lunar estimat (kWh)</span>
                    <span className="text-selectrik-gold">{monthlyConsumption} kWh</span>
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="1000"
                    step="50"
                    value={monthlyConsumption}
                    onChange={(e) => setMonthlyConsumption(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-selectrik-gold"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-300 flex items-center justify-between mb-2">
                    <span>Suprafață acoperiș disponibilă (m²)</span>
                    <span className="text-selectrik-gold">{roofArea} m²</span>
                  </label>
                  <input
                    type="range"
                    min="20"
                    max="200"
                    step="5"
                    value={roofArea}
                    onChange={(e) => setRoofArea(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-selectrik-gold"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                  <div>
                    <div className="font-semibold text-white">Sistem de stocare (baterii)</div>
                    <div className="text-sm text-gray-400">Pentru energie pe timp de noapte</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeBattery}
                      onChange={(e) => setIncludeBattery(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-selectrik-gold"></div>
                  </label>
                </div>
              </div>
            )}

            {/* Branșament Parameters */}
            {type === 'bransament' && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-300 mb-2 block">Tip imobil</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['casa', 'apartament', 'comercial'] as const).map((pType) => (
                      <button
                        key={pType}
                        onClick={() => setPropertyType(pType)}
                        className={`px-4 py-3 rounded-lg font-semibold capitalize transition-all ${
                          propertyType === pType
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        {pType}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-300 flex items-center justify-between mb-2">
                    <span>Distanță până la rețea (m)</span>
                    <span className="text-green-400">{distance} m</span>
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="200"
                    step="5"
                    value={distance}
                    onChange={(e) => setDistance(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-300 flex items-center justify-between mb-2">
                    <span>Putere solicitată (kW)</span>
                    <span className="text-green-400">{requestedPower} kW</span>
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    step="5"
                    value={requestedPower}
                    onChange={(e) => setRequestedPower(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                  />
                </div>
              </div>
            )}

            {/* Rezidențial Parameters */}
            {type === 'rezidential' && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-300 flex items-center justify-between mb-2">
                    <span>Număr camere/spații</span>
                    <span className="text-selectrik-blue">{numberOfRooms}</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    step="1"
                    value={numberOfRooms}
                    onChange={(e) => setNumberOfRooms(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-selectrik-blue"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-300 flex items-center justify-between mb-2">
                    <span>Suprafață (m²)</span>
                    <span className="text-selectrik-blue">{propertySize} m²</span>
                  </label>
                  <input
                    type="range"
                    min="30"
                    max="500"
                    step="10"
                    value={propertySize}
                    onChange={(e) => setPropertySize(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-selectrik-blue"
                  />
                </div>
              </div>
            )}

            {/* Summary */}
            <div className="bg-gradient-to-br from-selectrik-blue/10 to-selectrik-gold/10 border border-selectrik-gold/30 rounded-xl p-4 mt-6">
              <h4 className="font-bold text-white mb-2">Rezumat proiect</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between text-gray-300">
                  <span>Nume:</span>
                  <span className="font-semibold text-white">{name}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Tip:</span>
                  <span className="font-semibold" style={{ color: selectedProjectType?.color }}>
                    {selectedProjectType?.name}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setStep(2)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Înapoi
              </button>
              <button
                onClick={handleCreate}
                className={`flex-2 bg-gradient-to-r ${selectedProjectType?.bgGradient || 'from-selectrik-gold to-selectrik-gold'} text-white font-bold py-3 px-6 rounded-lg transition-all hover:shadow-xl flex items-center justify-center gap-2`}
              >
                <Check className="w-5 h-5" />
                Creează Proiectul
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};
