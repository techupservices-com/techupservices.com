"use client";

/**
 * Showcase — the brand signature element.
 *
 * Per frontend-design: spend boldness in ONE place. This is it.
 * Per brand.md §5.5: the signature is the gradient applied to the headline second line,
 * against the warm surface, with soft ambient breathing. This component renders that.
 *
 * Implementation: a pinned 100vh section. As the user scrolls through it, three
 * narrative beats cross-fade IN PLACE, while a canvas behind them scrubs through
 * 81 pre-rendered frames. No GSAP — just framer-motion's `useScroll`.
 *
 * Reduced motion: shows the first frame statically with all three beats stacked.
 */

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { useMotionSafe, DUR, EASE } from "@/lib/motion";

const FRAME_COUNT = 81;
const FRAME_PATH = (i: number) =>
  `/images/hero-scroll/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;

const BEATS = [
  {
    eyebrow: "01 — Build",
    headline: "We build the systems",
    gradient: "your team relies on.",
    body: "Bespoke AI automation, websites, and mobile apps — engineered to outlast the next trend cycle.",
  },
  {
    eyebrow: "02 — Automate",
    headline: "We reclaim the hours",
    gradient: "your business is bleeding.",
    body: "WhatsApp flows, internal ops, lead routing — automated end-to-end, observable, and yours to own.",
  },
  {
    eyebrow: "03 — Scale",
    headline: "We become the partner",
    gradient: "you wish you had earlier.",
    body: "Strategic consulting, marketing infrastructure, and the discipline to ship — not just demo.",
  },
] as const;

export default function Showcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const [framesReady, setFramesReady] = useState(false);
  const { shouldReduce } = useMotionSafe();

  // Scroll progress 0..1 across the pinned section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Map scroll → frame index (rounded)
  const frameProgress = useTransform(
    scrollYProgress,
    [0, 1],
    [0, FRAME_COUNT - 1],
  );

  // Map scroll → active beat (0, 1, 2) with hold zones
  const beatProgress = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [0, 1, 2, 2]);
  const [activeBeat, setActiveBeat] = useState(0);

  useMotionValueEvent(beatProgress, "change", (v) => {
    setActiveBeat(Math.min(BEATS.length - 1, Math.max(0, Math.round(v))));
  });

  /* Preload all 81 frames after mount */
  useEffect(() => {
    if (shouldReduce) {
      // Reduced motion: load only frame 1, paint statically
      const img = new Image();
      img.src = FRAME_PATH(1);
      img.onload = () => {
        framesRef.current = [img];
        paintFrame(0);
        setFramesReady(true);
      };
      return;
    }

    let cancelled = false;
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        if (cancelled) return;
        loaded++;
        // Paint the first frame as soon as it arrives
        if (i === 1) paintFrame(0);
        if (loaded === FRAME_COUNT) setFramesReady(true);
      };
      img.onerror = () => {
        loaded++;
        if (loaded === FRAME_COUNT) setFramesReady(true);
      };
      images.push(img);
    }
    framesRef.current = images;

    return () => {
      cancelled = true;
    };
  }, [shouldReduce]);

  /* Resize handler — match canvas to its CSS size */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      paintFrame(currentFrameRef.current);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [framesReady]);

  /* Subscribe to scroll progress — repaint on every change */
  useMotionValueEvent(frameProgress, "change", (v) => {
    const idx = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(v)));
    if (idx === currentFrameRef.current) return;
    currentFrameRef.current = idx;
    paintFrame(idx);
  });

  function paintFrame(index: number) {
    const canvas = canvasRef.current;
    const img = framesRef.current[index] ?? framesRef.current[0];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // Cover behavior — fill canvas, crop overflow
    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  }

  /* Reduced-motion: stack all beats, single static frame */
  if (shouldReduce) {
    return (
      <section
        ref={sectionRef}
        className="relative bg-surface-base"
        aria-label="What we do"
      >
        <div className="container-page py-section-t">
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-surface-sunken">
            <canvas ref={canvasRef} className="w-full h-full" aria-hidden="true" />
          </div>
          <ol className="mt-s8 grid gap-s7 md:grid-cols-3">
            {BEATS.map((b) => (
              <li key={b.eyebrow}>
                <div className="eyebrow mb-s3">{b.eyebrow}</div>
                <h2 className="text-fs-h3 text-ink-strong mb-s2">
                  {b.headline}{" "}
                  <span className="text-brand-gradient">{b.gradient}</span>
                </h2>
                <p className="text-fs-body text-ink-body">{b.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  /* Standard: pinned section, ~3 × 100vh tall so scroll feels deliberate */
  return (
    <section
      ref={sectionRef}
      className="relative bg-surface-base"
      style={{ height: "300vh" }}
      aria-label="What we do"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Canvas — full bleed behind the type */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
          style={{ opacity: framesReady ? 1 : 0, transition: "opacity 400ms var(--ease-standard)" }}
        />

        {/* Soft warmth wash to keep type legible without dimming the artwork */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, var(--surface-base) 0%, transparent 18%, transparent 60%, var(--surface-base) 100%)",
          }}
        />

        {/* Beat copy — three cross-fade slots in the same anchor */}
        <div className="relative z-10 h-full w-full container-page flex items-center">
          <div className="relative w-full md:w-3/5 max-w-2xl">
            {BEATS.map((beat, i) => (
              <BeatSlot key={beat.eyebrow} beat={beat} isActive={i === activeBeat} />
            ))}
          </div>
        </div>

        {/* Scroll-cue at bottom — quiet, present, not animated as a bouncing arrow */}
        <ScrollCue active={activeBeat} total={BEATS.length} />
      </div>
    </section>
  );
}

function BeatSlot({
  beat,
  isActive,
}: {
  beat: (typeof BEATS)[number];
  isActive: boolean;
}) {
  const stackStyle: CSSProperties = {
    position: isActive ? "relative" : "absolute",
    inset: isActive ? "auto" : 0,
  };

  return (
    <motion.div
      style={stackStyle}
      initial={false}
      animate={{
        opacity: isActive ? 1 : 0,
        y: isActive ? 0 : 12,
      }}
      transition={{ duration: DUR.slow, ease: EASE.emphasized }}
      aria-hidden={!isActive}
    >
      <div className="eyebrow mb-s4">{beat.eyebrow}</div>
      <h2 className="text-fs-h1 font-display font-bold text-ink-strong">
        {beat.headline}{" "}
        <span className="text-brand-gradient">{beat.gradient}</span>
      </h2>
      <p className="mt-s5 text-fs-body-lg text-ink-body max-w-prose">
        {beat.body}
      </p>
    </motion.div>
  );
}

function ScrollCue({ active, total }: { active: number; total: number }) {
  return (
    <div className="absolute bottom-s6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-s2">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`block h-[2px] w-s7 transition-colors duration-base ease-standard ${
            i === active ? "bg-ink-strong" : "bg-surface-line"
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
