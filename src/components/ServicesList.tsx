"use client";

/**
 * ServicesList — the 7 services as a vertical numbered system.
 * NOT a 3-col card grid (design.md §6 anti-default).
 *
 * Layout: sticky left column shows the active service name; right column
 * scrolls through detail panels. On mobile, collapses to a flat numbered stack.
 *
 * Per-service accent color (themeColor from services.ts) appears ONLY inside
 * that service's row — never bleeds into the global system (brand.md §5.2 rule 4).
 */

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { services } from "@/data/services";
import { DUR, EASE } from "@/lib/motion";

export default function ServicesList() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    rowRefs.current.forEach((row, idx) => {
      if (!row) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting && e.intersectionRatio > 0.4) setActive(idx);
          });
        },
        { rootMargin: "-30% 0px -50% 0px", threshold: [0.4] },
      );
      obs.observe(row);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative bg-surface-base"
      aria-label="Services"
    >
      <div className="container-page pt-section-t pb-section-b">
        {/* Section intro — single column, asymmetric, eyebrow + h2 only */}
        <div className="max-w-2xl mb-s9">
          <div className="eyebrow">Capabilities</div>
          <h2 className="mt-s4 text-fs-h2 font-display font-bold text-ink-strong">
            Seven services. One discipline:{" "}
            <span className="text-brand-gradient">ship work that earns trust.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-s7 md:gap-s9">
          {/* Sticky left rail — desktop only */}
          <aside className="hidden md:block">
            <div className="sticky top-[120px]">
              <div className="eyebrow mb-s5">Active service</div>
              <ol className="space-y-s3">
                {services.map((s, i) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => rowRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" })}
                      className={`group flex items-baseline gap-s3 text-left transition-colors duration-fast ease-standard ${
                        i === active ? "text-ink-strong" : "text-ink-faint hover:text-ink-body"
                      }`}
                    >
                      <span className="font-display font-bold tabular-nums text-fs-caption w-s5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-fs-body">{s.name}</span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          </aside>

          {/* Right column — detail panels */}
          <ol className="space-y-s10">
            {services.map((service, i) => (
              <motion.li
                key={service.id}
                ref={(el) => { rowRefs.current[i] = el; }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: DUR.reveal, ease: EASE.emphasized }}
                className="relative pl-s6 md:pl-s7"
                style={
                  i === active
                    ? ({ ["--accent" as string]: service.themeColor } as React.CSSProperties)
                    : ({ ["--accent" as string]: "var(--surface-line)" } as React.CSSProperties)
                }
              >
                {/* Accent bar — only colored when this row is active */}
                <span
                  className="absolute left-0 top-s2 bottom-s2 w-[2px] transition-colors duration-base ease-standard"
                  style={{ background: "var(--accent)" }}
                  aria-hidden="true"
                />

                <div className="font-display font-bold tabular-nums text-fs-caption text-ink-faint mb-s3">
                  {String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                </div>

                <h3 className="text-fs-h3 font-display font-bold text-ink-strong mb-s4">
                  {service.name}
                </h3>

                <p className="text-fs-body-lg text-ink-body max-w-prose mb-s5">
                  {service.detailsSection.description}
                </p>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-s5 gap-y-s3 mb-s5">
                  {service.features.slice(0, 4).map((f, fi) => (
                    <li key={fi} className="text-fs-body text-ink-body flex gap-s3">
                      <span
                        className="mt-[0.5em] inline-block w-s2 h-px flex-none"
                        style={{ background: service.themeColor }}
                        aria-hidden="true"
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#talk"
                  className="text-fs-body text-ink-strong border-b border-ink-strong pb-[2px] hover:opacity-70 transition-opacity duration-fast"
                >
                  Talk about {service.name.toLowerCase()}
                </a>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
