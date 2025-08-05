import { Users, ChevronRight, Calendar, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface LeadershipProps {
  data: {
    leadership: Array<{
      role: string;
      organization: string;
      duration: string;
      responsibilities: string[];
      images: string[];
    }>;
  };
}

const Leadership = ({ data }: LeadershipProps) => {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const toggleExpanded = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

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

                {/* View Images Button */}
                {position.images.length > 0 && (
                  <div className="border-t pt-4 mt-4">
                    <Button
                      variant="outline"
                      onClick={() => toggleExpanded(index)}
                      className="flex items-center gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      {expandedItems.includes(index) ? 'Hide Images' : 'View Images'}
                    </Button>
                    
                    {expandedItems.includes(index) && (
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
                        {position.images.map((image, imageIndex) => (
                          <div key={imageIndex} className="rounded-lg overflow-hidden border">
                            <img 
                              src={image} 
                              alt={`${position.organization} - Image ${imageIndex + 1}`}
                              className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                e.currentTarget.src = `https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop`;
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Leadership;