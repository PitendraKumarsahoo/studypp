import React from 'react';
import { CheckCircle2, XCircle, PlayCircle, RotateCcw, Lock, FileText, Volume2 } from 'lucide-react';
import { Topic, TopicProgress } from '../types';
import { hasTopicNote } from '../utils/notes';
import { PronounceButton } from './PronounceButton';
import { extractMedicalTermsFromText } from '../data/medicalTerminology';

interface TopicCardProps {
  topic: Topic;
  progress: TopicProgress;
  onStartTest: (topic: Topic) => void;
  onLockedClick: (topic: Topic) => void;
  onOpenNotes?: (topic: Topic) => void;
}

export const TopicCard: React.FC<TopicCardProps> = ({
  topic,
  progress,
  onStartTest,
  onLockedClick,
  onOpenNotes
}) => {
  const isCompleted = progress.completed;
  const hasAttempted = progress.attempts > 0;
  const isFailed = hasAttempted && !isCompleted;
  const hasNote = hasTopicNote(topic.id);
  const complexTerms = extractMedicalTermsFromText(topic.title, topic.chapterId);

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

            {/* Pronunciation TTS Button for Topic Title */}
            <PronounceButton
              term={topic.title}
              size="xs"
              variant="subtle"
            />

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

          {/* Complex Technical Terms in this Topic */}
          {complexTerms.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
              {complexTerms.map((termItem) => (
                <div
                  key={termItem.id}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-50/80 border border-indigo-100/90 text-[11px] text-indigo-900"
                  title={`Medical Term: ${termItem.term} • Definition: ${termItem.definition}`}
                >
                  <span className="font-bold text-slate-900">{termItem.term}</span>
                  <span className="text-[10px] text-indigo-700 font-mono">[{termItem.phonetic}]</span>
                  <PronounceButton
                    term={termItem.term}
                    phonetic={termItem.phonetic}
                    size="xs"
                    variant="subtle"
                  />
                </div>
              ))}
            </div>
          )}

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
        {onOpenNotes && (
          <button
            type="button"
            onClick={() => onOpenNotes(topic)}
            title="Jot or view study notes for this topic"
            className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all border ${
              hasNote
                ? 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-300'
                : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            <FileText className={`w-3.5 h-3.5 ${hasNote ? 'text-amber-600' : 'text-slate-400'}`} />
            <span>{hasNote ? 'Notes ✓' : 'Notes'}</span>
          </button>
        )}

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
