import React, { useState } from 'react';
import {
  RotateCw,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  BookOpen,
  Microscope,
  FlaskConical,
  Award,
  ArrowRight,
  ArrowLeft,
  Lightbulb,
  Check
} from 'lucide-react';
import { Flashcard, FlashcardMasteryStatus, PaperId } from '../types';

interface FlashcardCardProps {
  card: Flashcard;
  isFlipped: boolean;
  onFlip: () => void;
  reverseMode?: boolean; // If true, front shows definition, back shows term
  masteryStatus: FlashcardMasteryStatus;
  onMarkStatus: (status: FlashcardMasteryStatus) => void;
  onNext?: () => void;
  onPrev?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

const paperConfig: Record<
  PaperId,
  { name: string; badge: string; border: string; bgSoft: string; icon: typeof BookOpen }
> = {
  pathology: {
    name: 'Paper I: Pathology',
    badge: 'bg-rose-50 text-rose-700 border-rose-200',
    border: 'border-rose-200',
    bgSoft: 'bg-rose-50/50',
    icon: BookOpen,
  },
  microbiology: {
    name: 'Paper II: Microbiology',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    border: 'border-emerald-200',
    bgSoft: 'bg-emerald-50/50',
    icon: Microscope,
  },
  biochemistry: {
    name: 'Paper III: Biochemistry',
    badge: 'bg-amber-50 text-amber-800 border-amber-200',
    border: 'border-amber-200',
    bgSoft: 'bg-amber-50/50',
    icon: FlaskConical,
  },
};

export const FlashcardCard: React.FC<FlashcardCardProps> = ({
  card,
  isFlipped,
  onFlip,
  reverseMode = false,
  masteryStatus,
  onMarkStatus,
  onNext,
  onPrev,
  hasPrev = true,
  hasNext = true,
}) => {
  const [showHint, setShowHint] = useState(false);
  const cfg = paperConfig[card.paperId];
  const IconComponent = cfg.icon;

  // Front vs Back content according to reverseMode
  const frontTitle = reverseMode ? 'Definition / Principle' : 'Key Medical Term';
  const frontMain = reverseMode ? card.definition : card.term;
  const backTitle = reverseMode ? 'Key Medical Term' : 'Definition & Mechanism';
  const backMain = reverseMode ? card.term : card.definition;

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center select-none">
      {/* 3D Flip Card Container */}
      <div
        id={`flashcard-${card.id}`}
        onClick={onFlip}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            onFlip();
          }
        }}
        className="w-full min-h-[360px] sm:min-h-[380px] cursor-pointer focus:outline-hidden group"
      >
        <div
          className={`relative w-full h-full min-h-[360px] sm:min-h-[380px] bg-white rounded-3xl border-2 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between p-6 sm:p-8 ${
            isFlipped
              ? 'border-indigo-300 ring-4 ring-indigo-50/50'
              : 'border-slate-200/90 hover:border-slate-300'
          }`}
        >
          {/* Top Header Information Strip */}
          <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg border ${cfg.badge}`}
              >
                <IconComponent className="w-3.5 h-3.5" />
                <span>{cfg.name}</span>
              </span>

              <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                Ch. {card.chapterNumber}: {card.chapterTitle}
              </span>

              {card.category && (
                <span className="text-[11px] font-medium text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md hidden sm:inline-block">
                  {card.category}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              {masteryStatus === 'mastered' ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-200">
                  <Check className="w-3 h-3" />
                  <span>Mastered</span>
                </span>
              ) : (
                <span className="text-[11px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  Needs Review
                </span>
              )}

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onFlip();
                }}
                className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
                title="Toggle card (Spacebar)"
              >
                <RotateCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card Body: Front or Back */}
          <div className="flex-1 flex flex-col justify-center py-6">
            {!isFlipped ? (
              /* FRONT FACE */
              <div className="space-y-4 animate-fadeIn text-center">
                <div className="inline-flex items-center justify-center gap-1 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>{frontTitle}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug px-2">
                  {frontMain}
                </h3>

                {/* Optional Hint Button */}
                {card.highYieldFact && (
                  <div
                    className="pt-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowHint(!showHint);
                    }}
                  >
                    {!showHint ? (
                      <button
                        type="button"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50/70 hover:bg-indigo-100/70 px-3 py-1 rounded-full border border-indigo-100 transition-colors"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>Need a hint?</span>
                      </button>
                    ) : (
                      <div className="inline-block p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 text-left max-w-lg">
                        <strong className="font-semibold flex items-center gap-1 mb-1 text-amber-800">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                          Hint / Clinical Context:
                        </strong>
                        <p>{card.highYieldFact}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              /* BACK FACE (DEFINITION & EVIDENCE) */
              <div className="space-y-4 animate-fadeIn text-left">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                    {backTitle}
                  </span>
                  <span className="text-[11px] text-slate-400">Press Space to flip back</span>
                </div>

                <div className="text-base sm:text-lg font-medium text-slate-800 leading-relaxed">
                  {backMain}
                </div>

                {/* High-Yield Exam Note */}
                {card.highYieldFact && (
                  <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-1">
                    <span className="font-bold flex items-center gap-1.5 text-amber-800">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                      Exam High-Yield Point:
                    </span>
                    <p className="leading-relaxed">{card.highYieldFact}</p>
                  </div>
                )}

                {/* Diagnostic Benchmark or Formula */}
                {card.exampleOrFormula && (
                  <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl text-xs text-indigo-900 font-mono space-y-1">
                    <span className="font-bold font-sans text-indigo-800 block">
                      Diagnostic Formula / Principle:
                    </span>
                    <p className="text-slate-800">{card.exampleOrFormula}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Bottom Flip Call-To-Action */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <RotateCw className="w-3.5 h-3.5 text-indigo-500" />
              <span>{isFlipped ? 'Click card to see term' : 'Click card or press Space to reveal definition'}</span>
            </span>

            <span className="text-[11px] font-medium bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md hidden sm:inline">
              Shortcut: Space
            </span>
          </div>
        </div>
      </div>

      {/* Action Bar: Self-Assessment Buttons (Learning vs Mastered) & Prev/Next */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 px-1">
        {/* Previous Card Button */}
        <button
          type="button"
          onClick={onPrev}
          disabled={!hasPrev}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold text-xs hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous (←)</span>
        </button>

        {/* Self-Rating Recall Controls */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
          <button
            type="button"
            id="fc-btn-learning"
            onClick={() => onMarkStatus('learning')}
            className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              masteryStatus === 'learning'
                ? 'bg-amber-100 text-amber-900 border-2 border-amber-300 shadow-2xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-amber-50 hover:text-amber-800 hover:border-amber-200'
            }`}
          >
            <RotateCw className="w-3.5 h-3.5 text-amber-600" />
            <span>Still Learning (1)</span>
          </button>

          <button
            type="button"
            id="fc-btn-mastered"
            onClick={() => onMarkStatus('mastered')}
            className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              masteryStatus === 'mastered'
                ? 'bg-emerald-600 text-white border-2 border-emerald-600 shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 group-hover:text-emerald-800" />
            <span>Mastered (2)</span>
          </button>
        </div>

        {/* Next Card Button */}
        <button
          type="button"
          onClick={onNext}
          disabled={!hasNext}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs"
        >
          <span>Next (→)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
