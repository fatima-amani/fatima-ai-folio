import { useState, useEffect, useCallback } from 'react';
import { Lightbulb, RefreshCw, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Reveal from '@/components/ui/reveal';

interface FunFactProps {
  data: {
    funFacts: string[];
  };
}

const FunFact = ({ data }: FunFactProps) => {
  const [currentFact, setCurrentFact] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const getRandomFact = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * data.funFacts.length);
      setCurrentFact(data.funFacts[randomIndex]);
      setIsAnimating(false);
    }, 300);
  }, [data.funFacts]);

  useEffect(() => {
    getRandomFact();
  }, [getRandomFact]);

  return (
    <section id="funfact" className="py-16 bg-gradient-hero relative overflow-hidden">
      {/* Subtle background dots */}
      <div className="absolute inset-0 hero-dot-grid opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="scale">
          <Card className="card-elevated border border-border/50 bg-background/95 backdrop-blur-sm overflow-hidden">
            {/* Top accent stripe */}
            <div className="h-1 w-full bg-gradient-primary" />

            <CardContent className="p-8 sm:p-10 text-center">
              {/* Icon */}
              <div className="relative inline-flex mb-6 animate-bounce-in">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-lg">
                  <Lightbulb className="h-8 w-8 text-white" />
                </div>
                {/* Sparkle corner decoration */}
                <Sparkles className="absolute -top-2 -right-2 h-5 w-5 text-primary animate-spin" style={{ animationDuration: '3s' }} />
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold mb-1 gradient-text-animated">
                Fun Fact
              </h2>
              <p className="text-xs text-muted-foreground mb-6 tracking-widest uppercase">about me</p>

              {/* Fact text */}
              <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
                <p className="text-lg sm:text-xl text-foreground leading-relaxed mb-8 font-medium">
                  <span className="text-primary/60 text-3xl leading-none mr-1">"</span>
                  {currentFact}
                  <span className="text-primary/60 text-3xl leading-none ml-1">"</span>
                </p>
              </div>

              <Button
                onClick={getRandomFact}
                variant="outline"
                className="flex items-center gap-2 mx-auto hover:scale-105 transition-all duration-200 border-primary/30 hover:border-primary/50 hover:bg-primary/5"
              >
                <RefreshCw className={`h-4 w-4 ${isAnimating ? 'animate-spin' : ''} transition-all`} />
                Another Fun Fact
              </Button>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  );
};

export default FunFact;
