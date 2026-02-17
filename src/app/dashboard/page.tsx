import { getProjects } from "@/actions/projects";
import { getTestimonials } from "@/actions/testimonials";
import { LayoutDashboard, FolderOpen, MessageSquareQuote } from "lucide-react";

export default async function DashboardPage() {
  const projects = await getProjects();
  const testimonials = await getTestimonials();

  const stats = [
    {
      label: "Total Projects",
      value: projects.length,
      icon: FolderOpen,
      color: "from-[#78F50B]/20 to-[#78F50B]/5",
      iconColor: "text-[#78F50B]",
    },
    {
      label: "Testimonials",
      value: testimonials.length,
      icon: MessageSquareQuote,
      color: "from-blue-500/20 to-blue-500/5",
      iconColor: "text-blue-400",
    },
    {
      label: "Categories",
      value: [...new Set(projects.map((p: { category: string }) => p.category))].length,
      icon: LayoutDashboard,
      color: "from-purple-500/20 to-purple-500/5",
      iconColor: "text-purple-400",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">Welcome back! Here&apos;s an overview of your portfolio.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`relative p-6 rounded-2xl bg-gradient-to-br ${stat.color} border border-white/10 overflow-hidden`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <p className="text-4xl font-bold text-white mt-1">{stat.value}</p>
              </div>
              <stat.icon className={`w-10 h-10 ${stat.iconColor} opacity-60`} />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Projects</h2>
          <div className="space-y-3">
            {projects.slice(0, 4).map((project: { _id: string; title: string; category: string }) => (
              <div
                key={project._id}
                className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5"
              >
                <div>
                  <p className="text-white text-sm font-medium">{project.title}</p>
                  <p className="text-gray-500 text-xs">{project.category}</p>
                </div>
                <span className="text-xs text-[#78F50B]/60 bg-[#78F50B]/10 px-2 py-1 rounded-full">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Testimonials */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Testimonials</h2>
          <div className="space-y-3">
            {testimonials.slice(0, 4).map((t: { _id: string; name: string; role: string; quote: string }) => (
              <div
                key={t._id}
                className="p-3 rounded-xl bg-white/[0.02] border border-white/5"
              >
                <p className="text-white text-sm font-medium">{t.name}</p>
                <p className="text-gray-500 text-xs mt-0.5">{t.role}</p>
                <p className="text-gray-400 text-xs mt-1 line-clamp-1">&ldquo;{t.quote}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
