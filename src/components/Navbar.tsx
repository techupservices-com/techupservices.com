"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    
    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/80 dark:bg-[#000212]/85 backdrop-blur-xl border-b border-gray-200 dark:border-white/5 shadow-sm" 
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="relative z-10 flex items-center tracking-tight">
          <span className="font-black text-2xl bg-clip-text text-transparent bg-gradient-to-br from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-500 dark:to-purple-500">
            TechUp
          </span>
          <span className="font-medium text-2xl text-slate-800 dark:text-gray-100 transition-colors ml-[1px]">
            Services
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#about" className="text-[15px] font-semibold tracking-wide text-slate-600 hover:text-cyan-600 dark:text-gray-300 dark:hover:text-cyan-400 transition-colors">About Us</Link>
          <Link href="#services" className="text-[15px] font-semibold tracking-wide text-slate-600 hover:text-cyan-600 dark:text-gray-300 dark:hover:text-cyan-400 transition-colors">Services</Link>
          <Link href="#contact" className="text-[15px] font-semibold tracking-wide text-slate-600 hover:text-cyan-600 dark:text-gray-300 dark:hover:text-cyan-400 transition-colors">Contact Us</Link>
          <Link href="#services" className="relative block px-6 py-2.5 rounded-full bg-slate-900 text-white dark:bg-white/10 hover:dark:bg-white/20 dark:text-white text-[15px] font-bold tracking-wide transition-all shadow-md group border border-transparent dark:border-white/10 dark:hover:border-cyan-400">
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 dark:group-hover:opacity-20 transition-opacity rounded-full" />
          </Link>

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-gray-300 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle & Theme */}
        <div className="md:hidden flex items-center gap-4">
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full text-slate-700 dark:text-gray-300"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}
          <button 
            className="relative z-10 p-2 text-slate-900 dark:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div 
        initial={false}
        animate={mobileMenuOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        className="md:hidden overflow-hidden bg-white/95 dark:bg-[#000212]/95 backdrop-blur-xl border-b border-gray-200 dark:border-white/5"
      >
        <div className="px-6 py-8 flex flex-col gap-6 items-center">
          <Link onClick={() => setMobileMenuOpen(false)} href="#about" className="text-lg font-medium text-slate-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-white">About Us</Link>
          <Link onClick={() => setMobileMenuOpen(false)} href="#services" className="text-lg font-medium text-slate-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-white">Services</Link>
          <Link onClick={() => setMobileMenuOpen(false)} href="#contact" className="text-lg font-medium text-slate-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-white">Contact Us</Link>
          <Link onClick={() => setMobileMenuOpen(false)} href="#services" className="w-full text-center py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold">
            Get Started
          </Link>
        </div>
      </motion.div>
    </motion.nav>
  );
}
