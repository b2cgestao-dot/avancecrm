import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const diffs = [
  {
    label: "Ecossistema Unificado",
    title: "Tudo centralizado,\nzero desperdício.",
    desc: "Chega de 5 ferramentas diferentes que não conversam entre si. No AvanceCRM, marketing, vendas e atendimento operam juntos, em tempo real, eliminando qualquer perda de informação.",
    visual: "hub",
  },
  {
    label: "Autonomia Total",
    title: "I.A que trabalha\nenquanto você dorme.",
    desc: "Seus agentes de IA atendem leads, tiram dúvidas, enviam propostas e agendam reuniões — sem intervenção humana. Uma operação incansável focada apenas em converter.",
    visual: "nodes",
  },
  {
    label: "Crescimento Exponencial",
    title: "Escala real sem\naumentar a equipe.",
    desc: "Empresas que usam o AvanceCRM aumentam sua capacidade de atendimento em até 10x sem contratar novos colaboradores. O lucro cresce, a estrutura permanece enxuta.",
    visual: "scale",
  },
];

const gradientTitle = {
  background: "linear-gradient(180deg, #FFFFFF 0%, #71717A 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const HubVisual = () => (
  <div className="relative w-full h-[250px] md:h-[350px] flex items-center justify-center">
    <motion.div
      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="absolute w-[200px] h-[200px] bg-[#9333ea] rounded-full blur-[80px]"
    />
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute w-[240px] h-[240px] border border-purple-500/20 rounded-full"
    />
    <motion.div
      animate={{ rotate: -360 }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className="absolute w-[160px] h-[160px] border border-purple-400/30 rounded-full border-t-purple-400/80"
    />
    <div className="relative z-10 w-[90px] h-[90px] bg-gradient-to-tr from-[#7e22ce] to-[#d8b4fe] rounded-full shadow-[0_0_40px_rgba(192,132,252,0.8)]" />
  </div>
);

const NodesVisual = () => (
  <div className="relative w-full h-[200px] md:h-[300px] flex items-center justify-center gap-1.5 md:gap-2">
    <div className="absolute inset-0 bg-[#7e22ce]/15 blur-[100px] rounded-full" />
    <div className="absolute w-[80%] h-[1px] bg-purple-500/20 top-1/2 -translate-y-1/2" />
    <motion.div
      animate={{ left: ["10%", "90%", "10%"] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="absolute w-12 h-12 bg-white/20 blur-xl rounded-full top-1/2 -translate-y-1/2 z-10"
    />
    {Array.from({ length: 15 }).map((_, i) => {
      const delay = i * 0.08;
      const heightBase = [20, 35, 50, 80, 100, 70, 40, 60, 90, 100, 60, 40, 50, 30, 20][i];
      return (
        <motion.div
          key={i}
          animate={{ height: [`${heightBase * 0.3}%`, `${heightBase}%`, `${heightBase * 0.3}%`] }}
          transition={{ duration: 1.5, delay, repeat: Infinity, ease: "easeInOut" }}
          className="w-1.5 md:w-2.5 rounded-full bg-gradient-to-t from-[#7e22ce] to-[#d8b4fe] shadow-[0_0_12px_rgba(192,132,252,0.5)] z-0 relative"
        />
      );
    })}
  </div>
);

const ScaleVisual = () => (
  <div className="relative w-full h-[250px] md:h-[350px] flex items-center justify-center">
    <div className="absolute inset-0 bg-[#9333ea]/20 blur-[100px] rounded-full" />
    <motion.div
      animate={{ rotateX: 360, rotateY: 180 }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className="absolute w-[240px] h-[240px] border border-purple-500/30 rounded-full"
      style={{ transformStyle: "preserve-3d" }}
    />
    <motion.div
      animate={{ rotateX: -360, rotateZ: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute w-[180px] h-[180px] border-2 border-purple-400/20 rounded-full border-t-purple-400/60"
      style={{ transformStyle: "preserve-3d" }}
    />
    <motion.span
      animate={{
        scale: [1, 1.05, 1],
        filter: [
          "drop-shadow(0 0 20px rgba(168,85,247,0.3))",
          "drop-shadow(0 0 45px rgba(168,85,247,0.7))",
          "drop-shadow(0 0 20px rgba(168,85,247,0.3))",
        ],
      }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className="relative z-10 text-[6rem] md:text-[8rem] font-medium text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-[#a855f7]"
    >
      10X
    </motion.span>
  </div>
);

const Differentials = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        } else if (entry.boundingClientRect.top > 0) {
          setVisible(false);
        } else {
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
      id="diferenciais"
      className="relative py-32 px-6 bg-[#020005] overflow-hidden font-sans"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(30px)",
        filter: visible ? "blur(0px)" : "blur(10px)",
        transition: "opacity 800ms ease-out, transform 800ms ease-out, filter 800ms ease-out",
      }}
    >
      {/* Background Base */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#4c1d95]/10 via-transparent to-transparent blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto w-full">

        {/* Headline */}
        <div className="text-center mb-24 md:mb-32 flex flex-col items-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-light tracking-[0.2em] uppercase mb-6">
            Alto Padrão
          </span>
          <h2
            className="text-[clamp(2.2rem,5vw,3.5rem)] font-medium leading-[1.1] tracking-tight max-w-3xl"
            style={gradientTitle}
          >
            Por que empresas de alto padrão{" "}
            <br className="hidden md:block" />
            escolhem o AvanceCRM?
          </h2>
        </div>

        {/* CONTAINER DA TIMELINE */}
        <div className="relative w-full">

          {/* Spine Line */}
          <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-[1px] md:-translate-x-1/2 bg-white/[0.05] z-0">
            <motion.div
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#d8b4fe] via-[#7e22ce] to-transparent shadow-[0_0_15px_rgba(168,85,247,0.8)]"
              style={{ originY: 0 }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-200px" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>

          {/* BLOCOS ZIGUE-ZAGUE */}
          <div className="flex flex-col gap-24 md:gap-32 w-full relative z-10">
            {diffs.map((d, i) => {
              const isEven = i % 2 === 0;
              return (
                <div
                  key={i}
                  className={`flex flex-col md:flex-row items-center w-full gap-10 md:gap-20 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Ponto na Linha Central */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#020005] border-2 border-[#a855f7] items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.5)] z-20">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  </div>

                  {/* Lado do Texto */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`flex-1 flex flex-col w-full pl-16 md:pl-0 ${isEven ? "md:text-right md:items-end" : "md:text-left md:items-start"}`}
                  >
                    <span className="text-[#c084fc] text-xs font-light uppercase tracking-[0.2em] mb-4">
                      {d.label}
                    </span>
                    <h3
                      className="text-3xl md:text-4xl font-medium mb-6 leading-[1.2] tracking-tight whitespace-pre-line"
                      style={gradientTitle}
                    >
                      {d.title}
                    </h3>
                    <p className="text-[#a1a1aa] text-[1.05rem] leading-relaxed max-w-[450px] font-light">
                      {d.desc}
                    </p>
                  </motion.div>

                  {/* Lado Visual */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 50 : -50, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="flex-1 w-full pl-12 md:pl-0 flex items-center justify-center"
                  >
                    <div className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] flex items-center justify-center overflow-visible group">
                      {d.visual === "hub" && <HubVisual />}
                      {d.visual === "nodes" && <NodesVisual />}
                      {d.visual === "scale" && <ScaleVisual />}
                    </div>
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

export default Differentials;