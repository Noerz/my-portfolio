'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (!cursorRef.current) {
        return;
      }

      cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      setHidden(false);
    };

    const hide = () => setHidden(true);
    const show = () => setHidden(false);

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', hide);
    document.addEventListener('mouseenter', show);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', hide);
      document.removeEventListener('mouseenter', show);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`
        fixed pointer-events-none z-[9999]
        w-5 h-5 rounded-full
        -translate-x-1/2 -translate-y-1/2
        transition-opacity duration-150
        ${hidden ? 'opacity-0' : 'opacity-100'}
        bg-white mix-blend-difference
      `}
    />
  );
}
