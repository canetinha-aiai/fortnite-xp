"use client";

import React from "react";
import Layout from "@/components/layout/Layout";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/dashboard/Hero";
import PlayerDashboard from "@/components/dashboard/PlayerDashboard";
import { useFortniteStats } from "@/hooks/useFortniteStats";

export default function Home() {
  const {
    currentLevel,
    targetLevel,
    playstyleId,
    daysRemaining,
    calculated,
    calculate,
    reset,
  } = useFortniteStats();

  return (
    <Layout>
      <Header onReset={reset} />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 py-6 md:py-10 lg:px-20 z-10 relative">
        <Hero
          onCalculate={calculate}
          daysRemaining={daysRemaining}
          isCalculated={calculated}
        />

        {calculated && currentLevel !== null && (
          <PlayerDashboard
            currentLevel={currentLevel}
            targetLevel={targetLevel}
            playstyleId={playstyleId}
            daysRemaining={daysRemaining}
          />
        )}
      </main>
      <Footer />
    </Layout>
  );
}
