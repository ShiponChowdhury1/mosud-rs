"use client";

import { motion } from "framer-motion";
import { faqItems } from "@/data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <section id="faq" className="py-20 sm:py-28 bg-gray-50 dark:bg-[#111111] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white">
            Clear Answers to your Questions, Ensuring a
          </h2>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#78F50B] mt-2">
            Smooth Design Journey
          </h2>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={item.id}
                value={`item-${item.id}`}
                className="border border-gray-200 dark:border-white/10 rounded-xl px-5 sm:px-6 bg-white dark:bg-white/[0.02] hover:border-gray-300 dark:hover:border-white/20 transition-colors data-[state=open]:border-[#78F50B]/30 shadow-sm dark:shadow-none"
              >
                <AccordionTrigger className="text-black dark:text-white hover:no-underline text-left text-sm sm:text-base py-5 transition-colors">
                  <span className="flex items-center gap-3">
                    <span className="text-[#78F50B] font-mono text-sm">
                      {String(index + 1).padStart(2, "0")}.
                    </span>
                    {item.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed pb-5 pl-9 transition-colors">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
