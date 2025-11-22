import { getPortfolioData } from "@/lib/portfolioService";
import { ProjectCard } from "@/components/ProjectCard";
import Link from "next/link";

export const metadata = {
  title: "Semua Proyek - Portfolio",
  description: "Koleksi lengkap proyek-proyek web development yang telah saya kerjakan",
};

export default async function ProjectsPage() {
  const data = await getPortfolioData();
  const projects = data.projects;

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
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-zinc-950 dark:via-blue-950 dark:to-purple-950">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Kembali ke Beranda
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Semua Proyek
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
            Koleksi lengkap dari {projects.length} proyek yang telah saya kerjakan. 
            Dari landing page modern hingga aplikasi web yang kompleks.
          </p>
        </div>
      </header>

      {/* Projects by Year */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {years.map((year) => (
          <section key={year} className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                {year}
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-zinc-300 to-transparent dark:from-zinc-700"></div>
              <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                {projectsByYear[Number(year)].length} proyek
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
              Belum ada proyek yang ditampilkan.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
