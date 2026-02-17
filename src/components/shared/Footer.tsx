"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative border-t border-gray-200 dark:border-white/10 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left – Privacy & Terms */}
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <a
              href="#"
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <span className="text-black/20 dark:text-white/20">|</span>
            <a
              href="#"
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              Terms
            </a>
          </div>

          {/* Center – Copyright */}
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center transition-colors">
            © {new Date().getFullYear()} Mosud Rahman. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
