import { Award, Eye, ChevronDown, ChevronUp, ExternalLink, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState, useRef, useCallback } from 'react';
import { PortfolioData } from '@/lib/dataLoader';
import Reveal from '@/components/ui/reveal';

interface CertificationsProps {
  data: PortfolioData;
}

// Provider → subtle accent colour (hue only, opacity applied inline)
const PROVIDER_HUE: Record<string, string> = {
  IBM: '207',
  Coursera: '225',
  'Stanford Online': '0',
  'Google Cloud': '142',
  AWS: '28',
  'Infosys Springboard': '207',
  'IIT Kanpur': '258',
  'Apna College': '196',
  'Great Learning': '152',
};

function getProviderHue(provider: string) {
  return PROVIDER_HUE[provider] ?? '207';
}

// ── Individual cert card with mouse-spotlight ───────────────────────────────
interface CertCardProps {
  cert: PortfolioData['certifications'][number];
  index: number;
  onViewImage: (img: { name: string; path: string }) => void;
}

const CertCard = ({ cert, index, onViewImage }: CertCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState({ x: -1, y: -1, active: false });
  const hue = getProviderHue(cert.provider);
  const num = String(index + 1).padStart(2, '0');

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top, active: true });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setSpotlight({ x: -1, y: -1, active: false });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="cert-card group relative rounded-xl border border-border/60 bg-card overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col h-full"
      style={{
        '--cert-hue': hue,
      } as React.CSSProperties}
    >
      {/* Mouse spotlight */}
      {spotlight.active && (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(500px circle at ${spotlight.x}px ${spotlight.y}px, hsl(${hue} 80% 55% / 0.08), transparent 50%)`,
          }}
        />
      )}

      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-300 opacity-30 group-hover:opacity-100"
        style={{ background: `hsl(${hue} 80% 50%)` }}
      />

      <div className="relative z-10 p-5 flex flex-col h-full">
        {/* Top row: index + provider */}
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-xs font-semibold text-muted-foreground/50 tracking-widest select-none">
            {num}
          </span>
          <span
            className="text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full border"
            style={{
              color: `hsl(${hue} 70% 45%)`,
              borderColor: `hsl(${hue} 70% 45% / 0.25)`,
              background: `hsl(${hue} 80% 55% / 0.07)`,
            }}
          >
            {cert.provider}
          </span>
        </div>

        {/* Cert name */}
        <h3 className="font-semibold text-foreground text-sm sm:text-base leading-snug mb-2 group-hover:text-primary transition-colors duration-200">
          {cert.name.trim()}
        </h3>

        {/* Credential ID */}
        {cert.credential && (
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground/60 mb-3 font-mono">
            <ShieldCheck className="h-3 w-3 flex-shrink-0" />
            <span className="truncate">{cert.credential}</span>
          </div>
        )}

        {/* Skills */}
        {cert.skills && cert.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {cert.skills.slice(0, 5).map((skill, i) => (
              <Badge
                key={i}
                variant="secondary"
                className="text-[11px] px-2 py-0 h-5 font-normal"
              >
                {skill}
              </Badge>
            ))}
            {cert.skills.length > 5 && (
              <Badge variant="outline" className="text-[11px] px-2 py-0 h-5 text-muted-foreground">
                +{cert.skills.length - 5}
              </Badge>
            )}
          </div>
        )}

        {/* Divider + actions */}
        <div className="mt-auto pt-3 border-t border-border/40 flex flex-wrap items-center gap-2">
          {cert.verify_cred_link && (
            <a
              href={cert.verify_cred_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold rounded-md transition-all duration-200 hover:scale-105"
              style={{
                background: `hsl(${hue} 80% 55% / 0.1)`,
                color: `hsl(${hue} 70% 42%)`,
                border: `1px solid hsl(${hue} 70% 50% / 0.2)`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = `hsl(${hue} 80% 50%)`;
                (e.currentTarget as HTMLElement).style.color = 'white';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = `hsl(${hue} 80% 55% / 0.1)`;
                (e.currentTarget as HTMLElement).style.color = `hsl(${hue} 70% 42%)`;
              }}
            >
              <ExternalLink className="h-3 w-3" />
              Verify
            </a>
          )}
          {cert.image && (
            <button
              onClick={() => onViewImage({ name: cert.name.trim(), path: cert.image! })}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold rounded-md border border-border/60 text-muted-foreground hover:text-foreground hover:border-border transition-all duration-200"
            >
              <Eye className="h-3 w-3" />
              Certificate
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ── Main section ─────────────────────────────────────────────────────────────
const Certifications = ({ data }: CertificationsProps) => {
  const [selectedImage, setSelectedImage] = useState<{ name: string; path: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const INITIAL_COUNT = 6;
  const displayed = showAll ? data.certifications : data.certifications.slice(0, INITIAL_COUNT);

  const openImageModal = (img: { name: string; path: string }) => {
    setSelectedImage(img);
    setIsModalOpen(true);
  };

  return (
    <section id="certifications" className="py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <Reveal className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-2 gradient-text">
            Certifications
          </h2>
          <div className="section-accent-line" />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6">
            Continuous learning and professional development in cutting-edge technologies
          </p>
        </Reveal>

        {/* Stats row */}
        <Reveal delay={100} className="flex flex-wrap justify-center gap-8 mb-12">
          {[
            { value: data.certifications.length, label: 'Certifications' },
            { value: [...new Set(data.certifications.map(c => c.provider))].length, label: 'Providers' },
            { value: data.certifications.filter(c => c.verify_cred_link).length, label: 'Verified' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-3xl font-bold gradient-text">{value}</p>
              <p className="text-sm text-muted-foreground mt-0.5">{label}</p>
            </div>
          ))}
        </Reveal>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 [grid-auto-rows:1fr]">
          {displayed.map((cert, index) => (
            <Reveal
              key={index}
              delay={index * 50}
              direction={index % 2 === 0 ? 'left' : 'right'}
              className="h-full"
            >
              <CertCard
                cert={cert}
                index={index}
                onViewImage={openImageModal}
              />
            </Reveal>
          ))}
        </div>

        {/* Show more/less */}
        {data.certifications.length > INITIAL_COUNT && (
          <div className="flex justify-center mt-10">
            <Button
              variant="outline"
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-2 px-8 hover:bg-primary/5 hover:border-primary/30 transition-all duration-300"
            >
              {showAll ? (
                <><ChevronUp className="h-4 w-4" /> Show Less</>
              ) : (
                <><ChevronDown className="h-4 w-4" /> Show {data.certifications.length - INITIAL_COUNT} More</>
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Certificate image modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedImage?.name}</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <img
              src={`${import.meta.env.BASE_URL}${selectedImage.path.startsWith('/') ? selectedImage.path.slice(1) : selectedImage.path}`}
              alt={selectedImage.name}
              className="w-full h-auto max-h-[70vh] object-contain rounded-lg border"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=800&h=600&fit=crop';
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Certifications;
