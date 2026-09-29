import React, { useState, useEffect, useRef } from 'react';
import { Subject, DifficultyLevel, ExerciseQuestion, QuizSessionResult } from '../types';
import { CURATED_EXERCISES } from '../data/curatedExercises';
import { 
  Dumbbell, 
  Calculator, 
  BookOpen, 
  ScrollText, 
  Compass, 
  Atom, 
  Languages, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Sparkles, 
  Trophy, 
  Zap, 
  History, 
  AlertCircle, 
  RefreshCw,
  Clock,
  ArrowLeft
} from 'lucide-react';
import mascotImage from '../assets/images/mascot_estudafacil_1790677702421.jpg';

interface ExercisesTabProps {
  subjects: Subject[];
  initialSubjectSlug?: string;
  onExerciseSessionCompleted: (result: QuizSessionResult) => void;
  onAskTutorAboutQuestion?: (question: string) => void;
}

export const ExercisesTab: React.FC<ExercisesTabProps> = ({
  subjects,
  initialSubjectSlug,
  onExerciseSessionCompleted,
  onAskTutorAboutQuestion
}) => {
  // Screen views: 'config' | 'loading' | 'quiz' | 'result'
  const [viewStep, setViewStep] = useState<'config' | 'loading' | 'quiz' | 'result'>('config');

  // Configuration state
  const [selectedSubjectSlug, setSelectedSubjectSlug] = useState<string>(
    initialSubjectSlug && initialSubjectSlug !== 'todas' ? initialSubjectSlug : 'matematica'
  );
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('Fácil');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Loading & Timeout state (30 seconds maximum)
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [loadingStage, setLoadingStage] = useState<string>('Consultando o Gemini IA...');
  const [secondsRemaining, setSecondsRemaining] = useState<number>(30);
  const [generationError, setGenerationError] = useState<boolean>(false);

  // Active Quiz State (exactly 10 questions)
  const [questions, setQuestions] = useState<ExerciseQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<Array<{
    questionId: string;
    selectedIdx: number;
    correctIdx: number;
    isCorrect: boolean;
  }>>([]);

  // Session History stored in localStorage
  const [history, setHistory] = useState<QuizSessionResult[]>(() => {
    try {
      const saved = localStorage.getItem('estudafacil_quiz_history');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Save history on change
  useEffect(() => {
    try {
      localStorage.setItem('estudafacil_quiz_history', JSON.stringify(history));
    } catch (e) {
      console.error('Erro ao salvar histórico de exercícios:', e);
    }
  }, [history]);

  // Update initial subject slug if passed from parent
  useEffect(() => {
    if (initialSubjectSlug && initialSubjectSlug !== 'todas') {
      setSelectedSubjectSlug(initialSubjectSlug);
    }
  }, [initialSubjectSlug]);

  // Refs for managing intervals, abort controller and idempotency
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const sessionFinalizedRef = useRef<boolean>(false);

  // Clean up all timers on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, []);

  const subjectNames: Record<string, string> = {
    matematica: 'Matemática',
    portugues: 'Português',
    historia: 'História',
    geografia: 'Geografia',
    ciencias: 'Ciências',
    ingles: 'Inglês'
  };

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

  const shuffleArray = <T,>(array: T[]): T[] => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // Validation function enforcing all 5 strict criteria:
  // 1. Exatamente 10 perguntas
  // 2. 4 alternativas por pergunta
  // 3. Exatamente 1 resposta correta (correctIndex 0 a 3)
  // 4. Todas as perguntas relacionadas à matéria escolhida
  // 5. Dificuldade correspondente ao nível escolhido
  const validateAndNormalizeQuestions = (rawList: any[]): ExerciseQuestion[] => {
    const validQuestions: ExerciseQuestion[] = [];
    const seenStatements = new Set<string>();

    for (const q of rawList) {
      if (!q || typeof q !== 'object') continue;

      const statement = (q.question || '').trim();
      if (!statement || statement.length < 5) continue;

      const lowerStatement = statement.toLowerCase();
      if (seenStatements.has(lowerStatement)) continue;

      // Validate exactly 4 non-empty options
      if (!Array.isArray(q.options) || q.options.length !== 4) continue;
      const cleanOptions = q.options.map((opt: any) => (typeof opt === 'string' ? opt.trim() : ''));
      if (cleanOptions.some((opt: string) => !opt || opt.length === 0)) continue;

      // Validate exactly 1 correct answer (0, 1, 2, or 3)
      if (typeof q.correctIndex !== 'number' || q.correctIndex < 0 || q.correctIndex > 3) continue;

      // Validate explanation
      const explanationText = (q.explanation || 'Alternativa correta verificada no gabarito oficial.').trim();

      seenStatements.add(lowerStatement);
      validQuestions.push({
        id: q.id || `valid-${Date.now()}-${validQuestions.length}`,
        question: statement,
        options: cleanOptions,
        correctIndex: q.correctIndex,
        explanation: explanationText,
        difficulty: selectedDifficulty // strictly corresponds to chosen difficulty
      });

      if (validQuestions.length === 10) break;
    }

    // If fewer than 10, complement with curated fallback questions for this exact subject and level
    if (validQuestions.length < 10) {
      const curatedBank = CURATED_EXERCISES[selectedSubjectSlug]?.[selectedDifficulty] || [];
      const shuffledCurated = shuffleArray(curatedBank);

      for (const fallbackQ of shuffledCurated) {
        if (!seenStatements.has(fallbackQ.question.toLowerCase())) {
          seenStatements.add(fallbackQ.question.toLowerCase());
          validQuestions.push({
            ...fallbackQ,
            id: `curated-${Date.now()}-${validQuestions.length}`,
            difficulty: selectedDifficulty
          });
        }
        if (validQuestions.length === 10) break;
      }
    }

    return validQuestions.slice(0, 10);
  };

  // Start generation flow with 30s timeout and smooth progress tracking
  const handleStartExercise = async () => {
    if (isGenerating) return; // Disables multiple concurrent triggers

    setIsGenerating(true);
    setGenerationError(false);
    setLoadingProgress(5);
    setLoadingStage('Consultando o Gemini IA...');
    setSecondsRemaining(30);
    setViewStep('loading');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // AbortController for strict 30s timeout
    const controller = new AbortController();
    abortControllerRef.current = controller;

    // Start 30s countdown interval
    let timeLeft = 30;
    timerIntervalRef.current = setInterval(() => {
      timeLeft -= 1;
      setSecondsRemaining(timeLeft);
      if (timeLeft <= 0) {
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
        controller.abort(); // Cancel the request
      }
    }, 1000);

    // Smooth progress simulation (5% -> 92%)
    let currentPct = 5;
    progressIntervalRef.current = setInterval(() => {
      currentPct += Math.floor(Math.random() * 5) + 3;
      if (currentPct > 92) currentPct = 92;
      setLoadingProgress(currentPct);

      if (currentPct > 70) {
        setLoadingStage('Validando cálculos matemáticos e gabarito...');
      } else if (currentPct > 40) {
        setLoadingStage('Elaborando 10 questões inéditas...');
      } else if (currentPct > 15) {
        setLoadingStage('Selecionando conceitos pedagógicos...');
      }
    }, 400);

    const subjectName = subjectNames[selectedSubjectSlug] || 'Matemática';

    try {
      const response = await fetch('/api/generate-exercises', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: subjectName,
          difficulty: selectedDifficulty,
          count: 10
        }),
        signal: controller.signal
      });

      if (!response.ok) {
        throw new Error(`Falha no servidor (${response.status})`);
      }

      const data = await response.json();
      const rawList = Array.isArray(data.questions) ? data.questions : [];
      const validatedList = validateAndNormalizeQuestions(rawList);

      // Verify strict 10 questions requirement
      if (validatedList.length !== 10) {
        throw new Error('Não foi possível compor 10 perguntas válidas.');
      }

      // Cleanup timers
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);

      // Finish progress to 100% and automatically open Question 1
      setLoadingProgress(100);
      setLoadingStage('Teste pronto! Abrindo questão 1 de 10...');

      setTimeout(() => {
        setIsGenerating(false);
        setQuestions(validatedList);
        setCurrentIndex(0);
        setSelectedOption(null);
        setHasAnswered(false);
        setUserAnswers([]);
        sessionFinalizedRef.current = false;
        setViewStep('quiz');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 350);

    } catch (err: any) {
      console.warn('Erro ou timeout de 30s na geração do teste:', err);
      // Cleanup timers
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);

      setIsGenerating(false);
      setGenerationError(true);
    }
  };

  // Handle answering the current question
  const handleConfirmAnswer = () => {
    if (selectedOption === null || hasAnswered || !currentQ) return;

    const isCorrect = selectedOption === currentQ.correctIndex;
    const newAnswer = {
      questionId: currentQ.id,
      selectedIdx: selectedOption,
      correctIdx: currentQ.correctIndex,
      isCorrect
    };

    setUserAnswers((prev) => [...prev, newAnswer]);
    setHasAnswered(true);
  };

  // Handle proceeding to next question or result
  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setHasAnswered(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      finalizeSession();
    }
  };

  // Calculate final results and persist to state/localStorage
  const finalizeSession = () => {
    if (sessionFinalizedRef.current) return;
    sessionFinalizedRef.current = true;

    const total = questions.length || 10;
    const correctCount = userAnswers.filter((a) => a.isCorrect).length;
    const wrongCount = total - correctCount;
    const percentage = Math.round((correctCount / total) * 100);

    // XP rules:
    // - Cada questão respondida: +10 XP
    // - Completar um teste de 10 perguntas: +30 XP
    // - Responder corretamente: +5 XP bônus por acerto
    const xpGained = (total * 10) + (total >= 10 ? 30 : 0) + (correctCount * 5);

    const sessionResult: QuizSessionResult = {
      id: `session-${Date.now()}`,
      subjectName: subjectNames[selectedSubjectSlug] || 'Matemática',
      subjectSlug: selectedSubjectSlug,
      difficulty: selectedDifficulty,
      totalQuestions: total,
      correctAnswers: correctCount,
      wrongAnswers: wrongCount,
      percentage,
      xpEarned: xpGained,
      timestamp: Date.now(),
      dateFormatted: new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    // Save to state history & trigger global app progress
    setHistory((prev) => [sessionResult, ...prev.slice(0, 19)]);
    onExerciseSessionCompleted(sessionResult);

    setViewStep('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentQ = questions[currentIndex];
  const totalCorrect = userAnswers.filter((a) => a.isCorrect).length;
  const totalWrong = userAnswers.length - totalCorrect;
  const scorePercent = questions.length > 0 ? Math.round((totalCorrect / questions.length) * 100) : 0;

  // --------------------------------------------------------------------------
  // SCREEN: LOADING ("Preparando seu teste... 🤖📚") COM TIMEOUT DE 30s
  // --------------------------------------------------------------------------
  if (viewStep === 'loading') {
    return (
      <div className="max-w-md mx-auto py-10 px-4 text-center space-y-6 animate-in fade-in duration-300">
        <div className="p-7 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          
          {/* Animated Mascot Badge */}
          <div className="relative w-24 h-24 mx-auto">
            <div className="w-24 h-24 rounded-3xl overflow-hidden border-2 border-emerald-500 shadow-md">
              <img
                src={mascotImage}
                alt="Mascote EstudaFácil"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            {!generationError && (
              <span className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm">
                <Sparkles className="w-4 h-4 animate-spin" />
              </span>
            )}
          </div>

          {!generationError ? (
            <div className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-heading">
                  Preparando seu teste... 🤖📚
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  {subjectNames[selectedSubjectSlug]} · Nível {selectedDifficulty}
                </p>
              </div>

              {/* Progress Bar & Stage Status */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
                  <span className="truncate pr-2">{loadingStage}</span>
                  <span className="tabular-nums text-emerald-600 dark:text-emerald-400 font-bold">
                    {loadingProgress}%
                  </span>
                </div>

                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                    style={{ width: `${loadingProgress}%` }}
                  />
                </div>
              </div>

              {/* Countdown indicator (30s timeout) */}
              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 pt-1">
                <Clock className="w-3.5 h-3.5" />
                <span className="tabular-nums">Limite de tempo: {secondsRemaining}s</span>
              </div>
            </div>
          ) : (
            /* Error State (Timeout or Network Issue) */
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Não foi possível gerar o teste agora.
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Verifique sua conexão e tente novamente.
                </p>
              </div>

              {/* Requested Buttons: "Tentar novamente" e "Voltar" */}
              <div className="pt-2 flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={handleStartExercise}
                  className="w-full py-3.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Tentar novamente</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setViewStep('config');
                    setIsGenerating(false);
                    setGenerationError(false);
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Voltar</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SCREEN: RESULT SCREEN
  // --------------------------------------------------------------------------
  if (viewStep === 'result') {
    return (
      <div className="max-w-2xl mx-auto space-y-6 pb-12 animate-in fade-in duration-300">
        <div className="text-center p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
            <Trophy className="w-8 h-8 animate-bounce" />
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
              Exercício concluído! 🎉
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {subjectNames[selectedSubjectSlug]} · Nível {selectedDifficulty} · 10 Questões
            </p>
          </div>

          {/* Performance Overview Cards */}
          <div className="grid grid-cols-3 gap-2.5 pt-2">
            <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-center">
              <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 block">
                Acertos
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">
                {totalCorrect}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-center">
              <span className="text-[11px] font-semibold text-rose-700 dark:text-rose-300 block">
                Erros
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-rose-600 dark:text-rose-400 tabular-nums">
                {totalWrong}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-center">
              <span className="text-[11px] font-semibold text-blue-700 dark:text-blue-300 block">
                Aproveitamento
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400 tabular-nums">
                {scorePercent}%
              </span>
            </div>
          </div>

          {/* XP & Feedback Banner */}
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-left">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shrink-0">
                <Zap className="w-5 h-5 fill-slate-950" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-amber-950 dark:text-amber-200">
                  +{totalCorrect * 15 + totalWrong * 5} XP adicionados ao seu perfil!
                </h4>
                <p className="text-[11px] text-amber-800 dark:text-amber-300">
                  {scorePercent >= 70 ? 'Excelente desempenho! Você fixou muito bem a matéria.' : 'Bom treino! A prática constante leva à perfeição.'}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleStartExercise}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Tentar novamente</span>
            </button>

            <button
              onClick={() => setViewStep('config')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm transition-all cursor-pointer"
            >
              <span>Voltar para Exercícios</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SCREEN: ACTIVE 10-QUESTION QUIZ
  // --------------------------------------------------------------------------
  if (viewStep === 'quiz' && currentQ) {
    const isLastQuestion = currentIndex + 1 === questions.length;

    return (
      <div className="max-w-2xl mx-auto space-y-4 pb-12 animate-in fade-in duration-200">
        {/* Top Header & Visual Progress Bar ("Questão 1 de 10") */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                {getSubjectIcon(selectedSubjectSlug)}
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block leading-tight">
                  {subjectNames[selectedSubjectSlug]}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Nível {selectedDifficulty}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                Questão {currentIndex + 1} de {questions.length}
              </span>
            </div>
          </div>

          {/* Visual Progress Bar */}
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          {/* Question Number & Enunciado */}
          <div className="space-y-2">
            <span className="inline-block px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-bold text-slate-600 dark:text-slate-400">
              Questão {currentIndex + 1} de {questions.length}
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
              {currentQ.question}
            </h2>
          </div>

          {/* Exatamente 4 Alternativas */}
          <div className="space-y-2.5">
            {currentQ.options.map((option, optIdx) => {
              const isSelected = selectedOption === optIdx;
              const isCorrectAnswer = optIdx === currentQ.correctIndex;

              let style = 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-800 dark:text-slate-200';

              if (isSelected && !hasAnswered) {
                style = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 font-semibold ring-2 ring-emerald-500/20';
              }

              if (hasAnswered) {
                if (isCorrectAnswer) {
                  style = 'border-emerald-500 bg-emerald-100/90 dark:bg-emerald-950/70 text-emerald-950 dark:text-emerald-100 font-semibold';
                } else if (isSelected && !isCorrectAnswer) {
                  style = 'border-rose-400 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200';
                }
              }

              return (
                <button
                  key={optIdx}
                  type="button"
                  disabled={hasAnswered}
                  onClick={() => setSelectedOption(optIdx)}
                  className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm transition-all flex items-center justify-between gap-3 cursor-pointer ${style}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300 shrink-0">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="leading-snug">{option}</span>
                  </div>

                  {hasAnswered && isCorrectAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {hasAnswered && isSelected && !isCorrectAnswer && (
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Immediate Correction & Explanation */}
          {hasAnswered && (
            <div className={`p-4 sm:p-5 rounded-2xl border text-xs sm:text-sm animate-in fade-in space-y-2.5 ${
              selectedOption === currentQ.correctIndex
                ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/60 text-emerald-900 dark:text-emerald-200'
                : 'bg-rose-50/90 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/60 text-rose-900 dark:text-rose-200'
            }`}>
              <div className="flex items-center justify-between font-bold text-xs">
                <span className="flex items-center gap-1.5 uppercase tracking-wider">
                  {selectedOption === currentQ.correctIndex ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Você acertou! (+15 XP)</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-rose-600" />
                      <span>Resposta incorreta</span>
                    </>
                  )}
                </span>

                {onAskTutorAboutQuestion && (
                  <button
                    type="button"
                    onClick={() => onAskTutorAboutQuestion(currentQ.question)}
                    className="inline-flex items-center gap-1 text-[11px] underline font-semibold cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Tirar dúvida com Tutor IA
                  </button>
                )}
              </div>

              <div>
                <span className="font-semibold block mb-1">Explicação passo a passo:</span>
                <p className="leading-relaxed opacity-95 whitespace-pre-line">
                  {currentQ.explanation}
                </p>
              </div>
            </div>
          )}

          {/* Action Row: Botão "Responder" e "Próxima Questão" */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => {
                if (window.confirm('Deseja abandonar este exercício? Seu progresso desta rodada não será salvo.')) {
                  setViewStep('config');
                }
              }}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-semibold cursor-pointer"
            >
              Cancelar
            </button>

            {!hasAnswered ? (
              <button
                type="button"
                disabled={selectedOption === null}
                onClick={handleConfirmAnswer}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer"
              >
                Responder
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNextQuestion}
                className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>{isLastQuestion ? 'Ver Resultado' : 'Próxima Questão'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SCREEN: CONFIGURATION (Escolher Matéria + Escolher Nível)
  // --------------------------------------------------------------------------
  const subjectList: { slug: string; name: string; desc: string }[] = [
    { slug: 'matematica', name: 'Matemática', desc: 'Equações, geometria, frações e lógica' },
    { slug: 'portugues', name: 'Português', desc: 'Gramática, crase, concordância e leitura' },
    { slug: 'historia', name: 'História', desc: 'Brasil Colônia, República e Guerras' },
    { slug: 'geografia', name: 'Geografia', desc: 'Cartografia, biomas e urbanização' },
    { slug: 'ciencias', name: 'Ciências', desc: 'Física, química, células e ecologia' },
    { slug: 'ingles', name: 'Inglês', desc: 'Gramática, vocabulário e tempos verbais' }
  ];

  const difficultyLevels: { level: DifficultyLevel; desc: string }[] = [
    { level: 'Fácil', desc: 'Conceitos fundamentais e questões diretas' },
    { level: 'Médio', desc: 'Problemas contextualizados e interpretação' },
    { level: 'Difícil', desc: 'Desafios avançados e raciocínio profundo' }
  ];

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-12 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <Dumbbell className="w-4 h-4" />
          <span>Área de Prática & Fixação</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
          Exercícios Interativos
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Escolha a matéria e o nível para iniciar um teste de 10 perguntas gerado com IA e correção comentada.
        </p>
      </div>

      {/* 1. ESCOLHER A MATÉRIA */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] flex items-center justify-center font-bold">1</span>
            Escolha a Matéria
          </h2>
          <span className="text-xs text-slate-500">6 matérias disponíveis</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {subjectList.map((item) => {
            const isSelected = selectedSubjectSlug === item.slug;
            return (
              <button
                key={item.slug}
                type="button"
                disabled={isGenerating}
                onClick={() => setSelectedSubjectSlug(item.slug)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 ring-2 ring-emerald-500/20 shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}>
                    {getSubjectIcon(item.slug)}
                  </div>
                  <span className="font-bold text-xs sm:text-sm truncate">
                    {item.name}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                  {item.desc}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. ESCOLHER O NÍVEL */}
      <section className="space-y-3 pt-2">
        <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] flex items-center justify-center font-bold">2</span>
          Escolha o Nível de Dificuldade
        </h2>

        <div className="grid grid-cols-3 gap-2.5">
          {difficultyLevels.map((lvl) => {
            const isSelected = selectedDifficulty === lvl.level;
            return (
              <button
                key={lvl.level}
                type="button"
                disabled={isGenerating}
                onClick={() => setSelectedDifficulty(lvl.level)}
                className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 ring-2 ring-emerald-500/20 shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <span className="font-bold text-xs sm:text-sm block">
                  {lvl.level}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 hidden sm:block mt-1">
                  {lvl.desc}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. INICIAR EXERCÍCIO CTA (Disabled while isGenerating) */}
      <div className="pt-2">
        <button
          type="button"
          disabled={isGenerating}
          onClick={handleStartExercise}
          className="w-full py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-extrabold text-sm sm:text-base shadow-lg shadow-amber-400/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-5 h-5 text-slate-950" />
          <span>Iniciar Exercício (10 Perguntas)</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* 5. HISTÓRICO DE PROGRESSO RECENTE */}
      {history.length > 0 && (
        <section className="pt-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <History className="w-4 h-4" />
              Seus Treinos Anteriores
            </h3>
            <button
              onClick={() => {
                if (window.confirm('Deseja limpar o histórico de treinos?')) {
                  setHistory([]);
                  localStorage.removeItem('estudafacil_quiz_history');
                }
              }}
              className="text-[11px] text-slate-400 hover:text-rose-500 cursor-pointer"
            >
              Limpar histórico
            </button>
          </div>

          <div className="space-y-2">
            {history.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0">
                    {getSubjectIcon(item.subjectSlug)}
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200 block">
                      {item.subjectName} · {item.difficulty}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {item.dateFormatted}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`font-bold tabular-nums ${
                    item.percentage >= 70 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
                  }`}>
                    {item.correctAnswers}/{item.totalQuestions} ({item.percentage}%)
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    +{item.xpEarned} XP
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
