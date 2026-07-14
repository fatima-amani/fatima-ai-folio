import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';
import { PortfolioData } from '@/lib/dataLoader';
import Reveal from '@/components/ui/reveal';
import ExperienceCard from './ExperienceCard';

interface ExperienceProps {
  data: PortfolioData;
}

const Experience = ({ data }: ExperienceProps) => {
  const [selectedImage, setSelectedImage] = useState<{
    name: string;
    path: string;
    description?: string;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openImageModal = (image: { name: string; path: string; description?: string }) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-2 gradient-text">
            Experience
          </h2>
          <div className="section-accent-line" />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6">
            Building impactful solutions and driving automation in fast-paced development environments
          </p>
        </Reveal>

        {/* Timeline container */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-6 top-3 bottom-3 w-0.5 timeline-line hidden sm:block" />

          <div className="space-y-10">
            {data.experience.map((exp, index) => (
              <Reveal key={index} delay={index * 100} className="relative sm:pl-16">
                {/* Timeline dot */}
                <div className="absolute left-[18px] top-7 w-4 h-4 rounded-full timeline-dot pulse-ring hidden sm:block z-10" />

                <ExperienceCard exp={exp} onImageClick={openImageModal} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedImage?.name}</DialogTitle>
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
                    <p className="text-muted-foreground leading-relaxed text-sm">
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
