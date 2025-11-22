import { Section } from "@/components/Section";
import { Skill } from "@/types/portfolio";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";

interface SkillsSectionProps {
  skills: Skill[];
}

const categoryLabels: Record<string, { label: string; emoji: string; color: string }> = {
  language: { label: "Bahasa Pemrograman", emoji: "💻", color: "from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950" },
  framework: { label: "Framework & Library", emoji: "⚡", color: "from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950" },
  tool: { label: "Tools & Platform", emoji: "🛠️", color: "from-green-50 to-teal-50 dark:from-green-950 dark:to-teal-950" },
  database: { label: "Database", emoji: "🗄️", color: "from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950" },
  other: { label: "Lainnya", emoji: "📦", color: "from-zinc-50 to-slate-50 dark:from-zinc-900 dark:to-slate-900" },
};

export function SkillsSection({ skills }: SkillsSectionProps) {
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <Section id="skills" title="Keahlian Teknis">
      <div className="grid md:grid-cols-2 gap-6">
        {Object.entries(groupedSkills).map(([category, categorySkills], index) => {
          const categoryInfo = categoryLabels[category] || categoryLabels.other;
          return (
            <AnimateOnScroll
              key={category}
              animation="slide-left"
              delay={index * 150}
              duration={600}
            >
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm h-full">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{categoryInfo.emoji}</span>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{categoryInfo.label}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categorySkills.map((skill) => (
                      <span
                      key={skill.name}
                      className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-lg text-sm font-medium border border-zinc-200 dark:border-zinc-700 hover:scale-105 transition-transform"
                      >
                      {skill.name}
                      </span>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          );
        })}
      </div>
    </Section>
  );
}
