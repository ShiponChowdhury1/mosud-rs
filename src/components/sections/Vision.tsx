"use client";

import { motion } from "framer-motion";
import { visionTabs } from "@/data";
import { ArrowUpRight, Scissors, PenTool, Gem } from "lucide-react";

const cardIcons = [Scissors, PenTool, Gem];

export default function Vision() {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-black leading-tight">
            Crafting Designs for
            <br />
            Your Unique Vision
          </h2>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-7 py-3.5 bg-black text-white rounded-full font-medium text-sm shrink-0 hover:bg-black/90 transition-colors"
          >
            Work With Me
          </motion.a>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visionTabs.map((tab, index) => {
            const isHighlighted = index === 1;
            const Icon = cardIcons[index];

            return (
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`relative flex flex-col justify-between rounded-2xl p-7 sm:p-8 min-h-[340px] ${
                  isHighlighted
                    ? "bg-[#78F50B]"
                    : "bg-[#F5F5F5]"
                }`}
              >
                {/* Icon */}
                <div>
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center mb-8 ${
                      isHighlighted
                        ? "bg-white/20"
                        : "bg-white"
                    }`}
                  >
                    <Icon
                      size={26}
                      className="text-black"
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-black mb-6">
                    {tab.label}
                  </h3>
                </div>

                {/* Description + Arrow */}
                <div className="flex items-end justify-between gap-4">
                  <p className="text-sm text-black/70 leading-relaxed max-w-[280px]">
                    {tab.description}
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer ${
                      isHighlighted
                        ? "bg-white text-black"
                        : "bg-black text-white"
                    }`}
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
