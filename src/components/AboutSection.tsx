import { Section } from "@/components/Section";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";

interface AboutSectionProps {
  bio?: string;
}

export function AboutSection({ bio }: AboutSectionProps) {
  return (
    <Section id="about" title="Tentang Saya">
      <div className="max-w-3xl mx-auto space-y-6">
        <AnimateOnScroll animation="fade-up" duration={600}>
          <div className="prose dark:prose-invert max-w-none text-sm md:text-base">
            <div className="bg-white dark:bg-gradient-to-br dark:from-zinc-900 dark:to-blue-950 p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <div className="text-4xl mb-4">
                <span
                  role="img"
                  aria-label="wave"
                  className="inline-block motion-safe:animate-bounce transform origin-bottom"
                >
                  👋
                </span>
              </div>
              <p className="leading-relaxed text-base mb-4 text-zinc-700 dark:text-zinc-300">
                Halo! Saya seorang developer yang berkomitmen untuk membangun
                aplikasi web yang tidak hanya berfungsi dengan baik, tetapi juga
                memberikan pengalaman yang intuitif dan menyenangkan bagi
                penggunanya.
              </p>
              <p className="leading-relaxed text-base mb-4">
                Ketertarikan saya pada dunia pemrograman berawal dari satu
                pertanyaan sederhana: “Bagaimana sebuah website bekerja?” Rasa
                ingin tahu itu berkembang menjadi dorongan untuk terus belajar
                dan menyelesaikan setiap tantangan—dari bug rumit hingga
                pengembangan fitur baru.
              </p>
              {bio && <p className="leading-relaxed text-base">{bio}</p>}
            </div>
          </div>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-2 gap-4">
          <AnimateOnScroll animation="slide-left" delay={100} duration={600}>
            <div className="bg-white dark:bg-gradient-to-br dark:from-purple-950 dark:to-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 h-full">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-bold text-lg mb-2 text-zinc-900 dark:text-zinc-100">
                Filosofi Kerja
              </h3>
              <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                Code yang clean bukan cuma soal estetika, tapi tentang empati ke
                developer lain (termasuk diri sendiri 6 bulan ke depan). SOLID
                principles dan component reusability adalah sahabat baik saya.
              </p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll animation="slide-right" delay={100} duration={600}>
            <div className="bg-white dark:bg-gradient-to-br dark:from-green-950 dark:to-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 h-full">
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="font-bold text-lg mb-2 text-zinc-900 dark:text-zinc-100">
                Pendekatan
              </h3>
              <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                Saya percaya pada iterasi cepat dan feedback loop yang pendek.
                Test dulu, deploy dengan percaya diri, dan selalu siap belajar
                dari production (tapi jangan sampai production jadi tempat
                belajar).
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </Section>
  );
}
