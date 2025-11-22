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
      summary:
        "Membangun aplikasi yang cepat, scalable, dan user-friendly dengan teknologi modern.",
      bio: "Di luar pekerjaan, saya senang mengeksplorasi teknologi dan tools terbaru, serta membagikan wawasan melalui tulisan di blog. Pencinta kopi dan kadang menjadi debugger dini hari ketika ide tiba-tiba muncul.",
      avatarUrl: "/avatar.png", // Ganti dengan path avatar Anda
      email: "mustaqimpratama0@gmail.com",
      github: "https://github.com/Noerz",
      linkedin: "https://www.linkedin.com/in/mustaqimpratama/",
    },
    projects: projects,
    skills: [
      // Languages
      { name: "JavaScript", category: "language", level: "advanced" },
      { name: "TypeScript", category: "language", level: "advanced" },
      { name: "Golang", category: "language", level: "intermediate" },
      { name: "Dart", category: "language", level: "intermediate" },
      { name: "HTML/CSS", category: "language", level: "expert" },

      // Frameworks & Libraries
      { name: "Flutter", category: "framework", level: "advanced" },
      { name: "Node.js", category: "framework", level: "advanced" },
      { name: "Next.js", category: "framework", level: "intermediate" },
      { name: "Express", category: "framework", level: "intermediate" },
      { name: "Tailwind CSS", category: "framework", level: "advanced" },

      // Tools & Platforms
      { name: "Git & GitHub", category: "tool", level: "advanced" },
      { name: "VS Code", category: "tool", level: "expert" },
      { name: "Docker", category: "tool", level: "intermediate" },
      { name: "RabbitMQ", category: "tool", level: "advanced" },
      { name: "Figma", category: "tool", level: "intermediate" },
      { name: "Postman", category: "tool", level: "intermediate" },
      { name: "Hoppscotch", category: "tool", level: "intermediate" },

      // Databases
      { name: "PostgreSQL", category: "database", level: "intermediate" },
      { name: "MongoDB", category: "database", level: "intermediate" },
      { name: "Redis", category: "database", level: "beginner" },
      { name: "Prisma", category: "database", level: "intermediate" },
    ],
    experiences: [
      {
        id: "exp-1",
        company: "MyCloudIndo",
        position: "Backend Developer",
        duration: "Mei 2025 - Sekarang",
        location: "OnSite - BSD City, Tangerang",
        description:
          "Mengembangkan dan memelihara sistem backend yang andal, efisien, dan scalable untuk mendukung kebutuhan layanan aplikasi perusahaan.",
        achievements: [
          "Mengurangi waktu loading pada jam sibuk hingga 30% melalui optimasi query database dan penerapan caching.",
          "Menerapkan design system yang meningkatkan konsistensi UI/UX di seluruh platform.",
          "Mengoptimalkan codebase dengan refactoring dan pengenalan best practices, mengurangi technical debt sebesar 25%.",
        ],
        technologies: ["Express.js", "NestJS", "Golang", "PostgreSQL", "Redis"],
      },

      {
        id: "exp-2",
        company: "Startup XYZ",
        position: "Full-Stack Developer Intern",
        duration: "Jun 2022 - Des 2022",
        location: "Jakarta",
        description:
          "Berkontribusi dalam pengembangan fitur baru dan maintenance aplikasi existing.",
        achievements: [
          "Develop REST API untuk sistem manajemen user dengan Node.js dan Express",
          "Implementasi authentication dan authorization menggunakan JWT",
          "Kolaborasi dengan tim design untuk implementasi UI/UX yang responsive",
        ],
        technologies: ["Node.js", "Express", "MongoDB", "React", "Material-UI"],
      },
    ],
    blogs: [
      {
        id: "blog-1",
        title: "Debugging di 3AM: Kisah Bug yang Berubah Jadi Fitur",
        excerpt:
          "Cerita absurd tentang bug production yang ternyata jadi fitur favorit user. Lesson learned: kadang user lebih kreatif dari kita.",
        date: "2024-11-15",
        slug: "debugging-di-3am",
        tags: ["debugging", "story", "lesson-learned"],
        readTime: "5 min",
      },
      {
        id: "blog-2",
        title: "TypeScript vs JavaScript: Drama yang Tidak Perlu",
        excerpt:
          "Perbandingan objektif (dan sedikit subjektif) antara TypeScript dan JavaScript. Spoiler: keduanya punya tempat masing-masing.",
        date: "2024-11-10",
        slug: "typescript-vs-javascript",
        tags: ["typescript", "javascript", "opinion"],
        readTime: "7 min",
      },
      {
        id: "blog-3",
        title: "React Server Components: Hype atau Game Changer?",
        excerpt:
          "Deep dive ke React Server Components dan bagaimana ini mengubah cara kita berpikir tentang rendering di React.",
        date: "2024-11-05",
        slug: "react-server-components",
        tags: ["react", "nextjs", "performance"],
        readTime: "10 min",
      },
      {
        id: "blog-4",
        title: "Web Performance 101: Cara Bikin Website Secepat Kilat",
        excerpt:
          "Tips dan trik praktis untuk optimasi web performance dari lazy loading sampai code splitting.",
        date: "2024-10-28",
        slug: "web-performance-101",
        tags: ["performance", "optimization", "tutorial"],
        readTime: "8 min",
      },
      {
        id: "blog-5",
        title: "State Management di React: Redux vs Zustand vs Context API",
        excerpt:
          "Perbandingan mendalam antara berbagai solusi state management untuk aplikasi React modern.",
        date: "2024-10-20",
        slug: "state-management-comparison",
        tags: ["react", "state-management", "tutorial"],
        readTime: "12 min",
      },
      {
        id: "blog-6",
        title: "Microservices vs Monolith: Kapan Harus Pakai Yang Mana?",
        excerpt:
          "Panduan memilih arsitektur yang tepat untuk aplikasi Anda berdasarkan scale dan kompleksitas.",
        date: "2024-10-15",
        slug: "microservices-vs-monolith",
        tags: ["architecture", "backend", "opinion"],
        readTime: "9 min",
      },
      {
        id: "blog-7",
        title: "Docker untuk Developer: Getting Started Guide",
        excerpt:
          "Tutorial lengkap menggunakan Docker untuk development environment yang konsisten dan reproducible.",
        date: "2024-10-08",
        slug: "docker-getting-started",
        tags: ["docker", "devops", "tutorial"],
        readTime: "15 min",
      },
      {
        id: "blog-8",
        title: "CSS Grid vs Flexbox: Mana yang Harus Dipakai?",
        excerpt:
          "Penjelasan kapan menggunakan CSS Grid dan kapan Flexbox untuk layout yang optimal.",
        date: "2024-09-30",
        slug: "css-grid-vs-flexbox",
        tags: ["css", "frontend", "tutorial"],
        readTime: "6 min",
      },
      {
        id: "blog-9",
        title: "API Design Best Practices: RESTful vs GraphQL",
        excerpt:
          "Tips merancang API yang maintainable dan developer-friendly dengan REST atau GraphQL.",
        date: "2024-09-22",
        slug: "api-design-best-practices",
        tags: ["api", "backend", "best-practices"],
        readTime: "11 min",
      },
      {
        id: "blog-10",
        title: "Testing di JavaScript: Unit, Integration, dan E2E",
        excerpt:
          "Panduan lengkap testing strategy untuk aplikasi JavaScript modern dengan Jest dan Playwright.",
        date: "2024-09-15",
        slug: "javascript-testing-guide",
        tags: ["testing", "javascript", "tutorial"],
        readTime: "13 min",
      },
    ],
  };
});
