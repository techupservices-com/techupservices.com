"use client";

import { motion } from "framer-motion";
import { CheckCircle2, TrendingUp, Users, Zap } from "lucide-react";

export default function AboutSection() {
  const stats = [
    { label: "Client Satisfaction", value: "99%", icon: Users, color: "text-blue-500" },
    { label: "Successful Projects", value: "250+", icon: CheckCircle2, color: "text-cyan-500" },
    { label: "Automation ROI", value: "3x", icon: TrendingUp, color: "text-purple-500" },
    { label: "Speed Increase", value: "40%", icon: Zap, color: "text-orange-500" },
  ];

  return (
    <section id="about" className="relative py-32 bg-transparent transition-colors duration-500">
      {/* Elegant Background Accents */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/40 dark:bg-blue-900/10 blur-[150px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3 transition-colors duration-500" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left: Text Content */}
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold uppercase bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 mb-6 text-blue-600 dark:text-blue-400 w-max"
            >
              Who We Are
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-tight transition-colors duration-500"
            >
              Architects of the <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400">
                Digital Future.
              </span>
            </motion.h2>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-6 text-lg text-slate-600 dark:text-slate-300 leading-relaxed transition-colors duration-500"
            >
              <p>
                TechUpServices was founded on a singular vision: to bridge the gap between complex technological capabilities and profound business outcomes. We are not just an agency; we are your dedicated innovation partner.
              </p>
              <p>
                From deploying cutting-edge AI automation that reclaims thousands of operational hours, to crafting masterfully engineered web and mobile applications, we build digital infrastructure designed to scale your enterprise aggressively and elegantly.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-10"
            >
              <button className="px-8 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:opacity-90 transition-opacity shadow-xl shadow-slate-200 dark:shadow-none">
                Discover Our Story
              </button>
            </motion.div>
          </div>

          {/* Right: Rich UI/Stats */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/5 dark:to-cyan-500/5 rounded-[3rem] transform rotate-3 scale-105 -z-10 transition-colors duration-500" />
            <div className="absolute inset-0 bg-gradient-to-tl from-cyan-500/10 to-blue-500/10 dark:from-cyan-500/5 dark:to-purple-500/5 rounded-[3rem] transform -rotate-3 scale-105 -z-10 transition-colors duration-500" />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white/80 dark:bg-[#12131A]/80 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-10 lg:p-12 shadow-2xl transition-colors duration-500"
            >
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-10 text-center transition-colors">By the Numbers</h3>
              
              <div className="grid grid-cols-2 gap-8">
                {stats.map((stat, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                    className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 dark:bg-[#1A1C23] border border-slate-100 dark:border-white/5 hover:-translate-y-1 transition-transform"
                  >
                    <div className={`p-4 rounded-full bg-white dark:bg-[#252830] shadow-sm mb-4 ${stat.color}`}>
                      <stat.icon size={28} />
                    </div>
                    <div className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-2 transition-colors">
                      {stat.value}
                    </div>
                    <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
