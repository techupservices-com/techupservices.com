"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Service } from "@/data/services";
import { CheckCircle2 } from "lucide-react";

export default function ServiceSection({ service, index }: { service: Service; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.8, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [100, 0, 0, -100]);

  const isEven = index % 2 === 0;

  return (
    <div 
      id={service.id} 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center py-24 overflow-hidden"
    >
      <motion.div 
        style={{ opacity, scale, y }}
        className="max-w-7xl mx-auto px-6 w-full relative z-10"
      >
        <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16 lg:gap-24`}>
          
          {/* Text Content */}
          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <div 
                className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide uppercase shadow-lg shadow-black/20"
                style={{ background: service.gradient, color: "#fff" }}
              >
                {service.name}
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
                {service.section1.subtitle}
              </h2>
            </div>
            
            <p className="text-xl text-gray-400 font-light leading-relaxed">
              {service.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {service.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-300">
                  <CheckCircle2 className="w-5 h-5" style={{ color: service.themeColor }} />
                  <span className="font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <div className="pt-8">
              <button 
                className="group relative px-8 py-4 rounded-full font-bold text-white overflow-hidden transition-all hover:scale-105"
                style={{ 
                  boxShadow: `0 0 20px ${service.themeColor}40`,
                  background: 'rgba(255,255,255,0.03)',
                  border: `1px solid ${service.themeColor}50`
                }}
              >
                <span className="relative z-10">Discover {service.name}</span>
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  style={{ background: service.gradient }} 
                />
              </button>
            </div>
          </div>

          {/* Visual/Image Content */}
          <div className="flex-1 w-full right-0">
             <div className="relative aspect-square md:aspect-[4/3] w-full rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a]">
                {/* Simulated Glassmorphic Container for the Image */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent z-10 pointer-events-none" />
                <div 
                  className="absolute inset-0 opacity-20 blur-3xl z-0"
                  style={{ background: service.gradient }}
                />
                
                {/* Fallback pattern while images are loading/missing */}
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent flex items-center justify-center">
                  <div className="w-1/2 h-1/2 rounded-full blur-[100px]" style={{ backgroundColor: service.themeColor }} />
                </div>
                
                {/* Actual Image Placeholder text */}
                <div className="relative z-20 w-full h-full flex flex-col items-center justify-center p-8 text-center gap-4">
                  <h3 className="text-2xl font-bold text-white">{service.detailsSection.title}</h3>
                  <p className="text-gray-400 text-sm max-w-sm">{service.detailsSection.description}</p>
                </div>
             </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
