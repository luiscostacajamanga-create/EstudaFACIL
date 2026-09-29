export type TabType = 'inicio' | 'materias' | 'exercicios' | 'tutor' | 'perfil';

export type DifficultyLevel = 'Fácil' | 'Médio' | 'Difícil';

export interface ExerciseQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: DifficultyLevel;
}

export interface QuizSessionResult {
  id: string;
  subjectName: string;
  subjectSlug: string;
  difficulty: DifficultyLevel;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  percentage: number;
  xpEarned: number;
  timestamp: number;
  dateFormatted: string;
}

export interface TopicLesson {
  id: string;
  title: string;
  summary: string;
  durationMinutes: number;
  completed: boolean;
  keyPoints: string[];
}

export interface Subject {
  id: string;
  name: string;
  slug: 'matematica' | 'portugues' | 'historia' | 'geografia' | 'ciencias' | 'ingles';
  description: string;
  iconName: string;
  accentColor: string;
  bgLight: string;
  bgDark: string;
  borderColor: string;
  textColor: string;
  totalLessons: number;
  completedLessons: number;
  topics: TopicLesson[];
  exercises: ExerciseQuestion[];
}

export interface UserStats {
  streakDays: number;
  studyHoursTotal: number;
  testsCompleted: number;
  exercisesSolved: number;
  totalCorrectAnswers: number;
  accuracyRate: number;
  dailyGoalMinutes: number;
  todayMinutesStudied: number;
  level: number;
  xp: number;
  nextLevelXp: number;
  lastStudyDate?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  emoji: string;
  unlocked: boolean;
  unlockedAt?: string;
  progressText?: string;
}

