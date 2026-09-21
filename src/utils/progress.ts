import { DMLT_PAPERS } from '../data/dmltData';
import { DMLTProgressData, PaperId, TopicProgress } from '../types';

const PROGRESS_STORAGE_KEY = 'dmlt_smart_study_progress_v2';
const RECENT_TESTS_KEY = 'dmlt_smart_study_recent_tests_v2';
const MASTER_CHECKLIST_KEY = 'dmlt_smart_study_master_checklist_v2';

export interface RecentCompletion {
  topicId: string;
  topicTitle: string;
  chapterTitle: string;
  paperTitle: string;
  paperId: PaperId;
  score: number;
  total: number;
  date: string;
  passed: boolean;
}

export function getDMLTProgress(): DMLTProgressData {
  try {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!raw) {
      return {
        pathology: {},
        microbiology: {},
        biochemistry: {}
      };
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse dmltProgress from localStorage', err);
    return {
      pathology: {},
      microbiology: {},
      biochemistry: {}
    };
  }
}

export function saveDMLTProgress(data: DMLTProgressData): void {
  try {
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new Event('dmlt-progress-updated'));
  } catch (err) {
    console.error('Failed to save dmltProgress to localStorage', err);
  }
}

export function getTopicProgress(paperId: PaperId, chapterId: string, topicId: string): TopicProgress {
  const data = getDMLTProgress();
  const paperMap = data[paperId] || {};
  const chapterMap = paperMap[chapterId] || {};
  return chapterMap[topicId] || {
    completed: false,
    bestScore: 0,
    latestScore: 0,
    attempts: 0
  };
}

export function recordTestAttempt(
  paperId: PaperId,
  chapterId: string,
  topicId: string,
  topicTitle: string,
  chapterTitle: string,
  paperTitle: string,
  score: number,
  total: number = 30
): { completed: boolean; isPass: boolean; bestScore: number; attempts: number } {
  const data = getDMLTProgress();
  if (!data[paperId]) data[paperId] = {};
  if (!data[paperId][chapterId]) data[paperId][chapterId] = {};

  const existing = data[paperId][chapterId][topicId] || {
    completed: false,
    bestScore: 0,
    latestScore: 0,
    attempts: 0
  };

  const isPass = score >= 25;
  const now = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const updated: TopicProgress = {
    completed: existing.completed || isPass,
    bestScore: Math.max(existing.bestScore, score),
    latestScore: score,
    attempts: (existing.attempts || 0) + 1,
    lastAttemptDate: now,
    completedDate: (existing.completed || isPass) ? (existing.completedDate || now) : undefined
  };

  data[paperId][chapterId][topicId] = updated;
  saveDMLTProgress(data);

  // Record in recent attempts log
  try {
    const rawRecent = localStorage.getItem(RECENT_TESTS_KEY);
    const recentList: RecentCompletion[] = rawRecent ? JSON.parse(rawRecent) : [];
    recentList.unshift({
      topicId,
      topicTitle,
      chapterTitle,
      paperTitle,
      paperId,
      score,
      total,
      date: now,
      passed: isPass
    });
    // Keep last 50 attempts
    localStorage.setItem(RECENT_TESTS_KEY, JSON.stringify(recentList.slice(0, 50)));
  } catch (err) {
    console.error('Failed to record recent completion', err);
  }

  return {
    completed: updated.completed,
    isPass,
    bestScore: updated.bestScore,
    attempts: updated.attempts
  };
}

export function getRecentCompletions(): RecentCompletion[] {
  try {
    const raw = localStorage.getItem(RECENT_TESTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function calculateChapterProgress(paperId: PaperId, chapterId: string) {
  const paper = DMLT_PAPERS.find(p => p.id === paperId);
  const chapter = paper?.chapters.find(c => c.id === chapterId);
  if (!chapter) return { totalTopics: 0, completedTopics: 0, percentage: 0, isCompleted: false };

  const totalTopics = chapter.topics.length;
  const progressData = getDMLTProgress();
  const chapterMap = progressData[paperId]?.[chapterId] || {};

  let completedTopics = 0;
  for (const topic of chapter.topics) {
    if (chapterMap[topic.id]?.completed) {
      completedTopics++;
    }
  }

  const percentage = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
  return {
    totalTopics,
    completedTopics,
    percentage,
    isCompleted: completedTopics === totalTopics && totalTopics > 0
  };
}

export function calculatePaperProgress(paperId: PaperId) {
  const paper = DMLT_PAPERS.find(p => p.id === paperId);
  if (!paper) {
    return { totalTopics: 0, completedTopics: 0, remainingTopics: 0, percentage: 0, totalChapters: 0 };
  }

  const totalChapters = paper.chapters.length;
  let totalTopics = 0;
  let completedTopics = 0;
  const progressData = getDMLTProgress();
  const paperMap = progressData[paperId] || {};

  for (const chapter of paper.chapters) {
    totalTopics += chapter.topics.length;
    const chapterMap = paperMap[chapter.id] || {};
    for (const topic of chapter.topics) {
      if (chapterMap[topic.id]?.completed) {
        completedTopics++;
      }
    }
  }

  const remainingTopics = Math.max(0, totalTopics - completedTopics);
  const percentage = totalTopics > 0 ? parseFloat(((completedTopics / totalTopics) * 100).toFixed(1)) : 0;

  return {
    totalTopics,
    completedTopics,
    remainingTopics,
    percentage,
    totalChapters
  };
}

export function calculateOverallProgress() {
  let totalTopics = 0;
  let completedTopics = 0;
  let totalAttempts = 0;
  let passedTests = 0;
  let totalScoreAccumulated = 0;
  let scoredAttemptsCount = 0;

  const progressData = getDMLTProgress();

  for (const paper of DMLT_PAPERS) {
    const paperMap = progressData[paper.id] || {};
    for (const chapter of paper.chapters) {
      totalTopics += chapter.topics.length;
      const chapterMap = paperMap[chapter.id] || {};
      for (const topic of chapter.topics) {
        const item = chapterMap[topic.id];
        if (item) {
          if (item.completed) completedTopics++;
          if (item.attempts > 0) {
            totalAttempts += item.attempts;
            if (item.bestScore >= 25) passedTests++;
            totalScoreAccumulated += item.bestScore;
            scoredAttemptsCount++;
          }
        }
      }
    }
  }

  // Also include recent tests count for total attempts and pass/fail stats if available
  const recentTests = getRecentCompletions();
  const actualTotalAttempts = Math.max(totalAttempts, recentTests.length);
  const actualPassedTests = recentTests.length > 0 ? recentTests.filter(t => t.passed).length : passedTests;
  const actualFailedTests = Math.max(0, actualTotalAttempts - actualPassedTests);
  
  const avgScore = scoredAttemptsCount > 0 
    ? parseFloat((totalScoreAccumulated / scoredAttemptsCount).toFixed(1)) 
    : (recentTests.length > 0 ? parseFloat((recentTests.reduce((acc, t) => acc + t.score, 0) / recentTests.length).toFixed(1)) : 0);

  const remainingTopics = Math.max(0, totalTopics - completedTopics);
  const percentage = totalTopics > 0 ? parseFloat(((completedTopics / totalTopics) * 100).toFixed(1)) : 0;

  return {
    totalTopics,
    completedTopics,
    remainingTopics,
    percentage,
    avgScore,
    totalAttempts: actualTotalAttempts,
    passedTests: actualPassedTests,
    failedTests: actualFailedTests
  };
}

// Master Revision Checklist
export function getMasterChecklist(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(MASTER_CHECKLIST_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function toggleMasterChecklist(id: string): boolean {
  try {
    const current = getMasterChecklist();
    const newVal = !current[id];
    current[id] = newVal;
    localStorage.setItem(MASTER_CHECKLIST_KEY, JSON.stringify(current));
    window.dispatchEvent(new Event('dmlt-master-checklist-updated'));
    return newVal;
  } catch {
    return false;
  }
}

// Reset all progress
export function resetAllProgress(): void {
  try {
    localStorage.removeItem(PROGRESS_STORAGE_KEY);
    localStorage.removeItem(RECENT_TESTS_KEY);
    localStorage.removeItem(MASTER_CHECKLIST_KEY);
    window.dispatchEvent(new Event('dmlt-progress-updated'));
    window.dispatchEvent(new Event('dmlt-master-checklist-updated'));
  } catch (err) {
    console.error('Failed to reset progress', err);
  }
}
