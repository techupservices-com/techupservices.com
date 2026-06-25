/**
 * Homepage — TechUpServices.
 *
 * Section order (per the rebuild brief: services-first showcase):
 *   01  Showcase  — brand signature: scroll-scrubbed canvas with narrative beats
 *   02  Promise   — single-claim block: one headline, one primary CTA, one secondary
 *   03  Services  — vertical numbered system: 7 services, sticky-left rail
 *   04  Proof     — 4 brand stats as a typographic row (not icon cards)
 *   05  Who       — short paragraph + address + socials
 *   06  Talk      — contact form (left invitation, right form)
 *
 * Per design.md §6: section order follows narrative, not the template.
 * Per brand.md: copy, voice, CTA library, and proof points are verbatim from the contract.
 */

"use client";

import Navbar from "@/components/Navbar";
import Showcase from "@/components/Showcase";
import Promise from "@/components/Promise";
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
        <Showcase />
        <Promise />
        <ServicesList />
        <Stats />
        <Who />
        <Contact />
      </div>

      <Footer />
    </main>
  );
}
