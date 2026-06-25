"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { type ReactNode, type RefObject, useRef } from "react";
import { EASE } from "@/lib/motion";

type ScrollRevealProps = {
  children: ReactNode;
  y?: number;
  blur?: number;
  duration?: number;
  delay?: number;
  once?: boolean;
  amount?: "some" | "all" | number;
  root?: RefObject<Element>;
  className?: string;
};

export default function ScrollReveal({
  children,
  y = 18,
  blur = 8,
  duration = 0.64,
  delay = 0,
  once = true,
  amount = 0.18,
  root,
  className,
}: ScrollRevealProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { root, once, amount });
  const clampedBlur = Math.min(blur, 10);

  const hidden = reduce
    ? { opacity: 0 }
    : { opacity: 0, y, filter: `blur(${clampedBlur}px)` };
  const shown = reduce
    ? { opacity: 1 }
    : { opacity: 1, y: 0, filter: "blur(0px)" };

  return (
    <motion.div
      ref={ref}
      initial={hidden}
      animate={inView ? shown : hidden}
      transition={{ duration, ease: EASE.emphasized, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
