"use client";

import { motion } from "framer-motion";
import { contactInfo, socialLinks } from "@/data";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Twitter,
  Dribbble,
  Send,
} from "lucide-react";

const contactIconMap: Record<string, React.ElementType> = {
  Mail,
  Phone,
  MapPin,
};

const socialIconMap: Record<string, React.ElementType> = {
  Linkedin,
  Github,
  Twitter,
  Dribbble,
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
              <h4 className="text-white font-semibold text-lg mb-2">
                My Social&apos;s
              </h4>
              <p className="text-gray-400 text-sm mb-4">
                Connect with me on social media for design inspiration, insights,
                and behind-the-scenes of my creative process.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = socialIconMap[social.icon] || Linkedin;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 rounded-full bg-[#78F50B] flex items-center justify-center text-black hover:bg-[#78F50B]/90 transition-colors"
                      aria-label={social.label}
                    >
                      <Icon size={18} />
                    </motion.a>
                  );
                })}
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
