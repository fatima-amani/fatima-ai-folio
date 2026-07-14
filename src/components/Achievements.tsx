import { Trophy, Star, Calendar, Gift, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useRef, useState, useCallback } from 'react';
import Reveal from '@/components/ui/reveal';

interface Achievement {
  title: string;
  description: string;
  year: string;
}

interface AchievementsProps {
  data: { achievements: Achievement[] };
}

function getIcon(title: string) {
  const t = title.toLowerCase();
  if (t.includes('grant') || t.includes('award') || t.includes('fund')) return Gift;
  if (t.includes('hackathon') || t.includes('hack')) return Star;
  return Trophy;
}

// ── Single achievement — full-width horizontal feature card ──────────────────
const FeaturedAchievement = ({ achievement }: { achievement: Achievement }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: -1, y: -1, active: false });
  const Icon = getIcon(achievement.title);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top, active: true });
  }, []);

  return (
    <Reveal direction="scale">
      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={() => setPos({ x: -1, y: -1, active: false })}
        className="border-beam group relative rounded-2xl border border-border/60 bg-card overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10"
      >
        {/* Spotlight */}
        {pos.active && (
          <div
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              background: `radial-gradient(700px circle at ${pos.x}px ${pos.y}px, hsl(207 80% 55% / 0.07), transparent 50%)`,
            }}
          />
        )}

        <div className="relative z-10 flex flex-col sm:flex-row">
          {/* ── Left panel — gradient accent ── */}
          <div className="relative flex-shrink-0 sm:w-64 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 border-b sm:border-b-0 sm:border-r border-border/40 px-8 py-10 overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 hero-dot-grid opacity-30 pointer-events-none" />

            {/* Icon */}
            <div className="relative z-10 w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
              <Icon className="h-10 w-10 text-white" />
            </div>

            {/* Year */}
            <Badge
              variant="outline"
              className="relative z-10 flex items-center gap-1.5 text-xs px-3 py-1.5 border-primary/30 text-primary font-semibold bg-primary/5"
            >
              <Calendar className="h-3 w-3" />
              {achievement.year}
            </Badge>

            {/* Verified ribbon */}
            <div className="relative z-10 flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-primary/60">
              <span className="w-4 h-px bg-primary/40" />
              Funded & Recognised
              <span className="w-4 h-px bg-primary/40" />
            </div>
          </div>

          {/* ── Right panel — content ── */}
          <div className="flex-1 px-8 py-10 flex flex-col justify-center gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-widest font-semibold text-muted-foreground/50 mb-2">
                Achievement
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors duration-300">
                {achievement.title}
              </h3>
            </div>

            <p className="text-muted-foreground leading-relaxed max-w-2xl">
              {achievement.description}
            </p>

            {/* Decorative arrow indicator */}
            <div className="flex items-center gap-2 text-primary/40 group-hover:text-primary/70 transition-colors duration-300">
              <span className="w-8 h-px bg-current transition-all duration-300 group-hover:w-14" />
              <ArrowRight className="h-4 w-4 translate-x-0 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
};

// ── Multiple achievements — spotlight grid cards ──────────────────────────────
const AchievementCard = ({ achievement, index }: { achievement: Achievement; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: -1, y: -1, active: false });
  const Icon = getIcon(achievement.title);

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
      className="group relative rounded-xl border border-border/60 bg-card overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col"
    >
      {pos.active && (
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, hsl(207 80% 55% / 0.08), transparent 50%)`,
          }}
        />
      )}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary to-accent opacity-25 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10 p-6 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
            <Icon className="h-6 w-6 text-white" />
          </div>
          <Badge
            variant="outline"
            className="flex items-center gap-1 text-xs border-primary/20 text-muted-foreground"
          >
            <Calendar className="h-3 w-3" />
            {achievement.year}
          </Badge>
        </div>

        <h3 className="font-bold text-foreground text-base leading-snug mb-2 group-hover:text-primary transition-colors duration-200">
          {achievement.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mt-auto">
          {achievement.description}
        </p>
      </div>
    </div>
  );
};

// ── Section ───────────────────────────────────────────────────────────────────
const Achievements = ({ data }: AchievementsProps) => {
  const { achievements } = data;
  const isSingle = achievements.length === 1;

  return (
    <section id="achievements" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <Reveal className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-2 gradient-text">
            Achievements
          </h2>
          <div className="section-accent-line" />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6">
            Recognition for technical excellence, innovation, and community contributions
          </p>
        </Reveal>

        {isSingle ? (
          <FeaturedAchievement achievement={achievements[0]} />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {achievements.map((a, i) => (
              <Reveal key={i} delay={i * 80} direction="scale">
                <AchievementCard achievement={a} index={i} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Achievements;
