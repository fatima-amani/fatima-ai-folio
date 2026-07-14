import { ReactNode, CSSProperties, useRef, useEffect, useState } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'scale';
  style?: CSSProperties;
  threshold?: number;
}

const Reveal = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  style,
  threshold = 0.12,
}: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const hidden: Record<string, string> = {
    up: 'opacity-0 translate-y-10',
    left: 'opacity-0 -translate-x-10',
    right: 'opacity-0 translate-x-10',
    scale: 'opacity-0 scale-90',
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0 translate-x-0 scale-100' : hidden[direction]} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  );
};

export default Reveal;
