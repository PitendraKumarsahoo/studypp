import React from 'react';
import { CheckCircle2, XCircle, PlayCircle, RotateCcw, Lock } from 'lucide-react';
import { Topic, TopicProgress } from '../types';

interface TopicCardProps {
  topic: Topic;
  progress: TopicProgress;
  onStartTest: (topic: Topic) => void;
  onLockedClick: (topic: Topic) => void;
}

export const TopicCard: React.FC<TopicCardProps> = ({
  topic,
  progress,
  onStartTest,
  onLockedClick
}) => {
  const isCompleted = progress.completed;
  const hasAttempted = progress.attempts > 0;
  const isFailed = hasAttempted && !isCompleted;

  const handleCheckboxClick = () => {
    if (!isCompleted) {
      onLockedClick(topic);
    }
  };

  return (
    <div
      id={`topic-item-${topic.id}`}
      className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
        isCompleted
          ? 'bg-emerald-50/40 border-emerald-200/90 shadow-2xs'
          : isFailed
          ? 'bg-amber-50/40 border-amber-200 shadow-2xs'
          : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
      }`}
    >
      {/* Left side: Checkbox & Topic Info */}
      <div className="flex items-start gap-3 flex-1">
        {/* Interactive Checkbox */}
        <button
          onClick={handleCheckboxClick}
          className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center transition-transform active:scale-95 shrink-0 ${
            isCompleted
              ? 'bg-emerald-600 text-white shadow-xs cursor-default'
              : isFailed
              ? 'bg-amber-100 border-2 border-amber-400 text-amber-600 cursor-pointer hover:bg-amber-200'
              : 'border-2 border-slate-300 bg-white hover:border-indigo-400 cursor-pointer text-transparent'
          }`}
          title={
            isCompleted
              ? 'Completed via 30 MCQ test'
              : 'Locked: Complete 30-MCQ test to unlock checkmark'
          }
        >
          {isCompleted ? (
            <CheckCircle2 className="w-4 h-4 text-white" />
          ) : isFailed ? (
            <Lock className="w-3.5 h-3.5 text-amber-700" />
          ) : (
            <Lock className="w-3.5 h-3.5 text-slate-300" />
          )}
        </button>

        {/* Text Content */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4
              onClick={handleCheckboxClick}
              className={`text-sm font-semibold cursor-pointer ${
                isCompleted ? 'text-slate-900' : 'text-slate-800'
              }`}
            >
              {topic.title}
            </h4>

            {/* Status Pills */}
            {isCompleted && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Passed: {progress.bestScore}/30
              </span>
            )}

            {isFailed && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded-full">
                <XCircle className="w-3 h-3 text-rose-600" />
                Latest: {progress.latestScore}/30 (Pass: 25)
              </span>
            )}

            {!hasAttempted && (
              <span className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                Not Attempted
              </span>
            )}
          </div>

          {/* Subtext info */}
          <div className="flex items-center gap-3 text-xs text-slate-600">
            {hasAttempted && (
              <span>
                Attempts: <strong className="text-slate-700">{progress.attempts}</strong>
              </span>
            )}
            {progress.bestScore > 0 && (
              <span>
                Best Score: <strong className="text-slate-700">{progress.bestScore}/30</strong>
              </span>
            )}
            {progress.lastAttemptDate && (
              <span className="text-slate-600 truncate max-w-[180px]">
                {progress.lastAttemptDate}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Right side: Action Button */}
      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
        <button
          onClick={() => onStartTest(topic)}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs ${
            isCompleted
              ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
              : isFailed
              ? 'bg-rose-600 hover:bg-rose-700 text-white'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          {isCompleted ? (
            <>
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>Practice Again</span>
            </>
          ) : isFailed ? (
            <>
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake MCQ</span>
            </>
          ) : (
            <>
              <PlayCircle className="w-3.5 h-3.5" />
              <span>Practice 30 MCQs</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
