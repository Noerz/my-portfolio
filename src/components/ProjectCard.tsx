"use client";
import { Project } from "@/types/portfolio";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { t } = useLanguage();
  return (
    <article className="group border border-zinc-200 dark:border-zinc-700 rounded-xl p-6 flex flex-col gap-4 bg-gradient-to-br from-white to-slate-50 dark:from-zinc-900 dark:to-zinc-800 shadow-sm hover:shadow-xl hover:border-blue-400 dark:hover:border-blue-600 hover:-translate-y-2 transition-all duration-300">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {project.name}
        </h3>
        {project.featured && (
          <span className="text-xs bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full font-semibold animate-pulse">{t("projects.featured")}</span>
        )}
      </div>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed">
        {project.description}
      </p>
      <ul className="flex flex-wrap gap-2 mt-1">
        {project.techStack.map((tech: string) => (
          <li
            key={tech}
            className="text-xs px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            {tech}
          </li>
        ))}
      </ul>
      <div className="flex gap-4 mt-auto pt-3 border-t border-zinc-200 dark:border-zinc-800">
        <Link
          href={`/projects/${project.id}`}
          className="text-sm font-semibold text-purple-600 dark:text-purple-400 hover:underline hover:scale-105 transition-transform"
        >
          📄 {t("projects.detail")}
        </Link>
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline hover:scale-105 transition-transform"
          >
            📦 {t("projects.repo")}
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-green-600 dark:text-green-400 hover:underline hover:scale-105 transition-transform"
          >
            🚀 {t("projects.live")}
          </a>
        )}
        <span className="text-xs text-zinc-500 ml-auto self-center font-medium">{project.year}</span>
      </div>
    </article>
  );
}
