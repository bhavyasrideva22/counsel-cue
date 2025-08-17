import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Question } from '@/types/assessment';

interface QuestionSectionProps {
  question: Question;
  progress: number;
  currentSection: string;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: number | string | null;
  onAnswer: (value: number | string) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

const QuestionSection = ({
  question,
  progress,
  currentSection,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onAnswer,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious
}: QuestionSectionProps) => {
  const getSectionTitle = (section: string) => {
    switch (section) {
      case 'psychometric': return 'Psychological Fit';
      case 'technical': return 'Technical Knowledge';
      case 'wiscar': return 'WISCAR Framework';
      default: return 'Assessment';
    }
  };

  const getSectionColor = (section: string) => {
    switch (section) {
      case 'psychometric': return 'bg-purple-500';
      case 'technical': return 'bg-blue-500';
      case 'wiscar': return 'bg-green-500';
      default: return 'bg-primary';
    }
  };

  const likertOptions = [
    { value: 1, label: 'Strongly Disagree' },
    { value: 2, label: 'Disagree' },
    { value: 3, label: 'Neutral' },
    { value: 4, label: 'Agree' },
    { value: 5, label: 'Strongly Agree' }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-card border-b p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Badge variant="secondary" className="capitalize">
              {getSectionTitle(currentSection)}
            </Badge>
            <span className="text-sm text-muted-foreground">
              Question {questionNumber} of {totalQuestions}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Question Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full">
          <Card className="p-8 shadow-elevated">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 leading-relaxed">
                {question.text}
              </h2>
              {question.dimension && (
                <Badge variant="outline" className="text-xs">
                  {question.dimension}
                </Badge>
              )}
            </div>

            <div className="space-y-4">
              {question.type === 'likert' && (
                <div className="grid gap-3">
                  {likertOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => onAnswer(option.value)}
                      className={`
                        p-4 rounded-lg border-2 text-left transition-all duration-200
                        ${selectedAnswer === option.value
                          ? 'border-primary bg-primary/5 shadow-md'
                          : 'border-border hover:border-primary/50 hover:bg-muted/50'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{option.label}</span>
                        <div className={`
                          w-5 h-5 rounded-full border-2 transition-colors
                          ${selectedAnswer === option.value
                            ? 'bg-primary border-primary'
                            : 'border-muted-foreground'
                          }
                        `}>
                          {selectedAnswer === option.value && (
                            <div className="w-full h-full rounded-full bg-white scale-50" />
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {question.type === 'multiple-choice' && question.options && (
                <div className="grid gap-3">
                  {question.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => onAnswer(index)}
                      className={`
                        p-4 rounded-lg border-2 text-left transition-all duration-200
                        ${selectedAnswer === index
                          ? 'border-primary bg-primary/5 shadow-md'
                          : 'border-border hover:border-primary/50 hover:bg-muted/50'
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`
                          w-5 h-5 rounded-full border-2 transition-colors flex-shrink-0
                          ${selectedAnswer === index
                            ? 'bg-primary border-primary'
                            : 'border-muted-foreground'
                          }
                        `}>
                          {selectedAnswer === index && (
                            <div className="w-full h-full rounded-full bg-white scale-50" />
                          )}
                        </div>
                        <span className="leading-relaxed">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-card border-t p-6">
        <div className="max-w-4xl mx-auto flex justify-between">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={!canGoPrevious}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>
          
          <Button
            onClick={onNext}
            disabled={!canGoNext}
            className="flex items-center gap-2 bg-gradient-primary"
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuestionSection;