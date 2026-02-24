"use client";
import { Project } from "@/types/portfolio";
import { ProjectCard } from "@/components/ProjectCard";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProjectsPageClientProps {
  projects: Project[];
}

export function ProjectsPageClient({ projects }: ProjectsPageClientProps) {
  const { t } = useLanguage();

  // Group projects by year
  const projectsByYear = projects.reduce((acc, project) => {
    const year = project.year;
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(project);
    return acc;
  }, {} as Record<number, typeof projects>);

  const years = Object.keys(projectsByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-950">
      {/* Header */}
      <header className="relative border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden">
        {/* Mesh gradient blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-blue-400 to-cyan-300 dark:from-blue-600 dark:to-cyan-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-40 dark:opacity-20 animate-blob"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-br from-purple-400 to-pink-300 dark:from-purple-600 dark:to-pink-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-40 dark:opacity-20 animate-blob animation-delay-2000"></div>
        </div>
        <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t("projects.backToHome")}
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            {t("projects.allProjects")}
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
            {t("projects.allProjectsDesc").replace("{count}", String(projects.length))}
          </p>
        </div>
      </header>

      {/* Projects by Year */}
      <main className="max-w-6xl mx-auto px-6 py-12 bg-white dark:bg-transparent backdrop-blur-sm rounded-2xl my-8 border border-zinc-200 dark:border-transparent shadow-md dark:shadow-none">
        {years.map((year) => (
          <section key={year} className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                {year}
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-zinc-300 to-transparent dark:from-zinc-700"></div>
              <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                {projectsByYear[Number(year)].length} {t("projects.projectCount")}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectsByYear[Number(year)].map((project, index) => (
                <div
                  key={project.id}
                  className="opacity-0 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </section>
        ))}

        {projects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg text-zinc-500 dark:text-zinc-400">
              {t("projects.noProjects")}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
