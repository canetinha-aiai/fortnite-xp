import React from "react";
import { PLAYSTYLES, PlaystyleId } from "@/lib/constants";

interface PlaystyleSelectorProps {
  readonly playstyleId: PlaystyleId;
  readonly onPlaystyleChange: (id: PlaystyleId) => void;
  readonly customXPStr: string;
  readonly onCustomXPChange: (val: string) => void;
  readonly onBlur?: () => void;
  readonly compact?: boolean;
  readonly isInvalid?: boolean;
}

export const PlaystyleSelector: React.FC<PlaystyleSelectorProps> = ({
  playstyleId,
  onPlaystyleChange,
  customXPStr,
  onCustomXPChange,
  onBlur,
  compact = false,
  isInvalid = false,
}) => {
  return (
    <div className={`relative flex flex-col ${compact ? "" : "w-full"}`}>
      <div className="relative">
        <select
          value={playstyleId}
          onChange={(e) => onPlaystyleChange(e.target.value as PlaystyleId)}
          className={`w-full bg-background-dark border border-border-dark text-primary font-black rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none appearance-none cursor-pointer transition-all ${
            compact
              ? "py-2 pl-3 pr-8 text-xs lg:text-sm"
              : "py-3 sm:py-4 pl-4 pr-10 text-xl sm:text-xl lg:text-xl shadow-inner"
          }`}
        >
          {PLAYSTYLES.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}
            </option>
          ))}
          <option value="custom">Personalizado</option>
        </select>
        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none text-sm">
          expand_more
        </span>
      </div>

      {playstyleId === "custom" && (
        <div className={`${compact ? "mt-4 mb-5" : "mt-2"} relative group/input animate-fade-in`}>
          <div className={`absolute inset-y-0 ${compact ? "left-4" : "left-5"} flex items-center pointer-events-none group-focus-within/input:text-primary transition-colors text-slate-500`}>
            <span className={`material-symbols-outlined ${compact ? "text-sm" : "text-lg"}`}>edit_note</span>
          </div>
          <input
            type="text"
            inputMode="numeric"
            value={customXPStr}
            onChange={(e) => onCustomXPChange(e.target.value)}
            onBlur={onBlur}
            placeholder={compact ? "12000" : "Ex: 25000"}
            className={`w-full bg-background-dark border border-border-dark group-hover:border-primary/30 focus:border-primary text-white font-black rounded-xl focus:ring-2 focus:ring-primary/50 outline-none transition-all ${
              compact
                ? "py-2.5 pl-11 pr-14 text-sm"
                : "py-2 sm:py-3 pl-12 sm:pl-14 pr-16 text-base sm:text-lg shadow-inner"
            }`}
          />
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            <span
              className={`font-black text-primary tracking-tighter ${compact ? "text-xs" : "text-sm"}`}
            >
              XP
            </span>
          </div>
          {isInvalid && (
            <span className="absolute left-0 -bottom-6 text-[10px] text-red-500 font-bold uppercase tracking-tight animate-pulse whitespace-nowrap">
              Mínimo de 10.000 XP
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default PlaystyleSelector;
