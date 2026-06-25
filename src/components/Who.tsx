"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { revealVariants, staggerChild, staggerParent, useMotionSafe } from "@/lib/motion";

type ContactPoint = {
  label: string;
  icon: typeof MapPin;
  value: string;
  href?: string;
};

const CONTACT_POINTS: ContactPoint[] = [
  {
    label: "Office",
    icon: MapPin,
    value: "Office No. 1, Near Main Gate, Hari Ganga Society, Yerwada, Pune – 411006",
  },
  { label: "Email", icon: Mail, value: "support@techupservices.com", href: "mailto:support@techupservices.com" },
  { label: "Phone", icon: Phone, value: "+91 82374 47244", href: "tel:+918237447244" },
] as const;

export default function Who() {
  const { safe } = useMotionSafe();
  return (
    <section id="who" className="command-section" aria-label="Who we are">
      <div className="signal-grid" aria-hidden="true" />
      <div className="container-page relative z-10 pt-section-t pb-section-b">
        <div className="command-surface scanline rounded-xl p-s5 md:p-s8">
          <div className="grid gap-s8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <div className="eyebrow">Studio coordinates</div>
              <h2 className="mt-s4 font-display text-fs-h2 font-bold text-ink-strong">
                Architects of the <span className="text-brand-gradient">digital future.</span>
              </h2>
            </div>

            <motion.div variants={safe(revealVariants)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-15%" }}>
              <p className="text-fs-body-lg text-ink-body">
                We are not just an agency; we are your dedicated innovation partner. We build for what businesses need this quarter and next year, not for a sci-fi vision of 2040. Premium comes from restraint, engineering discipline, and craft.
              </p>
            </motion.div>
          </div>

          <motion.dl
            variants={safe(staggerParent)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-15%" }}
            className="mt-s8 grid gap-s4 border-t border-surface-line pt-s6 md:grid-cols-3"
          >
            {CONTACT_POINTS.map((point) => {
              const Icon = point.icon;
              const content = point.href ? (
                <a href={point.href} className="transition-colors duration-fast hover:text-ink-strong">
                  {point.value}
                </a>
              ) : (
                point.value
              );
              return (
                <motion.div key={point.label} variants={safe(staggerChild)} className="rounded-lg border border-surface-line bg-surface-raised p-s4">
                  <dt className="eyebrow mb-s3 flex items-center gap-s2">
                    <Icon size={14} aria-hidden="true" />
                    {point.label}
                  </dt>
                  <dd className="text-fs-body text-ink-body">{content}</dd>
                </motion.div>
              );
            })}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}
