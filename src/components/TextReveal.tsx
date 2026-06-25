"use client";

import { motion, useInView, useReducedMotion, type Transition } from "framer-motion";
import { useRef, type ElementType } from "react";
import { EASE } from "@/lib/motion";

type SplitMode = "word" | "char";
type TextSegment = { text: string; className?: string };

type TextRevealProps = {
  text?: string | string[];
  segments?: TextSegment[][];
  as?: ElementType;
  className?: string;
  split?: SplitMode;
  stagger?: number;
  delay?: number;
  blur?: number;
  yOffset?: string | number;
  spring?: { stiffness?: number; damping?: number; mass?: number };
  once?: boolean;
  whileInView?: boolean;
};

const DEFAULT_SPRING = { stiffness: 140, damping: 26, mass: 1.2 } as const;

export default function TextReveal({
  text,
  segments,
  as: Component = "span",
  className,
  split = "word",
  stagger = 0.08,
  delay = 0,
  blur = 10,
  yOffset = "42%",
  spring,
  once = true,
  whileInView = true,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once, amount: 0.4 });
  const reduce = useReducedMotion();
  const shouldAnimate = whileInView ? inView : true;
  const plainLines: TextSegment[][] = (Array.isArray(text) ? text : [text ?? ""]).map((line) => [{ text: line }]);
  const lines: TextSegment[][] = segments ?? plainLines;
  const springConfig = { ...DEFAULT_SPRING, ...spring };
  const clampedBlur = Math.min(blur, 10);
  let unitIndex = 0;

  return (
    <Component ref={ref} className={className ? `block ${className}` : "block"}>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="block overflow-hidden pb-[0.04em]">
          {line.map((segment, segmentIndex) => {
            const units = split === "word"
              ? segment.text.split(/(\s+)/).filter(Boolean)
              : Array.from(segment.text);

            return units.map((unit, unitSegmentIndex) => {
              if (/^\s+$/.test(unit)) {
                return <span key={`${segmentIndex}-${unitSegmentIndex}`}>{unit}</span>;
              }

              const unitDelay = delay + unitIndex * stagger;
              unitIndex += 1;
              const initial = reduce
                ? { opacity: 0 }
                : { y: yOffset, opacity: 0, filter: `blur(${clampedBlur}px)` };
              const animate = shouldAnimate
                ? reduce
                  ? { opacity: 1 }
                  : { y: 0, opacity: 1, filter: "blur(0px)" }
                : initial;
              const transition: Transition = reduce
                ? { opacity: { duration: 0.25, ease: EASE.entry, delay: unitDelay * 0.3 } }
                : {
                    y: { type: "spring", ...springConfig, delay: unitDelay },
                    opacity: { duration: 0.7, ease: EASE.entry, delay: unitDelay },
                    filter: { duration: 0.9, ease: EASE.entry, delay: unitDelay },
                  };

              return (
                <motion.span
                  key={`${segmentIndex}-${unitSegmentIndex}`}
                  initial={initial}
                  animate={animate}
                  transition={transition}
                  className={segment.className ? `inline-block will-change-transform ${segment.className}` : "inline-block will-change-transform"}
                >
                  {unit}
                </motion.span>
              );
            });
          })}
        </span>
      ))}
    </Component>
  );
}
