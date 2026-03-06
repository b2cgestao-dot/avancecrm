import { useEffect, useState, useCallback } from "react";
import ParticleButton from "./ParticleButton";

const phrases = ["Gere mais Leads", "Aumente o Faturamento", "Escale sua Operação"];

const icons = [
  <svg key="leads" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[75px] h-[75px]">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>,
  <svg key="revenue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[75px] h-[75px]">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>,
  <svg key="scale" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[75px] h-[75px]">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>,
];

const fadeIn = (visible: boolean, delay = 0): React.CSSProperties => ({
  opacity: visible ? 1 : 0,
  transform: visible ? "translateY(0px)" : "translateY(20px)",
  filter: visible ? "blur(0px)" : "blur(10px)",
  transition: `opacity 900ms ease-out ${delay}ms, transform 900ms ease-out ${delay}ms, filter 900ms ease-out ${delay}ms`,
});

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [phase, setPhase] = useState<"active" | "exit">("active");
  const [visible, setVisible] = useState(false);

  const cycle = useCallback(() => {
    setPhase("exit");
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % phrases.length);
      setPhase("active");
    }, 600);
  }, []);

  useEffect(() => {
    const interval = setInterval(cycle, 3000);
    return () => clearInterval(interval);
  }, [cycle]);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-[120px] pb-16 text-center overflow-hidden">

      {/* VIDEO DE FUNDO - APENAS NA HERO */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      >
        <source src="/BackgroundV3.mp4" type="video/mp4" />
      </video>

      {/* OVERLAY ESCURO */}
      <div className="absolute inset-0 bg-black/50 -z-10" />

      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--neon-purple)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--neon-purple)) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          animation: "grid-move 20s linear infinite",
        }}
      />

      {/* Glow */}
      <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[90%] h-[90%] bg-glow-top blur-[100px] pointer-events-none z-0" />

      {/* Pill */}
      <div
        className="relative z-10 px-5 py-2 rounded-full text-sm font-semibold text-accent-purple bg-deep-purple/20 border border-accent-purple/30 backdrop-blur-xl mb-10"
        style={fadeIn(visible, 0)}
      >
        ✦ O CRM de Elite para Operações de Escala
      </div>

      {/* Dynamic icon — sem animação de entrada, já tem a própria */}
      <div className="relative z-10 w-[100px] h-[100px] mx-auto mb-6 flex items-center justify-center">
        {icons.map((icon, i) => (
          <div
            key={i}
            className={`absolute text-accent-purple transition-all duration-500 ${i === activeIndex && phase === "active"
              ? "opacity-100 blur-0 drop-shadow-[0_0_20px_hsl(var(--neon-purple))]"
              : "opacity-0 blur-[12px]"
              }`}
          >
            {icon}
          </div>
        ))}
      </div>

      {/* Headline */}
      <div className="relative z-10 mb-8" style={fadeIn(visible, 150)}>
        <h1 className="text-[clamp(2.5rem,8vw,5.5rem)] font-extrabold leading-none tracking-[-0.04em]">
          <span className="block h-[1.15em] overflow-hidden mb-2">
            <span
              className={`block transition-all duration-500 ${phase === "active"
                ? "opacity-100 blur-0 translate-y-0"
                : "opacity-0 blur-[10px] translate-y-[60px]"
                }`}
              style={{ color: "hsl(var(--accent-purple) / 0.95)" }}
            >
              {phrases[activeIndex]}
            </span>
          </span>
          <span className="text-gradient-main">com AvanceCRM</span>
        </h1>
      </div>

      {/* Subtitle */}
      <p
        className="relative z-10 max-w-2xl text-text-dim text-lg mb-12 leading-relaxed"
        style={fadeIn(visible, 300)}
      >
        O HUB definitivo de vendas e inteligência artificial projetado para estruturar operações de alta performance que buscam o próximo nível.
      </p>

      {/* CTA Button */}
      <div style={fadeIn(visible, 450)}>
        <ParticleButton />
      </div>

    </section>
  );
};

export default HeroSection;