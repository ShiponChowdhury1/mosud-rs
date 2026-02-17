import { getProjectById, getProjects } from "@/actions/projects";
import { notFound } from "next/navigation";
import { Navbar, Footer } from "@/components/shared";
import ProjectDetailClient from "./ProjectDetailClient";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} | Mosud Rahman`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) notFound();

  // Get related projects (same category, exclude current)
  const allProjects = await getProjects();
  const related = allProjects
    .filter((p: { _id: string; category: string }) => p._id !== id && p.category === project.category)
    .slice(0, 3);

  return (
    <main className="relative bg-white dark:bg-[#1B1B1B] min-h-screen transition-colors duration-300">
      <div className="pointer-events-none fixed top-0 left-0 h-full w-[45%] opacity-0 dark:opacity-100 bg-[radial-gradient(ellipse_at_0%_50%,rgba(120,245,11,0.15)_0%,transparent_70%)] transition-opacity duration-300" />
      <div className="pointer-events-none fixed top-0 right-0 h-full w-[55%] opacity-0 dark:opacity-100 bg-[radial-gradient(ellipse_at_100%_50%,rgba(120,245,11,0.25)_0%,transparent_70%)] transition-opacity duration-300" />
      <div className="relative z-10">
        <Navbar />
        <ProjectDetailClient project={project} relatedProjects={related} />
        <Footer />
      </div>
    </main>
  );
}
