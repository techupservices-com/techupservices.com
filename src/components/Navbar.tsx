"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { DUR, EASE } from "@/lib/motion";

const NAV_LINKS = [
  { href: "#services",  label: "Services" },
  { href: "#proof",     label: "Proof" },
  { href: "#who",       label: "Who" },
  { href: "#talk",      label: "Talk" },
] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when off-canvas open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-colors duration-base ease-standard ${
          scrolled
            ? "border-b border-surface-line bg-surface-overlay"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="container-page flex items-center justify-between h-[64px]">
          {/* Wordmark — gradient on "Up" only, per brand.md gradient discipline */}
          <Link
            href="/"
            className="inline-flex items-baseline gap-0 text-ink-strong font-display font-bold text-fs-h4 tracking-tight"
            aria-label="TechUpServices home"
          >
            <span>Tech</span>
            <span className="text-brand-gradient">Up</span>
            <span className="font-medium">Services</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-s6" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-fs-body text-ink-body hover:text-ink-strong transition-colors duration-fast ease-standard"
              >
                {l.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="inline-flex items-center justify-center w-[44px] h-[44px] rounded-md text-ink-body hover:text-ink-strong hover:bg-surface-raised transition-colors duration-fast ease-standard"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {mounted && (isDark ? <Sun size={18} /> : <Moon size={18} />)}
            </button>
            <a href="#talk" className="btn-primary">
              Schedule a discovery call
            </a>
          </nav>

          {/* Mobile triggers */}
          <div className="md:hidden flex items-center gap-s2">
            <button
              type="button"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="inline-flex items-center justify-center w-[44px] h-[44px] rounded-md text-ink-body"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {mounted && (isDark ? <Sun size={18} /> : <Moon size={18} />)}
            </button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex items-center justify-center w-[44px] h-[44px] rounded-md text-ink-strong"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Off-canvas mobile sheet — slides from right, not a centered dropdown */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-ink-strong/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: DUR.base, ease: EASE.standard }}
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.aside
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="fixed top-0 right-0 bottom-0 z-50 w-[88vw] max-w-sm bg-surface-base border-l border-surface-line p-gutter flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: DUR.slow, ease: EASE.emphasized }}
            >
              <div className="flex items-center justify-between h-[64px] -mt-s2">
                <span className="font-display font-bold text-fs-h4 text-ink-strong">
                  <span>Tech</span>
                  <span className="text-brand-gradient">Up</span>
                  <span className="font-medium">Services</span>
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="w-[44px] h-[44px] inline-flex items-center justify-center rounded-md text-ink-strong"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>
              <nav className="mt-s6 flex flex-col gap-s4" aria-label="Mobile">
                {NAV_LINKS.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="text-fs-h3 font-display font-bold text-ink-strong"
                  >
                    {l.label}
                  </a>
                ))}
              </nav>
              <div className="mt-auto">
                <a
                  href="#talk"
                  onClick={() => setOpen(false)}
                  className="btn-primary w-full"
                >
                  Schedule a discovery call
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
