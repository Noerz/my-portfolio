"use client";

import { useLanguage } from "@/contexts/LanguageContext";

interface FooterProps {
  ownerName: string;
}

export function Footer({ ownerName }: FooterProps) {
  const { t } = useLanguage();
  
  return (
    <footer className="mt-auto relative">
      {/* Shimmer gradient line */}
      <div className="footer-shimmer-line" />
      
      <div className="py-12 text-center text-sm text-zinc-500 dark:text-zinc-400">
        <p className="opacity-0 animate-fade-in">
          © {new Date().getFullYear()} {ownerName}. {t("footer.builtWith")}{" "}
          <span className="inline-block animate-subtle-float">❤️</span>{" "}
          {t("footer.and")} Next.js
        </p>
      </div>
    </footer>
  );
}
