"use client";

import { Particles } from "@/components/magicui/Particles";
import { GlowingOrb } from "@/components/magicui/GlowingOrb";

export function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Glowing orbs replacing static blobs */}
      <GlowingOrb
        className="-top-20 -right-20"
        color1="#3b82f6"
        color2="#06b6d4"
        size="350px"
        duration={14}
        delay={0}
      />
      <GlowingOrb
        className="-bottom-20 -left-20"
        color1="#8b5cf6"
        color2="#ec4899"
        size="350px"
        duration={16}
        delay={2}
      />
      <GlowingOrb
        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        color1="#ec4899"
        color2="#f97316"
        size="280px"
        duration={18}
        delay={4}
      />

      {/* Particle canvas */}
      <Particles
        className="opacity-60 dark:opacity-40"
        quantity={40}
        staticity={40}
        ease={60}
        color="#6366f1"
      />
    </div>
  );
}
