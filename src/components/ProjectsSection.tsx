"use client";

import { Project } from "@/types/portfolio";
import { ProjectCard } from "@/components/ProjectCard";
import { Section } from "@/components/Section";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const { t } = useLanguage();
  // Show only first 6 projects on homepage
  const displayProjects = projects.slice(0, 6);
  
  return (
    <Section id="projects" title={t("projects.title")}>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {displayProjects.map((p, index) => (
          <AnimateOnScroll
            key={p.id}
            animation="scale"
            delay={index * 100}
            duration={500}
          >
            <ProjectCard project={p} />
          </AnimateOnScroll>
        ))}
      </div>
      
      {projects.length > 6 && (
        <AnimateOnScroll animation="fade-up" delay={600}>
          <div className="mt-8 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              {t("projects.viewAll")} ({projects.length})
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </AnimateOnScroll>
      )}
    </Section>
  );
}
