"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { visionTabs } from "@/data";
import { ArrowUpRight, Scissors, PenTool, Gem } from "lucide-react";

const cardIcons = [Scissors, PenTool, Gem];

export default function Vision() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const cardBg = mounted
    ? resolvedTheme === "dark"
      ? "#2a2a2a"
      : "#F5F5F5"
    : "#2a2a2a";

  return (
    <section className="py-20 sm:py-28 bg-white dark:bg-[#1B1B1B] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-black dark:text-white leading-tight transition-colors">
            Crafting Designs for
            <br />
            Your Unique Vision
          </h2>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-7 py-3.5 bg-black dark:bg-[#78F50B] text-white dark:text-black rounded-full font-medium text-sm shrink-0 hover:bg-black/90 dark:hover:bg-white dark:hover:text-black transition-colors duration-300"
          >
            Work With Me
          </motion.a>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visionTabs.map((tab, index) => {
            const Icon = cardIcons[index];

            return (
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                animate={{ backgroundColor: cardBg }}
                whileHover={{
                  y: -6,
                  backgroundColor: "#78F50B",
                  transition: { duration: 0.4, ease: "easeInOut" },
                }}
                className="group relative flex flex-col justify-between rounded-2xl p-7 sm:p-8 min-h-[340px]"
                style={{ transition: "background-color 0.4s ease-in-out" }}
              >
                {/* Icon */}
                <div>
                  <div className="w-14 h-14 rounded-xl bg-white dark:bg-white/10 group-hover:bg-white/25 flex items-center justify-center mb-8 transition-colors duration-400">
                    <Icon
                      size={26}
                      className="text-black dark:text-white group-hover:text-black transition-colors duration-400"
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-black dark:text-white group-hover:text-black mb-6 transition-colors duration-400">
                    {tab.label}
                  </h3>
                </div>

                {/* Description + Arrow */}
                <div className="flex items-end justify-between gap-4">
                  <p className="text-sm leading-relaxed max-w-[280px] text-black/60 dark:text-white group-hover:text-black/70 transition-colors duration-400">
                    {tab.description}
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="shrink-0 w-12 h-12 rounded-full bg-black dark:bg-[#78F50B] text-white dark:text-black group-hover:bg-white dark:group-hover:bg-white group-hover:text-black flex items-center justify-center cursor-pointer transition-colors duration-400"
                  >
                    <ArrowUpRight size={20} />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
