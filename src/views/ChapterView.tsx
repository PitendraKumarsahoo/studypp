import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Search,
  Filter,
  Info,
  PlayCircle,
  Layers
} from 'lucide-react';
import { Chapter, DMLTPaper, Topic } from '../types';
import { TopicCard } from '../components/TopicCard';
import { TopicUnlockModal } from '../components/TopicUnlockModal';
import { QuickNotesSection } from '../components/QuickNotesSection';
import { ChapterTerminologySection } from '../components/ChapterTerminologySection';
import {
  calculateChapterProgress,
  getTopicProgress
} from '../utils/progress';

interface ChapterViewProps {
  chapter: Chapter;
  paper: DMLTPaper;
  onBackToPaper: () => void;
  onStartTest: (topic: Topic) => void;
  onOpenFlashcards?: (chapterId: string) => void;
}

export const ChapterView: React.FC<ChapterViewProps> = ({
  chapter,
  paper,
  onBackToPaper,
  onStartTest,
  onOpenFlashcards
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'completed' | 'failed' | 'pending'>('all');
  const [unlockTargetTopic, setUnlockTargetTopic] = useState<Topic | null>(null);
  const [notesActiveTopicId, setNotesActiveTopicId] = useState<string | null>(chapter.topics[0]?.id || null);

  const stats = calculateChapterProgress(paper.id, chapter.id);

  const handleOpenNotes = (topic: Topic) => {
    setNotesActiveTopicId(topic.id);
    const el = document.getElementById('quick-notes-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Filter topics
  const filteredTopics = chapter.topics.filter((topic) => {
    const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    const prog = getTopicProgress(paper.id, chapter.id, topic.id);

    if (filterMode === 'completed') return prog.completed;
    if (filterMode === 'failed') return prog.attempts > 0 && !prog.completed;
    if (filterMode === 'pending') return !prog.completed && prog.attempts === 0;

    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-semibold">
        <button
          onClick={onBackToPaper}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to {paper.title}</span>
        </button>
        <span className="text-slate-300">/</span>
        <span className="text-slate-600">Chapter {chapter.chapterNumber ?? chapter.number ?? 1}</span>
      </div>

      {/* Chapter Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-md">
                Chapter {chapter.chapterNumber ?? chapter.number ?? 1}
              </span>
              <span className="text-xs text-slate-600 font-medium">
                {paper.title} ({paper.subtitle})
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              {chapter.title}
            </h2>
            <p className="text-xs text-slate-600">
              {chapter.topics.length} syllabus topics in this chapter. Each topic requires a 25/30 MCQ pass score.
            </p>

            {onOpenFlashcards && (
              <div className="pt-2">
                <button
                  type="button"
                  id="btn-chapter-flashcards"
                  onClick={() => onOpenFlashcards(chapter.id)}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold transition-all shadow-2xs"
                >
                  <Layers className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Practice Chapter Flashcards</span>
                </button>
              </div>
            )}
          </div>

          {/* Chapter Progress Box */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 md:w-60 shrink-0 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-700">Chapter Progress</span>
              <span
                className={`font-bold ${
                  stats.isCompleted ? 'text-emerald-600' : 'text-indigo-600'
                }`}
              >
                {stats.percentage}%
              </span>
            </div>
            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  stats.isCompleted ? 'bg-emerald-500' : 'bg-indigo-600'
                }`}
                style={{ width: `${stats.percentage}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-600 pt-0.5">
              <span>Completed: <strong className="text-emerald-700">{stats.completedTopics}</strong></span>
              <span>Total: <strong className="text-slate-700">{stats.totalTopics}</strong></span>
            </div>
          </div>
        </div>

        {/* Informational Guidance Alert */}
        <div className="p-3 bg-indigo-50/60 border border-indigo-100 rounded-xl text-xs text-indigo-900 flex items-center gap-2.5">
          <Info className="w-4 h-4 text-indigo-600 shrink-0" />
          <p className="leading-relaxed">
            <strong>Checkmark Rule:</strong> Checkmarks cannot be ticked manually. You must score <strong>25/30</strong> on the 30-MCQ test to officially unlock completion.
          </p>
        </div>
      </div>

      {/* Chapter Technical Medical Terms & Pronunciation Guide */}
      <ChapterTerminologySection chapter={chapter} />

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-600 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search topic in this chapter..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all placeholder:text-slate-600"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          <div className="flex items-center gap-1 text-xs text-slate-600 mr-1 hidden sm:flex">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </div>

          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              filterMode === 'all'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All ({chapter.topics.length})
          </button>

          <button
            onClick={() => setFilterMode('completed')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              filterMode === 'completed'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Completed ({stats.completedTopics})
          </button>

          <button
            onClick={() => setFilterMode('failed')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              filterMode === 'failed'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Retake Needed
          </button>

          <button
            onClick={() => setFilterMode('pending')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              filterMode === 'pending'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Not Attempted
          </button>
        </div>
      </div>

      {/* Topic List */}
      {filteredTopics.length > 0 ? (
        <div className="space-y-3">
          {filteredTopics.map((topic) => {
            const progress = getTopicProgress(paper.id, chapter.id, topic.id);
            return (
              <TopicCard
                key={topic.id}
                topic={topic}
                progress={progress}
                onStartTest={onStartTest}
                onLockedClick={(t) => setUnlockTargetTopic(t)}
                onOpenNotes={handleOpenNotes}
              />
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-600 space-y-2">
          <p className="text-sm font-semibold text-slate-700">No topics match your filter</p>
          <p className="text-xs">Adjust your search query or switch filter tabs to view topics.</p>
        </div>
      )}

      {/* Quick Notes Section */}
      <QuickNotesSection
        chapter={chapter}
        activeTopicId={notesActiveTopicId}
        onSelectTopic={(id) => setNotesActiveTopicId(id)}
      />

      {/* Topic Unlock Notification Modal */}
      <TopicUnlockModal
        topic={unlockTargetTopic}
        isOpen={Boolean(unlockTargetTopic)}
        onClose={() => setUnlockTargetTopic(null)}
        onStartTest={onStartTest}
      />
    </div>
  );
};
