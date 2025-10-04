import { motion } from 'framer-motion';
import { ExternalLink, Calendar, MapPin } from 'lucide-react';
import { useState } from 'react';

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

const categories = ['Toate', 'Comercial', 'Rezidențial', 'Industrial'];

export const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Toate');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const filteredProjects = selectedCategory === 'Toate' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-50 pt-40 pb-16">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-6xl font-bold text-selectrik-dark mb-4"
          >
            Proiectele Noastre
          </motion.h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '8rem' }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="h-1.5 bg-selectrik-gold mx-auto mb-6" 
          />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Descoperă portofoliul nostru de proiecte realizate cu succes
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-selectrik-blue text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
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
                  <span className="px-4 py-2 bg-selectrik-gold text-selectrik-dark font-bold rounded-full text-sm">
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
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <button className="px-6 py-3 bg-white text-selectrik-dark font-bold rounded-full flex items-center gap-2 hover:bg-selectrik-gold transition-colors">
                    Vezi Detalii
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-selectrik-dark mb-2 group-hover:text-selectrik-blue transition-colors">
                  {project.title}
                </h3>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {project.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {project.year}
                  </div>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Stats */}
                <div className="flex flex-wrap gap-2">
                  {Object.entries(project.stats).map(([key, value]) => (
                    <div
                      key={key}
                      className="px-3 py-1 bg-slate-100 rounded-full text-xs font-semibold text-gray-700"
                    >
                      {value}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

