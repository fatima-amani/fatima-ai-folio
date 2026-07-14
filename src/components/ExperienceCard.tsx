import { Calendar, MapPin, Eye, Star, FolderOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface ExperienceImage {
  name: string;
  path: string;
  description?: string;
}

interface ExperienceProject {
  name: string;
  bullets: string[];
}

interface ExperienceData {
  title: string;
  company: string;
  duration: string;
  location: string;
  projects?: ExperienceProject[];
  achievements?: string[];
  highlights?: string[];
  images?: ExperienceImage[];
}

interface ExperienceCardProps {
  exp: ExperienceData;
  onImageClick: (image: ExperienceImage) => void;
}

const ExperienceCard = ({ exp, onImageClick }: ExperienceCardProps) => {
  const [imagesExpanded, setImagesExpanded] = useState(false);

  return (
    <Card className="card-elevated card-accent-hover border border-border/60 overflow-hidden">
      {/* Gradient header band */}
      <div className="relative px-6 pt-5 pb-4 bg-gradient-to-r from-primary/8 via-primary/4 to-transparent border-b border-border/40">
        {/* Top row: company + duration */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-1.5">
          <h3 className="text-xl font-bold text-primary leading-tight">{exp.company}</h3>
          <Badge
            variant="outline"
            className="flex items-center gap-1.5 px-3 py-1 text-xs w-fit whitespace-nowrap border-primary/25 text-muted-foreground bg-background/60"
          >
            <Calendar className="h-3 w-3" />
            {exp.duration}
          </Badge>
        </div>

        {/* Second row: title + location */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <span className="text-sm font-semibold text-foreground/90 tracking-wide">{exp.title}</span>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
            {exp.location}
          </div>
        </div>
      </div>

      <CardContent className="pt-5 px-6 pb-5">
        {/* Projects */}
        {exp.projects && exp.projects.length > 0 && (
          <div className="space-y-5">
            {exp.projects.map((project, pi) => (
              <div key={pi} className="group/project">
                {/* Project title */}
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-md bg-primary/10 flex-shrink-0">
                    <FolderOpen className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <h4 className="text-sm font-semibold text-foreground">{project.name}</h4>
                </div>

                {/* Bullets block */}
                <div className="ml-2 pl-4 border-l-2 border-primary/20 group-hover/project:border-primary/50 transition-colors duration-300 space-y-2">
                  {project.bullets.map((bullet, bi) => (
                    <div key={bi} className="flex items-start gap-2.5">
                      <span className="mt-[5px] flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary/60" />
                      <span className="text-sm text-muted-foreground leading-relaxed">{bullet}</span>
                    </div>
                  ))}
                </div>

                {/* Divider between projects */}
                {pi < (exp.projects?.length ?? 0) - 1 && (
                  <div className="mt-5 border-t border-dashed border-border/50" />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Achievements */}
        {exp.achievements && exp.achievements.length > 0 && (
          <div className={`${exp.projects && exp.projects.length > 0 ? 'mt-5 pt-5 border-t border-border/40' : ''}`}>
            <h4 className="text-xs font-semibold mb-3 flex items-center gap-2 text-primary uppercase tracking-widest">
              <Star className="h-3.5 w-3.5" />
              Key Achievements
            </h4>
            <div className="space-y-2">
              {exp.achievements.map((achievement, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 bg-primary/5 border border-primary/12 rounded-lg px-3.5 py-2.5"
                >
                  <span className="mt-[5px] flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary/70" />
                  <span className="text-sm text-foreground leading-relaxed">{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View Images */}
        {exp.images && exp.images.length > 0 && (
          <div className="mt-5 pt-4 border-t border-border/40">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setImagesExpanded(v => !v)}
              className="flex items-center gap-2 text-xs h-8 border-primary/20 hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all"
            >
              <Eye className="h-3.5 w-3.5" />
              {imagesExpanded ? 'Hide Images' : `View Certificates & Proof (${exp.images.length})`}
            </Button>

            {imagesExpanded && (
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 animate-fade-in-up">
                {exp.images.map((image, imageIndex) => (
                  <div
                    key={imageIndex}
                    className="flex items-center gap-3 p-2.5 bg-muted/50 rounded-lg border border-border/40 hover:bg-primary/5 hover:border-primary/25 transition-all cursor-pointer group"
                    onClick={() => onImageClick(image)}
                  >
                    <div className="w-7 h-7 bg-primary/10 rounded-md flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Eye className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                      {image.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExperienceCard;
