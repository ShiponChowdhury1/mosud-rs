"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { contactInfo, socialLinks } from "@/data";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Loader2,
} from "lucide-react";

const contactIconMap: Record<string, React.ElementType> = {
  Mail,
  Phone,
  MapPin,
};

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = formRef.current;
    if (!form) return;

    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const title = (form.elements.namedItem("title") as HTMLInputElement).value.trim();
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim();

    if (!name || !email || !message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_SERVICE_ID!,
        process.env.NEXT_PUBLIC_TEMPLATE_ID!,
        { name, email, title, message },
        { publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY! }
      );

      toast.success("Message sent successfully! I will get back to you soon.");
      form.reset();
    } catch {
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section id="contact" className="relative py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white leading-tight transition-colors">
            Let&apos;s Work Together and
            <br />
            <span className="text-[#78F50B]">Create Something Extraordinary!</span>
          </h2>
          <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-sm sm:text-base transition-colors">
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
                    <p className="text-gray-400 dark:text-gray-500 text-xs uppercase tracking-wider">
                      {info.label}
                    </p>
                    <p className="text-black dark:text-white text-sm sm:text-base transition-colors">
                      {info.value}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* My Social's */}
            <div className="pt-6">
              <h4 className="text-black dark:text-white font-semibold text-lg mb-4 transition-colors">
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
            ref={formRef}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-5"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-gray-500 dark:text-gray-400 text-sm mb-2 block transition-colors">
                  Name*
                </label>
                <Input
                  name="name"
                  placeholder="Your Name"
                  required
                  className="bg-gray-50 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-xl h-12 outline-none focus:border-[#78F50B] focus:ring-0 transition-colors"
                />
              </div>
              <div>
                <label className="text-gray-500 dark:text-gray-400 text-sm mb-2 block transition-colors">
                  Email*
                </label>
                <Input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  required
                  className="bg-gray-50 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-xl h-12 outline-none focus:border-[#78F50B] focus:ring-0 transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="text-gray-500 dark:text-gray-400 text-sm mb-2 block transition-colors">
                Subject
              </label>
              <Input
                name="title"
                placeholder="Project Subject"
                className="bg-gray-50 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-xl h-12 outline-none focus:border-[#78F50B] focus:ring-0 transition-colors"
              />
            </div>
            <div>
              <label className="text-gray-500 dark:text-gray-400 text-sm mb-2 block transition-colors">
                Message*
              </label>
              <Textarea
                name="message"
                placeholder="Tell me about your project..."
                required
                className="bg-gray-50 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-xl resize-none outline-none focus:border-[#78F50B] focus:ring-0 transition-colors h-[146px] min-h-[146px]"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="w-full bg-[#78F50B] text-black font-semibold hover:bg-[#78F50B]/90 rounded-xl h-12 text-base disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} className="mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
