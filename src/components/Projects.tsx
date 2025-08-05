import { useState } from 'react';
import { Github, ExternalLink, Star, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

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

        <div className="grid lg:grid-cols-2 gap-8">
          {data.projects.map((project, index) => (
            <Card
              key={index}
              className={`card-elevated group transition-all duration-300 ${
                hoveredProject === index ? 'scale-[1.02] shadow-elevated' : ''
              } animate-fade-in-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary group-hover:gradient-text transition-all">
                    {project.title}
                  </span>
                  <div className="flex space-x-2">
                    {project.github && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-2 hover:bg-primary/10"
                        onClick={() => window.open(project.github, '_blank')}
                      >
                        <Github className="h-4 w-4" />
                      </Button>
                    )}
                    {project.demo && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-2 hover:bg-primary/10"
                        onClick={() => window.open(project.demo, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech_stack.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="secondary"
                        className="tech-badge text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                {project.highlights && (
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center">
                      <Star className="h-4 w-4 mr-1 text-primary" />
                      Key Achievements
                    </h4>
                    <ul className="space-y-1">
                      {project.highlights.map((highlight, highlightIndex) => (
                        <li key={highlightIndex} className="text-sm text-muted-foreground flex items-start">
                          <TrendingUp className="h-3 w-3 mr-2 mt-1 text-primary flex-shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  {project.github && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-primary/50 hover:bg-primary/10"
                      onClick={() => window.open(project.github, '_blank')}
                    >
                      <Github className="h-4 w-4 mr-2" />
                      View Code
                    </Button>
                  )}
                  {project.demo && (
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-primary hover:opacity-90"
                      onClick={() => window.open(project.demo, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-hero rounded-2xl p-8 card-elevated">
            <h3 className="text-2xl font-semibold mb-4 text-primary">More Projects</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              These are just a few highlights. Check out my GitHub for more projects including 
              contributions to open source, hackathon submissions, and experimental prototypes.
            </p>
            <Button
              size="lg"
              variant="outline"
              className="border-primary/50 hover:bg-primary/10"
              onClick={() => window.open(data.projects[0]?.github?.replace(/\/[^\/]*$/, ''), '_blank')}
            >
              <Github className="h-5 w-5 mr-2" />
              View All Projects
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;