import { useEffect, useState, ReactNode } from 'react';

const COLORS = [
  'hsl(207 90% 65%)',
  'hsl(196 85% 65%)',
  'hsl(225 70% 72%)',
  'hsl(207 90% 82%)',
  'hsl(196 85% 78%)',
];

interface SparkleData {
  id: string;
  x: string;
  y: string;
  color: string;
  size: number;
  lifespan: number;
  delay: number;
}

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function createSparkle(): SparkleData {
  return {
    id: String(Math.random()),
    x: `${rand(-5, 105)}%`,
    y: `${rand(-5, 105)}%`,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: rand(10, 22),
    lifespan: rand(550, 1050),
    delay: rand(0, 180),
  };
}

const SparkleIcon = ({ size, color }: { size: number; color: string }) => (
  <svg width={size} height={size} viewBox="0 0 160 160" fill="none">
    <path
      d="M80 7C80 7 84.2846 45.2987 101.496 62.5C118.707 79.7013 157 80 157 80C157 80 118.707 80.2987 101.496 97.5C84.2846 114.701 80 153 80 153C80 153 75.7154 114.701 58.504 97.5C41.2926 80.2987 3 80 3 80C3 80 41.2926 79.7013 58.504 62.5C75.7154 45.2987 80 7 80 7Z"
      fill={color}
    />
  </svg>
);

interface SparklesProps {
  children: ReactNode;
  className?: string;
}

const Sparkles = ({ children, className = '' }: SparklesProps) => {
  const [sparkles, setSparkles] = useState<SparkleData[]>([]);

  useEffect(() => {
    const spawn = () => {
      const sparkle = createSparkle();
      setSparkles((prev) => [...prev, sparkle]);
      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== sparkle.id));
      }, sparkle.lifespan + sparkle.delay + 50);
    };

    // Initial burst
    spawn();
    spawn();
    spawn();

    const interval = setInterval(spawn, 280);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`relative inline-block ${className}`}>
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="sparkle-star"
          style={{
            left: s.x,
            top: s.y,
            animationDuration: `${s.lifespan}ms`,
            animationDelay: `${s.delay}ms`,
            transform: 'translate(-50%, -50%)',
            zIndex: 20,
          }}
        >
          <SparkleIcon size={s.size} color={s.color} />
        </span>
      ))}
      <span className="relative z-10">{children}</span>
    </span>
  );
};

export default Sparkles;
