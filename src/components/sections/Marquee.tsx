"use client";

import { motion } from "framer-motion";
import { marqueeItems } from "@/data";

export default function Marquee() {
  // Triple the items for seamless loop
  const items = [...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden bg-white">
      {/* Header */}
      <div className="container mx-auto px-4 mb-12 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black">
          Crafting Designs for
          <br />
          Your Unique Vision
        </h2>
      </div>

      {/* X-shaped marquee container */}
      <div className="relative h-[400px] sm:h-[500px] md:h-[600px]">
        {/* First diagonal stripe - White background (top-left to bottom-right) */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute bg-white shadow-lg"
            style={{
              width: "200%",
              height: "120px",
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
                  <span className="text-black font-bold text-xl sm:text-2xl md:text-3xl">
                    {item.label}
                  </span>
                  <span className="text-black/30">•</span>
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
              height: "120px",
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
