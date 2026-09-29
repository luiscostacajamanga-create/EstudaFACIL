import React, { useState } from 'react';
import { Subject, TopicLesson } from '../types';
import { 
  X, 
  CheckCircle2, 
  Circle, 
  Clock, 
  BookOpen, 
  Dumbbell, 
  Calculator, 
  ScrollText, 
  Compass, 
  Atom, 
  Languages,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface SubjectDetailModalProps {
  subject: Subject | null;
  onClose: () => void;
  onToggleTopicCompleted: (subjectId: string, topicId: string) => void;
  onPracticeExercises: (subjectSlug: string) => void;
  onAskTutorAboutTopic: (topicTitle: string) => void;
}

export const SubjectDetailModal: React.FC<SubjectDetailModalProps> = ({
  subject,
  onClose,
  onToggleTopicCompleted,
  onPracticeExercises,
  onAskTutorAboutTopic
}) => {
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(
    subject?.topics[0]?.id || null
  );

  if (!subject) return null;

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

  const completedCount = subject.topics.filter((t) => t.completed).length;
  const progressPercent = Math.round((completedCount / subject.topics.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[90vh] flex flex-col border border-slate-200 dark:border-slate-800 overflow-hidden"
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl ${subject.bgLight} ${subject.bgDark} ${subject.textColor} flex items-center justify-center shrink-0`}>
              {getSubjectIcon(subject.iconName)}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
                {subject.name}
              </h2>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {completedCount} de {subject.topics.length} tópicos concluídos ({progressPercent}%)
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress bar line */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5">
          <div
            className="h-full transition-all duration-300"
            style={{ width: `${progressPercent}%`, backgroundColor: subject.accentColor }}
          />
        </div>

        {/* Scrollable Topics Content */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {subject.description}
          </p>

          <div className="space-y-3 pt-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Módulos e Aulas Práticas
            </h3>

            {subject.topics.map((topic: TopicLesson, idx: number) => {
              const isExpanded = expandedTopicId === topic.id;
              return (
                <div
                  key={topic.id}
                  className={`rounded-2xl border transition-all ${
                    topic.completed
                      ? 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/30 dark:bg-emerald-950/20'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850'
                  }`}
                >
                  <div
                    onClick={() => setExpandedTopicId(isExpanded ? null : topic.id)}
                    className="p-4 flex items-center justify-between gap-3 cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleTopicCompleted(subject.id, topic.id);
                        }}
                        className="shrink-0 text-emerald-600 dark:text-emerald-400 hover:scale-110 transition-transform cursor-pointer"
                        title={topic.completed ? 'Marcar como não concluído' : 'Marcar como concluído'}
                      >
                        {topic.completed ? (
                          <CheckCircle2 className="w-6 h-6 fill-emerald-500 text-white dark:text-slate-900" />
                        ) : (
                          <Circle className="w-6 h-6 text-slate-300 dark:text-slate-600" />
                        )}
                      </button>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                            Aula {idx + 1}
                          </span>
                          <span className="text-slate-300 dark:text-slate-700">·</span>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {topic.durationMinutes} min
                          </span>
                        </div>
                        <h4 className={`text-sm font-semibold mt-0.5 leading-snug ${
                          topic.completed
                            ? 'text-emerald-900 dark:text-emerald-200'
                            : 'text-slate-900 dark:text-white'
                        }`}>
                          {topic.title}
                        </h4>
                      </div>
                    </div>

                    <div className="shrink-0 text-slate-400">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>

                  {/* Expanded lesson details */}
                  {isExpanded && (
                    <div className="px-4 pb-4 pt-1 border-t border-slate-100 dark:border-slate-800 space-y-3 text-xs sm:text-sm">
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        {topic.summary}
                      </p>

                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1.5">
                        <span className="font-semibold text-slate-800 dark:text-slate-200 block text-xs">
                          Pontos-chave para memorizar:
                        </span>
                        <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                          {topic.keyPoints.map((point, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-emerald-500 font-bold shrink-0">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => onAskTutorAboutTopic(topic.title)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Tirar dúvida com IA</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => onToggleTopicCompleted(subject.id, topic.id)}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                        >
                          {topic.completed ? 'Desmarcar aula' : 'Concluir aula'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-900/80 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            Voltar
          </button>
          <button
            onClick={() => onPracticeExercises(subject.slug)}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm shadow-md transition-all active:scale-[0.98] flex items-center gap-2 cursor-pointer"
          >
            <Dumbbell className="w-4 h-4" />
            <span>Fazer {subject.exercises.length} Exercícios</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
