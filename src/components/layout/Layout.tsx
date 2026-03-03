import React from "react";
import Head from "next/head";

interface LayoutProps {
  readonly children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>XP CALCULATOR - Fortnite Edition</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-mesh font-display dark selection:bg-primary selection:text-background-dark bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
        <div
          className="fixed inset-0 z-[-1] bg-[url('https://images.unsplash.com/photo-1614850523296-e8c041de2398?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 grayscale"
          role="img"
          aria-label="Abstract dark misty mountain silhouette pattern"
        />
        {children}
      </div>
    </>
  );
};

export default Layout;
