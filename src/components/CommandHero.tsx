"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import { services } from "@/data/services";
import { useMotionSafe } from "@/lib/motion";
import TiltCard from "@/components/TiltCard";

const RobotCore = dynamic(() => import("@/components/RobotCore"), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-surface-sunken" />,
});

const POSITIONS = [
  { desktopLeft: "20%", desktopTop: "26%", mobileLeft: "26%", mobileTop: "15%" },
  { desktopLeft: "50%", desktopTop: "22%", mobileLeft: "74%", mobileTop: "15%" },
  { desktopLeft: "80%", desktopTop: "26%", mobileLeft: "26%", mobileTop: "33%" },
  { desktopLeft: "20%", desktopTop: "48%", mobileLeft: "74%", mobileTop: "33%" },
  { desktopLeft: "80%", desktopTop: "48%", mobileLeft: "25%", mobileTop: "70%" },
  { desktopLeft: "20%", desktopTop: "70%", mobileLeft: "75%", mobileTop: "70%" },
  { desktopLeft: "80%", desktopTop: "70%", mobileLeft: "50%", mobileTop: "84%" },
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
      className="cyber-hero relative h-dvh min-h-[680px] overflow-hidden bg-surface-base px-gutter py-s8 text-ink-strong md:min-h-[720px] md:p-0"
      style={style}
      aria-label="TechUpServices service atlas"
    >
      <CyberCore active={active} />

      <div className="relative z-30 flex h-full items-center md:px-gutter md:pb-s7 md:pt-s10">
        <div className="flex flex-1 items-center justify-center">
          <ServiceConstellation active={active} cursor={cursorNorm} entered={entered && !reduceMotion} setActive={setActive} />
        </div>
      </div>
    </section>
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
    <ol className="absolute inset-0 z-40 block" aria-label="Service discovery atlas">
      {services.map((service, index) => {
        const selected = index === active;
        const position = POSITIONS[index];
        const cardX = Number.parseFloat(position.desktopLeft) / 100;
        const cardY = Number.parseFloat(position.desktopTop) / 100;
        const proximity = entered ? clamp(1 - Math.hypot(cursor.x - cardX, cursor.y - cardY) * 2.25, 0, 1) : 0;
        return (
          <li
            key={service.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 md:left-[var(--desktop-left)] md:top-[var(--desktop-top)] left-[var(--mobile-left)] top-[var(--mobile-top)]"
            style={{
              ["--desktop-left" as string]: position.desktopLeft,
              ["--desktop-top" as string]: position.desktopTop,
              ["--mobile-left" as string]: position.mobileLeft,
              ["--mobile-top" as string]: position.mobileTop,
            } as CSSProperties}
          >
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
    <TiltCard className="w-[clamp(8.75rem,38vw,11rem)] sm:w-[clamp(10rem,32vw,13rem)] md:w-[clamp(14rem,19vw,18.75rem)]">
      <button
        type="button"
        onPointerEnter={onActivate}
        onPointerMove={onPointerMove}
        onFocus={onActivate}
        onClick={onActivate}
        className={`service-atlas-card group min-h-[5.75rem] w-full rounded-lg p-s3 text-left transition-all duration-slow ease-emphasized focus-visible:border-[color:var(--accent)] sm:min-h-[6.25rem] md:min-h-[7.5rem] md:rounded-xl md:p-s5 ${
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
        <span className="block max-w-[15rem] font-display text-[clamp(0.95rem,3.6vw,1.15rem)] font-bold leading-[1.02] tracking-[var(--tracking-tight)] text-ink-strong md:text-fs-h4">
          {service.name}
        </span>
        <span className="mt-s2 block max-w-[14.5rem] text-[clamp(0.72rem,2.8vw,0.9rem)] font-normal leading-snug text-ink-body md:mt-s3 md:text-fs-body">
          {service.tagline}
        </span>
      </button>
    </TiltCard>
  );
}

function CyberCore({ active }: { active: number }) {
  const service = services[active];

  return (
    <div
      className="pointer-events-none absolute inset-0 z-10"
      style={{ ["--accent" as string]: service.themeColor } as CSSProperties}
      aria-hidden="true"
    >
      <div className="robot-3d-core absolute inset-0 z-10">
        <RobotCore accent={service.themeColor} />
      </div>
    </div>
  );
}
