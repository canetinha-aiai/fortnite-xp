import { useState, useEffect } from "react";
//import { fetchSeasonInfo } from "@/services/fortniteApi";
import { PlaystyleId } from "@/lib/constants";

export const useFortniteStats = () => {
  const [currentLevel, setCurrentLevel] = useState<number | null>(null);
  const [targetLevel, setTargetLevel] = useState(200);
  const [playstyleId, setPlaystyleId] = useState<PlaystyleId>("regular");
  const [seasonEndDate, setSeasonEndDate] = useState<Date | null>(null);
  const [calculated, setCalculated] = useState(false);

  useEffect(() => {
    const initSeason = async () => {
      try {
        //const seasonInfo = await fetchSeasonInfo();
        const endDate = new Date("2026-03-19T00:00:00.000Z");
        setSeasonEndDate(endDate);
      } catch (err) {
        console.error("Error pre-fetching season info:", err);
      }
    };
    initSeason();
  }, []);

  const daysRemaining = seasonEndDate
    ? Math.max(
        1,
        Math.ceil(
          (seasonEndDate.getTime() - new Date().getTime()) /
            (1000 * 60 * 60 * 24),
        ),
      )
    : null;

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
    seasonEndDate,
    calculated,
    calculate,
    reset,
  };
};
