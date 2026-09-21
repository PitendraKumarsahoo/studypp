export interface DailyGoalData {
  target: number;
  solvedToday: number;
  testsCompletedToday: number;
  percentage: number;
  isAchieved: boolean;
  streakDays: number;
  remainingToday: number;
  todayDateFormatted: string;
}

const GOAL_TARGET_KEY = 'dmlt_daily_goal_target';
const DAILY_LOG_KEY = 'dmlt_daily_mcq_logs';
const STREAK_KEY = 'dmlt_study_streak';
export const DAILY_GOAL_EVENT = 'dmlt-daily-goal-updated';

export const DEFAULT_DAILY_GOAL = 60; // 2 tests worth of 30 MCQs

export function getTodayDateKey(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

interface DailyLogsMap {
  [dateKey: string]: {
    mcqsSolved: number;
    testsCompleted: number;
  };
}

function getDailyLogs(): DailyLogsMap {
  try {
    const raw = localStorage.getItem(DAILY_LOG_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveDailyLogs(logs: DailyLogsMap) {
  try {
    localStorage.setItem(DAILY_LOG_KEY, JSON.stringify(logs));
  } catch (err) {
    console.error('Failed to save daily logs', err);
  }
}

export function getDailyGoalTarget(): number {
  try {
    const raw = localStorage.getItem(GOAL_TARGET_KEY);
    if (raw) {
      const parsed = parseInt(raw, 10);
      if (!isNaN(parsed) && parsed > 0) return parsed;
    }
  } catch {
    // fallback
  }
  return DEFAULT_DAILY_GOAL;
}

export function setDailyGoalTarget(target: number): void {
  try {
    const val = Math.max(5, Math.min(500, Math.round(target)));
    localStorage.setItem(GOAL_TARGET_KEY, String(val));
    window.dispatchEvent(new CustomEvent(DAILY_GOAL_EVENT));
  } catch (err) {
    console.error('Failed to set daily goal target', err);
  }
}

interface StreakInfo {
  count: number;
  lastDateKey: string;
}

function getStreakInfo(): StreakInfo {
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // fallback
  }
  return { count: 1, lastDateKey: getTodayDateKey() };
}

function updateStreakForToday() {
  try {
    const today = getTodayDateKey();
    const current = getStreakInfo();

    if (current.lastDateKey === today) {
      return; // already recorded today
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yKey = getTodayDateKey(yesterday);

    let newCount = 1;
    if (current.lastDateKey === yKey) {
      newCount = (current.count || 0) + 1;
    }

    localStorage.setItem(STREAK_KEY, JSON.stringify({ count: newCount, lastDateKey: today }));
  } catch (err) {
    console.error('Failed to update streak', err);
  }
}

export function recordMCQsForToday(mcqCount: number, isCompletedTest: boolean = false) {
  try {
    const todayKey = getTodayDateKey();
    const logs = getDailyLogs();
    const existing = logs[todayKey] || { mcqsSolved: 0, testsCompleted: 0 };

    logs[todayKey] = {
      mcqsSolved: existing.mcqsSolved + mcqCount,
      testsCompleted: existing.testsCompleted + (isCompletedTest ? 1 : 0)
    };

    saveDailyLogs(logs);
    updateStreakForToday();
    window.dispatchEvent(new CustomEvent(DAILY_GOAL_EVENT));
  } catch (err) {
    console.error('Failed to record MCQs for today', err);
  }
}

export function resetTodayProgress() {
  try {
    const todayKey = getTodayDateKey();
    const logs = getDailyLogs();
    if (logs[todayKey]) {
      logs[todayKey] = { mcqsSolved: 0, testsCompleted: 0 };
      saveDailyLogs(logs);
      window.dispatchEvent(new CustomEvent(DAILY_GOAL_EVENT));
    }
  } catch (err) {
    console.error('Failed to reset today progress', err);
  }
}

export function getDailyGoalStats(): DailyGoalData {
  const target = getDailyGoalTarget();
  const todayKey = getTodayDateKey();
  const logs = getDailyLogs();
  const todayData = logs[todayKey] || { mcqsSolved: 0, testsCompleted: 0 };

  const solvedToday = todayData.mcqsSolved;
  const testsCompletedToday = todayData.testsCompleted;
  const percentage = Math.min(100, Math.round((solvedToday / target) * 100));
  const isAchieved = solvedToday >= target;
  const remainingToday = Math.max(0, target - solvedToday);

  const streak = getStreakInfo();

  const todayFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  return {
    target,
    solvedToday,
    testsCompletedToday,
    percentage,
    isAchieved,
    streakDays: Math.max(1, streak.count || 1),
    remainingToday,
    todayDateFormatted: todayFormatted
  };
}
