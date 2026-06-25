"use client";

/**
 * Who — short principled paragraph + address + social links.
 * Replaces the long About page. Voice per brand.md §4: reflective, warm, no pitch-deck phrasing.
 */

import { motion } from "framer-motion";
import { MapPin, Mail, Phone } from "lucide-react";
import { revealVariants, useMotionSafe } from "@/lib/motion";

export default function Who() {
  const { safe } = useMotionSafe();
  return (
    <section id="who" className="relative bg-paper" aria-label="Who we are">
      <div className="container-page pt-section-t pb-section-b">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-s7">
          {/* Heading column — narrow */}
          <div className="md:col-span-4">
            <div className="eyebrow">Who</div>
            <h2 className="mt-s4 text-fs-h2 font-display font-bold text-ink-strong">
              Architects of the{" "}
              <span className="text-brand-gradient">digital future.</span>
            </h2>
          </div>

          {/* Paragraph + contact column — wide */}
          <motion.div
            variants={safe(revealVariants)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-15%" }}
            className="md:col-span-7 md:col-start-6"
          >
            <p className="text-fs-body-lg text-ink-body max-w-prose">
              We are not just an agency; we are your dedicated innovation partner.
              We build for what businesses need this quarter and next year — not for a
              sci-fi vision of 2040. Premium comes from restraint and craft, not ornament.
            </p>

            <dl className="mt-s7 grid grid-cols-1 sm:grid-cols-3 gap-s5 border-t border-surface-line pt-s6">
              <div>
                <dt className="eyebrow mb-s2 flex items-center gap-s2">
                  <MapPin size={12} /> Office
                </dt>
                <dd className="text-fs-body text-ink-strong">
                  Office No. 1, Near Main Gate,<br />
                  Hari Ganga Society, Yerwada,<br />
                  Pune – 411006
                </dd>
              </div>
              <div>
                <dt className="eyebrow mb-s2 flex items-center gap-s2">
                  <Mail size={12} /> Email
                </dt>
                <dd className="text-fs-body text-ink-strong">
                  <a href="mailto:support@techupservices.com" className="border-b border-surface-line hover:border-ink-strong transition-colors duration-fast">
                    support@techupservices.com
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow mb-s2 flex items-center gap-s2">
                  <Phone size={12} /> Phone
                </dt>
                <dd className="text-fs-body text-ink-strong">
                  <a href="tel:+918237447244" className="border-b border-surface-line hover:border-ink-strong transition-colors duration-fast">
                    +91 82374 47244
                  </a>
                </dd>
              </div>
            </dl>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
