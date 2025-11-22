import { ReactNode } from "react";

interface SectionProps {
  id?: string;
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, title, children, className }: SectionProps) {
  return (
    <section id={id} className={`px-4 py-12 md:py-20 max-w-5xl mx-auto ${className || ""}`}>      
      {title && (
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8 md:mb-12 opacity-0 animate-fade-in-up">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            {title}
          </span>
        </h2>
      )}
      {children}
    </section>
  );
}
