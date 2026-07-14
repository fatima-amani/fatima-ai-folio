import { Code, Brain, Zap, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Reveal from '@/components/ui/reveal';

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
        <Reveal className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-2 gradient-text">
            About Me
          </h2>
          <div className="section-accent-line" />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6">
            Passionate about creating innovative solutions at the intersection of backend development and artificial intelligence
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <Reveal direction="left" className="space-y-6">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed text-foreground">
                {data.about.intro}
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground mt-6">
                {data.about.education}
              </p>
            </div>
            
            <div className="pt-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">
                What Drives Me
              </h3>
              <ul className="space-y-3">
                {[
                  'Building systems that scale from thousands to millions of users',
                  'Exploring how AI can solve complex business problems',
                  'Contributing to open source and helping fellow developers grow',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 group">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-primary to-accent flex-shrink-0" />
                    <span className="text-muted-foreground text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Highlight cards */}
          <Reveal direction="right" className="grid sm:grid-cols-2 gap-6">
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <Card 
                  key={index} 
                  className="card-elevated hover:scale-105 transition-all duration-300"
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/15 to-accent/15 rounded-xl flex items-center justify-center mx-auto mb-4 border border-primary/10">
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
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default About;