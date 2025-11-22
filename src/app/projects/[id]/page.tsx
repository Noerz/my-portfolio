import { getPortfolioData } from "@/lib/portfolioService";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

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

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link 
            href="/#projects" 
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <span>←</span> Kembali ke Portfolio
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12 md:py-20">
        {/* Title & Meta */}
        <div className="mb-12 opacity-0 animate-fade-in-up">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {project.featured && (
              <span className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full">
                Featured
              </span>
            )}
            <span className="text-sm text-zinc-500 dark:text-zinc-400">{project.year}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            {project.name}
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {project.description}
          </p>

          {/* Links */}
          <div className="flex gap-4 mt-6">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg font-semibold hover:scale-105 transition-transform"
              >
                📦 View Repository
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:scale-105 transition-transform"
              >
                🚀 Live Demo
              </a>
            )}
          </div>
        </div>

        {/* Project Image */}
        {project.imageUrl && (
          <div className="mb-12 opacity-0 animate-scale-in delay-100">
            <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-lg">
              <Image
                src={project.imageUrl}
                alt={project.name}
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}

        {/* Tech Stack */}
        <div className="mb-12 opacity-0 animate-fade-in-up delay-200">
          <h2 className="text-2xl font-bold mb-4">🛠️ Tech Stack</h2>
          <div className="flex flex-wrap gap-3">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg font-medium text-sm hover:scale-105 transition-transform"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Long Description */}
        {project.longDescription && (
          <div className="mb-12 opacity-0 animate-fade-in-up delay-300">
            <h2 className="text-2xl font-bold mb-4">📖 Overview</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
                {project.longDescription}
              </p>
            </div>
          </div>
        )}

        {/* Challenges */}
        {project.challenges && project.challenges.length > 0 && (
          <div className="mb-12 opacity-0 animate-fade-in-up delay-400">
            <h2 className="text-2xl font-bold mb-4">🎯 Tantangan Teknis</h2>
            <div className="space-y-4">
              {project.challenges.map((challenge, index) => (
                <div
                  key={index}
                  className="p-5 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-lg"
                >
                  <p className="text-sm md:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    {challenge}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Solutions */}
        {project.solutions && project.solutions.length > 0 && (
          <div className="mb-12 opacity-0 animate-fade-in-up delay-500">
            <h2 className="text-2xl font-bold mb-4">💡 Solusi & Pendekatan</h2>
            <div className="space-y-4">
              {project.solutions.map((solution, index) => (
                <div
                  key={index}
                  className="p-5 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-lg"
                >
                  <p className="text-sm md:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    {solution}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Architecture */}
        {project.architecture && (
          <div className="mb-12 opacity-0 animate-fade-in-up delay-600">
            <h2 className="text-2xl font-bold mb-4">🏗️ Arsitektur</h2>
            <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border border-zinc-200 dark:border-zinc-800 rounded-lg">
              <p className="text-sm md:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
                {project.architecture}
              </p>
            </div>
          </div>
        )}

        {/* Back to Projects */}
        <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800 text-center opacity-0 animate-fade-in">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg font-semibold hover:scale-105 transition-transform"
          >
            ← Lihat Proyek Lainnya
          </Link>
        </div>
      </main>
    </div>
  );
}
