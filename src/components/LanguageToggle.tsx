"use client";

import { useLanguage } from "@/contexts/LanguageContext";

interface LanguageToggleProps {
  className?: string;
}

export function LanguageToggle({ className }: LanguageToggleProps) {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "id" ? "en" : "id");
  };

  return (
    <button
      onClick={toggleLanguage}
      className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl rounded-full shadow-lg border border-zinc-200/50 dark:border-zinc-800/50 hover:scale-105 transition-all duration-300 opacity-0 animate-fade-in ${
        className || ""
      }`}
      style={{ animationDelay: "400ms" }}
      aria-label="Change language"
    >
      <span className="text-lg sm:text-xl text-zinc-900 dark:text-zinc-100">
        {language === "id" ? "EN" : "🇮🇩"}
      </span>
      <span className="text-xs sm:text-sm font-medium text-zinc-900 dark:text-zinc-100 hidden sm:inline">
        {language === "id" ? "EN" : "ID"}
      </span>
    </button>
  );
}
