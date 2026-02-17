"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect/dist/core";
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
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
} as const;

// Badge positions: scattered around the heading
const badgePositions = [
  { top: "-10%", left: "-7%" }, // UI/UX Designer – top left
  { top: "-8%", right: "-9%" }, // Website Design – top right
  { top: "63%", left: "-9%" }, // SaaS Design – bottom left
  { top: "60%", right: "-11%" }, // Product Design – bottom right
];

export default function Hero() {
  const typewriterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typewriterRef.current) {
      new Typewriter(typewriterRef.current, {
        strings: [
          "Hello i'm <span style='color: #78F50B'>Mosud</span>",
          "<span style='color: #78F50B'>UX/UI</span> Designer"
        ],
        autoStart: true,
        loop: true,
        delay: 150,
        deleteSpeed: 60,
        cursor: "|",
      });
    }
  }, []);

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6"
      >
        {/* Floating badges – scattered around */}
        <div className="hidden md:block">
          {heroBadges.map((badge, i) => (
            <motion.span
              key={badge.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.15 }}
              whileHover={{ scale: 1.08 }}
              className="absolute px-5 py-2.5 rounded-full border border-[#78F50B]/40 text-[#78F50B] text-sm font-medium backdrop-blur-sm bg-white/80 dark:bg-transparent"
              style={badgePositions[i]}
            >
              {badge.label}
            </motion.span>
          ))}
        </div>

        {/* Mobile badges */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-3 mb-8 md:hidden"
        >
          {heroBadges.map((badge) => (
            <span
              key={badge.label}
              className="px-4 py-2 rounded-full border border-[#78F50B]/30 text-[#78F50B] text-xs font-medium bg-white/80 dark:bg-transparent"
            >
              {badge.label}
            </span>
          ))}
        </motion.div>

        {/* Main heading */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-black dark:text-white leading-[1.1] transition-colors"
        >
          <span ref={typewriterRef} className="inline-block min-h-[1.2em] text-left w-full" />
          <br />
          <span className="text-[#78F50B] dark:text-[#c9c5c5]">Product Designer</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="mt-6 text-gray-500 dark:text-gray-400 text-base sm:text-lg max-w-xl mx-auto transition-colors"
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
            <a href="/Mosud_Rahman_Saadman_Resume.pdf" download="Mosud_Rahman_Saadman_Resume.pdf">
              Download Resume
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-black/20 dark:border-white/20 text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-full px-8 text-base transition-colors"
          >
            <a
              href="#portfolio"
              onClick={(e) => handleClick(e, "#portfolio")}
            >
              Explore My Work
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
