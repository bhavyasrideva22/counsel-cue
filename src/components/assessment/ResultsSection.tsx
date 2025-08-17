import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AssessmentResults } from '@/types/assessment';
import { CheckCircle, ArrowRight, Trophy, Target, Brain, TrendingUp, Users, Lightbulb } from 'lucide-react';

interface ResultsSectionProps {
  results: AssessmentResults;
  onRestart: () => void;
}

const ResultsSection = ({ results, onRestart }: ResultsSectionProps) => {
  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'Yes': return 'text-success';
      case 'Maybe': return 'text-warning';
      case 'No': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getRecommendationBadge = (recommendation: string) => {
    switch (recommendation) {
      case 'Yes': return 'bg-success text-success-foreground';
      case 'Maybe': return 'bg-warning text-warning-foreground';
      case 'No': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const wiscarLabels = {
    will: 'Will & Motivation',
    interest: 'Interest Level',
    skill: 'Current Skills',
    cognitive: 'Cognitive Readiness',
    abilityToLearn: 'Learning Ability',
    realWorldAlignment: 'Real-World Fit'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge 
            className={`mb-4 text-lg px-6 py-2 ${getRecommendationBadge(results.recommendation)}`}
          >
            {results.recommendation === 'Yes' && <Trophy className="h-5 w-5 mr-2" />}
            {results.recommendation === 'Maybe' && <Target className="h-5 w-5 mr-2" />}
            {results.recommendation === 'No' && <Lightbulb className="h-5 w-5 mr-2" />}
            {results.recommendation}
          </Badge>
          <h1 className="text-4xl font-bold mb-4">
            Your Assessment Results
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {results.personalizedInsight}
          </p>
        </div>

        {/* Overall Score */}
        <Card className="p-8 mb-8 shadow-elevated bg-gradient-card">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold mb-2">Overall Confidence Score</h2>
            <div className="text-5xl font-bold text-primary mb-4">
              {Math.round(results.overallConfidenceScore)}%
            </div>
            <Progress value={results.overallConfidenceScore} className="h-3 max-w-md mx-auto" />
          </div>
        </Card>

        {/* Detailed Scores */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Core Assessments */}
          <Card className="p-6 shadow-card">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              Core Assessments
            </h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Psychological Fit</span>
                  <span className="text-lg font-semibold">{Math.round(results.psychometricFit)}%</span>
                </div>
                <Progress value={results.psychometricFit} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Technical Readiness</span>
                  <span className="text-lg font-semibold">{Math.round(results.technicalReadiness)}%</span>
                </div>
                <Progress value={results.technicalReadiness} className="h-2" />
              </div>
            </div>
          </Card>

          {/* WISCAR Scores */}
          <Card className="p-6 shadow-card">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              WISCAR Framework
            </h3>
            <div className="space-y-4">
              {Object.entries(results.wiscarScores).map(([key, value]) => (
                <div key={key}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">
                      {wiscarLabels[key as keyof typeof wiscarLabels]}
                    </span>
                    <span className="text-sm font-semibold">{Math.round(value)}%</span>
                  </div>
                  <Progress value={value} className="h-1.5" />
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Career Roles & Next Steps */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Career Roles */}
          <Card className="p-6 shadow-card">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Career Roles Unlocked
            </h3>
            <div className="space-y-4">
              {results.careerRolesUnlocked.map((role, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{role.role}</h4>
                    <Badge variant="secondary">{Math.round(role.matchScore)}%</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{role.description}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Next Steps */}
          <Card className="p-6 shadow-card">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Recommended Next Steps
            </h3>
            <div className="space-y-3">
              {results.nextSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-sm leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Learning Path Recommendation */}
        <Card className="p-8 shadow-elevated bg-gradient-primary text-white">
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-4">Ready to Begin Your Journey?</h3>
            <p className="text-lg mb-6 opacity-90">
              {results.recommendation === 'Yes' 
                ? "You're well-suited for a career in counseling. Start with our recommended learning path."
                : results.recommendation === 'Maybe'
                ? "With some skill development, you could excel in career counseling."
                : "While career counseling may not be ideal, consider these alternative paths that match your strengths."
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="secondary" 
                size="lg"
                className="flex items-center gap-2"
              >
                {results.recommendation === 'Yes' ? 'Start Learning Path' : 'Explore Alternatives'}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline"
                size="lg"
                onClick={onRestart}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                Retake Assessment
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ResultsSection;