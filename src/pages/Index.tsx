import { useAssessment } from '@/hooks/useAssessment';
import IntroSection from '@/components/assessment/IntroSection';
import QuestionSection from '@/components/assessment/QuestionSection';
import ResultsSection from '@/components/assessment/ResultsSection';
import { allQuestions } from '@/data/questions';

const Index = () => {
  const {
    state,
    startAssessment,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    getCurrentQuestion,
    getProgress,
    calculateResults,
    canGoNext,
    canGoPrevious
  } = useAssessment();

  const handleAnswer = (value: number | string) => {
    const currentQuestion = getCurrentQuestion();
    if (currentQuestion) {
      answerQuestion(currentQuestion.id, value);
    }
  };

  const getCurrentAnswer = () => {
    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) return null;
    
    const answer = state.answers.find(a => a.questionId === currentQuestion.id);
    return answer ? answer.value : null;
  };

  const getCurrentQuestionNumber = () => {
    const currentPosition = getCurrentPosition(state.currentSection, state.currentQuestionIndex);
    return currentPosition + 1;
  };

  // Helper function to calculate current position across all sections
  const getCurrentPosition = (section: string, questionIndex: number) => {
    const psychometricCount = 5;
    const technicalCount = 5;
    
    let position = 0;
    
    if (section === 'psychometric') {
      position = questionIndex;
    } else if (section === 'technical') {
      position = psychometricCount + questionIndex;
    } else if (section === 'wiscar') {
      position = psychometricCount + technicalCount + questionIndex;
    }
    
    return position;
  };

  const restart = () => {
    window.location.reload();
  };

  // Render appropriate section based on current state
  if (state.currentSection === 'intro') {
    return <IntroSection onStart={startAssessment} />;
  }

  if (state.currentSection === 'results') {
    const results = calculateResults();
    return <ResultsSection results={results} onRestart={restart} />;
  }

  const currentQuestion = getCurrentQuestion();
  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <QuestionSection
      question={currentQuestion}
      progress={getProgress()}
      currentSection={state.currentSection}
      questionNumber={getCurrentQuestionNumber()}
      totalQuestions={allQuestions.length}
      selectedAnswer={getCurrentAnswer()}
      onAnswer={handleAnswer}
      onNext={nextQuestion}
      onPrevious={previousQuestion}
      canGoNext={canGoNext()}
      canGoPrevious={canGoPrevious()}
    />
  );
};

export default Index;
