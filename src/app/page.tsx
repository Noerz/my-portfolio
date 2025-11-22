import { getPortfolioData } from "@/lib/portfolioService";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { BlogSection } from "@/components/BlogSection";
import { ContactSection } from "@/components/ContactSection";

export default async function Home() {
  const data = await getPortfolioData();
  
  return (
    <div className="min-h-screen flex flex-col">
      <div className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-zinc-950 dark:via-blue-950 dark:to-purple-950 border-b border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>
        <div className="relative max-w-5xl mx-auto px-4 py-24 md:py-32">
          <Hero data={data.owner} />
        </div>
      </div>
      
      <AboutSection bio={data.owner.bio} />
      
      {data.skills && data.skills.length > 0 && (
        <SkillsSection skills={data.skills} />
      )}
      
      <ProjectsSection projects={data.projects} />
      
      {data.experiences && data.experiences.length > 0 && (
        <ExperienceSection experiences={data.experiences} />
      )}
      
      {data.blogs && data.blogs.length > 0 && (
        <BlogSection posts={data.blogs} />
      )}
      
      <ContactSection owner={data.owner} />
      
      <footer className="mt-auto py-12 text-center text-sm text-zinc-500 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-800">
        <p className="opacity-0 animate-fade-in">© {new Date().getFullYear()} {data.owner.name}. Dibuat dengan ❤️ & Next.js</p>
      </footer>
    </div>
  );
}
