"use client";

import React, { useCallback, useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export function Navbar() {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState<string>("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const sections = [
    { id: "about", label: t("nav.about"), icon: "👤" },
    { id: "experience", label: t("nav.experience"), icon: "🎯" },
    { id: "skills", label: t("nav.skills"), icon: "⚡" },
    { id: "projects", label: t("nav.projects"), icon: "💼" },
    { id: "blog", label: t("nav.blog"), icon: "📝" },
    { id: "contact", label: t("nav.contact"), icon: "📧" },
  ];

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveSection("");
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      setIsScrolled(window.scrollY > 50);

      const scrollPosition = window.scrollY + window.innerHeight / 2;
      let foundSection = "";

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            foundSection = section.id;
          }
        }
      }

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
        foundSection = sections[sections.length - 1].id;
      }

      if (window.scrollY < 100) {
        foundSection = "";
      }

      setActiveSection(foundSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  return (
    <>
      <nav className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 opacity-0 animate-fade-in w-[95%] max-w-4xl transition-all duration-500 ${isScrolled ? 'top-3' : 'top-4'}`}>
        <div className={`flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl backdrop-saturate-200 border border-zinc-200/60 dark:border-zinc-800/60 shadow-xl shadow-black/5 dark:shadow-black/20' 
            : 'bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/50'
        }`}>
          {sections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`
                group relative flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full
                transition-all duration-300 ease-out
                hover:scale-105
                ${
                  activeSection === section.id
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md shadow-blue-500/25"
                    : "hover:bg-zinc-100/80 dark:hover:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300"
                }
              `}
              style={{ 
                animation: `fadeIn 0.6s ease-out forwards`,
                animationDelay: `${index * 80}ms`,
                opacity: 0
              }}
            >
              <span className="text-base sm:text-lg group-hover:scale-110 transition-transform duration-300">
                {section.icon}
              </span>
              <span className="text-xs sm:text-sm font-medium tracking-wide hidden md:inline">
                {section.label}
              </span>
              {/* Active indicator dot */}
              {activeSection === section.id && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`
          fixed bottom-6 left-4 sm:bottom-8 sm:left-8 z-50
          flex items-center justify-center
          w-11 h-11 sm:w-12 sm:h-12 rounded-full
          bg-gradient-to-r from-blue-500 to-purple-600
          text-white shadow-lg shadow-blue-500/20
          hover:scale-110 hover:shadow-xl hover:shadow-blue-500/30
          transition-all duration-300 ease-out
          ${showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}
        `}
        aria-label="Scroll to top"
      >
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </>
  );
}

export default Navbar;
