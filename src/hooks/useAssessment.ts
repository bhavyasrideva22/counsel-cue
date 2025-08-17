import { useState, useCallback } from 'react';
import { AssessmentState, Answer, AssessmentResults, WISCARScores } from '@/types/assessment';
import { allQuestions, psychometricQuestions, technicalQuestions, wiscarQuestions } from '@/data/questions';

const initialState: AssessmentState = {
  currentSection: 'intro',
  currentQuestionIndex: 0,
  answers: [],
  startTime: null,
  isComplete: false
};

export const useAssessment = () => {
  const [state, setState] = useState<AssessmentState>(initialState);

  const startAssessment = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentSection: 'psychometric',
      startTime: new Date()
    }));
  }, []);

  const answerQuestion = useCallback((questionId: string, value: number | string) => {
    const answer: Answer = {
      questionId,
      value,
      timestamp: new Date()
    };

    setState(prev => ({
      ...prev,
      answers: [...prev.answers.filter(a => a.questionId !== questionId), answer]
    }));
  }, []);

  const nextQuestion = useCallback(() => {
    setState(prev => {
      const currentSectionQuestions = getCurrentSectionQuestions(prev.currentSection);
      const nextIndex = prev.currentQuestionIndex + 1;
      
      if (nextIndex >= currentSectionQuestions.length) {
        // Move to next section
        const nextSection = getNextSection(prev.currentSection) as AssessmentState['currentSection'];
        if (nextSection === 'results') {
          return {
            ...prev,
            currentSection: nextSection,
            currentQuestionIndex: 0,
            isComplete: true
          };
        }
        return {
          ...prev,
          currentSection: nextSection,
          currentQuestionIndex: 0
        };
      }
      
      return {
        ...prev,
        currentQuestionIndex: nextIndex
      };
    });
  }, []);

  const previousQuestion = useCallback(() => {
    setState(prev => {
      if (prev.currentQuestionIndex > 0) {
        return {
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex - 1
        };
      }
      
      // Move to previous section
      const prevSection = getPreviousSection(prev.currentSection) as AssessmentState['currentSection'];
      if (prevSection) {
        const prevSectionQuestions = getCurrentSectionQuestions(prevSection);
        return {
          ...prev,
          currentSection: prevSection,
          currentQuestionIndex: prevSectionQuestions.length - 1
        };
      }
      
      return prev;
    });
  }, []);

  const getCurrentQuestion = () => {
    const questions = getCurrentSectionQuestions(state.currentSection);
    return questions[state.currentQuestionIndex];
  };

  const getProgress = () => {
    const totalQuestions = allQuestions.length;
    const currentPosition = getCurrentPosition(state.currentSection, state.currentQuestionIndex);
    return (currentPosition / totalQuestions) * 100;
  };

  const calculateResults = (): AssessmentResults => {
    const psychometricScore = calculateSectionScore('psychometric');
    const technicalScore = calculateSectionScore('technical');
    const wiscarScores = calculateWISCARScores();
    
    const overallScore = (psychometricScore + technicalScore + Object.values(wiscarScores).reduce((a, b) => a + b, 0) / 6) / 3;
    
    return {
      psychometricFit: psychometricScore,
      technicalReadiness: technicalScore,
      wiscarScores,
      overallConfidenceScore: overallScore,
      recommendation: getRecommendation(overallScore),
      nextSteps: getNextSteps(overallScore),
      careerRolesUnlocked: getCareerRoles(overallScore, wiscarScores),
      personalizedInsight: getPersonalizedInsight(overallScore, psychometricScore, technicalScore)
    };
  };

  const calculateSectionScore = (section: 'psychometric' | 'technical') => {
    const sectionQuestions = section === 'psychometric' ? psychometricQuestions : technicalQuestions;
    const sectionAnswers = state.answers.filter(a => 
      sectionQuestions.some(q => q.id === a.questionId)
    );
    
    if (sectionAnswers.length === 0) return 0;
    
    const totalScore = sectionAnswers.reduce((sum, answer) => {
      if (section === 'technical') {
        // For technical questions, correct answers are scored
        return sum + (getCorrectAnswerScore(answer.questionId, answer.value) ? 100 : 0);
      } else {
        // For psychometric, scale the likert responses
        return sum + ((answer.value as number) * 20);
      }
    }, 0);
    
    return totalScore / sectionAnswers.length;
  };

  const calculateWISCARScores = (): WISCARScores => {
    const wiscarAnswers = state.answers.filter(a => 
      wiscarQuestions.some(q => q.id === a.questionId)
    );
    
    const dimensions = ['will', 'interest', 'skill', 'cognitive', 'abilityToLearn', 'realWorldAlignment'];
    const scores: any = {};
    
    dimensions.forEach(dimension => {
      const dimensionQuestions = wiscarQuestions.filter(q => q.dimension === dimension);
      const dimensionAnswers = wiscarAnswers.filter(a => 
        dimensionQuestions.some(q => q.id === a.questionId)
      );
      
      if (dimensionAnswers.length > 0) {
        const avgScore = dimensionAnswers.reduce((sum, answer) => sum + (answer.value as number), 0) / dimensionAnswers.length;
        scores[dimension] = avgScore * 20; // Scale to 0-100
      } else {
        scores[dimension] = 0;
      }
    });
    
    return scores as WISCARScores;
  };

  const getCorrectAnswerScore = (questionId: string, answer: number | string): boolean => {
    const correctAnswers: Record<string, number> = {
      't1': 1, // Social
      't2': 1, // Acknowledge and refer
      't3': 1, // Explore what they dislike
      't4': 1, // Personality preferences
      't5': 2  // Guide them to research
    };
    
    return correctAnswers[questionId] === answer;
  };

  const getRecommendation = (score: number): 'Yes' | 'Maybe' | 'No' => {
    if (score >= 75) return 'Yes';
    if (score >= 50) return 'Maybe';
    return 'No';
  };

  const getNextSteps = (score: number): string[] => {
    if (score >= 75) {
      return [
        'Enroll in "Career Counseling Foundations" course',
        'Join peer-practice groups',
        'Pursue GCDF or NCDA certification',
        'Start building a portfolio of case studies'
      ];
    } else if (score >= 50) {
      return [
        'Develop interpersonal listening skills',
        'Study basic psychology or behavioral science',
        'Start with shadowing or mentorship',
        'Practice with career assessment tools'
      ];
    } else {
      return [
        'Consider alternative career paths that align with your strengths',
        'Explore roles in HR, training, or organizational development',
        'Build foundational communication skills',
        'Gain experience in people-focused roles'
      ];
    }
  };

  const getCareerRoles = (overallScore: number, wiscarScores: WISCARScores) => {
    const roles = [
      {
        role: 'Career Coach',
        baseScore: 85,
        description: '1-on-1 guidance for mid-career professionals'
      },
      {
        role: 'Academic Counselor',
        baseScore: 80,
        description: 'Work with high school/college students'
      },
      {
        role: 'HR Talent Advisor',
        baseScore: 75,
        description: 'Internal career guidance & development'
      },
      {
        role: 'Life Coach',
        baseScore: 70,
        description: 'Goal-based personal development guidance'
      },
      {
        role: 'Vocational Consultant',
        baseScore: 65,
        description: 'Help people make training/work choices'
      }
    ];

    return roles.map(role => ({
      ...role,
      matchScore: Math.min(100, role.baseScore * (overallScore / 100))
    })).filter(role => role.matchScore >= 60);
  };

  const getPersonalizedInsight = (overall: number, psychometric: number, technical: number): string => {
    if (overall >= 75) {
      return "You show strong potential for a career in counseling with excellent interpersonal skills and technical understanding. Your empathy and analytical abilities make you well-suited for helping others navigate their career journeys.";
    } else if (overall >= 50) {
      return "You have a good foundation for career counseling but would benefit from developing specific skills. Focus on building your technical knowledge of career frameworks and practicing active listening techniques.";
    } else {
      return "While career counseling may not be the ideal fit, your assessment reveals strengths that could translate well to related fields like HR, training, or organizational development.";
    }
  };

  return {
    state,
    startAssessment,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    getCurrentQuestion,
    getProgress,
    calculateResults,
    canGoNext: () => {
      const currentQ = getCurrentQuestion();
      return currentQ ? state.answers.some(a => a.questionId === currentQ.id) : false;
    },
    canGoPrevious: () => {
      return state.currentQuestionIndex > 0 || state.currentSection !== 'psychometric';
    }
  };
};

// Helper functions
const getCurrentSectionQuestions = (section: string) => {
  switch (section) {
    case 'psychometric': return psychometricQuestions;
    case 'technical': return technicalQuestions;
    case 'wiscar': return wiscarQuestions;
    default: return [];
  }
};

const getNextSection = (currentSection: string): 'psychometric' | 'technical' | 'wiscar' | 'results' => {
  const sections: Array<'psychometric' | 'technical' | 'wiscar' | 'results'> = ['psychometric', 'technical', 'wiscar', 'results'];
  const currentIndex = sections.indexOf(currentSection as any);
  return sections[currentIndex + 1] || 'results';
};

const getPreviousSection = (currentSection: string): 'psychometric' | 'technical' | 'wiscar' | null => {
  const sections: Array<'psychometric' | 'technical' | 'wiscar'> = ['psychometric', 'technical', 'wiscar'];
  const currentIndex = sections.indexOf(currentSection as any);
  return currentIndex > 0 ? sections[currentIndex - 1] : null;
};

const getCurrentPosition = (section: string, questionIndex: number) => {
  let position = 0;
  
  if (section === 'psychometric') {
    position = questionIndex;
  } else if (section === 'technical') {
    position = psychometricQuestions.length + questionIndex;
  } else if (section === 'wiscar') {
    position = psychometricQuestions.length + technicalQuestions.length + questionIndex;
  } else {
    position = allQuestions.length;
  }
  
  return position;
};