"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { EASE } from "@/lib/motion";
import TextReveal from "@/components/TextReveal";

export default function SignalStatement() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 18, damping: 34, mass: 1.6 });
  const y = useTransform(smooth, [0, 1], [80, -90]);
  const opacity = useTransform(smooth, [0.08, 0.34, 0.82], [0.18, 1, 0.72]);

  return (
    <section ref={ref} className="command-section min-h-dvh" aria-label="Digital infrastructure statement">
      <div className="signal-grid" aria-hidden="true" />
      <div className="container-page relative z-10 grid min-h-dvh place-items-center py-section-t">
        <motion.div style={{ y, opacity }} className="max-w-6xl text-center [perspective:480px]">
          <TextReveal
            as="p"
            stagger={0.035}
            segments={[[
              { text: "We turn scattered tools, manual follow-ups, fragile websites, and campaign noise into " },
              { text: "one engineered growth system.", className: "text-brand-gradient" },
            ]]}
            className="font-display text-[clamp(2rem,5vw,5rem)] font-bold leading-[1.03] tracking-[var(--tracking-display)] text-ink-strong"
          />
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.9, ease: EASE.emphasized, delay: 0.18 }}
            className="mx-auto mt-s6 max-w-2xl text-fs-body-lg text-ink-body"
          >
            Every service below is a different interface into the same promise: automation, digital presence, and measurable operating leverage built once, properly.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
