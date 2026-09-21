import React, { useState, useEffect } from 'react';
import {
  FileText,
  Save,
  Trash2,
  Copy,
  Check,
  Sparkles,
  BookOpen,
  HelpCircle,
  Eye,
  ChevronDown
} from 'lucide-react';
import { Chapter, Topic } from '../types';
import { getTopicNote, saveTopicNote, deleteTopicNote, getAllTopicNotes } from '../utils/notes';
import { PronounceButton } from './PronounceButton';

interface QuickNotesSectionProps {
  chapter: Chapter;
  activeTopicId: string | null;
  onSelectTopic: (topicId: string) => void;
}

export const QuickNotesSection: React.FC<QuickNotesSectionProps> = ({
  chapter,
  activeTopicId,
  onSelectTopic
}) => {
  // Current active note topic (defaults to the active topic, or first topic in chapter, or chapter general)
  const currentTopicId = activeTopicId || chapter.topics[0]?.id || `chapter_${chapter.id}`;
  const currentTopic = chapter.topics.find((t) => t.id === currentTopicId);

  const [noteContent, setNoteContent] = useState<string>('');
  const [isSaved, setIsSaved] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [showAllNotesModal, setShowAllNotesModal] = useState<boolean>(false);
  const [notesRegistry, setNotesRegistry] = useState<Record<string, { content: string; updatedAt: string }>>({});

  // Load note content when topic changes
  useEffect(() => {
    const existing = getTopicNote(currentTopicId);
    setNoteContent(existing);
    setIsSaved(true);
    setNotesRegistry(getAllTopicNotes());
  }, [currentTopicId]);

  // Listen for storage events or updates
  useEffect(() => {
    const handleUpdate = () => {
      setNotesRegistry(getAllTopicNotes());
    };
    window.addEventListener('dmlt-notes-updated', handleUpdate);
    return () => window.removeEventListener('dmlt-notes-updated', handleUpdate);
  }, []);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setNoteContent(val);
    setIsSaved(false);

    // Auto-save to localStorage
    saveTopicNote(currentTopicId, val);
    setTimeout(() => {
      setIsSaved(true);
    }, 400);
  };

  const handleInsertTemplate = (templateText: string) => {
    const updated = noteContent ? `${noteContent}\n${templateText}` : templateText;
    setNoteContent(updated);
    saveTopicNote(currentTopicId, updated);
    setIsSaved(true);
  };

  const handleCopyNote = async () => {
    if (!noteContent) return;
    try {
      await navigator.clipboard.writeText(noteContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy note', err);
    }
  };

  const handleClearNote = () => {
    if (!noteContent.trim()) return;
    if (window.confirm('Are you sure you want to clear your note for this topic?')) {
      setNoteContent('');
      deleteTopicNote(currentTopicId);
      setIsSaved(true);
    }
  };

  // Count how many topics in this chapter have notes
  const topicsWithNotesCount = chapter.topics.filter(
    (t) => notesRegistry[t.id]?.content?.trim().length > 0
  ).length;

  return (
    <div id="quick-notes-section" className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shrink-0">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900">
                Quick Study Notes & Mnemonics
              </h3>
              <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.2 rounded-full">
                {topicsWithNotesCount} / {chapter.topics.length} topics noted
              </span>
            </div>
            <p className="text-xs text-slate-600">
              Save key definitions, normal values, or memory tricks for each topic. Saved in your browser.
            </p>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2">
          {topicsWithNotesCount > 0 && (
            <button
              onClick={() => setShowAllNotesModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-slate-500" />
              <span>Review Chapter Notes ({topicsWithNotesCount})</span>
            </button>
          )}

          <div className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
            <Check className="w-3 h-3 text-emerald-600" />
            <span>{isSaved ? 'Auto-saved locally' : 'Saving...'}</span>
          </div>
        </div>
      </div>

      {/* Topic Switcher Bar */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-700 block">
          Select Topic to View or Jot Notes:
        </label>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="relative flex-1">
            <select
              value={currentTopicId}
              onChange={(e) => onSelectTopic(e.target.value)}
              className="w-full pl-3 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 cursor-pointer appearance-none"
            >
              {chapter.topics.map((t) => {
                const hasNote = Boolean(notesRegistry[t.id]?.content?.trim());
                return (
                  <option key={t.id} value={t.id}>
                    {hasNote ? '📝 ' : '📄 '} {t.title}
                  </option>
                );
              })}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {currentTopic && (
            <PronounceButton
              term={currentTopic.title}
              size="sm"
              showLabel
              label="Pronounce Topic"
              variant="pill"
            />
          )}
        </div>
      </div>

      {/* Quick Template Chips for Fast Input */}
      <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
        <span className="text-[11px] font-medium text-slate-600 mr-1 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-500" />
          Quick inserts:
        </span>
        <button
          type="button"
          onClick={() => handleInsertTemplate('• Definition: ')}
          className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md text-[11px] font-medium border border-slate-200 transition-colors"
        >
          + Definition
        </button>
        <button
          type="button"
          onClick={() => handleInsertTemplate('• Normal Range: ')}
          className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md text-[11px] font-medium border border-slate-200 transition-colors"
        >
          + Normal Range
        </button>
        <button
          type="button"
          onClick={() => handleInsertTemplate('• Mnemonic Trick: ')}
          className="px-2 py-0.5 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-md text-[11px] font-medium border border-amber-200 transition-colors"
        >
          + Mnemonic
        </button>
        <button
          type="button"
          onClick={() => handleInsertTemplate('• High-Yield Viva Point: ')}
          className="px-2 py-0.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 rounded-md text-[11px] font-medium border border-indigo-200 transition-colors"
        >
          + Viva Point
        </button>
        <button
          type="button"
          onClick={() => handleInsertTemplate('• Anticoagulant / Tube / Reagent: ')}
          className="px-2 py-0.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-md text-[11px] font-medium border border-emerald-200 transition-colors"
        >
          + Reagent / Tube
        </button>
      </div>

      {/* Note Textarea */}
      <div className="relative">
        <textarea
          rows={5}
          value={noteContent}
          onChange={handleTextChange}
          placeholder={`Jot down memory mnemonics, normal ranges, or key test steps for "${currentTopic?.title || 'this topic'}"... e.g.:\n• EDTA (Purple) = CBC & Blood Film\n• Normal Fasting Glucose = 70–100 mg/dL`}
          className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-mono text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400 transition-all placeholder:text-slate-600 resize-y leading-relaxed"
        />
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
        <div className="flex items-center gap-3">
          <span>
            {noteContent.length} characters • {noteContent.trim() ? noteContent.trim().split(/\s+/).length : 0} words
          </span>
          {notesRegistry[currentTopicId]?.updatedAt && (
            <span className="text-[11px] text-slate-600 hidden sm:inline">
              Updated: {notesRegistry[currentTopicId].updatedAt}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {noteContent.trim() && (
            <>
              <button
                type="button"
                onClick={handleCopyNote}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleClearNote}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors border border-rose-200"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Review All Chapter Notes Modal */}
      {showAllNotesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                <div>
                  <h4 className="font-bold text-slate-900 text-base">
                    All Quick Notes — {chapter.title}
                  </h4>
                  <p className="text-xs text-slate-600">
                    Compiled revision sheet from your local study notes
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAllNotesModal(false)}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {chapter.topics.map((t, idx) => {
                const note = notesRegistry[t.id]?.content?.trim();
                if (!note) return null;

                return (
                  <div key={t.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">
                        {idx + 1}. {t.title}
                      </span>
                      {notesRegistry[t.id]?.updatedAt && (
                        <span className="text-[10px] text-slate-600">
                          {notesRegistry[t.id].updatedAt}
                        </span>
                      )}
                    </div>
                    <pre className="text-xs font-sans text-slate-700 whitespace-pre-wrap leading-relaxed bg-white p-3 rounded-lg border border-slate-200">
                      {note}
                    </pre>
                  </div>
                );
              })}

              {topicsWithNotesCount === 0 && (
                <div className="p-8 text-center text-slate-600 text-xs">
                  No notes saved for this chapter yet. Jot down notes above to create your personal revision sheet!
                </div>
              )}
            </div>

            <div className="border-t border-slate-100 pt-3 flex justify-between items-center">
              <span className="text-xs text-slate-600">
                Total {topicsWithNotesCount} topics with saved study notes
              </span>
              <button
                onClick={() => setShowAllNotesModal(false)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors"
              >
                Close Summary
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
