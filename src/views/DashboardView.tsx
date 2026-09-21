import React from 'react';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Percent,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckSquare
} from 'lucide-react';
import { DMLT_PAPERS } from '../data/dmltData';
import { DMLTPaper, PaperId } from '../types';
import { PaperCard } from '../components/PaperCard';
import { DashboardCharts } from '../components/DashboardCharts';
import { calculatePaperProgress, calculateOverallProgress, getRecentCompletions } from '../utils/progress';

interface DashboardViewProps {
  onOpenPaper: (paper: DMLTPaper) => void;
  onOpenChecklist: () => void;
  onOpenProgress: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onOpenPaper,
  onOpenChecklist,
  onOpenProgress
}) => {
  const overall = calculateOverallProgress();
  const pathologyStats = calculatePaperProgress('pathology');
  const microStats = calculatePaperProgress('microbiology');
  const biochemStats = calculatePaperProgress('biochemistry');
  const recentTests = getRecentCompletions().slice(0, 4);

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-md">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Master DMLT 2nd Year Syllabus</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
            Learn • Practice • Pass • Complete
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Welcome to your official DMLT 2nd Year interactive syllabus checklist and MCQ practice system. Every topic requires achieving at least <strong>25/30</strong> on its diagnostic practice test to officially unlock its verified completion mark.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onOpenPaper(DMLT_PAPERS[0])}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-2"
            >
              <span>Continue Pathology</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenChecklist}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-colors flex items-center gap-2"
            >
              <CheckSquare className="w-4 h-4 text-indigo-300" />
              <span>Master Revision Checklist</span>
            </button>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 4 Essential Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Card 1: Total Topics */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider block">
              Total Topics
            </span>
            <div className="text-2xl font-black text-slate-900 mt-0.5">
              {overall.totalTopics}
            </div>
            <span className="text-[11px] text-slate-600">3 Papers • 14 Chapters</span>
          </div>
        </div>

        {/* Card 2: Completed Topics */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block">
              Completed
            </span>
            <div className="text-2xl font-black text-emerald-700 mt-0.5">
              {overall.completedTopics}
            </div>
            <span className="text-[11px] text-emerald-600 font-medium">Passed with ≥ 25/30</span>
          </div>
        </div>

        {/* Card 3: Topics Remaining */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider block">
              Remaining
            </span>
            <div className="text-2xl font-black text-slate-700 mt-0.5">
              {overall.remainingTopics}
            </div>
            <span className="text-[11px] text-slate-600">Topics pending test</span>
          </div>
        </div>

        {/* Card 4: Overall Progress */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
            <Percent className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-indigo-700 uppercase tracking-wider block">
              Syllabus Done
            </span>
            <div className="text-2xl font-black text-indigo-700 mt-0.5">
              {overall.percentage}%
            </div>
            <span className="text-[11px] text-indigo-600 font-medium">Verified by MCQ</span>
          </div>
        </div>
      </div>

      {/* 3 Paper Cards Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Papers & Subjects</h3>
            <p className="text-xs text-slate-600">Select any paper to view chapters and start practice tests</p>
          </div>
          <span className="text-xs font-semibold text-slate-600 hidden sm:inline-block">
            Target: 25 / 30 to Pass Each Topic
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {DMLT_PAPERS.map((paper) => (
            <PaperCard
              key={paper.id}
              paper={paper}
              onOpenPaper={onOpenPaper}
            />
          ))}
        </div>
      </div>

      {/* Visual Analytics Charts */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Performance Analytics</h3>
            <p className="text-xs text-slate-600">Real-time statistics updated as you complete topic tests</p>
          </div>
          <button
            onClick={onOpenProgress}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            <span>Full History</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <DashboardCharts
          paperStats={{
            pathology: {
              completed: pathologyStats.completedTopics,
              total: pathologyStats.totalTopics,
              percentage: pathologyStats.percentage
            },
            microbiology: {
              completed: microStats.completedTopics,
              total: microStats.totalTopics,
              percentage: microStats.percentage
            },
            biochemistry: {
              completed: biochemStats.completedTopics,
              total: biochemStats.totalTopics,
              percentage: biochemStats.percentage
            }
          }}
          overallStats={overall}
        />
      </div>

      {/* Recent Tests Table Preview */}
      {recentTests.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
              <h3 className="text-base font-bold text-slate-900">Recent Test Attempts</h3>
            </div>
            <button
              onClick={onOpenProgress}
              className="text-xs font-semibold text-indigo-600 hover:underline"
            >
              View All Attempts
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {recentTests.map((item, idx) => (
              <div
                key={idx}
                className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
              >
                <div>
                  <span className="font-semibold text-slate-900 block text-sm">
                    {item.topicTitle}
                  </span>
                  <span className="text-slate-600 text-[11px]">
                    {item.paperTitle} • {item.chapterTitle}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-slate-600 text-[11px]">{item.date}</span>
                  <span
                    className={`font-bold px-2.5 py-1 rounded-full text-xs flex items-center gap-1 ${
                      item.passed
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {item.passed ? '✓ Passed' : '✗ Failed'}: {item.score}/{item.total}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
