"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, Tag, Layers } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProjectItem {
  _id: string;
  image: string;
  category: string;
  title: string;
  description: string;
  createdAt?: string;
}

function getImageSrc(image: string) {
  if (image.startsWith("http")) return image;
  if (image.startsWith("/")) return image;
  return `/${image}`;
}

export default function ProjectDetailClient({
  project,
  relatedProjects,
}: {
  project: ProjectItem;
  relatedProjects: ProjectItem[];
}) {
  return (
    <section className="pt-28 pb-20 sm:pt-36 sm:pb-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-[#78F50B] text-sm transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back to Projects
          </Link>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-gray-100 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 mb-8 border border-gray-200 dark:border-white/10"
        >
          {project.image ? (
            <Image
              src={getImageSrc(project.image)}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
              unoptimized={project.image.startsWith("http")}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-lg">
              No Image
            </div>
          )}
        </motion.div>

        {/* Project Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {/* Meta badges */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#78F50B]/10 text-[#78F50B] text-xs font-medium rounded-full">
              <Tag size={12} />
              {project.category}
            </span>
            {project.createdAt && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 text-xs font-medium rounded-full">
                <Calendar size={12} />
                {new Date(project.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white transition-colors mb-6 leading-tight">
            {project.title}
          </h1>

          {/* Description */}
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Details Card */}
          <div className="mt-10 p-6 rounded-2xl bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.06]">
            <h3 className="flex items-center gap-2 text-black dark:text-white font-semibold mb-4">
              <Layers size={18} className="text-[#78F50B]" />
              Project Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Category</p>
                <p className="text-black dark:text-white text-sm font-medium">{project.category}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Project Title</p>
                <p className="text-black dark:text-white text-sm font-medium">{project.title}</p>
              </div>
              {project.createdAt && (
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Date Added</p>
                  <p className="text-black dark:text-white text-sm font-medium">
                    {new Date(project.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              )}
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Status</p>
                <span className="inline-block px-2 py-0.5 bg-[#78F50B]/10 text-[#78F50B] text-xs font-medium rounded-full">
                  Completed
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-black dark:text-white">
                Related Projects
              </h2>
              <Link
                href="/projects"
                className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-[#78F50B] text-sm transition-colors"
              >
                View All <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedProjects.map((rp) => (
                <Link
                  key={rp._id}
                  href={`/projects/${rp._id}`}
                  className="group block rounded-2xl overflow-hidden bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 hover:border-[#78F50B]/30 transition-all duration-300 shadow-sm dark:shadow-none"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-800">
                    {rp.image ? (
                      <Image
                        src={getImageSrc(rp.image)}
                        alt={rp.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        unoptimized={rp.image.startsWith("http")}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <span className="text-[10px] font-medium uppercase tracking-wider text-[#78F50B]">
                      {rp.category}
                    </span>
                    <h3 className="text-black dark:text-white font-semibold text-sm mt-1 group-hover:text-[#78F50B] transition-colors">
                      {rp.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
