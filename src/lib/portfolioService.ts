import { PortfolioData } from "@/types/portfolio";
import { projects } from "@/data/projects";
import { getBlogPosts } from "./blogContent";
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
      summary: "hero.summary",
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
        description: "skills.desc.javascript",
      },
      {
        name: "TypeScript",
        category: "language",
        description: "skills.desc.typescript",
      },
      {
        name: "Dart",
        category: "language",
        description: "skills.desc.dart",
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
        description: "exp.mycloudindo.desc",
        achievements: [
          "exp.mycloudindo.ach1",
          "exp.mycloudindo.ach2",
          "exp.mycloudindo.ach3",
          "exp.mycloudindo.ach4",
          "exp.mycloudindo.ach5",
        ],
        technologies: ["Express.js", "NestJS", "Golang", "PM2", "Docker"],
      },
      {
        id: "exp-2",
        company: "Elang System Solusi Indonesia",
        position: "Mobile Developer",
        duration: "Feb 2024 - September 2024",
        location: "Depok",
        description: "exp.elangsystem.desc",
        achievements: [
          "exp.elangsystem.ach1",
          "exp.elangsystem.ach2",
        ],
        technologies: ["FlutterFlow", "REST API"],
      },
      {
        id: "exp-3",
        company: "Kampus Gratis",
        position: "Apps Developer",
        duration: "Agustus 2022 - Desember 2022",
        location: "Jakarta Selatan",
        description: "exp.kampusgratis.desc",
        achievements: [
          "exp.kampusgratis.ach1",
          "exp.kampusgratis.ach2",
          "exp.kampusgratis.ach3",
        ],
        technologies: ["Figma", "Flutter", "GetX"],
      },
      {
        id: "exp-4",
        company: "SMK Prisma",
        position: "Tenaga Pengajar Kompetensi TKJ",
        duration: "Juni 2020 - Juli 2022",
        location: "Depok",
        description: "exp.smkprisma.desc",
        achievements: [
          "exp.smkprisma.ach1",
          "exp.smkprisma.ach2",
        ],
      },
    ],
    blogs,
  };
});
