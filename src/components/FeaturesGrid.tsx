import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    badge: "Arquitetura",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
    title: "Estrutura Operacional",
    desc: "Desenhamos pipelines personalizados que espelham sua jornada de vendas real.",
  },
  {
    badge: "IA Proprietária",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" /><path d="M16 14H8a4 4 0 0 0-4 4v2h16v-2a4 4 0 0 0-4-4z" />
      </svg>
    ),
    title: "Agentes de I.A",
    desc: "Agentes de IA personalizados que qualificam e agendam clientes no WhatsApp 24/7.",
  },
  {
    badge: "Eficiência",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: "Sistemas de Automação",
    desc: "Eliminamos o trabalho manual com fluxos inteligentes pelo funil.",
  },
  {
    badge: "Centralização",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: "Comunicação Centralizada",
    desc: "Todos os canais de atendimento da sua equipe em um único painel fácil de usar.",
  },
  {
    badge: "Performance",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Engenharia de Funis",
    desc: "Criamos funis específicos para seus serviços, otimizando para conversão.",
  },
  {
    badge: "Data Intelligence",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    title: "Dashboards de Gestão",
    desc: "Configure métricas estratégicas para decisões baseadas em ROI e dados reais.",
  },
  {
    badge: "Digital Assets",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: "Criação de Páginas",
    desc: "Desenvolvemos landing pages de alta performance integradas nativamente.",
  },
  {
    badge: "Ecosystem",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: "Integração Completa",
    desc: "Conectamos sua operação aos sistemas que você já usa (ERP, Financeiro).",
  },
  {
    badge: "High Performance",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    title: "Agenda Inteligente",
    desc: "Automatizamos a marcação com lembretes que eliminam o no-show.",
  },
];

// --- Variantes do Framer Motion para os Slides com Blur ---
const leftSlideVariant = {
  hidden: { opacity: 0, x: -60, filter: 'blur(10px)' },
  visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: "easeOut" } }
};

const rightSlideVariant = {
  hidden: { opacity: 0, x: 60, filter: 'blur(10px)' },
  visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: "easeOut" } }
};

const centerHubVariant = {
  hidden: { opacity: 0, scale: 0.8, filter: 'blur(15px)' },
  visible: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 1, ease: "easeOut" } }
};

const textFadeVariant = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: "easeOut" } }
};

const mobileLineVariant = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1, transition: { duration: 0.3, ease: "easeOut" } }
};

const FeaturesGrid = () => {
  const leftFeatures = features.slice(0, 4);
  const rightFeatures = features.slice(4, 9);

  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        } else if (entry.boundingClientRect.top > 0) {
          // Seção ainda não foi alcançada (está abaixo da viewport) — mantém invisível
          setVisible(false);
        }
        // Se saiu pelo topo (cliente passou e voltou), reseta para animar de novo
        else {
          setVisible(false);
        }
      },
      { threshold: 0 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="funcionalidades"
      className="relative py-24 bg-[#030303] overflow-hidden"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(30px)",
        filter: visible ? "blur(0px)" : "blur(10px)",
        transition: "opacity 800ms ease-out, transform 800ms ease-out, filter 800ms ease-out",
      }}
    >

      {/* Luz de fundo sutil */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none rounded-full"
        style={{ background: "radial-gradient(circle, rgba(147, 51, 234, 0.03) 0%, transparent 60%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Headings - Fade In de baixo pra cima */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={textFadeVariant}
          className="text-center mb-24 flex flex-col items-center"
        >
          <span className="text-[#c084fc] font-light tracking-[0.2em] uppercase text-xs mb-4 block">
            Plataforma Integrada
          </span>
          <h2
            className="text-4xl md:text-5xl font-medium mb-6 tracking-tight"
            style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #71717A 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
          >
            Ecossistema Conectado
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-[1.05rem] font-light leading-relaxed">
            Uma operação de elite, estruturada do zero para sua empresa. Todas as soluções integradas em uma única plataforma inteligente.
          </p>
        </motion.div>

        {/* =========================================================
            LAYOUT DESKTOP (MANTIDO INTACTO COM AS BOLINHAS) 
            ========================================================= */}
        <div className="hidden lg:flex items-center justify-center w-full">

          {/* Coluna Esquerda (4 Cards) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
            className="flex flex-col justify-between w-[320px] h-[432px] relative z-20"
          >
            {leftFeatures.map((f, i) => (
              <motion.div key={i} variants={leftSlideVariant}>
                <FeatureCard feature={f} />
              </motion.div>
            ))}
          </motion.div>

          {/* Área Central (Hub e Linhas) */}
          <div className="relative w-[300px] h-[600px] flex justify-center items-center z-10">

            {/* SVG Lines & Moving Dots (Desktop) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 600">
              <defs>
                <linearGradient id="lineGradLeft" x1="100%" y1="0%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="rgba(147,51,234,0.6)" />
                  <stop offset="100%" stopColor="rgba(147,51,234,0.05)" />
                </linearGradient>
                <linearGradient id="lineGradRight" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(147,51,234,0.6)" />
                  <stop offset="100%" stopColor="rgba(147,51,234,0.05)" />
                </linearGradient>
              </defs>

              {/* Caminhos da Esquerda Desktop */}
              {[129, 243, 357, 471].map((y, index) => {
                const pathId = `left-path-${index}`;
                const d = `M 150 300 C 75 300, 75 ${y}, 0 ${y}`;
                return (
                  <g key={pathId}>
                    {/* Linha Fina Estática Roxa */}
                    <path id={pathId} d={d} stroke="url(#lineGradLeft)" fill="none" strokeWidth="1" />
                    {/* Bolinha Brilhante Deslizando */}
                    <circle r="2.5" fill="#c084fc" style={{ filter: 'drop-shadow(0 0 5px rgba(192,132,252,0.9))' }}>
                      <animateMotion dur={`${2 + index * 0.3}s`} repeatCount="indefinite">
                        <mpath href={`#${pathId}`} />
                      </animateMotion>
                    </circle>
                  </g>
                );
              })}

              {/* Caminhos da Direita Desktop */}
              {[72, 186, 300, 414, 528].map((y, index) => {
                const pathId = `right-path-${index}`;
                const d = y === 300 ? `M 150 300 L 300 300` : `M 150 300 C 225 300, 225 ${y}, 300 ${y}`;
                return (
                  <g key={pathId}>
                    {/* Linha Fina Estática Roxa */}
                    <path id={pathId} d={d} stroke="url(#lineGradRight)" fill="none" strokeWidth="1" />
                    {/* Bolinha Brilhante Deslizando */}
                    <circle r="2.5" fill="#c084fc" style={{ filter: 'drop-shadow(0 0 5px rgba(192,132,252,0.9))' }}>
                      <animateMotion dur={`${2.2 + index * 0.25}s`} repeatCount="indefinite">
                        <mpath href={`#${pathId}`} />
                      </animateMotion>
                    </circle>
                  </g>
                );
              })}
            </svg>

            {/* Hub Central Animado */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-24 h-24">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={centerHubVariant}
                className="relative w-full h-full bg-[#0a0a0a] border-[2px] border-white rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.1)]"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-white">
                  <rect x="4" y="4" width="16" height="16" rx="4" />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" />
                  <path d="M12 8v-2 M12 18v-2 M8 12H6 M18 12h-2" stroke="currentColor" />
                </svg>
              </motion.div>
            </div>

          </div>

          {/* Coluna Direita (5 Cards) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
            className="flex flex-col justify-between w-[320px] h-[546px] relative z-20"
          >
            {rightFeatures.map((f, i) => (
              <motion.div key={i} variants={rightSlideVariant}>
                <FeatureCard feature={f} />
              </motion.div>
            ))}
          </motion.div>

        </div>

        {/* =========================================================
            LAYOUT MOBILE (Animação Sequencial em Cascata)
            ========================================================= */}
        <motion.div
          className="flex lg:hidden flex-col w-full mt-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.25 } } // Define o ritmo perfeito da cascata
          }}
        >
          {features.map((f, i) => (
            <div key={i} className="flex flex-col">

              {/* Card - Participa da sequência */}
              <motion.div variants={textFadeVariant} className="relative z-10">
                <FeatureCard feature={f} />
              </motion.div>

              {/* Linha Conectora - Participa da sequência logo após o Card */}
              {i !== features.length - 1 && (
                <div className="relative w-[2px] h-6 ml-[23px] my-1 z-0">
                  {/* Fundo sutil da linha */}
                  <div className="absolute inset-0 bg-white/5" />

                  {/* Linha de energia desenhando no momento certo da sequência */}
                  <motion.div
                    variants={mobileLineVariant}
                    className="absolute inset-0 bg-gradient-to-b from-[#c084fc] via-[#9333ea] to-[#d8b4fe] shadow-[0_0_10px_rgba(147,51,234,0.5)]"
                    style={{ originY: 0 }}
                  />
                </div>
              )}
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

// Sub-componente do Card
const FeatureCard = ({ feature }: { feature: any }) => {
  return (
    <div className="flex items-center gap-4 w-full group transition-all duration-300 cursor-default">
      {/* Caixa do Ícone com Gradiente Suave (Clean e Translucido) */}
      <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white bg-gradient-to-br from-[#9333ea]/50 to-zinc-400/10 backdrop-blur-md border border-white/10 shadow-[0_4px_15px_rgba(147,51,234,0.15)] group-hover:scale-105 group-hover:shadow-[0_4px_20px_rgba(147,51,234,0.3)] group-hover:border-white/20 transition-all duration-300">
        {feature.icon}
      </div>

      {/* Textos soltos ao lado */}
      <div className="flex flex-col overflow-hidden">
        <h4 className="text-zinc-200 font-medium text-[0.95rem] mb-0.5 tracking-tight truncate group-hover:text-white transition-colors">
          {feature.title}
        </h4>
        <p className="text-zinc-500 font-light text-[0.8rem] leading-snug line-clamp-2 group-hover:text-zinc-400 transition-colors">
          {feature.desc}
        </p>
      </div>
    </div>
  );
};

export default FeaturesGrid;