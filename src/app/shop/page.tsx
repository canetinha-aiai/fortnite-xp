"use client";

import React from "react";
import Layout from "@/components/layout/Layout";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ShopSection from "@/components/shop/ShopSection";

export default function ShopPage() {
  return (
    <Layout>
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 py-6 md:py-10 lg:px-20">
        <ShopSection />
      </main>
      <Footer />
    </Layout>
  );
}
