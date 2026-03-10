"use client";

import { useEffect, useRef, useCallback } from "react";

interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  color?: string;
}

interface Particle {
  x: number;
  y: number;
  translateX: number;
  translateY: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  dx: number;
  dy: number;
  magnetism: number;
}

export function Particles({
  className = "",
  quantity = 50,
  staticity = 50,
  ease = 50,
  color = "#ffffff",
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const canvasSize = useRef({ w: 0, h: 0 });
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;

  const hexToRgb = (hex: string) => {
    hex = hex.replace("#", "");
    if (hex.length === 3) {
      hex = hex
        .split("")
        .map((c) => c + c)
        .join("");
    }
    const num = parseInt(hex, 16);
    return `${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}`;
  };

  const rgb = hexToRgb(color);

  const createParticle = useCallback((): Particle => {
    const w = canvasSize.current.w;
    const h = canvasSize.current.h;
    return {
      x: Math.floor(Math.random() * w),
      y: Math.floor(Math.random() * h),
      translateX: 0,
      translateY: 0,
      size: Math.floor(Math.random() * 2) + 0.5,
      alpha: 0,
      targetAlpha: parseFloat((Math.random() * 0.6 + 0.1).toFixed(1)),
      dx: (Math.random() - 0.5) * 0.2,
      dy: (Math.random() - 0.5) * 0.2,
      magnetism: 0.1 + Math.random() * 4,
    };
  }, []);

  const drawParticle = useCallback(
    (p: Particle) => {
      if (!context.current) return;
      const { x, y, translateX, translateY, size, alpha } = p;
      context.current.translate(translateX, translateY);
      context.current.beginPath();
      context.current.arc(x, y, size, 0, 2 * Math.PI);
      context.current.fillStyle = `rgba(${rgb}, ${alpha})`;
      context.current.fill();
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
    },
    [rgb, dpr]
  );

  const resizeCanvas = useCallback(() => {
    if (!canvasContainerRef.current || !canvasRef.current || !context.current) return;
    particles.current = [];
    canvasSize.current.w = canvasContainerRef.current.offsetWidth;
    canvasSize.current.h = canvasContainerRef.current.offsetHeight;
    canvasRef.current.width = canvasSize.current.w * dpr;
    canvasRef.current.height = canvasSize.current.h * dpr;
    canvasRef.current.style.width = `${canvasSize.current.w}px`;
    canvasRef.current.style.height = `${canvasSize.current.h}px`;
    context.current.scale(dpr, dpr);
    for (let i = 0; i < quantity; i++) {
      particles.current.push(createParticle());
    }
  }, [dpr, quantity, createParticle]);

  const animate = useCallback(() => {
    if (!context.current) return;
    context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);

    particles.current.forEach((p, i) => {
      const edge = [
        p.x + p.translateX - p.size,
        canvasSize.current.w - p.x - p.translateX - p.size,
        p.y + p.translateY - p.size,
        canvasSize.current.h - p.y - p.translateY - p.size,
      ];
      const closest = edge.reduce((a, b) => Math.min(a, b));
      const remapClosest = parseFloat(
        Math.min(Math.max(closest / 20, 0), 1).toFixed(2)
      );

      if (remapClosest > 1) {
        p.alpha += 0.02;
        if (p.alpha > p.targetAlpha) p.alpha = p.targetAlpha;
      } else {
        p.alpha = p.targetAlpha * remapClosest;
      }

      p.x += p.dx;
      p.y += p.dy;

      p.translateX +=
        (mouse.current.x / (staticity / p.magnetism) - p.translateX) / ease;
      p.translateY +=
        (mouse.current.y / (staticity / p.magnetism) - p.translateY) / ease;

      if (
        p.x < -p.size ||
        p.x > canvasSize.current.w + p.size ||
        p.y < -p.size ||
        p.y > canvasSize.current.h + p.size
      ) {
        particles.current[i] = createParticle();
        particles.current[i].alpha = 0;
      }

      drawParticle(p);
    });

    requestAnimationFrame(animate);
  }, [staticity, ease, createParticle, drawParticle]);

  useEffect(() => {
    if (!canvasRef.current) return;
    context.current = canvasRef.current.getContext("2d");
    resizeCanvas();
    animate();
    const handleResize = () => resizeCanvas();
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasContainerRef.current) return;
      const rect = canvasContainerRef.current.getBoundingClientRect();
      const { w, h } = canvasSize.current;
      const x = e.clientX - rect.left - w / 2;
      const y = e.clientY - rect.top - h / 2;
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      if (inside) {
        mouse.current.x = x;
        mouse.current.y = y;
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [resizeCanvas, animate]);

  return (
    <div ref={canvasContainerRef} className={`absolute inset-0 ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
