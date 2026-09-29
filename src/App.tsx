/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TabType, Subject, UserStats, QuizSessionResult } from './types';
import { INITIAL_SUBJECTS, INITIAL_USER_STATS } from './data/studyData';
import { calculateLevelInfo } from './utils/gamification';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeTab } from './components/HomeTab';
import { SubjectsTab } from './components/SubjectsTab';
import { ExercisesTab } from './components/ExercisesTab';
import { AITutorTab } from './components/AITutorTab';
import { ProfileTab } from './components/ProfileTab';
import { SubjectDetailModal } from './components/SubjectDetailModal';
import { OfflineIndicator } from './components/OfflineIndicator';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('inicio');
  const [subjects, setSubjects] = useState<Subject[]>(() => {
    const saved = localStorage.getItem('estudafacil_subjects');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_SUBJECTS;
      }
    }
    return INITIAL_SUBJECTS;
  });

  const [userStats, setUserStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('estudafacil_user_stats');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_USER_STATS;
      }
    }
    return INITIAL_USER_STATS;
  });

  const [history, setHistory] = useState<QuizSessionResult[]>(() => {
    const saved = localStorage.getItem('estudafacil_quiz_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [selectedSubjectForDetail, setSelectedSubjectForDetail] = useState<Subject | null>(null);
  const [selectedSubjectSlugForExercises, setSelectedSubjectSlugForExercises] = useState<string>('todas');
  const [tutorInitialQuestion, setTutorInitialQuestion] = useState<string>('');

  // Dark mode management
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('estudafacil_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('estudafacil_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('estudafacil_theme', 'light');
    }
  }, [isDark]);

  // Persist state updates
  useEffect(() => {
    localStorage.setItem('estudafacil_subjects', JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem('estudafacil_user_stats', JSON.stringify(userStats));
  }, [userStats]);

  useEffect(() => {
    localStorage.setItem('estudafacil_quiz_history', JSON.stringify(history));
  }, [history]);

  // Verify consecutive day streak on mount
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const lastDate = userStats.lastStudyDate;

    if (lastDate && lastDate !== today) {
      const last = new Date(lastDate);
      const curr = new Date(today);
      const diffDays = Math.round((curr.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));

      if (diffDays > 1) {
        // Streak broken
        setUserStats((prev) => ({
          ...prev,
          streakDays: 1,
          todayMinutesStudied: 0,
          lastStudyDate: today
        }));
      }
    }
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  // Navigations
  const handleStartStudying = () => {
    setCurrentTab('materias');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSubject = (subject: Subject) => {
    setSelectedSubjectForDetail(subject);
  };

  const handleToggleTopicCompleted = (subjectId: string, topicId: string) => {
    setSubjects((prevSubjects) => {
      return prevSubjects.map((sub) => {
        if (sub.id !== subjectId) return sub;

        const updatedTopics = sub.topics.map((top) => {
          if (top.id !== topicId) return top;
          return { ...top, completed: !top.completed };
        });

        const completedCount = updatedTopics.filter((t) => t.completed).length;

        // Keep the modal synchronized if open
        if (selectedSubjectForDetail && selectedSubjectForDetail.id === subjectId) {
          setSelectedSubjectForDetail({
            ...sub,
            topics: updatedTopics,
            completedLessons: completedCount
          });
        }

        return {
          ...sub,
          topics: updatedTopics,
          completedLessons: completedCount
        };
      });
    });

    // Award XP
    setUserStats((prev) => {
      const newXp = prev.xp + 25;
      const leveledUp = newXp >= prev.nextLevelXp;
      return {
        ...prev,
        xp: leveledUp ? newXp - prev.nextLevelXp : newXp,
        level: leveledUp ? prev.level + 1 : prev.level,
        todayMinutesStudied: prev.todayMinutesStudied + 5
      };
    });
  };

  const handlePracticeExercises = (subjectSlug: string) => {
    setSelectedSubjectForDetail(null);
    setSelectedSubjectSlugForExercises(subjectSlug);
    setCurrentTab('exercicios');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAskTutorAboutTopic = (topicTitle: string) => {
    setSelectedSubjectForDetail(null);
    setTutorInitialQuestion(`Pode me explicar detalhadamente sobre "${topicTitle}"?`);
    setCurrentTab('tutor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAskTutorAboutQuestion = (question: string) => {
    setTutorInitialQuestion(`Tenho uma dúvida na seguinte questão: "${question}". Pode me explicar a lógica?`);
    setCurrentTab('tutor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExerciseSessionCompleted = (result: QuizSessionResult) => {
    // Guard against duplicate XP registration for the exact same session ID
    if (history.some((h) => h.id === result.id)) {
      return;
    }

    // Record into test history
    setHistory((prev) => [result, ...prev.slice(0, 49)]);

    setUserStats((prev) => {
      const today = new Date().toISOString().split('T')[0];
      const isNewDay = prev.lastStudyDate && prev.lastStudyDate !== today;
      const newStreak = isNewDay ? prev.streakDays + 1 : prev.streakDays;

      const addedXp = result.xpEarned;
      const newTests = (prev.testsCompleted || 0) + 1;
      const newSolved = (prev.exercisesSolved || 0) + result.totalQuestions;
      const newCorrect = (prev.totalCorrectAnswers || 0) + result.correctAnswers;
      const newAccuracy = newSolved > 0 ? Math.round((newCorrect / newSolved) * 100) : result.percentage;
      const newTotalXp = (prev.xp || 0) + addedXp;

      // Automatically recalculate level based on exact thresholds (1: 0, 2: 100, 3: 300, 4: 600, 5: 1000...)
      const levelInfo = calculateLevelInfo(newTotalXp);

      return {
        ...prev,
        testsCompleted: newTests,
        exercisesSolved: newSolved,
        totalCorrectAnswers: newCorrect,
        accuracyRate: Math.min(100, Math.max(0, newAccuracy)),
        xp: newTotalXp,
        level: levelInfo.level,
        nextLevelXp: levelInfo.nextLevelXp,
        todayMinutesStudied: prev.todayMinutesStudied + 10,
        studyHoursTotal: Number((prev.studyHoursTotal + 10 / 60).toFixed(1)),
        streakDays: newStreak,
        lastStudyDate: today
      };
    });

    // Update subject progress
    setSubjects((prev) => {
      return prev.map((sub) => {
        if (sub.slug === result.subjectSlug) {
          const newCompleted = Math.min(sub.totalLessons, sub.completedLessons + 1);
          return {
            ...sub,
            completedLessons: newCompleted
          };
        }
        return sub;
      });
    });
  };

  const handleAddStudyMinutes = (minutes: number) => {
    setUserStats((prev) => {
      const newTotalXp = (prev.xp || 0) + 15;
      const levelInfo = calculateLevelInfo(newTotalXp);

      return {
        ...prev,
        todayMinutesStudied: prev.todayMinutesStudied + minutes,
        studyHoursTotal: Number((prev.studyHoursTotal + minutes / 60).toFixed(1)),
        xp: newTotalXp,
        level: levelInfo.level,
        nextLevelXp: levelInfo.nextLevelXp
      };
    });
  };

  const handleUpdateDailyGoal = (minutes: number) => {
    setUserStats((prev) => ({
      ...prev,
      dailyGoalMinutes: minutes
    }));
  };

  const handleResetProgress = () => {
    if (window.confirm('Tem certeza de que deseja resetar os dados para o estado inicial?')) {
      setSubjects(INITIAL_SUBJECTS);
      setUserStats(INITIAL_USER_STATS);
      setHistory([]);
      localStorage.removeItem('estudafacil_subjects');
      localStorage.removeItem('estudafacil_user_stats');
      localStorage.removeItem('estudafacil_quiz_history');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Universal Top Header */}
      <Header
        currentTab={currentTab}
        onNavigate={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        streakDays={userStats.streakDays}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-3.5 sm:px-4 py-5 pb-28 md:pb-12">
        {currentTab === 'inicio' && (
          <HomeTab
            subjects={subjects}
            userStats={userStats}
            onStartStudying={handleStartStudying}
            onSelectSubject={handleSelectSubject}
            onNavigateToExercises={() => {
              setSelectedSubjectSlugForExercises('todas');
              setCurrentTab('exercicios');
            }}
            onNavigateToTutor={() => {
              setCurrentTab('tutor');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onAddStudyMinutes={handleAddStudyMinutes}
          />
        )}

        {currentTab === 'materias' && (
          <SubjectsTab
            subjects={subjects}
            onSelectSubject={handleSelectSubject}
            onNavigateToExercisesForSubject={(slug) => {
              setSelectedSubjectSlugForExercises(slug);
              setCurrentTab('exercicios');
            }}
          />
        )}

        {currentTab === 'exercicios' && (
          <ExercisesTab
            subjects={subjects}
            initialSubjectSlug={selectedSubjectSlugForExercises}
            onExerciseSessionCompleted={handleExerciseSessionCompleted}
            onAskTutorAboutQuestion={handleAskTutorAboutQuestion}
          />
        )}

        {currentTab === 'tutor' && (
          <AITutorTab initialQuestion={tutorInitialQuestion} />
        )}

        {currentTab === 'perfil' && (
          <ProfileTab
            userStats={userStats}
            history={history}
            subjects={subjects}
            isDark={isDark}
            onToggleTheme={toggleTheme}
            onUpdateDailyGoal={handleUpdateDailyGoal}
            onResetProgress={handleResetProgress}
            onNavigateToExercises={(slug) => {
              if (slug) {
                setSelectedSubjectSlugForExercises(slug);
              }
              setCurrentTab('exercicios');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Subject Detail Modal */}
      <SubjectDetailModal
        subject={selectedSubjectForDetail}
        onClose={() => setSelectedSubjectForDetail(null)}
        onToggleTopicCompleted={handleToggleTopicCompleted}
        onPracticeExercises={handlePracticeExercises}
        onAskTutorAboutTopic={handleAskTutorAboutTopic}
      />

      {/* Mobile Bottom Navigation Bar (5 tabs) */}
      <BottomNav
        currentTab={currentTab}
        onNavigate={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Offline Toast Indicator */}
      <OfflineIndicator />
    </div>
  );
}
