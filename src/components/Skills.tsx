import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, Server, Database, Brain, Cloud, Palette, TestTube, Monitor } from 'lucide-react';

interface SkillsProps {
  data: {
    skills: {
      programming_languages: string[];
      frontend_technologies: string[];
      frontend_libraries: string[];
      backend_frameworks: string[];
      backend_architectures: string[];
      databases: string[];
      ai_frameworks_and_tools: string[];
      devops_and_cloud_tools: string[];
      testing_and_api_tools: string[];
      ide_editors: string[];
    };
  };
}

const Skills = ({ data }: SkillsProps) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const skillCategories = [
    {
      title: "Programming Languages",
      icon: Code,
      isGrouped: true,
      group1: data.skills.programming_languages.slice(0, 3),
      group2: data.skills.programming_languages.slice(3),
      group1Label: "Core Languages",
      group2Label: "Additional Languages",
      color: "text-tech-blue",
      bgColor: "bg-tech-blue/10",
      borderColor: "border-tech-blue/20"
    },
    {
      title: "Frontend Development",
      icon: Palette,
      isGrouped: true,
      group1: data.skills.frontend_technologies,
      group2: data.skills.frontend_libraries,
      group1Label: "Technologies",
      group2Label: "Libraries",
      color: "text-tech-cyan",
      bgColor: "bg-tech-cyan/10",
      borderColor: "border-tech-cyan/20"
    },
    {
      title: "Backend Development",
      icon: Server,
      isGrouped: true,
      group1: data.skills.backend_frameworks,
      group2: data.skills.backend_architectures,
      group1Label: "Frameworks",
      group2Label: "Architectures",
      color: "text-tech-green",
      bgColor: "bg-tech-green/10",
      borderColor: "border-tech-green/20"
    },
    {
      title: "Databases",
      icon: Database,
      isGrouped: true,
      group1: data.skills.databases.slice(0, 2),
      group2: data.skills.databases.slice(2),
      group1Label: "Primary DBs",
      group2Label: "Additional DBs",
      color: "text-tech-purple",
      bgColor: "bg-tech-purple/10",
      borderColor: "border-tech-purple/20"
    },
    {
      title: "AI & ML Tools",
      icon: Brain,
      isGrouped: true,
      group1: data.skills.ai_frameworks_and_tools.slice(0, 3),
      group2: data.skills.ai_frameworks_and_tools.slice(3),
      group1Label: "Core Tools",
      group2Label: "Advanced Tools",
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20"
    },
    {
      title: "DevOps & Cloud",
      icon: Cloud,
      isGrouped: true,
      group1: data.skills.devops_and_cloud_tools.slice(0, 3),
      group2: data.skills.devops_and_cloud_tools.slice(3),
      group1Label: "Core Tools",
      group2Label: "Cloud Platforms",
      color: "text-accent",
      bgColor: "bg-accent/10",
      borderColor: "border-accent/20"
    },
    {
      title: "Testing & API Tools",
      icon: TestTube,
      isGrouped: true,
      group1: data.skills.testing_and_api_tools.slice(0, 1),
      group2: data.skills.testing_and_api_tools.slice(1),
      group1Label: "Testing",
      group2Label: "API Tools",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20"
    },
    {
      title: "Development Tools",
      icon: Monitor,
      isGrouped: true,
      group1: data.skills.ide_editors.slice(0, 3),
      group2: data.skills.ide_editors.slice(3),
      group1Label: "Primary IDEs",
      group2Label: "Additional IDEs",
      color: "text-gray-600",
      bgColor: "bg-gray-600/10",
      borderColor: "border-gray-600/20"
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
                } animate-fade-in-up h-full`}
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
                <CardContent className="flex-1">
                  {category.isGrouped ? (
                    <div className="space-y-4">
                      {/* Group 1 Section */}
                      <div>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {category.group1.map((skill, skillIndex) => (
                            <Badge
                              key={skill}
                              variant="secondary"
                              className={`tech-badge hover:scale-105 transition-all duration-200 animate-fade-in-up px-3 py-1`}
                              style={{ animationDelay: `${(index * 0.1) + (skillIndex * 0.05)}s` }}
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      {/* Divider */}
                      <div className="border-t border-border/30 my-2"></div>
                      
                      {/* Group 2 Section */}
                      <div>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {category.group2.map((skill, skillIndex) => (
                            <Badge
                              key={skill}
                              variant="secondary"
                              className={`tech-badge hover:scale-105 transition-all duration-200 animate-fade-in-up px-3 py-1`}
                              style={{ animationDelay: `${(index * 0.1) + (skillIndex * 0.05)}s` }}
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className={`tech-badge hover:scale-105 transition-all duration-200 animate-fade-in-up px-3 py-1`}
                          style={{ animationDelay: `${(index * 0.1) + (skillIndex * 0.05)}s` }}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  )}
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