"use server";

import dbConnect from "@/lib/mongodb";
import Project from "@/models/Project";
import { revalidatePath } from "next/cache";

export async function getProjects() {
  try {
    await dbConnect();
    const projects = await Project.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(projects));
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function getProjectById(id: string) {
  try {
    await dbConnect();
    const project = await Project.findById(id).lean();
    if (!project) return null;
    return JSON.parse(JSON.stringify(project));
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

export async function createProject(data: {
  image: string;
  category: string;
  title: string;
  description: string;
  figmaUrl?: string;
}) {
  try {
    await dbConnect();
    const project = await Project.create(data);
    revalidatePath("/");
    revalidatePath("/dashboard");
    return { success: true, project: JSON.parse(JSON.stringify(project)) };
  } catch (error) {
    console.error("Error creating project:", error);
    return { success: false, error: "Failed to create project" };
  }
}

export async function updateProject(
  id: string,
  data: {
    image?: string;
    category?: string;
    title?: string;
    description?: string;
    figmaUrl?: string;
  }
) {
  try {
    await dbConnect();
    const project = await Project.findByIdAndUpdate(id, data, { new: true }).lean();
    if (!project) return { success: false, error: "Project not found" };
    revalidatePath("/");
    revalidatePath("/dashboard");
    return { success: true, project: JSON.parse(JSON.stringify(project)) };
  } catch (error) {
    console.error("Error updating project:", error);
    return { success: false, error: "Failed to update project" };
  }
}

export async function deleteProject(id: string) {
  try {
    await dbConnect();
    await Project.findByIdAndDelete(id);
    revalidatePath("/");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error deleting project:", error);
    return { success: false, error: "Failed to delete project" };
  }
}
