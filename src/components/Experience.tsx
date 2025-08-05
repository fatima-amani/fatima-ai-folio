import { Calendar, MapPin, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ExperienceProps {
  data: {
    experience: Array<{
      title: string;
      company: string;
      duration: string;
      achievements: string[];
    }>;
  };
}

const Experience = ({ data }: ExperienceProps) => {
  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">
            Experience
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Building impactful solutions and driving automation in fast-paced development environments
          </p>
        </div>

        <div className="space-y-8">
          {data.experience.map((exp, index) => (
            <Card 
              key={index} 
              className={`card-elevated animate-fade-in-up`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl font-bold text-primary mb-2">
                      {exp.title}
                    </CardTitle>
                    <div className="flex items-center text-lg font-semibold text-foreground mb-2">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      {exp.company}
                    </div>
                  </div>
                  <Badge variant="outline" className="flex items-center gap-2 px-4 py-2 text-sm">
                    <Calendar className="h-4 w-4" />
                    {exp.duration}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {exp.achievements.map((achievement, achievementIndex) => (
                    <li 
                      key={achievementIndex} 
                      className="flex items-start space-x-3 group"
                    >
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                      <span className="text-muted-foreground leading-relaxed">
                        {achievement}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Current status */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-hero rounded-2xl p-8 card-elevated">
            <h3 className="text-2xl font-semibold mb-4 text-primary">Currently Open To</h3>
            <div className="flex flex-wrap gap-4 justify-center">
              <Badge variant="secondary" className="px-4 py-2">Full-time Opportunities</Badge>
              <Badge variant="secondary" className="px-4 py-2">Backend Development Roles</Badge>
              <Badge variant="secondary" className="px-4 py-2">AI/ML Projects</Badge>
              <Badge variant="secondary" className="px-4 py-2">Remote Collaborations</Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;