import ProjectsManager from "@/components/dashboard/ProjectsManager";
import { getProjects } from "@/actions/projects";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Projects</h1>
        <p className="text-gray-400 text-sm sm:text-base mt-1">Manage your portfolio projects.</p>
      </div>
      <ProjectsManager initialProjects={projects} />
    </div>
  );
}
