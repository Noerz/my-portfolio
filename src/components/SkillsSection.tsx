"use client";

import { Section } from "@/components/Section";
import { Skill } from "@/types/portfolio";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { Marquee } from "@/components/magicui/Marquee";
import { useLanguage } from "@/contexts/LanguageContext";

interface SkillsSectionProps {
  skills: Skill[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const { t } = useLanguage();
  
  const categoryLabels: Record<string, { label: string; emoji: string; color: string; badgeGlow: string }> = {
    language: { label: t("skills.language"), emoji: "💻", color: "from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50", badgeGlow: "hover:shadow-blue-500/20" },
    framework: { label: t("skills.framework"), emoji: "⚡", color: "from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50", badgeGlow: "hover:shadow-purple-500/20" },
    tool: { label: t("skills.tool"), emoji: "🛠️", color: "from-green-50 to-teal-50 dark:from-green-950/50 dark:to-teal-950/50", badgeGlow: "hover:shadow-green-500/20" },
    database: { label: t("skills.database"), emoji: "🗄️", color: "from-orange-50 to-red-50 dark:from-orange-950/50 dark:to-red-950/50", badgeGlow: "hover:shadow-orange-500/20" },
    other: { label: t("skills.other"), emoji: "📦", color: "from-zinc-50 to-slate-50 dark:from-zinc-900 dark:to-slate-900", badgeGlow: "hover:shadow-zinc-500/20" },
  };
  
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  // Flatten all skills into two rows for marquee
  const allSkills = Object.entries(groupedSkills).flatMap(([, catSkills]) => catSkills);
  const midpoint = Math.ceil(allSkills.length / 2);
  const row1 = allSkills.slice(0, midpoint);
  const row2 = allSkills.slice(midpoint);

  return (
    <Section id="skills" title={t("skills.title")}>
      {/* Category cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {Object.entries(groupedSkills).map(([category, categorySkills], index) => {
          const categoryInfo = categoryLabels[category] || categoryLabels.other;
          return (
            <AnimateOnScroll
              key={category}
              animation="slide-left"
              delay={index * 150}
              duration={600}
            >
              <div className={`magic-card bg-gradient-to-br ${categoryInfo.color} p-6 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm h-full`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{categoryInfo.emoji}</span>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{categoryInfo.label}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categorySkills.map((skill) => (
                    <div
                      key={skill.name}
                      className={`skill-badge px-3 py-2 bg-zinc-100/80 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 rounded-lg text-sm font-medium border border-zinc-200/60 dark:border-zinc-700/60 ${categoryInfo.badgeGlow}`}
                    >
                      <div>{skill.name}</div>
                      {skill.description && (
                        <div className="text-xs font-normal text-zinc-600 dark:text-zinc-300 mt-1">
                          {t(skill.description)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          );
        })}
      </div>

      {/* Marquee section */}
      <AnimateOnScroll animation="fade-up" delay={300} duration={600}>
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white dark:from-zinc-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white dark:from-zinc-950 to-transparent z-10 pointer-events-none" />
          
          <div className="space-y-3">
            <Marquee speed={35} pauseOnHover>
              {row1.map((skill) => (
                <div
                  key={skill.name}
                  className="skill-badge px-4 py-2 bg-zinc-100/80 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 rounded-full text-sm font-medium border border-zinc-200/60 dark:border-zinc-700/60 whitespace-nowrap"
                >
                  {skill.name}
                </div>
              ))}
            </Marquee>
            <Marquee speed={45} reverse pauseOnHover>
              {row2.map((skill) => (
                <div
                  key={skill.name}
                  className="skill-badge px-4 py-2 bg-zinc-100/80 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 rounded-full text-sm font-medium border border-zinc-200/60 dark:border-zinc-700/60 whitespace-nowrap"
                >
                  {skill.name}
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </AnimateOnScroll>
    </Section>
  );
}
