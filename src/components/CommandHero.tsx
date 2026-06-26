"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import { services } from "@/data/services";
import { useMotionSafe } from "@/lib/motion";
import TiltCard from "@/components/TiltCard";

const POSITIONS = [
  { left: "20%", top: "26%" },
  { left: "50%", top: "22%" },
  { left: "80%", top: "26%" },
  { left: "20%", top: "48%" },
  { left: "80%", top: "48%" },
  { left: "20%", top: "70%" },
  { left: "80%", top: "70%" },
] as const;

type Point = { x: number; y: number };

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function CommandHero() {
  const mouse = useRef<Point>({ x: -999, y: -999 });
  const smooth = useRef<Point>({ x: -999, y: -999 });
  const rafRef = useRef<number | null>(null);
  const [cursor, setCursor] = useState<Point>({ x: -999, y: -999 });
  const [active, setActive] = useState(0);
  const [entered, setEntered] = useState(false);
  const { shouldReduce } = useMotionSafe();
  const reduceMotion = Boolean(shouldReduce);

  function updateTouchCursor(event: ReactPointerEvent<HTMLElement>) {
    if (reduceMotion || event.pointerType === "mouse") return;
    mouse.current = { x: event.clientX, y: event.clientY };
    smooth.current = { x: event.clientX, y: event.clientY };
    setCursor({ x: event.clientX, y: event.clientY });
    setEntered(true);
  }

  useEffect(() => {
    if (reduceMotion) return;

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      mouse.current = { x: event.clientX, y: event.clientY };
      setEntered(true);
    };

    const tick = () => {
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1;
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1;
      setCursor({ x: smooth.current.x, y: smooth.current.y });
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reduceMotion]);

  const style = useMemo(
    () => ({
      ["--accent" as string]: services[active].themeColor,
      ["--cursor-x" as string]: `${cursor.x}px`,
      ["--cursor-y" as string]: `${cursor.y}px`,
    } as CSSProperties),
    [active, cursor.x, cursor.y],
  );

  const cursorNorm = useMemo(() => {
    if (typeof window === "undefined" || cursor.x < 0 || cursor.y < 0) return { x: 0.5, y: 0.5 };
    return {
      x: clamp(cursor.x / window.innerWidth, 0, 1),
      y: clamp(cursor.y / window.innerHeight, 0, 1),
    };
  }, [cursor.x, cursor.y]);

  return (
    <section
      onPointerDown={updateTouchCursor}
      onPointerMove={updateTouchCursor}
      className="cyber-hero relative min-h-dvh overflow-hidden bg-surface-base px-gutter py-s10 text-ink-strong md:h-dvh md:min-h-[720px] md:p-0"
      style={style}
      aria-label="TechUpServices service atlas"
    >
      <BaseAtmosphere />

      <div className="relative z-30 flex min-h-[calc(100dvh-var(--space-10))] items-center md:h-full md:min-h-0 md:px-gutter md:pb-s7 md:pt-s10">
        <div className="flex flex-1 items-center justify-center">
          <ServiceConstellation active={active} cursor={cursorNorm} entered={entered && !reduceMotion} setActive={setActive} />
        </div>
      </div>
    </section>
  );
}

function BaseAtmosphere() {
  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <div className="service-atlas-atmosphere absolute inset-0" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,color-mix(in_srgb,var(--surface-base)_44%,transparent)_58%,var(--surface-base)_100%)]" />
    </div>
  );
}

function ServiceConstellation({
  active,
  cursor,
  entered,
  setActive,
}: {
  active: number;
  cursor: Point;
  entered: boolean;
  setActive: (index: number) => void;
}) {
  return (
    <ol className="relative z-40 grid w-full max-w-[42rem] grid-cols-1 gap-s3 sm:grid-cols-2 md:absolute md:inset-0 md:block md:max-w-none" aria-label="Service discovery atlas">
      {services.map((service, index) => {
        const selected = index === active;
        const position = POSITIONS[index];
        const cardX = Number.parseFloat(position.left) / 100;
        const cardY = Number.parseFloat(position.top) / 100;
        const proximity = entered ? clamp(1 - Math.hypot(cursor.x - cardX, cursor.y - cardY) * 2.25, 0, 1) : 0;
        return (
          <li key={service.id} className="md:absolute md:-translate-x-1/2 md:-translate-y-1/2" style={position}>
            <ServiceAtlasCard
              service={service}
              selected={selected}
              proximity={proximity}
              onActivate={() => setActive(index)}
            />
          </li>
        );
      })}
    </ol>
  );
}

function ServiceAtlasCard({
  service,
  selected,
  proximity,
  onActivate,
}: {
  service: (typeof services)[number];
  selected: boolean;
  proximity: number;
  onActivate: () => void;
}) {
  function onPointerMove(event: ReactPointerEvent<HTMLButtonElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--card-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--card-y", `${event.clientY - rect.top}px`);
  }

  return (
    <TiltCard className="w-full md:w-[clamp(14rem,19vw,18.75rem)]">
      <button
        type="button"
        onPointerEnter={onActivate}
        onPointerMove={onPointerMove}
        onFocus={onActivate}
        onClick={onActivate}
        className={`service-atlas-card group min-h-[6.75rem] w-full rounded-xl p-s4 text-left transition-all duration-slow ease-emphasized focus-visible:border-[color:var(--accent)] md:min-h-[7.5rem] md:p-s5 ${
          selected ? "is-active scale-[1.04]" : "opacity-55 hover:opacity-100"
        }`}
        style={{
          ["--accent" as string]: service.themeColor,
          ["--card-proximity" as string]: proximity.toFixed(3),
          ["--card-accent-amount" as string]: `${10 + proximity * 34}%`,
          ["--card-ember-amount" as string]: `${5 + proximity * 16}%`,
          ["--card-glow-size" as string]: `${proximity * 2}rem`,
        } as CSSProperties}
        aria-pressed={selected}
      >
        <span className="block max-w-[15rem] font-display text-fs-h4 font-bold leading-[1.02] tracking-[var(--tracking-tight)] text-ink-strong">
          {service.name}
        </span>
        <span className="mt-s3 block max-w-[14.5rem] text-fs-body font-normal leading-snug text-ink-body">
          {service.tagline}
        </span>
      </button>
    </TiltCard>
  );
}
