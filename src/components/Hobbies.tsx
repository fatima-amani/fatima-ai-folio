import { Code, Camera, Brain, PenTool, GitBranch, Music, Sparkles } from 'lucide-react';
import { useRef, useState, useCallback } from 'react';
import Reveal from '@/components/ui/reveal';

interface HobbyEntry {
  name: string;
  description: string;
  icon: string;
}

interface HobbiesProps {
  data: { hobbies: HobbyEntry[] };
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  code: Code,
  camera: Camera,
  brain: Brain,
  'pen-tool': PenTool,
  'git-branch': GitBranch,
  music: Music,
};

// Each hobby gets a hue so they feel differentiated, not uniform
const HOBBY_HUES = ['207', '196', '225', '152', '28', '258', '0'];

const HobbyCard = ({ hobby, index }: { hobby: HobbyEntry; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: -1, y: -1, active: false });
  const Icon = ICON_MAP[hobby.icon] ?? Sparkles;
  const hue = HOBBY_HUES[index % HOBBY_HUES.length];

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top, active: true });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={() => setPos({ x: -1, y: -1, active: false })}
      className="group relative rounded-xl border border-border/60 bg-card overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-default"
    >
      {/* Spotlight */}
      {pos.active && (
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, hsl(${hue} 75% 55% / 0.09), transparent 50%)`,
          }}
        />
      )}

      {/* Top accent */}
      <div
        className="h-[2px] w-0 group-hover:w-full transition-all duration-500"
        style={{ background: `hsl(${hue} 75% 55%)` }}
      />

      <div className="relative z-10 p-6">
        {/* Icon */}
        <div className="mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
            style={{
              background: `hsl(${hue} 75% 55% / 0.1)`,
              borderColor: `hsl(${hue} 70% 55% / 0.25)`,
            }}
          >
            <Icon className="h-6 w-6" style={{ color: `hsl(${hue} 65% 45%)` }} />
          </div>
        </div>

        <h3 className="font-bold text-foreground text-base mb-2 group-hover:text-primary transition-colors duration-200">
          {hobby.name}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{hobby.description}</p>
      </div>
    </div>
  );
};

const Hobbies = ({ data }: HobbiesProps) => (
  <section id="hobbies" className="py-20 bg-muted/20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <Reveal className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold mb-2 gradient-text">
          Hobbies & Interests
        </h2>
        <div className="section-accent-line" />
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6">
          Beyond code — exploring creativity, curiosity, and passion projects
        </p>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.hobbies.map((hobby, index) => (
          <Reveal key={index} delay={index * 70} direction={index % 2 === 0 ? 'left' : 'right'}>
            <HobbyCard hobby={hobby} index={index} />
          </Reveal>
        ))}
      </div>

      {/* Quote strip */}
      <Reveal delay={200} className="mt-12">
        <div className="relative rounded-2xl border border-border/40 bg-gradient-hero overflow-hidden px-8 py-7 text-center">
          <div className="absolute inset-0 hero-dot-grid opacity-25 pointer-events-none" />
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-accent rounded-l-2xl" />
          <p className="relative text-lg font-medium text-foreground italic">
            "When I'm not building backend systems, you'll find me exploring these passions."
          </p>
        </div>
      </Reveal>
    </div>
  </section>
);

export default Hobbies;
