/**
 * Homepage — TechUpServices.
 *
 * Section order:
 *   01  Service Atlas — cursor-reveal cyberpunk hero with all services around the core
 *   02  Signal Statement — cinematic narrative bridge
 *   03  Services — living system modules
 *   04  Proof — proof telemetry
 *   05  Who — studio coordinates
 *   06  Talk — discovery console
 *
 * Per design.md §6: section order follows narrative, not the template.
 * Per brand.md: copy, voice, CTA library, and proof points are verbatim from the contract.
 */

"use client";

import Navbar from "@/components/Navbar";
import CommandHero from "@/components/CommandHero";
import SignalStatement from "@/components/SignalStatement";
import ServicesList from "@/components/ServicesList";
import Stats from "@/components/Stats";
import Who from "@/components/Who";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />

      <div className="relative z-10">
        <CommandHero />
        <SignalStatement />
        <ServicesList />
        <Stats />
        <Who />
        <Contact />
      </div>

      <Footer />
    </main>
  );
}
