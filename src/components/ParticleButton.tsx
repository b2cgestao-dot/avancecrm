import { useState, useMemo } from "react";

const ParticleButton = () => {
  const [hovered, setHovered] = useState(false);

  const particles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 4,
      })),
    []
  );

  return (
    <div
      className="relative z-20 flex justify-center mb-16"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Particles */}
      <div
        className={`absolute w-[160%] h-[280%] pointer-events-none transition-opacity duration-500 z-[1] ${hovered ? "opacity-0" : "opacity-100"
          }`}
        style={{ top: "-90%", left: "-30%" }}
      >
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              background: "hsl(var(--neon-purple))",
              boxShadow: "0 0 12px hsl(var(--neon-purple))",
              filter: "blur(1px)",
              animation: `move-particle ${p.duration}s infinite linear`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Button wrapper */}
      <a
        href="https://wa.me/5575999777682?text=Olá%2C%20vim%20pelo%20site%20e%20quero%20saber%20mais%20sobre%20o%20AvanceCRM!"
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-[2] p-[2px] rounded-full bg-gradient-to-r from-primary to-accent-purple cursor-pointer transition-all duration-500 w-[330px] shadow-[var(--glow-shadow)] hover:scale-105 hover:-translate-y-1 hover:shadow-[var(--glow-shadow-hover)] group"
      >
        <div className="relative bg-background rounded-full h-[60px] overflow-hidden">
          <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-[60px]">
            <span className="min-h-[60px] w-full flex items-center justify-center gap-3 font-bold text-[1.05rem] text-foreground">
              Quero Conhecer o AvanceCRM
            </span>
            <span className="min-h-[60px] w-full flex items-center justify-center gap-3 font-bold text-[1.05rem] text-gradient-btn">
              Falar com Especialista
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="transition-all duration-400 -translate-x-2.5 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </div>
        </div>
      </a>
    </div>
  );
};

export default ParticleButton;
