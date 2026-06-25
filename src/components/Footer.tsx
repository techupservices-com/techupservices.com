"use client";

/**
 * Footer — slim. Wordmark, two link columns, fine print. No newsletter,
 * no "feature soup" (design.md §12), no social-network bento mosaic.
 */

import Link from "next/link";
import { Instagram, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  const year = 2026; // Date.now() forbidden in some agent contexts — static is fine here

  return (
    <footer className="command-section border-t border-surface-line">
      <div className="signal-grid" aria-hidden="true" />
      <div className="container-page relative z-10 py-s8">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-s6">
          {/* Wordmark + tagline */}
          <div className="col-span-2 md:col-span-5">
            <Link
              href="/"
              className="inline-flex items-baseline gap-0 font-display font-bold text-fs-h4 text-ink-strong"
              aria-label="TechUpServices home"
            >
              <span>Tech</span>
              <span className="text-brand-gradient">Up</span>
              <span className="font-medium">Services</span>
            </Link>
             <p className="mt-s4 text-fs-body text-ink-body max-w-sm">
               A small studio of senior practitioners building bespoke AI automation
               and digital systems. Pune, India — shipping worldwide.
             </p>
          </div>

          {/* Sitemap */}
          <nav className="md:col-span-3" aria-label="Sitemap">
            <div className="eyebrow mb-s4">Site</div>
            <ul className="space-y-s3 text-fs-body">
              <li><a href="#services" className="text-ink-body hover:text-ink-strong transition-colors duration-fast">Services</a></li>
              <li><a href="#proof" className="text-ink-body hover:text-ink-strong transition-colors duration-fast">Proof</a></li>
              <li><a href="#who" className="text-ink-body hover:text-ink-strong transition-colors duration-fast">Who</a></li>
              <li><a href="#talk" className="text-ink-body hover:text-ink-strong transition-colors duration-fast">Talk</a></li>
            </ul>
          </nav>

          {/* Contact + socials */}
          <div className="md:col-span-4">
            <div className="eyebrow mb-s4">Reach us</div>
            <ul className="space-y-s3 text-fs-body text-ink-body">
              <li>
                <a href="mailto:support@techupservices.com" className="hover:text-ink-strong transition-colors duration-fast">
                  support@techupservices.com
                </a>
              </li>
              <li>
                <a href="tel:+918237447244" className="hover:text-ink-strong transition-colors duration-fast">
                  +91 82374 47244
                </a>
              </li>
              <li>Yerwada, Pune – 411006</li>
            </ul>

            <ul className="mt-s5 flex items-center gap-s3" aria-label="Social media">
              <li>
                <a
                  href="https://instagram.com/techupservices"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-[40px] h-[40px] rounded-md border border-surface-line text-ink-body hover:text-ink-strong hover:border-ink-strong transition-colors duration-fast"
                  aria-label="Instagram"
                >
                  <Instagram size={16} />
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/company/techupservices"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-[40px] h-[40px] rounded-md border border-surface-line text-ink-body hover:text-ink-strong hover:border-ink-strong transition-colors duration-fast"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={16} />
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/techupservices"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-[40px] h-[40px] rounded-md border border-surface-line text-ink-body hover:text-ink-strong hover:border-ink-strong transition-colors duration-fast"
                  aria-label="Twitter"
                >
                  <Twitter size={16} />
                </a>
              </li>
            </ul>
          </div>
        </div>

         <div className="mt-s8 pt-s5 border-t border-surface-line flex flex-wrap items-center justify-between gap-s3 text-fs-caption text-ink-muted">
          <span>© {year} TechUpServices. All rights reserved.</span>
          <span>Built with discipline, in Pune.</span>
        </div>
      </div>
    </footer>
  );
}
