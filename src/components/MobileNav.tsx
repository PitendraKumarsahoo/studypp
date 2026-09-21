import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Microscope,
  FlaskConical,
  CheckSquare,
  BarChart3,
  RotateCcw,
  Sparkles,
  Layers
} from 'lucide-react';
import { ActiveView } from './Sidebar';
import { PaperId } from '../types';

interface MobileNavProps {
  activeView: ActiveView;
  selectedPaperId: PaperId | null;
  onNavigate: (view: ActiveView, paperId?: PaperId) => void;
  onOpenResetModal: () => void;
  overallPercent: number;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  activeView,
  selectedPaperId,
  onNavigate,
  onOpenResetModal,
  overallPercent
}) => {
  return (
    <div className="md:hidden">
      {/* Top Mobile Bar */}
      <header className="sticky top-0 z-20 bg-white border-b border-slate-200 px-4 py-2.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2" onClick={() => onNavigate('dashboard')}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-white">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h1 className="font-bold text-sm text-slate-900 leading-tight">DMLT Smart Study</h1>
            <p className="text-[10px] text-slate-600 font-medium">Learn • Practice • Pass • Complete</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-right">
            <span className="text-[10px] text-slate-600 block">Mastery</span>
            <span className="text-xs font-bold text-indigo-600">{overallPercent}%</span>
          </div>
          <button
            onClick={onOpenResetModal}
            className="p-1.5 text-slate-600 hover:text-rose-600 rounded-lg hover:bg-slate-100"
            title="Reset Progress"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Quick Subject Pill Strip */}
      <div className="bg-slate-50 border-b border-slate-200 px-3 py-1.5 flex gap-1.5 overflow-x-auto text-xs no-scrollbar">
        <button
          onClick={() => onNavigate('dashboard')}
          className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition-colors ${
            activeView === 'dashboard' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200'
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => onNavigate('flashcards')}
          className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition-colors flex items-center gap-1 ${
            activeView === 'flashcards' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
          }`}
        >
          <Layers className="w-3 h-3" />
          <span>Flashcards</span>
        </button>
        <button
          onClick={() => onNavigate('paper', 'pathology')}
          className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition-colors ${
            (activeView === 'paper' || activeView === 'chapter') && selectedPaperId === 'pathology'
              ? 'bg-rose-600 text-white shadow-xs'
              : 'bg-white text-rose-700 border border-rose-200'
          }`}
        >
          Paper I: Pathology
        </button>
        <button
          onClick={() => onNavigate('paper', 'microbiology')}
          className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition-colors ${
            (activeView === 'paper' || activeView === 'chapter') && selectedPaperId === 'microbiology'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white text-emerald-700 border border-emerald-200'
          }`}
        >
          Paper II: Microbiology
        </button>
        <button
          onClick={() => onNavigate('paper', 'biochemistry')}
          className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition-colors ${
            (activeView === 'paper' || activeView === 'chapter') && selectedPaperId === 'biochemistry'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-white text-amber-700 border border-amber-200'
          }`}
        >
          Paper III: Biochemistry
        </button>
      </div>

      {/* Bottom Sticky Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-slate-200 flex justify-around py-1.5 px-2 shadow-lg">
        <button
          onClick={() => onNavigate('dashboard')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[10px] font-medium transition-colors ${
            activeView === 'dashboard' ? 'text-indigo-600 font-bold' : 'text-slate-600'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => onNavigate('flashcards')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[10px] font-medium transition-colors ${
            activeView === 'flashcards' ? 'text-indigo-600 font-bold' : 'text-slate-600'
          }`}
        >
          <Layers className="w-5 h-5" />
          <span>Cards</span>
        </button>

        <button
          onClick={() => onNavigate('master_checklist')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[10px] font-medium transition-colors ${
            activeView === 'master_checklist' ? 'text-indigo-600 font-bold' : 'text-slate-600'
          }`}
        >
          <CheckSquare className="w-5 h-5" />
          <span>Checklist</span>
        </button>

        <button
          onClick={() => onNavigate('progress')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[10px] font-medium transition-colors ${
            activeView === 'progress' ? 'text-indigo-600 font-bold' : 'text-slate-600'
          }`}
        >
          <BarChart3 className="w-5 h-5" />
          <span>Stats</span>
        </button>
      </nav>
    </div>
  );
};
