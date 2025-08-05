import { Code, Brain, Zap, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface AboutProps {
  data: {
    about: {
      intro: string;
      education: string;
    };
  };
}

const About = ({ data }: AboutProps) => {
  const highlights = [
    {
      icon: Code,
      title: "Backend Expertise",
      description: "Specialized in building scalable microservices and robust APIs with modern frameworks and best practices."
    },
    {
      icon: Brain,
      title: "AI Integration",
      description: "Passionate about integrating AI and machine learning solutions into real-world applications."
    },
    {
      icon: Zap,
      title: "Automation Focus",
      description: "Creating intelligent automation workflows that enhance productivity and reduce manual effort."
    },
    {
      icon: Users,
      title: "Team Leadership",
      description: "Experience leading development teams and mentoring junior developers in technical growth."
    }
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">
            About Me
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Passionate about creating innovative solutions at the intersection of backend development and artificial intelligence
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="space-y-6">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed text-foreground">
                {data.about.intro}
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground mt-6">
                {data.about.education}
              </p>
            </div>
            
            <div className="pt-6">
              <h3 className="text-2xl font-semibold mb-4 text-primary">What Drives Me</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  <span className="text-muted-foreground">Building systems that scale from thousands to millions of users</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  <span className="text-muted-foreground">Exploring how AI can solve complex business problems</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-primary rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  <span className="text-muted-foreground">Contributing to open source and helping fellow developers grow</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Highlight cards */}
          <div className="grid sm:grid-cols-2 gap-6">
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <Card 
                  key={index} 
                  className="card-elevated hover:scale-105 transition-all duration-300"
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2 text-foreground">{highlight.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {highlight.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;