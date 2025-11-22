import { PortfolioData } from "@/types/portfolio";
import { projects } from "@/data/projects";
import { cache } from "react";

// Future: replace with real fetch to backend
// Example: await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/portfolio`).then(r => r.json())
// Keep pure & SRP: function only responsible to retrieve & shape data
export const getPortfolioData = cache(async (): Promise<PortfolioData> => {
  return {
    owner: {
      name: "Noerz",
      heroName: "Mustaqim Pratama Rahmadi", // alternate name shown in Hero section
      role: "Full-Stack Developer",
      location: "Indonesia",
      summary: "Membangun aplikasi yang cepat, scalable, dan user-friendly dengan teknologi modern.",
      bio: "Di luar ngoding, saya suka eksplorasi tool baru dan berbagi pengetahuan lewat blog. Coffee enthusiast dan occasional debugger di 3AM.",
      avatarUrl: "/avatar.png", // Ganti dengan path avatar Anda
      email: "mustaqimpratama0@gmail.com",
      github: "https://github.com/Noerz",
      linkedin: "https://www.linkedin.com/in/mustaqim-pratama",
    },
    projects: projects,
    skills: [
      // Languages
      { name: "JavaScript", category: "language", level: "advanced" },
      { name: "TypeScript", category: "language", level: "advanced" },
      { name: "Python", category: "language", level: "intermediate" },
      { name: "Java", category: "language", level: "intermediate" },
      { name: "HTML/CSS", category: "language", level: "expert" },
      
      // Frameworks & Libraries
      { name: "React", category: "framework", level: "advanced" },
      { name: "Next.js", category: "framework", level: "advanced" },
      { name: "Node.js", category: "framework", level: "intermediate" },
      { name: "Express", category: "framework", level: "intermediate" },
      { name: "Tailwind CSS", category: "framework", level: "advanced" },
      { name: "Redux", category: "framework", level: "intermediate" },
      
      // Tools & Platforms
      { name: "Git & GitHub", category: "tool", level: "advanced" },
      { name: "VS Code", category: "tool", level: "expert" },
      { name: "Docker", category: "tool", level: "intermediate" },
      { name: "Vercel", category: "tool", level: "advanced" },
      { name: "Figma", category: "tool", level: "intermediate" },
      { name: "Postman", category: "tool", level: "intermediate" },
      
      // Databases
      { name: "PostgreSQL", category: "database", level: "intermediate" },
      { name: "MongoDB", category: "database", level: "intermediate" },
      { name: "Redis", category: "database", level: "beginner" },
      { name: "Prisma", category: "database", level: "intermediate" },
    ],
    experiences: [
      {
        id: "exp-1",
        company: "Tech Company Inc.",
        position: "Frontend Developer",
        duration: "Jan 2023 - Sekarang",
        location: "Remote",
        description: "Membangun dan maintain aplikasi web modern dengan fokus pada user experience dan performance optimization.",
        achievements: [
          "Mengurangi loading time halaman utama sebesar 40% dengan code splitting dan lazy loading",
          "Implementasi design system yang meningkatkan konsistensi UI/UX di seluruh platform",
          "Memimpin migrasi dari JavaScript ke TypeScript untuk meningkatkan code quality"
        ],
        technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux"]
      },
      {
        id: "exp-2",
        company: "Startup XYZ",
        position: "Full-Stack Developer Intern",
        duration: "Jun 2022 - Des 2022",
        location: "Jakarta",
        description: "Berkontribusi dalam pengembangan fitur baru dan maintenance aplikasi existing.",
        achievements: [
          "Develop REST API untuk sistem manajemen user dengan Node.js dan Express",
          "Implementasi authentication dan authorization menggunakan JWT",
          "Kolaborasi dengan tim design untuk implementasi UI/UX yang responsive"
        ],
        technologies: ["Node.js", "Express", "MongoDB", "React", "Material-UI"]
      }
    ],
    blogs: [
      {
        id: "blog-1",
        title: "Debugging di 3AM: Kisah Bug yang Berubah Jadi Fitur",
        excerpt: "Cerita absurd tentang bug production yang ternyata jadi fitur favorit user. Lesson learned: kadang user lebih kreatif dari kita.",
        date: "2024-11-15",
        slug: "debugging-di-3am",
        tags: ["debugging", "story", "lesson-learned"],
        readTime: "5 min"
      },
      {
        id: "blog-2",
        title: "TypeScript vs JavaScript: Drama yang Tidak Perlu",
        excerpt: "Perbandingan objektif (dan sedikit subjektif) antara TypeScript dan JavaScript. Spoiler: keduanya punya tempat masing-masing.",
        date: "2024-11-10",
        slug: "typescript-vs-javascript",
        tags: ["typescript", "javascript", "opinion"],
        readTime: "7 min"
      },
      {
        id: "blog-3",
        title: "React Server Components: Hype atau Game Changer?",
        excerpt: "Deep dive ke React Server Components dan bagaimana ini mengubah cara kita berpikir tentang rendering di React.",
        date: "2024-11-05",
        slug: "react-server-components",
        tags: ["react", "nextjs", "performance"],
        readTime: "10 min"
      }
    ]
  };
});
