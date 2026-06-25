/**
 * Motion tokens — every component pulls from here.
 * No more inline `duration: 0.8, ease: "easeOut"` scattered across files.
 * Mirrors design.md §7 + brand.md §5.4 durations and easings.
 */

import { useReducedMotion, type Variants } from "framer-motion";

/* Durations — match CSS custom properties in tokens.css */
export const DUR = {
  instant: 0.08,
  fast:    0.18,
  base:    0.24,
  slow:    0.42,
  reveal:  0.64,
  ambient: 18,
} as const;

/* Forward-leaning easings (no springy overshoot by default) */
export const EASE = {
  standard:   [0.2, 0.7, 0.2, 1] as const,
  emphasized: [0.16, 1, 0.3, 1] as const,
  entry:      [0, 0, 0.2, 1] as const,
  exit:       [0.4, 0, 1, 1] as const,
};

/* Default reveal — used on h2, body paragraphs entering viewport */
export const revealVariants: Variants = {
  hidden:  { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.reveal, ease: EASE.emphasized },
  },
};

/* Staggered children — 80ms between siblings per brand.md §5.4 */
export const staggerParent: Variants = {
  hidden:  { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

export const staggerChild: Variants = {
  hidden:  { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: DUR.slow, ease: EASE.emphasized } },
};

/**
 * Hook: respect prefers-reduced-motion.
 * Returns a `safe(variants)` function that flattens motion-heavy variants
 * to instant opacity-only fades when the user opted out.
 */
export function useMotionSafe() {
  const shouldReduce = useReducedMotion();
  return {
    shouldReduce,
    safe<T extends Variants>(variants: T): Variants {
      if (!shouldReduce) return variants;
      const out: Variants = {};
      for (const key of Object.keys(variants)) {
        const v = variants[key];
        if (v && typeof v === "object" && !Array.isArray(v)) {
          out[key] = { opacity: (v as { opacity?: number }).opacity ?? 1 };
        } else {
          out[key] = v;
        }
      }
      return out;
    },
  };
}
