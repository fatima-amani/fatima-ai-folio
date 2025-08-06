import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Download, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroProps {
  data: {
    personal: {
      name: string;
      firstname: string;
      title: string;
      subtitle: string;
      location: string;
      taglines: string[];
      social: {
        github: string;
        linkedin: string;
        email: string;
      };
      resume: string;
    };
  };
}

const Hero = ({ data }: HeroProps) => {
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);
  const [displayTitle, setDisplayTitle] = useState('');
  const [showDescription, setShowDescription] = useState(false);
  const [animationPhase, setAnimationPhase] = useState<'title' | 'description' | 'pause' | 'erase'>('title');

  useEffect(() => {
    const currentTagline = data.personal.taglines[currentTaglineIndex];
    const hasHyphen = currentTagline.includes(' - ');
    
    if (hasHyphen) {
      const [title, description] = currentTagline.split(' - ');
      
      switch (animationPhase) {
        case 'title':
          if (displayTitle.length < title.length) {
            const timeout = setTimeout(() => {
              setDisplayTitle(title.slice(0, displayTitle.length + 1));
            }, 100);
            return () => clearTimeout(timeout);
          } else {
            setAnimationPhase('description');
          }
          break;
          
        case 'description':
          setTimeout(() => {
            setShowDescription(true);
            setAnimationPhase('pause');
          }, 500);
          break;
          
        case 'pause':
          setTimeout(() => {
            setAnimationPhase('erase');
          }, 2000);
          break;
          
        case 'erase':
          if (showDescription) {
            setShowDescription(false);
          } else if (displayTitle.length > 0) {
            const timeout = setTimeout(() => {
              setDisplayTitle(displayTitle.slice(0, -1));
            }, 50);
            return () => clearTimeout(timeout);
          } else {
            setCurrentTaglineIndex((prev) => (prev + 1) % data.personal.taglines.length);
            setAnimationPhase('title');
          }
          break;
      }
    } else {
      // Original animation for simple taglines
      if (animationPhase === 'title') {
        if (displayTitle.length < currentTagline.length) {
          const timeout = setTimeout(() => {
            setDisplayTitle(currentTagline.slice(0, displayTitle.length + 1));
          }, 100);
          return () => clearTimeout(timeout);
        } else {
          setTimeout(() => {
            setAnimationPhase('pause');
          }, 1000);
        }
      } else if (animationPhase === 'pause') {
        setTimeout(() => {
          setAnimationPhase('erase');
        }, 2000);
      } else if (animationPhase === 'erase') {
        if (displayTitle.length > 0) {
          const timeout = setTimeout(() => {
            setDisplayTitle(displayTitle.slice(0, -1));
          }, 50);
          return () => clearTimeout(timeout);
        } else {
          setCurrentTaglineIndex((prev) => (prev + 1) % data.personal.taglines.length);
          setAnimationPhase('title');
        }
      }
    }
  }, [displayTitle, showDescription, animationPhase, currentTaglineIndex, data.personal.taglines]);

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentTagline = data.personal.taglines[currentTaglineIndex];
  const hasHyphen = currentTagline.includes(' - ');
  const [title, description] = hasHyphen ? currentTagline.split(' - ') : [currentTagline, ''];

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative hero-glow pt-20 sm:pt-24 md:pt-28 lg:pt-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Floating animation elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-20 h-20 bg-primary/10 rounded-full animate-float"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-accent/10 rounded-full animate-float animation-delay-200"></div>
          <div className="absolute bottom-40 left-1/4 w-12 h-12 bg-tech-cyan/10 rounded-full animate-float animation-delay-400"></div>
        </div>

        <div className="relative z-10">
          {/* Main heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up">
            Hi, I'm{' '}
            <span className="gradient-text">{data.personal.firstname}</span>
          </h1>

          {/* Subtitle */}
          <div className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground mb-4 animate-fade-in-up animation-delay-100">
            {data.personal.title} | {data.personal.subtitle}
          </div>

          {/* Enhanced Two-Line Typing animation */}
          <div className="h-24 flex flex-col items-center justify-center mb-8">
            {/* Title Line */}
            <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-primary mb-2">
              <span>{displayTitle}</span>
              <span className="animate-pulse">|</span>
            </div>
            
            {/* Description Line */}
            {hasHyphen && (
              <div className={`text-lg sm:text-xl lg:text-2xl text-accent font-medium transition-all duration-500 ${
                showDescription 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-2'
              }`}>
                {description}
              </div>
            )}
          </div>

          {/* Location */}
          <p className="text-lg text-muted-foreground mb-8 animate-fade-in-up animation-delay-200">
            📍 {data.personal.location}
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up animation-delay-300">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:opacity-90 transition-opacity animate-glow"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Mail className="mr-2 h-5 w-5" />
              Get In Touch
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary/50 hover:bg-primary/10"
              onClick={() => window.open(data.personal.resume, '_blank')}
            >
              <Download className="mr-2 h-5 w-5" />
              Download Resume
            </Button>
          </div>

          {/* Social links */}
          <div className="flex justify-center space-x-6 mb-16 animate-fade-in-up animation-delay-400">
            <a
              href={data.personal.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors p-2 hover:scale-110 transform"
            >
              <Github className="h-7 w-7" />
            </a>
            <a
              href={data.personal.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors p-2 hover:scale-110 transform"
            >
              <Linkedin className="h-7 w-7" />
            </a>
            <a
              href={`mailto:${data.personal.social.email}`}
              className="text-muted-foreground hover:text-primary transition-colors p-2 hover:scale-110 transform"
            >
              <Mail className="h-7 w-7" />
            </a>
          </div>

          {/* Scroll indicator */}
          <button
            onClick={scrollToNext}
            className="animate-bounce hover:text-primary transition-colors"
            aria-label="Scroll to next section"
          >
            <ChevronDown className="h-8 w-8 mx-auto" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;