import { GraduationCap, Calendar, Award, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface EducationProps {
  data: {
    education: Array<{
      degree: string;
      institution: string;
      board: string;
      cgpa?: string;
      percentage?: string;
      timeline: string;
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
                    <div className="flex items-center text-lg font-semibold text-foreground mb-1">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      {edu.institution}
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      {edu.board}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <Calendar className="h-4 w-4 mr-2" />
                      {edu.timeline}
                    </div>
                    {edu.stream && (
                      <div className="text-muted-foreground mb-2">
                        Stream: {edu.stream}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end space-y-2">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Marks</h4>
                      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                        {edu.cgpa && (
                          <div className="text-lg font-bold text-primary">
                            CGPA: {edu.cgpa}
                          </div>
                        )}
                        {edu.percentage && (
                          <div className="text-lg font-bold text-primary">
                            Percentage: {edu.percentage}
                          </div>
                        )}
                        {edu.stream && (
                          <div className="text-sm text-muted-foreground mt-1">
                            Stream: {edu.stream}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Relevant Coursework</h4>
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
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;