import { useState } from 'react';
import { Mail, Github, Linkedin, Send, MapPin, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create mailto link as fallback
      const mailtoLink = `mailto:${data.personal.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `Hi ${data.personal.name},\n\n${formData.message}\n\nBest regards,\n${formData.name}\n${formData.email}`
      )}`;
      
      window.location.href = mailtoLink;
      
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary flex items-center">
                <Mail className="h-6 w-6 mr-3" />
                Send a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Your Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Discussion"
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    className="w-full min-h-[120px]"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Direct Contact */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-primary">Get In Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <span className="text-muted-foreground">{data.personal.location}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <a 
                    href={`mailto:${data.personal.email}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {data.personal.email}
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-primary">Connect With Me</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <a
                  href={data.personal.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-primary/5 transition-colors group"
                >
                  <Github className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                  <span className="text-muted-foreground group-hover:text-primary">
                    View my projects on GitHub
                  </span>
                </a>
                <a
                  href={data.personal.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-primary/5 transition-colors group"
                >
                  <Linkedin className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                  <span className="text-muted-foreground group-hover:text-primary">
                    Connect on LinkedIn
                  </span>
                </a>
              </CardContent>
            </Card>

            {/* Resume Download */}
            <Card className="card-elevated bg-gradient-hero">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-4 text-primary">Download Resume</h3>
                <p className="text-muted-foreground mb-4">
                  Get a detailed overview of my experience and skills
                </p>
                <Button
                  variant="outline"
                  className="border-primary/50 hover:bg-primary/10"
                  onClick={() => window.open(data.personal.resume, '_blank')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
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
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Mail className="h-5 w-5 mr-2" />
                Start a Conversation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;