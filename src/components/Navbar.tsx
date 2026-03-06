import { useEffect, useState } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-500 px-6 md:px-10 ${scrolled
          ? "h-[70px] glass border-b border-primary/20"
          : "h-20 bg-transparent border-b border-transparent"
        }`}
    >
      <div className="max-w-[1300px] w-full mx-auto h-full flex items-center justify-between">
        <a href="#" className="text-2xl font-extrabold tracking-tight">
          Avance<span className="text-gradient-main">CRM</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {["Funcionalidades", "Diferenciais", "Integrações", "Sobre"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-text-dim text-[0.95rem] font-medium hover:text-foreground transition-colors duration-300"
            >
              {link}
            </a>
          ))}
        </div>

        <a
          href="https://wa.me/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex px-6 py-2.5 rounded-full text-sm font-bold bg-gradient-to-r from-primary to-accent-purple text-primary-foreground shadow-[var(--glow-shadow)] hover:shadow-[var(--glow-shadow-hover)] transition-all duration-300 hover:scale-105"
        >
          Falar com Consultor
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
