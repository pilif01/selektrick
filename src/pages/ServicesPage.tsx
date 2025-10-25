import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Zap, Lightbulb, Shield, CheckCircle2, ChevronDown, ArrowRight, BadgeCheck, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const services = [
  {
    id: 'fotovoltaice',
    title: 'sisteme fotovoltaice',
    icon: Sun,
    subtitle: 'energie verde la cheie – totul cu un singur partener',
    description: 'Utilizăm energia solară pentru a reduce costurile energetice și a proteja mediul prin instalarea panourilor solare de înaltă eficiență.',
    features: [
      {
        title: 'eficiență energetică',
        desc: 'oferim soluții pentru eficiență energetică adaptată nevoilor tale, pentru confortul și siguranța ta. Realizăm instalații fotovoltaice atât pentru uz rezidențial, cât și pentru cel industrial.'
      },
      {
        title: 'calitate și încredere',
        desc: 'folosim materiale de calitate, cu garanție, ca să dormi liniștit în timp ce produci curent. Panourile solare au o garanție de 15 ani, iar invertorul de 10 ani.'
      },
      {
        title: 'consultanță la fiecare pas',
        desc: 'suntem o echipă autorizată și cu experiență în domeniu, de aceea suntem aici să te ajutăm cu o perspectivă de viitor asupra casei tale.'
      }
    ],
    highlights: [
      'prin finanțare proprie sau programe guvernamentale disponibile',
      'soluție completă: de la furnizarea materialelor, montarea panourilor și invertorului până la automatizare',
      'consultanță pentru programe de finanțare și documentație completă'
    ]
  },
  {
    id: 'instalatii',
    title: 'instalații electrice',
    icon: Zap,
    subtitle: 'de la branșament la priză – control total al energiei',
    description: 'Electricienii noștri experți oferă instalări și reparații sigure și eficiente, atât pentru gospodării, cât și pentru afaceri.',
    features: [
      {
        title: 'branșamente electrice',
        desc: 'facilităm conectarea locuinței sau a afacerii la rețeaua de energie. Gestionăm întregul proces, de la obținerea autorizațiilor necesare până la finalizarea lucrărilor.'
      },
      {
        title: 'instalații rezidențiale și industriale',
        desc: 'oferim servicii complete pentru instalații electrice, asigurând calitatea și siguranța. Începem cu proiectarea și consultanța, colaborând cu clienții pentru a înțelege nevoile lor.'
      },
      {
        title: 'interfoane și sisteme de detecție',
        desc: 'pentru sporirea siguranței și confortului, oferim soluții moderne și eficiente. Interfoanele permit o comunicare facilă și un control al accesului.'
      },
      {
        title: 'priză de pământ și paratrăsnet',
        desc: 'oferim verificări și măsurători pentru priza de pământ. Priza de pământ minimizează riscurile de electrocutare și protejează echipamentele de avarii.'
      }
    ],
    highlights: [
      'servicii sigure și eficiente, folosind echipamente profesionale',
      'toate lucrările respectă standardele de siguranță și reglementările în vigoare',
      'execuție precisă și eficientă, reducând perturbările'
    ]
  },
  {
    id: 'consultanta',
    title: 'consultanță și proiectare',
    icon: Lightbulb,
    subtitle: 'ideile tale, planul nostru',
    description: 'Oferim îndrumare clienților în navigarea soluțiilor electrice, oferind recomandări pentru optimizare și eficiență energetică.',
    features: [
      {
        title: 'analiză tehnică și soluții personalizate',
        desc: 'specialiștii noștri analizează nevoile individuale și propun cele mai potrivite soluții pentru fiecare proiect în parte.'
      },
      {
        title: 'proiectare tehnică detaliată',
        desc: 'elaborăm schițe tehnice detaliate pentru implementarea precisă a sistemelor electrice. Asigurăm o planificare amănunțită care ia în considerare toate aspectele tehnice și de siguranță.'
      },
      {
        title: 'dosare prosumator',
        desc: 'ne ocupăm de formalitățile administrative pentru a facilita conectarea la rețea pentru prosumatori. Gestionăm întregul proces, de la completarea documentației până la coordonarea cu autoritățile.'
      }
    ],
    highlights: [
      'estimări clare de buget și timp',
      'suport complet pentru dosarele de prosumator',
      'ghidare pas cu pas, pe înțelesul tău',
      'instalații electrice de joasă și medie tensiune',
      'dimensionări corecte și eficiente',
      'analize de consum și optimizare energetică'
    ]
  }
];

const faqs = [
  {
    q: 'În ce zonă desfășurați lucrări?',
    a: 'Suntem localizați în județul Timiș, dar suntem flexibili și ne putem deplasa și în alte zone, în funcție de cerințele și nevoile clienților noștri. Această flexibilitate ne permite să acoperim o gamă mai largă de proiecte.'
  },
  {
    q: 'Câți ani de experiență aveți?',
    a: 'Pentru noi, experiența înseamnă proiecte reușite, clienți mulțumiți și sisteme care funcționează bine în timp. Am crescut cu fiecare lucrare, cu fiecare autorizație obținută și cu fiecare provocare rezolvată. Nu ne definim prin vechime, ci prin rezultate reale și expertiză pusă în practică, zi de zi.'
  },
  {
    q: 'Ce servicii oferiți?',
    a: 'Oferim o gamă variată de servicii, adaptate nevoilor fiecărui client. Acestea includ consultanță, proiectare, implementare și mentenanță, asigurându-ne că fiecare proiect este realizat la cele mai înalte standarde de calitate.'
  },
  {
    q: 'Sunteți autorizați ANRE?',
    a: 'Da, suntem autorizați ANRE, ceea ce ne permite să desfășurăm lucrări conform normelor și reglementărilor în vigoare. Această autorizație este o garanție a profesionalismului și a calității serviciilor pe care le oferim.'
  },
  {
    q: 'Care este procesul de implementare a proiectului meu?',
    a: 'Procesul începe cu o discuție detaliată pentru a înțelege pe deplin dorințele și cerințele tale. Pe baza acestor informații, realizăm o ofertă personalizată. După acceptare, programăm lucrarea eficient pentru a asigura finalizarea la timp.'
  },
  {
    q: 'Ce se întâmplă dacă proiectul depășește bugetul?',
    a: 'Ne angajăm să purtăm discuții deschise și transparente cu clienții noștri. Scopul nostru este să evităm surprizele neplăcute și să găsim soluții optime care să mențină costurile accesibile, fără a face rabat de la calitate.'
  },
  {
    q: 'În cât timp pot primi oferta din partea voastră?',
    a: 'Imediat ce avem clarificări asupra cerințelor și un plan detaliat, echipa noastră începe să lucreze la ofertă. Ne străduim să fim cât mai rapizi și eficienți, oferind o estimare precisă într-un timp rezonabil.'
  },
  {
    q: 'Pot cere modificări pe parcursul colaborării?',
    a: 'Suntem întotdeauna deschisi la discuții și modificări pe parcursul implementării proiectului. Înțelegem că cerințele pot evolua și ne dorim să colaborăm îndeaproape cu clienții noștri pentru rezultatul final perfect.'
  }
];

const whyChooseUs = [
  {
    icon: BadgeCheck,
    title: 'expertiză',
    desc: 'ingineri autorizați și electricieni cu experiență reală în instalații electrice, fotovoltaice și branșamente complete, respectând toate normele ANRE.'
  },
  {
    icon: Clock,
    title: 'eficiență',
    desc: 'planificăm execuția și optimizăm soluțiile pentru cel mai bun raport calitate-preț și consum redus de energie.'
  },
  {
    icon: Shield,
    title: 'responsabilitate',
    desc: 'ne asumăm fiecare proiect cu seriozitate, respectând normele tehnice și siguranța clientului. Nu promitem mai mult decât putem livra — dar livrăm exact ce am promis.'
  },
  {
    icon: Users,
    title: 'suport',
    desc: 'rămânem alături de tine și după finalizare, oferind mentenanță, consultanță și intervenții la nevoie.'
  }
];

export const ServicesPage = () => {
  const [selectedService, setSelectedService] = useState(services[0]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <motion.h1
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-6 bg-gradient-to-r from-white via-selectrik-gold to-white bg-clip-text text-transparent text-safe px-2"
            >
              serviciile noastre
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
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-3 sm:mb-4 text-safe px-4"
            >
              serviciile noastre sunt create pentru a răspunde nevoilor diverse ale clienților, oferind soluții personalizate care asigură satisfacție și eficiență.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base md:text-lg text-gray-400 text-safe px-4"
            >
              suntem aici pentru a-ți oferi suport, soluții inteligente și servicii de consultanță.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Service Selector */}
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center mb-8 sm:mb-12 md:mb-16">
            {services.map((service) => (
              <motion.button
                key={service.id}
                onClick={() => setSelectedService(service)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base font-semibold transition-all ${
                  selectedService.id === service.id
                    ? 'bg-gradient-to-r from-selectrik-blue to-selectrik-gold text-white shadow-lg'
                    : 'bg-selectrik-dark/40 backdrop-blur-sm border border-selectrik-gold/20 text-gray-200 hover:border-selectrik-gold/50'
                }`}
              >
                <service.icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="text-safe whitespace-nowrap">{service.title}</span>
              </motion.button>
            ))}
          </div>

          {/* Service Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedService.id}
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 0.4 }}
              className="space-y-12"
            >
              {/* Service Header */}
              <div className="text-center px-4">
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br from-selectrik-blue to-selectrik-gold p-0.5 mb-4 sm:mb-6">
                  <div className="w-full h-full rounded-xl sm:rounded-2xl bg-selectrik-dark flex items-center justify-center">
                    <selectedService.icon className="w-8 h-8 sm:w-10 sm:h-10 text-selectrik-gold" />
                  </div>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 text-safe">{selectedService.title}</h2>
                <p className="text-base sm:text-lg md:text-xl text-selectrik-gold mb-4 sm:mb-6 text-safe">{selectedService.subtitle}</p>
                <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-3xl mx-auto text-safe leading-relaxed">{selectedService.description}</p>
              </div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6 px-2 sm:px-0">
                {selectedService.features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="bg-selectrik-dark/60 backdrop-blur-sm border border-selectrik-gold/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-selectrik-gold/50 transition-all"
                  >
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 text-safe">{feature.title}</h3>
                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed text-safe">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>

              {/* Highlights */}
              <div className="bg-gradient-to-br from-selectrik-blue/10 to-selectrik-gold/10 border border-selectrik-gold/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 mx-2 sm:mx-0">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 text-center text-safe">beneficii cheie</h3>
                <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
                  {selectedService.highlights.map((highlight, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="flex items-start gap-2 sm:gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-selectrik-gold flex-shrink-0 mt-1" />
                      <span className="text-sm sm:text-base text-gray-200 text-safe">{highlight}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 sm:py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-selectrik-blue/5 to-transparent" />
        
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 text-safe px-4">de ce să ne alegi</h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '8rem' }}
              transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="h-1.5 bg-selectrik-gold mx-auto"
            />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {whyChooseUs.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="bg-selectrik-dark/60 backdrop-blur-sm border border-selectrik-gold/20 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 h-full hover:border-selectrik-gold/50 transition-all">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-selectrik-blue to-selectrik-gold p-0.5 mb-4 sm:mb-6">
                    <div className="w-full h-full rounded-xl sm:rounded-2xl bg-selectrik-dark flex items-center justify-center">
                      <item.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-selectrik-gold" />
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3 text-safe">{item.title}</h3>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed text-safe">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 text-safe px-4">întrebări și răspunsuri</h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '8rem' }}
              transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="h-1.5 bg-selectrik-gold mx-auto"
            />
          </motion.div>

          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="bg-selectrik-dark/60 backdrop-blur-sm border border-selectrik-gold/20 rounded-lg sm:rounded-xl overflow-hidden hover:border-selectrik-gold/50 transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 md:p-6 text-left"
                >
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white pr-3 sm:pr-4 text-safe leading-snug">{faq.q}</h3>
                  <ChevronDown
                    className={`w-4 h-4 sm:w-5 sm:h-5 text-selectrik-gold flex-shrink-0 transition-transform ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6 text-sm sm:text-base text-gray-300 leading-relaxed text-safe">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden max-w-5xl mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-selectrik-blue via-selectrik-dark to-selectrik-blue opacity-90" />
            
            <div className="relative p-6 sm:p-8 md:p-12 lg:p-16 text-center">
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 text-safe px-2">
                ready to brighten the future with us?
              </h3>
              <p className="text-base sm:text-lg md:text-xl text-gray-100 mb-6 sm:mb-8 max-w-2xl mx-auto text-safe px-2">
                alături de noi, vei avea șansa de a explora idei inovatoare și de a contribui la proiecte care pot schimba lumea.
              </p>
              <p className="text-selectrik-gold font-semibold mb-6 sm:mb-8 text-base sm:text-lg text-safe">
                prima consultanță este gratuită!
              </p>
              
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-selectrik-gold rounded-full font-bold text-selectrik-dark text-sm sm:text-base md:text-lg shadow-2xl overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2 sm:gap-3 whitespace-nowrap">
                    contactează-ne
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};