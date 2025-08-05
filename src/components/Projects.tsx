import { Github, ChevronRight, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface ProjectsProps {
  data: {
    projects: Array<{
      title: string;
      tech_stack: string[];
      description: string;
      github?: string;
      demo?: string;
      highlights?: string[];
    }>;
  };
}

const Projects = ({ data }: ProjectsProps) => {
  const [showAll, setShowAll] = useState(false);
  const displayedProjects = showAll ? data.projects : data.projects.slice(0, 3);

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Showcasing innovative solutions that blend cutting-edge technology with real-world impact
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayedProjects.map((project, index) => (
            <Card 
              key={index} 
              className="card-elevated animate-fade-in-up group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <CardTitle className="text-xl font-bold text-primary group-hover:text-primary/80 transition-colors">
                  {project.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-foreground mb-2">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech_stack.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                {project.highlights && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-foreground mb-2">Key Highlights</h4>
                    <ul className="space-y-2">
                      {project.highlights.map((highlight, highlightIndex) => (
                        <li 
                          key={highlightIndex} 
                          className="flex items-start space-x-2 text-sm text-muted-foreground"
                        >
                          <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex gap-3 mt-6">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    View Code
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {data.projects.length > 3 && (
          <div className="text-center mt-12">
            <Button
              onClick={() => setShowAll(!showAll)}
              variant="outline"
              size="lg"
              className="flex items-center gap-2 mx-auto"
            >
              <Eye className="h-5 w-5" />
              {showAll ? 'Show Less' : `View More Projects (${data.projects.length - 3} more)`}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;