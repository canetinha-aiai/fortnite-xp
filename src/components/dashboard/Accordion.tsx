"use client";

import React, { useState } from "react";

interface AccordionProps {
  readonly items: { q: string; a: string }[];
  readonly className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({ items, className = "" }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item, i) => (
        <div
          key={i}
          className="bg-card-dark/40 border border-border-dark rounded-xl overflow-hidden transition-all"
        >
          <button
            onClick={() => toggle(i)}
            className="w-full flex items-center justify-between p-5 text-left group"
          >
            <span className="text-sm sm:text-base font-black text-white uppercase italic tracking-tight flex items-center gap-3">
              <span className={`w-1.5 h-1.5 rounded-full transition-all ${openIndex === i ? 'bg-primary scale-125' : 'bg-slate-600'}`} />
              {item.q}
            </span>
            <span className={`material-symbols-outlined text-primary transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}>
              expand_more
            </span>
          </button>
          
          <div
            className={`transition-all duration-300 ease-in-out ${
              openIndex === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <p className="px-5 pb-5 text-sm text-slate-400 leading-relaxed border-t border-border-dark/50 pt-4">
              {item.a}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
