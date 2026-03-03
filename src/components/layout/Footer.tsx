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
        <div className="flex items-center justify-center md:justify-start gap-3 text-slate-500 grayscale opacity-50">
          <span className="material-symbols-outlined text-3xl">bolt</span>
          <h2 className="text-xl font-bold tracking-tighter uppercase italic">
            Fortnite XP
          </h2>
        </div>
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
          Não afiliado à <span className="text-slate-300">Epic Games</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
