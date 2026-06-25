"use client";

/**
 * Promise — the single-claim block after the Showcase.
 * One headline, one CTA, one supporting line. No competing emphasis.
 * Per brand.md §4 voice: active verbs, present tense, outcome-first.
 * Per design.md §12 hierarchy: ONE primary, ONE secondary — never two equal CTAs.
 */

import { motion } from "framer-motion";
import { revealVariants, useMotionSafe } from "@/lib/motion";
import { ArrowDown } from "lucide-react";

export default function Promise() {
  const { safe } = useMotionSafe();
  return (
    <section
      className="relative bg-paper"
      aria-label="Our promise"
    >
      <div className="ambient-warm" aria-hidden="true" />
      <div className="relative z-10 container-page pt-section-t pb-section-b">
        <motion.div
          variants={safe(revealVariants)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-15%" }}
          className="max-w-3xl"
        >
          <div className="eyebrow">A small studio of senior practitioners</div>
          <h1 className="mt-s4 text-fs-h1 font-display font-bold text-ink-strong">
            Complex technology, shipped as{" "}
            <span className="text-brand-gradient">profound business outcomes.</span>
          </h1>
          <p className="mt-s6 text-fs-body-lg text-ink-body max-w-2xl">
            TechUpServices is a Pune-based digital agency for founders and operations leads
            who already know they need automation — and want a partner who will build it once,
            properly, and own the outcome.
          </p>
          <div className="mt-s7 flex flex-wrap items-center gap-s4">
            <a href="#talk" className="btn-primary">
              Schedule a discovery call
            </a>
            <a href="#services" className="btn-secondary">
              See the seven services
              <ArrowDown size={16} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
