import { Github, ExternalLink, ChevronRight, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState, useRef, useCallback } from 'react';
import { PortfolioData } from '@/lib/dataLoader';
import Reveal from '@/components/ui/reveal';

interface ProjectsProps {
  data: PortfolioData;
}

interface ProjectCardProps {
  project: PortfolioData['projects'][number];
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

const ProjectCard = ({ project, index, isExpanded, onToggle }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: -1, y: -1, active: false });
  const num = String(index + 1).padStart(2, '0');

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top, active: true });
  }, []);

  const github = project.github as string | Record<string, string> | undefined;

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={() => setPos({ x: -1, y: -1, active: false })}
      className="group relative rounded-xl border border-border/60 bg-card overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col"
    >
      {/* Spotlight */}
      {pos.active && (
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background: `radial-gradient(500px circle at ${pos.x}px ${pos.y}px, hsl(207 80% 55% / 0.08), transparent 50%)`,
          }}
        />
      )}

      {/* Top gradient line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-primary/0 via-primary to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 p-5 flex flex-col h-full">
        {/* Index + tech count */}
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-xs font-semibold text-muted-foreground/40 tracking-widest">
            {num}
          </span>
          <span className="text-[10px] text-muted-foreground/50 font-mono">
            {project.tech_stack.length} technologies
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-foreground text-base leading-snug mb-2 group-hover:text-primary transition-colors duration-200">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech_stack.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="text-[11px] px-2 py-0 h-5 font-normal"
            >
              {tech}
            </Badge>
          ))}
        </div>

        {/* Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <ul className="space-y-1.5 mb-5">
            {project.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground group/item">
                <ChevronRight className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0 group-hover/item:translate-x-0.5 transition-transform" />
                <span className="leading-relaxed">{h}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Actions — always at bottom */}
        <div className="mt-auto pt-4 border-t border-border/40 flex flex-wrap gap-2">
          {/* GitHub: single link */}
          {typeof github === 'string' && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 hover:scale-105"
            >
              <Github className="h-3.5 w-3.5" />
              View Code
            </a>
          )}

          {/* GitHub: multi-repo toggle */}
          {github && typeof github === 'object' && !Array.isArray(github) && (
            <div className="w-full">
              <button
                onClick={onToggle}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200"
              >
                <Github className="h-3.5 w-3.5" />
                {isExpanded ? 'Hide Repos' : `View Code (${Object.keys(github).length} repos)`}
              </button>
              {isExpanded && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {Object.entries(github).map(([service, url]) => (
                    <a
                      key={service}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium rounded-md border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-200"
                    >
                      <Github className="h-3 w-3" />
                      {service.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Demo */}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold rounded-md border border-accent/40 text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:scale-105"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// ── Main section ─────────────────────────────────────────────────────────────
const Projects = ({ data }: ProjectsProps) => {
  const [showAll, setShowAll] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const displayed = showAll ? data.projects : data.projects.slice(0, 3);

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <Reveal className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-2 gradient-text">
            Featured Projects
          </h2>
          <div className="section-accent-line" />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6">
            Showcasing innovative solutions that blend cutting-edge technology with real-world impact
          </p>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {displayed.map((project, index) => (
            <Reveal key={index} delay={index * 80} direction="up">
              <ProjectCard
                project={project}
                index={index}
                isExpanded={expandedIndex === index}
                onToggle={() => setExpandedIndex(expandedIndex === index ? null : index)}
              />
            </Reveal>
          ))}
        </div>

        {data.projects.length > 3 && (
          <div className="text-center mt-10">
            <Button
              onClick={() => setShowAll(!showAll)}
              variant="outline"
              className="flex items-center gap-2 mx-auto hover:bg-primary/5 hover:border-primary/30 transition-all duration-300"
            >
              <Eye className="h-4 w-4" />
              {showAll ? 'Show Less' : `View ${data.projects.length - 3} More Projects`}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
