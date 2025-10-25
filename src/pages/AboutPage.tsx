import { motion, useScroll, useTransform } from 'framer-motion';
import { Star, Quote, Sparkles, Sun, Shield, Lightbulb, Wrench, CheckCircle2, Timer, Users, BadgePercent, Zap, Heart, Target, ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';

export const AboutPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const videoOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const videoScale = useTransform(scrollY, [0, 300], [1, 1.1]);
  const contentOpacity = useTransform(scrollY, [200, 400], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        if (videoRef.current && !videoRef.current.paused) {
          videoRef.current.pause();
          if (!videoRef.current.muted) {
            videoRef.current.muted = true;
          }
        }
        setShowContent(true);
      } else {
        if (videoRef.current && videoRef.current.paused && showContent) {
          videoRef.current.play();
          videoRef.current.muted = isMuted;
        }
        setShowContent(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMuted, showContent]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };
  const testimonials = [
    {
      name: 'Victoria M',
      date: '2025-01-24',
      text: 'Foarte profesioniști, foarte promți și punctuali. Au răspuns cu răbdare la toate întrebările, mi-au oferit consultanță oricând am avut nevoie. Îi recomand cu drag.'
    },
    {
      name: 'Dragos G',
      date: '2024-11-20',
      text: 'Am avut cu această echipă 3 proiecte. În toate aceste proiecte s-au comportat exemplar, au fost prompti, de încredere și, mai presus de orice, au dat dovadă maximă de profesionalism. Recomand cu încredere!'
    },
    {
      name: 'Ovidiu D',
      date: '2024-11-19',
      text: 'Profesioniști adevărați dedicați profesiei, serioși și bine pregătiți. Recomand cu căldură!'
    },
    {
      name: 'Dragos S',
      date: '2024-07-09',
      text: 'Experiență extrem de reușită, profesioniști desăvârșiți, s-au ocupat prompt de tot (lucrarea a beneficiat de subvențiile guvernamentale cunoscute).'
    },
    {
      name: 'Lia C',
      date: '2024-06-21',
      text: 'Foarte mulțumiți de echipa Selectrik! Carport fotovoltaic realizat excelent prin programul Casa Verde 2023, foarte serioși și receptivi la dorințele clientului, atenți la detalii! Oferta lor a fost foarte corectă pentru o calitate a panourilor superioară!'
    },
    {
      name: 'Adina B',
      date: '2024-06-15',
      text: 'Am fost extrem de mulțumită de profesionalismul de care au dat dovadă. Echipa a fost foarte responsabilă, realizând lucrarea în cel mai scurt timp posibil. Bravo, Selectrik!'
  }
];

  return (
    <div className="min-h-screen pt-20" ref={containerRef}>
      {/* Video Intro Section - Autoplay cu sunet */}
      <section className="relative h-screen overflow-hidden">
        <motion.div
          style={{ opacity: videoOpacity, scale: videoScale }}
          className="absolute inset-0"
        >
          <video
            ref={videoRef}
            autoPlay
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/despre selectrik.mp4" type="video/mp4" />
          </video>

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-selectrik-dark/40 via-transparent to-selectrik-dark" />

          {/* Mute button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={toggleMute}
            className="absolute top-24 right-6 z-20 p-4 rounded-full bg-selectrik-dark/60 backdrop-blur-sm border border-selectrik-gold/30 hover:border-selectrik-gold/60 transition-all"
          >
            {isMuted ? (
              <VolumeX className="w-6 h-6 text-selectrik-gold" />
            ) : (
              <Volume2 className="w-6 h-6 text-selectrik-gold" />
            )}
          </motion.button>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1, repeat: Infinity, repeatType: "reverse" }}
            className="absolute bottom-32 left-1/2 -translate-x-1/2 text-center z-30"
          >
            <p className="text-white text-sm mb-2 font-semibold drop-shadow-lg">Derulează în jos</p>
            <div className="w-6 h-10 border-2 border-selectrik-gold rounded-full mx-auto flex items-start justify-center p-2 bg-selectrik-dark/30 backdrop-blur-sm">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-selectrik-gold rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Content that appears on scroll */}
        <motion.div
          style={{ opacity: contentOpacity }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="container mx-auto px-6 relative z-10">
            <div className="mx-auto max-w-4xl text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-selectrik-dark/60 backdrop-blur-sm ring-1 ring-selectrik-gold/30 mb-6">
                <Sparkles className="w-4 h-4 text-selectrik-gold" />
                <span className="text-sm tracking-wide text-gray-200">să ne cunoaștem mai bine</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white via-selectrik-gold to-white bg-clip-text text-transparent">
                despre noi
              </h1>

              <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                o echipă tânără, dedicată să aducă inovație și profesionalism în domeniul instalațiilor electrice
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Cine suntem - Two Column Layout */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">cine suntem?</h2>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '8rem' }}
              transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="h-1.5 bg-selectrik-gold mx-auto"
            />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-200 leading-relaxed">
                  Suntem o <span className="text-selectrik-gold font-semibold">echipă tânără</span>, dedicată să planifice fiecare proiect în detaliu. Avem încredere în tehnologie și organizare, utilizând diverse aplicații și automatizări pentru a fi cât mai eficienți.
                </p>
                <p className="text-gray-200 leading-relaxed">
                  Ne dorim să aducem o <span className="text-selectrik-gold font-semibold">percepție modernă</span> acestui domeniu prin profesionalism precum și aplicarea unui plan clar și eficient.
                </p>
                <p className="text-gray-200 leading-relaxed">
                  Aducem soarele în locuința ta, transformând fiecare colț într-un spațiu plin de căldură și lumină. Prin <span className="text-selectrik-gold font-semibold">energia verde</span>, poți beneficia de electricitate fără griji.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-6">
                <div className="bg-selectrik-dark/60 backdrop-blur-sm rounded-2xl p-6 border border-selectrik-gold/20">
                  <Shield className="w-8 h-8 text-selectrik-gold mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">100%</div>
                  <div className="text-sm text-gray-300">clienți mulțumiți</div>
                </div>
                <div className="bg-selectrik-dark/60 backdrop-blur-sm rounded-2xl p-6 border border-selectrik-gold/20">
                  <Zap className="w-8 h-8 text-selectrik-gold mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">ANRE</div>
                  <div className="text-sm text-gray-300">autorizat</div>
                </div>
              </div>
            </motion.div>

            {/* Right - MEDIA FRAME 1: Poză/Video echipă la lucru */}
            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-selectrik-dark/40 border border-selectrik-gold/30">
                {/* FRAME 1: Poză/Video cu echipa la lucru sau pozând */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <Users className="w-16 h-16 text-selectrik-gold/40 mx-auto mb-4" />
                    <p className="text-selectrik-gold/60 font-semibold">MEDIA FRAME 1</p>
                    <p className="text-gray-400 text-sm mt-2">Poză sau video cu echipa Selectrik</p>
                    <p className="text-gray-500 text-xs mt-1">(aspect ratio 4:3)</p>
                  </div>
                </div>
                {/* Uncomment și înlocuiește când ai media:
                <img
                  src="/images/echipa-1.jpg"
                  alt="Echipa Selectrik"
                  className="w-full h-full object-cover"
                />
                SAU pentru video:
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src="/videos/echipa-1.mp4" type="video/mp4" />
                </video>
                */}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECȚIUNE NOUĂ: Galerie echipă */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-selectrik-dark via-selectrik-blue/5 to-selectrik-dark" />

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">echipa noastră în acțiune</h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '8rem' }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
              className="h-1.5 bg-selectrik-gold mx-auto"
            />
          </motion.div>

          {/* Grid 2x2 pentru poze/videouri */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* MEDIA FRAME 2 */}
            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="relative group rounded-2xl overflow-hidden aspect-video bg-selectrik-dark/60 border border-selectrik-gold/20 hover:border-selectrik-gold/50 transition-all"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <Wrench className="w-16 h-16 text-selectrik-gold/40 mx-auto mb-4" />
                  <p className="text-selectrik-gold/60 font-semibold">MEDIA FRAME 2</p>
                  <p className="text-gray-400 text-sm mt-2">Echipa la instalare panouri</p>
                  <p className="text-gray-500 text-xs mt-1">(aspect ratio 16:9)</p>
                </div>
              </div>
              {/* Pune poză/video aici: /public/images/echipa-2.jpg sau /videos/echipa-2.mp4 */}
            </motion.div>

            {/* MEDIA FRAME 3 */}
            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative group rounded-2xl overflow-hidden aspect-video bg-selectrik-dark/60 border border-selectrik-gold/20 hover:border-selectrik-gold/50 transition-all"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <Zap className="w-16 h-16 text-selectrik-gold/40 mx-auto mb-4" />
                  <p className="text-selectrik-gold/60 font-semibold">MEDIA FRAME 3</p>
                  <p className="text-gray-400 text-sm mt-2">Proiect finalizat</p>
                  <p className="text-gray-500 text-xs mt-1">(aspect ratio 16:9)</p>
                </div>
              </div>
              {/* Pune poză/video aici */}
            </motion.div>

            {/* MEDIA FRAME 4 */}
            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative group rounded-2xl overflow-hidden aspect-video bg-selectrik-dark/60 border border-selectrik-gold/20 hover:border-selectrik-gold/50 transition-all"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <Users className="w-16 h-16 text-selectrik-gold/40 mx-auto mb-4" />
                  <p className="text-selectrik-gold/60 font-semibold">MEDIA FRAME 4</p>
                  <p className="text-gray-400 text-sm mt-2">Membrii echipei</p>
                  <p className="text-gray-500 text-xs mt-1">(aspect ratio 16:9)</p>
                </div>
              </div>
              {/* Pune poză/video aici */}
            </motion.div>

            {/* MEDIA FRAME 5 */}
            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="relative group rounded-2xl overflow-hidden aspect-video bg-selectrik-dark/60 border border-selectrik-gold/20 hover:border-selectrik-gold/50 transition-all"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <Shield className="w-16 h-16 text-selectrik-gold/40 mx-auto mb-4" />
                  <p className="text-selectrik-gold/60 font-semibold">MEDIA FRAME 5</p>
                  <p className="text-gray-400 text-sm mt-2">Echipamente & siguranță</p>
                  <p className="text-gray-500 text-xs mt-1">(aspect ratio 16:9)</p>
                </div>
              </div>
              {/* Pune poză/video aici */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Despre Serviciile Noastre */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-selectrik-blue/5 to-transparent" />
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">despre serviciile noastre</h2>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '8rem' }}
              transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="h-1.5 bg-selectrik-gold mx-auto mb-6"
            />
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              oferim servicii complete de consultanță și instalare electrică
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Lightbulb, title: 'consultanță & planificare', desc: 'venim la locație și planificăm împreună detaliile proiectului tău.' },
              { icon: Wrench, title: 'instalare electrică', desc: 'execuție corectă, eficientă, conform normelor de siguranță.' },
              { icon: Shield, title: 'garanție & suport', desc: 'produse cu garanție prin parteneri și suport dedicat.' }
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-selectrik-blue to-selectrik-gold opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-all duration-500" />
                <div className="relative bg-selectrik-dark/60 backdrop-blur-sm border border-selectrik-gold/20 rounded-2xl p-8 h-full hover:border-selectrik-gold/50 transition-all duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-selectrik-blue to-selectrik-gold p-0.5 mb-6">
                    <div className="w-full h-full rounded-2xl bg-selectrik-dark flex items-center justify-center">
                      <service.icon className="w-8 h-8 text-selectrik-gold" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{service.desc}</p>
                </div>
              </motion.div>
            ))}
              </div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 grid md:grid-cols-2 gap-6"
          >
            <div className="flex items-center gap-4 bg-selectrik-dark/40 backdrop-blur-sm border border-selectrik-gold/20 rounded-xl p-6">
              <BadgePercent className="w-8 h-8 text-selectrik-gold flex-shrink-0" />
              <p className="text-gray-200">materiale la prețuri avantajoase pentru clienții noștri</p>
              </div>
            <div className="flex items-center gap-4 bg-selectrik-dark/40 backdrop-blur-sm border border-selectrik-gold/20 rounded-xl p-6">
              <Sun className="w-8 h-8 text-selectrik-gold flex-shrink-0" />
              <p className="text-gray-200">LIVOLO cu reduceri semnificative prin parteneriat</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* De ce să ne alegi */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">de ce să ne alegi?</h2>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '8rem' }}
              transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="h-1.5 bg-selectrik-gold mx-auto"
            />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
            {/* Left - Text content */}
            <div className="space-y-6 text-gray-200 text-lg leading-relaxed">
              <p>
                Pentru că suntem dedicați să oferim servicii electrice de <span className="text-selectrik-gold font-semibold">calitate</span>, perfect adaptate cerințelor tale. Suntem transparenți și mereu la dispoziția ta pentru a răspunde la întrebări.
              </p>
              <p>
                Venim cu <span className="text-selectrik-gold font-semibold">soluții personalizate</span>, iar echipa noastră de ingineri și electricieni entuziaști lucrează cot la cot cu tine pentru a înțelege și a duce la bun sfârșit cerințele exacte ale proiectului.
              </p>
            </div>

            {/* Right - MEDIA FRAME 6 */}
            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-selectrik-dark/60 border border-selectrik-gold/20 hover:border-selectrik-gold/50 transition-all">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <Heart className="w-16 h-16 text-selectrik-gold/40 mx-auto mb-4" />
                    <p className="text-selectrik-gold/60 font-semibold">MEDIA FRAME 6</p>
                    <p className="text-gray-400 text-sm mt-2">Echipa dedicată clientului</p>
                    <p className="text-gray-500 text-xs mt-1">(aspect ratio 4:3)</p>
                  </div>
                </div>
                {/* Pune poză/video aici: /public/images/echipa-6.jpg */}
              </div>
            </motion.div>
          </div>

          {/* Feature chips */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {[
              { icon: Shield, label: 'siguranță & standarde' },
              { icon: Sparkles, label: 'soluții personalizate' },
              { icon: Timer, label: 'promptitudine' },
              { icon: CheckCircle2, label: 'calitate verificată' },
              { icon: Users, label: 'relație de încredere' },
              { icon: Sun, label: 'energie sustenabilă' },
            ].map((chip, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 px-5 py-4 bg-selectrik-dark/40 backdrop-blur-sm border border-selectrik-gold/20 rounded-xl hover:border-selectrik-gold/50 transition-all cursor-default"
              >
                <chip.icon className="w-5 h-5 text-selectrik-gold flex-shrink-0" />
                <span className="text-white font-semibold text-sm">{chip.label}</span>
          </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Procesul - Timeline */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-selectrik-gold/5 to-transparent" />
        
        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">cum decurge procesul</h2>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '8rem' }}
              transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="h-1.5 bg-selectrik-gold mx-auto"
            />
          </motion.div>

          <div className="space-y-8">
            {[
              { num: '01', title: 'contactează-ne', desc: 'îți răspundem la întrebări și clarificăm primele detalii.' },
              { num: '02', title: 'evaluare la locație', desc: 'inginerul nostru inspectează și notează cerințele proiectului.' },
              { num: '03', title: 'ofertă & programare', desc: 'stabilim oferta în funcție de amploare și complexitate.' },
              { num: '04', title: 'execuție', desc: 'începem lucrările la termenul agreat și comunicăm progresul.' },
              { num: '05', title: 'garanție & suport', desc: 'rămânem alături de tine pentru orice nelămurire.' }
            ].map((step, i) => (
                <motion.div
                key={i}
                initial={{ opacity: 0, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                className="flex gap-6 items-start group"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-selectrik-blue to-selectrik-gold p-0.5 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-full h-full rounded-2xl bg-selectrik-dark flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">{step.num}</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1 bg-selectrik-dark/40 backdrop-blur-sm border border-selectrik-gold/20 rounded-xl p-6 group-hover:border-selectrik-gold/50 transition-all duration-300">
                  <h4 className="text-2xl font-bold text-white mb-2">{step.title}</h4>
                  <p className="text-gray-300">{step.desc}</p>
                </div>
                </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Misiunea */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Mission statement */}
            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-selectrik-blue via-selectrik-dark to-selectrik-blue opacity-90" />
              <Quote className="absolute -top-8 -right-8 w-32 h-32 text-selectrik-gold/10" />

              <div className="relative p-12 md:p-16">
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="w-6 h-6 text-selectrik-gold" />
                  <p className="text-sm uppercase tracking-widest text-selectrik-gold font-semibold">bright future</p>
                </div>

                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  să iluminăm viitorul.
                </h3>

                <div className="space-y-4 text-lg text-gray-100">
                  <p>
                    Cu proiectele noastre și prin inovațiile constante în domeniul electric, vrem să aducem claritate și informații proaspete celor pasionați de acest sector dinamic.
                  </p>
                  <p>
                    Visăm să avem un impact semnificativ atât asupra instalatorilor, cât și asupra clienților noștri, dorind să ne extindem prezența în cât mai multe case și afaceri.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right - MEDIA FRAME 7 */}
            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-selectrik-dark/60 border border-selectrik-gold/20 hover:border-selectrik-gold/50 transition-all">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <Target className="w-16 h-16 text-selectrik-gold/40 mx-auto mb-4" />
                    <p className="text-selectrik-gold/60 font-semibold">MEDIA FRAME 7</p>
                    <p className="text-gray-400 text-sm mt-2">Viziunea echipei Selectrik</p>
                    <p className="text-gray-500 text-xs mt-1">(aspect ratio 4:3)</p>
                  </div>
                </div>
                {/* Pune poză/video aici: /public/images/echipa-7.jpg */}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-5">
          <Quote className="w-full h-full text-selectrik-gold" />
        </div>
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">ce spun clienții noștri</h2>
            <div className="h-1.5 w-32 bg-gradient-to-r from-transparent via-selectrik-gold to-transparent mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
                <motion.div
                key={idx}
                initial={{ opacity: 0, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                  viewport={{ once: true }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-selectrik-blue/30 to-selectrik-gold/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="relative bg-selectrik-dark/60 backdrop-blur-sm rounded-2xl p-6 border border-selectrik-gold/20 hover:border-selectrik-gold/50 transition-all h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-gray-400">{t.date}</div>
                  </div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-selectrik-gold text-selectrik-gold" />
                    ))}
                  </div>
                  <p className="text-gray-200 leading-relaxed text-sm">{`"${t.text}"`}</p>
                </div>
                </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-selectrik-blue/20 via-selectrik-gold/20 to-selectrik-blue/20 border border-selectrik-gold/30 backdrop-blur-sm">
              <Sparkles className="w-5 h-5 text-selectrik-gold" />
              <p className="font-semibold text-white">
                parteneri — distribuitor LIVOLO: oferim cele mai bune prețuri din zonă!
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
              să începem treaba.
            </h3>
            <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
              îți stăm la dispoziție cu orice detalii suplimentare.
            </p>
            
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-10 py-5 bg-gradient-to-r from-selectrik-blue to-selectrik-gold rounded-full font-bold text-white text-lg shadow-2xl overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  contactează-ne
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-selectrik-gold to-selectrik-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            </Link>

            <div className="mt-8 text-sm text-gray-400">
              <p>SMART ELKISS S.R.L. · Aleea Viilor 24, Timișoara</p>
              <p className="mt-1">0376 442 388 · office@selectrik.ro</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};