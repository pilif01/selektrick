import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useState } from 'react';

const testimonials = [
  {
    name: 'Alexandru Popescu',
    role: 'Director General, TechCorp',
    image: 'https://i.pravatar.cc/150?img=12',
    text: 'Selectrik a realizat instalația electrică pentru întreg complexul nostru de birouri. Profesionalism desăvârșit și respectarea termenelor. Recomand cu încredere!',
    rating: 5,
    project: 'Instalație Comercială'
  },
  {
    name: 'Maria Ionescu',
    role: 'Proprietar Vilă',
    image: 'https://i.pravatar.cc/150?img=45',
    text: 'Am fost impresionată de atenția la detalii și calitatea lucrărilor. Sistemul smart home instalat de ei funcționează perfect. Mulțumesc!',
    rating: 5,
    project: 'Instalație Rezidențială'
  },
  {
    name: 'Andrei Marinescu',
    role: 'Manager Producție, AutoParts',
    image: 'https://i.pravatar.cc/150?img=33',
    text: 'Colaborăm de 3 ani cu Selectrik pentru mentenanța fabricii. Echipa lor este mereu disponibilă și foarte competentă. Sunt partenerii noștri de încredere.',
    rating: 5,
    project: 'Mentenanță Industrială'
  },
  {
    name: 'Elena Dumitrescu',
    role: 'Arhitect, Design Studio',
    image: 'https://i.pravatar.cc/150?img=47',
    text: 'Lucrez cu Selectrik la toate proiectele mele. Înțeleg perfect viziunea arhitecturală și implementează soluții inovatoare. Extraordinari!',
    rating: 5,
    project: 'Consultanță & Execuție'
  },
];

export const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-5">
        <Quote className="w-full h-full text-selectrik-blue" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ce Spun Clienții Noștri
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '8rem' }}
            transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="h-1.5 bg-selectrik-gold mx-auto mb-6"
          />
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Feedback-ul clienților noștri este cea mai bună dovadă a calității muncii noastre
          </p>
        </motion.div>

        {/* Main Testimonial */}
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="bg-gradient-to-br from-selectrik-blue to-selectrik-dark rounded-3xl p-12 text-white relative">
            <Quote className="absolute top-8 right-8 w-20 h-20 opacity-20" />
            
            <div className="flex items-center gap-6 mb-6">
              <motion.img
                whileHover={{ scale: 1.1, rotate: 5 }}
                src={testimonials[activeIndex].image}
                alt={testimonials[activeIndex].name}
                className="w-24 h-24 rounded-full border-4 border-selectrik-gold object-cover"
              />
              <div>
                <h3 className="text-2xl font-bold mb-1">
                  {testimonials[activeIndex].name}
                </h3>
                <p className="text-selectrik-gold font-semibold">
                  {testimonials[activeIndex].role}
                </p>
                <div className="flex gap-1 mt-2">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-selectrik-gold text-selectrik-gold" />
                  ))}
                </div>
              </div>
            </div>

            <p className="text-xl leading-relaxed mb-4 relative z-10">
              "{testimonials[activeIndex].text}"
            </p>

            <div className="inline-block px-4 py-2 bg-selectrik-gold/20 rounded-full text-sm font-semibold">
              {testimonials[activeIndex].project}
            </div>
          </div>
        </motion.div>

        {/* Testimonial Selector */}
        <div className="flex justify-center gap-4 flex-wrap">
          {testimonials.map((testimonial, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveIndex(index)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`transition-all duration-300 ${
                activeIndex === index ? 'opacity-100' : 'opacity-40 hover:opacity-70'
              }`}
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className={`w-16 h-16 rounded-full object-cover border-4 transition-all ${
                  activeIndex === index
                    ? 'border-selectrik-gold shadow-lg'
                    : 'border-gray-300'
                }`}
              />
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

