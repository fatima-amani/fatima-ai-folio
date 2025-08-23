import { Mail, Github, Linkedin, MapPin, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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

const Contact = ({ data }: ContactProps) => {
  return (
    <section id="contact" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">
            Let's Work Together
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to bring your next project to life? Let's discuss how we can create something amazing together.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Combined Contact & Social */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-primary">Get In Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* 2-Column Grid for Contact Methods */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* LinkedIn */}
                  <a
                    href={data.personal.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-4 rounded-lg hover:bg-primary/5 transition-all duration-200 group border border-border/20 hover:border-primary/20 hover:scale-105"
                  >
                    <Linkedin className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                    <span className="text-muted-foreground group-hover:text-primary text-sm">
                      Connect on LinkedIn
                    </span>
                  </a>
                  
                  {/* GitHub */}
                  <a
                    href={data.personal.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-4 rounded-lg hover:bg-primary/5 transition-all duration-200 group border border-border/20 hover:border-primary/20 hover:scale-105"
                  >
                    <Github className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                    <span className="text-muted-foreground group-hover:text-primary text-sm">
                      View my projects on GitHub
                    </span>
                  </a>
                  
                  {/* Email - Compact */}
                  <div className="flex items-center space-x-3 p-4 rounded-lg hover:bg-primary/5 transition-all duration-200 group border border-border/20 hover:border-primary/20 hover:scale-105 cursor-pointer"
                       onClick={() => {
                         // Gmail compose URL with pre-filled email
                         const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(data.personal.email)}&su=${encodeURIComponent('Project Discussion')}&body=${encodeURIComponent('Hi Fatima,\n\nI\'d like to discuss a project with you.\n\nBest regards,')}`;
                         window.open(gmailUrl, '_blank');
                       }}>
                    <Mail className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                    <span className="text-muted-foreground group-hover:text-primary text-sm">
                      {data.personal.email}
                    </span>
                  </div>
                  
                  {/* Resume Download - Compact */}
                  <div className="flex items-center space-x-3 p-4 rounded-lg hover:bg-primary/5 transition-all duration-200 group border border-border/20 hover:border-primary/20 hover:scale-105 cursor-pointer"
                       onClick={() => window.open(data.personal.resume, '_blank')}>
                    <Download className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                    <span className="text-muted-foreground group-hover:text-primary text-sm">
                      View Resume
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-hero rounded-2xl p-8 card-elevated">
            <h3 className="text-2xl font-semibold mb-4 text-primary">Ready to Start?</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Whether you have a specific project in mind or just want to explore possibilities, 
              I'm excited to hear from you. Let's build something incredible together.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-primary hover:opacity-90"
                onClick={() => {
                  // Gmail compose URL with pre-filled email
                  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(data.personal.email)}&su=${encodeURIComponent('Project Discussion')}&body=${encodeURIComponent('Hi Fatima,\n\nI\'d like to discuss a project with you.\n\nBest regards,')}`;
                  window.open(gmailUrl, '_blank');
                }}
              >
                <Mail className="h-5 w-5 mr-2" />
                Start a conversation
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/50 hover:bg-primary/10 text-primary"
                onClick={() => {
                  // LinkedIn DM URL - this will open the messaging compose window
                  const linkedinDMUrl = `${data.personal.social.linkedin}/messaging/compose/`;
                  window.open(linkedinDMUrl, '_blank');
                }}
              >
                <Linkedin className="h-5 w-5 mr-2" />
                Message on LinkedIn
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;