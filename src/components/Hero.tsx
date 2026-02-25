"use client";

import { PortfolioData } from "@/types/portfolio";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

interface HeroProps {
  data: PortfolioData["owner"];
}

export function Hero({ data }: HeroProps) {
  const { t } = useLanguage();
  const [cvOpen, setCvOpen] = useState(false);
  const cvMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cvOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (cvMenuRef.current && !cvMenuRef.current.contains(target)) {
        setCvOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [cvOpen]);
  
  return (
    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
      {/* Avatar */}
      <div className="opacity-0 animate-scale-in">
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-4 ring-blue-500/20 dark:ring-purple-500/20 shadow-xl">
          {data.avatarUrl ? (
            <Image
              src={data.avatarUrl}
              alt={data.name}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl sm:text-4xl md:text-5xl font-bold">
              {data.name.charAt(0)}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 md:gap-6 flex-1 text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight opacity-0 animate-fade-in-up">
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-cyan-400 dark:via-purple-500 dark:to-pink-500 bg-clip-text text-transparent inline-block">
            {data.heroName ?? data.name}
          </span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-400 font-medium opacity-0 animate-fade-in-up delay-100">
          {data.role} • {data.location}
        </p>
        <p className="max-w-xl text-sm sm:text-base md:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed opacity-0 animate-fade-in-up delay-200">
          {t(data.summary)}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-2 opacity-0 animate-fade-in-up delay-300 justify-center md:justify-start">
          <a
            href="#projects"
            className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            {t("hero.viewProjects")}
          </a>
          <a
            href="#contact"
            className="rounded-full border-2 border-zinc-400 dark:border-zinc-600 text-zinc-700 dark:text-zinc-200 px-6 py-2.5 text-sm font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:scale-105 transition-all duration-300"
          >
            {t("hero.contact")}
          </a>
          
          {/* CV Download Dropdown */}
          <div ref={cvMenuRef} className="relative">
            <button
              onClick={() => setCvOpen((prev) => !prev)}
              className="rounded-full border-2 border-green-500 dark:border-green-400 text-green-600 dark:text-green-400 px-6 py-2.5 text-sm font-semibold hover:bg-green-50 dark:hover:bg-green-950 hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
            >
              📄 {t("hero.downloadCV")}
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${cvOpen ? "rotate-180" : ""}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {cvOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0 mt-2 w-48 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 backdrop-blur-xl shadow-xl p-2 z-50">
                <a
                  href="/MustaqimPratamaRahmadi_Resume_FullstackDeveloper.pdf"
                  download
                  className="block px-4 py-2.5 rounded-lg text-sm text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  🇮🇩 {t("hero.cvIndonesia")}
                </a>
                <a
                  href="/MustaqimPratamaRahmadi_Resume_FullstackDeveloper_EN.pdf"
                  download
                  className="block px-4 py-2.5 rounded-lg text-sm text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  🇬🇧 {t("hero.cvEnglish")}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
