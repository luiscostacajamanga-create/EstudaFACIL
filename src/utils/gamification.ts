import { UserStats, QuizSessionResult, Achievement } from '../types';

/**
 * Level Thresholds based on specification:
 * Nível 1: 0 XP
 * Nível 2: 100 XP
 * Nível 3: 300 XP
 * Nível 4: 600 XP
 * Nível 5: 1000 XP
 * Level 6+: previous + (level - 1) * 100
 */
export function getLevelThresholds(maxLevel: number = 50): number[] {
  const thresholds: number[] = [0, 0, 100, 300, 600, 1000]; // 1-indexed for convenience

  for (let lvl = 6; lvl <= maxLevel; lvl++) {
    const prev = thresholds[lvl - 1];
    const increment = (lvl - 1) * 100;
    thresholds.push(prev + increment);
  }

  return thresholds;
}

export interface LevelInfo {
  level: number;
  currentLevelMinXp: number;
  nextLevelXp: number;
  xpInLevel: number;
  xpNeededForNextLevel: number;
  progressPercent: number;
}

export function calculateLevelInfo(totalXp: number): LevelInfo {
  const safeXp = Math.max(0, totalXp || 0);
  const thresholds = getLevelThresholds(60);

  let currentLevel = 1;
  while (currentLevel < thresholds.length - 1 && safeXp >= thresholds[currentLevel + 1]) {
    currentLevel++;
  }

  const currentLevelMinXp = thresholds[currentLevel];
  const nextLevelXp = thresholds[currentLevel + 1];
  const xpInLevel = safeXp - currentLevelMinXp;
  const xpNeededForNextLevel = nextLevelXp - currentLevelMinXp;
  const progressPercent = Math.min(
    100,
    Math.max(0, Math.round((xpInLevel / xpNeededForNextLevel) * 100))
  );

  return {
    level: currentLevel,
    currentLevelMinXp,
    nextLevelXp,
    xpInLevel,
    xpNeededForNextLevel,
    progressPercent
  };
}

/**
 * Calculates real achievements according to the specification:
 * - 🌱 Primeiro Passo — completar o primeiro exercício.
 * - 🎯 Primeiro Acerto — acertar a primeira questão.
 * - 📚 Estudante Dedicado — completar 5 testes.
 * - 🧠 Mente Brilhante — conseguir 90% ou mais em um teste.
 * - 🔥 3 Dias — estudar durante 3 dias consecutivos.
 * - 🚀 10 Testes — completar 10 testes.
 */
export function evaluateAchievements(
  userStats: UserStats,
  history: QuizSessionResult[],
  savedUnlockMap: Record<string, string> = {}
): { achievements: Achievement[]; updatedUnlockMap: Record<string, string> } {
  const updatedMap = { ...savedUnlockMap };
  const nowFormatted = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit'
  });

  const totalTests = Math.max(userStats.testsCompleted || 0, history.length);
  const totalCorrect = Math.max(
    userStats.totalCorrectAnswers || 0,
    history.reduce((acc, h) => acc + h.correctAnswers, 0)
  );
  const maxScorePercent = history.length > 0
    ? Math.max(...history.map((h) => h.percentage))
    : 0;
  const streak = userStats.streakDays || 0;

  const rawDefinitions = [
    {
      id: 'primeiro_passo',
      title: 'Primeiro Passo',
      description: 'Completar o primeiro exercício.',
      emoji: '🌱',
      isUnlocked: totalTests >= 1,
      progressText: `${Math.min(1, totalTests)}/1 teste`
    },
    {
      id: 'primeiro_acerto',
      title: 'Primeiro Acerto',
      description: 'Acertar a primeira questão.',
      emoji: '🎯',
      isUnlocked: totalCorrect >= 1,
      progressText: `${Math.min(1, totalCorrect)}/1 acerto`
    },
    {
      id: 'estudante_dedicado',
      title: 'Estudante Dedicado',
      description: 'Completar 5 testes.',
      emoji: '📚',
      isUnlocked: totalTests >= 5,
      progressText: `${Math.min(5, totalTests)}/5 testes`
    },
    {
      id: 'mente_brilhante',
      title: 'Mente Brilhante',
      description: 'Conseguir 90% ou mais em um teste.',
      emoji: '🧠',
      isUnlocked: maxScorePercent >= 90,
      progressText: maxScorePercent > 0 ? `Melhor: ${maxScorePercent}%` : '0% de 90%'
    },
    {
      id: 'tres_dias',
      title: '3 Dias',
      description: 'Estudar durante 3 dias consecutivos.',
      emoji: '🔥',
      isUnlocked: streak >= 3,
      progressText: `${Math.min(3, streak)}/3 dias`
    },
    {
      id: 'dez_testes',
      title: '10 Testes',
      description: 'Completar 10 testes.',
      emoji: '🚀',
      isUnlocked: totalTests >= 10,
      progressText: `${Math.min(10, totalTests)}/10 testes`
    }
  ];

  const achievements: Achievement[] = rawDefinitions.map((def) => {
    const wasAlreadyUnlocked = Boolean(updatedMap[def.id]);
    const isNowUnlocked = def.isUnlocked || wasAlreadyUnlocked;

    if (isNowUnlocked && !updatedMap[def.id]) {
      updatedMap[def.id] = nowFormatted;
    }

    return {
      id: def.id,
      title: def.title,
      description: def.description,
      emoji: def.emoji,
      unlocked: isNowUnlocked,
      unlockedAt: updatedMap[def.id] || undefined,
      progressText: isNowUnlocked ? 'Conquistado!' : def.progressText
    };
  });

  return { achievements, updatedUnlockMap: updatedMap };
}
