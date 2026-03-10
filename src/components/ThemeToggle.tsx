// "use client";

// import { useEffect, useState } from "react";

// export function ThemeToggle() {
//   const [mounted, setMounted] = useState(false);
//   const [isDark, setIsDark] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//     const storedTheme = localStorage.getItem("theme");

//     if (!storedTheme) {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//       setIsDark(true);
//     } else {
//       const isDarkMode = storedTheme === "dark";
//       if (isDarkMode) {
//         document.documentElement.classList.add("dark");
//       } else {
//         document.documentElement.classList.remove("dark");
//       }
//       setIsDark(isDarkMode);
//     }
//   }, []);

//   const toggleTheme = () => {
//     if (isDark) {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//       setIsDark(false);
//     } else {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//       setIsDark(true);
//     }
//   };

//   if (!mounted) {
//     return null;
//   }

//   return (
//     <button
//       onClick={toggleTheme}
//       className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 p-3 sm:p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 group"
//       style={{
//         background: isDark
//           ? "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)"
//           : "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
//         boxShadow: isDark
//           ? "0 0 20px rgba(99, 102, 241, 0.3), 0 4px 15px rgba(0,0,0,0.3)"
//           : "0 0 20px rgba(251, 191, 36, 0.4), 0 4px 15px rgba(0,0,0,0.1)",
//       }}
//       aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
//       title={`Switch to ${isDark ? "light" : "dark"} mode`}
//     >
//       <div className="relative w-6 h-6 sm:w-7 sm:h-7">
//         {/* Sun */}
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           className="absolute inset-0 w-full h-full transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
//           style={{
//             color: isDark ? "#818cf8" : "#ffffff",
//             transform: isDark ? "rotate(-90deg) scale(0)" : "rotate(0deg) scale(1)",
//             opacity: isDark ? 0 : 1,
//           }}
//         >
//           {/* Sun center circle */}
//           <circle cx="12" cy="12" r="4" />
//           {/* Sun rays */}
//           <line x1="12" y1="1" x2="12" y2="3" />
//           <line x1="12" y1="21" x2="12" y2="23" />
//           <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
//           <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
//           <line x1="1" y1="12" x2="3" y2="12" />
//           <line x1="21" y1="12" x2="23" y2="12" />
//           <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
//           <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
//         </svg>

//         {/* Moon */}
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           className="absolute inset-0 w-full h-full transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
//           style={{
//             color: isDark ? "#e0e7ff" : "#fbbf24",
//             transform: isDark ? "rotate(0deg) scale(1)" : "rotate(90deg) scale(0)",
//             opacity: isDark ? 1 : 0,
//           }}
//         >
//           {/* Moon crescent */}
//           <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
//         </svg>

//         {/* Stars that appear in dark mode */}
//         <div
//           className="absolute inset-0 transition-all duration-700"
//           style={{
//             opacity: isDark ? 1 : 0,
//             transform: isDark ? "scale(1)" : "scale(0.5)",
//           }}
//         >
//           <span
//             className="absolute w-1 h-1 rounded-full bg-indigo-200"
//             style={{
//               top: "2px",
//               right: "0px",
//               animation: isDark ? "theme-star-twinkle 2s ease-in-out infinite" : "none",
//               animationDelay: "0s",
//             }}
//           />
//           <span
//             className="absolute w-0.5 h-0.5 rounded-full bg-indigo-300"
//             style={{
//               top: "0px",
//               right: "10px",
//               animation: isDark ? "theme-star-twinkle 2s ease-in-out infinite" : "none",
//               animationDelay: "0.6s",
//             }}
//           />
//           <span
//             className="absolute w-1 h-1 rounded-full bg-indigo-100"
//             style={{
//               bottom: "4px",
//               right: "2px",
//               animation: isDark ? "theme-star-twinkle 2s ease-in-out infinite" : "none",
//               animationDelay: "1.2s",
//             }}
//           />
//         </div>

//         {/* Sun glow rays that appear in light mode */}
//         <div
//           className="absolute inset-[-4px] transition-all duration-500"
//           style={{
//             opacity: isDark ? 0 : 0.5,
//             animation: isDark ? "none" : "theme-rays-spin 8s linear infinite",
//           }}
//         >
//           {[0, 45, 90, 135].map((deg) => (
//             <span
//               key={deg}
//               className="absolute left-1/2 top-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-white to-transparent"
//               style={{
//                 transform: `translate(-50%, -50%) rotate(${deg}deg)`,
//                 opacity: 0.6,
//               }}
//             />
//           ))}
//         </div>
//       </div>
//     </button>
//   );
// }
