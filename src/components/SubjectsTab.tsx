import React, { useState } from 'react';
import { Subject } from '../types';
import { 
  Search, 
  BookOpen, 
  Calculator, 
  ScrollText, 
  Compass, 
  Atom, 
  Languages, 
  ArrowRight,
  Sparkles,
  BookMarked
} from 'lucide-react';

interface SubjectsTabProps {
  subjects: Subject[];
  onSelectSubject: (subject: Subject) => void;
  onNavigateToExercisesForSubject?: (subjectSlug: string) => void;
}

export const SubjectsTab: React.FC<SubjectsTabProps> = ({
  subjects,
  onSelectSubject
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<'todas' | 'exatas' | 'humanas' | 'linguagens'>('todas');

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

  const filteredSubjects = subjects.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.topics.some((t) => t.title.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (filterCategory === 'todas') return true;
    if (filterCategory === 'exatas') return s.slug === 'matematica' || s.slug === 'ciencias';
    if (filterCategory === 'humanas') return s.slug === 'historia' || s.slug === 'geografia';
    if (filterCategory === 'linguagens') return s.slug === 'portugues' || s.slug === 'ingles';

    return true;
  });

  return (
    <div className="space-y-6 pb-8">
      {/* Top Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <BookMarked className="w-4 h-4" />
          <span>Currículo Completo</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-heading">
          Minhas Matérias
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Selecione uma disciplina para ver as aulas, resumos e exercícios práticos.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar matéria, assunto ou fórmula (ex: Bhaskara, Crase)..."
          className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-sm transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            Limpar
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {[
          { id: 'todas', label: 'Todas as matérias' },
          { id: 'exatas', label: 'Exatas & Ciências' },
          { id: 'humanas', label: 'Humanas' },
          { id: 'linguagens', label: 'Linguagens' }
        ].map((cat) => {
          const isActive = filterCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id as any)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Grid of Subjects */}
      {filteredSubjects.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
            Nenhuma matéria encontrada
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Tente pesquisar por outro termo como "Geometria" ou "Verbos".
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setFilterCategory('todas');
            }}
            className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 text-white cursor-pointer"
          >
            Limpar filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSubjects.map((subject) => {
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
                className={`group p-5 rounded-3xl bg-white dark:bg-slate-900 border ${subject.borderColor} hover:border-slate-400 dark:hover:border-slate-600 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-13 h-13 rounded-2xl ${subject.bgLight} ${subject.bgDark} ${subject.textColor} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                        {getSubjectIcon(subject.iconName)}
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white font-heading group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          {subject.name}
                        </h2>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {subject.topics.length} módulos disponíveis
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 tabular-nums bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                      {subject.completedLessons}/{subject.totalLessons}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                    {subject.description}
                  </p>

                  {/* Sample topics preview */}
                  <div className="mt-4 space-y-1.5">
                    {subject.topics.slice(0, 2).map((t) => (
                      <div
                        key={t.id}
                        className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400"
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            t.completed ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'
                          }`}
                        />
                        <span className="truncate">{t.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                    <span>Progresso de estudos</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200 tabular-nums">{percent}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${percent}%`,
                        backgroundColor: subject.accentColor
                      }}
                    />
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      {subject.exercises.length} questões práticas
                    </span>
                    <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
                      <span>Acessar conteúdo</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
