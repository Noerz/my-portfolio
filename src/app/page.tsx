import { getPortfolioData } from "@/lib/portfolioService";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { BlogSection } from "@/components/BlogSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default async function Home() {
  const data = await getPortfolioData();
  
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col">
      <div className="relative bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
        {/* Mesh gradient blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-cyan-300 dark:from-blue-600 dark:to-cyan-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-50 dark:opacity-30 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-300 dark:from-purple-600 dark:to-pink-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-50 dark:opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-pink-400 to-orange-300 dark:from-pink-600 dark:to-orange-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-40 dark:opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24 md:py-32 mt-16 sm:mt-0">
          <Hero data={data.owner} />
        </div>
      </div>
      
      <AboutSection bio={data.owner.bio} />

      {data.experiences && data.experiences.length > 0 && (
        <ExperienceSection experiences={data.experiences} />
      )}
      
      {data.skills && data.skills.length > 0 && (
        <SkillsSection skills={data.skills} />
      )}
      
      <ProjectsSection projects={data.projects} />
      
      {data.blogs && data.blogs.length > 0 && (
        <BlogSection posts={data.blogs} />
      )}
      
      <ContactSection owner={data.owner} />
      
      <Footer ownerName={data.owner.name} />
      </div>
    </>
  );
}
