import React from 'react';
import { Subject, UserStats } from '../types';
import { calculateLevelInfo } from '../utils/gamification';
import { 
  ArrowRight, 
  Flame, 
  Clock, 
  CheckCircle2, 
  Trophy, 
  BookOpen, 
  Calculator, 
  ScrollText, 
  Compass, 
  Atom, 
  Languages, 
  Sparkles, 
  ChevronRight
} from 'lucide-react';
import heroImage from '../assets/images/hero_estudafacil_1790677686330.jpg';

interface HomeTabProps {
  subjects: Subject[];
  userStats: UserStats;
  onStartStudying: () => void;
  onSelectSubject: (subject: Subject) => void;
  onNavigateToExercises: () => void;
  onNavigateToTutor: () => void;
  onAddStudyMinutes: (minutes: number) => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  subjects,
  userStats,
  onStartStudying,
  onSelectSubject,
  onNavigateToExercises,
  onNavigateToTutor,
  onAddStudyMinutes
}) => {
  // Map icon name to Lucide icon
  const getSubjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'Calculator':
        return <Calculator className="w-6 h-6" />;
      case 'BookOpen':
        return <BookOpen className="w-6 h-6" />;
      case 'ScrollText':
        return <ScrollText className="w-6 h-6" />;
      case 'Compass':
        return <Compass className="w-6 h-6" />;
      case 'Atom':
        return <Atom className="w-6 h-6" />;
      case 'Languages':
        return <Languages className="w-6 h-6" />;
      default:
        return <BookOpen className="w-6 h-6" />;
    }
  };

  // Overall lessons calculation
  const totalLessons = subjects.reduce((acc, s) => acc + s.totalLessons, 0);
  const completedLessons = subjects.reduce((acc, s) => acc + s.completedLessons, 0);
  const overallPercentage = Math.round((completedLessons / totalLessons) * 100);
  const dailyGoalPercent = Math.min(100, Math.round((userStats.todayMinutesStudied / userStats.dailyGoalMinutes) * 100));
  const levelInfo = calculateLevelInfo(userStats.xp);

  return (
    <div className="space-y-6 pb-8">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-800 text-white shadow-lg shadow-emerald-950/10">
        <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
        <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-md space-y-3 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-emerald-50 text-xs font-semibold backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Estudos inteligentes no seu ritmo
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-heading leading-tight">
              Estuda<span className="text-amber-300">Fácil</span>
            </h1>
            <p className="text-emerald-50 text-sm sm:text-base leading-relaxed">
              Aprenda de forma simples e inteligente
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button
                onClick={onStartStudying}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Começar a estudar</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onNavigateToTutor}
                className="w-full sm:w-auto px-4 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white font-medium text-xs sm:text-sm backdrop-blur-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Tirar dúvida com Tutor IA</span>
              </button>
            </div>
          </div>

          {/* Hero Illustration / Visual Asset */}
          <div className="w-full md:w-56 lg:w-64 aspect-[16/10] md:aspect-square relative rounded-2xl overflow-hidden shadow-inner bg-emerald-900/40 shrink-0 border border-white/20">
            <img
              src={heroImage}
              alt="Mesa de estudos moderna do EstudaFácil"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              onError={(e) => {
                // styled fallback in case of loading error
                const target = e.currentTarget;
                target.style.display = 'none';
                if (target.parentElement) {
                  target.parentElement.classList.add('flex', 'items-center', 'justify-center');
                }
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Seção mostrando o progresso do estudante */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
              Seu Progresso
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Acompanhe sua evolução e metas diárias
            </p>
          </div>
          <button
            onClick={() => onAddStudyMinutes(15)}
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
            title="Registrar 15 minutos de estudo"
          >
            +15 min hoje
          </button>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Card 1: Streak */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center text-amber-500 shrink-0">
              <Flame className="w-6 h-6 fill-amber-500" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums leading-none">
                {userStats.streakDays} <span className="text-xs font-normal text-slate-500 dark:text-slate-400">dias</span>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Ofensiva ativa
              </div>
            </div>
          </div>

          {/* Card 2: Daily Study Goal */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div className="w-full">
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums leading-none">
                  {userStats.todayMinutesStudied}
                  <span className="text-xs font-normal text-slate-500 dark:text-slate-400">/{userStats.dailyGoalMinutes}m</span>
                </span>
                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">{dailyGoalPercent}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${dailyGoalPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Card 3: Exercises Solved */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums leading-none">
                {userStats.exercisesSolved}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Exercícios feitos
              </div>
            </div>
          </div>

          {/* Card 4: Level & XP */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-purple-50 dark:bg-purple-950/50 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
              <Trophy className="w-6 h-6" />
            </div>
            <div className="w-full">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  Nível {levelInfo.level}
                </span>
                <span className="text-[10px] font-semibold text-purple-600 dark:text-purple-400 tabular-nums">
                  {userStats.xp}/{levelInfo.nextLevelXp} XP
                </span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-purple-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${levelInfo.progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Global Curriculum Progress Bar */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Progresso Geral das Matérias
            </span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
              {completedLessons} de {totalLessons} aulas ({overallPercentage}%)
            </span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${overallPercentage}%` }}
            />
          </div>
        </div>
      </section>

      {/* Seção "Minhas matérias" */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
              Minhas Matérias
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              6 disciplinas essenciais preparadas para você
            </p>
          </div>
          <button
            onClick={onStartStudying}
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
          >
            <span>Ver todas</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Grid com os 6 cards: Matemática, Português, História, Geografia, Ciências e Inglês */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {subjects.map((subject) => {
            const percent = Math.round((subject.completedLessons / subject.totalLessons) * 100);
            return (
              <div
                key={subject.id}
                onClick={() => onSelectSubject(subject)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectSubject(subject);
                  }
                }}
                className={`group text-left p-4 rounded-2xl bg-white dark:bg-slate-900 border ${subject.borderColor} hover:border-slate-400 dark:hover:border-slate-600 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-12 h-12 rounded-xl ${subject.bgLight} ${subject.bgDark} ${subject.textColor} flex items-center justify-center transition-transform group-hover:scale-105`}>
                      {getSubjectIcon(subject.iconName)}
                    </div>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 tabular-nums">
                      {subject.completedLessons}/{subject.totalLessons} aulas
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {subject.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {subject.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                  <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                    <span>Conclusão</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 tabular-nums">{percent}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${percent}%`,
                        backgroundColor: subject.accentColor
                      }}
                    />
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400 pt-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Estudar agora</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quick Action Banners */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
        <div
          onClick={onNavigateToExercises}
          role="button"
          tabIndex={0}
          className="p-4 rounded-2xl bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-between cursor-pointer hover:bg-slate-800 dark:hover:bg-slate-700/80 transition-all shadow-sm"
        >
          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
              Fixação rápida
            </span>
            <h4 className="text-sm font-bold">Praticar Exercícios</h4>
            <p className="text-xs text-slate-300">
              Questões de múltipla escolha com correção imediata
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
            <ArrowRight className="w-5 h-5 text-white" />
          </div>
        </div>

        <div
          onClick={onNavigateToTutor}
          role="button"
          tabIndex={0}
          className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white flex items-center justify-between cursor-pointer hover:opacity-95 transition-all shadow-sm"
        >
          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-amber-200 uppercase tracking-wider">
              Ajuda 24/7
            </span>
            <h4 className="text-sm font-bold">Dúvida em alguma matéria?</h4>
            <p className="text-xs text-emerald-50">
              Converse com o Tutor IA e aprenda o passo a passo
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-amber-300" />
          </div>
        </div>
      </section>
    </div>
  );
};
