import React from "react";

interface FooterProps {
  readonly className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className = "" }) => {
  return (
    <footer
      className={`border-t border-border-dark bg-card-dark py-12 px-6 lg:px-20 mt-20 ${className}`}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 w-full md:w-auto">
          <div className="flex items-center gap-3 text-slate-500 grayscale opacity-50">
            <span className="material-symbols-outlined text-3xl">bolt</span>
            <h2 className="text-xl font-bold tracking-tighter uppercase italic">
              Fortnite XP
            </h2>
          </div>
          
          <nav className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-8">
            <a href="/about" className="text-[10px] text-slate-400 hover:text-primary font-bold uppercase tracking-widest transition-colors">Sobre</a>
            <a href="/privacy-policy" className="text-[10px] text-slate-400 hover:text-primary font-bold uppercase tracking-widest transition-colors">Privacidade</a>
            <a href="/terms" className="text-[10px] text-slate-400 hover:text-primary font-bold uppercase tracking-widest transition-colors">Termos</a>
          </nav>
        </div>

        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
          Não afiliado à <span className="text-slate-300">Epic Games</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
