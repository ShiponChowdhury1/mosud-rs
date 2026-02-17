"use client";

import { useState } from "react";
import {
  createProject,
  updateProject,
  deleteProject,
} from "@/actions/projects";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Loader2,
  Image as ImageIcon,
  Save,
} from "lucide-react";
import Image from "next/image";
import { toast } from "react-toastify";

function getImageSrc(image: string) {
  if (image.startsWith("http")) return image;
  if (image.startsWith("/")) return image;
  return `/${image}`;
}

interface ProjectData {
  _id: string;
  image: string;
  category: string;
  title: string;
  description: string;
  figmaUrl?: string;
}

interface FormData {
  image: string;
  category: string;
  title: string;
  description: string;
  figmaUrl: string;
}

const emptyForm: FormData = {
  image: "",
  category: "",
  title: "",
  description: "",
  figmaUrl: "",
};

export default function ProjectsManager({
  initialProjects,
}: {
  initialProjects: ProjectData[];
}) {
  const [projects, setProjects] = useState<ProjectData[]>(initialProjects);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (project: ProjectData) => {
    setEditingId(project._id);
    setForm({
      image: project.image,
      category: project.category,
      title: project.title,
      description: project.description,
      figmaUrl: project.figmaUrl || "",
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        const result = await updateProject(editingId, form);
        if (result.success) {
          setProjects((prev) =>
            prev.map((p) => (p._id === editingId ? result.project : p))
          );
          toast.success("Project updated successfully!");
        } else {
          toast.error("Failed to update project");
        }
      } else {
        const result = await createProject(form);
        if (result.success) {
          setProjects((prev) => [result.project, ...prev]);
          toast.success("Project created successfully!");
        } else {
          toast.error("Failed to create project");
        }
      }
      setShowModal(false);
      setForm(emptyForm);
      setEditingId(null);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    setDeletingId(id);
    try {
      const result = await deleteProject(id);
      if (result.success) {
        setProjects((prev) => prev.filter((p) => p._id !== id));
        toast.success("Project deleted successfully!");
      } else {
        toast.error("Failed to delete project");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      {/* Add Button */}
      <button
        onClick={openCreate}
        className="mb-4 sm:mb-6 flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-[#78F50B] text-black font-semibold text-xs sm:text-sm hover:bg-[#6AE000] transition-all"
      >
        <Plus size={16} />
        Add Project
      </button>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-white/3 border border-white/10 rounded-xl sm:rounded-2xl overflow-hidden group hover:border-[#78F50B]/20 transition-all"
          >
            {/* Image Preview */}
            <div className="relative h-32 sm:h-40 bg-white/2 border-b border-white/5 overflow-hidden">
              {project.image ? (
                <Image
                  src={getImageSrc(project.image)}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized={project.image.startsWith("http")}
                />
              ) : (
                <div className="flex items-center justify-center h-full gap-2 text-gray-600">
                  <ImageIcon size={20} />
                  <span className="text-sm">No Image</span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-3 sm:p-5">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#78F50B]/60 bg-[#78F50B]/10 px-2 py-0.5 sm:py-1 rounded-full">
                {project.category}
              </span>
              <h3 className="text-white font-semibold text-sm sm:text-base mt-2 sm:mt-3 truncate">{project.title}</h3>
              <p className="text-gray-400 text-xs sm:text-sm mt-1 line-clamp-2">
                {project.description}
              </p>

              {/* Actions */}
              <div className="flex items-center gap-2 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/5">
                <button
                  onClick={() => openEdit(project)}
                  className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-medium text-gray-300 bg-white/5 hover:bg-white/10 transition-all"
                >
                  <Pencil size={12} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  disabled={deletingId === project._id}
                  className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 transition-all disabled:opacity-50"
                >
                  {deletingId === project._id ? (
                    <Loader2 size={12} className="animate-spin" />
                  ) : (
                    <Trash2 size={12} />
                  )}
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-16">
          <ImageIcon size={48} className="mx-auto text-gray-600 mb-4" />
          <p className="text-gray-400">No projects yet. Add your first project!</p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-[#161616] border border-white/10 rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg max-h-[85vh] sm:max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/6 sticky top-0 bg-[#161616] z-10">
              <h2 className="text-lg font-semibold text-white">
                {editingId ? "Edit Project" : "Add New Project"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-5">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                  Image Path
                </label>
                <input
                  type="text"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="/image/chart.png"
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#78F50B]/50 transition-all text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                  Category
                </label>
                <input
                  type="text"
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  placeholder="Web Application"
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#78F50B]/50 transition-all text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Project Title"
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#78F50B]/50 transition-all text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Project description..."
                  required
                  rows={3}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#78F50B]/50 transition-all text-xs sm:text-sm resize-none"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                  Figma URL <span className="text-gray-500 text-[10px] sm:text-xs">(optional)</span>
                </label>
                <input
                  type="url"
                  value={form.figmaUrl}
                  onChange={(e) => setForm({ ...form, figmaUrl: e.target.value })}
                  placeholder="https://www.figma.com/file/..."
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#78F50B]/50 transition-all text-xs sm:text-sm"
                />
              </div>

              <div className="flex gap-2 sm:gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-gray-300 bg-white/5 hover:bg-white/10 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold text-black bg-[#78F50B] hover:bg-[#6AE000] disabled:opacity-50 transition-all"
                >
                  {loading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Save size={16} />
                  )}
                  {editingId ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
