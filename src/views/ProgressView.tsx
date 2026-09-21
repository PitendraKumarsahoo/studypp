import React from 'react';
import {
  CheckCircle2,
  XCircle,
  TrendingUp,
  Award,
  Clock,
  BookOpen,
  Microscope,
  FlaskConical,
  RotateCcw,
  ShieldCheck
} from 'lucide-react';
import { calculateOverallProgress, calculatePaperProgress, getRecentCompletions } from '../utils/progress';

interface ProgressViewProps {
  onOpenResetModal: () => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({ onOpenResetModal }) => {
  const overall = calculateOverallProgress();
  const pathologyStats = calculatePaperProgress('pathology');
  const microStats = calculatePaperProgress('microbiology');
  const biochemStats = calculatePaperProgress('biochemistry');
  const recentTests = getRecentCompletions();

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Study Progress & Attempt History
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Comprehensive analytics, subject completion ratios, and diagnostic test records.
            </p>
          </div>

          <button
            onClick={onOpenResetModal}
            className="self-start sm:self-center px-4 py-2 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset My Progress</span>
          </button>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider block">
            Total Syllabus
          </span>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {overall.completedTopics} <span className="text-sm font-semibold text-slate-600">/ {overall.totalTopics}</span>
          </div>
          <span className="text-[11px] text-slate-600 mt-1 block">
            {overall.percentage}% completed
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider block">
            Average Score
          </span>
          <div className="text-2xl font-black text-indigo-700 mt-1 flex items-baseline gap-1">
            {overall.avgScore > 0 ? overall.avgScore : '0.0'}
            <span className="text-sm font-semibold text-slate-600">/ 30</span>
          </div>
          <span className="text-[11px] text-indigo-600 font-medium mt-1 block">
            {overall.avgScore > 0 ? `${Math.round((overall.avgScore / 30) * 100)}% passing index` : 'No attempts recorded'}
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider block">
            Tests Passed
          </span>
          <div className="text-2xl font-black text-emerald-700 mt-1">
            {overall.passedTests}
          </div>
          <span className="text-[11px] text-emerald-600 font-medium mt-1 block">
            Scored ≥ 25/30 on topic
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-rose-700 uppercase tracking-wider block">
            Tests Retaken / Failed
          </span>
          <div className="text-2xl font-black text-rose-700 mt-1">
            {overall.failedTests}
          </div>
          <span className="text-[11px] text-rose-600 font-medium mt-1 block">
            Scored &lt; 25/30
          </span>
        </div>
      </div>

      {/* Subject-wise Breakdown Cards */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-slate-900">Paper-wise Breakdown</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Pathology Card */}
          <div className="bg-white p-5 rounded-2xl border border-rose-100 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded-sm">
                  Paper I
                </span>
                <h4 className="font-bold text-slate-900 text-sm mt-0.5">Pathology</h4>
              </div>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-rose-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${pathologyStats.percentage}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span>Completed: <strong className="text-slate-900">{pathologyStats.completedTopics}/{pathologyStats.totalTopics}</strong></span>
              <span className="font-bold text-rose-600">{pathologyStats.percentage}%</span>
            </div>
          </div>

          {/* Microbiology Card */}
          <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                <Microscope className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm">
                  Paper II
                </span>
                <h4 className="font-bold text-slate-900 text-sm mt-0.5">Microbiology</h4>
              </div>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${microStats.percentage}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span>Completed: <strong className="text-slate-900">{microStats.completedTopics}/{microStats.totalTopics}</strong></span>
              <span className="font-bold text-emerald-600">{microStats.percentage}%</span>
            </div>
          </div>

          {/* Biochemistry Card */}
          <div className="bg-white p-5 rounded-2xl border border-amber-100 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center">
                <FlaskConical className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded-sm">
                  Paper III
                </span>
                <h4 className="font-bold text-slate-900 text-sm mt-0.5">Biochemistry</h4>
              </div>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-amber-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${biochemStats.percentage}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span>Completed: <strong className="text-slate-900">{biochemStats.completedTopics}/{biochemStats.totalTopics}</strong></span>
              <span className="font-bold text-amber-600">{biochemStats.percentage}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recently Completed Topics Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-bold text-slate-900">
              Test Log & Attempt Records
            </h3>
          </div>
          <span className="text-xs text-slate-600 font-medium">
            Showing last {recentTests.length} recorded attempts
          </span>
        </div>

        {recentTests.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] font-semibold border-y border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Topic Title</th>
                  <th className="py-2.5 px-3">Paper & Chapter</th>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Score</th>
                  <th className="py-2.5 px-3 text-right">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentTests.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-3 font-semibold text-slate-900">
                      {item.topicTitle}
                    </td>
                    <td className="py-3 px-3 text-slate-600">
                      {item.paperTitle} • {item.chapterTitle}
                    </td>
                    <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                      {item.date}
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-800">
                      {item.score} / {item.total}
                    </td>
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      {item.passed ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Passed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-800 bg-rose-100 px-2.5 py-0.5 rounded-full">
                          <XCircle className="w-3 h-3 text-rose-600" /> Failed
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-slate-600 bg-slate-50 rounded-xl border border-slate-100">
            <Clock className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-xs font-medium text-slate-700">No test attempts recorded yet.</p>
            <p className="text-[11px] text-slate-600 mt-0.5">
              Select any topic from Pathology, Microbiology, or Biochemistry and take its 30-MCQ test to log your first verified score.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
