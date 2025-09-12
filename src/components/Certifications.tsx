import { Award, Eye, Star, ChevronDown, ChevronUp, ExternalLink, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';
import { PortfolioData } from '@/lib/dataLoader';

interface CertificationsProps {
  data: PortfolioData;
}

const Certifications = ({ data }: CertificationsProps) => {
  const [selectedImage, setSelectedImage] = useState<{
    name: string;
    path: string;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const displayedCertifications = showAll 
    ? data.certifications 
    : data.certifications.slice(0, 4);

  const openImageModal = (image: { name: string; path: string }) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeImageModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

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

        <div className="space-y-8">
          {displayedCertifications.map((cert, index) => (
            <Card 
              key={index} 
              className="card-elevated animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl font-bold text-primary mb-2">
                      {cert.name}
                    </CardTitle>
                    <div className="flex items-center text-lg font-semibold text-foreground mb-2">
                      <Award className="h-4 w-4 mr-2 text-muted-foreground" />
                      {cert.provider}
                    </div>
                  </div>
                  {cert.credential && (
                    <Badge variant="outline" className="flex items-center gap-2 px-4 py-2 text-sm">
                      <Star className="h-4 w-4" />
                      ID: {cert.credential}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {/* Skills Section */}
                {cert.skills && cert.skills.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-3 flex items-center gap-2 text-primary">
                      <Star className="h-5 w-5" />
                      Skills Gained
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary" className="text-sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Verification Link */}
                {cert.verify_cred_link && (
                  <div className="mb-6">
                    <a
                      href={cert.verify_cred_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Verify Credential
                    </a>
                  </div>
                )}

                {/* View Certificate Button */}
                {cert.image && (
                  <div className="border-t pt-4">
                    <Button
                      variant="outline"
                      onClick={() => openImageModal({ name: cert.name, path: cert.image! })}
                      className="flex items-center gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      View Certificate
                    </Button>
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

      {/* Certificate Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedImage?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedImage && (
              <div className="relative">
                <img 
                  src={selectedImage.path}
                  alt={selectedImage.name}
                  className="w-full h-auto max-h-[70vh] object-contain rounded-lg border"
                  onError={(e) => {
                    e.currentTarget.src = `https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=800&h=600&fit=crop`;
                  }}
                />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Certifications;