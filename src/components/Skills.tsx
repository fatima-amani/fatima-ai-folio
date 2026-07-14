import { useRef, useState, useCallback } from 'react';
import { Badge } from '@/components/ui/badge';
import { Code, Server, Database, Brain, Cloud, Palette, Monitor } from 'lucide-react';
import { PortfolioData } from '@/lib/dataLoader';
import Reveal from '@/components/ui/reveal';

interface SkillCategory {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  hue: string;
  group1?: string[];
  group2?: string[];
  group1Label?: string;
  group2Label?: string;
  skills?: string[];
}

interface SkillsProps {
  data: PortfolioData;
}

// ── Individual skill card with spotlight ────────────────────────────────────
const SkillCard = ({ category, index }: { category: SkillCategory; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: -1, y: -1, active: false });
  const { hue } = category;
  const Icon = category.icon;

  const allSkills = [
    ...(category.group1 ?? []),
    ...(category.group2 ?? []),
    ...(category.skills ?? []),
  ];
  const totalCount = allSkills.length;

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
      className="group relative rounded-xl border border-border/60 bg-card overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col h-full"
    >
      {/* Spotlight */}
      {pos.active && (
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background: `radial-gradient(450px circle at ${pos.x}px ${pos.y}px, hsl(${hue} 75% 55% / 0.09), transparent 50%)`,
          }}
        />
      )}

      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] opacity-25 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `hsl(${hue} 75% 50%)` }}
      />

      <div className="relative z-10 p-5 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center border transition-all duration-300 group-hover:scale-110"
              style={{
                background: `hsl(${hue} 75% 55% / 0.1)`,
                borderColor: `hsl(${hue} 75% 55% / 0.2)`,
              }}
            >
              <Icon className="h-4 w-4" style={{ color: `hsl(${hue} 70% 45%)` }} />
            </div>
            <h3 className="font-semibold text-sm text-foreground">{category.title}</h3>
          </div>
          <span
            className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full"
            style={{
              color: `hsl(${hue} 70% 45%)`,
              background: `hsl(${hue} 75% 55% / 0.1)`,
            }}
          >
            {totalCount}
          </span>
        </div>

        {/* Skills */}
        {category.skills ? (
          <div className="flex flex-wrap gap-1.5">
            {category.skills.map((skill) => (
              <SkillPill key={skill} label={skill} hue={hue} />
            ))}
          </div>
        ) : (
          <div className="space-y-3 flex-1">
            {category.group1 && category.group1.length > 0 && (
              <div>
                {category.group1Label && (
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground/50 font-semibold mb-2">
                    {category.group1Label}
                  </p>
                )}
                <div className="flex flex-wrap gap-1.5">
                  {category.group1.map((skill) => (
                    <SkillPill key={skill} label={skill} hue={hue} />
                  ))}
                </div>
              </div>
            )}
            {category.group2 && category.group2.length > 0 && (
              <>
                <div
                  className="h-px"
                  style={{ background: `hsl(${hue} 60% 60% / 0.15)` }}
                />
                <div>
                  {category.group2Label && (
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground/50 font-semibold mb-2">
                      {category.group2Label}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-1.5">
                    {category.group2.map((skill) => (
                      <SkillPill key={skill} label={skill} hue={hue} />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const SkillPill = ({ label, hue }: { label: string; hue: string }) => (
  <span
    className="inline-flex items-center text-[11px] font-medium px-2.5 py-0.5 rounded-full border transition-all duration-200 hover:scale-105 cursor-default"
    style={{
      color: `hsl(${hue} 65% 40%)`,
      background: `hsl(${hue} 75% 55% / 0.07)`,
      borderColor: `hsl(${hue} 65% 55% / 0.2)`,
    }}
  >
    {label}
  </span>
);

// ── Main section ─────────────────────────────────────────────────────────────
const Skills = ({ data }: SkillsProps) => {
  const skills = data?.skills || {};

  const categories: SkillCategory[] = [
    {
      title: 'AI & ML',
      icon: Brain,
      hue: '225',
      group1: skills.ai_frameworks_and_tools?.slice(0, 4) ?? [],
      group2: skills.ai_frameworks_and_tools?.slice(4) ?? [],
      group1Label: 'Core',
      group2Label: 'Advanced',
    },
    {
      title: 'Databases',
      icon: Database,
      hue: '258',
      group1: skills.databases?.slice(0, 2) ?? [],
      group2: skills.databases?.slice(2) ?? [],
      group1Label: 'Primary',
      group2Label: 'Additional',
    },
    {
      title: 'Backend',
      icon: Server,
      hue: '152',
      group1: skills.backend_frameworks ?? [],
      group2: skills.backend_architectures ?? [],
      group1Label: 'Frameworks',
      group2Label: 'Architectures',
    },
    {
      title: 'Dev Tools',
      icon: Monitor,
      hue: '220',
      group1: skills.ide_editors?.slice(0, 4) ?? [],
      group2: skills.ide_editors?.slice(4) ?? [],
      group1Label: 'Primary',
      group2Label: 'Additional',
    },
    {
      title: 'Cloud Platforms',
      icon: Cloud,
      hue: '196',
      skills: skills.cloud ?? [],
    },
    {
      title: 'DevOps & Tools',
      icon: Cloud,
      hue: '28',
      group1: skills.devops_and_cloud_tools?.slice(0, 4) ?? [],
      group2: skills.devops_and_cloud_tools?.slice(4) ?? [],
      group1Label: 'Core',
      group2Label: 'Additional',
    },
    {
      title: 'Frontend',
      icon: Palette,
      hue: '196',
      group1: skills.frontend_technologies ?? [],
      group2: skills.frontend_libraries ?? [],
      group1Label: 'Technologies',
      group2Label: 'Libraries',
    },
    {
      title: 'Programming Languages',
      icon: Code,
      hue: '207',
      group1: skills.programming_languages?.slice(0, 3) ?? [],
      group2: skills.programming_languages?.slice(3) ?? [],
      group1Label: 'Core',
      group2Label: 'Additional',
    },
  ].filter((c) =>
    c.skills
      ? c.skills.length > 0
      : (c.group1?.length ?? 0) + (c.group2?.length ?? 0) > 0
  );

  const totalSkills = categories.reduce(
    (sum, c) =>
      sum +
      (c.skills?.length ?? 0) +
      (c.group1?.length ?? 0) +
      (c.group2?.length ?? 0),
    0
  );

  if (categories.length === 0) {
    return (
      <section id="skills" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold gradient-text">Technical Skills</h2>
          <p className="text-muted-foreground mt-4">Skills data unavailable.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <Reveal className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-2 gradient-text">
            Technical Skills
          </h2>
          <div className="section-accent-line" />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6">
            A comprehensive toolkit for building modern, scalable applications from backend to AI
          </p>
        </Reveal>

        {/* Summary stats */}
        <Reveal delay={100} className="flex flex-wrap justify-center gap-8 mb-12">
          {[
            { value: totalSkills, label: 'Technologies' },
            { value: categories.length, label: 'Domains' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-3xl font-bold gradient-text">{value}+</p>
              <p className="text-sm text-muted-foreground mt-0.5">{label}</p>
            </div>
          ))}
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 [grid-auto-rows:1fr]">
          {categories.map((category, index) => (
            <Reveal key={category.title} delay={index * 60} direction={index % 2 === 0 ? 'left' : 'right'} className="h-full">
              <SkillCard category={category} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
