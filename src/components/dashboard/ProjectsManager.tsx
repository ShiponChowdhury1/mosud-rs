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

interface ProjectData {
  _id: string;
  image: string;
  category: string;
  title: string;
  description: string;
}

interface FormData {
  image: string;
  category: string;
  title: string;
  description: string;
}

const emptyForm: FormData = {
  image: "",
  category: "",
  title: "",
  description: "",
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
        }
      } else {
        const result = await createProject(form);
        if (result.success) {
          setProjects((prev) => [result.project, ...prev]);
        }
      }
      setShowModal(false);
      setForm(emptyForm);
      setEditingId(null);
    } catch (error) {
      console.error("Error:", error);
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
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      {/* Add Button */}
      <button
        onClick={openCreate}
        className="mb-6 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#78F50B] text-black font-semibold text-sm hover:bg-[#6AE000] transition-all"
      >
        <Plus size={18} />
        Add Project
      </button>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden group hover:border-[#78F50B]/20 transition-all"
          >
            {/* Image Preview */}
            <div className="h-40 bg-white/[0.02] flex items-center justify-center border-b border-white/5">
              <div className="flex items-center gap-2 text-gray-600">
                <ImageIcon size={20} />
                <span className="text-sm">{project.image}</span>
              </div>
            </div>

            {/* Info */}
            <div className="p-5">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#78F50B]/60 bg-[#78F50B]/10 px-2 py-1 rounded-full">
                {project.category}
              </span>
              <h3 className="text-white font-semibold mt-3">{project.title}</h3>
              <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                {project.description}
              </p>

              {/* Actions */}
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
                <button
                  onClick={() => openEdit(project)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-300 bg-white/[0.05] hover:bg-white/[0.1] transition-all"
                >
                  <Pencil size={12} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  disabled={deletingId === project._id}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 transition-all disabled:opacity-50"
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
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#161616] border border-white/10 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
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
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Image Path
                </label>
                <input
                  type="text"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="/image/chart.png"
                  required
                  className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#78F50B]/50 transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
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
                  className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#78F50B]/50 transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Project Title"
                  required
                  className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#78F50B]/50 transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
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
                  className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#78F50B]/50 transition-all text-sm resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 rounded-xl text-sm font-medium text-gray-300 bg-white/[0.05] hover:bg-white/[0.1] transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-black bg-[#78F50B] hover:bg-[#6AE000] disabled:opacity-50 transition-all"
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
