import React from 'react';
import { Lock, ArrowRight, X } from 'lucide-react';
import { Topic } from '../types';

interface TopicUnlockModalProps {
  topic: Topic | null;
  isOpen: boolean;
  onClose: () => void;
  onStartTest: (topic: Topic) => void;
}

export const TopicUnlockModal: React.FC<TopicUnlockModalProps> = ({
  topic,
  isOpen,
  onClose,
  onStartTest
}) => {
  if (!isOpen || !topic) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-5 space-y-4 animate-scaleUp">
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-600 hover:text-slate-800 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div>
          <h3 className="text-base font-bold text-slate-900">Checkmark Locked</h3>
          <p className="text-sm font-semibold text-indigo-700 mt-1">
            "{topic.title}"
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-600 space-y-2">
          <p className="font-semibold text-slate-800">
            Complete the 30-MCQ test to unlock this checkmark.
          </p>
          <p className="text-slate-600 leading-relaxed">
            As per official DMLT curriculum regulations, a topic cannot be manually checked. You must score at least <strong>25/30</strong> on the chapter topic test to permanently verify mastery.
          </p>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-1">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl border border-slate-200"
          >
            Cancel
          </button>
          <button
            id="btn-unlock-start-mcq"
            onClick={() => {
              onClose();
              onStartTest(topic);
            }}
            className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs flex items-center gap-1.5"
          >
            <span>Start 30 MCQ Test</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
