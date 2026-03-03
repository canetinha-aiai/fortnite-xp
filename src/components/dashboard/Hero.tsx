import React, { useState } from "react";
import { PLAYSTYLES, PlaystyleId } from "@/lib/constants";

interface HeroProps {
  readonly className?: string;
  readonly daysRemaining?: number | null;
  readonly onCalculate?: (data: {
    currentLevel: number;
    targetLevel: number;
    playstyleId: PlaystyleId;
  }) => void;
  readonly isCalculated?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  className = "",
  daysRemaining = null,
  onCalculate,
  isCalculated = false,
}) => {
  const [currentLevelStr, setCurrentLevelStr] = useState("1");
  const [targetLevelStr, setTargetLevelStr] = useState("200");
  const [playstyleId, setPlaystyleId] = useState<PlaystyleId>("regular");

  const selectedPlaystyle =
    PLAYSTYLES.find((p) => p.id === playstyleId) || PLAYSTYLES[1];

  const validateAndFormat = (val: string) => {
    let cleaned = val.replace(/[^0-9]/g, "");
    cleaned = cleaned.replace(/^0+/, "");
    if (cleaned === "") return "";
    const num = parseInt(cleaned, 10);
    if (num > 1000) return "1000";
    return cleaned;
  };

  const handleLevelChange = (setter: (v: string) => void, val: string) => {
    const formatted = validateAndFormat(val);
    setter(formatted);
  };

  const currentLevel = parseInt(currentLevelStr || "1", 10);
  const targetLevel = parseInt(targetLevelStr || "1", 10);

  const getHumorMessage = (level: number) => {
    if (level === 1000) return "VOU CONTAR PRA SUA MÃE! 👵";
    if (level >= 800) return "VOCÊ É UM ROBÔ? 🤖";
    if (level >= 500) return "VAI TOMAR UM BANHO! 🚿";
    if (level >= 400) return "VOCÊ JÁ VIU UMA ÁRVORE HOJE? 🌳";
    return "";
  };

  const humorMsg = getHumorMessage(targetLevel);

  const handleCalculate = () => {
    if (!currentLevelStr) return;
    onCalculate?.({ currentLevel, targetLevel, playstyleId });
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
      <section className={`mb-8 lg:mb-12 relative z-20 ${className}`}>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="flex-shrink-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase italic tracking-tighter mb-1">
              Fortnite XP
            </h1>
            <h2 className="text-primary text-lg md:text-xl font-black uppercase tracking-widest italic">
              Calculadora de Nível
            </h2>
          </div>

          <div className="bg-card-dark border-2 border-border-dark p-3 lg:p-4 rounded-xl flex flex-col md:flex-row gap-3 md:items-end shadow-lg w-full lg:w-auto">
            <div className="min-w-[200px] flex-1">
              <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">
                Seu Estilo de Jogo
              </label>
              <div className="relative flex flex-col">
                <div className="relative">
                  <select
                    value={playstyleId}
                    onChange={(e) =>
                      setPlaystyleId(e.target.value as PlaystyleId)
                    }
                    className="w-full bg-background-dark border border-border-dark text-primary font-bold py-2 pl-3 pr-8 rounded-lg focus:ring-1 focus:ring-primary outline-none appearance-none cursor-pointer text-xs lg:text-sm"
                  >
                    {PLAYSTYLES.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none text-sm">
                    expand_more
                  </span>
                </div>
                <span className="text-[9px] text-primary/80 font-bold uppercase tracking-widest mt-1.5 ml-1">
                  ~{(selectedPlaystyle.xp / 1000).toLocaleString()}K XP /
                  PARTIDA
                </span>
              </div>
            </div>

            <div className="flex gap-3 flex-1 md:max-w-[250px]">
              <div className="flex-1">
                <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">
                  Atual
                </label>
                <input
                  id="current-level-compact"
                  aria-label="Nível atual"
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
                  aria-label="Nível alvo"
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

            <button
              onClick={handleCalculate}
              aria-label="Atualizar cálculos"
              className="group bg-primary hover:bg-primary-hover text-background-dark font-black px-4 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(20,255,0,0.3)] active:translate-y-0 active:shadow-none uppercase text-xs h-[38px] w-full md:w-auto"
            >
              <span className="material-symbols-outlined text-sm transition-transform duration-300 group-hover:rotate-180">
                sync
              </span>
              ATUALIZAR
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-10 lg:mb-16 ${className}`}
    >
      <div className="lg:col-span-5 flex flex-col justify-center">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white uppercase italic tracking-tighter mb-2">
          Fortnite XP
        </h1>
        <h2 className="text-primary text-xl lg:text-3xl font-black uppercase tracking-widest italic mb-6">
          Calculadora de Nível
        </h2>
        <p className="text-slate-400 text-sm md:text-base lg:text-lg max-w-2xl mx-auto font-medium mb-10 lg:mb-14 px-4 leading-relaxed">
          Descubra exatamente a{" "}
          <strong className="text-primary font-bold">quantidade de XP</strong>{" "}
          que você precisa para alcançar o nível desejado no{" "}
          <strong className="text-primary font-bold">Passe de Batalha</strong>{" "}
          antes que a temporada acabe.
        </p>

        <div className="grid grid-cols-2 items-start lg:flex lg:items-start gap-4 mb-6 lg:mb-8">
          <div className="flex flex-col relative">
            {/* Label and general XP info tooltip */}
            <div
              className="group flex items-center gap-1.5 mb-1 cursor-help w-max relative focus:outline-none"
              tabIndex={0}
            >
              <span className="text-[9px] lg:text-[10px] text-slate-500 font-bold uppercase tracking-widest transition-colors group-hover:text-primary group-focus:text-primary">
                Seu Estilo de Jogo
              </span>
              <span className="material-symbols-outlined text-[12px] text-slate-400 group-hover:text-primary group-focus:text-primary transition-colors">
                info
              </span>

              {/* Popover for label */}
              <div className="absolute top-full left-0 mt-2 w-64 md:w-72 bg-card-dark border border-border-dark p-3 lg:p-4 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-focus:opacity-100 group-hover:visible group-focus:visible transition-all duration-300 z-50 pointer-events-none translate-y-2 group-hover:translate-y-0 group-focus:translate-y-0">
                <div className="absolute -top-2 left-6 w-4 h-4 bg-card-dark border-t border-l border-border-dark rotate-45"></div>
                <div className="text-[10px] lg:text-xs text-slate-300 font-medium normal-case leading-relaxed relative z-10">
                  <span className="font-bold text-slate-200 mb-1.5 block">
                    Nossa média considera:
                  </span>
                  <ul className="space-y-1 ml-1">
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>{" "}
                      Tempo Vivo
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>{" "}
                      Abates
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>{" "}
                      Baús e Caixas
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>{" "}
                      Missões D/S
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Select Input and playstyle specific tooltip */}
            <div className="group relative mb-1">
              {/* Popover for select */}
              <div className="absolute top-full left-0 mt-2 w-72 md:w-80 bg-card-dark border border-border-dark p-3 lg:p-4 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pointer-events-none translate-y-2 group-hover:translate-y-0">
                <div className="absolute -top-2 left-6 w-4 h-4 bg-card-dark border-t border-l border-border-dark rotate-45"></div>
                <p className="text-[10px] lg:text-xs text-slate-300 font-medium normal-case leading-relaxed relative z-10">
                  <strong className="text-primary">
                    {selectedPlaystyle.label}:
                  </strong>{" "}
                  Esta média de{" "}
                  <strong className="text-primary">
                    {selectedPlaystyle.xp.toLocaleString()} XP
                  </strong>{" "}
                  reflete a estimativa baseada nesse perfil.
                </p>
              </div>

              <div className="relative">
                <select
                  aria-label="Estilo de jogo"
                  value={playstyleId}
                  onChange={(e) =>
                    setPlaystyleId(e.target.value as PlaystyleId)
                  }
                  className="w-full bg-background-dark border border-border-dark text-primary font-bold py-1.5 pl-2 pr-8 rounded focus:ring-1 focus:ring-primary outline-none appearance-none cursor-pointer text-xs lg:text-sm"
                >
                  {PLAYSTYLES.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.label}
                    </option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-primary pointer-events-none text-sm">
                  expand_more
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-primary">
              <span className="material-symbols-outlined text-[12px] lg:text-sm">
                trending_up
              </span>
              <span className="text-xs lg:text-sm font-bold tracking-tight">
                ~{(selectedPlaystyle.xp / 1000).toLocaleString()}K XP / PARTIDA
              </span>
            </div>
          </div>
          <div className="hidden lg:block h-10 w-px bg-border-dark mx-2"></div>
          <div className="flex flex-col relative">
            <div
              className="group flex items-center gap-1.5 mb-1 cursor-help w-max relative focus:outline-none"
              tabIndex={0}
            >
              <span className="text-[9px] lg:text-[10px] text-slate-500 font-bold uppercase tracking-widest transition-colors group-hover:text-primary group-focus:text-primary">
                Fim da Temporada
              </span>
              <span className="material-symbols-outlined text-[12px] text-slate-400 group-hover:text-primary group-focus:text-primary transition-colors">
                info
              </span>

              {/* Popover for season end */}
              <div className="absolute top-full -right-4 md:left-0 mt-2 w-max max-w-[260px] bg-card-dark border border-border-dark p-3 lg:p-4 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-focus:opacity-100 group-hover:visible group-focus:visible transition-all duration-300 z-50 pointer-events-none translate-y-2 group-hover:translate-y-0 group-focus:translate-y-0">
                <div className="absolute -top-2 right-12 md:left-6 md:right-auto w-4 h-4 bg-card-dark border-t border-l border-border-dark rotate-45"></div>
                <p className="text-[10px] lg:text-xs text-slate-300 font-medium normal-case leading-relaxed relative z-10 text-left">
                  Dias até o fim da temporada atual. Depois disso, todos os
                  níveis são resetados.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-slate-100 mt-1">
              <span className="material-symbols-outlined text-sm lg:text-base">
                schedule
              </span>
              <span className="text-lg lg:text-2xl font-bold">
                {daysRemaining !== null ? daysRemaining : "-"} DIAS
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 bg-card-dark border-2 border-border-dark p-6 lg:p-8 rounded-xl relative overflow-hidden shadow-2xl z-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl -mr-16 -mt-16"></div>

        <div className="space-y-5 lg:space-y-6 relative z-20">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 sm:gap-0 mb-6">
            <h2 className="text-lg lg:text-2xl font-black text-white uppercase tracking-tight italic flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                calculate
              </span>
              Sua Meta de Nível
            </h2>
          </div>
          <div>
            <label className="block text-[9px] lg:text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2">
              Seu Nível Atual
            </label>
            <input
              id="current-level-main"
              aria-label="Nível atual"
              className="w-full bg-background-dark border border-border-dark text-white font-bold py-3.5 lg:py-4 px-5 rounded-lg focus:ring-primary focus:border-primary outline-none transition-all text-xl"
              type="text"
              inputMode="numeric"
              placeholder="1"
              value={currentLevelStr}
              onChange={(e) =>
                handleLevelChange(setCurrentLevelStr, e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCalculate();
                }
              }}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-[9px] lg:text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                Nível Alvo
              </label>
              <div className="flex items-center gap-2">
                {humorMsg && (
                  <span className="text-[9px] lg:text-[10px] font-black text-red-500 animate-bounce uppercase italic">
                    {humorMsg}
                  </span>
                )}
                <span
                  className={`font-bold text-xs lg:text-sm ${targetLevel >= 400 ? "text-red-500" : "text-primary"}`}
                >
                  NÍVEL {targetLevel}
                </span>
              </div>
            </div>
            <div className="flex gap-4 items-center mt-1">
              <input
                id="target-level-main"
                aria-label="Nível alvo"
                className={`w-full bg-background-dark border border-border-dark text-white font-bold py-3.5 lg:py-4 px-5 rounded-lg focus:ring-primary focus:border-primary outline-none transition-all text-xl ${targetLevel >= 400 ? "text-red-500 border-red-500/50" : ""}`}
                type="text"
                inputMode="numeric"
                placeholder="200"
                value={targetLevelStr}
                onChange={(e) =>
                  handleLevelChange(setTargetLevelStr, e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleCalculate();
                  }
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            aria-label="Calcular estratégia"
            className="w-full mt-8 bg-primary hover:bg-primary-hover text-background-dark font-black uppercase italic tracking-widest py-4 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(20,255,0,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none disabled:hover:shadow-none flex items-center justify-center gap-2 text-lg"
            onClick={handleCalculate}
          >
            <span className="material-symbols-outlined">bolt</span>
            CALCULAR ESTRATÉGIA
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
