import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// --- Componente do Contador Animado ---
const AnimatedNumber = ({ target, suffix, decimals = 0 }: { target: number, suffix: string, decimals?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTimestamp: number;
      const duration = 2000;

      const animate = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic

        setCount(eased * target);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(target);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white flex items-center justify-center drop-shadow-md">
      {count.toFixed(decimals)}
      <span>{suffix}</span>
    </div>
  );
};

const MetricsSection = () => {
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
      className="relative py-32 px-6 bg-[#020005] flex flex-col items-center overflow-hidden font-sans"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(30px)",
        filter: visible ? "blur(0px)" : "blur(10px)",
        transition: "opacity 800ms ease-out, transform 800ms ease-out, filter 800ms ease-out",
      }}
    >

      {/* Background Global - Fundo escuro absoluto para destacar o vidro */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[600px] bg-[#4c1d95] opacity-[0.04] blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-[1100px]">

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-medium mb-6 tracking-tight leading-[1.2]"
            style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #71717A 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
          >
            Números que provam a diferença entre <br className="hidden md:block" /> operar e escalar com inteligência.
          </h2>
        </motion.div>

        {/* =========================================
            BENTO GRID - HIGH-END GLASSMORPHISM
            ========================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full auto-rows-[360px]">

          {/* CARD 1: RETÂNGULO WIDE (Top Left) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-2 relative flex flex-col h-full rounded-[32px] overflow-hidden p-8 group border border-white/[0.04] border-t-white/[0.12] bg-[#0a0514]/40 backdrop-blur-[40px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_20px_40px_rgba(0,0,0,0.5)]"
          >
            {/* Grid super sutil interno (fiel à referência) */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:linear-gradient(to_bottom,black_10%,transparent_60%)] pointer-events-none" />

            {/* --- EFEITO ESFUMAÇADO (SMOKY GLOW) --- 
                Múltiplos orbes de luz sobrepostos com intensidades diferentes para criar volume */}
            <div className="absolute -bottom-[20%] -left-[10%] w-[70%] h-[70%] bg-[#7e22ce]/50 blur-[80px] rounded-full mix-blend-screen pointer-events-none transition-all duration-700 group-hover:scale-110 group-hover:opacity-80" />
            <div className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] bg-[#b026ff]/40 blur-[70px] rounded-full mix-blend-screen pointer-events-none transition-all duration-700 group-hover:scale-110 group-hover:opacity-80" />
            <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[40%] h-[40%] bg-[#d8b4fe]/30 blur-[60px] rounded-full mix-blend-screen pointer-events-none" />

            {/* Elemento Gráfico Centralizado */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center -mt-8">
              <div className="w-14 h-14 bg-[#11091e]/80 border border-purple-500/20 rounded-2xl flex items-center justify-center mb-5 shadow-[0_10px_30px_rgba(147,51,234,0.2)] backdrop-blur-md">
                <svg viewBox="0 0 24 24" fill="none" stroke="#d8b4fe" strokeWidth="2" className="w-6 h-6">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              </div>
              <AnimatedNumber target={314} suffix="+" />
            </div>

            {/* Textos no rodapé */}
            <div className="relative z-10 mt-auto">
              <h3
                className="text-[1.3rem] font-medium mb-2 tracking-tight"
                style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #71717A 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
              >
                Operações Escaladas
              </h3>
              <p className="text-[#a1a1aa] font-light text-[0.9rem] leading-relaxed max-w-md">
                Empresas que transformaram seu processo de vendas com nossa infraestrutura de ponta a ponta.
              </p>
            </div>
          </motion.div>

          {/* CARD 2: QUADRADO (Top Right) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-1 relative flex flex-col h-full rounded-[32px] overflow-hidden p-8 group border border-white/[0.04] border-t-white/[0.12] bg-[#0a0514]/40 backdrop-blur-[40px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_20px_40px_rgba(0,0,0,0.5)]"
          >
            {/* Efeito Esfumaçado - Quadrado 1 */}
            <div className="absolute -bottom-[30%] left-1/2 -translate-x-1/2 w-[120%] h-[70%] bg-[#8b31ff]/40 blur-[80px] rounded-full mix-blend-screen pointer-events-none transition-all duration-700 group-hover:opacity-80" />
            <div className="absolute -bottom-[10%] left-1/2 -translate-x-1/2 w-[60%] h-[50%] bg-[#d8b4fe]/20 blur-[50px] rounded-full mix-blend-screen pointer-events-none" />

            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:linear-gradient(to_bottom,black_10%,transparent_60%)] pointer-events-none" />

            {/* Elemento Gráfico (Slider Mockup) */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center -mt-8 w-full px-2">
              <AnimatedNumber target={38} suffix="+" />
              {/* Slider UI */}
              <div className="w-full h-3 bg-[#171124]/80 backdrop-blur-md rounded-full mt-6 relative border border-white/5 shadow-inner">
                <div className="absolute left-0 top-0 h-full w-[75%] bg-gradient-to-r from-[#7e22ce] to-[#d8b4fe] rounded-full shadow-[0_0_15px_rgba(192,132,252,0.5)]" />
                <div className="absolute left-[75%] top-1/2 -translate-y-1/2 -translate-x-1/2 w-[18px] h-[18px] bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.9)] border-2 border-[#d8b4fe]" />
              </div>
            </div>

            <div className="relative z-10 mt-auto">
              <h3
                className="text-[1.25rem] font-medium mb-2 tracking-tight"
                style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #71717A 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
              >Nichos Validados</h3>
              <p className="text-[#a1a1aa] font-light text-[0.85rem] leading-relaxed">
                De serviços B2B a e-commerces de alto ticket e serviços.
              </p>
            </div>
          </motion.div>

          {/* CARD 3: QUADRADO (Bottom Left) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-1 relative flex flex-col h-full rounded-[32px] overflow-hidden p-8 group border border-white/[0.04] border-t-white/[0.12] bg-[#0a0514]/40 backdrop-blur-[40px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_20px_40px_rgba(0,0,0,0.5)]"
          >
            {/* Efeito Esfumaçado - Quadrado 2 */}
            <div className="absolute -bottom-[30%] left-1/2 -translate-x-1/2 w-[120%] h-[70%] bg-[#8b31ff]/40 blur-[80px] rounded-full mix-blend-screen pointer-events-none transition-all duration-700 group-hover:opacity-80" />
            <div className="absolute -bottom-[10%] left-1/2 -translate-x-1/2 w-[60%] h-[50%] bg-[#e879f9]/20 blur-[50px] rounded-full mix-blend-screen pointer-events-none" />

            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:linear-gradient(to_bottom,black_10%,transparent_60%)] pointer-events-none" />

            {/* Elemento Gráfico (Icons Mockup) */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center -mt-8">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-12 h-12 bg-[#171124]/80 backdrop-blur-md border border-white/5 rounded-full flex items-center justify-center shadow-xl">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="2" className="w-5 h-5"><path d="M20 6L9 17l-5-5" /></svg>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-[#a855f7] to-[#7e22ce] rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(168,85,247,0.6)] border border-[#d8b4fe]/50">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-5 h-5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
                </div>
              </div>
              <AnimatedNumber target={9.8} suffix="x" decimals={1} />
            </div>

            <div className="relative z-10 mt-auto">
              <h3
                className="text-[1.25rem] font-medium mb-2 tracking-tight"
                style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #71717A 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
              >Crescimento</h3>
              <p className="text-[#a1a1aa] font-light text-[0.85rem] leading-relaxed">
                Aumento médio de capacidade em conversão e volume de atendimento.
              </p>
            </div>
          </motion.div>

          {/* CARD 4: RETÂNGULO WIDE (Bottom Right) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-2 relative flex flex-col h-full rounded-[32px] overflow-hidden p-8 group border border-white/[0.04] border-t-white/[0.12] bg-[#0a0514]/40 backdrop-blur-[40px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_20px_40px_rgba(0,0,0,0.5)]"
          >
            {/* Efeito Esfumaçado - Wide Bottom */}
            <div className="absolute -bottom-[20%] -left-[10%] w-[70%] h-[70%] bg-[#7e22ce]/40 blur-[80px] rounded-full mix-blend-screen pointer-events-none transition-all duration-700 group-hover:scale-110 group-hover:opacity-80" />
            <div className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] bg-[#b026ff]/40 blur-[70px] rounded-full mix-blend-screen pointer-events-none transition-all duration-700 group-hover:scale-110 group-hover:opacity-80" />
            <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[40%] h-[40%] bg-[#d8b4fe]/30 blur-[60px] rounded-full mix-blend-screen pointer-events-none" />

            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:linear-gradient(to_bottom,black_10%,transparent_60%)] pointer-events-none" />

            {/* Elemento Gráfico (Flowchart Mockup) */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center -mt-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="px-5 py-2 bg-[#171124]/80 backdrop-blur-md border border-white/5 rounded-full flex items-center justify-center text-xs font-medium text-[#a1a1aa] shadow-lg">Automação</div>
                <div className="w-10 h-[1px] bg-gradient-to-r from-transparent via-[#a855f7] to-transparent opacity-50" />
                <div className="px-5 py-2 bg-gradient-to-r from-[#7e22ce] to-[#a855f7] rounded-full flex items-center justify-center text-xs font-semibold text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] border border-[#d8b4fe]/30">I.A Ativa</div>
                <div className="w-10 h-[1px] bg-gradient-to-r from-transparent via-[#a855f7] to-transparent opacity-50" />
                <div className="px-5 py-2 bg-[#171124]/80 backdrop-blur-md border border-white/5 rounded-full flex items-center justify-center text-xs font-medium text-[#a1a1aa] shadow-lg">Escala</div>
              </div>
              <div className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white flex items-center justify-center drop-shadow-md">
                24<span className="text-[#d8b4fe]">/7</span>
              </div>
            </div>

            <div className="relative z-10 mt-auto">
              <h3
                className="text-[1.3rem] font-medium mb-2 tracking-tight"
                style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #71717A 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
              >Operação Ativa</h3>
              <p className="text-[#a1a1aa] font-light text-[0.9rem] leading-relaxed max-w-md">
                Sua inteligência artificial não dorme, não folga e não perde leads. Coleta e qualifica em tempo integral.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default MetricsSection;