import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { Award, CheckCircle2, XCircle, TrendingUp } from 'lucide-react';

interface DashboardChartsProps {
  paperStats: {
    pathology: { completed: number; total: number; percentage: number };
    microbiology: { completed: number; total: number; percentage: number };
    biochemistry: { completed: number; total: number; percentage: number };
  };
  overallStats: {
    totalTopics: number;
    completedTopics: number;
    remainingTopics: number;
    percentage: number;
    avgScore: number;
    totalAttempts: number;
    passedTests: number;
    failedTests: number;
  };
}

export const DashboardCharts: React.FC<DashboardChartsProps> = ({
  paperStats,
  overallStats
}) => {
  // Chart 1: Subject Progress
  const barData = [
    {
      name: 'Pathology',
      completed: paperStats.pathology.completed,
      total: paperStats.pathology.total,
      percentage: paperStats.pathology.percentage,
      fill: '#f43f5e'
    },
    {
      name: 'Microbiology',
      completed: paperStats.microbiology.completed,
      total: paperStats.microbiology.total,
      percentage: paperStats.microbiology.percentage,
      fill: '#10b981'
    },
    {
      name: 'Biochemistry',
      completed: paperStats.biochemistry.completed,
      total: paperStats.biochemistry.total,
      percentage: paperStats.biochemistry.percentage,
      fill: '#f59e0b'
    }
  ];

  // Chart 2: Overall Completion
  const pieData = [
    { name: 'Completed Topics', value: overallStats.completedTopics, color: '#10b981' },
    {
      name: 'Remaining Topics',
      value: Math.max(0, overallStats.totalTopics - overallStats.completedTopics),
      color: '#e2e8f0'
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-6">
      {/* Chart 1: Subject Progress (Bar Chart) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-slate-800 text-sm">Subject Progress</h3>
            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
              % Completion
            </span>
          </div>
          <p className="text-xs text-slate-600 mb-4">Topic completion percentage by paper</p>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: '#cbd5e1' }} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#64748b' }} unit="%" axisLine={{ stroke: '#cbd5e1' }} tickLine={false} />
              <Tooltip
                formatter={(value: any) => [`${value ?? 0}%`, 'Progress']}
                contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
              />
              <Bar dataKey="percentage" radius={[6, 6, 0, 0]}>
                {barData.map((entry, index) => (
                  <Cell key={`bar-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-center text-xs">
          <div>
            <span className="text-[11px] text-slate-600 block">Pathology</span>
            <span className="font-bold text-rose-600">{paperStats.pathology.percentage}%</span>
          </div>
          <div>
            <span className="text-[11px] text-slate-600 block">Microbiology</span>
            <span className="font-bold text-emerald-600">{paperStats.microbiology.percentage}%</span>
          </div>
          <div>
            <span className="text-[11px] text-slate-600 block">Biochemistry</span>
            <span className="font-bold text-amber-600">{paperStats.biochemistry.percentage}%</span>
          </div>
        </div>
      </div>

      {/* Chart 2: Overall Completion (Pie / Donut Chart) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-slate-800 text-sm">Overall Completion</h3>
            <span className="text-xs font-semibold text-slate-600">
              {overallStats.completedTopics} / {overallStats.totalTopics}
            </span>
          </div>
          <p className="text-xs text-slate-600 mb-2">Total syllabus completion status</p>
        </div>

        <div className="h-56 w-full relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: any) => [`${value ?? 0} topics`, 'Count']}
                contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px', color: '#64748b' }} />
            </PieChart>
          </ResponsiveContainer>
          {/* Centered % badge */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
            <span className="text-2xl font-bold text-slate-800">{overallStats.percentage}%</span>
            <span className="text-[10px] uppercase tracking-wider text-slate-600 font-semibold">Done</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-600">
          <span>Remaining: <strong className="text-slate-700">{overallStats.remainingTopics}</strong></span>
          <span>Target: <strong className="text-emerald-700">25/30 to pass</strong></span>
        </div>
      </div>

      {/* Chart 3: MCQ Performance Metric Cards */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-slate-800 text-sm">MCQ Performance</h3>
            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
              Real Attempts
            </span>
          </div>
          <p className="text-xs text-slate-600 mb-4">Passing rate and average test scores</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
            <div className="flex items-center justify-between text-slate-600 text-xs mb-1">
              <span>Tests Attempted</span>
              <TrendingUp className="w-3.5 h-3.5 text-indigo-500" />
            </div>
            <div className="text-xl font-bold text-slate-800">{overallStats.totalAttempts}</div>
            <span className="text-[10px] text-slate-600">Topic 30-MCQ sessions</span>
          </div>

          <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
            <div className="flex items-center justify-between text-emerald-700 text-xs mb-1">
              <span>Tests Passed</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <div className="text-xl font-bold text-emerald-700">{overallStats.passedTests}</div>
            <span className="text-[10px] text-emerald-600">≥ 25/30 scored</span>
          </div>

          <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl">
            <div className="flex items-center justify-between text-rose-700 text-xs mb-1">
              <span>Tests Failed</span>
              <XCircle className="w-3.5 h-3.5 text-rose-500" />
            </div>
            <div className="text-xl font-bold text-rose-700">{overallStats.failedTests}</div>
            <span className="text-[10px] text-rose-500">&lt; 25/30 (Retake needed)</span>
          </div>

          <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl">
            <div className="flex items-center justify-between text-indigo-700 text-xs mb-1">
              <span>Average Score</span>
              <Award className="w-3.5 h-3.5 text-indigo-600" />
            </div>
            <div className="text-xl font-bold text-indigo-700">
              {overallStats.avgScore > 0 ? `${overallStats.avgScore}/30` : '—'}
            </div>
            <span className="text-[10px] text-indigo-600">
              {overallStats.avgScore > 0 ? `${Math.round((overallStats.avgScore / 30) * 100)}% average` : 'No attempts yet'}
            </span>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 text-xs text-slate-600 flex items-center justify-between">
          <span>Passing Criterion:</span>
          <span className="font-semibold text-emerald-600">Minimum 25/30 (83.3%)</span>
        </div>
      </div>
    </div>
  );
};
