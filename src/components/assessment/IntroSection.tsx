import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Users, Target, TrendingUp, Brain } from 'lucide-react';

interface IntroSectionProps {
  onStart: () => void;
}

const IntroSection = ({ onStart }: IntroSectionProps) => {
  const features = [
    { icon: Brain, text: 'Psychological fit assessment' },
    { icon: Target, text: 'Technical readiness evaluation' },
    { icon: TrendingUp, text: 'Career path recommendations' },
    { icon: Users, text: 'Personalized learning guidance' }
  ];

  const careers = [
    'School/College Career Counselor',
    'Corporate Career Coach', 
    'Vocational Guidance Officer',
    'HR Development Specialist',
    'Career Development Consultant'
  ];

  const traits = [
    'High empathy & active listening',
    'Analytical thinking',
    'Interest in helping others',
    'Strong communication skills',
    'Patience and open-mindedness'
  ];

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            AI-Powered Career Assessment
          </Badge>
          <h1 className="text-5xl font-bold text-white mb-6">
            Is Career Counseling the Right Path for You?
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Discover your potential as a career counselor through our comprehensive assessment that evaluates your psychological fit, technical readiness, and alignment with the profession.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="p-8 bg-card/95 backdrop-blur shadow-elevated">
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <Target className="text-primary h-6 w-6" />
              What You'll Discover
            </h3>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <feature.icon className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{feature.text}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-8 bg-card/95 backdrop-blur shadow-elevated">
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <Clock className="text-primary h-6 w-6" />
              Assessment Details
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration:</span>
                <span className="font-medium">20-25 minutes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Questions:</span>
                <span className="font-medium">20 questions</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sections:</span>
                <span className="font-medium">3 core areas</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Results:</span>
                <span className="font-medium">Instant feedback</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="p-8 bg-card/95 backdrop-blur shadow-elevated">
            <h3 className="text-xl font-semibold mb-4">Typical Career Paths</h3>
            <div className="space-y-3">
              {careers.map((career, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                  <span className="text-sm">{career}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-8 bg-card/95 backdrop-blur shadow-elevated">
            <h3 className="text-xl font-semibold mb-4">Key Success Traits</h3>
            <div className="space-y-3">
              {traits.map((trait, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-sm">{trait}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="text-center">
          <Button 
            onClick={onStart}
            size="lg"
            className="text-lg px-12 py-6 bg-gradient-primary hover:shadow-glow transition-all duration-300 transform hover:scale-105"
          >
            Start Assessment
          </Button>
          <p className="text-white/70 text-sm mt-4">
            Your responses are confidential and used only for assessment purposes
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntroSection;