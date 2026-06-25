import type { Config } from "tailwindcss";

/**
 * Tailwind reads tokens from src/styles/tokens.css.
 * Do NOT hardcode hex/px here — all values must reference a CSS custom property.
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body:    ["var(--font-body)", "system-ui", "sans-serif"],
        sans:    ["var(--font-body)", "system-ui", "sans-serif"], // back-compat
      },
      colors: {
        surface: {
          base:    "var(--surface-base)",
          raised:  "var(--surface-raised)",
          sunken:  "var(--surface-sunken)",
          overlay: "var(--surface-overlay)",
          line:    "var(--surface-line)",
        },
        ink: {
          strong: "var(--ink-strong)",
          body:   "var(--ink-body)",
          muted:  "var(--ink-muted)",
          faint:  "var(--ink-faint)",
        },
        brand: {
          start: "var(--brand-grad-start)",
          mid:   "var(--brand-grad-mid)",
          end:   "var(--brand-grad-end)",
        },
      },
      fontSize: {
        "fs-eyebrow":  ["var(--fs-eyebrow)",  { lineHeight: "1.4",  letterSpacing: "var(--tracking-eyebrow)" }],
        "fs-caption":  ["var(--fs-caption)",  { lineHeight: "var(--lh-normal)" }],
        "fs-body":     ["var(--fs-body)",     { lineHeight: "var(--lh-normal)" }],
        "fs-body-lg":  ["var(--fs-body-lg)",  { lineHeight: "var(--lh-relaxed)" }],
        "fs-h4":       ["var(--fs-h4)",       { lineHeight: "var(--lh-snug)" }],
        "fs-h3":       ["var(--fs-h3)",       { lineHeight: "var(--lh-snug)" }],
        "fs-h2":       ["var(--fs-h2)",       { lineHeight: "var(--lh-tight)", letterSpacing: "var(--tracking-tight)" }],
        "fs-h1":       ["var(--fs-h1)",       { lineHeight: "var(--lh-tight)", letterSpacing: "var(--tracking-display)" }],
        "fs-display":  ["var(--fs-display)",  { lineHeight: "0.95",            letterSpacing: "var(--tracking-display)" }],
        "fs-numeral":  ["var(--fs-numeral)",  { lineHeight: "0.95",            letterSpacing: "var(--tracking-display)" }],
      },
      spacing: {
        "s1": "var(--space-1)",
        "s2": "var(--space-2)",
        "s3": "var(--space-3)",
        "s4": "var(--space-4)",
        "s5": "var(--space-5)",
        "s6": "var(--space-6)",
        "s7": "var(--space-7)",
        "s8": "var(--space-8)",
        "s9": "var(--space-9)",
        "s10": "var(--space-10)",
        "s11": "var(--space-11)",
        "gutter": "var(--gutter)",
        "section-t": "var(--section-pt)",
        "section-b": "var(--section-pb)",
      },
      maxWidth: {
        "container": "var(--container)",
      },
      borderRadius: {
        "sm":  "var(--radius-sm)",
        "md":  "var(--radius-md)",
        "lg":  "var(--radius-lg)",
        "xl":  "var(--radius-xl)",
        "pill": "var(--radius-pill)",
      },
      boxShadow: {
        "1": "var(--shadow-1)",
        "2": "var(--shadow-2)",
        "3": "var(--shadow-3)",
      },
      transitionTimingFunction: {
        "standard":   "var(--ease-standard)",
        "emphasized": "var(--ease-emphasized)",
        "entry":      "var(--ease-entry)",
        "exit":       "var(--ease-exit)",
      },
      transitionDuration: {
        "instant": "var(--dur-instant)",
        "fast":    "var(--dur-fast)",
        "base":    "var(--dur-base)",
        "slow":    "var(--dur-slow)",
        "reveal":  "var(--dur-reveal)",
      },
    },
  },
  plugins: [],
};
export default config;
