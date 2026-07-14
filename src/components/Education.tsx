import { GraduationCap, Calendar, Award, MapPin, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useRef, useState, useCallback } from 'react';
import Reveal from '@/components/ui/reveal';

interface EducationEntry {
  degree: string;
  institution: string;
  board: string;
  cgpa?: string;
  percentage?: string;
  timeline: string;
  relevant_coursework?: string[];
  stream?: string;
}

interface EducationProps {
  data: { education: EducationEntry[] };
}

const EduCard = ({ edu, index }: { edu: EducationEntry; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: -1, y: -1, active: false });

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top, active: true });
  }, []);

  const score = edu.cgpa || edu.percentage;

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
            background: `radial-gradient(500px circle at ${pos.x}px ${pos.y}px, hsl(207 80% 55% / 0.07), transparent 50%)`,
          }}
        />
      )}

      {/* Left accent */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary to-accent opacity-25 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10 p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

          {/* Left content */}
          <div className="flex-1 min-w-0">
            {/* Degree */}
            <div className="flex items-start gap-3 mb-2">
              <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary/15 transition-colors duration-300">
                <GraduationCap className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-base sm:text-lg leading-snug group-hover:text-primary transition-colors duration-200">
                  {edu.degree}
                </h3>
                {edu.stream && (
                  <p className="text-xs text-muted-foreground/70 mt-0.5">{edu.stream}</p>
                )}
              </div>
            </div>

            {/* Institution */}
            <div className="flex items-center gap-1.5 text-sm font-semibold text-foreground mb-1 ml-12">
              <MapPin className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
              {edu.institution}
            </div>

            {/* Board */}
            <p className="text-xs text-muted-foreground ml-12 mb-2">{edu.board}</p>

            {/* Timeline */}
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground ml-12">
              <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
              {edu.timeline}
            </div>
          </div>

          {/* Score badge */}
          {score && (
            <div className="flex-shrink-0 flex flex-col items-center justify-center w-20 h-20 rounded-2xl border-2 border-primary/20 bg-primary/5 group-hover:border-primary/40 group-hover:bg-primary/8 transition-all duration-300">
              <Award className="h-4 w-4 text-primary mb-1" />
              <span className="font-bold text-primary text-sm leading-tight text-center">{score}</span>
            </div>
          )}
        </div>

        {/* Coursework */}
        {edu.relevant_coursework && edu.relevant_coursework.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border/40">
            <div className="flex items-center gap-2 mb-2.5">
              <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-[11px] uppercase tracking-widest font-semibold text-muted-foreground/60">
                Relevant Coursework
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {edu.relevant_coursework.map((course, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="text-[11px] px-2.5 py-0.5 font-normal"
                >
                  {course}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Education = ({ data }: EducationProps) => (
  <section id="education" className="py-20 bg-muted/20">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

      <Reveal className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold mb-2 gradient-text">Education</h2>
        <div className="section-accent-line" />
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6">
          Building a strong foundation in computer science with focus on practical applications
        </p>
      </Reveal>

      {/* Timeline wrapper */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-5 top-3 bottom-3 w-0.5 timeline-line hidden sm:block" />

        <div className="space-y-6">
          {data.education.map((edu, index) => (
            <Reveal key={index} delay={index * 100} direction="left">
              <div className="relative sm:pl-14">
                {/* Timeline dot */}
                <div className="absolute left-[18px] top-7 w-4 h-4 rounded-full timeline-dot pulse-ring hidden sm:block z-10" />
                <EduCard edu={edu} index={index} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Education;
