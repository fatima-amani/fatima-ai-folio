import { Github, Linkedin, Mail, Heart } from 'lucide-react';

interface FooterProps {
  data: {
    personal: {
      name: string;
      social: {
        github: string;
        linkedin: string;
        email: string;
      };
    };
  };
}

const Footer = ({ data }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left side - Name and copyright */}
          <div>
            <h3 className="text-2xl font-bold gradient-text mb-2">
              {data.personal.name}
            </h3>
            <p className="text-muted-foreground mb-4">
              Backend Developer & AI Enthusiast
            </p>
            <p className="text-sm text-muted-foreground">
              © {currentYear} {data.personal.name}. Built with{' '}
              <Heart className="inline h-4 w-4 text-red-500" />{' '}
              using React & Tailwind CSS.
            </p>
          </div>

          {/* Right side - Social links and quick links */}
          <div className="md:text-right">
            <div className="flex md:justify-end space-x-6 mb-4">
              <a
                href={data.personal.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors p-2"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href={data.personal.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors p-2"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href={`mailto:${data.personal.social.email}`}
                className="text-muted-foreground hover:text-primary transition-colors p-2"
                aria-label="Email"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
            <div className="flex md:justify-end space-x-6 text-sm">
              <button
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                About
              </button>
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Projects
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;