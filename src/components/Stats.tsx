"use client";

import { motion } from "framer-motion";
import { staggerChild, staggerParent, useMotionSafe } from "@/lib/motion";
import AnimatedNumber from "@/components/AnimatedNumber";
import TextReveal from "@/components/TextReveal";

const PROOF = [
  { value: 99, suffix: "%", label: "client satisfaction", signal: "trust index" },
  { value: 250, suffix: "+", label: "successful projects", signal: "shipping record" },
  { value: 3, suffix: "×", label: "automation ROI", signal: "efficiency gain" },
  { value: 40, suffix: "%", label: "speed increase", signal: "cycle reduction" },
] as const;

export default function Stats() {
  const { safe } = useMotionSafe();
  return (
    <section id="proof" className="command-section" aria-label="Proof points">
      <div className="signal-grid" aria-hidden="true" />
      <div className="container-page relative z-10 pt-section-t pb-section-b">
        <div className="grid gap-s7 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <div className="eyebrow">Proof telemetry</div>
            <TextReveal
              as="h2"
              segments={[[{ text: "Measured outcomes, " }, { text: "not theatre.", className: "text-brand-gradient" }]]}
              className="mt-s4 font-display text-fs-h2 font-bold text-ink-strong"
            />
          </div>
          <p className="max-w-2xl text-fs-body-lg text-ink-body">
            Premium should show up in the numbers: stable delivery, satisfied clients, stronger automation returns, and faster operating cycles.
          </p>
        </div>

        <motion.dl
          variants={safe(staggerParent)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-15%" }}
          className="mt-s8 grid gap-s4 md:grid-cols-2 lg:grid-cols-4"
        >
          {PROOF.map((item, index) => (
            <motion.div key={item.label} variants={safe(staggerChild)} className="command-surface scanline rounded-xl p-s5">
              <div className="flex items-center justify-between gap-s4 text-fs-caption uppercase tracking-[var(--tracking-eyebrow)] text-ink-muted">
                <span>{item.signal}</span>
                <AnimatedNumber value={index + 1} duration={0.7} format={(n) => String(Math.round(n)).padStart(2, "0")} />
              </div>
              <dt className="mt-s6 font-display text-fs-numeral font-bold leading-none text-ink-strong">
                <AnimatedNumber value={item.value} format={(n) => `${Math.round(n).toLocaleString()}${item.suffix}`} />
              </dt>
              <dd className="mt-s4 text-fs-body text-ink-body">{item.label}</dd>
              <div className="mt-s6 h-s2 overflow-hidden rounded-pill bg-surface-line" aria-hidden="true">
                <div className="h-full rounded-pill bg-[linear-gradient(90deg,var(--brand-grad-start),var(--brand-grad-mid),var(--brand-grad-end))]" style={{ width: `${74 + index * 7}%`, animation: "command-pulse var(--dur-ambient) var(--ease-standard) infinite" }} />
              </div>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
