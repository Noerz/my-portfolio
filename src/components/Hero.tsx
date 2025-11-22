import { PortfolioData } from "@/types/portfolio";
import Image from "next/image";

interface HeroProps {
  data: PortfolioData["owner"];
}

export function Hero({ data }: HeroProps) {
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
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight gradient-text opacity-0 animate-fade-in-up">
          {data.heroName ?? data.name}
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-400 font-medium opacity-0 animate-fade-in-up delay-100">
          {data.role} • {data.location}
        </p>
        <p className="max-w-xl text-sm sm:text-base md:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed opacity-0 animate-fade-in-up delay-200">
          {data.summary}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-2 opacity-0 animate-fade-in-up delay-300 justify-center md:justify-start">
          <a
            href="#projects"
            className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Lihat Proyek
          </a>
          <a
            href="#contact"
            className="rounded-full border-2 border-zinc-300 dark:border-zinc-600 px-6 py-2.5 text-sm font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:scale-105 transition-all duration-300"
          >
            Kontak
          </a>
        </div>
      </div>
    </div>
  );
}
