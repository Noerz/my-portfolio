"use client";

import { Section } from "@/components/Section";
import { Experience } from "@/types/portfolio";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { BorderBeam } from "@/components/magicui/BorderBeam";
import { useLanguage } from "@/contexts/LanguageContext";

interface ExperienceSectionProps {
  experiences: Experience[];
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  const { t } = useLanguage();
  if (!experiences || experiences.length === 0) return null;

  return (
    <Section
      id="experience"
      title={t("experience.title")}
      className="pt-4 sm:pt-6 md:pt-8"
    >
      <div className="max-w-3xl mx-auto space-y-6 relative">
        {/* Timeline line */}
        <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-purple-500/30 to-transparent hidden md:block" />

        {experiences.map((exp, index) => (
          <AnimateOnScroll
            key={exp.id}
            animation="fade-up"
            delay={index * 150}
            duration={600}
          >
            <div className="relative">
              {/* Timeline dot */}
              <div className="absolute left-6 md:left-8 top-8 w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 -translate-x-1/2 animate-pulse-glow hidden md:block" />
              
              <div className="magic-card bg-gradient-to-br from-white to-slate-50 dark:from-zinc-900 dark:to-slate-900/50 p-6 md:p-8 md:ml-12 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm overflow-hidden">
                {/* Border beam on first (latest) experience */}
                {index === 0 && (
                  <BorderBeam
                    size={250}
                    duration={15}
                    colorFrom="#6366f1"
                    colorTo="#a855f7"
                  />
                )}
                
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4 relative z-10">
                  <div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                      {exp.position}
                    </h3>
                    <p className="text-base font-semibold text-blue-600 dark:text-blue-400">
                      {exp.company}
                    </p>
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400 md:text-right">
                    <p className="font-medium px-3 py-1 bg-zinc-100/80 dark:bg-zinc-800/80 rounded-full inline-block">{exp.duration}</p>
                    {exp.location && <p className="mt-1">{exp.location}</p>}
                  </div>
                </div>

                <p className="text-sm md:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4 relative z-10">
                  {t(exp.description)}
                </p>

                {exp.achievements && exp.achievements.length > 0 && (
                  <div className="mb-4 relative z-10">
                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                      ✨ {t("experience.achievements")}
                    </h4>
                    <ul className="space-y-1">
                      {exp.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="text-sm text-zinc-700 dark:text-zinc-300 flex items-start gap-2"
                        >
                          <span className="text-green-600 dark:text-green-400 mt-0.5">▸</span>
                          <span>{t(achievement)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-zinc-200/60 dark:border-zinc-800/60 relative z-10">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="skill-badge px-2 py-1 bg-zinc-100/80 dark:bg-zinc-800/80 rounded-md text-xs font-medium text-zinc-700 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </Section>
  );
}
