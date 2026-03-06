import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AboutSection = () => {
  // Controle de estado para alternar entre as duas telas do mockup
  const [activeView, setActiveView] = useState<'dashboard' | 'kanban'>('dashboard');
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

  useEffect(() => {
    // Alterna a visualização a cada 8 segundos
    const interval = setInterval(() => {
      setActiveView((prev) => (prev === 'dashboard' ? 'kanban' : 'dashboard'));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={ref}
      id="sobre"
      className="relative py-32 px-6 bg-[#020005] overflow-hidden font-sans"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(30px)",
        filter: visible ? "blur(0px)" : "blur(10px)",
        transition: "opacity 800ms ease-out, transform 800ms ease-out, filter 800ms ease-out",
      }}
    >

      {/* Background Global - Luzes difusas ultra profundas */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-0 w-full h-full bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-[#4c1d95]/15 via-transparent to-transparent blur-[120px] -translate-y-1/2" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[700px] h-[700px] bg-[#7e22ce]/10 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-[1240px] mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

        {/* =========================================
            COLUNA ESQUERDA - TEXTOS CLEAN & PREMIUM
            ========================================= */}
        <div className="flex-1 text-center lg:text-left z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-[clamp(2rem,3.8vw,3.5rem)] font-medium leading-[1.1] tracking-tight mb-6">
              <span
                className="block mb-2"
                style={{
                  background: "linear-gradient(180deg, #FFFFFF 0%, #71717A 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Não é só um CRM.
              </span>
              <span
                className="block"
                style={{
                  background: "linear-gradient(180deg, #FFFFFF 0%, #71717A 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                É o seu centro de comando.
              </span>
            </h2>

            <p className="text-xl md:text-2xl font-light mb-8 leading-snug text-purple-50/90 max-w-[500px] mx-auto lg:mx-0">
              Tudo que sua empresa precisa para vender mais e crescer com inteligência.
            </p>

            <p className="text-[#a1a1aa] text-[1.1rem] font-light leading-[1.9] max-w-[580px] mx-auto lg:mx-0">
              O AvanceCRM foi projetado para consolidar a sua operação. Mais do que um software, entregamos uma estrutura de alta performance com pipelines visuais, agentes de IA personalizados e dashboards em tempo real. Tudo conectado nativamente para que o seu comando seja absoluto e sua escala, inevitável.
            </p>
          </motion.div>
        </div>

        {/* =========================================
            COLUNA DIREITA - 3D MACBOOK MOCKUP
            ========================================= */}
        <div
          className="flex-[1.2] w-full relative flex justify-center items-center mt-10 lg:mt-0"
          style={{ perspective: "1400px" }} // Ativa o ambiente 3D
        >

          {/* Luz de Fundo (Orbe Central) */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-[#9333ea]/30 blur-[100px] rounded-full pointer-events-none z-0"
          />

          {/* O CONTAINER 3D QUE ROTACIONA E FLUTUA */}
          <motion.div
            className="w-full max-w-[620px] relative z-10"
            style={{ transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, rotateY: 0, rotateX: 0, y: 30 }}
            // Rotação principal leva 1.2s para terminar
            whileInView={{ opacity: 1, rotateY: -18, rotateX: 8, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {/* Efeito de Flutuação Contínuo do Laptop */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformStyle: "preserve-3d" }}
            >

              {/* =========================================
                  FLOATING WIDGET 1: AGENTE IA
                  (Animação de Entrada APÓS o giro)
                  ========================================= */}
              <div className="absolute -top-[5%] -right-[5%] md:-right-[10%] z-30" style={{ transform: "translateZ(80px)" }}>
                <motion.div
                  initial={{ opacity: 0, filter: 'blur(15px)' }}
                  whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }} // Aguarda 1.2s
                >
                  <motion.div
                    animate={{ y: [-8, 8, -8] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                    className="flex items-center gap-3.5 px-5 py-4 rounded-2xl bg-[#170b2e]/90 backdrop-blur-xl border border-purple-500/20 shadow-[0_20px_40px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)]"
                  >
                    {/* Waveform animado simulando a IA */}
                    <div className="flex items-end gap-[3px] h-4 w-6">
                      <motion.div animate={{ height: ["40%", "100%", "40%"] }} transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }} className="w-1.5 bg-[#c084fc] rounded-full" />
                      <motion.div animate={{ height: ["20%", "80%", "20%"] }} transition={{ duration: 0.8, delay: 0.2, repeat: Infinity, ease: "easeInOut" }} className="w-1.5 bg-[#d8b4fe] rounded-full shadow-[0_0_8px_#d8b4fe]" />
                      <motion.div animate={{ height: ["70%", "30%", "70%"] }} transition={{ duration: 0.8, delay: 0.4, repeat: Infinity, ease: "easeInOut" }} className="w-1.5 bg-[#c084fc] rounded-full" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white text-[0.9rem] font-light tracking-tight">Agente de I.A</span>
                      <span className="text-purple-300/80 text-[0.65rem] uppercase tracking-wider font-light">Qualificando Lead...</span>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              {/* =========================================
                  MACBOOK SCREEN
                  ========================================= */}
              <div className="rounded-[1.2rem] p-2 md:p-3 border-[3px] border-[#222] relative z-[2] shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-[#111]">

                <div className="rounded-lg overflow-hidden border border-[#2a2a2a] relative bg-[#0a0a0a] aspect-[16/10] flex flex-col">

                  {/* Top Bar Fictícia do CRM */}
                  <div className="w-full h-8 bg-[#151515] border-b border-[#222] flex items-center px-4 relative z-20">
                    <div className="w-32 h-2.5 bg-[#2a2a2a] rounded-sm" />
                    <div className="ml-auto flex gap-2">
                      <div className="w-8 h-2.5 bg-purple-500/30 rounded-sm" />
                      <div className="w-6 h-6 rounded-full bg-[#2a2a2a]" />
                    </div>
                  </div>

                  {/* Wrapper para Transição das Views */}
                  <div className="flex-1 relative overflow-hidden">
                    <AnimatePresence mode="wait">

                      {/* --- VISUALIZAÇÃO 1: DASHBOARD --- */}
                      {activeView === 'dashboard' && (
                        <motion.div
                          key="dashboard"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.6 }}
                          className="absolute inset-0 flex"
                        >
                          <div className="w-16 h-full border-r border-[#222] bg-[#0d0d0d] flex flex-col items-center py-4 gap-4">
                            <div className="w-8 h-8 rounded bg-gradient-to-br from-purple-600 to-purple-800 shadow-[0_0_15px_rgba(147,51,234,0.4)]" />
                            <div className="w-6 h-6 rounded bg-[#222]" />
                            <div className="w-6 h-6 rounded bg-[#222]" />
                            <div className="w-6 h-6 rounded bg-[#222]" />
                          </div>

                          <div className="flex-1 p-4 md:p-5 flex flex-col gap-4">
                            <div className="flex gap-3">
                              <div className="flex-1 h-14 rounded-xl bg-white/[0.02] border border-white/[0.05] p-3 flex flex-col justify-between">
                                <div className="w-8 h-2 rounded bg-white/[0.05]" />
                                <div className="w-16 h-3 rounded bg-zinc-400" />
                              </div>
                              <div className="flex-1 h-14 rounded-xl bg-white/[0.02] border border-white/[0.05] p-3 flex flex-col justify-between">
                                <div className="w-8 h-2 rounded bg-white/[0.05]" />
                                <div className="w-12 h-3 rounded bg-[#c084fc]" />
                              </div>
                            </div>

                            <div className="flex-1 rounded-xl bg-gradient-to-b from-white/[0.02] to-transparent border border-white/[0.05] relative overflow-hidden flex items-end">
                              <div className="absolute inset-0 flex flex-col justify-between py-4 px-2 pointer-events-none opacity-20">
                                <div className="w-full h-[1px] bg-white/[0.1]" />
                                <div className="w-full h-[1px] bg-white/[0.1]" />
                                <div className="w-full h-[1px] bg-white/[0.1]" />
                              </div>

                              <svg viewBox="0 0 400 150" className="w-full h-[80%] absolute bottom-0 left-0 preserve-aspect-ratio-none">
                                <defs>
                                  <linearGradient id="chartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="rgba(192, 132, 252, 0.4)" />
                                    <stop offset="100%" stopColor="rgba(192, 132, 252, 0)" />
                                  </linearGradient>
                                </defs>
                                <motion.path
                                  initial={{ pathLength: 0, opacity: 0 }}
                                  animate={{ pathLength: 1, opacity: 1 }}
                                  transition={{ duration: 2, ease: "easeInOut", delay: 0.2 }}
                                  d="M 0 120 C 50 120, 80 50, 150 70 C 200 85, 250 20, 300 40 C 350 60, 380 10, 400 10"
                                  fill="none"
                                  stroke="#c084fc"
                                  strokeWidth="3"
                                  style={{ filter: "drop-shadow(0 0 6px #c084fc)" }}
                                />
                                <motion.path
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 1, delay: 1.5 }}
                                  d="M 0 120 C 50 120, 80 50, 150 70 C 200 85, 250 20, 300 40 C 350 60, 380 10, 400 10 L 400 150 L 0 150 Z"
                                  fill="url(#chartGrad)"
                                />
                              </svg>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* --- VISUALIZAÇÃO 2: KANBAN PIPELINE --- */}
                      {activeView === 'kanban' && (
                        <motion.div
                          key="kanban"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.6 }}
                          className="absolute inset-0 flex"
                        >
                          <div className="w-16 h-full border-r border-[#222] bg-[#0d0d0d] flex flex-col items-center py-4 gap-4">
                            <div className="w-6 h-6 rounded bg-[#222]" />
                            <div className="w-8 h-8 rounded bg-gradient-to-br from-purple-600 to-purple-800 shadow-[0_0_15px_rgba(147,51,234,0.4)]" />
                            <div className="w-6 h-6 rounded bg-[#222]" />
                            <div className="w-6 h-6 rounded bg-[#222]" />
                          </div>

                          <div className="flex-1 p-4 md:p-5 flex flex-col gap-3 relative">
                            <div className="flex justify-between items-center mb-1">
                              <div className="w-32 h-4 rounded bg-white/[0.08]" />
                              <div className="w-20 h-6 rounded-full bg-purple-500/20 border border-purple-500/30" />
                            </div>

                            <div className="flex-1 flex gap-3 relative">
                              <div className="flex-1 rounded-xl bg-[#121212] border border-[#222] flex flex-col p-2.5 gap-2.5">
                                <span className="text-[0.65rem] font-bold text-zinc-500 uppercase tracking-wider px-1">Novos Leads</span>
                                <div className="w-full h-[45px] rounded-md bg-[#1a1a1a] border border-[#2a2a2a]" />
                                <div className="w-full h-[45px] rounded-md bg-[#1a1a1a] border border-[#2a2a2a]" />
                              </div>

                              <div className="flex-1 rounded-xl bg-purple-900/10 border border-purple-500/20 flex flex-col p-2.5 gap-2.5 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
                                <span className="text-[0.65rem] font-bold text-purple-400 uppercase tracking-wider px-1 flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                                  IA Atuando
                                </span>
                                <div className="w-full h-[45px] rounded-md bg-[#1a1a1a] border border-[#2a2a2a]" />
                              </div>

                              <div className="flex-1 rounded-xl bg-[#121212] border border-[#222] flex flex-col p-2.5 gap-2.5">
                                <span className="text-[0.65rem] font-bold text-zinc-500 uppercase tracking-wider px-1">Fechamento</span>
                                <div className="w-full h-[45px] rounded-md bg-[#1a1a1a] border border-[#2a2a2a]" />
                              </div>

                              <motion.div
                                className="absolute w-[31%] h-[45px] bg-gradient-to-r from-[#9333ea] to-[#c084fc] rounded-md shadow-[0_10px_25px_rgba(147,51,234,0.5)] border border-purple-300/40 p-2.5 flex flex-col justify-center gap-2 z-20"
                                animate={{
                                  left: ["1.5%", "1.5%", "34.5%", "34.5%", "67.5%", "67.5%", "1.5%"],
                                  top: ["30%", "30%", "45%", "45%", "15%", "15%", "30%"],
                                  opacity: [0, 1, 1, 1, 1, 0, 0],
                                  scale: [0.95, 1, 1, 1.05, 1, 0.95, 0.95]
                                }}
                                transition={{
                                  duration: 6,
                                  repeat: Infinity,
                                  times: [0, 0.1, 0.35, 0.55, 0.8, 0.9, 1],
                                  ease: "easeInOut"
                                }}
                              >
                                <div className="flex items-center gap-2">
                                  <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
                                  <div className="w-1/2 h-1.5 rounded-full bg-white/90" />
                                </div>
                                <div className="w-[70%] h-1.5 rounded-full bg-white/40 ml-6" />
                              </motion.div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* =========================================
                  MACBOOK BASE
                  ========================================= */}
              <div
                className="w-[110%] h-4 -mt-0.5 -ml-[5%] rounded-b-[24px] relative z-[1]"
                style={{
                  background: "linear-gradient(to bottom, #2a2a2a, #0a0a0a)",
                  boxShadow: "0 30px 60px rgba(0,0,0,0.8)",
                }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[22%] h-1.5 rounded-b-md bg-[#000]" />
              </div>

              {/* =========================================
                  FLOATING WIDGET 2: CONVERSÃO
                  (Animação de Entrada APÓS o giro)
                  ========================================= */}
              <div className="absolute bottom-[5%] -left-[5%] md:-left-[10%] z-30" style={{ transform: "translateZ(60px)" }}>
                <motion.div
                  initial={{ opacity: 0, filter: 'blur(15px)' }}
                  whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }} // Aguarda 1.4s (um pouco depois do primeiro widget para dar cadência)
                >
                  <motion.div
                    animate={{ y: [8, -8, 8] }}
                    transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                    className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-[#170b2e]/90 backdrop-blur-xl border border-white/[0.08] shadow-[0_20px_40px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)]"
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="text-white text-[0.9rem] font-light tracking-tight">Pipeline Ativo</span>
                      <span className="text-emerald-400 text-[0.7rem] font-light flex items-center gap-1">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-3 h-3"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>
                        +124 Leads hoje
                      </span>
                    </div>

                    {/* Mini Ring Progress */}
                    <div className="relative w-10 h-10 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
                        <motion.path
                          initial={{ strokeDasharray: "0, 100" }}
                          whileInView={{ strokeDasharray: "85, 100" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: 2, ease: "easeOut" }} // Atrasado para acompanhar a entrada do popup
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none" stroke="#c084fc" strokeWidth="3" strokeDasharray="85, 100"
                          style={{ filter: "drop-shadow(0 0 4px #c084fc)" }}
                        />
                      </svg>
                      <span className="absolute text-[0.55rem] font-light text-white">85%</span>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;