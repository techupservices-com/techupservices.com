"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE } from "@/lib/motion";

type AnimatedNumberProps = {
  value: number;
  duration?: number;
  format?: (n: number) => string;
  className?: string;
  startOnView?: boolean;
};

export default function AnimatedNumber({
  value,
  duration = 1.2,
  format = (n) => Math.round(n).toLocaleString(),
  className,
  startOnView = true,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);
  const fromRef = useRef(0);

  useEffect(() => {
    if (startOnView && !inView) return;

    if (reduce) {
      fromRef.current = value;
      setDisplay(value);
      return;
    }

    const controls = animate(fromRef.current, value, {
      duration,
      ease: EASE.emphasized,
      onUpdate: (latest) => setDisplay(latest),
    });

    fromRef.current = value;
    return () => controls.stop();
  }, [duration, inView, reduce, startOnView, value]);

  return (
    <span ref={ref} className={className ? `tabular-nums ${className}` : "tabular-nums"}>
      {format(display)}
    </span>
  );
}
