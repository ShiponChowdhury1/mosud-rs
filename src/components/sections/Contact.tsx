"use client";

import { motion } from "framer-motion";
import { contactInfo, socialLinks } from "@/data";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Send,
} from "lucide-react";

const contactIconMap: Record<string, React.ElementType> = {
  Mail,
  Phone,
  MapPin,
};

export default function Contact() {
  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            Let&apos;s Work Together and
            <br />
            <span className="text-[#78F50B]">Create Something Extraordinary!</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
            Have a project in mind? I&apos;d love to hear about it. Send me a
            message and let&apos;s discuss how we can work together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left – Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Contact details */}
            {contactInfo.map((info) => {
              const Icon = contactIconMap[info.icon] || Mail;
              return (
                <div key={info.label} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#78F50B]/10 flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-[#78F50B]" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider">
                      {info.label}
                    </p>
                    <p className="text-white text-sm sm:text-base">
                      {info.value}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* My Social's */}
            <div className="pt-6">
              <h4 className="text-white font-semibold text-lg mb-4">
                My Social&apos;s
              </h4>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ y: -4, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative w-12 h-12 rounded-lg bg-[#78F50B] p-2 flex items-center justify-center"
                    aria-label={social.label}
                  >
                    <Image
                      src={`/svg/${social.icon}.svg`}
                      alt={social.label}
                      width={32}
                      height={32}
                      className="w-full h-full object-contain"
                    />
                  </motion.a>
                ))}
              </div>
            </div>

          </motion.div>

          {/* Right – Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-gray-400 text-sm mb-2 block">
                  Name*
                </label>
                <Input
                  placeholder="Your Name"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl h-12 focus:border-[#78F50B]/50 focus:ring-[#78F50B]/20"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-2 block">
                  Email*
                </label>
                <Input
                  type="email"
                  placeholder="Your Email"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl h-12 focus:border-[#78F50B]/50 focus:ring-[#78F50B]/20"
                />
              </div>
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-2 block">
                Subject
              </label>
              <Input
                placeholder="Project Subject"
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl h-12 focus:border-[#78F50B]/50 focus:ring-[#78F50B]/20"
              />
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-2 block">
                Message
              </label>
              <Textarea
                placeholder="Tell me about your project..."
                rows={5}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl resize-none focus:border-[#78F50B]/50 focus:ring-[#78F50B]/20"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full bg-[#78F50B] text-black font-semibold hover:bg-[#78F50B]/90 rounded-xl h-12 text-base"
            >
              <Send size={18} className="mr-2" />
              Send Message
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
