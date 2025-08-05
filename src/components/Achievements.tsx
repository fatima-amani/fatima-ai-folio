import { Trophy, Star, Calendar, Gift } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AchievementsProps {
  data: {
    achievements: Array<{
      title: string;
      description: string;
      year: string;
    }>;
  };
}

const Achievements = ({ data }: AchievementsProps) => {
  const getIcon = (title: string) => {
    if (title.toLowerCase().includes('grant') || title.toLowerCase().includes('award')) {
      return Gift;
    }
    if (title.toLowerCase().includes('hackathon') || title.toLowerCase().includes('hack')) {
      return Star;
    }
    return Trophy;
  };

  return (
    <section id="achievements" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">
            Achievements
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Recognition for technical excellence, innovation, and community contributions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.achievements.map((achievement, index) => {
            const Icon = getIcon(achievement.title);
            return (
              <Card
                key={index}
                className={`card-elevated group hover:scale-105 transition-all duration-300 animate-fade-in-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center group-hover:animate-pulse-glow">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg font-bold text-primary group-hover:gradient-text transition-all">
                    {achievement.title}
                  </CardTitle>
                  <Badge variant="outline" className="mx-auto flex items-center gap-2 w-fit">
                    <Calendar className="h-3 w-3" />
                    {achievement.year}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center leading-relaxed">
                    {achievement.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Achievement stats */}
        <div className="mt-16">
          <div className="bg-gradient-hero rounded-2xl p-8 card-elevated">
            <h3 className="text-2xl font-semibold mb-8 text-center text-primary">By The Numbers</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold gradient-text mb-2">₹50K+</div>
                <div className="text-muted-foreground">Grant Money Received</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text mb-2">5+</div>
                <div className="text-muted-foreground">Hackathons Participated</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text mb-2">4⭐</div>
                <div className="text-muted-foreground">CodeChef Rating</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text mb-2">10+</div>
                <div className="text-muted-foreground">Open Source Contributions</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;