"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/data";
import { Quote } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
} as const;

export default function Testimonials() {
  return (
    <section className="py-20 sm:py-28 bg-white dark:bg-[#0e0d0d] transition-colors duration-300">
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
            What Clients Say
          </h2>
        </motion.div>

        {/* Testimonial Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 hover:border-[#78F50B]/20 transition-all duration-300 shadow-sm dark:shadow-none"
            >
              {/* Quote icon */}
              <Quote
                size={24}
                className="text-[#78F50B]/40 mb-4 rotate-180"
              />

              {/* Quote text */}
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-6 transition-colors">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#78F50B]/30 to-[#78F50B]/10 flex items-center justify-center">
                  <span className="text-[#78F50B] text-sm font-bold">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-black dark:text-white font-medium text-sm transition-colors">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-500 text-xs">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
