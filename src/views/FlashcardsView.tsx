import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Sparkles,
  RotateCw,
  CheckCircle2,
  Filter,
  Search,
  BookOpen,
  Microscope,
  FlaskConical,
  Shuffle,
  Layers,
  List,
  Eye,
  EyeOff,
  Keyboard,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Lightbulb,
  Check
} from 'lucide-react';
import { Flashcard, FlashcardMasteryMap, FlashcardMasteryStatus, PaperId } from '../types';
import { DMLT_PAPERS } from '../data/dmltData';
import {
  getAllCurriculumFlashcards,
  getFlashcardMasteryMap,
  saveCardMastery,
  resetFlashcardMastery,
  shuffleDeck
} from '../utils/flashcards';
import { FlashcardCard } from '../components/FlashcardCard';

interface FlashcardsViewProps {
  initialPaperId?: PaperId | 'all';
  initialChapterId?: string | 'all';
  onNavigateToPaper?: (paperId: PaperId) => void;
  onNavigateToChapter?: (chapterId: string) => void;
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({
  initialPaperId = 'all',
  initialChapterId = 'all',
}) => {
  const [selectedPaper, setSelectedPaper] = useState<PaperId | 'all'>(initialPaperId);
  const [selectedChapterId, setSelectedChapterId] = useState<string | 'all'>(initialChapterId);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [masteryFilter, setMasteryFilter] = useState<'all' | 'learning' | 'mastered'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Mode: 'deck' (active recall single card) or 'sheet' (study sheet list)
  const [viewMode, setViewMode] = useState<'deck' | 'sheet'>('deck');

  // Deck state
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [reverseMode, setReverseMode] = useState<boolean>(false);
  const [shuffledOrder, setShuffledOrder] = useState<Flashcard[] | null>(null);

  // Study Sheet: Track which definitions are revealed
  const [revealedSheetIds, setRevealedSheetIds] = useState<Record<string, boolean>>({});

  // Mastery Map state from localStorage
  const [masteryMap, setMasteryMap] = useState<FlashcardMasteryMap>({});
  const [showKeyboardHelp, setShowKeyboardHelp] = useState<boolean>(false);

  // Load mastery map
  const refreshMastery = useCallback(() => {
    setMasteryMap(getFlashcardMasteryMap());
  }, []);

  useEffect(() => {
    refreshMastery();
    const handleUpdate = () => refreshMastery();
    window.addEventListener('dmlt-flashcards-mastery-updated', handleUpdate);
    return () => window.removeEventListener('dmlt-flashcards-mastery-updated', handleUpdate);
  }, [refreshMastery]);

  // Update paper/chapter when props change
  useEffect(() => {
    if (initialPaperId) setSelectedPaper(initialPaperId);
  }, [initialPaperId]);

  useEffect(() => {
    if (initialChapterId) setSelectedChapterId(initialChapterId);
  }, [initialChapterId]);

  // All available cards
  const allCards = useMemo(() => getAllCurriculumFlashcards(), []);

  // Filtered chapter choices based on selected paper
  const availableChapters = useMemo(() => {
    if (selectedPaper === 'all') {
      return DMLT_PAPERS.flatMap((p) => p.chapters);
    }
    const p = DMLT_PAPERS.find((paper) => paper.id === selectedPaper);
    return p ? p.chapters : [];
  }, [selectedPaper]);

  // Categories present in cards
  const categories = useMemo(() => {
    const set = new Set<string>();
    allCards.forEach((c) => {
      if (c.category) set.add(c.category);
    });
    return Array.from(set);
  }, [allCards]);

  // Filter cards based on user choices
  const filteredCards = useMemo(() => {
    const base = shuffledOrder || allCards;

    return base.filter((card) => {
      // Paper filter
      if (selectedPaper !== 'all' && card.paperId !== selectedPaper) {
        return false;
      }
      // Chapter filter
      if (selectedChapterId !== 'all' && card.chapterId !== selectedChapterId) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'all' && card.category !== selectedCategory) {
        return false;
      }
      // Mastery filter
      const status = masteryMap[card.id]?.status || 'learning';
      if (masteryFilter !== 'all' && status !== masteryFilter) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTerm = card.term.toLowerCase().includes(q);
        const matchesDef = card.definition.toLowerCase().includes(q);
        const matchesChapter = card.chapterTitle.toLowerCase().includes(q);
        if (!matchesTerm && !matchesDef && !matchesChapter) return false;
      }

      return true;
    });
  }, [
    allCards,
    shuffledOrder,
    selectedPaper,
    selectedChapterId,
    selectedCategory,
    masteryFilter,
    searchQuery,
    masteryMap
  ]);

  // Reset current index when filter results change
  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [selectedPaper, selectedChapterId, selectedCategory, masteryFilter, searchQuery]);

  const activeCard = filteredCards[currentIndex] || null;

  // Deck navigation
  const handleNext = useCallback(() => {
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
    }
  }, [currentIndex, filteredCards.length]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsFlipped(false);
    }
  }, [currentIndex]);

  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  const handleMarkStatus = useCallback(
    (status: FlashcardMasteryStatus) => {
      if (!activeCard) return;
      saveCardMastery(activeCard.id, status);
      // Auto-advance if marking as mastered and not on last card
      if (status === 'mastered' && currentIndex < filteredCards.length - 1) {
        handleNext();
      }
    },
    [activeCard, currentIndex, filteredCards.length, handleNext]
  );

  const handleShuffle = () => {
    const shuffled = shuffleDeck(filteredCards);
    setShuffledOrder(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleResetOrder = () => {
    setShuffledOrder(null);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  // Keyboard navigation handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore key events when focusing on an input element
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      if (e.code === 'Space') {
        e.preventDefault();
        handleFlip();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === '1') {
        e.preventDefault();
        handleMarkStatus('learning');
      } else if (e.key === '2') {
        e.preventDefault();
        handleMarkStatus('mastered');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFlip, handleNext, handlePrev, handleMarkStatus]);

  // Statistics for the current deck
  const deckStats = useMemo(() => {
    let mastered = 0;
    filteredCards.forEach((c) => {
      if (masteryMap[c.id]?.status === 'mastered') {
        mastered++;
      }
    });
    const total = filteredCards.length;
    return {
      total,
      mastered,
      learning: total - mastered,
      percentage: total > 0 ? Math.round((mastered / total) * 100) : 0,
    };
  }, [filteredCards, masteryMap]);

  // Study Sheet: Toggle all definitions
  const handleToggleAllSheet = (reveal: boolean) => {
    const update: Record<string, boolean> = {};
    filteredCards.forEach((c) => {
      update[c.id] = reveal;
    });
    setRevealedSheetIds(update);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Banner Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-md flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                Active Recall Engine
              </span>
              <span className="text-xs text-slate-500 font-medium">
                DMLT 2nd Year Medical Terms & Principles
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Active Recall Flashcards
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Toggle between essential laboratory terms and high-yield definitions. Test your
              memory before flipping to achieve rapid active recall and long-term retention.
            </p>
          </div>

          {/* Quick Deck Mastery Meter */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 md:w-72 shrink-0 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-700">Deck Recall Mastery</span>
              <span className="text-indigo-600 font-black text-sm">
                {deckStats.percentage}%
              </span>
            </div>

            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${deckStats.percentage}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-600 pt-0.5">
              <span>
                Mastered: <strong className="text-emerald-700 font-bold">{deckStats.mastered}</strong>
              </span>
              <span>
                Learning: <strong className="text-amber-700 font-bold">{deckStats.learning}</strong>
              </span>
              <span>
                Total: <strong className="text-slate-800 font-bold">{deckStats.total}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Mode Control Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3.5">
        {/* Paper Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs font-semibold">
          <button
            onClick={() => {
              setSelectedPaper('all');
              setSelectedChapterId('all');
            }}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              selectedPaper === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>All 3 Papers</span>
          </button>

          <button
            onClick={() => {
              setSelectedPaper('pathology');
              setSelectedChapterId('all');
            }}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              selectedPaper === 'pathology'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Paper I: Pathology</span>
          </button>

          <button
            onClick={() => {
              setSelectedPaper('microbiology');
              setSelectedChapterId('all');
            }}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              selectedPaper === 'microbiology'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
            }`}
          >
            <Microscope className="w-3.5 h-3.5" />
            <span>Paper II: Microbiology</span>
          </button>

          <button
            onClick={() => {
              setSelectedPaper('biochemistry');
              setSelectedChapterId('all');
            }}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              selectedPaper === 'biochemistry'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Paper III: Biochemistry</span>
          </button>
        </div>

        {/* Secondary Filter Row: Chapter, Category, Status & Search */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1">
          {/* Chapter Selector Dropdown */}
          <div className="relative">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Chapter
            </label>
            <select
              value={selectedChapterId}
              onChange={(e) => setSelectedChapterId(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all font-medium"
            >
              <option value="all">All Chapters ({availableChapters.length})</option>
              {availableChapters.map((ch) => (
                <option key={ch.id} value={ch.id}>
                  Ch. {ch.chapterNumber ?? ch.number}: {ch.title}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div className="relative">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all font-medium"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Mastery Status Filter */}
          <div className="relative">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Recall Status
            </label>
            <select
              value={masteryFilter}
              onChange={(e) => setMasteryFilter(e.target.value as any)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all font-medium"
            >
              <option value="all">All Cards</option>
              <option value="learning">Needs Review Only</option>
              <option value="mastered">Mastered Only</option>
            </select>
          </div>

          {/* Search Term Input */}
          <div className="relative">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Quick Search
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search term or keyword..."
                className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* View Mode & Deck Utility Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
          {/* Deck Mode vs Study Sheet Mode Switcher */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('deck')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'deck'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              <span>Interactive Deck</span>
            </button>

            <button
              onClick={() => setViewMode('sheet')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'sheet'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <List className="w-3.5 h-3.5 text-indigo-600" />
              <span>Study Sheet View</span>
            </button>
          </div>

          {/* Active Recall Tools */}
          <div className="flex items-center gap-2 flex-wrap">
            {viewMode === 'deck' && (
              <>
                {/* Reverse Recall Direction Toggle */}
                <button
                  type="button"
                  onClick={() => {
                    setReverseMode(!reverseMode);
                    setIsFlipped(false);
                  }}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    reverseMode
                      ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                  title="Reverse prompt: practice recalling the term from the definition"
                >
                  <RotateCw className="w-3 h-3 text-indigo-600" />
                  <span>{reverseMode ? 'Definition → Term' : 'Term → Definition'}</span>
                </button>

                {/* Shuffle Button */}
                <button
                  type="button"
                  onClick={handleShuffle}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all"
                  title="Shuffle flashcard deck"
                >
                  <Shuffle className="w-3 h-3 text-indigo-600" />
                  <span>Shuffle Deck</span>
                </button>

                {shuffledOrder && (
                  <button
                    type="button"
                    onClick={handleResetOrder}
                    className="inline-flex items-center gap-1 px-2 py-1 text-[11px] text-slate-400 hover:text-slate-600"
                  >
                    Reset Order
                  </button>
                )}
              </>
            )}

            {viewMode === 'sheet' && (
              <>
                <button
                  onClick={() => handleToggleAllSheet(true)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                >
                  <Eye className="w-3 h-3 text-indigo-600" />
                  <span>Reveal All Definitions</span>
                </button>
                <button
                  onClick={() => handleToggleAllSheet(false)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                >
                  <EyeOff className="w-3 h-3 text-slate-500" />
                  <span>Hide All</span>
                </button>
              </>
            )}

            {/* Keyboard Shortcuts Dialog Toggle */}
            <button
              type="button"
              onClick={() => setShowKeyboardHelp(!showKeyboardHelp)}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              title="Keyboard shortcuts"
            >
              <Keyboard className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Hint Bar (Collapsible) */}
      {showKeyboardHelp && (
        <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-2xl text-xs text-indigo-900 flex flex-wrap items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-2">
            <Keyboard className="w-4 h-4 text-indigo-600" />
            <span className="font-bold">Active Recall Keyboard Shortcuts:</span>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <span>
              <kbd className="px-2 py-0.5 bg-white border border-indigo-200 rounded font-mono text-[11px] shadow-2xs">
                Space
              </kbd>{' '}
              Flip Card
            </span>
            <span>
              <kbd className="px-2 py-0.5 bg-white border border-indigo-200 rounded font-mono text-[11px] shadow-2xs">
                ←
              </kbd>{' '}
              Previous
            </span>
            <span>
              <kbd className="px-2 py-0.5 bg-white border border-indigo-200 rounded font-mono text-[11px] shadow-2xs">
                →
              </kbd>{' '}
              Next
            </span>
            <span>
              <kbd className="px-2 py-0.5 bg-white border border-indigo-200 rounded font-mono text-[11px] shadow-2xs">
                1
              </kbd>{' '}
              Still Learning
            </span>
            <span>
              <kbd className="px-2 py-0.5 bg-white border border-indigo-200 rounded font-mono text-[11px] shadow-2xs">
                2
              </kbd>{' '}
              Mastered
            </span>
          </div>
        </div>
      )}

      {/* MAIN VIEW CONTENT */}
      {filteredCards.length === 0 ? (
        /* Empty State */
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4 max-w-md mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-800">No flashcards found</h3>
            <p className="text-xs text-slate-500">
              No flashcards match your current filter settings. Try selecting &quot;All Chapters&quot;
              or clearing the search query.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setSelectedPaper('all');
              setSelectedChapterId('all');
              setSelectedCategory('all');
              setMasteryFilter('all');
              setSearchQuery('');
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition-colors shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      ) : viewMode === 'deck' && activeCard ? (
        /* INTERACTIVE FLASHCARD DECK MODE */
        <div className="space-y-4">
          {/* Deck Counter and Progress Bar */}
          <div className="max-w-2xl mx-auto flex items-center justify-between text-xs font-semibold text-slate-500 px-2">
            <span>
              Card <strong className="text-indigo-600">{currentIndex + 1}</strong> of{' '}
              <strong className="text-slate-800">{filteredCards.length}</strong>
            </span>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400">
                {Math.round(((currentIndex + 1) / filteredCards.length) * 100)}% through deck
              </span>
            </div>
          </div>

          {/* Thin Deck Progress Tracker */}
          <div className="max-w-2xl mx-auto w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-indigo-600 h-full rounded-full transition-all duration-300 ease-out"
              style={{
                width: `${((currentIndex + 1) / filteredCards.length) * 100}%`,
              }}
            />
          </div>

          {/* Flashcard Component */}
          <FlashcardCard
            key={activeCard.id}
            card={activeCard}
            isFlipped={isFlipped}
            onFlip={handleFlip}
            reverseMode={reverseMode}
            masteryStatus={masteryMap[activeCard.id]?.status || 'learning'}
            onMarkStatus={handleMarkStatus}
            onNext={handleNext}
            onPrev={handlePrev}
            hasPrev={currentIndex > 0}
            hasNext={currentIndex < filteredCards.length - 1}
          />
        </div>
      ) : (
        /* STUDY SHEET / LIST MODE */
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 px-1">
            <span>
              Showing <strong className="text-slate-800">{filteredCards.length}</strong> terms in
              this study sheet
            </span>
            <span className="text-slate-400 text-[11px]">
              Click any term card to toggle its definition
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredCards.map((card, idx) => {
              const isRevealed = revealedSheetIds[card.id] ?? false;
              const isMastered = masteryMap[card.id]?.status === 'mastered';

              return (
                <div
                  key={card.id}
                  id={`sheet-card-${card.id}`}
                  className={`bg-white rounded-2xl border p-5 transition-all shadow-2xs hover:shadow-xs space-y-3 ${
                    isMastered ? 'border-emerald-200/80 bg-emerald-50/10' : 'border-slate-200'
                  }`}
                >
                  {/* Top Header of Card */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                        #{idx + 1}
                      </span>
                      <span className="text-[11px] font-medium text-slate-500">
                        Ch. {card.chapterNumber}: {card.chapterTitle}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() =>
                          saveCardMastery(card.id, isMastered ? 'learning' : 'mastered')
                        }
                        className={`p-1 rounded-md transition-colors ${
                          isMastered
                            ? 'text-emerald-600 bg-emerald-50'
                            : 'text-slate-400 hover:text-emerald-600 hover:bg-slate-100'
                        }`}
                        title={isMastered ? 'Marked as Mastered' : 'Mark as Mastered'}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Term */}
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-slate-900 tracking-tight">
                      {card.term}
                    </h4>
                    {card.category && (
                      <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md inline-block">
                        {card.category}
                      </span>
                    )}
                  </div>

                  {/* Toggle Definition Button */}
                  <div>
                    <button
                      type="button"
                      onClick={() =>
                        setRevealedSheetIds((prev) => ({
                          ...prev,
                          [card.id]: !isRevealed,
                        }))
                      }
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                    >
                      {isRevealed ? (
                        <>
                          <EyeOff className="w-3.5 h-3.5" />
                          <span>Hide Definition</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-3.5 h-3.5" />
                          <span>Show Definition</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Definition Body (Collapsible) */}
                  {isRevealed && (
                    <div className="pt-2 border-t border-slate-100 space-y-2 text-xs text-slate-700 animate-fadeIn leading-relaxed">
                      <p className="font-medium text-slate-800">{card.definition}</p>

                      {card.highYieldFact && (
                        <div className="p-2 bg-amber-50 rounded-lg text-amber-900 text-[11px] flex items-start gap-1.5">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <p>{card.highYieldFact}</p>
                        </div>
                      )}

                      {card.exampleOrFormula && (
                        <p className="text-[11px] font-mono text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
                          {card.exampleOrFormula}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
