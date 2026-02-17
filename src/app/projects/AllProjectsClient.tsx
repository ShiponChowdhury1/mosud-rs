"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProjectItem {
  _id?: string;
  id?: number;
  image: string;
  category: string;
  title: string;
  description: string;
}

function getImageSrc(image: string) {
  if (image.startsWith("http")) return image;
  if (image.startsWith("/")) return image;
  return `/${image}`;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
} as const;

export default function AllProjectsClient({ projects }: { projects: ProjectItem[] }) {
  return (
    <section className="pt-28 pb-20 sm:pt-36 sm:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back + Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-[#78F50B] text-sm transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white transition-colors">
            All Projects
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-lg text-sm sm:text-base">
            A complete collection of my design work and creative projects.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, index) => (
            <motion.div key={project._id || project.id || index} variants={cardVariants} className="h-full">
              <Link
                href={`/projects/${project._id || project.id}`}
                className="flex flex-col h-full group rounded-2xl overflow-hidden bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 hover:border-[#78F50B]/30 transition-all duration-300 shadow-sm dark:shadow-none"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 shrink-0">
                  {project.image ? (
                    <Image
                      src={getImageSrc(project.image)}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      unoptimized={project.image.startsWith("http")}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-600 text-sm">
                      No Image
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#78F50B]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                  <span className="inline-block self-start px-3 py-1 bg-[#78F50B]/10 text-[#78F50B] text-xs font-medium rounded-full mb-3">
                    {project.category}
                  </span>
                  <h3 className="text-black dark:text-white font-semibold text-lg mb-2 transition-colors group-hover:text-[#78F50B] dark:group-hover:text-[#78F50B] line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-2 transition-colors">
                    {project.description}
                  </p>
                  <span className="mt-auto pt-3 text-[#78F50B] text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View Details →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {projects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No projects found.</p>
          </div>
        )}
      </div>
    </section>
  );
}
