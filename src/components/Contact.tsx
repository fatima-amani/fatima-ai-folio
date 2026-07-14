import { Mail, Github, Linkedin, MapPin, FileText, Send, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Reveal from '@/components/ui/reveal';

interface ContactProps {
  data: {
    personal: {
      name: string;
      location: string;
      email: string;
      social: {
        github: string;
        linkedin: string;
        email: string;
      };
      resume: string;
    };
  };
}

const contactLinks = (data: ContactProps['data']) => [
  {
    icon: Linkedin,
    label: 'LinkedIn',
    sublabel: 'Connect professionally',
    href: data.personal.social.linkedin,
    onClick: undefined as (() => void) | undefined,
  },
  {
    icon: Github,
    label: 'GitHub',
    sublabel: 'Explore my code',
    href: data.personal.social.github,
    onClick: undefined as (() => void) | undefined,
  },
  {
    icon: Mail,
    label: 'Email',
    sublabel: data.personal.email,
    href: undefined as string | undefined,
    onClick: () => {
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(data.personal.email)}&su=${encodeURIComponent('Project Discussion')}&body=${encodeURIComponent('Hi Fatima,\n\nI\'d like to discuss a project with you.\n\nBest regards,')}`;
      window.open(gmailUrl, '_blank');
    },
  },
  {
    icon: FileText,
    label: 'Resume',
    sublabel: 'View full CV',
    href: undefined as string | undefined,
    onClick: () => window.open(data.personal.resume, '_blank'),
  },
];

const Contact = ({ data }: ContactProps) => {
  const links = contactLinks(data);

  return (
    <section id="contact" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-2 gradient-text">
            Let's Work Together
          </h2>
          <div className="section-accent-line" />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6">
            Ready to bring your next project to life? Let's discuss how we can create something amazing together.
          </p>
        </Reveal>

        <div className="max-w-4xl mx-auto">
          {/* Two-column layout: message left, links right */}
          <div className="grid md:grid-cols-5 gap-8 mb-10">
            {/* Left: message */}
            <div className="md:col-span-2 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">{data.personal.location}</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3 leading-snug">
                Open to new <span className="gradient-text">opportunities</span>
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Whether it's a full-time role, freelance project, or just a chat about tech — my inbox is always open.
              </p>
            </div>

            {/* Right: contact links grid */}
            <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {links.map(({ icon: Icon, label, sublabel, href, onClick }) => (
                <a
                  key={label}
                  href={onClick ? undefined : href}
                  target={onClick ? undefined : '_blank'}
                  rel={onClick ? undefined : 'noopener noreferrer'}
                  onClick={onClick}
                  className="group flex items-center gap-3 p-4 rounded-xl border border-border/60 hover:border-primary/30 hover:bg-primary/3 bg-card transition-all duration-200 hover:shadow-sm cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">{label}</p>
                    <p className="text-xs text-muted-foreground truncate">{sublabel}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                </a>
              ))}
            </div>
          </div>

          {/* CTA Banner with border beam */}
          <Card className="border-0 overflow-visible">
            <CardContent className="p-0">
              <div className="border-beam bg-gradient-hero rounded-2xl p-8 border border-border/40 relative overflow-hidden">
                {/* Subtle background pattern */}
                <div className="absolute inset-0 hero-dot-grid opacity-30 pointer-events-none" />
                <div className="relative z-10 text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-4">
                    <Send className="h-3 w-3" />
                    Available for projects
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-foreground">Ready to Start?</h3>
                  <p className="text-muted-foreground max-w-lg mx-auto mb-6 text-sm leading-relaxed">
                    Whether you have a specific project in mind or just want to explore possibilities,
                    I'm excited to hear from you.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <Button
                      size="lg"
                      className="bg-gradient-primary hover:opacity-90 gap-2 shadow-sm"
                      onClick={() => {
                        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(data.personal.email)}&su=${encodeURIComponent('Project Discussion')}&body=${encodeURIComponent('Hi Fatima,\n\nI\'d like to discuss a project with you.\n\nBest regards,')}`;
                        window.open(gmailUrl, '_blank');
                      }}
                    >
                      <Mail className="h-4 w-4" />
                      Start a conversation
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-primary/40 hover:bg-primary/8 gap-2"
                      onClick={() => {
                        const linkedinDMUrl = `${data.personal.social.linkedin}/messaging/compose/`;
                        window.open(linkedinDMUrl, '_blank');
                      }}
                    >
                      <Linkedin className="h-4 w-4" />
                      Message on LinkedIn
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
