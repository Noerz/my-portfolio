"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "id" ? "en" : "id");
  };

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl rounded-full shadow-lg border border-zinc-200/50 dark:border-zinc-800/50 hover:scale-105 transition-all duration-300 opacity-0 animate-fade-in"
      style={{ animationDelay: "400ms" }}
      aria-label="Change language"
    >
      <span className="text-lg sm:text-xl">
        {language === "id" ? "🇮🇩" : "🇬🇧"}
      </span>
      <span className="text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 hidden sm:inline">
        {language === "id" ? "ID" : "EN"}
      </span>
    </button>
  );
}
