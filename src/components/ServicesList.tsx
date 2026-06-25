"use client";

import { useRef, type CSSProperties } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { services } from "@/data/services";
import { EASE } from "@/lib/motion";
import AnimatedNumber from "@/components/AnimatedNumber";
import TextReveal from "@/components/TextReveal";

export default function ServicesList() {
  return (
    <section id="services" className="command-section relative rounded-t-[var(--radius-2xl)]" aria-label="Services">
      <div className="signal-grid" aria-hidden="true" />
      <div className="container-page relative z-10 pt-section-t pb-section-b">
        <div className="mx-auto max-w-6xl text-center">
          <div className="eyebrow">Service architecture</div>
          <TextReveal
            as="h2"
            segments={[[{ text: "Seven systems for " }, { text: "business scale.", className: "text-brand-gradient" }]]}
            className="mt-s4 font-display text-fs-display font-bold leading-[0.88] tracking-[var(--tracking-display)] text-ink-strong"
          />
          <p className="mx-auto mt-s5 max-w-2xl text-fs-body-lg text-ink-body">
            Scroll through the stack. Each card reveals one operating layer we design, build, and improve for serious growth teams.
          </p>
        </div>

        <ol className="mx-auto mt-s8 max-w-6xl">
          {services.map((service, index) => (
            <ServiceStackCard
              key={service.id}
              service={service}
              index={index}
              total={services.length}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

function ServiceStackCard({
  service,
  index,
  total,
}: {
  service: (typeof services)[number];
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 82%", "end 22%"] });
  const targetScale = 1 - (total - 1 - index) * 0.025;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -18]);
  const style = {
    ["--accent" as string]: service.themeColor,
    ["--stack-top" as string]: `calc(var(--space-5) + ${index} * var(--space-2))`,
  } as CSSProperties;

  return (
    <li ref={ref} className="min-h-[82dvh] pb-s6 md:min-h-[86dvh]">
      <motion.article
        style={{ ...style, scale: reduce ? 1 : scale, y: reduce ? 0 : y }}
        initial={{ opacity: 0, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.22 }}
        transition={{ duration: 0.74, ease: EASE.emphasized, delay: index * 0.04 }}
        className="service-stack-card sticky top-[var(--stack-top)] overflow-hidden rounded-2xl p-s5 shadow-3 md:p-s7"
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-x-s5 top-s5 h-px bg-surface-line" />
          <div className="absolute inset-x-s5 bottom-s5 h-px bg-surface-line" />
          <div className="absolute bottom-s5 right-s5 top-s5 w-px bg-surface-line" />
          <div className="absolute left-s5 top-s5 h-s2 w-s10 rounded-pill bg-[color:var(--accent)] opacity-80 shadow-2" />
        </div>

        <div className="relative z-10 grid min-h-[calc(82dvh-var(--space-10))] content-between gap-s7 md:min-h-[calc(78dvh-var(--space-10))]">
          <div className="flex items-start justify-between gap-s4">
            <div className="eyebrow text-ink-muted">Operating layer</div>
            <div className="font-display text-fs-caption font-bold tabular-nums text-ink-faint">
              <AnimatedNumber value={index + 1} duration={0.7} format={(n) => String(Math.round(n)).padStart(2, "0")} /> /{" "}
              <AnimatedNumber value={total} duration={0.7} format={(n) => String(Math.round(n)).padStart(2, "0")} />
            </div>
          </div>

          <div className="grid gap-s6 md:grid-cols-[0.54fr_1fr] md:items-end">
            <div className="font-display text-[clamp(4.5rem,18vw,14rem)] font-bold leading-[0.78] tracking-[var(--tracking-display)] text-ink-strong tabular-nums">
              <AnimatedNumber value={index + 1} duration={0.85} format={(n) => String(Math.round(n)).padStart(2, "0")} />
            </div>

            <div>
              <h3 className="font-display text-[clamp(2.2rem,7vw,6.8rem)] font-bold uppercase leading-[0.9] tracking-[var(--tracking-display)] text-ink-strong">
                {service.name}
              </h3>
              <p className="mt-s4 max-w-2xl text-fs-body-lg font-medium text-ink-strong/80">{service.tagline}</p>
              <p className="mt-s4 max-w-3xl text-fs-body-lg leading-relaxed text-ink-body">{service.detailsSection.description}</p>

              <ul className="mt-s6 grid gap-s3 sm:grid-cols-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex min-h-[44px] items-center gap-s3 border-t border-surface-line py-s3 text-fs-body text-ink-strong">
                    <span className="h-s2 w-s2 flex-none rounded-pill bg-[color:var(--accent)] shadow-1" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-s4 border-t border-surface-line pt-s5">
            <span className="text-fs-caption uppercase tracking-[var(--tracking-eyebrow)] text-ink-muted">Engineered by TechUpServices</span>
            <a href="#talk" className="inline-flex min-h-[44px] items-center border-b border-ink-strong text-fs-body font-medium text-ink-strong transition-opacity duration-fast hover:opacity-70">
              Discuss {service.name}
            </a>
          </div>
        </div>
      </motion.article>
    </li>
  );
}
