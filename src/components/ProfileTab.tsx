import React, { useState, useEffect } from 'react';
import { UserStats, QuizSessionResult, Subject, Achievement } from '../types';
import { calculateLevelInfo, evaluateAchievements } from '../utils/gamification';
import { PWAInstallButton } from './PWAInstallButton';
import { 
  Flame, 
  CheckCircle2, 
  Trophy, 
  Sun, 
  Moon, 
  Target, 
  RotateCcw,
  Sparkles,
  ClipboardList,
  BarChart3,
  ArrowRight,
  Calculator,
  BookOpen,
  ScrollText,
  Compass,
  Atom,
  Languages,
  Calendar,
  Lock,
  Medal,
  Award
} from 'lucide-react';
import mascotImage from '../assets/images/mascot_estudafacil_1790677702421.jpg';

interface ProfileTabProps {
  userStats: UserStats;
  history: QuizSessionResult[];
  subjects: Subject[];
  isDark: boolean;
  onToggleTheme: () => void;
  onUpdateDailyGoal: (minutes: number) => void;
  onResetProgress: () => void;
  onNavigateToExercises: (subjectSlug?: string) => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({
  userStats,
  history,
  subjects,
  isDark,
  onToggleTheme,
  onUpdateDailyGoal,
  onResetProgress,
  onNavigateToExercises
}) => {
  // Saved achievements unlock map in localStorage
  const [unlockMap, setUnlockMap] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('estudafacil_achievements_unlocks');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  // Calculate real metrics
  const realTestsCount = history.length > 0 ? history.length : (userStats.testsCompleted || 0);
  const realQuestionsSolved = history.length > 0 
    ? history.reduce((acc, h) => acc + h.totalQuestions, 0)
    : (userStats.exercisesSolved || 0);
  const realCorrectAnswers = history.length > 0
    ? history.reduce((acc, h) => acc + h.correctAnswers, 0)
    : (userStats.totalCorrectAnswers || 0);
  const realAccuracy = realQuestionsSolved > 0 
    ? Math.round((realCorrectAnswers / realQuestionsSolved) * 100)
    : (userStats.accuracyRate || 0);
  const realXp = userStats.xp || 0;

  // Level info according to thresholds: 1: 0 XP, 2: 100 XP, 3: 300 XP, 4: 600 XP, 5: 1000 XP...
  const levelInfo = calculateLevelInfo(realXp);

  // Evaluate achievements with real data
  const { achievements, updatedUnlockMap } = evaluateAchievements(
    { ...userStats, testsCompleted: realTestsCount, totalCorrectAnswers: realCorrectAnswers, exercisesSolved: realQuestionsSolved },
    history,
    unlockMap
  );

  // Sync unlockMap to localStorage if newly unlocked
  useEffect(() => {
    try {
      localStorage.setItem('estudafacil_achievements_unlocks', JSON.stringify(updatedUnlockMap));
      if (Object.keys(updatedUnlockMap).length !== Object.keys(unlockMap).length) {
        setUnlockMap(updatedUnlockMap);
      }
    } catch (e) {
      console.error('Erro ao salvar conquistas:', e);
    }
  }, [updatedUnlockMap, unlockMap]);

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  const getSubjectIcon = (slug: string) => {
    switch (slug) {
      case 'matematica':
        return <Calculator className="w-5 h-5" />;
      case 'portugues':
        return <BookOpen className="w-5 h-5" />;
      case 'historia':
        return <ScrollText className="w-5 h-5" />;
      case 'geografia':
        return <Compass className="w-5 h-5" />;
      case 'ciencias':
        return <Atom className="w-5 h-5" />;
      case 'ingles':
        return <Languages className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  const allSubjectSlugs: Array<{ slug: string; name: string }> = [
    { slug: 'matematica', name: 'Matemática' },
    { slug: 'portugues', name: 'Português' },
    { slug: 'historia', name: 'História' },
    { slug: 'geografia', name: 'Geografia' },
    { slug: 'ciencias', name: 'Ciências' },
    { slug: 'ingles', name: 'Inglês' },
  ];

  const subjectProgressList = allSubjectSlugs.map((sub) => {
    const subjectTests = history.filter((h) => h.subjectSlug === sub.slug);
    const subjectQuestions = subjectTests.reduce((acc, h) => acc + h.totalQuestions, 0);
    const subjectCorrect = subjectTests.reduce((acc, h) => acc + h.correctAnswers, 0);
    const subjectAccuracy = subjectQuestions > 0 ? Math.round((subjectCorrect / subjectQuestions) * 100) : 0;
    
    const matchedSubject = subjects.find((s) => s.slug === sub.slug);
    const completedLessons = matchedSubject ? matchedSubject.completedLessons : 0;
    const totalLessons = matchedSubject ? matchedSubject.totalLessons : 4;
    
    const lessonPercent = Math.round((completedLessons / totalLessons) * 100);
    const overallProgress = subjectQuestions > 0 
      ? Math.min(100, Math.round((lessonPercent * 0.4) + (subjectAccuracy * 0.6)))
      : lessonPercent;

    return {
      slug: sub.slug,
      name: sub.name,
      testsCount: subjectTests.length,
      questionsAnswered: subjectQuestions,
      correctCount: subjectCorrect,
      accuracy: subjectAccuracy,
      completedLessons,
      totalLessons,
      progressPercent: overallProgress,
      accentColor: matchedSubject?.accentColor || '#10b981',
      bgLight: matchedSubject?.bgLight || 'bg-emerald-50',
      bgDark: matchedSubject?.bgDark || 'dark:bg-emerald-950/40',
      textColor: matchedSubject?.textColor || 'text-emerald-700'
    };
  });

  const daysOfWeek = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

  return (
    <div className="space-y-6 pb-12 max-w-3xl mx-auto animate-in fade-in duration-200">
      {/* 1. SEÇÃO PERFIL (Avatar, Nome, Frase, Nível, XP) */}
      <section className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
        {/* Avatar do estudante */}
        <div className="relative shrink-0">
          <div className="w-20 h-20 rounded-3xl overflow-hidden border-2 border-emerald-500 shadow-md bg-emerald-50 dark:bg-emerald-950/40">
            <img
              src={mascotImage}
              alt="Avatar do Estudante EstudaFácil"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          {/* Badge do Nível Atual */}
          <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shadow-sm">
            {levelInfo.level}
          </span>
        </div>

        {/* Nome, Frase e Progresso de Nível */}
        <div className="flex-1 space-y-2 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-heading">
                Estudante
              </h1>
              <p className="text-xs sm:text-sm font-medium text-emerald-600 dark:text-emerald-400 mt-0.5">
                Continue aprendendo todos os dias! 📚
              </p>
            </div>
            
            <div className="flex items-center gap-1.5 self-center sm:self-auto">
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200/60 dark:border-emerald-800/40">
                <Sparkles className="w-3.5 h-3.5" />
                Nível {levelInfo.level}
              </span>

              <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-3 py-1 rounded-full border border-amber-200/60 dark:border-amber-800/40">
                <Trophy className="w-3.5 h-3.5" />
                {unlockedCount}/6 conquistas
              </span>
            </div>
          </div>

          {/* XP atual / XP necessário para o próximo nível + Barra de progresso */}
          <div className="pt-1">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
              <span>Progresso para o Nível {levelInfo.level + 1}</span>
              <span className="tabular-nums font-bold text-emerald-600 dark:text-emerald-400">
                {realXp} / {levelInfo.nextLevelXp} XP
              </span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${levelInfo.progressPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
              <span>{levelInfo.xpInLevel} XP neste nível</span>
              <span>Faltam {Math.max(0, levelInfo.nextLevelXp - realXp)} XP</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ESTATÍSTICAS (Dados Reais do Aplicativo) */}
      <section className="space-y-3">
        <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          Suas Estatísticas
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {/* Testes realizados */}
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs text-center flex flex-col justify-center">
            <ClipboardList className="w-5 h-5 text-blue-500 mx-auto mb-1" />
            <div className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tabular-nums">
              {realTestsCount}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Testes realizados</div>
          </div>

          {/* Questões respondidas */}
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs text-center flex flex-col justify-center">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
            <div className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tabular-nums">
              {realQuestionsSolved}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Questões feitas</div>
          </div>

          {/* Total de acertos */}
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs text-center flex flex-col justify-center">
            <Trophy className="w-5 h-5 text-amber-500 mx-auto mb-1" />
            <div className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tabular-nums">
              {realCorrectAnswers}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Total de acertos</div>
          </div>

          {/* Média de aproveitamento */}
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs text-center flex flex-col justify-center">
            <Target className="w-5 h-5 text-purple-500 mx-auto mb-1" />
            <div className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tabular-nums">
              {realAccuracy}%
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Aproveitamento</div>
          </div>

          {/* XP total */}
          <div className="col-span-2 sm:col-span-1 p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs text-center flex flex-col justify-center">
            <Sparkles className="w-5 h-5 text-amber-400 mx-auto mb-1" />
            <div className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tabular-nums">
              {realXp}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">XP total</div>
          </div>
        </div>
      </section>

      {/* 3. SEÇÃO "🏆 Minhas Conquistas" */}
      <section className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>🏆 Minhas Conquistas</span>
            </h2>
          </div>
          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
            {unlockedCount} de {achievements.length} desbloqueadas
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                ach.unlocked
                  ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800/80 shadow-2xs'
                  : 'bg-slate-50/80 dark:bg-slate-850/60 border-slate-200 dark:border-slate-800 opacity-70'
              }`}
            >
              {/* Emoji/Icon Badge */}
              <div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl shrink-0 ${
                  ach.unlocked
                    ? 'bg-emerald-100 dark:bg-emerald-900/60 shadow-xs ring-2 ring-emerald-500/20'
                    : 'bg-slate-200 dark:bg-slate-800 grayscale'
                }`}
              >
                {ach.emoji}
              </div>

              {/* Title & Description */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                    {ach.title}
                  </h3>
                  {ach.unlocked ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/70 px-2 py-0.5 rounded-full shrink-0">
                      <CheckCircle2 className="w-3 h-3" />
                      Desbloqueada
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-400 bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded-full shrink-0">
                      <Lock className="w-3 h-3" />
                      Bloqueada
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight">
                  {ach.description}
                </p>

                <div className="text-[10px] text-slate-400 dark:text-slate-500 pt-0.5">
                  {ach.unlocked && ach.unlockedAt ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                      Conquistado em {ach.unlockedAt}
                    </span>
                  ) : (
                    <span>Progresso: {ach.progressText}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SEQUÊNCIA DE ESTUDOS */}
      <section className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>🔥 Sequência de estudos</span>
            </h2>
          </div>
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-900/60">
            {userStats.streakDays} {userStats.streakDays === 1 ? 'dia consecutivo' : 'dias consecutivos'}
          </span>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          {userStats.streakDays > 1 
            ? 'Sensacional! Você está mantendo o hábito diário de aprendizado.'
            : 'Estude todos os dias no EstudaFácil para aumentar sua sequência de dias consecutivos!'}
        </p>

        {/* 7-Day Visual Tracker */}
        <div className="grid grid-cols-7 gap-1.5 pt-1">
          {daysOfWeek.map((day, idx) => {
            const isCompleted = idx < Math.min(7, userStats.streakDays);
            return (
              <div
                key={day}
                className={`py-2 rounded-xl text-center border text-xs transition-colors ${
                  isCompleted
                    ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 font-bold'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-400'
                }`}
              >
                <span className="block text-[10px] uppercase">{day}</span>
                <span className="block mt-0.5">
                  {isCompleted ? '🔥' : '•'}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. HISTÓRICO DE TESTES */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            Histórico de Testes
          </h2>
          {history.length > 0 && (
            <span className="text-xs text-slate-500">
              {history.length} {history.length === 1 ? 'teste salvo' : 'testes salvos'}
            </span>
          )}
        </div>

        {history.length === 0 ? (
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <ClipboardList className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                Nenhum teste realizado ainda
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
                Faça seu primeiro exercício para começar sua evolução e registrar seus resultados aqui! 🚀
              </p>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigateToExercises()}
                className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer flex items-center gap-1.5 mx-auto"
              >
                <span>Fazer meu primeiro teste</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-2.5">
            {history.slice(0, 6).map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0">
                    {getSubjectIcon(item.subjectSlug)}
                  </div>
                  <div>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                      {item.subjectName} • {item.difficulty}
                    </h3>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3 h-3" />
                      {item.dateFormatted}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className={`font-extrabold text-xs sm:text-sm tabular-nums ${
                    item.percentage >= 70 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
                  }`}>
                    {item.correctAnswers}/10 • {item.percentage}%
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    +{item.xpEarned} XP
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 6. PROGRESSO POR MATÉRIA (Dados Reais) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            Progresso por Matéria
          </h2>
          <span className="text-xs text-slate-500">6 disciplinas</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {subjectProgressList.map((item) => (
            <div
              key={item.slug}
              onClick={() => onNavigateToExercises(item.slug)}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-xl ${item.bgLight} ${item.bgDark} ${item.textColor} flex items-center justify-center shrink-0`}>
                      {getSubjectIcon(item.slug)}
                    </div>
                    <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200 tabular-nums">
                    {item.progressPercent}%
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1.5">
                  <span>{item.testsCount} {item.testsCount === 1 ? 'teste feito' : 'testes feitos'}</span>
                  <span>{item.questionsAnswered} questões ({item.accuracy}% acertos)</span>
                </div>
              </div>

              {/* Barra de Progresso Real */}
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mt-1">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.max(item.progressPercent, item.testsCount > 0 ? 8 : 0)}%`,
                    backgroundColor: item.accentColor
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. INSTALAÇÃO PWA */}
      <section>
        <PWAInstallButton variant="card" />
      </section>

      {/* 8. PREFERÊNCIAS E METAS */}
      <section className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          Configurações do Estudante
        </h2>

        {/* Daily Goal Settings */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Meta Diária de Estudos
            </span>
            <span className="text-slate-500 font-bold">{userStats.dailyGoalMinutes} min/dia</span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[15, 30, 45, 60].map((mins) => {
              const isSelected = userStats.dailyGoalMinutes === mins;
              return (
                <button
                  key={mins}
                  type="button"
                  onClick={() => onUpdateDailyGoal(mins)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {mins}m
                </button>
              );
            })}
          </div>
        </div>

        {/* Theme switch */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
              {isDark ? <Moon className="w-4 h-4 text-amber-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                Tema de Visualização
              </div>
              <div className="text-[11px] text-slate-500">
                {isDark ? 'Modo Escuro ativado' : 'Modo Claro ativado'}
              </div>
            </div>
          </div>

          <button
            onClick={onToggleTheme}
            className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
          >
            Alternar tema
          </button>
        </div>

        {/* Reset */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
          <div>
            <div className="text-xs font-bold text-rose-600 dark:text-rose-400">
              Redefinir Dados
            </div>
            <div className="text-[11px] text-slate-500">
              Zera o histórico, conquistas e progresso para recomeçar
            </div>
          </div>

          <button
            onClick={() => {
              localStorage.removeItem('estudafacil_achievements_unlocks');
              setUnlockMap({});
              onResetProgress();
            }}
            className="px-3 py-1.5 rounded-xl border border-rose-200 dark:border-rose-900/60 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer"
          >
            Resetar
          </button>
        </div>
      </section>
    </div>
  );
};
