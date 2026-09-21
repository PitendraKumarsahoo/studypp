import React, { useState, useEffect } from 'react';
import { Sidebar, ActiveView } from './components/Sidebar';
import { MobileNav } from './components/MobileNav';
import { Header } from './components/Header';
import { DashboardView } from './views/DashboardView';
import { PaperView } from './views/PaperView';
import { ChapterView } from './views/ChapterView';
import { MasterChecklistView } from './views/MasterChecklistView';
import { ProgressView } from './views/ProgressView';
import { FlashcardsView } from './views/FlashcardsView';
import { MCQModal } from './components/MCQModal';
import { ResetConfirmModal } from './components/ResetConfirmModal';
import { DMLT_PAPERS } from './data/dmltData';
import { DMLTPaper, Chapter, Topic, PaperId } from './types';
import { calculateOverallProgress, resetAllProgress, getFirstPendingTopic } from './utils/progress';

export function App() {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [selectedPaper, setSelectedPaper] = useState<DMLTPaper | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [flashcardsPaperId, setFlashcardsPaperId] = useState<PaperId | 'all'>('all');
  const [flashcardsChapterId, setFlashcardsChapterId] = useState<string | 'all'>('all');

  // Active MCQ Test
  const [testTopic, setTestTopic] = useState<Topic | null>(null);
  const [testChapterTitle, setTestChapterTitle] = useState<string>('');
  const [testPaperTitle, setTestPaperTitle] = useState<string>('');

  // Reset Progress Modal
  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false);

  // Global revision state tracker for re-rendering upon test submission or reset
  const [updateTick, setUpdateTick] = useState<number>(0);

  useEffect(() => {
    const handleProgressUpdate = () => {
      setUpdateTick((t) => t + 1);
    };

    window.addEventListener('dmlt-progress-updated', handleProgressUpdate);
    window.addEventListener('dmlt-master-checklist-updated', handleProgressUpdate);

    return () => {
      window.removeEventListener('dmlt-progress-updated', handleProgressUpdate);
      window.removeEventListener('dmlt-master-checklist-updated', handleProgressUpdate);
    };
  }, []);

  const overall = calculateOverallProgress();

  // Navigation router
  const handleNavigate = (view: ActiveView, paperId?: PaperId) => {
    if (view === 'paper' && paperId) {
      const found = DMLT_PAPERS.find((p) => p.id === paperId);
      if (found) {
        setSelectedPaper(found);
        setSelectedChapter(null);
        setActiveView('paper');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }
    if (view === 'flashcards') {
      if (paperId) {
        setFlashcardsPaperId(paperId);
      } else {
        setFlashcardsPaperId('all');
      }
      setFlashcardsChapterId('all');
    }
    setActiveView(view);
    if (view === 'dashboard' || view === 'master_checklist' || view === 'progress' || view === 'flashcards') {
      if (view !== 'flashcards') {
        setSelectedPaper(null);
        setSelectedChapter(null);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPaper = (paper: DMLTPaper) => {
    setSelectedPaper(paper);
    setSelectedChapter(null);
    setActiveView('paper');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenChapter = (chapter: Chapter) => {
    setSelectedChapter(chapter);
    setActiveView('chapter');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenFlashcards = (paperId: PaperId | 'all' = 'all', chapterId: string | 'all' = 'all') => {
    setFlashcardsPaperId(paperId);
    setFlashcardsChapterId(chapterId);
    setActiveView('flashcards');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartTest = (topic: Topic) => {
    // Determine paper and chapter titles
    let pTitle = selectedPaper?.title || '';
    let cTitle = selectedChapter?.title || '';

    if (!pTitle || !cTitle) {
      for (const p of DMLT_PAPERS) {
        for (const c of p.chapters) {
          if (c.topics.some((t) => t.id === topic.id)) {
            pTitle = p.title;
            cTitle = c.title;
            break;
          }
        }
      }
    }

    setTestPaperTitle(pTitle);
    setTestChapterTitle(cTitle);
    setTestTopic(topic);
  };

  const handleSelectTopicFromSearch = (paper: DMLTPaper, chapter: Chapter, topic: Topic) => {
    setSelectedPaper(paper);
    setSelectedChapter(chapter);
    setActiveView('chapter');
    handleStartTest(topic);
  };

  const handleStartDailyGoalTest = () => {
    const pending = getFirstPendingTopic();
    if (pending) {
      setSelectedPaper(pending.paper);
      setSelectedChapter(pending.chapter);
      handleStartTest(pending.topic);
    } else {
      handleOpenPaper(DMLT_PAPERS[0]);
    }
  };

  const handleConfirmReset = () => {
    resetAllProgress();
    setActiveView('dashboard');
    setSelectedPaper(null);
    setSelectedChapter(null);
    setUpdateTick((t) => t + 1);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 flex flex-col md:flex-row antialiased font-sans">
      {/* Desktop / Tablet Sidebar */}
      <Sidebar
        activeView={activeView}
        selectedPaperId={selectedPaper?.id || null}
        onNavigate={handleNavigate}
        onOpenResetModal={() => setIsResetModalOpen(true)}
        overallPercent={overall.percentage}
      />

      {/* Mobile Navigation Header & Bottom Tabs */}
      <MobileNav
        activeView={activeView}
        selectedPaperId={selectedPaper?.id || null}
        onNavigate={handleNavigate}
        onOpenResetModal={() => setIsResetModalOpen(true)}
        overallPercent={overall.percentage}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        {/* Top Header with Global Search */}
        <Header
          onSelectTopic={handleSelectTopicFromSearch}
          overallPercent={overall.percentage}
        />

        {/* Dynamic Page Views */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full pb-24 md:pb-12">
          {activeView === 'dashboard' && (
            <DashboardView
              onOpenPaper={handleOpenPaper}
              onOpenChecklist={() => handleNavigate('master_checklist')}
              onOpenProgress={() => handleNavigate('progress')}
              onOpenFlashcards={() => handleOpenFlashcards('all')}
              onStartTest={handleStartDailyGoalTest}
            />
          )}

          {activeView === 'paper' && selectedPaper && (
            <PaperView
              paper={selectedPaper}
              onBack={() => handleNavigate('dashboard')}
              onOpenChapter={handleOpenChapter}
              onOpenFlashcards={(paperId) => handleOpenFlashcards(paperId)}
            />
          )}

          {activeView === 'chapter' && selectedChapter && selectedPaper && (
            <ChapterView
              chapter={selectedChapter}
              paper={selectedPaper}
              onBackToPaper={() => {
                setSelectedChapter(null);
                setActiveView('paper');
              }}
              onStartTest={handleStartTest}
              onOpenFlashcards={(chapterId) => handleOpenFlashcards(selectedPaper.id, chapterId)}
            />
          )}

          {activeView === 'flashcards' && (
            <FlashcardsView
              initialPaperId={flashcardsPaperId}
              initialChapterId={flashcardsChapterId}
              onNavigateToPaper={(pId) => handleNavigate('paper', pId)}
              onNavigateToChapter={(cId) => {
                for (const p of DMLT_PAPERS) {
                  const ch = p.chapters.find((c) => c.id === cId);
                  if (ch) {
                    setSelectedPaper(p);
                    setSelectedChapter(ch);
                    setActiveView('chapter');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    break;
                  }
                }
              }}
            />
          )}

          {activeView === 'master_checklist' && <MasterChecklistView />}

          {activeView === 'progress' && (
            <ProgressView onOpenResetModal={() => setIsResetModalOpen(true)} />
          )}
        </main>
      </div>

      {/* 30-Question MCQ Test Engine Modal */}
      <MCQModal
        topic={testTopic}
        chapterTitle={testChapterTitle}
        paperTitle={testPaperTitle}
        isOpen={Boolean(testTopic)}
        onClose={() => setTestTopic(null)}
        onTestCompleted={() => {
          setUpdateTick((t) => t + 1);
        }}
      />

      {/* Reset Progress Confirmation Dialog */}
      <ResetConfirmModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleConfirmReset}
      />
    </div>
  );
}

export default App;
