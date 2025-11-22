import { Section } from "@/components/Section";
import { Experience } from "@/types/portfolio";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";

interface ExperienceSectionProps {
  experiences: Experience[];
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  if (!experiences || experiences.length === 0) return null;

  return (
    <Section id="experience" title="Pengalaman">
      <div className="max-w-3xl mx-auto space-y-6">
        {experiences.map((exp, index) => (
          <AnimateOnScroll
            key={exp.id}
            animation="fade-up"
            delay={index * 150}
            duration={600}
          >
            <div className="bg-white dark:bg-gradient-to-br dark:from-zinc-900 dark:to-slate-900 p-6 md:p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
              <div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                  {exp.position}
                </h3>
                <p className="text-base font-semibold text-blue-600 dark:text-blue-400">
                  {exp.company}
                </p>
              </div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400 md:text-right">
                <p className="font-medium">{exp.duration}</p>
                {exp.location && <p>{exp.location}</p>}
              </div>
            </div>

            <p className="text-sm md:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
              {exp.description}
            </p>

            {exp.achievements && exp.achievements.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                  ✨ Kontribusi & Pencapaian:
                </h4>
                <ul className="space-y-1">
                  {exp.achievements.map((achievement, i) => (
                    <li
                      key={i}
                      className="text-sm text-zinc-700 dark:text-zinc-300 flex items-start gap-2"
                    >
                      <span className="text-green-600 dark:text-green-400 mt-0.5">▸</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {exp.technologies && exp.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-3 border-t border-zinc-200 dark:border-zinc-800">
                {exp.technologies.map((tech) => (
                    <span
                    key={tech}
                    className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-md text-xs font-medium text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
                    >
                    {tech}
                    </span>
                ))}
              </div>
            )}
          </div>
          </AnimateOnScroll>
        ))}
      </div>
    </Section>
  );
}
