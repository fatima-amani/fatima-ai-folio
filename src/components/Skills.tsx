import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, Server, Database, Brain, Cloud, Palette } from 'lucide-react';

interface SkillsProps {
  data: {
    skills: {
      languages: string[];
      frontend_technologies: string[];
      backend_technologies: string[];
      databases: string[];
      ai_tools: string[];
      devops_cloud: string[];
    };
  };
}

const Skills = ({ data }: SkillsProps) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const skillCategories = [
    {
      title: "Languages",
      icon: Code,
      skills: data.skills.languages,
      color: "text-tech-blue",
      bgColor: "bg-tech-blue/10",
      borderColor: "border-tech-blue/20"
    },
    {
      title: "Frontend",
      icon: Palette,
      skills: data.skills.frontend_technologies,
      color: "text-tech-cyan",
      bgColor: "bg-tech-cyan/10",
      borderColor: "border-tech-cyan/20"
    },
    {
      title: "Backend",
      icon: Server,
      skills: data.skills.backend_technologies,
      color: "text-tech-green",
      bgColor: "bg-tech-green/10",
      borderColor: "border-tech-green/20"
    },
    {
      title: "Databases",
      icon: Database,
      skills: data.skills.databases,
      color: "text-tech-purple",
      bgColor: "bg-tech-purple/10",
      borderColor: "border-tech-purple/20"
    },
    {
      title: "AI Tools",
      icon: Brain,
      skills: data.skills.ai_tools,
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20"
    },
    {
      title: "DevOps & Cloud",
      icon: Cloud,
      skills: data.skills.devops_cloud,
      color: "text-accent",
      bgColor: "bg-accent/10",
      borderColor: "border-accent/20"
    }
  ];

  return (
    <section id="skills" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">
            Technical Skills
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive toolkit for building modern, scalable applications from backend to AI integration
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.title}
                className={`card-elevated transition-all duration-300 ${
                  hoveredCategory === category.title 
                    ? 'scale-105 shadow-elevated' 
                    : ''
                } animate-fade-in-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setHoveredCategory(category.title)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${category.bgColor} ${category.borderColor} border`}>
                      <Icon className={`h-5 w-5 ${category.color}`} />
                    </div>
                    <span className="text-lg font-semibold">{category.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className={`tech-badge hover:scale-105 transition-all duration-200 animate-fade-in-up`}
                        style={{ animationDelay: `${(index * 0.1) + (skillIndex * 0.05)}s` }}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Skills summary */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-hero rounded-2xl p-8 card-elevated">
            <h3 className="text-2xl font-semibold mb-4 text-primary">Always Learning</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Technology evolves rapidly, and I'm committed to staying current with the latest tools and best practices. 
              Currently exploring advanced AI frameworks, cloud-native architectures, and emerging backend technologies.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;