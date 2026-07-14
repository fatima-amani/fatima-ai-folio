import { Users, ChevronRight, Calendar, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState, useRef, useCallback } from 'react';
import Reveal from '@/components/ui/reveal';

interface LeadershipEntry {
  role: string;
  organization: string;
  duration: string;
  responsibilities: string[];
  images: string[];
}

interface LeadershipProps {
  data: { leadership: LeadershipEntry[] };
}

const LeaderCard = ({
  position,
  index,
  isExpanded,
  onToggle,
}: {
  position: LeadershipEntry;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: -1, y: -1, active: false });

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top, active: true });
  }, []);

  // Hue cycles through accent palette per card
  const hues = ['207', '196', '225', '152', '258'];
  const hue = hues[index % hues.length];

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={() => setPos({ x: -1, y: -1, active: false })}
      className="group relative rounded-xl border border-border/60 bg-card overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
    >
      {/* Spotlight */}
      {pos.active && (
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background: `radial-gradient(500px circle at ${pos.x}px ${pos.y}px, hsl(${hue} 80% 55% / 0.08), transparent 50%)`,
          }}
        />
      )}

      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] opacity-25 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `hsl(${hue} 75% 50%)` }}
      />

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
          <div className="flex items-start gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border transition-all duration-300 group-hover:scale-110"
              style={{
                background: `hsl(${hue} 75% 55% / 0.1)`,
                borderColor: `hsl(${hue} 75% 55% / 0.2)`,
              }}
            >
              <Users className="h-5 w-5" style={{ color: `hsl(${hue} 65% 45%)` }} />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-base sm:text-lg leading-snug group-hover:text-primary transition-colors duration-200">
                {position.role}
              </h3>
              <p className="text-sm font-medium text-muted-foreground mt-0.5">
                {position.organization}
              </p>
            </div>
          </div>
          <Badge
            variant="outline"
            className="flex items-center gap-1.5 text-xs px-3 py-1 border-border/60 text-muted-foreground w-fit whitespace-nowrap flex-shrink-0"
          >
            <Calendar className="h-3 w-3" />
            {position.duration}
          </Badge>
        </div>

        {/* Responsibilities */}
        <ul className="space-y-2 mb-4">
          {position.responsibilities.map((r, i) => (
            <li key={i} className="flex items-start gap-2.5 group/item">
              <div
                className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: `hsl(${hue} 70% 50%)` }}
              />
              <span className="text-sm text-muted-foreground leading-relaxed">{r}</span>
            </li>
          ))}
        </ul>

        {/* Images toggle */}
        {position.images.length > 0 && (
          <div className="pt-4 border-t border-border/40">
            <Button
              variant="outline"
              size="sm"
              onClick={onToggle}
              className="flex items-center gap-2 text-xs border-border/50 hover:border-border"
            >
              <Eye className="h-3.5 w-3.5" />
              {isExpanded ? 'Hide Images' : `View Images (${position.images.length})`}
            </Button>

            {isExpanded && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {position.images.map((img, i) => (
                  <div key={i} className="rounded-lg overflow-hidden border border-border/60 aspect-video bg-muted">
                    <img
                      src={img}
                      alt={`${position.organization} ${i + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src =
                          'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop';
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const Leadership = ({ data }: LeadershipProps) => {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const toggle = (i: number) =>
    setExpandedItems((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );

  return (
    <section id="leadership" className="py-20 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <Reveal className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-2 gradient-text">
            Leadership & Community
          </h2>
          <div className="section-accent-line" />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6">
            Leading technical initiatives and fostering growth in developer communities
          </p>
        </Reveal>

        <div className="space-y-5">
          {data.leadership.map((position, index) => (
            <Reveal key={index} delay={index * 100} direction={index % 2 === 0 ? 'left' : 'right'}>
              <LeaderCard
                position={position}
                index={index}
                isExpanded={expandedItems.includes(index)}
                onToggle={() => toggle(index)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Leadership;
