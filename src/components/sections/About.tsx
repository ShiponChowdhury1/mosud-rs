"use client";

import { motion } from "framer-motion";
import { experienceCards, tools } from "@/data";
import { Layers, Shield, Heart, Zap } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Layers,
  Shield,
  Heart,
  Zap,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
} as const;

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-28 bg-[#1B1B1B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left – Text */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight"
            >
              Designing experiences
              <br />
              that matter
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="mt-6 text-gray-400 text-base sm:text-lg leading-relaxed"
            >
              I&apos;m a passionate UI/UX designer based in Bangladesh with over 3
              years of experience creating digital products that users love. My
              approach combines aesthetics with functionality.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="mt-4 text-gray-400 text-base sm:text-lg leading-relaxed"
            >
              From startups to established enterprises, I&apos;ve helped businesses
              strengthen their digital presence through thoughtful design. I believe
              great design is invisible; it just works.
            </motion.p>

            {/* Tools */}
            <motion.div variants={itemVariants} className="mt-8">
              <p className="text-sm text-gray-500 uppercase tracking-wider mb-3">
                Tools I use
              </p>
              <div className="flex flex-wrap gap-3">
                {tools.map((tool) => (
                  <span
                    key={tool.name}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300"
                  >
                    {tool.name}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right – Experience Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {experienceCards.map((card) => {
              const Icon = iconMap[card.icon] || Layers;
              return (
                <motion.div
                  key={card.title}
                  variants={itemVariants}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#78F50B]/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#78F50B]/10 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-[#78F50B]" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">
                    {card.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
