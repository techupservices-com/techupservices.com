"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion } from "framer-motion";
import { services } from "@/data/services";
import { DUR, EASE } from "@/lib/motion";

export default function ServicesList() {
  const rowRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    rowRefs.current.forEach((row, idx) => {
      if (!row) return;
      const obs = new IntersectionObserver(
        (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(idx)),
        { rootMargin: "-38% 0px -42% 0px", threshold: [0.35] },
      );
      obs.observe(row);
      observers.push(obs);
    });
    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <section id="services" className="command-section" aria-label="Services">
      <div className="signal-grid" aria-hidden="true" />
      <div className="container-page relative z-10 pt-section-t pb-section-b">
        <div className="grid gap-s7 lg:grid-cols-[0.82fr_1.18fr]">
          <aside className="lg:sticky lg:top-[104px] lg:h-[calc(100dvh-var(--space-10))]">
            <div className="eyebrow">Service architecture</div>
            <h2 className="mt-s4 max-w-2xl font-display text-fs-h2 font-bold text-ink-strong">
              Seven modules. One operating system for <span className="text-brand-gradient">business scale.</span>
            </h2>
            <p className="mt-s5 max-w-prose text-fs-body-lg text-ink-body">
              Each capability plugs into the same discipline: map the business pressure, engineer the system, ship the outcome, then keep improving it.
            </p>

            <div className="command-surface scanline mt-s7 rounded-xl p-s4">
              <div className="text-fs-caption uppercase tracking-[var(--tracking-eyebrow)] text-ink-muted">Active system</div>
              <div className="mt-s3 font-display text-fs-h3 font-bold text-ink-strong">{services[active].name}</div>
              <div className="mt-s5 h-s2 overflow-hidden rounded-pill bg-surface-line">
                <div
                  className="h-full rounded-pill transition-all duration-slow ease-emphasized"
                  style={{ width: `${((active + 1) / services.length) * 100}%`, background: services[active].themeColor }}
                />
              </div>
            </div>
          </aside>

          <ol className="space-y-s6 lg:space-y-s8">
            {services.map((service, index) => (
              <ServiceModule
                key={service.id}
                service={service}
                index={index}
                active={active === index}
                refCallback={(node) => { rowRefs.current[index] = node; }}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function ServiceModule({
  service,
  index,
  active,
  refCallback,
}: {
  service: (typeof services)[number];
  index: number;
  active: boolean;
  refCallback: (node: HTMLLIElement | null) => void;
}) {
  const style = { ["--accent" as string]: service.themeColor } as CSSProperties;
  return (
    <motion.li
      ref={refCallback}
      style={style}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: DUR.reveal, ease: EASE.emphasized }}
      className="command-surface rounded-xl p-s5 md:p-s6"
    >
      <div className="absolute inset-0 pointer-events-none opacity-70" aria-hidden="true">
        <div className="absolute left-s5 right-s5 top-s5 h-px bg-surface-line" />
        <div className="absolute bottom-s5 left-s5 right-s5 h-px bg-surface-line" />
        <div className="absolute right-s5 top-s5 bottom-s5 w-px bg-surface-line" />
        <div className="absolute left-s5 top-1/2 h-px w-1/3 origin-left bg-[color:var(--accent)]" style={{ animation: active ? "command-pulse var(--dur-slow) var(--ease-standard) infinite" : "none" }} />
      </div>

      <div className="relative grid gap-s6 md:grid-cols-[0.75fr_1.25fr] md:items-center">
        <div>
          <div className="font-display text-fs-caption font-bold tabular-nums text-ink-faint">
            {String(index + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
          </div>
          <h3 className="mt-s3 font-display text-fs-h3 font-bold text-ink-strong">{service.name}</h3>
          <p className="mt-s4 text-fs-body text-ink-body">{service.tagline}</p>
        </div>

        <div>
          <p className="max-w-prose text-fs-body-lg text-ink-body">{service.detailsSection.description}</p>
          <ul className="mt-s5 grid gap-s3 sm:grid-cols-2">
            {service.features.map((feature) => (
              <li key={feature} className="flex items-center gap-s3 text-fs-body text-ink-strong">
                <span className="h-s2 w-s2 rounded-pill bg-[color:var(--accent)] shadow-1" aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>
          <a href="#talk" className="mt-s6 inline-flex border-b border-ink-strong pb-s1 text-fs-body font-medium text-ink-strong transition-opacity duration-fast hover:opacity-70">
            Discuss {service.name}
          </a>
        </div>
      </div>
    </motion.li>
  );
}
