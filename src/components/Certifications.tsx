import { Award, Eye, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface CertificationsProps {
  data: {
    certifications: Array<{
      name: string;
      provider: string;
      skills: string[];
      image: string;
    }>;
  };
}

const Certifications = ({ data }: CertificationsProps) => {
  const [viewingCert, setViewingCert] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const displayedCertifications = showAll 
    ? data.certifications 
    : data.certifications.slice(0, 4);

  return (
    <section id="certifications" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">
            Certifications
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Continuous learning and professional development in cutting-edge technologies
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {displayedCertifications.map((cert, index) => (
            <Card 
              key={index} 
              className="card-elevated animate-fade-in-up group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl font-bold text-primary mb-2 group-hover:text-primary/80 transition-colors">
                      {cert.name}
                    </CardTitle>
                    <div className="flex items-center text-lg font-semibold text-foreground mb-3">
                      <Award className="h-5 w-5 mr-2 text-muted-foreground" />
                      {cert.provider}
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    Skills Gained
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button
                  variant="outline"
                  onClick={() => setViewingCert(viewingCert === index ? null : index)}
                  className="flex items-center gap-2 w-full"
                >
                  <Eye className="h-4 w-4" />
                  {viewingCert === index ? 'Hide Certificate' : 'View Certificate'}
                </Button>

                {viewingCert === index && (
                  <div className="mt-4 animate-fade-in">
                    <div className="rounded-lg overflow-hidden border bg-muted/20 p-4">
                      <img 
                        src={cert.image} 
                        alt={`${cert.name} Certificate`}
                        className="w-full h-64 object-contain rounded-lg bg-white"
                        onError={(e) => {
                          e.currentTarget.src = `https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=600&h=400&fit=crop`;
                        }}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* See More/Less Button */}
        {data.certifications.length > 4 && (
          <div className="flex justify-center mt-12">
            <Button
              variant="outline"
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-2 px-8 py-3 text-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              {showAll ? (
                <>
                  <ChevronUp className="h-5 w-5" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="h-5 w-5" />
                  See More ({data.certifications.length - 4} more)
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Certifications;