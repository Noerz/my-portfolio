import { Project } from "@/types/portfolio";
import { ProjectCard } from "@/components/ProjectCard";
import { Section } from "@/components/Section";
import Link from "next/link";

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  // Show only first 6 projects on homepage
  const displayProjects = projects.slice(0, 6);
  
  return (
    <Section id="projects" title="Proyek Pilihan">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {displayProjects.map((p, index) => (
          <div 
            key={p.id} 
            className={`opacity-0 animate-scale-in delay-${Math.min(index + 1, 5) * 100}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <ProjectCard project={p} />
          </div>
        ))}
      </div>
      
      {projects.length > 6 && (
        <div className="mt-8 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Lihat Semua Proyek ({projects.length})
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      )}
    </Section>
  );
}
