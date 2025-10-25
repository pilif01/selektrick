import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { ProjectRoadmap } from '../components/project/ProjectRoadmap';
import { RoadmapStage } from '../types/project';

// Mock data pentru demonstrație
const mockRoadmapStages: RoadmapStage[] = [
  {
    id: '1',
    name: 'dosar de branșament',
    status: 'in_progress',
    description: 'pregătirea și depunerea documentației necesare pentru obținerea avizului de branșament electric de la furnizorul de energie.',
    icon: 'FileText'
  },
  {
    id: '2',
    name: 'branșament',
    status: 'in_progress',
    description: 'realizarea branșamentului electric de la rețeaua publică până...',
    icon: 'Zap'
  },
  {
    id: '3',
    name: 'împământare/paratrasnet',
    status: 'in_progress',
    description: 'instalarea sistemului de împământare și a paratrasnetului pentru protecția casei tale.',
    icon: 'Shield'
  },
  {
    id: '4',
    name: 'consultanță',
    status: 'in_progress',
    description: 'consultanță (sist. fotovoltaice pentru analiza energetică, calcul consum etc.)',
    icon: 'Lightbulb'
  },
  {
    id: '5',
    name: 'montare și instalare sistem fotovoltaic',
    status: 'in_progress',
    description: 'montarea panourilor fotovoltaice, invertoarelor și sistemului de monitorizare pentru producerea de energie verde.',
    icon: 'Sun'
  }
];

const mockProjects = [
  { id: '0', name: 'Centru Comercial Plaza', location: 'București' },
  { id: '1', name: 'Ansamblu Rezidențial Premium', location: 'Cluj-Napoca' },
  { id: '2', name: 'Fabrică Producție Auto', location: 'Timișoara' },
  { id: '3', name: 'Hotel de Lux Central', location: 'București' },
  { id: '4', name: 'Parc de Birouri Tech', location: 'Brașov' },
  { id: '5', name: 'Vilă Modernă Premium', location: 'Snagov' },
];

export const ProjectRoadmapPage = () => {
  const { id } = useParams<{ id: string }>();
  const project = mockProjects.find(p => p.id === id) || mockProjects[0];

  return (
    <div className="min-h-screen bg-transparent pt-32 pb-16">
      <div className="container mx-auto px-6">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link to="/proiecte">
            <motion.button
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-selectrik-dark/60 backdrop-blur-sm border border-selectrik-gold/20 rounded-xl text-gray-200 hover:border-selectrik-gold/50 hover:text-white transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Înapoi la Proiecte</span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-selectrik-dark/60 backdrop-blur-sm ring-1 ring-selectrik-gold/30 mb-6"
          >
            <Sparkles className="w-4 h-4 text-selectrik-gold" />
            <span className="text-sm tracking-wide text-gray-200">Roadmap Proiect</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-white via-selectrik-gold to-white bg-clip-text text-transparent"
          >
            {project.name}
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '8rem' }}
            transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="h-1.5 bg-selectrik-gold mx-auto mb-6"
          />

          <motion.p
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-gray-300"
          >
            Urmărește progresul proiectului pas cu pas
          </motion.p>
        </motion.div>

        {/* Roadmap */}
        <ProjectRoadmap stages={mockRoadmapStages} />

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-selectrik-dark/40 backdrop-blur-sm border border-selectrik-gold/20 rounded-2xl p-6 md:p-8">
            <p className="text-lg md:text-xl text-selectrik-gold font-bold mb-3">
              le găsești pe toate într-un singur loc
            </p>
            <p className="text-base md:text-lg text-gray-300 mb-6">
              de la racordare la independența energetică
            </p>
            <a href="tel:0773386299" className="block mb-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 md:px-8 py-3 bg-gradient-to-r from-selectrik-gold to-selectrik-gold text-selectrik-dark font-bold rounded-full hover:shadow-lg hover:shadow-selectrik-gold/30 transition-all text-base md:text-lg"
              >
                0773 386 299
              </motion.button>
            </a>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 md:px-8 py-3 bg-gradient-to-r from-selectrik-blue to-selectrik-gold text-white font-bold rounded-full hover:shadow-lg hover:shadow-selectrik-gold/30 transition-all text-sm md:text-base"
              >
                contactează-ne
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
