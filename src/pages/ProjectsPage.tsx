import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Calendar, MapPin, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card3D } from '../components/Card3D';
import { TextReveal } from '../components/TextReveal';
import { ProjectRoadmap } from '../components/project/ProjectRoadmap';
import { RoadmapStage } from '../types/project';

const projects = [
  {
    title: 'Centru Comercial Plaza',
    category: 'Comercial',
    location: 'București',
    year: '2024',
    description: 'Instalație electrică completă pentru centru comercial de 5000mp, cu sistem de iluminat LED inteligent.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    stats: { power: '500kW', lights: '2000+', automation: 'Complet' }
  },
  {
    title: 'Ansamblu Rezidențial Premium',
    category: 'Rezidențial',
    location: 'Cluj-Napoca',
    year: '2024',
    description: 'Instalații electrice pentru 120 de apartamente cu sistem smart home integrat.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    stats: { units: '120', automation: 'Smart Home', efficiency: 'A++' }
  },
  {
    title: 'Fabrică Producție Auto',
    category: 'Industrial',
    location: 'Timișoara',
    year: '2023',
    description: 'Sistem electric industrial cu automatizare complexă pentru linie de producție.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
    stats: { power: '2MW', machines: '50+', uptime: '99.9%' }
  },
  {
    title: 'Hotel de Lux Central',
    category: 'Comercial',
    location: 'București',
    year: '2023',
    description: 'Instalații electrice și automatizări pentru hotel boutique cu 80 de camere.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    stats: { rooms: '80', systems: '15+', smart: 'Complet' }
  },
  {
    title: 'Parc de Birouri Tech',
    category: 'Comercial',
    location: 'Brașov',
    year: '2023',
    description: 'Instalații electrice moderne pentru complex de birouri clasa A.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    stats: { area: '8000mp', floors: '6', green: 'LEED Gold' }
  },
  {
    title: 'Vilă Modernă Premium',
    category: 'Rezidențial',
    location: 'Snagov',
    year: '2024',
    description: 'Instalație electrică de lux cu automatizări complete și sistem solar.',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
    stats: { area: '600mp', solar: '15kW', automation: 'Total' }
  },
];

// Mock roadmap stages for demo
const mockRoadmapStages: RoadmapStage[] = [
  {
    id: '1',
    name: 'Dosar de Branșament',
    status: 'completed',
    date: '15 Ian 2024',
    description: 'Pregătirea și depunerea documentației necesare pentru obținerea avizului de branșament electric.',
    icon: 'FileText'
  },
  {
    id: '2',
    name: 'Branșament',
    status: 'completed',
    date: '22 Ian 2024',
    description: 'Realizarea branșamentului electric de la rețeaua publică până la tabloul general de distribuție.',
    icon: 'Zap'
  },
  {
    id: '3',
    name: 'Împământare/Paratrasnet',
    status: 'in_progress',
    date: 'În desfășurare',
    description: 'Instalarea sistemului de împământare și a paratrasnetului pentru protecția clădirii.',
    icon: 'Shield'
  },
  {
    id: '4',
    name: 'Proiectare Instalație',
    status: 'not_started',
    description: 'Elaborarea schemelor electrice și calculul sarcinilor pentru instalația electrică.',
    icon: 'Compass'
  },
  {
    id: '5',
    name: 'Execuție Instalație',
    status: 'not_started',
    description: 'Montarea cablajelor, tablourilor electrice, prizelor și întrerupătoarelor.',
    icon: 'Wrench'
  },
];

const viewOptions = [
  { id: 'roadmap', label: 'vezi roadmap', description: 'procesul nostru pas cu pas' },
  { id: 'projects', label: 'proiectele noastre', description: 'portofoliu complet' },
];

export const ProjectsPage = () => {
  const [selectedView, setSelectedView] = useState('roadmap'); // Roadmap first
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-transparent pt-40 pb-16">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.h1 
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white via-selectrik-gold to-white bg-clip-text text-transparent"
          >
            proiectele noastre
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
            descoperă portofoliul nostru de proiecte realizate cu succes
          </TextReveal>
        </motion.div>

        {/* View Selector - Like Services Page */}
        <section className="py-12">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="flex flex-wrap gap-4 justify-center mb-16">
              {viewOptions.map((option) => (
                <motion.button
                  key={option.id}
                  onClick={() => setSelectedView(option.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex flex-col items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all ${
                    selectedView === option.id
                      ? 'bg-gradient-to-r from-selectrik-blue to-selectrik-gold text-white shadow-lg'
                      : 'bg-selectrik-dark/40 backdrop-blur-sm border border-selectrik-gold/20 text-gray-200 hover:border-selectrik-gold/50'
                  }`}
                >
                  <span className="text-lg">{option.label}</span>
                  <span className="text-xs opacity-75">{option.description}</span>
                </motion.button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {selectedView === 'roadmap' ? (
                /* Roadmap View */
                <motion.div
                  key="roadmap-view"
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(10px)" }}
                  transition={{ duration: 0.4 }}
                  className="py-8"
                >
                  <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                      roadmap exemplu proiect
                    </h2>
                    <p className="text-gray-300 max-w-2xl mx-auto">
                      urmărește pașii necesari pentru finalizarea unui proiect electric complet
                    </p>
                  </div>
                  <ProjectRoadmap stages={mockRoadmapStages} />
                  
                  {/* CTA after roadmap */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-16 text-center"
                  >
                    <div className="inline-block bg-selectrik-dark/40 backdrop-blur-sm border border-selectrik-gold/20 rounded-2xl p-8">
                      <h3 className="text-2xl font-bold text-white mb-3">
                        vrei să începi un proiect?
                      </h3>
                      <p className="text-gray-300 mb-6">
                        contactează-ne pentru o consultație gratuită
                      </p>
                      <Link to="/contact">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-8 py-3 bg-gradient-to-r from-selectrik-blue to-selectrik-gold text-white font-bold rounded-full hover:shadow-lg hover:shadow-selectrik-gold/30 transition-all inline-flex items-center gap-2"
                        >
                          contactează-ne
                          <ChevronRight className="w-5 h-5" />
                        </motion.button>
                      </Link>
                    </div>
                  </motion.div>
                </motion.div>
              ) : (
                /* Projects Grid */
                <motion.div
                  key="projects-grid"
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(10px)" }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
                >
                  {projects.map((project, index) => (
                <Card3D key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    onHoverStart={() => setHoveredIndex(index)}
                    onHoverEnd={() => setHoveredIndex(null)}
                    className="group relative bg-selectrik-dark/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col"
                  >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      animate={{
                        scale: hoveredIndex === index ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.6 }}
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                      className="absolute inset-0 bg-gradient-to-t from-selectrik-dark via-selectrik-dark/50 to-transparent"
                    />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="px-4 py-2 bg-selectrik-gold text-white font-bold rounded-full text-sm">
                        {project.category}
                      </span>
                    </div>

                    {/* View Project Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: hoveredIndex === index ? 1 : 0,
                        y: hoveredIndex === index ? 0 : 20,
                      }}
                      className="absolute inset-0 flex items-center justify-center gap-3"
                    >
                      <Link to={`/proiecte/${index}/roadmap`}>
                        <button className="px-6 py-3 bg-selectrik-dark/50 backdrop-blur-sm text-white font-bold rounded-full flex items-center gap-2 hover:bg-selectrik-gold transition-colors">
                          vezi roadmap
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </Link>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-selectrik-blue transition-colors">
                      {project.title}
                    </h3>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {project.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {project.year}
                      </div>
                    </div>

                    <p className="text-gray-300 mb-4 flex-1 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {Object.entries(project.stats).map(([key, value]) => (
                        <div
                          key={key}
                          className="px-3 py-1 bg-selectrik-dark/40 rounded-full text-xs font-semibold text-gray-200"
                        >
                          {value}
                        </div>
                      ))}
                    </div>
                  </div>
                  </motion.div>
                  </Card3D>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
    </div>
  );
};

