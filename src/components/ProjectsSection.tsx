import { Project } from "@/types/portfolio";
import { ProjectCard } from "@/components/ProjectCard";
import { Section } from "@/components/Section";

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <Section id="projects" title="Proyek Pilihan">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, index) => (
          <div 
            key={p.id} 
            className={`opacity-0 animate-scale-in delay-${Math.min(index + 1, 5) * 100}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <ProjectCard project={p} />
          </div>
        ))}
      </div>
    </Section>
  );
}
