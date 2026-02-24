import { getPortfolioData } from "@/lib/portfolioService";
import { notFound } from "next/navigation";
import { ProjectDetailClient } from "./ProjectDetailClient";

export async function generateStaticParams() {
  const data = await getPortfolioData();
  return data.projects.map((project) => ({
    id: project.id,
  }));
}

export default async function ProjectDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const data = await getPortfolioData();
  const project = data.projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}
