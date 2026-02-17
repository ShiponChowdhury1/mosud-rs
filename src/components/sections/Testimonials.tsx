"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";

interface TestimonialItem {
  _id?: string;
  id?: number;
  name: string;
  role: string;
  avatar: string;
  quote: string;
}

export default function Testimonials({
  testimonials,
}: {
  testimonials?: TestimonialItem[];
}) {
  const testimonialList = testimonials || [];
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);

  const handlePrev = useCallback(() => swiperRef?.slidePrev(), [swiperRef]);
  const handleNext = useCallback(() => swiperRef?.slideNext(), [swiperRef]);

  if (testimonialList.length === 0) return null;

  return (
    <section className="py-20 sm:py-28 bg-white dark:bg-[#0e0d0d] transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 sm:mb-16"
        >
          {/* Left: badge + title + subtitle */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="inline-block px-4 py-1.5 rounded-full bg-[#78F50B]/10 text-[#78F50B] text-xs font-semibold tracking-wider uppercase mb-4"
            >
              Reviews
            </motion.span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white transition-colors leading-tight">
              What Clients Say
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-md text-sm sm:text-base leading-relaxed">
              Hear from the people I&apos;ve worked with — real feedback from
              real projects.
            </p>
          </div>

          {/* Right: navigation controls (desktop) */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-400 dark:text-gray-500 hover:border-[#78F50B] hover:text-[#78F50B] hover:bg-[#78F50B]/5 transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-400 dark:text-gray-500 hover:border-[#78F50B] hover:text-[#78F50B] hover:bg-[#78F50B]/5 transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </motion.div>

        {/* ── Swiper Carousel ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            onSwiper={setSwiperRef}
            spaceBetween={20}
            slidesPerView={1}
            loop={testimonialList.length > 3}
            autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{
              clickable: true,
              el: ".testimonial-pagination",
              bulletClass: "testimonial-bullet",
              bulletActiveClass: "testimonial-bullet-active",
            }}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
          >
            {testimonialList.map((testimonial, index) => (
              <SwiperSlide
                key={testimonial._id || testimonial.id || index}
                className="h-auto!"
              >
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ y: -5, transition: { duration: 0.25 } }}
                  className="h-full flex flex-col p-6 sm:p-7 rounded-2xl bg-white dark:bg-white/3 border border-gray-100 dark:border-white/6 hover:border-[#78F50B]/30 dark:hover:border-[#78F50B]/20 transition-all duration-300 shadow-[0_2px_20px_rgba(0,0,0,0.04)] dark:shadow-none group cursor-grab active:cursor-grabbing"
                >
                  {/* Top row: avatar + info + stars */}
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-[#78F50B]/10 shrink-0 relative">
                        {testimonial.avatar ? (
                          <Image
                            src={
                              testimonial.avatar.startsWith("http")
                                ? testimonial.avatar
                                : testimonial.avatar.startsWith("/")
                                  ? testimonial.avatar
                                  : `/${testimonial.avatar}`
                            }
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                            sizes="44px"
                            unoptimized={testimonial.avatar.startsWith("http")}
                          />
                        ) : (
                          <div className="w-full h-full bg-linear-to-br from-[#78F50B]/30 to-[#78F50B]/5 flex items-center justify-center">
                            <span className="text-[#78F50B] text-sm font-bold">
                              {testimonial.name.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-black dark:text-white font-semibold text-sm leading-tight truncate transition-colors">
                          {testimonial.name}
                        </p>
                        <p className="text-gray-400 dark:text-gray-500 text-xs mt-0.5 truncate">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    {/* Stars */}
                    <div className="flex gap-0.5 shrink-0 pt-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className="fill-[#78F50B] text-[#78F50B]"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gray-100 dark:bg-white/6 mb-5" />

                  {/* Quote icon + text */}
                  <div className="flex-1">
                    <Quote
                      size={24}
                      className="text-[#78F50B]/15 mb-3 rotate-180 group-hover:text-[#78F50B]/30 transition-colors duration-300"
                    />
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-[1.7] transition-colors">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* ── Bottom: pagination + counter + mobile nav ── */}
          <div className="flex items-center justify-between mt-8 sm:mt-10">
            {/* Mobile arrows */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-400 hover:border-[#78F50B] hover:text-[#78F50B] transition-all"
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-400 hover:border-[#78F50B] hover:text-[#78F50B] transition-all"
                aria-label="Next"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Pagination dots — centered */}
            <div className="testimonial-pagination flex items-center justify-center gap-1.5 flex-1" />

         
          </div>
        </motion.div>
      </div>

      {/* Pagination bullet styles */}
      <style jsx global>{`
        .testimonial-bullet {
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          background: rgba(120, 245, 11, 0.15);
          display: inline-block;
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .testimonial-bullet:hover {
          background: rgba(120, 245, 11, 0.4);
          transform: scale(1.2);
        }
        .testimonial-bullet-active {
          width: 24px;
          background: #78F50B !important;
        }
      `}</style>
    </section>
  );
}
