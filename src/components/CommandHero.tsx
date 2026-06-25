"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { motion } from "framer-motion";
import { ArrowDown, CalendarDays } from "lucide-react";
import { services } from "@/data/services";
import { DUR, EASE, useMotionSafe } from "@/lib/motion";

const SPOTLIGHT_R = 260;

const SERVICE_COPY: Record<string, string> = {
  "ai-automation": "Reclaim operational hours with workflows that keep moving after your team logs off.",
  "social-media": "Build a sharper content rhythm that turns attention into qualified demand.",
  "website-development": "Ship a premium storefront that earns trust before the first call.",
  "mobile-app": "Create mobile products that stay useful beyond the first tap.",
  "whatsapp-automation": "Turn follow-ups, support, and lead routing into an owned communication system.",
  "digital-marketing": "Connect campaigns, content, and conversion signals into measurable growth.",
  "tech-consulting": "Make the right technical calls before fragile systems become expensive.",
};

const POSITIONS = [
  { left: "20%", top: "32%" },
  { left: "50%", top: "20%" },
  { left: "80%", top: "32%" },
  { left: "78%", top: "59%" },
  { left: "62%", top: "75%" },
  { left: "38%", top: "75%" },
  { left: "22%", top: "59%" },
] as const;

type Point = { x: number; y: number };

export default function CommandHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mouse = useRef<Point>({ x: -999, y: -999 });
  const smooth = useRef<Point>({ x: -999, y: -999 });
  const rafRef = useRef<number | null>(null);
  const [cursor, setCursor] = useState<Point>({ x: -999, y: -999 });
  const [active, setActive] = useState(0);
  const [entered, setEntered] = useState(false);
  const { shouldReduce } = useMotionSafe();
  const reduceMotion = Boolean(shouldReduce);

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

  const service = services[active];
  const style = useMemo(
    () => ({
      ["--accent" as string]: service.themeColor,
      ["--cursor-x" as string]: `${cursor.x}px`,
      ["--cursor-y" as string]: `${cursor.y}px`,
      ["--spotlight-r" as string]: `${SPOTLIGHT_R}px`,
    } as CSSProperties),
    [cursor.x, cursor.y, service.themeColor],
  );

  return (
    <section
      ref={sectionRef}
      className="cyber-hero relative h-dvh min-h-[720px] overflow-hidden bg-surface-base text-ink-strong"
      style={style}
      aria-label="TechUpServices service atlas"
    >
      <BaseAtmosphere />
      <RevealAtmosphere active={active} entered={entered || reduceMotion} />

      <div className="absolute inset-x-0 top-[12%] z-20 pointer-events-none px-gutter text-center">
        <div className="cyber-watermark font-display font-bold uppercase leading-none tracking-[-0.08em]">
          Infrastructure
        </div>
      </div>

      <div className="relative z-30 flex h-full flex-col px-gutter pb-s7 pt-s10">
        <div className="flex flex-1 items-center justify-center">
          <CyberCore active={active} />
          <ServiceConstellation active={active} setActive={setActive} />
        </div>

        <MobileServiceSelector active={active} setActive={setActive} />

        <div className="grid gap-s5 md:grid-cols-[1fr_0.82fr] md:items-end">
          <HeroStatement />
          <ActiveServicePanel service={service} index={active} />
        </div>
      </div>
    </section>
  );
}

function BaseAtmosphere() {
  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,color-mix(in_srgb,var(--brand-grad-mid)_20%,transparent),transparent_24rem),linear-gradient(180deg,var(--surface-base),var(--surface-sunken))]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(var(--ink-strong)_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,color-mix(in_srgb,var(--surface-base)_44%,transparent)_58%,var(--surface-base)_100%)]" />
    </div>
  );
}

function RevealAtmosphere({ active, entered }: { active: number; entered: boolean }) {
  const activeService = services[active];
  return (
    <div
      className="cyber-reveal-layer absolute inset-0 z-10 pointer-events-none opacity-95"
      style={{ ["--accent" as string]: activeService.themeColor } as CSSProperties}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--cursor-x)_var(--cursor-y),color-mix(in_srgb,var(--accent)_30%,transparent)_0%,color-mix(in_srgb,var(--brand-grad-mid)_18%,transparent)_32%,transparent_68%)]" />
      <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(color-mix(in_srgb,var(--accent)_20%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_srgb,var(--brand-grad-start)_16%,transparent)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-pill border border-[color:var(--accent)] opacity-30" />
      <div className="absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-pill border border-brand-start opacity-30" />
      {!entered && <div className="absolute inset-0 bg-surface-base/70" />}
    </div>
  );
}

function HeroStatement() {
  return (
    <div className="max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 28, filter: "blur(12px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.1, ease: EASE.emphasized, delay: 0.15 }}
        className="eyebrow text-ink-muted"
      >
        Premium AI automation and digital infrastructure
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 32, filter: "blur(14px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.15, ease: EASE.emphasized, delay: 0.28 }}
        className="mt-s4 font-display text-fs-display font-bold leading-[0.88] tracking-[var(--tracking-display)] text-ink-strong"
      >
        Automate.<br />Build. <span className="text-brand-gradient">Scale.</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE.emphasized, delay: 0.58 }}
        className="mt-s5 max-w-2xl text-fs-body-lg text-ink-body"
      >
        Move the cursor across the atlas to reveal the service systems TechUpServices builds for founders, operators, and growth teams.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE.emphasized, delay: 0.76 }}
        className="mt-s6 flex flex-wrap items-center gap-s4"
      >
        <a href="#talk" className="btn-primary">
          <CalendarDays size={18} />
          Schedule a discovery call
        </a>
        <a href="#services" className="btn-secondary">
          Explore Services
          <ArrowDown size={16} />
        </a>
      </motion.div>
    </div>
  );
}

function ActiveServicePanel({ service, index }: { service: (typeof services)[number]; index: number }) {
  return (
    <motion.aside
      key={service.id}
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: DUR.slow, ease: EASE.emphasized }}
      className="command-surface scanline justify-self-start rounded-xl p-s5 md:justify-self-end md:max-w-md"
      style={{ ["--accent" as string]: service.themeColor } as CSSProperties}
    >
      <div className="flex items-center justify-between gap-s4 text-fs-caption uppercase tracking-[var(--tracking-eyebrow)] text-ink-muted">
        <span className="inline-flex items-center gap-s3">
          <span className="h-px w-s7 bg-[color:var(--accent)]" />
          Module {String(index + 1).padStart(2, "0")}
        </span>
        <span className="h-s2 w-s2 rounded-pill bg-[color:var(--accent)] shadow-2" aria-hidden="true" />
      </div>
      <h2 className="mt-s3 font-display text-fs-h3 font-bold text-ink-strong">{service.name}</h2>
      <p className="mt-s2 text-fs-body font-medium text-ink-strong/80">{service.tagline}</p>
      <p className="mt-s4 text-fs-body text-ink-body">{SERVICE_COPY[service.id]}</p>
    </motion.aside>
  );
}

function ServiceConstellation({ active, setActive }: { active: number; setActive: (index: number) => void }) {
  return (
    <ol className="absolute inset-0 z-40 hidden md:block" aria-label="Service discovery atlas">
      {services.map((service, index) => {
        const selected = index === active;
        const position = POSITIONS[index];
        return (
          <li key={service.id} className="absolute" style={position}>
            <ServiceAtlasCard
              service={service}
              index={index}
              selected={selected}
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
  index,
  selected,
  onActivate,
}: {
  service: (typeof services)[number];
  index: number;
  selected: boolean;
  onActivate: () => void;
}) {
  return (
    <button
      type="button"
      onPointerEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      className={`service-atlas-card group min-h-[8.25rem] w-[17.5rem] -translate-x-1/2 -translate-y-1/2 rounded-xl p-s4 text-left transition-all duration-slow ease-emphasized focus-visible:border-[color:var(--accent)] ${
        selected ? "is-active scale-[1.04]" : "opacity-55 hover:opacity-100"
      }`}
      style={{ ["--accent" as string]: service.themeColor } as CSSProperties}
      aria-pressed={selected}
    >
      <span className="flex items-center justify-between gap-s4 text-fs-caption uppercase tracking-[var(--tracking-eyebrow)] text-ink-faint">
        <span className="font-display font-bold tabular-nums">{String(index + 1).padStart(2, "0")}</span>
        <span className="h-s2 w-s2 rounded-pill bg-[color:var(--accent)] opacity-70 shadow-2" aria-hidden="true" />
      </span>
      <span className="mt-s3 block font-display text-fs-body-lg font-bold leading-tight text-ink-strong">
        {service.name}
      </span>
      <span className="mt-s2 block text-fs-caption font-medium leading-normal text-ink-body">
        {service.tagline}
      </span>
      <span
        className={`mt-s3 block max-h-0 overflow-hidden text-fs-caption leading-relaxed text-ink-muted transition-all duration-slow ease-emphasized group-hover:max-h-24 group-focus-visible:max-h-24 ${
          selected ? "max-h-24" : ""
        }`}
      >
        {SERVICE_COPY[service.id]}
      </span>
      <span
        className={`absolute left-1/2 top-1/2 h-px w-[9rem] origin-left bg-[color:var(--accent)] transition-opacity duration-base ${selected ? "opacity-80" : "opacity-0 group-hover:opacity-50"}`}
        aria-hidden="true"
      />
    </button>
  );
}

function MobileServiceSelector({ active, setActive }: { active: number; setActive: (index: number) => void }) {
  return (
    <div className="relative z-50 -mt-s4 mb-s5 md:hidden" aria-label="Select a service">
      <div className="flex gap-s2 overflow-x-auto pb-s2">
        {services.map((service, index) => {
          const selected = active === index;
          return (
            <button
              key={service.id}
              type="button"
              onClick={() => setActive(index)}
              className="min-h-[64px] w-[15rem] flex-none rounded-lg border px-s4 py-s3 text-left text-fs-caption transition-colors duration-base"
              style={{
                borderColor: selected ? service.themeColor : "var(--surface-line)",
                color: selected ? "var(--ink-strong)" : "var(--ink-muted)",
                background: selected ? "var(--surface-raised)" : "transparent",
              }}
            >
              <span className="block font-display font-bold text-ink-strong">{service.name}</span>
              <span className="mt-s1 block text-ink-muted">{service.tagline}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CyberCore({ active }: { active: number }) {
  const service = services[active];
  return (
    <div
      className="relative z-30 mx-auto grid aspect-square w-[min(72vw,32rem)] place-items-center md:w-[min(42vw,38rem)]"
      style={{ ["--accent" as string]: service.themeColor } as CSSProperties}
      aria-hidden="true"
    >
      <div className="absolute inset-0 rounded-pill border border-surface-line opacity-60" style={{ animation: "command-orbit 30s linear infinite" }} />
      <div className="absolute inset-[10%] rounded-pill border border-brand-mid/40 opacity-80" style={{ animation: "command-orbit 22s linear infinite reverse" }} />
      <div className="absolute inset-[22%] rounded-pill border border-[color:var(--accent)] opacity-50" />
      <div className="absolute inset-[29%] rounded-[42%_58%_46%_54%] border border-surface-line bg-surface-raised/35 shadow-3" />
      <div className="relative h-[42%] w-[38%] rounded-[45%_45%_38%_38%] border border-[color:var(--accent)] bg-surface-sunken shadow-3">
        <div className="absolute left-[24%] top-[32%] h-s3 w-s3 rounded-pill bg-brand-start shadow-2" />
        <div className="absolute right-[24%] top-[32%] h-s3 w-s3 rounded-pill bg-brand-mid shadow-2" />
        <div className="absolute bottom-[27%] left-[28%] h-px w-[44%] bg-surface-line" />
        <div className="absolute -bottom-[22%] left-1/2 h-[24%] w-[48%] -translate-x-1/2 rounded-b-xl border-x border-b border-surface-line bg-surface-raised/30" />
      </div>
      <div className="absolute inset-[36%] rounded-pill bg-[color:var(--accent)] opacity-20 blur-2xl" />
    </div>
  );
}
