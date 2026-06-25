"use client";

import { useMemo, useRef, useState, type CSSProperties } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { ArrowDown, CalendarDays } from "lucide-react";
import { services } from "@/data/services";
import { DUR, EASE, useMotionSafe } from "@/lib/motion";

const SERVICE_COPY: Record<string, string> = {
  "ai-automation": "Automate repetitive workflows and reclaim operational hours with systems that keep moving after your team logs off.",
  "social-media": "Build a sharper content rhythm that turns attention into qualified demand across the channels your buyers already watch.",
  "website-development": "Ship a fast, premium digital storefront that explains the offer, earns trust, and converts serious visitors.",
  "mobile-app": "Create mobile products that keep customers engaged beyond the first tap, with interaction quality that feels native.",
  "whatsapp-automation": "Automate lead follow-up, support, and customer communication inside the channel your customers already use.",
  "digital-marketing": "Connect campaigns, content, and conversion signals so growth becomes measurable instead of hopeful.",
  "tech-consulting": "Make the right technical calls before expensive mistakes compound into fragile systems and missed quarters.",
};

export default function CommandHero() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const { shouldReduce } = useMotionSafe();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const serviceProgress = useTransform(scrollYProgress, [0.06, 0.92], [0, services.length - 1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.86, 1], [1, 1, 0]);
  const coreScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1.08, 0.98]);
  const railY = useTransform(scrollYProgress, [0, 0.18], [24, 0]);

  useMotionValueEvent(serviceProgress, "change", (value) => {
    const next = Math.min(services.length - 1, Math.max(0, Math.round(value)));
    setActive(next);
  });

  const service = services[active];
  const activeStyle = useMemo(
    () => ({ ["--accent" as string]: service.themeColor } as CSSProperties),
    [service.themeColor],
  );

  if (shouldReduce) {
    return (
      <section className="command-section min-h-dvh pt-s10 pb-s8" aria-label="TechUpServices command system">
        <div className="signal-grid" aria-hidden="true" />
        <div className="container-page relative z-10 grid gap-s7 lg:grid-cols-[1fr_1.15fr] lg:items-center">
          <HeroCopy service={service} activeStyle={activeStyle} compact />
          <CommandCore active={active} activeStyle={activeStyle} />
          <ServiceDock active={active} onSelect={setActive} />
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className="relative bg-surface-base"
      style={{ height: "760vh" }}
      aria-label="TechUpServices command system"
    >
      <motion.div className="command-section sticky top-0 h-dvh overflow-hidden" style={{ opacity: heroOpacity }}>
        <div className="signal-grid" aria-hidden="true" />
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-s10 left-[8%] h-s11 w-s11 rounded-pill blur-3xl opacity-40 bg-brand-start" />
          <div className="absolute top-[18%] right-[4%] h-s11 w-s11 rounded-pill blur-3xl opacity-35 bg-brand-end" />
          <div className="absolute bottom-[-12%] left-[35%] h-s11 w-s11 rounded-pill blur-3xl opacity-30 bg-brand-mid" />
        </div>

        <div className="container-page relative z-10 grid h-full grid-cols-1 content-center gap-s7 pt-s9 pb-s8 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-center lg:content-normal">
          <HeroCopy service={service} activeStyle={activeStyle} />
          <motion.div style={{ scale: coreScale }} className="relative order-first min-h-[42dvh] lg:order-none lg:min-h-0">
            <CommandCore active={active} activeStyle={activeStyle} />
          </motion.div>
          <motion.div style={{ y: railY }} className="lg:col-span-2">
            <ServiceDock active={active} onSelect={setActive} />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function HeroCopy({ service, activeStyle, compact = false }: { service: (typeof services)[number]; activeStyle: CSSProperties; compact?: boolean }) {
  return (
    <div className="relative z-10" style={activeStyle}>
      <div className="eyebrow text-ink-muted">TechUpServices command system</div>
      <h1 className="mt-s4 max-w-4xl font-display text-fs-display font-bold leading-none text-ink-strong">
        Automate. Build. <span className="text-brand-gradient">Scale.</span>
      </h1>
      <motion.div
        key={service.id}
        initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: DUR.slow, ease: EASE.emphasized }}
        className="mt-s6 max-w-2xl"
      >
        <div className="flex items-center gap-s3 text-fs-caption uppercase tracking-[var(--tracking-eyebrow)] text-ink-muted">
          <span className="h-px w-s7 origin-left" style={{ background: "var(--accent)", animation: "command-pulse var(--dur-slow) var(--ease-standard) infinite" }} />
          Active module
        </div>
        <h2 className="mt-s3 font-display text-fs-h2 font-bold text-ink-strong">{service.name}</h2>
        <p className="mt-s4 text-fs-body-lg text-ink-body">{SERVICE_COPY[service.id] ?? service.detailsSection.description}</p>
      </motion.div>
      <div className="mt-s7 flex flex-wrap items-center gap-s4">
        <a href="#talk" className="btn-primary">
          <CalendarDays size={18} />
          Schedule a discovery call
        </a>
        {!compact && (
          <a href="#services" className="btn-secondary">
            Explore Services
            <ArrowDown size={16} />
          </a>
        )}
      </div>
    </div>
  );
}

function CommandCore({ active, activeStyle }: { active: number; activeStyle: CSSProperties }) {
  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-[42rem] items-center justify-center" style={activeStyle} aria-hidden="true">
      <div className="absolute inset-[6%] rounded-pill border border-surface-line opacity-70" style={{ animation: "command-orbit 32s linear infinite" }} />
      <div className="absolute inset-[13%] rounded-pill border border-surface-line opacity-60" style={{ animation: "command-orbit 24s linear infinite reverse" }} />
      <div className="absolute inset-[21%] rounded-pill border border-[color:var(--accent)] opacity-45" style={{ animation: "command-orbit 18s linear infinite" }} />
      {services.map((service, index) => {
        const angle = (index / services.length) * Math.PI * 2 - Math.PI / 2;
        const radius = 43;
        const x = 50 + Math.cos(angle) * radius;
        const y = 50 + Math.sin(angle) * radius;
        const selected = index === active;
        return (
          <div
            key={service.id}
            className="absolute grid h-s7 w-s7 place-items-center rounded-pill border text-fs-caption font-semibold transition-all duration-slow ease-emphasized"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: "translate(-50%, -50%)",
              color: selected ? "var(--surface-base)" : "var(--ink-muted)",
              background: selected ? service.themeColor : "var(--surface-raised)",
              borderColor: selected ? service.themeColor : "var(--surface-line)",
              boxShadow: selected ? `0 0 44px ${service.themeColor}` : "none",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </div>
        );
      })}
      <div className="command-surface scanline relative grid aspect-square w-[52%] place-items-center rounded-pill">
        <div className="absolute inset-[13%] rounded-pill border border-[color:var(--accent)] opacity-55" />
        <div className="absolute inset-[26%] rounded-pill bg-[color:var(--accent)] opacity-20 blur-xl" />
        <div className="relative grid h-[45%] w-[45%] place-items-center rounded-pill border border-surface-line bg-surface-sunken shadow-3">
          <div className="h-[34%] w-[34%] rounded-pill bg-[color:var(--accent)] shadow-2" />
          <div className="absolute bottom-[22%] h-px w-[56%] bg-surface-line" />
          <div className="absolute top-[28%] flex gap-s2">
            <span className="h-s2 w-s2 rounded-pill bg-brand-start" />
            <span className="h-s2 w-s2 rounded-pill bg-brand-mid" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiceDock({ active, onSelect }: { active: number; onSelect: (index: number) => void }) {
  return (
    <div className="command-surface rounded-xl p-s3" aria-label="Service modules">
      <ol className="grid grid-cols-2 gap-s2 md:grid-cols-4 lg:grid-cols-7">
        {services.map((service, index) => {
          const selected = index === active;
          return (
            <li key={service.id}>
              <button
                type="button"
                onClick={() => onSelect(index)}
                className="group min-h-[64px] w-full rounded-lg border p-s3 text-left transition-colors duration-base ease-standard"
                style={{
                  borderColor: selected ? service.themeColor : "var(--surface-line)",
                  background: selected ? "color-mix(in srgb, var(--surface-raised) 82%, transparent)" : "transparent",
                }}
              >
                <span className="block font-display text-fs-caption font-bold tabular-nums text-ink-faint">{String(index + 1).padStart(2, "0")}</span>
                <span className="mt-s1 block text-fs-caption font-medium text-ink-strong">{service.name}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
