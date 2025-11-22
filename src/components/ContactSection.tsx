import { Section } from "@/components/Section";
import { PortfolioData } from "@/types/portfolio";

interface ContactSectionProps {
  owner: PortfolioData["owner"];
}

export function ContactSection({ owner }: ContactSectionProps) {
  return (
    <Section id="contact" title="Kontak">
      <div className="flex flex-col gap-6 max-w-2xl mx-auto">
        <p className="text-base text-center text-zinc-600 dark:text-zinc-400 opacity-0 animate-fade-in-up delay-100">
          Silakan hubungi saya untuk kolaborasi atau diskusi teknologi. Kopi virtual juga boleh! ☕
        </p>
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          {owner.email && (
            <a 
              href={`mailto:${owner.email}`}
              className="group p-6 bg-white dark:bg-gradient-to-br dark:from-blue-950 dark:to-cyan-950 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 opacity-0 animate-scale-in delay-200"
            >
              <div className="text-3xl mb-3">📧</div>
              <div className="font-semibold mb-1 text-zinc-900 dark:text-zinc-100">Email</div>
              <div className="text-sm text-blue-600 dark:text-blue-400 group-hover:underline break-all">
                {owner.email}
              </div>
            </a>
          )}
          
          {owner.github && (
            <a 
              href={owner.github}
              target="_blank" 
              rel="noopener noreferrer"
              className="group p-6 bg-white dark:bg-gradient-to-br dark:from-purple-950 dark:to-pink-950 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 opacity-0 animate-scale-in delay-300"
            >
              <div className="text-3xl mb-3">🐙</div>
              <div className="font-semibold mb-1 text-zinc-900 dark:text-zinc-100">GitHub</div>
              <div className="text-sm text-purple-600 dark:text-purple-400 group-hover:underline">
                @{owner.github.split('/').pop()}
              </div>
            </a>
          )}
          
          {owner.linkedin && (
            <a 
              href={owner.linkedin}
              target="_blank" 
              rel="noopener noreferrer"
              className="group p-6 bg-white dark:bg-gradient-to-br dark:from-green-950 dark:to-teal-950 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 opacity-0 animate-scale-in delay-400"
            >
              <div className="text-3xl mb-3">👔</div>
              <div className="font-semibold mb-1 text-zinc-900 dark:text-zinc-100">LinkedIn</div>
              <div className="text-sm text-green-600 dark:text-green-400 group-hover:underline">
                Profil
              </div>
            </a>
          )}
        </div>
      </div>
    </Section>
  );
}
