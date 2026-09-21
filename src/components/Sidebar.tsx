import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Microscope,
  FlaskConical,
  CheckSquare,
  BarChart3,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { PaperId } from '../types';

export type ActiveView = 'dashboard' | 'paper' | 'chapter' | 'master_checklist' | 'progress';

interface SidebarProps {
  activeView: ActiveView;
  selectedPaperId: PaperId | null;
  onNavigate: (view: ActiveView, paperId?: PaperId) => void;
  onOpenResetModal: () => void;
  overallPercent: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  selectedPaperId,
  onNavigate,
  onOpenResetModal,
  overallPercent
}) => {
  return (
    <aside
      id="dmlt-sidebar"
      className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col h-screen sticky top-0 z-30 shadow-xs select-none"
    >
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-100 flex flex-col gap-1">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-slate-800 tracking-tight leading-tight">
              DMLT Smart Study
            </h1>
            <span className="text-[11px] font-medium text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded-sm border border-indigo-100">
              2nd Year Master
            </span>
          </div>
        </div>
        <p className="text-xs text-slate-600 mt-2 font-medium">
          Learn • Practice • Pass • Complete
        </p>
      </div>

      {/* Progress pill in sidebar */}
      <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-100">
        <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
          <span className="text-slate-600">Syllabus Mastery</span>
          <span className="text-indigo-700 font-bold">{overallPercent}%</span>
        </div>
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-indigo-600 h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${Math.min(100, Math.max(0, overallPercent))}%` }}
          />
        </div>
      </div>

      {/* Nav List */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <div className="px-3 pt-2 pb-1 text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
          Main Menu
        </div>

        <button
          id="nav-dashboard"
          onClick={() => onNavigate('dashboard')}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            activeView === 'dashboard'
              ? 'bg-indigo-50 text-indigo-700 font-semibold'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <LayoutDashboard className={`w-4 h-4 ${activeView === 'dashboard' ? 'text-indigo-600' : 'text-slate-600'}`} />
          <span>Dashboard</span>
        </button>

        <div className="px-3 pt-4 pb-1 text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
          Syllabus Papers
        </div>

        <button
          id="nav-pathology"
          onClick={() => onNavigate('paper', 'pathology')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            (activeView === 'paper' || activeView === 'chapter') && selectedPaperId === 'pathology'
              ? 'bg-rose-50 text-rose-700 font-semibold'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <div className="flex items-center gap-3">
            <BookOpen className="w-4 h-4 text-rose-500" />
            <span>Pathology</span>
          </div>
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-rose-100 text-rose-700">
            Paper I
          </span>
        </button>

        <button
          id="nav-microbiology"
          onClick={() => onNavigate('paper', 'microbiology')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            (activeView === 'paper' || activeView === 'chapter') && selectedPaperId === 'microbiology'
              ? 'bg-emerald-50 text-emerald-700 font-semibold'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <div className="flex items-center gap-3">
            <Microscope className="w-4 h-4 text-emerald-600" />
            <span>Microbiology</span>
          </div>
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-700">
            Paper II
          </span>
        </button>

        <button
          id="nav-biochemistry"
          onClick={() => onNavigate('paper', 'biochemistry')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            (activeView === 'paper' || activeView === 'chapter') && selectedPaperId === 'biochemistry'
              ? 'bg-amber-50 text-amber-700 font-semibold'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <div className="flex items-center gap-3">
            <FlaskConical className="w-4 h-4 text-amber-600" />
            <span>Biochemistry</span>
          </div>
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-800">
            Paper III
          </span>
        </button>

        <div className="px-3 pt-4 pb-1 text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
          Review & Reports
        </div>

        <button
          id="nav-master-checklist"
          onClick={() => onNavigate('master_checklist')}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            activeView === 'master_checklist'
              ? 'bg-indigo-50 text-indigo-700 font-semibold'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <CheckSquare className="w-4 h-4 text-indigo-500" />
          <span>Master Checklist</span>
        </button>

        <button
          id="nav-progress"
          onClick={() => onNavigate('progress')}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            activeView === 'progress'
              ? 'bg-indigo-50 text-indigo-700 font-semibold'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-indigo-500" />
          <span>Progress & History</span>
        </button>
      </nav>

      {/* Footer / Reset Progress Button */}
      <div className="p-4 border-t border-slate-200">
        <button
          id="sidebar-reset-progress"
          onClick={onOpenResetModal}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs text-slate-600 hover:text-rose-700 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 rounded-lg transition-colors font-medium"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset My Progress</span>
        </button>
      </div>
    </aside>
  );
};
