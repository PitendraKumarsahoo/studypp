import React, { useState } from 'react';
import {
  Volume2,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Info,
  Play,
  Square
} from 'lucide-react';
import { Chapter } from '../types';
import { getChapterMedicalTerms, DMLT_MEDICAL_GLOSSARY, MedicalTerm } from '../data/medicalTerminology';
import { PronounceButton } from './PronounceButton';
import { speakMedicalTerm, stopSpeech } from '../utils/speech';

interface ChapterTerminologySectionProps {
  chapter: Chapter;
}

export const ChapterTerminologySection: React.FC<ChapterTerminologySectionProps> = ({ chapter }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [selectedTermId, setSelectedTermId] = useState<string | null>(null);

  // Retrieve terms mapped specifically to this chapter or relevant fallback
  let terms = getChapterMedicalTerms(chapter.id);

  if (terms.length === 0) {
    // If no direct chapter mapping, match terms whose definition or title relates to chapter
    const lowerChapterTitle = chapter.title.toLowerCase();
    terms = DMLT_MEDICAL_GLOSSARY.filter((t) => {
      const termLower = t.term.toLowerCase();
      const defLower = t.definition.toLowerCase();
      return (
        lowerChapterTitle.includes(termLower.slice(0, 5)) ||
        defLower.includes(lowerChapterTitle.slice(0, 5)) ||
        (chapter.paperId === 'pathology' && t.category === 'Immunohematology') ||
        (chapter.paperId === 'microbiology' && t.category === 'Bacteriology') ||
        (chapter.paperId === 'biochemistry' && t.category === 'Clinical Biochemistry')
      );
    }).slice(0, 6);
  }

  if (terms.length === 0) {
    // Default fallback to first 4 general terms of that subject
    terms = DMLT_MEDICAL_GLOSSARY.slice(0, 4);
  }

  return (
    <div
      id="chapter-technical-vocabulary"
      className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4 transition-all"
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
            <Volume2 className="w-4.5 h-4.5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-black text-slate-900 tracking-tight">
                Technical Medical Vocabulary & Pronunciation
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                {terms.length} Terms
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Click the audio icon next to any medical term to hear clear clinical pronunciation
            </p>
          </div>
        </div>

        {/* Toggle Expand / Collapse */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
        >
          <span>{isExpanded ? 'Minimize' : 'View Terms'}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Expanded Term Cards Grid */}
      {isExpanded && (
        <div className="space-y-3 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {terms.map((item) => {
              const isSelected = selectedTermId === item.id;
              return (
                <div
                  key={item.id}
                  id={`vocab-card-${item.id}`}
                  onClick={() => setSelectedTermId(isSelected ? null : item.id)}
                  className={`p-3.5 rounded-2xl border transition-all text-left flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-50/50 border-indigo-300 shadow-xs ring-1 ring-indigo-200'
                      : 'bg-slate-50/70 hover:bg-white border-slate-200 hover:border-indigo-200 hover:shadow-2xs'
                  }`}
                >
                  <div>
                    {/* Top Row: Term + Pronounce Button */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block mb-0.5">
                          {item.category}
                        </span>
                        <h4 className="text-sm font-extrabold text-slate-900 tracking-tight leading-snug">
                          {item.term}
                        </h4>
                      </div>

                      {/* Text to speech audio button */}
                      <PronounceButton
                        term={item.term}
                        phonetic={item.phonetic}
                        size="sm"
                        variant="default"
                      />
                    </div>

                    {/* Phonetic Pronunciation Guide */}
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-indigo-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200/80 w-fit">
                      <span className="text-[10px] uppercase font-bold text-slate-600">Phonetic:</span>
                      <span className="font-mono text-xs font-semibold tracking-wide">
                        {item.phonetic}
                      </span>
                    </div>

                    {/* Definition */}
                    <p className="text-xs text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
                      {item.definition}
                    </p>
                  </div>

                  {/* Clinical Relevance on expansion */}
                  {item.clinicalRelevance && (
                    <div className="mt-2.5 pt-2 border-t border-slate-200/60 text-[11px] text-slate-600 flex items-start gap-1.5">
                      <Info className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">
                        <strong className="text-slate-700">Board Exam Tip: </strong>
                        {item.clinicalRelevance}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-600 pt-1 px-1">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Tip: Hearing technical pronunciation helps reinforce memory retention during viva and clinical board exams.
            </span>
            <button
              type="button"
              onClick={stopSpeech}
              className="text-xs font-semibold text-slate-600 hover:text-slate-800 underline"
            >
              Stop Audio
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
