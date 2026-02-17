"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ children }: { children: React.ReactNode }) {
  // Always start with loading=true to match server render (avoids hydration mismatch)
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If already loaded this session, skip immediately
    if (sessionStorage.getItem("siteLoaded")) {
      requestAnimationFrame(() => {
        setProgress(100);
        setLoading(false);
      });
      return;
    }

    let current = 0;
    const interval = setInterval(() => {
      const remaining = 100 - current;
      const increment = Math.max(0.5, remaining * 0.06);
      current = Math.min(100, current + increment);
      setProgress(Math.round(current));

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setLoading(false);
          sessionStorage.setItem("siteLoaded", "true");
        }, 400);
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#0e0d0d]"
          >
            {/* Background glow effects */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-[#78F50B]/5 rounded-full blur-[120px]" />
              <div className="absolute top-[30%] left-[30%] w-75 h-75 bg-[#78F50B]/3 rounded-full blur-[80px] animate-pulse" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center gap-8">
              {/* Logo Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative"
              >
                {/* Glow ring behind image */}
                <div className="absolute inset-0 -m-3 rounded-full bg-[#78F50B]/10 blur-xl animate-pulse" />
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-[#78F50B]/30 shadow-2xl shadow-[#78F50B]/10">
                  <Image
                    src="/mosud.png"
                    alt="Mosud Rahman"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </motion.div>

              {/* Name */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center"
              >
                <h2 className="text-white text-xl sm:text-2xl font-bold tracking-tight">
                  Mosud Rahman
                </h2>
                <p className="text-gray-500 text-xs sm:text-sm mt-1 tracking-wider uppercase">
                  Product Designer
                </p>
              </motion.div>

              {/* Progress bar */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.35 }}
                className="w-56 sm:w-72"
              >
                {/* Track */}
                <div className="relative h-1.5 rounded-full bg-white/5 overflow-hidden">
                  {/* Fill */}
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-[#78F50B] to-[#a3ff4f]"
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                  {/* Shine effect */}
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-transparent via-white/20 to-transparent"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Percentage */}
                <div className="flex items-center justify-between mt-3">
                  <span className="text-gray-600 text-[10px] uppercase tracking-widest">Loading</span>
                  <span className="text-[#78F50B] text-xs font-mono font-semibold tabular-nums">
                    {progress}%
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Bottom decorative dots */}
            <div className="absolute bottom-8 flex items-center gap-1.5">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-[#78F50B]/40"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Site content - render but hidden until loaded */}
      <div
        style={{
          opacity: loading ? 0 : 1,
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        {children}
      </div>
    </>
  );
}
