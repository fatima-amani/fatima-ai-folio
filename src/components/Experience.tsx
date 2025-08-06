import { Calendar, MapPin, ChevronRight, Eye, Star, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';

interface ExperienceProps {
  data: {
    experience: Array<{
      title: string;
      company: string;
      duration: string;
      achievements: string[];
      highlights: string[];
      images: Array<{
        name: string;
        path: string;
        description?: string;
      }>;
    }>;
  };
}

const Experience = ({ data }: ExperienceProps) => {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [selectedImage, setSelectedImage] = useState<{
    name: string;
    path: string;
    description?: string;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleExpanded = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const openImageModal = (image: { name: string; path: string; description?: string }) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeImageModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

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
                {/* Achievements Section */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-3 flex items-center gap-2 text-primary">
                    <Star className="h-5 w-5" />
                    Key Achievements
                  </h4>
                  <div className="grid gap-2">
                    {exp.achievements.map((achievement, achievementIndex) => (
                      <div 
                        key={achievementIndex}
                        className="bg-primary/5 border border-primary/20 rounded-lg p-3"
                      >
                        <span className="text-foreground font-medium">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Highlights Section */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-3 text-foreground">Highlights</h4>
                  <ul className="space-y-3">
                    {exp.highlights.map((highlight, highlightIndex) => (
                      <li 
                        key={highlightIndex} 
                        className="flex items-start space-x-3 group"
                      >
                        <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                        <span className="text-muted-foreground leading-relaxed">
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* View More Button */}
                {exp.images.length > 0 && (
                  <div className="border-t pt-4">
                    <Button
                      variant="outline"
                      onClick={() => toggleExpanded(index)}
                      className="flex items-center gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      {expandedItems.includes(index) ? 'Hide Images' : 'View Images'}
                    </Button>
                    
                    {expandedItems.includes(index) && (
                      <div className="mt-4 space-y-3 animate-fade-in">
                        {exp.images.map((image, imageIndex) => (
                          <div 
                            key={imageIndex} 
                            className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors cursor-pointer"
                            onClick={() => openImageModal(image)}
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                <Eye className="h-4 w-4 text-primary" />
                              </div>
                              <span className="font-medium text-foreground">{image.name}</span>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
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

      {/* Image Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{selectedImage?.name}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeImageModal}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedImage && (
              <>
                <div className="relative">
                  <img 
                    src={`${import.meta.env.BASE_URL}${selectedImage.path}`}
                    alt={selectedImage.name}
                    className="w-full h-auto max-h-[70vh] object-contain rounded-lg border"
                    onError={(e) => {
                      e.currentTarget.src = `https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop`;
                    }}
                  />
                </div>
                {selectedImage.description && (
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedImage.description}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Experience;