"use client";

interface GlowingOrbProps {
  className?: string;
  color1?: string;
  color2?: string;
  size?: string;
  delay?: number;
  duration?: number;
}

export function GlowingOrb({
  className = "",
  color1 = "#6366f1",
  color2 = "#a855f7",
  size = "320px",
  delay = 0,
  duration = 12,
}: GlowingOrbProps) {
  return (
    <div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 50% 50%, ${color1}80, ${color2}40, transparent 70%)`,
        filter: "blur(60px)",
        animation: `orb-float ${duration}s ease-in-out infinite, orb-pulse ${duration * 0.8}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
      aria-hidden="true"
    />
  );
}
