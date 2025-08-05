import { GraduationCap, Calendar, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface EducationProps {
  data: {
    education: Array<{
      degree: string;
      institution: string;
      cgpa?: string;
      percentage?: string;
      year: string;
      relevant_coursework?: string[];
      stream?: string;
    }>;
  };
}

const Education = ({ data }: EducationProps) => {
  return (
    <section id="education" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">
            Education
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Building a strong foundation in computer science with focus on practical applications
          </p>
        </div>

        <div className="space-y-8 max-w-4xl mx-auto">
          {data.education.map((edu, index) => (
            <Card 
              key={index} 
              className={`card-elevated animate-fade-in-up`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-2xl font-bold text-primary mb-2 flex items-center">
                      <GraduationCap className="h-6 w-6 mr-3" />
                      {edu.degree}
                    </CardTitle>
                    <div className="text-lg font-semibold text-foreground mb-2">
                      {edu.institution}
                    </div>
                    {edu.stream && (
                      <div className="text-muted-foreground mb-2">
                        Stream: {edu.stream}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <Badge variant="outline" className="flex items-center gap-2 px-4 py-2">
                      <Calendar className="h-4 w-4" />
                      {edu.year}
                    </Badge>
                    {(edu.cgpa || edu.percentage) && (
                      <Badge variant="secondary" className="flex items-center gap-2 px-4 py-2">
                        <Award className="h-4 w-4" />
                        {edu.cgpa || edu.percentage}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              {edu.relevant_coursework && (
                <CardContent>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-3">Relevant Coursework</h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.relevant_coursework.map((course, courseIndex) => (
                        <Badge
                          key={courseIndex}
                          variant="secondary"
                          className="tech-badge text-xs"
                        >
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Additional learning */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-hero rounded-2xl p-8 card-elevated">
            <h3 className="text-2xl font-semibold mb-4 text-primary">Continuous Learning</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Beyond formal education, I actively pursue online courses, certifications, and hands-on projects 
              to stay current with emerging technologies and industry best practices.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Badge variant="secondary" className="px-4 py-2">AWS Certified</Badge>
              <Badge variant="secondary" className="px-4 py-2">Google Cloud Platform</Badge>
              <Badge variant="secondary" className="px-4 py-2">Machine Learning Coursera</Badge>
              <Badge variant="secondary" className="px-4 py-2">Docker & Kubernetes</Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;