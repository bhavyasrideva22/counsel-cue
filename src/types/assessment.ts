export interface Question {
  id: string;
  text: string;
  type: 'likert' | 'multiple-choice' | 'scenario';
  options?: string[];
  scale?: number;
  category: 'psychometric' | 'technical' | 'wiscar';
  dimension?: string;
}

export interface Answer {
  questionId: string;
  value: number | string;
  timestamp: Date;
}

export interface AssessmentState {
  currentSection: 'intro' | 'psychometric' | 'technical' | 'wiscar' | 'results';
  currentQuestionIndex: number;
  answers: Answer[];
  startTime: Date | null;
  isComplete: boolean;
}

export interface WISCARScores {
  will: number;
  interest: number;
  skill: number;
  cognitive: number;
  abilityToLearn: number;
  realWorldAlignment: number;
}

export interface AssessmentResults {
  psychometricFit: number;
  technicalReadiness: number;
  wiscarScores: WISCARScores;
  overallConfidenceScore: number;
  recommendation: 'Yes' | 'Maybe' | 'No';
  nextSteps: string[];
  careerRolesUnlocked: Array<{
    role: string;
    matchScore: number;
    description: string;
  }>;
  personalizedInsight: string;
}