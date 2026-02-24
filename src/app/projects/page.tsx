import { getPortfolioData } from "@/lib/portfolioService";
import { ProjectsPageClient } from "./ProjectsPageClient";

export const metadata = {
  title: "All Projects - Portfolio",
  description: "Complete collection of web development projects I have worked on",
};

export default async function ProjectsPage() {
  const data = await getPortfolioData();
  const projects = data.projects;

  return <ProjectsPageClient projects={projects} />;
}
