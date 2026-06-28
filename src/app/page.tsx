/**
 * Homepage — TechUpServices.
 *
 * Temporary holding state while the header and lower sections are redesigned.
 * The hero remains visible with the simplified TechUpServices wordmark header.
 */

import Navbar from "@/components/Navbar";
import CommandHero from "@/components/CommandHero";

export default function Home() {
  return (
    <main className="min-h-dvh bg-surface-base">
      <Navbar />
      <CommandHero />
    </main>
  );
}
