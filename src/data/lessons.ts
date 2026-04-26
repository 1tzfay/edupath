export interface Lesson {
  id: string;
  title: string;
  category: 'SAT' | 'IELTS' | 'ENT' | 'NUET' | 'Skills' | 'Math' | 'Science' | 'English';
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  topics: string[];
  isCompleted?: boolean;
  progress?: number;
  xp: number;
}

export interface LessonCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  description: string;
  totalLessons: number;
  completedLessons: number;
}

export const lessonCategories: LessonCategory[] = [
  {
    id: 'sat',
    name: 'SAT',
    icon: '🎓',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    description: 'Prepare for SAT Math, Reading, and Writing',
    totalLessons: 24,
    completedLessons: 8,
  },
  {
    id: 'ielts',
    name: 'IELTS',
    icon: '🌐',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    description: 'Master all 4 IELTS skills: Reading, Writing, Listening, Speaking',
    totalLessons: 32,
    completedLessons: 12,
  },
  {
    id: 'ent',
    name: 'ЕНТ',
    icon: '🇰🇿',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    description: 'Единое Национальное Тестирование — полная подготовка',
    totalLessons: 40,
    completedLessons: 5,
  },
  {
    id: 'nuet',
    name: 'NUET',
    icon: '⚡',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    description: 'Nazarbayev University Entrance Test preparation',
    totalLessons: 20,
    completedLessons: 3,
  },
  {
    id: 'skills',
    name: 'Skills',
    icon: '🛠️',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    description: 'Resume writing, essays, presentations & more',
    totalLessons: 15,
    completedLessons: 6,
  },
  {
    id: 'math',
    name: 'Mathematics',
    icon: '📐',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    description: 'Algebra, Calculus, Statistics and Problem Solving',
    totalLessons: 30,
    completedLessons: 10,
  },
  {
    id: 'science',
    name: 'Sciences',
    icon: '🔬',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    description: 'Physics, Chemistry, Biology fundamentals',
    totalLessons: 36,
    completedLessons: 7,
  },
  {
    id: 'english',
    name: 'English',
    icon: '📝',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    description: 'Grammar, Vocabulary, Reading Comprehension',
    totalLessons: 28,
    completedLessons: 14,
  },
];

export const lessons: Lesson[] = [
  // SAT
  {
    id: 'sat-1',
    title: 'SAT Math: Algebra Fundamentals',
    category: 'SAT',
    duration: 20,
    difficulty: 'beginner',
    description: 'Master linear equations, inequalities, and systems of equations for SAT Math.',
    topics: ['Linear equations', 'Inequalities', 'Systems of equations'],
    isCompleted: true,
    progress: 100,
    xp: 50,
  },
  {
    id: 'sat-2',
    title: 'SAT Reading: Evidence-Based Questions',
    category: 'SAT',
    duration: 25,
    difficulty: 'intermediate',
    description: 'Learn strategies for finding textual evidence and answering comprehension questions.',
    topics: ['Textual evidence', 'Inference', 'Main idea'],
    isCompleted: true,
    progress: 100,
    xp: 60,
  },
  {
    id: 'sat-3',
    title: 'SAT Writing: Grammar & Style',
    category: 'SAT',
    duration: 20,
    difficulty: 'intermediate',
    description: 'Review common grammar rules tested on the SAT Writing section.',
    topics: ['Subject-verb agreement', 'Punctuation', 'Sentence structure'],
    progress: 60,
    xp: 55,
  },
  {
    id: 'sat-4',
    title: 'SAT Math: Data Analysis',
    category: 'SAT',
    duration: 30,
    difficulty: 'advanced',
    description: 'Interpret graphs, tables, and statistics — one of the most tested SAT areas.',
    topics: ['Statistics', 'Data interpretation', 'Probability'],
    progress: 0,
    xp: 70,
  },
  // IELTS
  {
    id: 'ielts-1',
    title: 'IELTS Writing Task 1: Graphs & Charts',
    category: 'IELTS',
    duration: 30,
    difficulty: 'intermediate',
    description: 'Learn how to describe visual data in a clear, academic style.',
    topics: ['Bar charts', 'Line graphs', 'Academic vocabulary'],
    isCompleted: true,
    progress: 100,
    xp: 65,
  },
  {
    id: 'ielts-2',
    title: 'IELTS Writing Task 2: Opinion Essays',
    category: 'IELTS',
    duration: 35,
    difficulty: 'advanced',
    description: 'Structure persuasive essays and develop coherent arguments.',
    topics: ['Essay structure', 'Argument development', 'Cohesion'],
    progress: 40,
    xp: 80,
  },
  {
    id: 'ielts-3',
    title: 'IELTS Speaking: Band 7+ Techniques',
    category: 'IELTS',
    duration: 25,
    difficulty: 'intermediate',
    description: 'Improve fluency, pronunciation, and lexical range for the speaking test.',
    topics: ['Fluency strategies', 'Pronunciation', 'Complex vocabulary'],
    progress: 0,
    xp: 70,
  },
  // ENT
  {
    id: 'ent-1',
    title: 'ЕНТ: История Казахстана — Основы',
    category: 'ENT',
    duration: 40,
    difficulty: 'beginner',
    description: 'Ключевые события истории Казахстана от древности до независимости.',
    topics: ['Древний Казахстан', 'Казахское ханство', 'Независимость'],
    isCompleted: true,
    progress: 100,
    xp: 60,
  },
  {
    id: 'ent-2',
    title: 'ЕНТ: Математика — Алгебра',
    category: 'ENT',
    duration: 35,
    difficulty: 'intermediate',
    description: 'Разбор алгебраических задач уровня ЕНТ с подробными решениями.',
    topics: ['Уравнения', 'Неравенства', 'Функции'],
    progress: 30,
    xp: 65,
  },
  // NUET
  {
    id: 'nuet-1',
    title: 'NUET Critical Thinking: Arguments',
    category: 'NUET',
    duration: 30,
    difficulty: 'advanced',
    description: 'Identify assumptions, evaluate arguments, and draw conclusions — core NUET skills.',
    topics: ['Argument analysis', 'Assumptions', 'Logical reasoning'],
    progress: 50,
    xp: 75,
  },
  // Skills
  {
    id: 'skills-1',
    title: 'Writing a Winning Resume',
    category: 'Skills',
    duration: 20,
    difficulty: 'beginner',
    description: 'Build a professional resume that stands out for university and internship applications.',
    topics: ['Resume structure', 'Action verbs', 'ATS optimization'],
    isCompleted: true,
    progress: 100,
    xp: 50,
  },
  {
    id: 'skills-2',
    title: 'Crafting Your Motivation Letter',
    category: 'Skills',
    duration: 25,
    difficulty: 'intermediate',
    description: 'Write a compelling motivation letter that tells your unique story.',
    topics: ['Opening hook', 'Story structure', 'Closing statement'],
    isCompleted: true,
    progress: 100,
    xp: 60,
  },
  {
    id: 'skills-3',
    title: 'Project Presentation Skills',
    category: 'Skills',
    duration: 20,
    difficulty: 'beginner',
    description: 'Present your projects confidently using proven frameworks.',
    topics: ['Slide design', 'Storytelling', 'Q&A handling'],
    progress: 70,
    xp: 55,
  },
];
