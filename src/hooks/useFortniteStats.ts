import { useState, useEffect } from "react";
import { fetchSeasonInfo } from "@/services/fortniteApi";
import { PlaystyleId } from "@/lib/constants";

export const useFortniteStats = () => {
  const [currentLevel, setCurrentLevel] = useState<number | null>(null);
  const [targetLevel, setTargetLevel] = useState(200);
  const [playstyleId, setPlaystyleId] = useState<PlaystyleId>("regular");
  const [daysRemaining, setDaysRemaining] = useState<number | null>(null);
  const [calculated, setCalculated] = useState(false);

  useEffect(() => {
    const initSeason = async () => {
      try {
        const seasonInfo = await fetchSeasonInfo();
        const endDate = new Date(seasonInfo.seasonDateEnd);
        const now = new Date();
        const diff = endDate.getTime() - now.getTime();
        const days = Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
        setDaysRemaining(days);
      } catch (err) {
        console.error("Error pre-fetching season info:", err);
      }
    };
    initSeason();
  }, []);

  const calculate = (data: {
    currentLevel: number;
    targetLevel: number;
    playstyleId: PlaystyleId;
  }) => {
    setCurrentLevel(data.currentLevel);
    setTargetLevel(data.targetLevel);
    setPlaystyleId(data.playstyleId);
    setCalculated(true);
  };

  const reset = () => {
    setCalculated(false);
  };

  return {
    currentLevel,
    targetLevel,
    playstyleId,
    daysRemaining,
    calculated,
    calculate,
    reset,
  };
};
