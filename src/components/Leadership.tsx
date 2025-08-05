import { Users, Calendar, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface LeadershipProps {
  data: {
    leadership: Array<{
      role: string;
      organization: string;
      duration: string;
      responsibilities: string[];
    }>;
  };
}

const Leadership = ({ data }: LeadershipProps) => {
  return (
    <section id="leadership" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">
            Leadership & Community
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Leading technical initiatives and fostering growth in developer communities
          </p>
        </div>

        <div className="space-y-8">
          {data.leadership.map((position, index) => (
            <Card 
              key={index} 
              className={`card-elevated animate-fade-in-up`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl font-bold text-primary mb-2 flex items-center">
                      <Users className="h-6 w-6 mr-3" />
                      {position.role}
                    </CardTitle>
                    <div className="text-lg font-semibold text-foreground">
                      {position.organization}
                    </div>
                  </div>
                  <Badge variant="outline" className="flex items-center gap-2 px-4 py-2 text-sm">
                    <Calendar className="h-4 w-4" />
                    {position.duration}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {position.responsibilities.map((responsibility, respIndex) => (
                    <li 
                      key={respIndex} 
                      className="flex items-start space-x-3 group"
                    >
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                      <span className="text-muted-foreground leading-relaxed">
                        {responsibility}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Leadership philosophy */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-hero rounded-2xl p-8 card-elevated">
            <h3 className="text-2xl font-semibold mb-4 text-primary">Leadership Philosophy</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              I believe in leading by example, fostering collaborative environments, and empowering others 
              to reach their full potential. My approach focuses on mentorship, knowledge sharing, and 
              building inclusive technical communities.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Badge variant="secondary" className="px-4 py-2">Mentorship</Badge>
              <Badge variant="secondary" className="px-4 py-2">Knowledge Sharing</Badge>
              <Badge variant="secondary" className="px-4 py-2">Team Building</Badge>
              <Badge variant="secondary" className="px-4 py-2">Community Growth</Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leadership;