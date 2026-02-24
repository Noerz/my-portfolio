import { PortfolioData } from "@/types/portfolio";
import { projects } from "@/data/projects";
import { getBlogPosts } from "@/lib/blogContent";
import { cache } from "react";

// Future: replace with real fetch to backend
// Example: await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/portfolio`).then(r => r.json())
// Keep pure & SRP: function only responsible to retrieve & shape data
export const getPortfolioData = cache(async (): Promise<PortfolioData> => {
  const blogs = await getBlogPosts();

  return {
    owner: {
      name: "Noerz",
      heroName: "Mustaqim Pratama Rahmadi", // alternate name shown in Hero section
      role: "Full-Stack Developer",
      location: "Indonesia",
      summary:
        "Membangun aplikasi yang cepat, scalable, dan user-friendly dengan teknologi modern.",
      avatarUrl: "/avatar.png", // Ganti dengan path avatar Anda
      email: "mustaqimpratama0@gmail.com",
      github: "https://github.com/Noerz",
      linkedin: "https://www.linkedin.com/in/mustaqimpratama/",
    },
    projects: projects,
    skills: [
      // Languages
      {
        name: "JavaScript",
        category: "language",
        description: "ES6+, async/await, dan modular JS untuk aplikasi web.",
      },
      {
        name: "TypeScript",
        category: "language",
        description: "Typing statis, interface, dan generics untuk codebase scalable.",
      },
      {
        name: "Dart",
        category: "language",
        description: "Dasar sintaks dan OOP untuk pengembangan Flutter.",
      },

      // Frontend & Mobile
      { name: "Flutter", category: "framework" },
      { name: "Next.js", category: "framework" },

      // Backend
      { name: "Node.js", category: "framework" },
      { name: "Express.js", category: "framework" },
      { name: "Microservices Architecture", category: "other" },

      // Database
      { name: "MySQL", category: "database" },
      { name: "PostgreSQL", category: "database" },
      { name: "Firebase", category: "database" },
      { name: "MongoDB", category: "database" },

      // Testing & Tools
      { name: "Postman", category: "tool" },
      { name: "Git", category: "tool" },
      { name: "Docker", category: "tool" },
      { name: "Hoppscotch", category: "tool" },

      // Design
      { name: "UI/UX", category: "other" },
      { name: "Figma", category: "other" },

      // Other Languages
      { name: "Golang (Fundamental)", category: "language" },
    ],
    experiences: [
      {
        id: "exp-1",
        company: "MycloudIndo",
        position: "Backend Developer",
        duration: "Mei 2025 - Sekarang",
        location: "BSD",
        description:
          "Mengembangkan dan memelihara tiga proyek backend menggunakan Express.js, NestJS, dan Golang, dengan fokus pada konsistensi arsitektur dan performa sistem.",
        achievements: [
          "Merancang dan membangun sistem baru yang scalable dan maintainable, serta melakukan refactor terhadap sistem lama untuk meningkatkan efisiensi dan kestabilan.",
          "Mengoptimalkan query database dan struktur API yang menghasilkan peningkatan performa sistem hingga 40% lebih cepat pada beberapa modul utama.",
          "Menerapkan praktik clean code, error handling yang konsisten, serta logging & monitoring terpusat untuk menjaga reliability sistem produksi.",
          "Mengimplementasikan microservices architecture, mempercepat proses pengembangan lintas tim dan mempermudah integrasi antar modul.",
          "Berpartisipasi dalam proses deployment ke server produksi menggunakan PM2 untuk manajemen proses dan Docker untuk containerization, memastikan environment berjalan konsisten dan mudah di-scale.",
        ],
        technologies: ["Express.js", "NestJS", "Golang", "PM2", "Docker"],
      },
      {
        id: "exp-2",
        company: "Elang System Solusi Indonesia",
        position: "Mobile Developer",
        duration: "Feb 2024 - September 2024",
        location: "Depok",
        description:
          "Mengintegrasikan RESTful API yang meningkatkan kecepatan respons server sebesar 25%.",
        achievements: [
          "Mengembangkan aplikasi mobile multiplatform dengan FlutterFlow, mengurangi waktu pengembangan hingga 30%.",
          "Berkontribusi dalam desain arsitektur aplikasi dan pembuatan dokumentasi teknis untuk memastikan skalabilitas dan kemudahan maintenance jangka panjang.",
        ],
        technologies: ["FlutterFlow", "REST API"],
      },
      {
        id: "exp-3",
        company: "Kampus Gratis",
        position: "Apps Developer",
        duration: "Agustus 2022 - Desember 2022",
        location: "Jakarta Selatan",
        description: "Membuat desain antarmuka pengguna menggunakan Figma secara efisien.",
        achievements: [
          "Mengimplementasikan API untuk integrasi data.",
          "Membangun aplikasi menggunakan Flutter dengan manajemen state GetX.",
          "Melakukan pengujian aplikasi untuk memastikan kualitas dan performa.",
        ],
        technologies: ["Figma", "Flutter", "GetX"],
      },
      {
        id: "exp-4",
        company: "SMK Prisma",
        position: "Tenaga Pengajar Kompetensi TKJ",
        duration: "Juni 2020 - Juli 2022",
        location: "Depok",
        description:
          "Mengajarkan materi seperti Jaringan Komputer Dasar, Pemograman Dasar, Administrasi Sistem Jaringan, serta Teknologi Layanan Jaringan kepada para murid.",
        achievements: [
          "Mengelola laboratorium untuk praktek siswa.",
          "Memasang infrastruktur jaringan untuk kebutuhan sekolah.",
        ],
      },
    ],
    blogs,
  };
});
