import { Flashcard, FlashcardMasteryMap, FlashcardMasteryStatus, PaperId, Chapter } from '../types';
import { DMLT_FLASHCARDS } from '../data/flashcardsData';
import { DMLT_PAPERS } from '../data/dmltData';

const FLASHCARD_STORAGE_KEY = 'dmlt_flashcards_mastery_v1';

export function getFlashcardMasteryMap(): FlashcardMasteryMap {
  try {
    const raw = localStorage.getItem(FLASHCARD_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading flashcard mastery', e);
    return {};
  }
}

export function saveCardMastery(cardId: string, status: FlashcardMasteryStatus): void {
  try {
    const map = getFlashcardMasteryMap();
    const current = map[cardId];
    map[cardId] = {
      status,
      lastReviewedAt: new Date().toISOString(),
      reviewCount: (current?.reviewCount || 0) + 1,
    };
    localStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(map));
    window.dispatchEvent(new CustomEvent('dmlt-flashcards-mastery-updated', { detail: { cardId, status } }));
  } catch (e) {
    console.error('Error saving card mastery', e);
  }
}

export function toggleCardMastery(cardId: string): FlashcardMasteryStatus {
  const map = getFlashcardMasteryMap();
  const currentStatus = map[cardId]?.status || 'learning';
  const newStatus: FlashcardMasteryStatus = currentStatus === 'mastered' ? 'learning' : 'mastered';
  saveCardMastery(cardId, newStatus);
  return newStatus;
}

export function resetFlashcardMastery(): void {
  try {
    localStorage.removeItem(FLASHCARD_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('dmlt-flashcards-mastery-updated'));
  } catch (e) {
    console.error('Error resetting flashcard mastery', e);
  }
}

/**
 * Clean clean extraction of key terms from topic titles
 */
function cleanTopicTitleToTerm(title: string): string {
  let cleaned = title
    .replace(/^Define\s+/i, '')
    .replace(/^Explain\s+/i, '')
    .replace(/^Describe\s+/i, '')
    .replace(/^Write\s+the\s+/i, '')
    .replace(/^Write\s+about\s+/i, '')
    .replace(/^Write\s+a\s+note\s+on\s+/i, '')
    .replace(/^Write\s+/i, '')
    .replace(/^List\s+/i, '')
    .replace(/^Differentiate\s+/i, 'Difference between ')
    .replace(/\.\s*State\s+its\s+importance.*$/i, '')
    .replace(/\.\s*$/i, '')
    .trim();

  // Capitalize first letter
  if (cleaned.length > 0) {
    cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  }
  return cleaned;
}

/**
 * Extract topic-based flashcards for chapters that don't have dedicated curated ones
 */
function extractCardsFromChapter(chapter: Chapter, paperId: PaperId): Flashcard[] {
  return chapter.topics.map((topic, index) => {
    const term = cleanTopicTitleToTerm(topic.title);
    return {
      id: `extracted_${topic.id}`,
      paperId,
      chapterId: chapter.id,
      chapterNumber: chapter.chapterNumber ?? chapter.number ?? 1,
      chapterTitle: chapter.title,
      term: term,
      definition: `Key syllabus standard for ${chapter.title}: Study and recall the core clinical definition, procedural steps, diagnostic principle, and reference interpretations for ${term}.`,
      category: 'Key Definition',
      highYieldFact: `Crucial topic tested in 2nd Year DMLT University Examinations and laboratory viva.`,
      exampleOrFormula: topic.description || `Topic focus: ${topic.title}`
    };
  });
}

/**
 * Get all available flashcards across the curriculum, combining curated with extracted
 */
export function getAllCurriculumFlashcards(): Flashcard[] {
  const allCards = [...DMLT_FLASHCARDS];
  const existingChapterIds = new Set(DMLT_FLASHCARDS.map((c) => c.chapterId));

  // For chapters without curated cards, extract from chapter topics
  DMLT_PAPERS.forEach((paper) => {
    paper.chapters.forEach((ch) => {
      if (!existingChapterIds.has(ch.id)) {
        const extracted = extractCardsFromChapter(ch, paper.id);
        allCards.push(...extracted);
      }
    });
  });

  return allCards;
}

export function getFlashcardsByPaper(paperId: PaperId | 'all'): Flashcard[] {
  const all = getAllCurriculumFlashcards();
  if (paperId === 'all') {
    return all;
  }
  return all.filter((c) => c.paperId === paperId);
}

export function getFlashcardsByChapter(chapterId: string): Flashcard[] {
  const curated = DMLT_FLASHCARDS.filter((c) => c.chapterId === chapterId);
  if (curated.length > 0) {
    return curated;
  }

  // Find chapter in DMLT_PAPERS and extract
  for (const paper of DMLT_PAPERS) {
    const ch = paper.chapters.find((c) => c.id === chapterId);
    if (ch) {
      return extractCardsFromChapter(ch, paper.id);
    }
  }

  return [];
}

export function shuffleDeck<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function getFlashcardStats() {
  const mastery = getFlashcardMasteryMap();
  const allCards = getAllCurriculumFlashcards();
  const totalCards = allCards.length;
  let masteredCount = 0;

  allCards.forEach((card) => {
    if (mastery[card.id]?.status === 'mastered') {
      masteredCount++;
    }
  });

  return {
    totalCards,
    masteredCount,
    learningCount: totalCards - masteredCount,
    percentage: totalCards > 0 ? Math.round((masteredCount / totalCards) * 100) : 0,
  };
}
