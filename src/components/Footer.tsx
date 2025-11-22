"use client";

import { useLanguage } from "@/contexts/LanguageContext";

interface FooterProps {
  ownerName: string;
}

export function Footer({ ownerName }: FooterProps) {
  const { t } = useLanguage();
  
  return (
    <footer className="mt-auto py-12 text-center text-sm text-zinc-500 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-800">
      <p className="opacity-0 animate-fade-in">
        © {new Date().getFullYear()} {ownerName}. {t("footer.builtWith")} ❤️ {t("footer.and")} Next.js
      </p>
    </footer>
  );
}
