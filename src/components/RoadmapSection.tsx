import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const steps = [
  { num: "01", title: "Onboarding Guiado", desc: "Nossa equipe configura toda a estrutura técnica para você focar no que importa." },
  { num: "02", title: "Integração Total", desc: "Conectamos o AvanceCRM com os sistemas e ferramentas que você já utiliza hoje." },
  { num: "03", title: "IA e Automações", desc: "Seus agentes inteligentes e fluxos automatizados entram no ar imediatamente." },
  { num: "04", title: "Escala e Controle", desc: "Acompanhe o crescimento da sua operação em tempo real pelo dashboard central." },
];

// --- Variantes de Animação ---
const textFadeVariant = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: "easeOut" } }
};

const contentVariants = {
  hidden: { opacity: 0, scale: 0.9, filter: "blur(5px)" },
  visible: (i: number) => ({
    opacity: 1, scale: 1, filter: "blur(0px)",
    transition: { delay: 0.6 + (i * 0.5), duration: 0.8, ease: "easeOut" }
  })
};

const RoadmapSection = () => {
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
      className="relative py-28 px-6 bg-[#030303] overflow-hidden"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(30px)",
        filter: visible ? "blur(0px)" : "blur(10px)",
        transition: "opacity 800ms ease-out, transform 800ms ease-out, filter 800ms ease-out",
      }}
    >

      {/* Luzes de Fundo e Grid Sutil */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-20"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse at center, black, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black, transparent 80%)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] pointer-events-none rounded-full z-0"
        style={{ background: "radial-gradient(ellipse, rgba(147, 51, 234, 0.05) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto w-full">

        {/* Cabeçalho */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={textFadeVariant}
          className="text-center mb-24 flex flex-col items-center"
        >
          <span className="text-[#c084fc] font-light tracking-[0.2em] uppercase text-xs mb-4 block">
            Arquitetura de Implementação
          </span>
          <h2
            className="text-4xl md:text-5xl font-medium mb-6 tracking-tight"
            style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #71717A 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
          >
            Do zero ao controle total <br className="hidden md:block" /> em 4 passos.
          </h2>
          <p className="text-zinc-400 text-[1.05rem] font-light max-w-xl mx-auto">
            Quatro etapas para transformar sua infraestrutura de ponta a ponta.
          </p>
        </motion.div>

        {/* --- TIMELINE DESKTOP (Infinity Wave) --- */}
        <div
          className="hidden lg:block relative w-full max-w-[1060px] mx-auto"
          style={{ aspectRatio: '1060 / 450' }}
        >

          <svg viewBox="0 0 1060 450" className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
            <defs>
              <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(147, 51, 234, 0)" />
                <stop offset="15%" stopColor="#c084fc" />
                <stop offset="50%" stopColor="#ffffff" />
                <stop offset="85%" stopColor="#9333ea" />
                <stop offset="100%" stopColor="rgba(147, 51, 234, 0)" />
              </linearGradient>

              <filter id="waveGlow">
                <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter id="particleGlow">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background Elipses */}
            <ellipse cx="140" cy="225" rx="130" ry="190" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
            <ellipse cx="400" cy="225" rx="130" ry="190" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
            <ellipse cx="660" cy="225" rx="130" ry="190" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
            <ellipse cx="920" cy="225" rx="130" ry="190" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />

            {/* Linha Fina Branca (Traço Base) */}
            <path
              d="M 10 225 A 130 190 0 0 1 270 225 A 130 190 0 0 0 530 225 A 130 190 0 0 1 790 225 A 130 190 0 0 0 1050 225"
              fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"
            />

            {/* Onda Neon Animada */}
            <motion.path
              id="desktopWave"
              d="M 10 225 A 130 190 0 0 1 270 225 A 130 190 0 0 0 530 225 A 130 190 0 0 1 790 225 A 130 190 0 0 0 1050 225"
              fill="none" stroke="url(#waveGrad)" strokeWidth="2.5" filter="url(#waveGlow)"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 3, ease: "easeInOut", delay: 0.2 }}
            />

            {/* Partícula Brilhante com Fade In e Fade Out suaves nas pontas */}
            <motion.g
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 3.2, duration: 1 }}
            >
              <circle r="3" fill="#ffffff" filter="url(#particleGlow)" opacity="0">
                {/* Sincronia de opacidade: 0% -> 5% -> 95% -> 100% da viagem */}
                <animate attributeName="opacity" values="0; 1; 1; 0" keyTimes="0; 0.05; 0.95; 1" dur="12s" repeatCount="indefinite" />
                <animateMotion dur="12s" repeatCount="indefinite" ease="linear">
                  <mpath href="#desktopWave" />
                </animateMotion>
              </circle>
            </motion.g>
          </svg>

          {/* Wrapper Textos Desktop */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            {steps.map((step, i) => {
              const centersX = [140, 400, 660, 920];
              return (
                <div
                  key={i}
                  className="absolute pointer-events-auto flex items-center justify-center"
                  style={{
                    left: `calc((${centersX[i]} / 1060) * 100%)`,
                    top: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <motion.div
                    custom={i}
                    variants={contentVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="flex flex-col items-center justify-center text-center w-[220px]"
                  >
                    <span className="text-3xl font-light text-white tracking-widest mb-3 opacity-90">{step.num}</span>
                    <h3
                      className="font-medium text-lg"
                      style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #71717A 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
                    >
                      {step.title}
                    </h3>
                    <div className="w-8 h-[2px] bg-purple-500/50 my-3 rounded-full" />
                    <p className="text-zinc-400 font-light text-[0.85rem] leading-relaxed">{step.desc}</p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* --- TIMELINE MOBILE (Vertical Infinity Wave) --- */}
        <div
          className="block lg:hidden relative w-full max-w-[350px] mx-auto mt-10"
          style={{ aspectRatio: '350 / 1060' }}
        >

          <svg viewBox="0 0 350 1060" className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
            <defs>
              <linearGradient id="waveGradMobile" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(147, 51, 234, 0)" />
                <stop offset="15%" stopColor="#c084fc" />
                <stop offset="50%" stopColor="#ffffff" />
                <stop offset="85%" stopColor="#9333ea" />
                <stop offset="100%" stopColor="rgba(147, 51, 234, 0)" />
              </linearGradient>
            </defs>

            {/* Background Elipses Verticais */}
            <ellipse cx="175" cy="140" rx="120" ry="130" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
            <ellipse cx="175" cy="400" rx="120" ry="130" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
            <ellipse cx="175" cy="660" rx="120" ry="130" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
            <ellipse cx="175" cy="920" rx="120" ry="130" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />

            {/* Linha Base e Animada Verticais */}
            <path
              d="M 175 10 A 120 130 0 0 1 175 270 A 120 130 0 0 0 175 530 A 120 130 0 0 1 175 790 A 120 130 0 0 0 175 1050"
              fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5"
            />
            <motion.path
              id="mobileWave"
              d="M 175 10 A 120 130 0 0 1 175 270 A 120 130 0 0 0 175 530 A 120 130 0 0 1 175 790 A 120 130 0 0 0 175 1050"
              fill="none" stroke="url(#waveGradMobile)" strokeWidth="2.5" filter="url(#waveGlow)"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 3, ease: "easeInOut", delay: 0.2 }}
            />

            {/* Partícula Mobile com Fade In e Fade Out nas pontas */}
            <motion.g
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 3.2, duration: 1 }}
            >
              <circle r="3" fill="#ffffff" filter="url(#particleGlow)" opacity="0">
                <animate attributeName="opacity" values="0; 1; 1; 0" keyTimes="0; 0.05; 0.95; 1" dur="12s" repeatCount="indefinite" />
                <animateMotion dur="12s" repeatCount="indefinite" ease="linear">
                  <mpath href="#mobileWave" />
                </animateMotion>
              </circle>
            </motion.g>
          </svg>

          {/* Wrapper Textos Mobile */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            {steps.map((step, i) => {
              const centersY = [140, 400, 660, 920];
              return (
                <div
                  key={i}
                  className="absolute pointer-events-auto flex items-center justify-center"
                  style={{
                    top: `calc((${centersY[i]} / 1060) * 100%)`,
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <motion.div
                    custom={i}
                    variants={contentVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="flex flex-col items-center justify-center text-center w-[180px]"
                  >
                    <span className="text-2xl font-light text-white tracking-widest mb-2 opacity-90">{step.num}</span>
                    <h3
                      className="font-medium text-[1rem]"
                      style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #71717A 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
                    >
                      {step.title}
                    </h3>
                    <div className="w-6 h-[2px] bg-purple-500/50 my-2 rounded-full" />
                    <p className="text-zinc-400 font-light text-[0.8rem] leading-snug">{step.desc}</p>
                  </motion.div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default RoadmapSection;