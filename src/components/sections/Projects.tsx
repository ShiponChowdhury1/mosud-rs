"use client";

import { motion } from "framer-motion";
import { projects } from "@/data";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
} as const;

export default function Projects() {
  return (
    <section id="portfolio" className="py-20 sm:py-28 bg-white dark:bg-[#1B1B1B] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white transition-colors">
            Discover My Projects and
            <br />
            Creative Approach
          </h2>
          <motion.a
            href="#"
            whileHover={{ x: 4 }}
            className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white text-sm transition-colors shrink-0"
          >
            View All <ArrowRight size={16} />
          </motion.a>
        </motion.div>

        {/* Project Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group rounded-2xl overflow-hidden bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 hover:border-[#78F50B]/30 transition-all duration-300 shadow-sm dark:shadow-none"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#78F50B]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                <span className="inline-block px-3 py-1 bg-[#78F50B]/10 text-[#78F50B] text-xs font-medium rounded-full mb-3">
                  {project.category}
                </span>
                <h3 className="text-black dark:text-white font-semibold text-lg sm:text-xl mb-2 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed transition-colors">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Browse All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <motion.a
            href="#"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-black/20 dark:border-white/20 text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-sm font-medium"
          >
            Browse All Projects
            <ArrowRight size={16} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
