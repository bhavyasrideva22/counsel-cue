import { Question } from '@/types/assessment';

export const psychometricQuestions: Question[] = [
  {
    id: 'p1',
    text: 'I feel fulfilled when I help others solve career problems.',
    type: 'likert',
    scale: 5,
    category: 'psychometric',
    dimension: 'interest'
  },
  {
    id: 'p2',
    text: 'I prefer structured conversations with measurable goals.',
    type: 'likert',
    scale: 5,
    category: 'psychometric',
    dimension: 'personality'
  },
  {
    id: 'p3',
    text: 'I enjoy analyzing personality assessments and career frameworks.',
    type: 'likert',
    scale: 5,
    category: 'psychometric',
    dimension: 'interest'
  },
  {
    id: 'p4',
    text: 'I am patient when working with people who are uncertain about their direction.',
    type: 'likert',
    scale: 5,
    category: 'psychometric',
    dimension: 'personality'
  },
  {
    id: 'p5',
    text: 'I actively seek out opportunities to coach or mentor others.',
    type: 'likert',
    scale: 5,
    category: 'psychometric',
    dimension: 'motivation'
  }
];

export const technicalQuestions: Question[] = [
  {
    id: 't1',
    text: 'Which of the following best represents the "S" in Holland Code?',
    type: 'multiple-choice',
    options: [
      'Systematic - prefers organized, methodical work',
      'Social - enjoys helping and working with people',
      'Strategic - focuses on long-term planning',
      'Scientific - enjoys research and analysis'
    ],
    category: 'technical'
  },
  {
    id: 't2',
    text: 'What is the most ethical response when a client discloses personal trauma during a career session?',
    type: 'multiple-choice',
    options: [
      'Provide immediate counseling for the trauma',
      'Acknowledge their trust and refer to appropriate mental health resources',
      'Continue with career planning as trauma is outside scope',
      'End the session immediately'
    ],
    category: 'technical'
  },
  {
    id: 't3',
    text: 'A client says "I hate my job but I need the money." Your first step would be to:',
    type: 'multiple-choice',
    options: [
      'Immediately suggest they quit and find something better',
      'Explore what specifically they dislike about their current role',
      'Focus only on higher-paying alternatives',
      'Recommend they stay until retirement for financial security'
    ],
    category: 'technical'
  },
  {
    id: 't4',
    text: 'The MBTI assessment primarily measures:',
    type: 'multiple-choice',
    options: [
      'Intelligence and cognitive abilities',
      'Personality preferences and decision-making styles',
      'Career aptitude and skills',
      'Emotional intelligence levels'
    ],
    category: 'technical'
  },
  {
    id: 't5',
    text: 'When working with a client who has unrealistic career expectations, you should:',
    type: 'multiple-choice',
    options: [
      'Tell them directly their goals are impossible',
      'Agree with them to maintain rapport',
      'Guide them to research and reality-test their assumptions',
      'Only focus on backup plans'
    ],
    category: 'technical'
  }
];

export const wiscarQuestions: Question[] = [
  {
    id: 'w1',
    text: 'I consistently seek opportunities to help others with their career decisions, even outside of work.',
    type: 'likert',
    scale: 5,
    category: 'wiscar',
    dimension: 'will'
  },
  {
    id: 'w2',
    text: 'I find myself naturally curious about what drives people\'s career choices.',
    type: 'likert',
    scale: 5,
    category: 'wiscar',
    dimension: 'interest'
  },
  {
    id: 'w3',
    text: 'I am skilled at active listening and asking probing questions.',
    type: 'likert',
    scale: 5,
    category: 'wiscar',
    dimension: 'skill'
  },
  {
    id: 'w4',
    text: 'I can analyze complex career scenarios and identify multiple solution paths.',
    type: 'likert',
    scale: 5,
    category: 'wiscar',
    dimension: 'cognitive'
  },
  {
    id: 'w5',
    text: 'I am always eager to learn new counseling techniques and frameworks.',
    type: 'likert',
    scale: 5,
    category: 'wiscar',
    dimension: 'abilityToLearn'
  },
  {
    id: 'w6',
    text: 'I understand the practical realities of today\'s job market and career transitions.',
    type: 'likert',
    scale: 5,
    category: 'wiscar',
    dimension: 'realWorldAlignment'
  },
  {
    id: 'w7',
    text: 'I persist in helping others even when progress seems slow.',
    type: 'likert',
    scale: 5,
    category: 'wiscar',
    dimension: 'will'
  },
  {
    id: 'w8',
    text: 'I genuinely enjoy learning about different industries and career paths.',
    type: 'likert',
    scale: 5,
    category: 'wiscar',
    dimension: 'interest'
  },
  {
    id: 'w9',
    text: 'I can maintain professional boundaries while being empathetic.',
    type: 'likert',
    scale: 5,
    category: 'wiscar',
    dimension: 'skill'
  },
  {
    id: 'w10',
    text: 'I can think strategically about long-term career development paths.',
    type: 'likert',
    scale: 5,
    category: 'wiscar',
    dimension: 'cognitive'
  }
];

export const allQuestions = [
  ...psychometricQuestions,
  ...technicalQuestions,
  ...wiscarQuestions
];