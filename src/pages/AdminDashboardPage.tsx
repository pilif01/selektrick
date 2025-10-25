import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, FolderKanban, CheckCircle2, Clock, Mail, Calendar, ChevronDown, ChevronUp, Phone, Download } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import { ELECTRICAL_CATALOG } from '../types/project';
import { API_BASE_URL } from '../config/api';

interface User {
  id: number;
  email: string;
  phone_number?: string;
  is_verified: boolean;
  role: string;
  created_at: string;
  last_login: string | null;
  project_count: number;
}

interface ProjectData {
  id: string;
  name: string;
  icon: string;
  items: Array<{
    id: string;
    itemId: string;
    quantity: number;
    comment?: string;
  }>;
  groups?: any[];
  width?: number;
  height?: number;
}

interface Project {
  id: number;
  name: string;
  type: string;
  data: string;
  created_at: string;
  updated_at: string;
}

interface DashboardStats {
  totalUsers: number;
  verifiedUsers: number;
  totalProjects: number;
  recentUsers: Array<{
    id: number;
    email: string;
    created_at: string;
    is_verified: boolean;
  }>;
  recentProjects: Array<{
    id: number;
    name: string;
    type: string;
    user_email: string;
    updated_at: string;
  }>;
}

export const AdminDashboardPage: React.FC = () => {
  const { token, isAdmin, user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [expandedUsers, setExpandedUsers] = useState<Set<number>>(new Set());
  const [userProjects, setUserProjects] = useState<Record<number, Project[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token || !isAdmin) {
      navigate('/login');
      return;
    }

    fetchDashboardData();
  }, [token, isAdmin, navigate]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, usersRes] = await Promise.all([
        fetch(`${API_BASE_URL}/admin/dashboard`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }),
        fetch(`${API_BASE_URL}/admin/users`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }),
      ]);

      if (!statsRes.ok || !usersRes.ok) {
        throw new Error('Failed to fetch dashboard data');
      }

      const statsData = await statsRes.json();
      const usersData = await usersRes.json();

      setStats(statsData);
      setUsers(usersData.users);
    } catch (err) {
      setError('eroare la încărcarea datelor');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleUserExpanded = async (userId: number) => {
    const newExpanded = new Set(expandedUsers);

    if (newExpanded.has(userId)) {
      newExpanded.delete(userId);
      setExpandedUsers(newExpanded);
    } else {
      newExpanded.add(userId);
      setExpandedUsers(newExpanded);

      // Fetch user projects if not already loaded
      if (!userProjects[userId]) {
        try {
          const res = await fetch(`${API_BASE_URL}/admin/users/${userId}/projects`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (res.ok) {
            const data = await res.json();
            setUserProjects(prev => ({ ...prev, [userId]: data.projects }));
          }
        } catch (err) {
          console.error('Failed to fetch user projects:', err);
        }
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ro-RO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getProjectTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'configurator': 'configurator',
      'bransament': 'branșament',
      'fotovoltaic': 'fotovoltaic',
      'rezidential': 'rezidential',
      'other': 'altele',
    };
    return labels[type] || type;
  };

  const removeDiacritics = (text: string): string => {
    const diacriticsMap: { [key: string]: string } = {
      'ă': 'a', 'â': 'a', 'î': 'i', 'ș': 's', 'ț': 't',
      'Ă': 'A', 'Â': 'A', 'Î': 'I', 'Ș': 'S', 'Ț': 'T'
    };
    return text.replace(/[ăâîșțĂÂÎȘȚ]/g, match => diacriticsMap[match] || match);
  };

  const handleDownloadPDF = (project: Project, userEmail: string, userPhone?: string) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Parse project data
    let projectData: any = {};
    try {
      // Check if project.data is already an object or a string
      if (typeof project.data === 'string') {
        projectData = JSON.parse(project.data);
      } else {
        projectData = project.data;
      }
      console.log('Project type:', project.type);
      console.log('Project data:', projectData);
      console.log('Metadata exists:', !!projectData.metadata);
      if (projectData.metadata) {
        console.log('Metadata content:', projectData.metadata);
      }
    } catch (e) {
      console.error('Failed to parse project data:', e);
      console.error('Raw data:', project.data);
    }

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
    
    // Project Info Box (adjusted height for phone number)
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(15, 50, pageWidth - 30, userPhone ? 46 : 40, 3, 3, 'F');
    
    // Project Title
    doc.setFontSize(18);
    doc.setTextColor(43, 95, 165);
    doc.setFont('helvetica', 'bold');
    doc.text(removeDiacritics(project.name), 20, 62);
    
    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    doc.setFont('helvetica', 'italic');
    doc.text(removeDiacritics(getProjectTypeLabel(project.type)), 20, 70);
    
    // Client info
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    doc.text(removeDiacritics(`Client: ${userEmail}`), 20, 78);
    
    // Phone number (if available)
    if (userPhone) {
      doc.text(removeDiacritics(`Telefon: ${userPhone}`), 20, 84);
    }
    
    const dateText = removeDiacritics(`Generat la: ${new Date().toLocaleDateString('ro-RO', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })}`);
    doc.text(dateText, 20, userPhone ? 90 : 84);
    
    let yPos = userPhone ? 106 : 100;
    
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
    
    // Handle different project types
    if (project.type === 'fotovoltaic') {
      // Check if metadata exists
      if (!projectData.metadata) {
        console.warn('No metadata found for fotovoltaic project');
        yPos = addSection('DETALII SISTEM FOTOVOLTAIC', yPos);
        doc.setFontSize(12);
        doc.setTextColor(150, 150, 150);
        doc.text(removeDiacritics('Datele proiectului nu au fost gasite.'), 20, yPos);
        doc.text(removeDiacritics('Va rugam salvati din nou proiectul.'), 20, yPos + 10);
      } else {
        const meta = projectData.metadata;
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
      }
      
    } else if (project.type === 'bransament') {
      // Check if metadata exists
      if (!projectData.metadata) {
        console.warn('No metadata found for bransament project');
        yPos = addSection('DETALII BRANSAMENT ELECTRIC', yPos);
        doc.setFontSize(12);
        doc.setTextColor(150, 150, 150);
        doc.text(removeDiacritics('Datele proiectului nu au fost gasite.'), 20, yPos);
        doc.text(removeDiacritics('Va rugam salvati din nou proiectul.'), 20, yPos + 10);
      } else {
        const meta = projectData.metadata;
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
      }
      
    } else {
      // Rezidential with full details
      const rooms = projectData.rooms || [];
      yPos = addSection('DETALII PROIECT REZIDENTIAL', yPos);
      
      let totalPrice = 0;
      let totalItems = 0;
      
      // Calculate totals and show summary
      rooms.forEach((room: ProjectData) => {
        totalItems += room.items?.length || 0;
        room.items?.forEach((item: any) => {
          const catalogItem = ELECTRICAL_CATALOG.find(c => c.id === item.itemId);
          if (catalogItem) {
            totalPrice += catalogItem.price * (item.quantity || 1);
          }
        });
      });
      
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      doc.text(removeDiacritics('Numar camere/spatii:'), 20, yPos);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text(`${rooms.length}`, 120, yPos);
      doc.setFont('helvetica', 'normal');
      yPos += 8;
      
      doc.setTextColor(80, 80, 80);
      doc.text(removeDiacritics('Total obiecte electrice:'), 20, yPos);
      doc.setFont('helvetica', 'bold');
      doc.text(`${totalItems}`, 120, yPos);
      doc.setFont('helvetica', 'normal');
      yPos += 15;
      
      // Total price box
      doc.setFillColor(43, 95, 165);
      doc.roundedRect(15, yPos, pageWidth - 30, 15, 2, 2, 'F');
      doc.setFontSize(14);
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.text(removeDiacritics(`PRET TOTAL ESTIMAT: ${totalPrice} RON`), 20, yPos + 10);
      yPos += 25;
      
      // Detailed rooms and items
      if (rooms.length > 0) {
        yPos = addSection('DETALII PE CAMERE', yPos);
        
        rooms.forEach((room: ProjectData) => {
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
            room.items.forEach((item: any, index: number) => {
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
    
    const cleanFilename = removeDiacritics(project.name).replace(/[^a-zA-Z0-9]/g, '_');
    doc.save(`Selectrik_${cleanFilename}.pdf`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-selectrik-dark">
        <div className="text-selectrik-gold text-xl">se încarcă...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-selectrik-dark">
        <div className="text-red-400 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-selectrik-dark pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
            dashboard admin
          </h1>
          <p className="text-gray-400">bun venit, {user?.email}</p>
        </motion.div>

        {/* Stats Grid */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <div className="bg-selectrik-dark/60 backdrop-blur-sm border-2 border-selectrik-gold/40 rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-selectrik-gold/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-selectrik-gold" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">{stats.totalUsers}</div>
                  <div className="text-gray-400 text-sm">utilizatori totali</div>
                </div>
              </div>
            </div>

            <div className="bg-selectrik-dark/60 backdrop-blur-sm border-2 border-selectrik-gold/40 rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">{stats.verifiedUsers}</div>
                  <div className="text-gray-400 text-sm">utilizatori verificați</div>
                </div>
              </div>
            </div>

            <div className="bg-selectrik-dark/60 backdrop-blur-sm border-2 border-selectrik-gold/40 rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <FolderKanban className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">{stats.totalProjects}</div>
                  <div className="text-gray-400 text-sm">proiecte totale</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Users List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-selectrik-dark/60 backdrop-blur-sm border-2 border-selectrik-gold/40 rounded-xl p-6"
        >
          <h2 className="text-2xl font-bold text-white mb-6">utilizatori și proiecte</h2>

          <div className="space-y-4">
            {users.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="border border-selectrik-gold/20 rounded-lg overflow-hidden"
              >
                {/* User Header */}
                <button
                  onClick={() => toggleUserExpanded(user.id)}
                  className="w-full px-6 py-4 bg-selectrik-dark/40 hover:bg-selectrik-dark/60 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <Mail className="w-5 h-5 text-selectrik-gold" />
                    <div className="text-left flex-1">
                      <div className="text-white font-semibold flex items-center gap-2 flex-wrap">
                        {user.email}
                        {user.role === 'admin' && (
                          <span className="px-2 py-0.5 bg-selectrik-gold/20 text-selectrik-gold text-xs rounded">
                            admin
                          </span>
                        )}
                        {user.is_verified ? (
                          <CheckCircle2 className="w-4 h-4 text-green-400" />
                        ) : (
                          <Clock className="w-4 h-4 text-yellow-400" />
                        )}
                      </div>
                      <div className="text-gray-400 text-sm mt-1">
                        <Calendar className="w-3 h-3 inline mr-1" />
                        înregistrat: {formatDate(user.created_at)}
                        {user.last_login && (
                          <>
                            {' • '}
                            ultimul login: {formatDate(user.last_login)}
                          </>
                        )}
                      </div>
                      {user.phone_number && (
                        <div className="text-gray-400 text-sm mt-1 flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {user.phone_number}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-selectrik-gold font-bold">{user.project_count}</div>
                      <div className="text-gray-400 text-xs">proiecte</div>
                    </div>
                    {expandedUsers.has(user.id) ? (
                      <ChevronUp className="w-5 h-5 text-selectrik-gold" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-selectrik-gold" />
                    )}
                  </div>
                </button>

                {/* User Projects */}
                {expandedUsers.has(user.id) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-selectrik-gold/20"
                  >
                    {userProjects[user.id] ? (
                      userProjects[user.id].length > 0 ? (
                        <div className="p-4 space-y-2">
                          {userProjects[user.id].map((project) => (
                            <div
                              key={project.id}
                              className="bg-selectrik-dark/60 rounded-lg p-4 border border-selectrik-gold/10"
                            >
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                                    <FolderKanban className="w-4 h-4 text-selectrik-gold" />
                                    <h3 className="text-white font-semibold">{project.name}</h3>
                                    <span className="px-2 py-0.5 bg-selectrik-gold/10 text-selectrik-gold text-xs rounded">
                                      {getProjectTypeLabel(project.type)}
                                    </span>
                                  </div>
                                  <div className="text-gray-400 text-sm">
                                    actualizat: {formatDate(project.updated_at)}
                                  </div>
                                </div>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDownloadPDF(project, user.email, user.phone_number);
                                  }}
                                  className="bg-selectrik-gold/10 hover:bg-selectrik-gold/20 text-selectrik-gold p-2 rounded-lg transition-colors flex items-center gap-2"
                                  title="Descarcă PDF"
                                >
                                  <Download className="w-4 h-4" />
                                  <span className="text-xs font-semibold hidden sm:inline">PDF</span>
                                </motion.button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-4 text-center text-gray-400">
                          niciun proiect
                        </div>
                      )
                    ) : (
                      <div className="p-4 text-center text-gray-400">
                        se încarcă...
                      </div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
