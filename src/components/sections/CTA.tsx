"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

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
    <section className="py-20 sm:py-28 bg-[#1B1B1B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background with gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#78F50B]/10 via-[#1B1B1B] to-[#78F50B]/5" />
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#78F50B]/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-[#78F50B]/5 rounded-full blur-[80px]" />

          <div className="relative z-10 py-16 sm:py-24 px-6 sm:px-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                Transform your Ideas into
                <br />
                <span className="text-[#78F50B]">Meaningful Designs</span>
              </h2>

              <div className="mt-8">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#78F50B] text-black font-semibold hover:bg-[#78F50B]/90 rounded-full px-8 text-base"
                >
                  <a
                    href="#contact"
                    onClick={(e) => handleClick(e, "#contact")}
                  >
                    <Sparkles size={18} className="mr-2" />
                    Contact Us
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
