import { useState, useEffect, useCallback } from 'react';
import { Lightbulb, RefreshCw } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface FunFactProps {
  data: {
    funFacts: string[];
  };
}

const FunFact = ({ data }: FunFactProps) => {
  const [currentFact, setCurrentFact] = useState('');

  const getRandomFact = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * data.funFacts.length);
    setCurrentFact(data.funFacts[randomIndex]);
  }, [data.funFacts]);

  useEffect(() => {
    getRandomFact();
  }, [getRandomFact]);

  return (
    <section id="funfact" className="py-20 bg-gradient-hero">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Card className="card-elevated bg-background/95 backdrop-blur border-0">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Lightbulb className="h-8 w-8 text-primary" />
                </div>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 gradient-text">
                Fun Fact
              </h2>
              
              <div className="relative">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 animate-fade-in">
                  "{currentFact}"
                </p>
              </div>
              
              <Button 
                onClick={getRandomFact}
                variant="outline"
                className="flex items-center gap-2 mx-auto hover:scale-105 transition-transform"
              >
                <RefreshCw className="h-4 w-4" />
                Another Fun Fact
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FunFact;