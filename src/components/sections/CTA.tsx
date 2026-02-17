"use client";

import { motion } from "framer-motion";
import { socialLinks } from "@/data";
import Image from "next/image";

export default function CTA() {
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
    <section className="py-20 sm:py-28 bg-white dark:bg-[#1B1B1B] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* CTA Banner with background image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background Image */}
          <Image
            src="/image/contact.png"
            alt="CTA Background"
            fill
            className="object-cover"
            priority
          />

          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Content */}
          <div className="relative z-10 py-24 sm:py-32 md:py-40 px-6 sm:px-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Transform your Ideas into
                <br />
                <span className="text-gray-300">Meaningful Designs</span>
              </h2>

              <div className="mt-8">
                <motion.a
                  href="#contact"
                  onClick={(e) => handleClick(e, "#contact")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block bg-[#78F50B] text-black font-semibold rounded-full px-8 py-3.5 text-base hover:bg-[#78F50B]/90 transition-colors"
                >
                  Contact me
                </motion.a>
              </div>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
