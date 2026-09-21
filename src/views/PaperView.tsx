import React, { useState } from 'react';
import {
  ArrowLeft,
  Search,
  BookOpen,
  Microscope,
  FlaskConical,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { DMLTPaper, Chapter, Topic } from '../types';
import { ChapterCard } from '../components/ChapterCard';
import { calculatePaperProgress, calculateChapterProgress } from '../utils/progress';

interface PaperViewProps {
  paper: DMLTPaper;
  onBack: () => void;
  onOpenChapter: (chapter: Chapter) => void;
}

export const PaperView: React.FC<PaperViewProps> = ({
  paper,
  onBack,
  onOpenChapter
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'completed' | 'pending'>('all');

  const stats = calculatePaperProgress(paper.id);

  const getIcon = () => {
    switch (paper.id) {
      case 'pathology':
        return <BookOpen className="w-6 h-6 text-rose-600" />;
      case 'microbiology':
        return <Microscope className="w-6 h-6 text-emerald-600" />;
      case 'biochemistry':
      default:
        return <FlaskConical className="w-6 h-6 text-amber-600" />;
    }
  };

  // Filter chapters based on search and completion status
  const filteredChapters = paper.chapters.filter((chapter: Chapter) => {
    const matchesSearch =
      chapter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chapter.topics.some((t: Topic) => t.title.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    const chapterProg = calculateChapterProgress(paper.id, chapter.id);

    if (filterMode === 'completed') {
      return chapterProg.isCompleted;
    }
    if (filterMode === 'pending') {
      return !chapterProg.isCompleted;
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Back button & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Dashboard</span>
        </button>
        <span className="text-slate-300">/</span>
        <span className="text-xs font-semibold text-slate-600">{paper.title}</span>
      </div>

      {/* Paper Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
              {getIcon()}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-md">
                  {paper.subtitle}
                </span>
                <span className="text-xs text-slate-600 font-medium">
                  {paper.chapters.length} Total Chapters
                </span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                {paper.title}
              </h2>
              <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                {paper.description}
              </p>
            </div>
          </div>

          {/* Quick Paper Progress Pill */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 md:w-64 shrink-0 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-700">Paper Mastery</span>
              <span className="text-indigo-700 font-bold">{stats.percentage}%</span>
            </div>
            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${stats.percentage}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-600 pt-0.5">
              <span>Completed: <strong className="text-emerald-700">{stats.completedTopics}</strong></span>
              <span>Remaining: <strong className="text-slate-700">{stats.remainingTopics}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
        {/* Search Bar */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-600 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search chapter or topic..."
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
            All Chapters ({paper.chapters.length})
          </button>

          <button
            onClick={() => setFilterMode('pending')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              filterMode === 'pending'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            In Progress
          </button>

          <button
            onClick={() => setFilterMode('completed')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              filterMode === 'completed'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Chapter Cards Grid */}
      {filteredChapters.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredChapters.map((chapter: Chapter) => (
            <ChapterCard
              key={chapter.id}
              chapter={chapter}
              paperId={paper.id}
              onOpenChapter={onOpenChapter}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-600 space-y-2">
          <p className="text-sm font-semibold text-slate-700">No chapters found</p>
          <p className="text-xs">Try searching with different keywords or clearing your filter.</p>
        </div>
      )}
    </div>
  );
};
