import React, { useState } from "react";
import { PLAYSTYLES, PlaystyleId } from "@/lib/constants";
import PlaystyleSelector from "./PlaystyleSelector";

interface HeroProps {
  readonly className?: string;
  readonly daysRemaining?: number | null;
  readonly onCalculate?: (data: {
    currentLevel: number;
    targetLevel: number;
    playstyleId: PlaystyleId;
  }) => void;
  readonly isCalculated?: boolean;
  readonly seasonEndDate?: Date | null;
}

export const Hero: React.FC<HeroProps> = ({
  className = "",
  onCalculate,
  isCalculated = false,
}) => {
  const [currentLevelStr, setCurrentLevelStr] = useState("1");
  const [targetLevelStr, setTargetLevelStr] = useState("200");
  const [playstyleId, setPlaystyleId] = useState<PlaystyleId>("regular");
  const [customXPStr, setCustomXPStr] = useState("10000");
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculationProgress, setCalculationProgress] = useState(0);

  const selectedPlaystyle =
    playstyleId === "custom"
      ? { id: "custom" as const, label: "Personalizado", xp: Math.max(10000, parseInt(customXPStr || "0", 10)) }
      : PLAYSTYLES.find((p) => p.id === playstyleId) || PLAYSTYLES[1];

  const validateAndFormat = (val: string, max: number = 1000) => {
    let cleaned = val.replace(/[^0-9]/g, "");
    cleaned = cleaned.replace(/^0+/, "");
    if (cleaned === "") return "";
    const num = parseInt(cleaned, 10);
    if (num > max) return max.toString();
    return cleaned;
  };

  const handleLevelChange = (
    setter: (v: string) => void,
    val: string,
    max: number = 1000,
  ) => {
    const formatted = validateAndFormat(val, max);
    setter(formatted);
  };

  const ensureMin = (getter: string, setter: (v: string) => void, min: number) => {
    const num = parseInt(getter || "0", 10);
    if (!getter || isNaN(num) || num < min) {
      setter(min.toString());
    }
  };

  const currentLevel = parseInt(currentLevelStr || "1", 10);
  const targetLevel = parseInt(targetLevelStr || "1", 10);

  const isCustomXPInvalid =
    playstyleId === "custom" &&
    (!customXPStr || parseInt(customXPStr, 10) < 10000);

  const getHumorMessage = (level: number) => {
    if (level === 1000) return "VOU CONTAR PRA SUA MÃE! 👵";
    if (level >= 800) return "VOCÊ É UM ROBÔ? 🤖";
    if (level >= 500) return "VAI TOMAR UM BANHO! 🚿";
    if (level >= 400) return "VOCÊ JÁ VIU UMA ÁRVORE HOJE? 🌳";
    return "";
  };

  const humorMsg = getHumorMessage(targetLevel);

  const handleCalculate = () => {
    if (!currentLevelStr || isCustomXPInvalid) return;
    onCalculate?.({ currentLevel, targetLevel, playstyleId });
  };

  const handleCalculateClick = () => {
    if (!currentLevelStr || isCustomXPInvalid) return;

    setIsCalculating(true);
    setCalculationProgress(0);
    
    // Simulate thinking/scanning for premium effect
    const duration = 1500; // Increased to 1.5s for better feel
    const interval = 50; 
    const steps = duration / interval;
    const increment = 100 / steps;
    
    const timer = setInterval(() => {
      setCalculationProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + increment;
      });
    }, interval);

    setTimeout(() => {
      handleCalculate();
      setIsCalculating(false);
      setCalculationProgress(0);
    }, duration + 200);
  };

  const isInitialMount = React.useRef(true);

  React.useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    // Auto-calculate on style change after initial calculation
    if (currentLevelStr && isCalculated) {
      handleCalculate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playstyleId]);

  if (isCalculated) {
    return (
      <section className="mb-6 lg:mb-12 relative z-20 animate-slide-down px-2 sm:px-0">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 lg:gap-6">
          <div className="shrink-0 text-center lg:text-left">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-white uppercase italic tracking-tighter mb-0.5 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              Fortnite XP
            </h1>
            <h2 className="text-primary text-[10px] md:text-xl font-black uppercase tracking-widest italic opacity-80">
              Painel de Resultados
            </h2>
          </div>

          <div className="bg-card-dark border-2 border-border-dark p-3 lg:p-4 rounded-xl flex flex-col md:flex-row gap-4 md:items-start shadow-lg w-full lg:w-auto">
            <div className="min-w-[200px] flex-1">
              <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">
                Seu Estilo de Jogo
              </label>
              <div className="relative flex flex-col">
                <PlaystyleSelector
                  playstyleId={playstyleId}
                  onPlaystyleChange={setPlaystyleId}
                  customXPStr={customXPStr}
                  onCustomXPChange={(val) => handleLevelChange(setCustomXPStr, val, 200000)}
                  onBlur={() => {
                    if (playstyleId === "custom") ensureMin(customXPStr, setCustomXPStr, 10000);
                    handleCalculate();
                  }}
                  compact={true}
                  isInvalid={isCustomXPInvalid}
                />
                {playstyleId !== "custom" && (
                  <span className="text-[9px] text-primary/80 font-bold uppercase tracking-widest mt-1.5 ml-1">
                    ~{(selectedPlaystyle.xp / 1000).toLocaleString()}K XP / PARTIDA
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-3 flex-1 md:max-w-[250px]">
              <div className="flex-1">
                <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">
                  Atual
                </label>
                <input
                  id="current-level-compact"
                  className="w-full bg-background-dark border border-border-dark text-white font-bold py-2 px-3 rounded-lg focus:ring-1 focus:ring-primary outline-none text-center text-sm"
                  type="text"
                  inputMode="numeric"
                  value={currentLevelStr}
                  onChange={(e) =>
                    handleLevelChange(setCurrentLevelStr, e.target.value)
                  }
                  onBlur={handleCalculate}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleCalculate();
                  }}
                />
              </div>

              <div className="flex-1">
                <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">
                  Alvo
                </label>
                <input
                  id="target-level-compact"
                  className="w-full bg-background-dark border border-border-dark text-white font-bold py-2 px-3 rounded-lg focus:ring-1 focus:ring-primary outline-none text-center text-sm"
                  type="text"
                  inputMode="numeric"
                  value={targetLevelStr}
                  onChange={(e) =>
                    handleLevelChange(setTargetLevelStr, e.target.value)
                  }
                  onBlur={handleCalculate}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleCalculate();
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col w-full md:w-auto">
              <div className="hidden md:block text-[10px] mb-1 select-none opacity-0">
                Spacer
              </div>
              <button
                onClick={handleCalculateClick}
                disabled={isCustomXPInvalid || isCalculating}
                className="group bg-primary hover:bg-primary-hover text-background-dark font-black px-4 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(20,255,0,0.3)] active:translate-y-0 active:shadow-none uppercase text-xs h-[38px] disabled:opacity-30 disabled:cursor-not-allowed relative overflow-hidden"
              >
                {isCalculating && <div className="absolute inset-0 bg-white/20 animate-scan pointer-events-none" />}
                <span className={`material-symbols-outlined text-sm transition-transform duration-300 ${isCalculating ? 'animate-spin' : 'group-hover:rotate-180'}`}>
                  sync
                </span>
                {isCalculating ? 'CALCULANDO' : 'ATUALIZAR'}
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`relative py-10 lg:py-20 flex flex-col items-center justify-center text-center max-w-5xl mx-auto w-full animate-reveal ${className}`}
    >
      <div className="absolute inset-0 bg-primary/2 opacity-[0.02] blur-[120px] rounded-full pointer-events-none" />

      <div className="mb-8 lg:mb-16 relative z-20 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black text-white uppercase italic tracking-tighter mb-2 drop-shadow-[0_0_30px_rgba(255,255,0,0.1)] leading-[0.85]">
          Fortnite <span className="text-primary">XP</span>
        </h1>
        <h2 className="text-primary text-[10px] sm:text-sm lg:text-xl font-black uppercase tracking-widest italic mb-6 lg:mb-8 flex items-center justify-center gap-3 lg:gap-4 leading-none">
          <span className="h-px w-6 lg:w-16 bg-primary/30"></span>
          Calculadora de Meta
          <span className="h-px w-6 lg:w-16 bg-primary/30"></span>
        </h2>
        <p className="text-slate-400 text-xs md:text-lg lg:text-xl font-medium px-6 leading-relaxed balance max-w-[280px] sm:max-w-none mx-auto">
          Analise sua progressão e descubra exatamente o{" "}
          <strong className="text-white font-bold">XP necessário</strong> para
          completar o seu{" "}
          <strong className="text-primary font-bold italic">Passe de Batalha</strong>.
        </p>
      </div>

      <div className="w-full max-w-4xl relative px-2 sm:px-0">
        <div className="absolute -inset-2 sm:-inset-4 border border-primary/5 rounded-3xl sm:rounded-4xl pointer-events-none" />
        <div className="absolute -inset-4 sm:-inset-8 border border-primary/2 rounded-4xl sm:rounded-[3rem] pointer-events-none" />

        <div className={`bg-card-dark border-2 border-border-dark p-6 sm:p-8 lg:p-12 rounded-2xl relative overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] z-10 transition-all duration-500 ${isCalculating ? 'animate-pulse-glow scale-[0.98]' : 'hover:border-primary/10'}`}>
          
          {isCalculating && (
            <div className="absolute inset-0 z-50 bg-background-dark/80 backdrop-blur-md flex flex-col items-center justify-center animate-fade-in px-4">
              <div className="w-full max-w-[240px] h-2 bg-border-dark rounded-full overflow-hidden relative mb-4">
                <div className="absolute inset-0 bg-primary animate-scan opacity-50 shadow-[0_0_15px_rgba(255,255,0,0.5)]" />
                <div className="h-full bg-primary transition-all duration-75 ease-out shadow-[0_0_10px_rgba(255,255,0,0.5)]" style={{ width: `${calculationProgress}%` }} />
              </div>
              <p className="text-primary font-black uppercase italic tracking-widest text-lg animate-pulse">
                Escaneando Temporada...
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start relative z-20">
            <div className="space-y-2 text-left">
              <label className="block text-[10px] text-slate-500 font-bold uppercase tracking-widest ml-1">
                Nível Atual
              </label>
              <input
                className="w-full bg-background-dark/50 border border-border-dark text-white font-black py-2 sm:py-3 px-4 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-base sm:text-lg lg:text-lg shadow-inner"
                type="text"
                inputMode="numeric"
                value={currentLevelStr}
                onChange={(e) => handleLevelChange(setCurrentLevelStr, e.target.value)}
              />
            </div>

            <div className="space-y-2 text-left">
              <div className="flex justify-between items-center ml-1">
                <label className="block text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                  Nível Alvo
                </label>
                {humorMsg && <span className="text-[10px] font-black text-red-500 animate-bounce">{humorMsg}</span>}
              </div>
              <input
                className={`w-full bg-background-dark/50 border border-border-dark text-white font-black py-2 sm:py-3 px-4 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-base sm:text-lg lg:text-lg shadow-inner ${targetLevel >= 400 ? "text-red-500 border-red-500/50" : ""}`}
                type="text"
                inputMode="numeric"
                value={targetLevelStr}
                onChange={(e) => handleLevelChange(setTargetLevelStr, e.target.value)}
              />
            </div>

            <div className="space-y-2 text-left">
              <label className="block text-[10px] text-slate-500 font-bold uppercase tracking-widest ml-1">
                Estilo de Jogo
              </label>
              <PlaystyleSelector
                playstyleId={playstyleId}
                onPlaystyleChange={setPlaystyleId}
                customXPStr={customXPStr}
                onCustomXPChange={(val) => handleLevelChange(setCustomXPStr, val, 200000)}
                isInvalid={isCustomXPInvalid}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isCustomXPInvalid || isCalculating}
            className="w-full mt-8 sm:mt-12 bg-primary hover:bg-primary-hover text-background-dark font-black uppercase italic tracking-normal sm:tracking-widest py-4 sm:py-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(20,255,0,0.5)] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 sm:gap-4 text-lg sm:text-2xl group overflow-hidden relative"
            onClick={handleCalculateClick}
          >
            <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-[-20deg]" />
            <span className="material-symbols-outlined text-xl sm:text-3xl group-hover:rotate-12 transition-transform">bolt</span>
            CALCULAR ESTRATÉGIA
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
