"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check current theme
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
    
    // If no theme set, check localStorage or system preference
    if (!localStorage.getItem("theme")) {
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (systemPrefersDark) {
        document.documentElement.classList.add("dark");
        setIsDark(true);
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
    }
  }, []);

  const toggleTheme = () => {
    console.log("Toggle clicked, current isDark:", isDark); // Debug log
    
    if (isDark) {
      // Switch to light
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
      console.log("Switched to light mode"); // Debug log
    } else {
      // Switch to dark
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
      console.log("Switched to dark mode"); // Debug log
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-24 right-8 z-50 p-4 rounded-full bg-gradient-to-br from-zinc-900 to-zinc-700 dark:from-white dark:to-zinc-200 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Click to switch to ${isDark ? "light" : "dark"} mode`}
    >
      {!isDark ? (
        // Moon icon - clicking will enable dark mode
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 text-white group-hover:rotate-12 transition-transform duration-300"
        >
          <path
            fillRule="evenodd"
            d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        // Sun icon - clicking will enable light mode
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 text-zinc-900 group-hover:rotate-90 transition-transform duration-300"
        >
          <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
        </svg>
      )}
    </button>
  );
}
