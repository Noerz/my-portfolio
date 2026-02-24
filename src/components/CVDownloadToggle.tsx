"use client";

import { useEffect, useRef, useState } from "react";

interface CVDownloadToggleProps {
  className?: string;
}

export function CVDownloadToggle({ className }: CVDownloadToggleProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (menuRef.current && !menuRef.current.contains(target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={menuRef} className={`relative ${className || ""}`.trim()}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl rounded-full shadow-lg border border-zinc-200/50 dark:border-zinc-800/50 hover:scale-105 transition-all duration-300 opacity-0 animate-fade-in"
        style={{ animationDelay: "350ms" }}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Download CV"
      >
        <span className="text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Download CV
        </span>
        <svg
          className={`w-4 h-4 text-zinc-600 dark:text-zinc-300 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-44 rounded-xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl shadow-xl p-1"
          role="menu"
        >
          <a
            href="/ATS_MustaqimPratamaRahmadi(Programer)-ID.pdf"
            download
            className="block px-3 py-2 rounded-lg text-sm text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/80 transition-colors"
            role="menuitem"
          >
            CV Indonesia
          </a>
          <a
            href="/ATS_MustaqimPratamaRahmadi(Programer)-EN.pdf"
            download
            className="block px-3 py-2 rounded-lg text-sm text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/80 transition-colors"
            role="menuitem"
          >
            CV English
          </a>
        </div>
      )}
    </div>
  );
}
