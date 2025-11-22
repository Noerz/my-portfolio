import { Project } from "@/types/portfolio";
import Link from "next/link";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group border border-zinc-200 dark:border-zinc-700 rounded-xl p-6 flex flex-col gap-4 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-xl hover:border-blue-400 dark:hover:border-blue-600 hover:-translate-y-2 transition-all duration-300">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {project.name}
        </h3>
        {project.featured && (
          <span className="text-xs bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full font-semibold animate-pulse">Featured</span>
        )}
      </div>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed">
        {project.description}
      </p>
      <ul className="flex flex-wrap gap-2 mt-1">
        {project.techStack.map((t: string) => (
          <li
            key={t}
            className="text-xs px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            {t}
          </li>
        ))}
      </ul>
      <div className="flex gap-4 mt-auto pt-3 border-t border-zinc-100 dark:border-zinc-800">
        <Link
          href={`/projects/${project.id}`}
          className="text-sm font-semibold text-purple-600 dark:text-purple-400 hover:underline hover:scale-105 transition-transform"
        >
          📄 Detail
        </Link>
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline hover:scale-105 transition-transform"
          >
            📦 Repo
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-green-600 dark:text-green-400 hover:underline hover:scale-105 transition-transform"
          >
            🚀 Live
          </a>
        )}
        <span className="text-xs text-zinc-500 ml-auto self-center font-medium">{project.year}</span>
      </div>
    </article>
  );
}
