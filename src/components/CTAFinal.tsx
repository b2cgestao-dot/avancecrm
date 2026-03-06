import React, { useRef, useState, useEffect } from 'react';
import ParticleButton from "./ParticleButton";

const CTAFinal = () => {
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
      className="relative py-40 px-6 text-center overflow-hidden"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(30px)",
        filter: visible ? "blur(0px)" : "blur(10px)",
        transition: "opacity 800ms ease-out, transform 800ms ease-out, filter 800ms ease-out",
      }}
    >
      {/* Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] spotlight pointer-events-none" />

      <div className="relative z-10">
        <h2
          className="text-4xl md:text-6xl font-medium mb-6 leading-tight"
          style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #71717A 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
        >
          Sua empresa merece operar<br />no próximo nível.
        </h2>
        <p className="text-text-dim font-light text-lg mb-12 max-w-xl mx-auto">
          Fale com um consultor e descubra como transformamos sua operação.
        </p>

        <ParticleButton />

        <p className="text-text-dim font-light text-sm mt-4">
          Sem compromisso. Sem fidelidade. Só resultados.
        </p>
      </div>
    </section>
  );
};

export default CTAFinal;
