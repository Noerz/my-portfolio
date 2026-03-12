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
import { HeroBackground } from "@/components/HeroBackground";

export default async function Home() {
  const data = await getPortfolioData();
  
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
      <div className="relative bg-white dark:bg-zinc-950 border-b border-zinc-200/50 dark:border-zinc-800/50 overflow-hidden">
        {/* Magic UI background */}
        <HeroBackground />
        
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
      </main>
    </>
  );
}
