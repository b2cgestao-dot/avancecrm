import React, { useRef, useState, useEffect } from 'react';

const Footer = () => {
  const ref = useRef<HTMLElement>(null);
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
    <footer
      ref={ref}
      className="relative px-6 md:px-10 pt-20 pb-10"
      style={{
        background: "#050508",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(30px)",
        filter: visible ? "blur(0px)" : "blur(10px)",
        transition: "opacity 800ms ease-out, transform 800ms ease-out, filter 800ms ease-out",
      }}
    >
      {/* Glow line */}
      <div className="absolute top-0 left-0 w-full h-px neon-line-top" />

      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-2xl font-medium">
          Avance<span className="text-gradient-main">CRM</span>
        </div>

        <div className="flex gap-6 text-text-dim font-light text-sm">
          <a href="#funcionalidades" className="hover:text-foreground transition-colors">Funcionalidades</a>
          <a href="#integrações" className="hover:text-foreground transition-colors">Integrações</a>
          <a href="https://wa.me/5575999777682?text=Olá%2C%20vim%20pelo%20site%20e%20quero%20saber%20mais%20sobre%20o%20AvanceCRM!" className="hover:text-foreground transition-colors">Fale Conosco</a>
        </div>

        <p className="text-text-dim font-light text-xs">
          © 2025 AvanceCRM · Todos os direitos reservados
        </p>
      </div>
    </footer>
  );
};

export default Footer;
