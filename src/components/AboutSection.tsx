"use client";

import { Section } from "@/components/Section";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { useLanguage } from "@/contexts/LanguageContext";

interface AboutSectionProps {
  bio?: string;
}

export function AboutSection({ bio }: AboutSectionProps) {
  const { t } = useLanguage();
  
  return (
    <Section id="about" title={t("about.title")}>
      <div className="max-w-3xl mx-auto space-y-6">
        <AnimateOnScroll animation="fade-up" duration={600}>
          <div className="prose dark:prose-invert max-w-none text-sm md:text-base">
            <div className="bg-white dark:bg-gradient-to-br dark:from-zinc-900 dark:to-blue-950 p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <div className="text-4xl mb-4">
                <span
                  role="img"
                  aria-label="wave"
                  className="inline-block motion-safe:animate-bounce transform origin-bottom"
                >
                  👋
                </span>
              </div>
              <p className="leading-relaxed text-base mb-4 text-zinc-700 dark:text-zinc-300">
                {t("about.intro1")}
              </p>
              <p className="leading-relaxed text-base mb-4">
                {t("about.intro2")}
              </p>
              {bio && <p className="leading-relaxed text-base">{bio}</p>}
            </div>
          </div>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-2 gap-4">
          <AnimateOnScroll animation="slide-left" delay={100} duration={600}>
            <div className="bg-white dark:bg-gradient-to-br dark:from-purple-950 dark:to-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 h-full">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-bold text-lg mb-2 text-zinc-900 dark:text-zinc-100">
                {t("about.philosophy")}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                {t("about.philosophyDesc")}
              </p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll animation="slide-right" delay={100} duration={600}>
            <div className="bg-white dark:bg-gradient-to-br dark:from-green-950 dark:to-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 h-full">
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="font-bold text-lg mb-2 text-zinc-900 dark:text-zinc-100">
                {t("about.approach")}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                {t("about.approachDesc")}
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </Section>
  );
}
