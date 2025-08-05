import { 
  Code, 
  Camera, 
  Brain, 
  PenTool, 
  GitBranch, 
  Music,
  Sparkles
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface HobbiesProps {
  data: {
    hobbies: Array<{
      name: string;
      description: string;
      icon: string;
    }>;
  };
}

const iconMap = {
  code: Code,
  camera: Camera,
  brain: Brain,
  'pen-tool': PenTool,
  'git-branch': GitBranch,
  music: Music,
};

const Hobbies = ({ data }: HobbiesProps) => {
  return (
    <section id="hobbies" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">
            Hobbies & Interests
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Beyond code - exploring creativity and passion projects
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.hobbies.map((hobby, index) => {
            const IconComponent = iconMap[hobby.icon as keyof typeof iconMap] || Sparkles;
            
            return (
              <Card 
                key={index} 
                className="card-elevated animate-fade-in-up group hover:scale-105 transition-all duration-300 cursor-pointer bg-gradient-subtle border-0"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4 relative">
                    <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <Sparkles className="h-4 w-4 text-white m-1" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {hobby.name}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {hobby.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Fun interaction area */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-hero rounded-2xl p-8 card-elevated">
            <h3 className="text-2xl font-semibold mb-4 text-primary">
              "Life is about balance - code hard, play harder!"
            </h3>
            <p className="text-muted-foreground">
              When I'm not building amazing backend systems, you'll find me exploring these passions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hobbies;