"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#1B1B1B] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-[120px] sm:text-[180px] font-bold text-[#78F50B] leading-none">
          404
        </h1>
        <p className="text-xl sm:text-2xl text-white mt-4 mb-2">
          Page Not Found
        </p>
        <p className="text-gray-400 max-w-md mx-auto mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Button
          asChild
          className="bg-[#78F50B] text-black font-semibold hover:bg-[#78F50B]/90 rounded-full px-8 py-3"
        >
          <Link href="/">Go Back Home</Link>
        </Button>
      </motion.div>
    </div>
  );
}
