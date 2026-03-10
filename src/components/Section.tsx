import { ReactNode } from "react";

interface SectionProps {
  id?: string;
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, title, children, className }: SectionProps) {
  return (
    <section id={id} className={`relative px-4 sm:px-6 py-10 sm:py-12 md:py-20 max-w-5xl mx-auto ${className || ""}`}>
      {title && (
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-6 sm:mb-8 md:mb-12 opacity-0 animate-fade-in-up">
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient-shift">
            {title}
          </span>
        </h2>
      )}
      {children}
    </section>
  );
}
