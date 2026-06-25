"use client";

/**
 * Stats — the 4 brand.md proof points as a single typographic statement row.
 * NOT four icon cards (design.md §6 / §12 anti-default).
 * Stats come from brand.md §1 verbatim.
 */

import { motion } from "framer-motion";
import { staggerParent, staggerChild, useMotionSafe } from "@/lib/motion";

const PROOF = [
  { value: "99%", label: "client satisfaction" },
  { value: "250+", label: "projects shipped" },
  { value: "3×",   label: "automation ROI" },
  { value: "40%",  label: "speed increase" },
] as const;

export default function Stats() {
  const { safe } = useMotionSafe();
  return (
    <section id="proof" className="relative bg-surface-base" aria-label="Proof points">
      <div className="container-page pt-section-t pb-section-b">
        <div className="max-w-2xl mb-s8">
          <div className="eyebrow">Proof</div>
          <h2 className="mt-s4 text-fs-h2 font-display font-bold text-ink-strong">
            Numbers we can{" "}
            <span className="text-brand-gradient">back, not pitch.</span>
          </h2>
        </div>

        <motion.dl
          variants={safe(staggerParent)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-15%" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-y-s7 gap-x-s5 border-t border-surface-line pt-s7"
        >
          {PROOF.map((p) => (
            <motion.div key={p.label} variants={safe(staggerChild)} className="flex flex-col">
              <dt className="font-display font-bold text-fs-numeral text-ink-strong tabular-nums leading-none">
                {p.value}
              </dt>
              <dd className="mt-s3 text-fs-caption text-ink-muted uppercase tracking-[var(--tracking-eyebrow)]">
                {p.label}
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
