"use client";

import React from "react";
import { PLAYSTYLES, XP_PER_LEVEL } from "@/lib/constants";
import { useTranslation } from "@/context/LanguageContext";

interface PlayerDashboardProps {
  readonly currentLevel: number;
  readonly targetLevel: number;
  readonly playstyleId: string;
  readonly daysRemaining: number | null;
  readonly className?: string;
}

export const PlayerDashboard: React.FC<PlayerDashboardProps> = ({
  currentLevel,
  targetLevel,
  playstyleId,
  daysRemaining,
  className = "",
}) => {
  const { t } = useTranslation();
  const selectedStyle =
    PLAYSTYLES.find((p) => p.id === playstyleId) || PLAYSTYLES[1];
  const XP_PER_MATCH_AVG = selectedStyle.xp;
  const levelsNeeded = Math.max(0, targetLevel - currentLevel);
  const totalXpNeeded = levelsNeeded * XP_PER_LEVEL;
  const totalMatchesNeeded = Math.ceil(
    Math.max(0, totalXpNeeded) / XP_PER_MATCH_AVG,
  );

  const matchesPerDay = Math.ceil(totalMatchesNeeded / (daysRemaining ?? 1));
  const matchesPerWeek = matchesPerDay * 7;

  const isGoalReached = levelsNeeded === 0;

  return (
    <section
      aria-label="Resultados do cálculo"
      className={`space-y-6 lg:space-y-8 ${className}`}
    >
      {/* Player Level Card */}
      <article className="bg-card-dark border-2 border-border-dark p-6 lg:p-10 rounded-xl relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl -mr-32 -mt-32"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 lg:w-24 lg:h-24 bg-background-dark border-2 border-primary/30 rounded-2xl flex items-center justify-center relative shadow-lg">
              <span className="material-symbols-outlined text-primary text-4xl lg:text-5xl">
                military_tech
              </span>
              <div className="absolute -bottom-2 -right-2 bg-primary text-background-dark text-xs font-black px-2 py-1 rounded italic uppercase tracking-tighter">
                LVL {currentLevel}
              </div>
            </div>
            <div>
              <span className="text-[10px] text-primary font-bold uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded">
                Fortnite XP
              </span>
              <h2 className="text-3xl lg:text-5xl font-black text-white uppercase italic mt-1">
                {isGoalReached ? (
                  <span className="text-green-400">{t.dashboard.goalReached}</span>
                ) : (
                  <>
                    {levelsNeeded}{" "}
                    <span className="text-primary">{t.dashboard.levelsLeft}</span>
                  </>
                )}
              </h2>
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:min-w-[400px]">
            <div className="flex justify-between items-end mb-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                {t.dashboard.progressTitle}
              </span>
              <span className="text-primary font-black italic">
                LVL {currentLevel} → {targetLevel}
              </span>
            </div>
            <div className="h-4 bg-background-dark border border-border-dark rounded-full overflow-hidden p-1">
              <div
                className="h-full bg-primary rounded-full shadow-[0_0_15px_rgba(255,255,0,0.5)] transition-all duration-1000"
                style={{
                  width: `${Math.min(100, targetLevel > 0 ? (currentLevel / targetLevel) * 100 : 0)}%`,
                }}
              ></div>
            </div>
            <div className="flex justify-between mt-2">
              <div className="flex flex-col">
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">
                  {t.dashboard.current}
                </span>
                <span className="text-white font-bold">LVL {currentLevel}</span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">
                  {t.dashboard.target}
                </span>
                <span className="text-primary font-bold">
                  LVL {targetLevel}
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Requirement Cards */}
      {!isGoalReached && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          <article className="bg-card-dark border-2 border-border-dark p-6 rounded-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-6xl">
                database
              </span>
            </div>
            <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest mb-2 block">
              {t.dashboard.totalXpNeeded}
            </span>
            <h3 className="text-3xl font-black text-white uppercase italic">
              {(totalXpNeeded / 1000000).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              <span className="text-primary ml-1">M</span>
            </h3>
            <p className="text-[10px] text-slate-400 mt-2 uppercase font-bold tracking-tight">
              {t.dashboard.partidasNecessarias.replace('{count}', totalMatchesNeeded.toLocaleString())}
            </p>
          </article>

          <article className="bg-primary/5 border-2 border-primary/30 p-6 rounded-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-primary">
              <span className="material-symbols-outlined text-6xl">today</span>
            </div>
            <span className="text-[10px] text-primary font-extrabold uppercase tracking-widest mb-2 block">
              {t.dashboard.dailyGoal}
            </span>
            <h3 className="text-3xl font-black text-white uppercase italic">
              {matchesPerDay}
              <span className="text-primary ml-1">{t.dashboard.partidas}</span>
            </h3>
            <p className="text-[10px] text-primary/70 mt-2 uppercase font-bold tracking-tight">
              {daysRemaining} {t.dashboard.daysRemaining.toLowerCase()}
            </p>
          </article>

          <article className="bg-card-dark border-2 border-border-dark p-6 rounded-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-6xl">
                date_range
              </span>
            </div>
            <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest mb-2 block">
              {t.dashboard.weeklyGoal}
            </span>
            <h3 className="text-3xl font-black text-white uppercase italic">
              {matchesPerWeek}
              <span className="text-primary ml-1">{t.dashboard.partidas}</span>
            </h3>
            <p className="text-[10px] text-slate-400 mt-2 uppercase font-bold tracking-tight">
              {t.dashboard.xpPerMatchAvg.replace('{xp}', XP_PER_MATCH_AVG.toLocaleString())}
            </p>
          </article>
        </div>
      )}
    </section>
  );
};

export default PlayerDashboard;
