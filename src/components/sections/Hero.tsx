"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { heroBadges } from "@/data";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
} as const;

export default function Hero() {
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-[#1B1B1B] overflow-hidden pt-20"
    >
      {/* Gradient glow behind */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#78F50B]/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6"
      >
        {/* Floating badges – top row */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          {heroBadges.map((badge, i) => (
            <motion.span
              key={badge.label}
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 rounded-full border border-[#78F50B]/30 bg-[#78F50B]/10 text-[#78F50B] text-xs sm:text-sm font-medium"
            >
              {badge.label}
            </motion.span>
          ))}
        </motion.div>

        {/* Main heading */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
        >
          Hello i&apos;m{" "}
          <span className="text-[#78F50B]">Mosud</span>
          <br />
          Product Designer
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="mt-6 text-gray-400 text-base sm:text-lg max-w-xl mx-auto"
        >
          Designing ideas into user-centered designs that deliver results.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            asChild
            size="lg"
            className="bg-[#78F50B] text-black font-semibold hover:bg-[#78F50B]/90 rounded-full px-8 text-base"
          >
            <a href="#contact" onClick={(e) => handleClick(e, "#contact")}>
              Download Resume
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-white/20 text-white hover:bg-white/5 hover:text-white rounded-full px-8 text-base"
          >
            <a href="#portfolio" onClick={(e) => handleClick(e, "#portfolio")}>
              Explore My Work
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
