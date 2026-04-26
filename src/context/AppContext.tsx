import React, { createContext, useContext, useState } from 'react';

export type CareerPath = 'it' | 'medicine' | 'business' | 'science' | 'design' | 'law' | null;

export const careerConfig: Record<NonNullable<CareerPath>, {
  label: string; emoji: string; color: string; bg: string; border: string;
  programs: string[]; lessonCategories: string[]; opportunityTags: string[];
}> = {
  it: {
    label: 'IT и Технологии', emoji: '💻', color: 'text-blue-700',
    bg: 'bg-blue-50', border: 'border-blue-200',
    programs: ['Computer Science', 'Software Engineering', 'Data Science', 'AI'],
    lessonCategories: ['SAT', 'NUET', 'Math', 'English'],
    opportunityTags: ['coding', 'AI', 'blockchain', 'innovation'],
  },
  medicine: {
    label: 'Медицина и здоровье', emoji: '🏥', color: 'text-green-700',
    bg: 'bg-green-50', border: 'border-green-200',
    programs: ['Medicine', 'Biology', 'Pharmacy', 'Public Health'],
    lessonCategories: ['ENT', 'Science', 'English'],
    opportunityTags: ['biology', 'research', 'science'],
  },
  business: {
    label: 'Бизнес и финансы', emoji: '💼', color: 'text-orange-700',
    bg: 'bg-orange-50', border: 'border-orange-200',
    programs: ['Business Administration', 'Finance', 'Economics', 'Management'],
    lessonCategories: ['SAT', 'IELTS', 'English'],
    opportunityTags: ['fintech', 'innovation', 'leadership'],
  },
  science: {
    label: 'Наука и исследования', emoji: '🔬', color: 'text-purple-700',
    bg: 'bg-purple-50', border: 'border-purple-200',
    programs: ['Physics', 'Chemistry', 'Mathematics', 'Research'],
    lessonCategories: ['Math', 'Science', 'NUET'],
    opportunityTags: ['research', 'science', 'math', 'physics'],
  },
  design: {
    label: 'Дизайн и творчество', emoji: '🎨', color: 'text-pink-700',
    bg: 'bg-pink-50', border: 'border-pink-200',
    programs: ['Design', 'Architecture', 'Fine Arts', 'UX/UI'],
    lessonCategories: ['IELTS', 'English', 'Skills'],
    opportunityTags: ['design', 'innovation'],
  },
  law: {
    label: 'Право и общество', emoji: '⚖️', color: 'text-teal-700',
    bg: 'bg-teal-50', border: 'border-teal-200',
    programs: ['Law', 'International Relations', 'Political Science', 'Diplomacy'],
    lessonCategories: ['IELTS', 'SAT', 'English'],
    opportunityTags: ['leadership', 'social impact', 'writing'],
  },
};

export interface Achievement {
  id: string; title: string; type: string; date: string; description: string; source?: string;
}

export interface CustomOpportunity {
  id: string;
  title: string;
  type: 'hackathon' | 'olympiad' | 'competition' | 'research' | 'program';
  deadline: string;
  location: string;
  description: string;
  tags: string[];
  prize?: string;
  participated: boolean;
  addedToPortfolio: boolean;
}

interface Friend {
  id: string; name: string; avatar: string; xp: number; streak: number; grade: string; rank: number;
}

interface AppState {
  user: {
    name: string; grade: string; city: string; avatar: string;
    xp: number; streak: number; level: number; completedLessons: number;
    achievements: Achievement[];
  };
  onboarding: {
    completed: boolean;
    interests: string[];
    dreamDestination: string;
  };
  career: {
    path: CareerPath;
    testCompleted: boolean;
    joinedClubs: string[];
    essayWritten: boolean;
  };
  customOpportunities: CustomOpportunity[];
  friends: Friend[];
  notifications: number;
}

interface AppContextType {
  state: AppState;
  completeOnboarding: (data: { city: string; interests: string[]; dreamDestination: string; careerPath: CareerPath }) => void;
  setCareerPath: (path: CareerPath) => void;
  completeCareerTest: () => void;
  joinClub: (clubId: string) => void;
  leaveClub: (clubId: string) => void;
  addXP: (amount: number) => void;
  addAchievement: (achievement: Achievement) => void;
  markEssayWritten: () => void;
  addCustomOpportunity: (opp: CustomOpportunity) => void;
  removeCustomOpportunity: (id: string) => void;
  markParticipated: (id: string) => void;
}

const defaultState: AppState = {
  user: {
    name: 'Айдана Сейткали', grade: '11', city: '', avatar: 'АС',
    xp: 1240, streak: 7, level: 5, completedLessons: 12,
    achievements: [
      { id: '1', title: 'Math Olympiad 2025', type: 'olympiad', date: '2025-03', description: '3 место', source: 'competition' },
      { id: '2', title: 'Hackathon Winner', type: 'hackathon', date: '2025-11', description: 'Best Innovation', source: 'competition' },
      { id: '3', title: 'IELTS 7.0', type: 'certificate', date: '2025-09', description: 'Band 7.0', source: 'lesson' },
    ],
  },
  onboarding: { completed: false, interests: [], dreamDestination: '' },
  career: { path: null, testCompleted: false, joinedClubs: [], essayWritten: false },
  customOpportunities: [],
  friends: [
    { id: '1', name: 'Алихан Бектуров', avatar: 'АБ', xp: 1850, streak: 14, grade: '11', rank: 1 },
    { id: '2', name: 'Дина Жаксыбекова', avatar: 'ДЖ', xp: 1620, streak: 10, grade: '12', rank: 2 },
    { id: '3', name: 'Мейрам Касымов', avatar: 'МК', xp: 1450, streak: 21, grade: '11', rank: 3 },
    { id: '4', name: 'Айдана Сейткали', avatar: 'АС', xp: 1240, streak: 7, grade: '11', rank: 4 },
    { id: '5', name: 'Зарина Нурланова', avatar: 'ЗН', xp: 980, streak: 5, grade: '10', rank: 5 },
    { id: '6', name: 'Бауыржан Ермеков', avatar: 'БЕ', xp: 760, streak: 3, grade: '10', rank: 6 },
  ],
  notifications: 3,
};

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(defaultState);

  const completeOnboarding = ({ city, interests, dreamDestination, careerPath }: {
    city: string; interests: string[]; dreamDestination: string; careerPath: CareerPath;
  }) => {
    setState(prev => ({
      ...prev,
      user: { ...prev.user, city },
      onboarding: { completed: true, interests, dreamDestination },
      career: { ...prev.career, path: careerPath },
    }));
  };

  const setCareerPath = (path: CareerPath) =>
    setState(prev => ({ ...prev, career: { ...prev.career, path } }));

  const completeCareerTest = () =>
    setState(prev => ({ ...prev, career: { ...prev.career, testCompleted: true } }));

  const joinClub = (clubId: string) =>
    setState(prev => ({
      ...prev,
      career: { ...prev.career, joinedClubs: [...prev.career.joinedClubs, clubId] },
      user: {
        ...prev.user,
        xp: prev.user.xp + 50,
        achievements: [
          ...prev.user.achievements,
          { id: `club-${clubId}`, title: `Вступил в клуб`, type: 'club', date: new Date().toISOString().slice(0, 7), description: clubId, source: 'club' },
        ],
      },
    }));

  const leaveClub = (clubId: string) =>
    setState(prev => ({
      ...prev,
      career: { ...prev.career, joinedClubs: prev.career.joinedClubs.filter(c => c !== clubId) },
    }));

  const addXP = (amount: number) =>
    setState(prev => ({
      ...prev,
      user: {
        ...prev.user,
        xp: prev.user.xp + amount,
        level: Math.floor((prev.user.xp + amount) / 500) + 1,
        completedLessons: prev.user.completedLessons + 1,
      },
    }));

  const addAchievement = (achievement: Achievement) =>
    setState(prev => ({
      ...prev,
      user: { ...prev.user, achievements: [...prev.user.achievements, achievement] },
    }));

  const markEssayWritten = () =>
    setState(prev => ({ ...prev, career: { ...prev.career, essayWritten: true } }));

  const addCustomOpportunity = (opp: CustomOpportunity) =>
    setState(prev => ({ ...prev, customOpportunities: [opp, ...prev.customOpportunities] }));

  const removeCustomOpportunity = (id: string) =>
    setState(prev => ({ ...prev, customOpportunities: prev.customOpportunities.filter(o => o.id !== id) }));

  const markParticipated = (id: string) =>
    setState(prev => {
      const opp = prev.customOpportunities.find(o => o.id === id);
      if (!opp) return prev;
      const newAchievement: Achievement = {
        id: `opp-${id}`, title: opp.title, type: opp.type,
        date: new Date().toISOString().slice(0, 7),
        description: 'Личное мероприятие', source: 'competition',
      };
      return {
        ...prev,
        customOpportunities: prev.customOpportunities.map(o =>
          o.id === id ? { ...o, participated: true, addedToPortfolio: true } : o
        ),
        user: {
          ...prev.user,
          xp: prev.user.xp + 80,
          achievements: [...prev.user.achievements, newAchievement],
        },
      };
    });

  return (
    <AppContext.Provider value={{
      state, completeOnboarding, setCareerPath, completeCareerTest,
      joinClub, leaveClub, addXP, addAchievement, markEssayWritten,
      addCustomOpportunity, removeCustomOpportunity, markParticipated,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
