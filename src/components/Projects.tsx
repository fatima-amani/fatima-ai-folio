import { Github, ChevronRight, Eye, ExternalLink } from 'lucide-react';
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
      github?: string | Record<string, string>;
      demo?: string;
      highlights?: string[];
    }>;
  };
}

const Projects = ({ data }: ProjectsProps) => {
  const [showAll, setShowAll] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const displayedProjects = showAll ? data.projects : data.projects.slice(0, 3);

  // Helper function: main button + expanded section
  const renderGitHubLinks = (
    github: string | Record<string, string>,
    isExpanded: boolean,
    onToggle: () => void
  ) => {
    if (!github) return null;

    if (typeof github === 'string') {
      return (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md"
        >
          <Github className="h-4 w-4" />
          View Code
        </a>
      );
    }

    if (typeof github === 'object' && !Array.isArray(github)) {
      return (
        <div>
          <button
            onClick={onToggle}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md mb-2"
          >
            <Github className="h-4 w-4" />
            {isExpanded ? 'Hide Code' : 'Show Code'}
          </button>
          {isExpanded && (
            <div className="flex flex-col md:flex-row gap-2 flex-wrap mt-2">
              {Object.entries(github).map(([service, url]) => (
                <a
                  key={service}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md text-sm font-medium"
                >
                  <Github className="h-4 w-4" />
                  {service.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  <ExternalLink className="h-4 w-4" />
                </a>
              ))}
            </div>
          )}
        </div>
      );
    }

    return null;
  };

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

                {/* GitHub Links */}
                {project.github && (
                  <div className="mt-6">
                    {renderGitHubLinks(
                      project.github,
                      expandedIndex === index,
                      () => setExpandedIndex(expandedIndex === index ? null : index)
                    )}
                  </div>
                )}

                {/* Demo Link */}
                {project.demo && (
                  <div className="mt-4">
                    <div className="p-3 bg-muted/30 rounded-lg border border-border/50">
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Live Demo
                      </a>
                    </div>
                  </div>
                )}

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
