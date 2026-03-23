"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { services } from "@/data/services";

export default function ProductTextOverlays({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  // We'll show 4 distinct text sections fading in and out across the 0 - 1 progress
  
  // Section 1: 0.05 to 0.25 (Peak at 0.15)
  const opacity1 = useTransform(scrollYProgress, [0.0, 0.05, 0.2, 0.25], [0, 1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0.0, 0.05, 0.2, 0.25], [50, 0, 0, -50]);

  // Section 2: 0.3 to 0.50 (Peak at 0.40)
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.3, 0.45, 0.5], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.25, 0.3, 0.45, 0.5], [50, 0, 0, -50]);

  // Section 3: 0.55 to 0.75 (Peak at 0.65)
  const opacity3 = useTransform(scrollYProgress, [0.5, 0.55, 0.7, 0.75], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.5, 0.55, 0.7, 0.75], [50, 0, 0, -50]);

  // Section 4: 0.8 to 1.0 (Peak at 0.95)
  const opacity4 = useTransform(scrollYProgress, [0.75, 0.8, 0.95, 1.0], [0, 1, 1, 0]);
  const y4 = useTransform(scrollYProgress, [0.75, 0.8, 0.95, 1.0], [50, 0, 0, -50]);

  const sections = services.slice(0, 4);

  return (
    <>
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-4 text-center text-white"
        style={{ opacity: opacity1, y: y1 }}
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">{sections[0]?.name}</h2>
        <p className="text-xl md:text-2xl max-w-2xl drop-shadow-md">{sections[0]?.description}</p>
      </motion.div>

      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-4 text-center text-white"
        style={{ opacity: opacity2, y: y2 }}
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">{sections[1]?.name}</h2>
        <p className="text-xl md:text-2xl max-w-2xl drop-shadow-md">{sections[1]?.description}</p>
      </motion.div>

      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-4 text-center text-white"
        style={{ opacity: opacity3, y: y3 }}
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">{sections[2]?.name}</h2>
        <p className="text-xl md:text-2xl max-w-2xl drop-shadow-md">{sections[2]?.description}</p>
      </motion.div>

      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-4 text-center text-white"
        style={{ opacity: opacity4, y: y4 }}
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">{sections[3]?.name}</h2>
        <p className="text-xl md:text-2xl max-w-2xl drop-shadow-md">{sections[3]?.description}</p>
      </motion.div>
    </>
  );
}
