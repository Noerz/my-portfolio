"use client";

import { ReactNode } from "react";

interface ShimmerTextProps {
  children: ReactNode;
  className?: string;
  shimmerColor?: string;
  duration?: string;
}

export function ShimmerText({
  children,
  className = "",
  shimmerColor = "rgba(255,255,255,0.3)",
  duration = "3s",
}: ShimmerTextProps) {
  return (
    <span className={`relative inline-block ${className}`}>
      {children}
      <span
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(
            120deg,
            transparent 25%,
            ${shimmerColor} 37%,
            ${shimmerColor} 63%,
            transparent 75%
          )`,
          backgroundSize: "300% 100%",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          animation: `shimmer-slide ${duration} ease-in-out infinite`,
          mixBlendMode: "overlay",
        }}
        aria-hidden="true"
      >
        {children}
      </span>
    </span>
  );
}
