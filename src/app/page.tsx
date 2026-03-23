"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ServicesGrid from "@/components/ServicesGrid";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CanvasBackground from "@/components/CanvasBackground";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="relative bg-gray-50 dark:bg-[#000212] min-h-screen selection:bg-cyan-500/30 transition-colors duration-500 overflow-x-hidden">
      <div className="dark:invert-0 invert transition-all duration-500">
        <CanvasBackground />
      </div>
      <Navbar />
      
      <div className="relative z-10 w-full">
        <Hero />
        <AboutSection />
        <ServicesGrid />
        <ContactSection />
      </div>

      <Footer />
    </main>
  );
}
