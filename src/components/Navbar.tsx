"use client";

import React, { useCallback } from "react";

const sections = [
  { id: "about", label: "Tentang" },
  { id: "projects", label: "Proyek" },
  { id: "skills", label: "Keahlian" },
  { id: "experience", label: "Pengalaman" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Kontak" },
];

export function Navbar() {
  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <nav className="w-full top-0 z-30">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="hidden md:flex gap-4 items-center">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollToSection(s.id)}
              className="text-sm text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition bg-transparent border-none cursor-pointer"
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="md:hidden">
          <select
            onChange={(e) => scrollToSection(e.target.value)}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded px-3 py-1 text-sm"
            aria-label="Navigate sections"
            defaultValue=""
          >
            <option value="" disabled>
              Menu
            </option>
            {sections.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
