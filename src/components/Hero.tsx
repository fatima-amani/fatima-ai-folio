import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, FileText, ChevronDown, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PortfolioData } from '@/lib/dataLoader';
import Aurora from '@/components/ui/aurora';
import Meteors from '@/components/ui/meteors';

interface HeroProps {
  data: PortfolioData;
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
            const t = setTimeout(() => {
              setDisplayTitle(title.slice(0, displayTitle.length + 1));
            }, 100);
            return () => clearTimeout(t);
          } else {
            setAnimationPhase('description');
          }
          break;
        case 'description':
          setTimeout(() => { setShowDescription(true); setAnimationPhase('pause'); }, 500);
          break;
        case 'pause':
          setTimeout(() => setAnimationPhase('erase'), 2200);
          break;
        case 'erase':
          if (showDescription) {
            setShowDescription(false);
          } else if (displayTitle.length > 0) {
            const t = setTimeout(() => setDisplayTitle(displayTitle.slice(0, -1)), 50);
            return () => clearTimeout(t);
          } else {
            setCurrentTaglineIndex((p) => (p + 1) % data.personal.taglines.length);
            setAnimationPhase('title');
          }
          break;
      }
    } else {
      if (animationPhase === 'title') {
        if (displayTitle.length < currentTagline.length) {
          const t = setTimeout(() => setDisplayTitle(currentTagline.slice(0, displayTitle.length + 1)), 100);
          return () => clearTimeout(t);
        } else {
          setTimeout(() => setAnimationPhase('pause'), 1000);
        }
      } else if (animationPhase === 'pause') {
        setTimeout(() => setAnimationPhase('erase'), 2200);
      } else if (animationPhase === 'erase') {
        if (displayTitle.length > 0) {
          const t = setTimeout(() => setDisplayTitle(displayTitle.slice(0, -1)), 50);
          return () => clearTimeout(t);
        } else {
          setCurrentTaglineIndex((p) => (p + 1) % data.personal.taglines.length);
          setAnimationPhase('title');
        }
      }
    }
  }, [displayTitle, showDescription, animationPhase, currentTaglineIndex, data.personal.taglines]);

  const currentTagline = data.personal.taglines[currentTaglineIndex];
  const hasHyphen = currentTagline.includes(' - ');
  const [, description] = hasHyphen ? currentTagline.split(' - ') : [currentTagline, ''];

  const socialLinks = [
    {
      href: data.personal.social.github,
      icon: <Github className="h-5 w-5" />,
      label: 'GitHub',
      onClick: undefined as (() => void) | undefined,
    },
    {
      href: data.personal.social.linkedin,
      icon: <Linkedin className="h-5 w-5" />,
      label: 'LinkedIn',
      onClick: undefined as (() => void) | undefined,
    },
    {
      href: data.personal.social.credly,
      icon: <Award className="h-5 w-5" />,
      label: 'Credly',
      onClick: undefined as (() => void) | undefined,
    },
    {
      href: '#',
      icon: <Mail className="h-5 w-5" />,
      label: 'Email',
      onClick: () => {
        const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(data.personal.social.email)}&su=${encodeURIComponent('Project Discussion')}&body=${encodeURIComponent('Hi Fatima,\n\nI\'d like to discuss a project with you.\n\nBest regards,')}`;
        window.open(url, '_blank');
      },
    },
  ];

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative pt-20 sm:pt-24 md:pt-28 lg:pt-32 overflow-hidden bg-background"
    >
      {/* ── Aurora orbs ── */}
      <div className="absolute inset-0 pointer-events-none">
        <Aurora />
      </div>

      {/* ── Dot grid overlay ── */}
      <div className="absolute inset-0 hero-dot-grid pointer-events-none opacity-50" />

      {/* ── Meteor shower ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Meteors count={16} />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Greeting */}
        <p className="text-lg sm:text-xl text-muted-foreground font-light mb-3 animate-fade-in-up tracking-widest uppercase">
          Hello, world 👋
        </p>

        {/* Name */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-5 animate-fade-in-up">
          <span className="text-shimmer">Hi, I'm</span>{' '}
          <span className="gradient-text-animated">{data.personal.firstname}</span>
        </h1>

        {/* Title / subtitle */}
        <div className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground mb-5 animate-fade-in-up animation-delay-100 font-light tracking-wide">
          {data.personal.title}
          <span className="text-primary/40 mx-3">·</span>
          {data.personal.subtitle}
        </div>

        {/* Typing animation */}
        <div className="h-20 flex flex-col items-center justify-center mb-6">
          <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-primary mb-2 flex items-center gap-0">
            <span>{displayTitle}</span>
            <span className="typing-cursor" />
          </div>
          {hasHyphen && (
            <div
              className={`text-lg sm:text-xl text-accent font-medium transition-all duration-500 ${
                showDescription ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}
            >
              {description}
            </div>
          )}
        </div>

        {/* Location */}
        <p className="text-base text-muted-foreground mb-8 animate-fade-in-up animation-delay-200">
          📍 {data.personal.location}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10 animate-fade-in-up animation-delay-300">
          <Button
            size="lg"
            className="bg-gradient-primary hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-primary/30 hover:scale-105 animate-glow"
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <Mail className="mr-2 h-5 w-5" />
            Get In Touch
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary/40 hover:bg-primary/8 hover:scale-105 transition-all duration-200"
            onClick={() => window.open(data.personal.resume, '_blank')}
          >
            <FileText className="mr-2 h-5 w-5" />
            View Resume
          </Button>
        </div>

        {/* Social links — wave-in stagger */}
        <div className="flex justify-center space-x-3 mb-16">
          {socialLinks.map(({ href, icon, label, onClick }, i) => (
            <a
              key={label}
              href={onClick ? undefined : href}
              target={onClick ? undefined : '_blank'}
              rel={onClick ? undefined : 'noopener noreferrer'}
              onClick={onClick}
              aria-label={label}
              className="group flex items-center justify-center w-11 h-11 rounded-full border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/8 transition-all duration-200 hover:scale-110 cursor-pointer animate-wave-in"
              style={{ animationDelay: `${400 + i * 80}ms` }}
            >
              {icon}
            </a>
          ))}
        </div>

        {/* Scroll indicator */}
        <button
          onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
          className="animate-scroll-pulse text-muted-foreground hover:text-primary transition-colors"
          aria-label="Scroll down"
        >
          <ChevronDown className="h-8 w-8 mx-auto" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
