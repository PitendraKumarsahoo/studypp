import React from 'react';
import { ChevronRight, CheckCircle2 } from 'lucide-react';
import { Chapter, PaperId } from '../types';
import { calculateChapterProgress } from '../utils/progress';

interface ChapterCardProps {
  chapter: Chapter;
  paperId: PaperId;
  onOpenChapter: (chapter: Chapter) => void;
}

export const ChapterCard: React.FC<ChapterCardProps> = ({
  chapter,
  paperId,
  onOpenChapter
}) => {
  const { totalTopics, completedTopics, percentage, isCompleted } = calculateChapterProgress(
    paperId,
    chapter.id
  );

  return (
    <div
      id={`chapter-card-${chapter.id}`}
      onClick={() => onOpenChapter(chapter)}
      className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-2">
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
            Chapter {chapter.chapterNumber ?? chapter.number ?? 1}
          </span>
          {isCompleted ? (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Completed
            </span>
          ) : (
            <span className="text-xs font-semibold text-slate-600">
              {completedTopics} / {totalTopics} Topics
            </span>
          )}
        </div>

        <h3 className="font-bold text-slate-900 text-base group-hover:text-indigo-600 transition-colors line-clamp-2">
          {chapter.title}
        </h3>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
        {/* Progress bar */}
        <div className="flex items-center justify-between text-xs font-medium">
          <span className="text-slate-600">Progress</span>
          <span
            className={`font-bold ${
              isCompleted ? 'text-emerald-600' : 'text-slate-800'
            }`}
          >
            {percentage}%
          </span>
        </div>

        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              isCompleted ? 'bg-emerald-500' : 'bg-indigo-600'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-slate-600 font-medium">
            {totalTopics - completedTopics} remaining
          </span>
          <div className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 group-hover:translate-x-0.5 transition-transform">
            <span>View Topics</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
};
