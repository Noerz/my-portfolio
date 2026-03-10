"use client";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
}

export function BorderBeam({
  className = "",
  size = 200,
  duration = 12,
  delay = 0,
  colorFrom = "#6366f1",
  colorTo = "#a855f7",
}: BorderBeamProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden ${className}`}
      style={{ zIndex: 1 }}
    >
      {/* Animated border using a rotating conic gradient behind the card */}
      <div
        className="absolute inset-0 rounded-[inherit]"
        style={{
          padding: "1.5px",
          background: `conic-gradient(from calc(var(--border-beam-angle, 0) * 1turn), transparent 60%, ${colorFrom}, ${colorTo}, transparent 90%)`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          animation: `border-beam-spin ${duration}s linear infinite`,
          animationDelay: `${delay}s`,
        }}
      />

      {/* Subtle glow that follows the beam */}
      <div
        className="absolute"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          background: `radial-gradient(circle, ${colorFrom}30 0%, transparent 70%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          animation: `border-beam-glow ${duration}s linear infinite`,
          animationDelay: `${delay}s`,
          filter: "blur(20px)",
          opacity: 0.4,
        }}
      />
    </div>
  );
}
