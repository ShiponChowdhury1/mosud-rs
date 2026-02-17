"use client";

import { motion } from "framer-motion";
import { services } from "@/data";
import {
  Monitor,
  Smartphone,
  LayoutDashboard,
  Search,
  Box,
  Gamepad2,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Monitor,
  Smartphone,
  LayoutDashboard,
  Search,
  Box,
  Gamepad2,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
} as const;

export default function Services() {
  return (
    <section id="services" className="py-20 sm:py-28 bg-gray-50 dark:bg-[#111111] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white transition-colors">
            What I Can Do For You
          </h2>
        </motion.div>

        {/* Service Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Monitor;
            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group p-6 sm:p-8 rounded-2xl bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 hover:border-[#78F50B]/30 transition-all duration-300 shadow-sm dark:shadow-none"
              >
                <div className="w-12 h-12 rounded-xl bg-black/5 dark:bg-white/5 group-hover:bg-[#78F50B]/10 flex items-center justify-center mb-5 transition-colors duration-300">
                  <Icon
                    size={24}
                    className="text-gray-500 dark:text-gray-400 group-hover:text-[#78F50B] transition-colors duration-300"
                  />
                </div>
                <h3 className="text-black dark:text-white font-semibold text-lg sm:text-xl mb-3 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed transition-colors">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
