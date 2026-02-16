"use client";

import { motion } from "framer-motion";
import { navLinks, socialLinks } from "@/data";
import {
  Linkedin,
  Github,
  Twitter,
  Dribbble,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Linkedin,
  Github,
  Twitter,
  Dribbble,
};

export default function Footer() {
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
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-[#1B1B1B] border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left – Privacy & Terms */}
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <span className="text-white/20">|</span>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
          </div>

          {/* Center – Copyright */}
          <p className="text-sm text-gray-400 text-center">
            © Mosud Rahman. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
