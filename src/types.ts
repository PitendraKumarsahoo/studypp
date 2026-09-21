export type PaperId = 'pathology' | 'microbiology' | 'biochemistry';

export interface Topic {
  id: string;
  title: string;
  chapterId: string;
  paperId: PaperId;
  description?: string;
}

export interface Chapter {
  id: string;
  chapterNumber: number;
  number?: number;
  title: string;
  paperId: PaperId;
  topics: Topic[];
}

export interface Paper {
  id: PaperId;
  paperCode: string;
  title: string;
  subtitle?: string;
  description: string;
  badgeColor: string;
  chapters: Chapter[];
}

export type DMLTPaper = Paper;

export interface MCQQuestion {
  id: string;
  question: string;
  options: [string, string, string, string];
  correctAnswer: number; // 0, 1, 2, 3
  explanation: string;
}

export interface TopicProgress {
  completed: boolean;
  bestScore: number;
  latestScore: number;
  attempts: number;
  lastAttemptDate?: string;
  completedDate?: string;
}

export interface PaperProgressMap {
  [chapterId: string]: {
    [topicId: string]: TopicProgress;
  };
}

export interface DMLTProgressData {
  pathology: PaperProgressMap;
  microbiology: PaperProgressMap;
  biochemistry: PaperProgressMap;
}

export interface MasterChecklistItem {
  id: string;
  category: 'pathology' | 'microbiology' | 'biochemistry' | 'protocol';
  text: string;
}

export interface TestAttemptResult {
  score: number;
  total: number;
  passed: boolean;
  userAnswers: (number | null)[];
  questions: MCQQuestion[];
  topicId: string;
  chapterId: string;
  paperId: PaperId;
}
