"use client";

import { motion } from "framer-motion";
import { services } from "@/data/services";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";

export default function ServicesGrid() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("resize", handleScroll);
    return () => window.removeEventListener("resize", handleScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = scrollContainerRef.current.clientWidth;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth"
    });
  };
  return (
    <section id="services" className="relative py-32 bg-transparent transition-colors duration-500">
      {/* Background visual effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-cyan-200/40 dark:bg-cyan-900/10 blur-[120px] rounded-full pointer-events-none transition-colors duration-500" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide uppercase bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 mb-6 text-cyan-600 dark:text-cyan-400 transition-colors shadow-sm dark:shadow-none"
          >
            Digital Excellence
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 transition-colors duration-500 tracking-tight"
          >
            Capabilities & Offerings
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors duration-500 leading-relaxed"
          >
            A diverse suite of premium services engineered precisely to transform businesses from analog traditionalists into digital leaders.
          </motion.p>
        </div>

        {/* Mobile Horizontal Scroll Container -> Desktop Grid */}
        <div className="relative">
          {/* Mobile Navigation Arrows */}
          <div className="md:hidden">
            {canScrollLeft && (
              <button 
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/90 dark:bg-[#111218]/90 backdrop-blur-sm shadow-xl border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white"
                aria-label="Scroll left"
              >
                <ChevronLeft size={24} />
              </button>
            )}
            {canScrollRight && (
              <button 
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/90 dark:bg-[#111218]/90 backdrop-blur-sm shadow-xl border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white"
                aria-label="Scroll right"
              >
                <ChevronRight size={24} />
              </button>
            )}
          </div>

          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto pb-10 gap-6 snap-x snap-mandatory scroll-smooth -mx-6 px-6 md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:pb-0 md:mx-0 md:px-0 md:gap-10 md:snap-none hide-scrollbar"
          >
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1, duration: 0.7, ease: "easeOut" }}
                className="w-full shrink-0 snap-center md:w-auto group flex flex-col bg-white dark:bg-[#111218] rounded-[2rem] overflow-hidden border border-slate-200 dark:border-white/5 hover:border-cyan-400 dark:hover:border-cyan-500/50 transition-all duration-500 shadow-xl shadow-slate-200/50 dark:shadow-2xl"
              >
              {/* Image Section - Large & Clean */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-black">
                <Image
                  src={`/images/services/${service.id}.png`}
                  alt={`${service.name} illustration`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
                />
                
                {/* Floating Tag */}
                <div className="absolute top-5 left-5 z-20">
                  <div className="px-4 py-1.5 rounded-full text-[11px] font-bold text-slate-900 bg-white shadow-lg tracking-wider uppercase backdrop-blur-md">
                    {service.name.split(' ')[0]} {/* Takes primary word */}
                  </div>
                </div>

                {/* Subtle gradient overlay to ensure text contrast if image is too bright */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Text Section - Elevated Hierarchy */}
              <div className="relative flex flex-col flex-1 p-8 bg-white dark:bg-transparent transition-colors duration-500">
                
                {/* Accent line */}
                <div className="w-12 h-1 rounded-full mb-6 transition-colors duration-300 group-hover:w-16" style={{ backgroundColor: service.themeColor }} />

                <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors tracking-tight">
                  {service.name}
                </h3>
                
                <p className="text-slate-600 dark:text-slate-400 text-[15px] leading-relaxed mb-8 flex-1 transition-colors">
                  {service.detailsSection.description}
                </p>
                
                {/* Features list with distinct visual checks */}
                <ul className="flex flex-col gap-3 mb-8">
                  {service.features.slice(0, 3).map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 bg-cyan-500 opacity-70" />
                      <span className="flex-1 opacity-90">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className="mt-auto group/btn flex items-center justify-between w-full p-4 rounded-xl bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/5 transition-all text-sm font-bold text-slate-900 dark:text-white">
                  <span>Learn More</span>
                  <ArrowRight size={18} className="transform group-hover/btn:translate-x-1 group-hover/btn:text-cyan-500 transition-all" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
