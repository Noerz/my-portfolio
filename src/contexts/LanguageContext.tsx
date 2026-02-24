"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "id" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  id: {
    // Navbar
    "nav.about": "Tentang",
    "nav.projects": "Proyek",
    "nav.skills": "Keahlian",
    "nav.experience": "Pengalaman",
    "nav.blog": "Blog",
    "nav.contact": "Kontak",
    
    // Hero
    "hero.greeting": "Halo, saya",
    "hero.role": "Full-Stack Developer",
    "hero.summary": "Membangun aplikasi yang cepat, scalable, dan user-friendly dengan teknologi modern.",
    "hero.viewProjects": "Lihat Proyek",
    "hero.contact": "Hubungi Saya",
    "hero.downloadCV": "Unduh CV",
    "hero.cvIndonesia": "CV Indonesia",
    "hero.cvEnglish": "CV English",
    
    // Skills Descriptions
    "skills.desc.javascript": "ES6+, async/await, dan modular JS untuk aplikasi web.",
    "skills.desc.typescript": "Typing statis, interface, dan generics untuk codebase scalable.",
    "skills.desc.dart": "Dasar sintaks dan OOP untuk pengembangan Flutter.",
    
    // About
    "about.title": "Tentang Saya",
    "about.intro1": "Halo! Saya seorang Backend Developer yang berfokus membangun sistem yang andal dan efisien, dengan ketertarikan pada pengembangan aplikasi mobile untuk menghadirkan pengalaman yang mulus bagi pengguna.",
    "about.intro2": "Perjalanan coding saya dimulai dari rasa penasaran: \"Bagaimana website ini bisa kerja?\" Sampai sekarang, rasa penasaran itu masih jadi bahan bakar utama saya. Setiap bug adalah teka-teki, setiap fitur baru adalah petualangan.",
    "about.philosophy": "Filosofi Kerja",
    "about.philosophyDesc": "Code yang clean bukan cuma soal estetika, tapi tentang empati ke developer lain (termasuk diri sendiri 6 bulan ke depan). SOLID principles dan component reusability adalah sahabat baik saya.",
    "about.approach": "Pendekatan",
    "about.approachDesc": "Saya percaya pada iterasi cepat dan feedback loop yang pendek. Test dulu, deploy dengan percaya diri, dan selalu siap belajar dari production (tapi jangan sampai production jadi tempat belajar).",
    
    // Skills
    "skills.title": "Keahlian Teknis",
    "skills.language": "Bahasa Pemrograman",
    "skills.framework": "Framework & Library",
    "skills.tool": "Tools & Platform",
    "skills.database": "Database",
    "skills.other": "Lainnya",
    
    // Projects
    "projects.title": "Proyek Unggulan",
    "projects.viewAll": "Lihat Semua",
    "projects.viewProject": "Lihat Proyek",
    "projects.viewCode": "Lihat Kode",
    "projects.backToHome": "Kembali ke Beranda",
    "projects.backToPortfolio": "Kembali ke Portfolio",
    "projects.overview": "Gambaran Umum",
    "projects.challenges": "Tantangan Teknis",
    "projects.solutions": "Solusi & Pendekatan",
    "projects.architecture": "Arsitektur",
    "projects.techStack": "Tech Stack",
    "projects.allProjects": "Semua Proyek",
    "projects.allProjectsDesc": "Koleksi lengkap proyek yang telah saya kerjakan. Dari landing page modern hingga aplikasi web yang kompleks.",
    "projects.projectCount": "proyek",
    "projects.noProjects": "Belum ada proyek yang ditampilkan.",
    "projects.viewOthers": "Lihat Proyek Lainnya",
    "projects.detail": "Detail",
    "projects.repo": "Repo",
    "projects.live": "Live",
    "projects.featured": "Featured",
    "projects.viewRepo": "View Repository",
    "projects.liveDemo": "Live Demo",
    
    // Experience
    "experience.title": "Pengalaman",
    "experience.achievements": "Kontribusi & Pencapaian:",
    "experience.present": "Sekarang",
    
    // Experience Details - MycloudIndo
    "exp.mycloudindo.desc": "Mengembangkan dan memelihara tiga proyek backend menggunakan Express.js, NestJS, dan Golang, dengan fokus pada konsistensi arsitektur dan performa sistem.",
    "exp.mycloudindo.ach1": "Merancang dan membangun sistem baru yang scalable dan maintainable, serta melakukan refactor terhadap sistem lama untuk meningkatkan efisiensi dan kestabilan.",
    "exp.mycloudindo.ach2": "Mengoptimalkan query database dan struktur API yang menghasilkan peningkatan performa sistem hingga 40% lebih cepat pada beberapa modul utama.",
    "exp.mycloudindo.ach3": "Menerapkan praktik clean code, error handling yang konsisten, serta logging & monitoring terpusat untuk menjaga reliability sistem produksi.",
    "exp.mycloudindo.ach4": "Mengimplementasikan microservices architecture, mempercepat proses pengembangan lintas tim dan mempermudah integrasi antar modul.",
    "exp.mycloudindo.ach5": "Berpartisipasi dalam proses deployment ke server produksi menggunakan PM2 untuk manajemen proses dan Docker untuk containerization, memastikan environment berjalan konsisten dan mudah di-scale.",
    
    // Experience Details - Elang System
    "exp.elangsystem.desc": "Mengintegrasikan RESTful API yang meningkatkan kecepatan respons server sebesar 25%.",
    "exp.elangsystem.ach1": "Mengembangkan aplikasi mobile multiplatform dengan FlutterFlow, mengurangi waktu pengembangan hingga 30%.",
    "exp.elangsystem.ach2": "Berkontribusi dalam desain arsitektur aplikasi dan pembuatan dokumentasi teknis untuk memastikan skalabilitas dan kemudahan maintenance jangka panjang.",
    
    // Experience Details - Kampus Gratis
    "exp.kampusgratis.desc": "Membuat desain antarmuka pengguna menggunakan Figma secara efisien.",
    "exp.kampusgratis.ach1": "Mengimplementasikan API untuk integrasi data.",
    "exp.kampusgratis.ach2": "Membangun aplikasi menggunakan Flutter dengan manajemen state GetX.",
    "exp.kampusgratis.ach3": "Melakukan pengujian aplikasi untuk memastikan kualitas dan performa.",
    
    // Experience Details - SMK Prisma
    "exp.smkprisma.desc": "Mengajarkan materi seperti Jaringan Komputer Dasar, Pemograman Dasar, Administrasi Sistem Jaringan, serta Teknologi Layanan Jaringan kepada para murid.",
    "exp.smkprisma.ach1": "Mengelola laboratorium untuk praktek siswa.",
    "exp.smkprisma.ach2": "Memasang infrastruktur jaringan untuk kebutuhan sekolah.",
    
    // Blog
    "blog.title": "Blog & Tulisan",
    "blog.readMore": "Baca Selengkapnya",
    "blog.viewAll": "Lihat Semua",
    "blog.backToHome": "Kembali ke Beranda",
    "blog.allPosts": "Semua Tulisan",
    "blog.search": "Cari artikel...",
    "blog.filterByTag": "Filter berdasarkan tag",
    "blog.allTags": "Semua Tag",
    
    // Contact
    "contact.title": "Kontak",
    "contact.description": "Silakan hubungi saya untuk kolaborasi atau diskusi teknologi.",
    "contact.email": "Email",
    "contact.github": "GitHub",
    "contact.linkedin": "LinkedIn",
    "contact.profile": "Mustaqim Pratama",
    
    // Footer
    "footer.builtWith": "Dibuat dengan",
    "footer.and": "dan",
    "footer.allRightsReserved": "Hak Cipta Dilindungi.",
  },
  en: {
    // Navbar
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.skills": "Skills",
    "nav.experience": "Experience",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    
    // Hero
    "hero.greeting": "Hi, I'm",
    "hero.role": "Full-Stack Developer",
    "hero.summary": "Building fast, scalable, and user-friendly applications with modern technology.",
    "hero.viewProjects": "View Projects",
    "hero.contact": "Contact Me",
    "hero.downloadCV": "Download CV",
    "hero.cvIndonesia": "CV Indonesia",
    "hero.cvEnglish": "CV English",
    
    // Skills Descriptions
    "skills.desc.javascript": "ES6+, async/await, and modular JS for web applications.",
    "skills.desc.typescript": "Static typing, interfaces, and generics for scalable codebase.",
    "skills.desc.dart": "Basic syntax and OOP for Flutter development.",
    
    // About
    "about.title": "About Me",
    "about.intro1": "Hello! I'm a developer passionate about creating web applications that not only work, but also provide a delightful experience for users.",
    "about.intro2": "My coding journey started from curiosity: \"How does this website work?\" To this day, that curiosity remains my main fuel. Every bug is a puzzle, every new feature is an adventure.",
    "about.philosophy": "Work Philosophy",
    "about.philosophyDesc": "Clean code isn't just about aesthetics, it's about empathy for other developers (including your future self 6 months from now). SOLID principles and component reusability are my good friends.",
    "about.approach": "Approach",
    "about.approachDesc": "I believe in fast iteration and short feedback loops. Test first, deploy with confidence, and always be ready to learn from production (but don't let production become a learning ground).",
    
    // Skills
    "skills.title": "Technical Skills",
    "skills.language": "Programming Languages",
    "skills.framework": "Frameworks & Libraries",
    "skills.tool": "Tools & Platforms",
    "skills.database": "Databases",
    "skills.other": "Others",
    
    // Projects
    "projects.title": "Featured Projects",
    "projects.viewAll": "View All",
    "projects.viewProject": "View Project",
    "projects.viewCode": "View Code",
    "projects.backToHome": "Back to Home",
    "projects.backToPortfolio": "Back to Portfolio",
    "projects.overview": "Overview",
    "projects.challenges": "Technical Challenges",
    "projects.solutions": "Solutions & Approach",
    "projects.architecture": "Architecture",
    "projects.techStack": "Tech Stack",
    "projects.allProjects": "All Projects",
    "projects.allProjectsDesc": "Complete collection of projects I've worked on. From modern landing pages to complex web applications.",
    "projects.projectCount": "projects",
    "projects.noProjects": "No projects to display yet.",
    "projects.viewOthers": "View Other Projects",
    "projects.detail": "Detail",
    "projects.repo": "Repo",
    "projects.live": "Live",
    "projects.featured": "Featured",
    "projects.viewRepo": "View Repository",
    "projects.liveDemo": "Live Demo",
    
    // Experience
    "experience.title": "Experience",
    "experience.achievements": "Contributions & Achievements:",
    "experience.present": "Present",
    
    // Experience Details - MycloudIndo
    "exp.mycloudindo.desc": "Developing and maintaining three backend projects using Express.js, NestJS, and Golang, focusing on architectural consistency and system performance.",
    "exp.mycloudindo.ach1": "Designed and built new scalable and maintainable systems, and refactored legacy systems to improve efficiency and stability.",
    "exp.mycloudindo.ach2": "Optimized database queries and API structure, resulting in up to 40% faster performance in key system modules.",
    "exp.mycloudindo.ach3": "Implemented clean code practices, consistent error handling, and centralized logging & monitoring to maintain production system reliability.",
    "exp.mycloudindo.ach4": "Implemented microservices architecture, accelerating cross-team development and simplifying inter-module integration.",
    "exp.mycloudindo.ach5": "Participated in production server deployment using PM2 for process management and Docker for containerization, ensuring consistent and easily scalable environments.",
    
    // Experience Details - Elang System
    "exp.elangsystem.desc": "Integrated RESTful APIs, improving server response speed by 25%.",
    "exp.elangsystem.ach1": "Developed cross-platform mobile applications with FlutterFlow, reducing development time by 30%.",
    "exp.elangsystem.ach2": "Contributed to application architecture design and technical documentation to ensure long-term scalability and ease of maintenance.",
    
    // Experience Details - Kampus Gratis
    "exp.kampusgratis.desc": "Created user interface designs efficiently using Figma.",
    "exp.kampusgratis.ach1": "Implemented APIs for data integration.",
    "exp.kampusgratis.ach2": "Built applications using Flutter with GetX state management.",
    "exp.kampusgratis.ach3": "Conducted application testing to ensure quality and performance.",
    
    // Experience Details - SMK Prisma
    "exp.smkprisma.desc": "Taught subjects such as Basic Computer Networks, Basic Programming, Network System Administration, and Network Service Technology to students.",
    "exp.smkprisma.ach1": "Managed laboratory for student practice.",
    "exp.smkprisma.ach2": "Installed network infrastructure for school needs.",
    
    // Blog
    "blog.title": "Blog & Articles",
    "blog.readMore": "Read More",
    "blog.viewAll": "View All",
    "blog.backToHome": "Back to Home",
    "blog.allPosts": "All Articles",
    "blog.search": "Search articles...",
    "blog.filterByTag": "Filter by tag",
    "blog.allTags": "All Tags",
    
    // Contact
    "contact.title": "Contact",
    "contact.description": "Feel free to reach out for collaboration or tech discussions.",
    "contact.email": "Email",
    "contact.github": "GitHub",
    "contact.linkedin": "LinkedIn",
    "contact.profile": "Mustaqim Pratama",
    
    // Footer
    "footer.builtWith": "Built with",
    "footer.and": "and",
    "footer.allRightsReserved": "All Rights Reserved.",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("id");

  useEffect(() => {
    // Load language from localStorage
    const savedLang = localStorage.getItem("language") as Language;
    if (savedLang && (savedLang === "id" || savedLang === "en")) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.id] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
