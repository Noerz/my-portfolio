"use client";

import { useEffect, useRef, ReactNode } from "react";

interface AnimateOnScrollProps {
  children: ReactNode;
  animation?: "fade-up" | "fade-in" | "slide-left" | "slide-right" | "scale" | "fade-down";
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

export function AnimateOnScroll({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 600,
  threshold = 0.1,
  className = "",
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              element.classList.add("aos-animate");
            }, delay);
            observer.unobserve(element);
          }
        });
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [delay, threshold]);

  const animationClass = `aos-${animation}`;

  return (
    <div
      ref={ref}
      className={`aos-element ${animationClass} ${className}`}
      style={{ 
        animationDuration: `${duration}ms`,
        animationFillMode: "both"
      }}
    >
      {children}
    </div>
  );
}
