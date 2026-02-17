"use client";

import { motion } from "framer-motion";
import { marqueeItems } from "@/data";

export default function Marquee() {
  // Triple the items for seamless loop
  const items = [...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <section className="relative py-10 sm:py-14 overflow-hidden bg-white dark:bg-[#1B1B1B] transition-colors duration-300">
     
      {/* X-shaped marquee container */}
      <div className="relative h-[400px] sm:h-[500px] md:h-[400px]">
        {/* First diagonal stripe - White background (top-left to bottom-right) */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute bg-white dark:bg-[#2a2a2a] shadow-lg"
            style={{
              width: "200%",
              height: "90px",
              top: "50%",
              left: "-50%",
              transform: "translateY(-50%) rotate(-8deg)",
            }}
          >
            <motion.div
              className="flex whitespace-nowrap items-center h-full"
              animate={{ x: ["0%", "-33.333%"] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              {items.map((item, i) => (
                <div key={i} className="flex items-center gap-3 mx-8">
                  <span className="text-black dark:text-white font-bold text-xl sm:text-2xl md:text-3xl transition-colors">
                    {item.label}
                  </span>
                  <span className="text-black/30 dark:text-white/30">•</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Second diagonal stripe - Green background (top-right to bottom-left) */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute bg-[#78F50B]"
            style={{
              width: "200%",
              height: "90px",
              top: "50%",
              left: "-50%",
              transform: "translateY(-50%) rotate(8deg)",
            }}
          >
            <motion.div
              className="flex whitespace-nowrap items-center h-full"
              animate={{ x: ["-33.333%", "0%"] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              {items.map((item, i) => (
                <div key={i} className="flex items-center gap-3 mx-8">
                  <span className="text-black font-bold text-xl sm:text-2xl md:text-3xl">
                    {item.label}
                  </span>
                  <span className="text-black/30">•</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
