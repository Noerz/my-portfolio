import { Project } from "@/types/portfolio";

export const projects: Project[] = [
  {
    id: "p1",
    name: "Landing Page Modern",
    description: "Responsive landing page dengan animasi halus dan performa tinggi.",
    longDescription: "Sebuah landing page modern yang dibangun dengan fokus pada performance dan user experience. Menggunakan Next.js 14 dengan App Router untuk mendapatkan benefit dari React Server Components dan automatic code splitting.",
    techStack: ["Next.js", "TypeScript", "TailwindCSS", "Framer Motion"],
    repoUrl: "https://github.com/example/landing-page",
    liveUrl: "https://landing.example.com",
    year: 2024,
    featured: true,
    challenges: [
      "Memastikan animasi smooth di semua device tanpa mengorbankan performance",
      "Optimasi loading time untuk mendapatkan perfect Lighthouse score",
      "Implementasi responsive design yang konsisten dari mobile hingga 4K display"
    ],
    solutions: [
      "Menggunakan CSS transforms dan will-change untuk hardware acceleration",
      "Implementasi lazy loading untuk images dan components di bawah fold",
      "Menggunakan CSS Grid dan Flexbox dengan pendekatan mobile-first"
    ],
    architecture: "Client-side: React Server Components untuk static content, Client Components untuk interactive elements.\nStyling: Tailwind CSS dengan custom design tokens.\nDeployment: Vercel dengan automatic preview deployments per PR."
  },
  {
    id: "p2",
    name: "Dashboard Analitik",
    description: "Dashboard data dengan chart interaktif dan server-side rendering.",
    longDescription: "Dashboard analytics real-time yang menampilkan data bisnis dengan visualisasi interaktif. Mendukung filtering, export data, dan custom date ranges.",
    techStack: ["Next.js", "D3.js", "Zustand", "React Query"],
    year: 2025,
    challenges: [
      "Rendering dataset besar (10k+ data points) tanpa lag",
      "State management yang complex untuk multiple filters",
      "Real-time updates tanpa full page refresh"
    ],
    solutions: [
      "Implementasi virtual scrolling dan data windowing untuk large datasets",
      "Menggunakan Zustand untuk global state dengan middleware untuk persistence",
      "WebSocket integration dengan React Query untuk cache management"
    ],
    architecture: "Frontend: Next.js dengan React Query untuk data fetching.\nState: Zustand untuk global state, React Hook Form untuk form state.\nCharts: D3.js untuk custom visualizations dengan SVG rendering."
  },
  {
    id: "p3",
    name: "Service Worker Toolkit",
    description: "Library kecil untuk caching strategis di PWA.",
    longDescription: "Toolkit open-source yang mempermudah implementasi service worker patterns untuk Progressive Web Apps. Menyediakan helper functions untuk common caching strategies.",
    techStack: ["TypeScript", "Vite", "Vitest", "Workbox"],
    repoUrl: "https://github.com/example/sw-toolkit",
    year: 2023,
    featured: true,
    challenges: [
      "Abstraksi yang simple tapi tetap flexible untuk different use cases",
      "Testing service worker behavior yang asynchronous",
      "Bundle size yang minimal untuk library"
    ],
    solutions: [
      "API design yang composable dengan clear separation of concerns",
      "Mock service worker environment untuk unit testing",
      "Tree-shaking friendly exports dengan zero dependencies"
    ],
    architecture: "Core: TypeScript dengan strict mode.\nBuild: Vite untuk bundling dengan multiple output formats (ESM, CJS, UMD).\nTesting: Vitest dengan custom service worker mocks."
  },
];
