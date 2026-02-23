'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const speed = 1.25; // lebih cepat biar terasa ringan

  const [hidden, setHidden] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [pointer, setPointer] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };

      const target = e.target as HTMLElement;

      const clickable = Boolean(
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        window.getComputedStyle(target).cursor === 'pointer'
      );

      setPointer(clickable);
    };

    const clickDown = () => setClicked(true);
    const clickUp = () => setClicked(false);

    const hide = () => setHidden(true);
    const show = () => setHidden(false);

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mousedown', clickDown);
    document.addEventListener('mouseup', clickUp);
    document.addEventListener('mouseleave', hide);
    document.addEventListener('mouseenter', show);

    // Smooth trailing animation
    const follow = () => {
      const dx = mouse.current.x - ring.current.x;
      const dy = mouse.current.y - ring.current.y;

      ring.current.x += dx * speed;
      ring.current.y += dy * speed;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`;
      }

      requestAnimationFrame(follow);
    };
    follow();

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mousedown', clickDown);
      document.removeEventListener('mouseup', clickUp);
      document.removeEventListener('mouseleave', hide);
      document.removeEventListener('mouseenter', show);
    };
  }, []);

  return (
    <>
      {/* Cursor Dot */}
      <div
        ref={cursorRef}
        className={`
          fixed pointer-events-none z-[9999]
          w-5 h-5 rounded-full 
          -translate-x-1/2 -translate-y-1/2
          transition-all duration-100 
          ${hidden ? 'opacity-0' : 'opacity-100'}
          ${clicked ? 'scale-75' : 'scale-100'}
          bg-white mix-blend-difference
        `}
      />

      {/* Cursor Ring (Trailing) */}
      <div
        ref={ringRef}
        className={`
          fixed pointer-events-none z-[9998]
          w-10 h-10 rounded-full border-[2px]
          -translate-x-1/2 -translate-y-1/2
          transition-all duration-200 
          ${hidden ? 'opacity-0' : 'opacity-100'}
          ${pointer ? 'scale-[1.7] border-white/70' : 'scale-100 border-white/30'}
          ${clicked ? 'scale-90 border-white' : ''}
        `}
      />
    </>
  );
}
