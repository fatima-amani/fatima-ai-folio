import { useRef, useState, useCallback } from 'react';

export function useSpotlight(hue = '207', opacity = '0.08') {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: -1, y: -1, active: false });

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top, active: true });
  }, []);

  const onMouseLeave = useCallback(() => {
    setPos({ x: -1, y: -1, active: false });
  }, []);

  const spotlightStyle: React.CSSProperties = pos.active
    ? {
        background: `radial-gradient(500px circle at ${pos.x}px ${pos.y}px, hsl(${hue} 80% 55% / ${opacity}), transparent 50%)`,
      }
    : {};

  return { ref, onMouseMove, onMouseLeave, spotlightStyle, active: pos.active };
}
