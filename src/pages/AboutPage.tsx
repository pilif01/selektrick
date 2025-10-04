import { motion } from 'framer-motion';
import { Award, Clock, Users, ThumbsUp, Target, Lightbulb, Heart, Shield } from 'lucide-react';

const features = [
  {
    icon: Award,
    title: 'Instalator Autorizat ANRE',
    description: 'Certificări și autorizații complete pentru instalații electrice și sisteme fotovoltaice.'
  },
  {
    icon: Clock,
    title: 'Service Disponibil 24/7',
    description: 'Echipă de intervenție rapidă pentru urgențe, disponibilă non-stop.'
  },
  {
    icon: Users,
    title: 'Echipă Profesionistă',
    description: 'Electricieni certificați cu experiență vastă în toate tipurile de instalații.'
  },
  {
    icon: ThumbsUp,
    title: 'Clienți Mulțumiți',
    description: 'Sute de proprietăți iluminate și clienți satisfăcuți în Timișoara și împrejurimi.'
  }
];

const values = [
  {
    icon: Target,
    title: 'Profesionalism',
    description: 'Abordare profesională în fiecare proiect, de la consultanță la execuție'
  },
  {
    icon: Lightbulb,
    title: 'Inovație',
    description: 'Soluții moderne cu energie verde și tehnologii de ultimă generație'
  },
  {
    icon: Heart,
    title: 'Dedicare',
    description: 'Pasiune pentru calitate și satisfacția completă a clienților'
  },
  {
    icon: Shield,
    title: 'Siguranță',
    description: 'Standarde înalte de siguranță și instalații certificate'
  }
];

export const AboutPage = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-selectrik-dark via-selectrik-blue to-selectrik-dark text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-6xl font-bold mb-4"
            >
              Despre Selectrik
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
              className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed"
            >
              Ne dedicăm să oferim cele mai bune soluții în domeniul instalațiilor electrice și 
              sistemelor fotovoltaice în Timișoara, contribuind la succesul clienților noștri.
            </motion.p>
          </motion.div>

          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-center">SMART ELKISS S.R.L.</h2>
            <p className="text-lg text-gray-200 text-center mb-6">
              Instalator autorizat ANRE pentru instalații electrice și sisteme fotovoltaice
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-center">
              <div>
                <p className="text-selectrik-gold font-semibold mb-2">📍 Locație</p>
                <p className="text-gray-200">Aleea Viilor 24, Timișoara</p>
              </div>
              <div>
                <p className="text-selectrik-gold font-semibold mb-2">📞 Contact</p>
                <p className="text-gray-200">0376 442 388</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold text-selectrik-dark mb-6">
              Misiunea Noastră
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Credem cu tărie că, prin efortul comun, putem transforma domeniul energetic și 
              putem sprijini clienții să adopte soluțiile potrivite.
            </p>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-selectrik-blue mb-4">
                Credem că prin alegeri inteligente creăm un viitor mai bun!
              </h3>
              <p className="text-lg text-gray-600">
                Oferim soluții personalizate, adaptate nevoilor și dorințelor tale, 
                pentru a contribui la succesul proiectelor tale electrice.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-selectrik-dark mb-4">
              De Ce Să Ne Alegi?
            </h2>
            <div className="h-1.5 w-32 bg-selectrik-gold mx-auto mb-6" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="bg-slate-50 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-selectrik-blue to-selectrik-light rounded-full flex items-center justify-center mx-auto">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-selectrik-dark mb-3 text-center">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 text-center leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-selectrik-dark mb-4">
              Valorile Noastre
            </h2>
            <div className="h-1.5 w-32 bg-selectrik-gold mx-auto mb-6" />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Principiile care ne ghidează în fiecare proiect
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-white rounded-xl shadow-lg"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="mb-4 inline-block"
                >
                  <div className="w-20 h-20 bg-selectrik-gold rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <value.icon className="w-10 h-10 text-selectrik-dark" />
                  </div>
                </motion.div>
                
                <h3 className="text-2xl font-bold text-selectrik-dark mb-3">
                  {value.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold text-selectrik-dark mb-6">
              Certificări și Autorizații
            </h2>
            <div className="bg-gradient-to-br from-selectrik-blue to-selectrik-dark text-white p-8 rounded-2xl shadow-xl">
              <p className="text-xl mb-6">
                SMART ELKISS S.R.L. este autorizată ANRE pentru:
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-selectrik-gold">✓</span> Instalații electrice rezidențiale
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-selectrik-gold">✓</span> Instalații electrice industriale
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-selectrik-gold">✓</span> Sisteme fotovoltaice
                  </li>
                </ul>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-selectrik-gold">✓</span> Bransamente electrice
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-selectrik-gold">✓</span> Verificare priză de pământ
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-selectrik-gold">✓</span> Dosar prosumator
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
