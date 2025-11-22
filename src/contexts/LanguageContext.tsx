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
    
    // About
    "about.title": "Tentang Saya",
    "about.intro1": "Halo! Saya seorang developer yang passionate dalam menciptakan aplikasi web yang tidak hanya berfungsi, tapi juga memberikan pengalaman yang menyenangkan bagi penggunanya.",
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
    "projects.overview": "Gambaran Umum",
    "projects.challenges": "Tantangan",
    "projects.solutions": "Solusi",
    "projects.architecture": "Arsitektur",
    "projects.techStack": "Tech Stack",
    
    // Experience
    "experience.title": "Pengalaman",
    "experience.achievements": "Kontribusi & Pencapaian:",
    "experience.present": "Sekarang",
    
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
    "contact.description": "Silakan hubungi saya untuk kolaborasi atau diskusi teknologi. Kopi virtual juga boleh! ☕",
    "contact.email": "Email",
    "contact.github": "GitHub",
    "contact.linkedin": "LinkedIn",
    "contact.profile": "Profil",
    
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
    "projects.overview": "Overview",
    "projects.challenges": "Challenges",
    "projects.solutions": "Solutions",
    "projects.architecture": "Architecture",
    "projects.techStack": "Tech Stack",
    
    // Experience
    "experience.title": "Experience",
    "experience.achievements": "Contributions & Achievements:",
    "experience.present": "Present",
    
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
    "contact.description": "Feel free to reach out for collaboration or tech discussions. Virtual coffee is welcome! ☕",
    "contact.email": "Email",
    "contact.github": "GitHub",
    "contact.linkedin": "LinkedIn",
    "contact.profile": "Profile",
    
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
