"use client";

import { useState } from "react";
import {
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "@/actions/testimonials";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Loader2,
  MessageSquareQuote,
  Save,
  Quote,
} from "lucide-react";
import { toast } from "react-toastify";

interface TestimonialData {
  _id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
}

interface FormData {
  name: string;
  role: string;
  avatar: string;
  quote: string;
}

const emptyForm: FormData = {
  name: "",
  role: "",
  avatar: "",
  quote: "",
};

export default function TestimonialsManager({
  initialTestimonials,
}: {
  initialTestimonials: TestimonialData[];
}) {
  const [testimonials, setTestimonials] =
    useState<TestimonialData[]>(initialTestimonials);
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

  const openEdit = (testimonial: TestimonialData) => {
    setEditingId(testimonial._id);
    setForm({
      name: testimonial.name,
      role: testimonial.role,
      avatar: testimonial.avatar,
      quote: testimonial.quote,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        const result = await updateTestimonial(editingId, form);
        if (result.success) {
          setTestimonials((prev) =>
            prev.map((t) => (t._id === editingId ? result.testimonial : t))
          );
          toast.success("Testimonial updated successfully!");
        } else {
          toast.error("Failed to update testimonial");
        }
      } else {
        const result = await createTestimonial(form);
        if (result.success) {
          setTestimonials((prev) => [result.testimonial, ...prev]);
          toast.success("Testimonial created successfully!");
        } else {
          toast.error("Failed to create testimonial");
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
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    setDeletingId(id);
    try {
      const result = await deleteTestimonial(id);
      if (result.success) {
        setTestimonials((prev) => prev.filter((t) => t._id !== id));
        toast.success("Testimonial deleted successfully!");
      } else {
        toast.error("Failed to delete testimonial");
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
        Add Testimonial
      </button>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial._id}
            className="bg-white/3 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-[#78F50B]/20 transition-all"
          >
            {/* Quote icon */}
            <Quote size={16} className="text-[#78F50B]/30 mb-2 sm:mb-3 rotate-180" />

            {/* Quote */}
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-3 sm:mb-4">
              &ldquo;{testimonial.quote}&rdquo;
            </p>

            {/* Author */}
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#78F50B]/10 flex items-center justify-center text-[#78F50B] text-xs sm:text-sm font-bold shrink-0">
                {testimonial.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="text-white text-xs sm:text-sm font-medium truncate">
                  {testimonial.name}
                </p>
                <p className="text-gray-500 text-[10px] sm:text-xs">{testimonial.role}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-3 sm:pt-4 border-t border-white/5">
              <button
                onClick={() => openEdit(testimonial)}
                className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-medium text-gray-300 bg-white/5 hover:bg-white/10 transition-all"
              >
                <Pencil size={11} />
                Edit
              </button>
              <button
                onClick={() => handleDelete(testimonial._id)}
                disabled={deletingId === testimonial._id}
                className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 transition-all disabled:opacity-50"
              >
                {deletingId === testimonial._id ? (
                  <Loader2 size={12} className="animate-spin" />
                ) : (
                  <Trash2 size={12} />
                )}
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {testimonials.length === 0 && (
        <div className="text-center py-16">
          <MessageSquareQuote size={48} className="mx-auto text-gray-600 mb-4" />
          <p className="text-gray-400">
            No testimonials yet. Add your first testimonial!
          </p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-[#161616] border border-white/10 rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg max-h-[85vh] sm:max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/6 sticky top-0 bg-[#161616] z-10">
              <h2 className="text-lg font-semibold text-white">
                {editingId ? "Edit Testimonial" : "Add New Testimonial"}
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
                  Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Client name"
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#78F50B]/50 transition-all text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                  Role
                </label>
                <input
                  type="text"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  placeholder="Website Design"
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#78F50B]/50 transition-all text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                  Avatar Path
                </label>
                <input
                  type="text"
                  value={form.avatar}
                  onChange={(e) =>
                    setForm({ ...form, avatar: e.target.value })
                  }
                  placeholder="/testimonials/avatar1.jpg"
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#78F50B]/50 transition-all text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                  Quote
                </label>
                <textarea
                  value={form.quote}
                  onChange={(e) => setForm({ ...form, quote: e.target.value })}
                  placeholder="Client testimonial quote..."
                  required
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#78F50B]/50 transition-all text-xs sm:text-sm resize-none"
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
