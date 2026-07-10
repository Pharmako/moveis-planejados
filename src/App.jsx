import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  MessageCircle, 
  Hammer, 
  Sliders, 
  Shield, 
  ArrowRight,
  Sparkles,
  Compass,
  Check
} from "lucide-react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  // Navigation scrolling state
  const [isScrolled, setIsScrolled] = useState(false);

  // Calendar dates setup (30 days grid)
  const calendarDays = Array.from({ length: 28 }, (_, i) => i + 1);

  // GSAP animation refs
  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const heroCtaRef = useRef(null);

  // Handle scroll detection for Navbar morphing
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP entrance animations on load
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero fade-up
      gsap.fromTo(
        heroTitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
      );
      gsap.fromTo(
        heroSubtitleRef.current,
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, delay: 0.15, ease: "power2.out" }
      );
      gsap.fromTo(
        heroCtaRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power2.out" }
      );



      // 3. Process Steps & Grid Animation
      gsap.from(".process-timeline-step", {
        scrollTrigger: {
          trigger: "#processo",
          start: "top 95%",
        },
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out"
      });

      // 4. Vitrine grid fade-in
      gsap.from(".vitrine-card", {
        scrollTrigger: {
          trigger: "#vitrine",
          start: "top 75%",
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.18,
        ease: "power3.out"
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative min-h-screen bg-off-white text-chumbo overflow-hidden font-sans-jakarta">
      {/* Global CSS Noise Overlay for visual organic texture */}
      <div className="noise-overlay" />

      {/* HEADER / LOGO (Floating Island Navbar) */}
      <header className="fixed top-5 left-0 right-0 z-50 px-4">
        <div className={`mx-auto max-w-5xl rounded-full flex items-center justify-between px-6 md:px-8 py-3.5 transition-all duration-500 ${
          isScrolled 
            ? "glass-nav-light shadow-lg" 
            : "bg-transparent border border-transparent"
        }`}>
          {/* Logo */}
          <div className={`transition-colors duration-500 ${isScrolled ? "text-chumbo" : "text-white"}`}>
            <svg width="148" height="34" viewBox="0 0 148 34" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 md:h-9 w-auto">
              {/* Capsule */}
              <rect x="2" y="3" width="144" height="28" rx="8" stroke="currentColor" strokeWidth="2" fill="none"/>
              {/* Monogram MP */}
              <path d="M 11,24 L 14,9 L 20,18 L 26,9 C 28,15 28,20 28,24 M 26,9 C 31,4 39,5 39,13 C 39,21 29,21 27,17" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              {/* "Mavich Planejados" Text */}
              <text x="44" y="16" fontFamily="'Outfit', sans-serif" fontWeight="700" fontSize="12" fill="currentColor" letterSpacing="0.03em">Mavich</text>
              <text x="44" y="25" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="600" fontSize="8" fill="currentColor" letterSpacing="0.03em">Planejados</text>
            </svg>
          </div>
          
          {/* Navigation Links */}
          <nav className={`hidden md:flex items-center space-x-8 text-xs uppercase tracking-widest font-sans-outfit font-semibold transition-colors duration-500 ${isScrolled ? "text-chumbo/80" : "text-white/80"}`}>
            <a href="#padrao" className="hover:text-primary-gold transition-colors">O Padrão</a>
            <a href="#processo" className="hover:text-primary-gold transition-colors">O Processo</a>
            <a href="#vitrine" className="hover:text-primary-gold transition-colors">Vitrine</a>
          </nav>
          
          {/* CTA WhatsApp Button */}
          <a 
            href="https://wa.me/9999999999999" 
            target="_blank" 
            rel="noreferrer" 
            className="btn-primary-sage-pill px-5 py-2.5 rounded-full font-sans-outfit font-bold text-[10px] md:text-xs uppercase tracking-wider flex items-center gap-1.5"
          >
            <MessageCircle size={14} className="fill-current" />
            <span>Orçamento</span>
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative h-screen w-full flex items-center justify-center bg-[linear-gradient(to_bottom,rgba(45,46,47,0.45),rgba(45,46,47,0.45)),url('/hero-custom.jpg')] bg-cover bg-center">
        <div className="max-w-4xl mx-auto px-6 text-center z-10 flex flex-col items-center">

          <h1 
            ref={heroTitleRef}
            className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-white font-serif-heading leading-[1.15] mb-6"
          >
            Móveis planejados do seu jeito.
            <br />
            <span className="italic font-normal text-[#FBF6EE] opacity-90">Feitos para durar.</span>
          </h1>

          <p 
            ref={heroSubtitleRef}
            className="text-base sm:text-lg md:text-xl text-off-white/80 font-sans-jakarta max-w-2xl leading-relaxed mb-10 font-light"
          >
            Sabe aquele ambiente que você sempre sonhou? A gente tira do papel com capricho, trazendo o conforto para sua casa.
          </p>

          <div ref={heroCtaRef} className="flex flex-col sm:flex-row gap-4 items-center">
            <a 
              href="https://wa.me/9999999999999" 
              target="_blank" 
              rel="noreferrer" 
              className="btn-primary-sage-pill px-8 py-4 rounded-full font-sans-outfit font-bold text-sm uppercase tracking-widest flex items-center gap-3 shadow-md"
            >
              <MessageCircle size={18} className="fill-current" />
              Fazer um Orçamento
            </a>
            <a 
              href="#vitrine" 
              className="btn-outline-gold-pill px-8 py-4 rounded-full font-sans-outfit font-bold text-sm uppercase tracking-widest"
            >
              Ver Nossos Projetos
            </a>
          </div>
        </div>

        {/* Scroll down indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60">
          <span className="text-[10px] uppercase tracking-widest font-sans-outfit text-white/50">Ver Mais</span>
          <div className="w-[1px] h-6 bg-white/30 animate-pulse"></div>
        </div>
      </section>

      {/* SEÇÃO 2: NOSSO PADRÃO DE QUALIDADE */}
      <section id="padrao" className="py-24 md:py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <span className="text-[11px] font-sans-outfit text-primary-gold uppercase tracking-widest font-semibold">Fundamentos</span>
          <h2 className="text-3xl md:text-5xl font-serif-heading font-semibold text-chumbo mt-2 tracking-tight">Nosso Padrão de Qualidade</h2>
          <p className="text-sm md:text-base text-chumbo-light font-sans-jakarta mt-3 font-light leading-relaxed">
            A gente entende que sua casa é o seu refúgio. Por isso, entregamos o melhor.
          </p>
        </div>

        {/* Grid layout with 3 Columns (border-radius: 24px) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Acabamento de Primeira */}
          <div className="luxury-card card-light rounded-3xl p-8 flex flex-col justify-between hover:shadow-lg transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-full bg-primary-sage/10 flex items-center justify-center mb-6">
                <Hammer className="text-primary-sage" size={20} />
              </div>
              <h3 className="text-xl font-serif-heading font-semibold text-chumbo mb-3">Acabamento de Primeira</h3>
              <p className="text-xs md:text-sm text-chumbo-light font-sans-jakarta leading-relaxed font-light mb-6">
                Cuidamos de cada detalhe para que seus móveis fiquem perfeitos, sem cantos malfeitos ou gavetas que agarram.
              </p>
            </div>
            
            {/* Architectural Drawing Detail SVG */}
            <div className="pt-4 border-t border-sand flex items-center justify-center">
              <svg className="w-full h-24 text-primary-sage/20 mt-2" viewBox="0 0 200 60" fill="none" stroke="currentColor">
                <path d="M20,10 L70,10 L70,50 L20,50 Z" strokeWidth="1" strokeDasharray="2,2" />
                <path d="M70,10 L120,30 L120,50 L70,50 Z" strokeWidth="1" />
                <path d="M120,30 L170,10 L170,30 L120,50 Z" strokeWidth="1" strokeDasharray="3,3" />
                <line x1="20" y1="55" x2="70" y2="55" strokeWidth="0.75" />
                <path d="M20,53 L20,57 M70,53 L70,57" strokeWidth="0.75" />
                <text x="36" y="52" fontSize="5.5" className="fill-chumbo-light font-sans-jakarta font-medium">500mm</text>
                
                <line x1="125" y1="52" x2="175" y2="32" strokeWidth="0.75" />
                <text x="142" y="44" fontSize="5.5" className="fill-chumbo-light font-sans-jakarta font-medium" transform="rotate(-11, 142, 44)">600mm</text>
              </svg>
            </div>
          </div>

          {/* Card 2: Feito para o Seu Espaço */}
          <div className="luxury-card card-light rounded-3xl p-8 flex flex-col justify-between hover:shadow-lg transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-full bg-primary-gold/10 flex items-center justify-center mb-6">
                <Compass className="text-primary-gold" size={20} />
              </div>
              <h3 className="text-xl font-serif-heading font-semibold text-chumbo mb-3">Feito para o Seu Espaço</h3>
              <p className="text-xs md:text-sm text-chumbo-light font-sans-jakarta leading-relaxed font-light mb-6">
                Aproveitamos cada centímetro. O projeto é pensado 100% para o seu conforto e para a rotina da sua família.
              </p>
            </div>

            {/* Smooth Wave SVG */}
            <div className="pt-4 border-t border-sand flex flex-col items-center justify-center">
              <svg className="w-full h-24 text-primary-gold/45 mt-2" viewBox="0 0 200 60">
                <path
                  d="M10,30 C40,55 70,5 100,30 C130,55 160,5 190,30"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="feature-wave-path"
                />
              </svg>
            </div>
          </div>

          {/* Card 3: Atendimento sem Enrolação (Highlighted WhatsApp CTA) */}
          <div className="luxury-card rounded-3xl p-8 flex flex-col justify-between hover:shadow-lg transition-all duration-300 bg-sand/65 border border-primary-gold/45 shadow-sm relative overflow-hidden">
            {/* Subtle decor line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-primary-gold"></div>
            <span className="absolute top-4 right-4 bg-primary-gold/15 text-primary-gold text-[8px] uppercase tracking-widest px-2.5 py-1 rounded-full font-bold">WhatsApp</span>
            
            <div>
              <div className="w-12 h-12 rounded-full bg-primary-sage/10 flex items-center justify-center mb-6">
                <Shield className="text-primary-sage" size={20} />
              </div>
              <h3 className="text-xl font-serif-heading font-semibold text-chumbo mb-3">Atendimento sem Enrolação</h3>
              <p className="text-xs md:text-sm text-chumbo-light font-sans-jakarta leading-relaxed font-light mb-6">
                Você fala direto com quem entende e acompanha tudo de perto, do orçamento até o dia da montagem.
              </p>
            </div>

            <div className="pt-4 border-t border-sand/60 flex flex-col gap-4">
              <a 
                href="https://wa.me/9999999999999" 
                target="_blank" 
                rel="noreferrer" 
                className="w-full py-3 bg-[#25D366] hover:bg-[#20ba56] text-white rounded-2xl font-sans-outfit font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-sm transition-all duration-300 hover:scale-[1.02] active:scale-95"
              >
                <MessageCircle size={15} className="fill-current" />
                Chamar no WhatsApp
              </a>
              <div className="flex items-center justify-center gap-1.5 text-[9px] font-sans-outfit font-semibold text-chumbo-light/60 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse"></span>
                <span>Resposta Rápida</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SEÇÃO 4: O PROCESSO & WOODWORKING MEDIA GRID */}
      <section id="processo" className="py-24 md:py-32 px-6 bg-sand relative z-30">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
            <span className="text-[11px] font-sans-outfit text-primary-gold uppercase tracking-widest font-semibold font-medium">Fluxo</span>
            <h2 className="text-3xl md:text-5xl font-serif-heading font-semibold text-chumbo mt-2 tracking-tight">O Processo</h2>
            <p className="text-sm md:text-base text-chumbo-light font-sans-jakarta mt-3 font-light">
              Veja como é simples e seguro fazer seus móveis com a gente.
            </p>
          </div>

          {/* Timeline Row (Desktop horizontal / Mobile vertical) */}
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start mb-20">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-[28px] left-[15%] right-[15%] h-[1px] bg-primary-gold/30 z-0"></div>

            {/* Step 1 */}
            <div className="process-timeline-step flex flex-col items-center text-center relative z-10">
              <div className="w-14 h-14 rounded-full bg-primary-sage text-white flex items-center justify-center font-serif-heading font-bold italic text-3xl leading-none shadow-md mb-5">
                1
              </div>
              <h3 className="text-lg font-serif-heading font-semibold text-chumbo mb-2">Contato Inicial</h3>
              <p className="text-xs md:text-sm text-chumbo-light font-sans-jakarta max-w-xs leading-relaxed font-light">
                Mande um WhatsApp contando sua ideia. A gente responde rapidinho para entender o que você precisa.
              </p>
            </div>

            {/* Step 2 */}
            <div className="process-timeline-step flex flex-col items-center text-center relative z-10">
              <div className="w-14 h-14 rounded-full bg-primary-gold text-white flex items-center justify-center font-serif-heading font-bold italic text-3xl leading-none shadow-md mb-5">
                2
              </div>
              <h3 className="text-lg font-serif-heading font-semibold text-chumbo mb-2">Projeto e Orçamento</h3>
              <p className="text-xs md:text-sm text-chumbo-light font-sans-jakarta max-w-xs leading-relaxed font-light">
                Visitamos seu espaço ou pegamos sua planta. Montamos um orçamento claro, justo e sem letrinhas miúdas.
              </p>
            </div>

            {/* Step 3 */}
            <div className="process-timeline-step flex flex-col items-center text-center relative z-10">
              <div className="w-14 h-14 rounded-full bg-white text-primary-gold border border-primary-gold/40 flex items-center justify-center font-serif-heading font-bold italic text-3xl leading-none shadow-sm mb-5">
                3
              </div>
              <h3 className="text-lg font-serif-heading font-semibold text-chumbo mb-2">Fabricação e Montagem</h3>
              <p className="text-xs md:text-sm text-chumbo-light font-sans-jakarta max-w-xs leading-relaxed font-light">
                Seu móvel é feito com material de alta durabilidade e montado na sua casa com o máximo de cuidado e limpeza.
              </p>
            </div>
          </div>


        </div>
      </section>

      {/* SECTION 3: A VITRINE (Obras Reais) */}
      <section id="vitrine" className="py-24 md:py-32 px-6 max-w-7xl mx-auto bg-off-white relative z-30">
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <span className="text-[11px] font-sans-outfit text-primary-gold uppercase tracking-widest font-semibold font-medium">Galeria</span>
          <h2 className="text-3xl md:text-5xl font-serif-heading font-semibold text-chumbo mt-2 tracking-tight">Nosso Trabalho</h2>
          <p className="text-sm md:text-base text-chumbo-light font-sans-jakarta mt-3 font-light">
            Portfólio selecionado de ambientes que equilibram funcionalidade sob medida.
          </p>
        </div>

        {/* 2x2 Modern Luxury Grid (border-radius: 24px) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1 */}
          <div className="vitrine-card relative group overflow-hidden rounded-3xl aspect-[4/3] bg-sand border border-sand shadow-sm">
            <img 
              src="/gallery-1-grafite.jpg" 
              alt="Cozinha Planejada Grafite Mavich" 
              className="w-full h-full object-cover filter brightness-95 saturate-[0.8] group-hover:scale-105 group-hover:brightness-100 transition-all duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
              <span className="text-[9px] font-sans-outfit text-primary-gold uppercase tracking-widest font-bold mb-2">Cozinha Integrada</span>
              <h4 className="text-lg md:text-xl font-serif-heading font-semibold text-white">Cozinha Planejada Grafite</h4>
              <p className="text-xs text-white/70 font-sans-jakarta mt-1.5 font-light leading-relaxed max-w-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                Armários planejados com acabamento em laca cinza, iluminação em LED e aproveitamento inteligente de espaço.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="vitrine-card relative group overflow-hidden rounded-3xl aspect-[4/3] bg-sand border border-sand shadow-sm">
            <img 
              src="/gallery-classic-blue.png" 
              alt="Cozinha Planejada Classic Blue Mavich" 
              className="w-full h-full object-cover filter brightness-95 saturate-[0.8] group-hover:scale-105 group-hover:brightness-100 transition-all duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
              <span className="text-[9px] font-sans-outfit text-primary-gold uppercase tracking-widest font-bold mb-2">Gourmet</span>
              <h4 className="text-lg md:text-xl font-serif-heading font-semibold text-white">Cozinha Planejada Classic Blue</h4>
              <p className="text-xs text-white/70 font-sans-jakarta mt-1.5 font-light leading-relaxed max-w-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                Mobiliário sob medida em tom azul clássico, nichos amadeirados e puxadores discretos de alto padrão.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="vitrine-card relative group overflow-hidden rounded-3xl aspect-[4/3] bg-sand border border-sand shadow-sm">
            <img 
              src="/gallery-3-quarto.jpg" 
              alt="Quarto Planejado Bege e Carvalho Mavich" 
              className="w-full h-full object-cover filter brightness-95 saturate-[0.8] group-hover:scale-105 group-hover:brightness-100 transition-all duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
              <span className="text-[9px] font-sans-outfit text-primary-gold uppercase tracking-widest font-bold mb-2">Quarto</span>
              <h4 className="text-lg md:text-xl font-serif-heading font-semibold text-white">Quarto Planejado Bege e Carvalho</h4>
              <p className="text-xs text-white/70 font-sans-jakarta mt-1.5 font-light leading-relaxed max-w-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                Mobiliário planejado com ponte de armários superiores, nichos de cabeceira em madeira clara e cabeceira em ripas de carvalho, tudo com acabamento minimalista em laca bege fosca.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="vitrine-card relative group overflow-hidden rounded-3xl aspect-[4/3] bg-sand border border-sand shadow-sm">
            <img 
              src="/gallery-4-closet.jpg" 
              alt="Closet Planejado Branco Mavich" 
              className="w-full h-full object-cover filter brightness-95 saturate-[0.8] group-hover:scale-105 group-hover:brightness-100 transition-all duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
              <span className="text-[9px] font-sans-outfit text-primary-gold uppercase tracking-widest font-bold mb-2">Closet</span>
              <h4 className="text-lg md:text-xl font-serif-heading font-semibold text-white">Closet Planejado Branco</h4>
              <p className="text-xs text-white/70 font-sans-jakarta mt-1.5 font-light leading-relaxed max-w-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                Mobiliário planejado com divisórias inteligentes, gaveteiros integrados e acabamento minimalista em laca branca.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 5: CALL TO ACTION FINAL */}
      <section className="py-20 md:py-28 px-6 bg-sand border-t border-sand relative z-30">
        <div className="max-w-4xl mx-auto rounded-3xl bg-[linear-gradient(135deg,rgba(161,138,104,0.06),rgba(140,157,134,0.04))] border border-primary-gold/15 p-8 md:p-16 text-center shadow-sm relative overflow-hidden bg-white">
          {/* Subtle decor ambient lights */}
          <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-primary-sage/5 blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-primary-gold/5 blur-3xl"></div>
          
          <h2 className="text-3xl md:text-5xl font-serif-heading font-semibold text-chumbo tracking-tight mb-4">
            Vamos tirar o seu projeto do papel?
          </h2>
          <p className="text-xs md:text-sm text-chumbo-light font-sans-jakarta max-w-xl mx-auto leading-relaxed mb-10 font-light">
            Mande uma mensagem agora e conte pra gente o que você está imaginando para a sua casa. Dê o primeiro passo para seu sonho.
          </p>

          <div className="flex flex-col items-center gap-4">
            <a 
              href="https://wa.me/9999999999999" 
              target="_blank" 
              rel="noreferrer" 
              className="btn-primary-sage-rounded px-10 py-4.5 font-sans-outfit font-bold text-sm uppercase tracking-widest flex items-center gap-2.5 shadow-md shadow-primary-sage/10"
            >
              <MessageCircle size={16} className="fill-current" />
              Chamar no WhatsApp agora
            </a>
            <span className="text-[10px] text-chumbo-light/50 uppercase tracking-widest font-sans-outfit font-semibold">
              Atendimento exclusivo para Betim e região.
            </span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-off-white border-t border-sand py-12 px-6 relative z-30">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="text-chumbo/70">
            <svg width="148" height="34" viewBox="0 0 148 34" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 md:h-9 w-auto mx-auto md:mx-0">
              {/* Capsule */}
              <rect x="2" y="3" width="144" height="28" rx="8" stroke="currentColor" strokeWidth="2" fill="none"/>
              {/* Monogram MP */}
              <path d="M 11,24 L 14,9 L 20,18 L 26,9 C 28,15 28,20 28,24 M 26,9 C 31,4 39,5 39,13 C 39,21 29,21 27,17" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              {/* "Mavich Planejados" Text */}
              <text x="44" y="16" fontFamily="'Outfit', sans-serif" fontWeight="700" fontSize="12" fill="currentColor" letterSpacing="0.03em">Mavich</text>
              <text x="44" y="25" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="600" fontSize="8" fill="currentColor" letterSpacing="0.03em">Planejados</text>
            </svg>
          </div>

          {/* Copyright details */}
          <p className="text-[10px] md:text-xs text-chumbo-light/50 font-sans-jakarta text-center md:text-left">
            &copy; 2026 Mavich Móveis Planejados. Todos os direitos reservados. Desenvolvido por Pharmako Web.
          </p>

          {/* Minimal Green Dot Status */}
          <div className="flex items-center gap-1.5 text-[9px] font-sans-outfit font-semibold text-chumbo-light/50 uppercase tracking-widest bg-sand/40 px-3 py-1.5 rounded-full border border-sand">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-sage animate-pulse"></span>
            <span>Atendimento Disponível</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
