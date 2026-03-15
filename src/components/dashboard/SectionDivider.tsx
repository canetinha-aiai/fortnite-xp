import React from "react";

interface SectionDividerProps {
  readonly icon?: string;
  readonly label?: string;
  readonly className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  icon = "bolt",
  label,
  className = "",
}) => {
  return (
    <div className={`relative flex items-center justify-center my-16 lg:my-24 ${className}`}>
      {/* Background Line */}
      <div className="absolute inset-x-0 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent" />
      
      {/* Glowing Icon/Label Container */}
      <div className="relative z-10 flex items-center gap-3 bg-background-dark border border-border-dark px-4 py-2 rounded-full shadow-[0_0_20px_rgba(255,255,0,0.05)]">
        <span className="material-symbols-outlined text-primary text-sm animate-pulse">
          {icon}
        </span>
        {label && (
          <span className="text-[10px] font-black text-white uppercase tracking-[0.3em] italic">
            {label}
          </span>
        )}
      </div>
      
      {/* Extra glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/5 blur-3xl pointer-events-none" />
    </div>
  );
};

export default SectionDivider;
