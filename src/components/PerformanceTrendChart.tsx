import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  BarChart,
  Bar,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Award,
  BookOpen,
  Microscope,
  FlaskConical,
  Filter,
  CheckCircle2,
  XCircle,
  Sparkles,
  BarChart2,
  LineChart as LineChartIcon,
  RefreshCw,
  Info
} from 'lucide-react';
import { RecentCompletion, seedSampleTestHistory, clearRecentTests } from '../utils/progress';
import { PaperId } from '../types';

interface PerformanceTrendChartProps {
  recentTests: RecentCompletion[];
  onDataChanged?: () => void;
}

type SubjectFilter = 'all' | 'pathology' | 'microbiology' | 'biochemistry';
type ChartMode = 'trend' | 'comparison';

interface TimelinePoint {
  index: number;
  attemptLabel: string;
  shortDate: string;
  fullDate: string;
  topicTitle: string;
  paperTitle: string;
  paperId: PaperId;
  score: number;
  total: number;
  accuracy: number; // 0 - 100
  passed: boolean;
  pathology?: number;
  microbiology?: number;
  biochemistry?: number;
  rollingAccuracy: number;
}

export const PerformanceTrendChart: React.FC<PerformanceTrendChartProps> = ({
  recentTests,
  onDataChanged
}) => {
  const [subjectFilter, setSubjectFilter] = useState<SubjectFilter>('all');
  const [chartMode, setChartMode] = useState<ChartMode>('trend');
  const [showBenchmark, setShowBenchmark] = useState(true);

  // Sort chronologically from earliest to latest
  const chronologicalTests = useMemo(() => {
    return [...recentTests].reverse();
  }, [recentTests]);

  // Transform into time-series data
  const timelineData = useMemo<TimelinePoint[]>(() => {
    let runningTotalScore = 0;
    let runningTotalMax = 0;

    return chronologicalTests.map((t, i) => {
      runningTotalScore += t.score;
      runningTotalMax += t.total || 30;
      const rollingAcc = runningTotalMax > 0
        ? parseFloat(((runningTotalScore / runningTotalMax) * 100).toFixed(1))
        : 0;

      const accuracy = parseFloat(((t.score / (t.total || 30)) * 100).toFixed(1));
      const dateParts = t.date.split(',');
      const shortDate = dateParts[0] || `T${i + 1}`;

      const point: TimelinePoint = {
        index: i + 1,
        attemptLabel: `#${i + 1} ${shortDate}`,
        shortDate,
        fullDate: t.date,
        topicTitle: t.topicTitle,
        paperTitle: t.paperTitle,
        paperId: t.paperId,
        score: t.score,
        total: t.total || 30,
        accuracy,
        passed: t.passed,
        rollingAccuracy: rollingAcc
      };

      if (t.paperId === 'pathology') point.pathology = accuracy;
      if (t.paperId === 'microbiology') point.microbiology = accuracy;
      if (t.paperId === 'biochemistry') point.biochemistry = accuracy;

      return point;
    });
  }, [chronologicalTests]);

  // Filtered dataset for charts
  const filteredTimeline = useMemo(() => {
    if (subjectFilter === 'all') return timelineData;
    return timelineData.filter((d) => d.paperId === subjectFilter);
  }, [timelineData, subjectFilter]);

  // Subject-specific statistics
  const stats = useMemo(() => {
    const calcSubj = (pId: PaperId) => {
      const items = chronologicalTests.filter((t) => t.paperId === pId);
      if (items.length === 0) {
        return { count: 0, avgAcc: 0, highestAcc: 0, passCount: 0, passRate: 0 };
      }
      const totalScore = items.reduce((acc, curr) => acc + curr.score, 0);
      const totalMax = items.reduce((acc, curr) => acc + (curr.total || 30), 0);
      const avgAcc = totalMax > 0 ? parseFloat(((totalScore / totalMax) * 100).toFixed(1)) : 0;
      const highestAcc = Math.max(...items.map((it) => parseFloat(((it.score / (it.total || 30)) * 100).toFixed(1))));
      const passCount = items.filter((it) => it.passed).length;
      const passRate = Math.round((passCount / items.length) * 100);
      return { count: items.length, avgAcc, highestAcc, passCount, passRate };
    };

    const overallTotalScore = chronologicalTests.reduce((acc, curr) => acc + curr.score, 0);
    const overallTotalMax = chronologicalTests.reduce((acc, curr) => acc + (curr.total || 30), 0);
    const overallAvgAcc = overallTotalMax > 0 ? parseFloat(((overallTotalScore / overallTotalMax) * 100).toFixed(1)) : 0;

    // First attempt vs latest attempt trajectory
    let trajectoryDiff = 0;
    if (timelineData.length >= 2) {
      const first = timelineData[0].accuracy;
      const last = timelineData[timelineData.length - 1].accuracy;
      trajectoryDiff = parseFloat((last - first).toFixed(1));
    }

    return {
      overallAvgAcc,
      trajectoryDiff,
      totalCount: chronologicalTests.length,
      pathology: calcSubj('pathology'),
      microbiology: calcSubj('microbiology'),
      biochemistry: calcSubj('biochemistry')
    };
  }, [chronologicalTests, timelineData]);

  // Comparison Bar Chart Data
  const comparisonData = useMemo(() => {
    return [
      {
        subject: 'Pathology',
        paper: 'Paper I',
        avgAccuracy: stats.pathology.avgAcc,
        highestAccuracy: stats.pathology.highestAcc,
        passRate: stats.pathology.passRate,
        attempts: stats.pathology.count,
        fill: '#f43f5e'
      },
      {
        subject: 'Microbiology',
        paper: 'Paper II',
        avgAccuracy: stats.microbiology.avgAcc,
        highestAccuracy: stats.microbiology.highestAcc,
        passRate: stats.microbiology.passRate,
        attempts: stats.microbiology.count,
        fill: '#10b981'
      },
      {
        subject: 'Biochemistry',
        paper: 'Paper III',
        avgAccuracy: stats.biochemistry.avgAcc,
        highestAccuracy: stats.biochemistry.highestAcc,
        passRate: stats.biochemistry.passRate,
        attempts: stats.biochemistry.count,
        fill: '#f59e0b'
      }
    ];
  }, [stats]);

  const handleSeedDemo = () => {
    seedSampleTestHistory();
    if (onDataChanged) onDataChanged();
  };

  const handleClear = () => {
    if (window.confirm('Reset recorded test attempt logs?')) {
      clearRecentTests();
      if (onDataChanged) onDataChanged();
    }
  };

  // Custom Chart Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data: TimelinePoint = payload[0].payload;
      const badgeColor =
        data.paperId === 'pathology'
          ? 'bg-rose-50 text-rose-700 border-rose-200'
          : data.paperId === 'microbiology'
          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
          : 'bg-amber-50 text-amber-700 border-amber-200';

      return (
        <div className="bg-white/95 backdrop-blur-xs p-3.5 rounded-xl border border-slate-200 shadow-lg text-xs space-y-1.5 max-w-xs z-50 pointer-events-none">
          <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-1.5">
            <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] border ${badgeColor}`}>
              {data.paperTitle}
            </span>
            <span className="text-[10px] text-slate-600 font-medium">{data.fullDate}</span>
          </div>
          <p className="font-semibold text-slate-900 line-clamp-2 leading-snug">
            {data.topicTitle}
          </p>
          <div className="flex items-center justify-between pt-1 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-600">Score:</span>
              <span className="font-black text-slate-900">{data.score} / {data.total}</span>
            </div>
            <div className="flex items-center gap-1.5 font-bold">
              <span className="text-slate-600">Accuracy:</span>
              <span className={data.passed ? 'text-emerald-600' : 'text-rose-600'}>
                {data.accuracy}%
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between text-[11px] pt-0.5">
            <span className="text-slate-600">Cumulative index:</span>
            <span className="font-semibold text-indigo-600">{data.rollingAccuracy}%</span>
          </div>
          <div className="pt-1 flex items-center justify-end">
            {data.passed ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Passed (≥83.3%)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded-full">
                <XCircle className="w-3 h-3 text-rose-600" /> Below Threshold (&lt;25/30)
              </span>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 shadow-xs space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              MCQ Accuracy & Performance Trends
            </h3>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Visualizing test-by-test accuracy progression across Pathology, Microbiology, and Biochemistry.
          </p>
        </div>

        {/* View Mode and Seed Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex p-1 bg-slate-100 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setChartMode('trend')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                chartMode === 'trend'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LineChartIcon className="w-3.5 h-3.5" />
              <span>Timeline Trend</span>
            </button>
            <button
              onClick={() => setChartMode('comparison')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                chartMode === 'comparison'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Subject Comparison</span>
            </button>
          </div>

          {timelineData.length === 0 ? (
            <button
              onClick={handleSeedDemo}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold transition-colors shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Load Benchmark Sample</span>
            </button>
          ) : (
            <button
              onClick={handleSeedDemo}
              title="Reset with fresh 10-test trajectory benchmark"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-slate-600 hover:text-slate-800 hover:bg-slate-100 text-xs font-medium transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reload Sample</span>
            </button>
          )}
        </div>
      </div>

      {/* Trajectory & Subject Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Overall Accuracy */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
              Overall Accuracy
            </span>
            {stats.trajectoryDiff !== 0 && (
              <span
                className={`inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                  stats.trajectoryDiff > 0
                    ? 'text-emerald-700 bg-emerald-100'
                    : 'text-rose-700 bg-rose-100'
                }`}
              >
                {stats.trajectoryDiff > 0 ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {stats.trajectoryDiff > 0 ? `+${stats.trajectoryDiff}%` : `${stats.trajectoryDiff}%`}
              </span>
            )}
          </div>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {stats.overallAvgAcc > 0 ? `${stats.overallAvgAcc}%` : '—'}
          </div>
          <span className="text-[11px] text-slate-600 mt-0.5 block">
            {stats.totalCount} tests recorded ({Math.round((stats.overallAvgAcc / 100) * 30)} / 30 avg)
          </span>
        </div>

        {/* Pathology Stat */}
        <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-rose-700 uppercase tracking-wider flex items-center gap-1">
              <BookOpen className="w-3 h-3" /> Pathology
            </span>
            <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded-md">
              P-I
            </span>
          </div>
          <div className="text-2xl font-black text-rose-700 mt-1">
            {stats.pathology.avgAcc > 0 ? `${stats.pathology.avgAcc}%` : '—'}
          </div>
          <span className="text-[11px] text-rose-600 mt-0.5 block">
            {stats.pathology.count > 0
              ? `${stats.pathology.count} tests • High: ${stats.pathology.highestAcc}%`
              : 'No attempts yet'}
          </span>
        </div>

        {/* Microbiology Stat */}
        <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1">
              <Microscope className="w-3 h-3" /> Microbiology
            </span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-md">
              P-II
            </span>
          </div>
          <div className="text-2xl font-black text-emerald-700 mt-1">
            {stats.microbiology.avgAcc > 0 ? `${stats.microbiology.avgAcc}%` : '—'}
          </div>
          <span className="text-[11px] text-emerald-600 mt-0.5 block">
            {stats.microbiology.count > 0
              ? `${stats.microbiology.count} tests • High: ${stats.microbiology.highestAcc}%`
              : 'No attempts yet'}
          </span>
        </div>

        {/* Biochemistry Stat */}
        <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1">
              <FlaskConical className="w-3 h-3" /> Biochemistry
            </span>
            <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded-md">
              P-III
            </span>
          </div>
          <div className="text-2xl font-black text-amber-700 mt-1">
            {stats.biochemistry.avgAcc > 0 ? `${stats.biochemistry.avgAcc}%` : '—'}
          </div>
          <span className="text-[11px] text-amber-700 mt-0.5 block">
            {stats.biochemistry.count > 0
              ? `${stats.biochemistry.count} tests • High: ${stats.biochemistry.highestAcc}%`
              : 'No attempts yet'}
          </span>
        </div>
      </div>

      {/* Main Visualizer Stage */}
      {timelineData.length > 0 ? (
        <div className="space-y-4">
          {/* Filter Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-slate-600 font-semibold flex items-center gap-1 mr-1">
                <Filter className="w-3.5 h-3.5 text-slate-600" /> Filter Subject:
              </span>
              <button
                onClick={() => setSubjectFilter('all')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  subjectFilter === 'all'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All Subjects ({timelineData.length})
              </button>
              <button
                onClick={() => setSubjectFilter('pathology')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  subjectFilter === 'pathology'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                }`}
              >
                Pathology ({stats.pathology.count})
              </button>
              <button
                onClick={() => setSubjectFilter('microbiology')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  subjectFilter === 'microbiology'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                }`}
              >
                Microbiology ({stats.microbiology.count})
              </button>
              <button
                onClick={() => setSubjectFilter('biochemistry')}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  subjectFilter === 'biochemistry'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                }`}
              >
                Biochemistry ({stats.biochemistry.count})
              </button>
            </div>

            <div className="flex items-center gap-3 text-[11px] font-medium text-slate-600">
              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showBenchmark}
                  onChange={(e) => setShowBenchmark(e.target.checked)}
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span>Pass Line (83.3%)</span>
              </label>
            </div>
          </div>

          {/* Chart Rendering Container */}
          <div className="h-72 sm:h-80 w-full pt-2">
            {chartMode === 'trend' ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={filteredTimeline}
                  margin={{ top: 12, right: 16, left: -10, bottom: 20 }}
                >
                  <defs>
                    <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.18} />
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="colorPathology" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="colorMicro" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="colorBiochem" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis
                    dataKey="shortDate"
                    tickLine={false}
                    axisLine={{ stroke: '#cbd5e1' }}
                    tick={{ fill: '#64748b', fontSize: 11 }}
                    dy={10}
                  />
                  <YAxis
                    domain={[40, 100]}
                    ticks={[40, 50, 60, 70, 80, 90, 100]}
                    tickLine={false}
                    axisLine={{ stroke: '#cbd5e1' }}
                    tick={{ fill: '#64748b', fontSize: 11 }}
                    unit="%"
                  />
                  <Tooltip content={<CustomTooltip />} />

                  {/* Benchmark 83.3% passing line */}
                  {showBenchmark && (
                    <ReferenceLine
                      y={83.3}
                      stroke="#10b981"
                      strokeDasharray="4 4"
                      strokeWidth={1.5}
                      label={{
                        value: 'Passing Benchmark 83.3% (25/30)',
                        position: 'insideTopRight',
                        fill: '#059669',
                        fontSize: 10,
                        fontWeight: 600
                      }}
                    />
                  )}

                  {/* Subject Lines or Overall Area */}
                  {subjectFilter === 'all' && (
                    <>
                      <Area
                        type="monotone"
                        dataKey="rollingAccuracy"
                        stroke="#6366f1"
                        strokeWidth={2}
                        strokeDasharray="4 3"
                        fill="none"
                        name="Rolling Trend"
                      />
                      <Line
                        type="monotone"
                        dataKey="accuracy"
                        stroke="#4f46e5"
                        strokeWidth={2.5}
                        dot={{ r: 4, fill: '#4f46e5', strokeWidth: 1.5, stroke: '#ffffff' }}
                        activeDot={{ r: 6, fill: '#312e81' }}
                        name="Test Score %"
                      />
                    </>
                  )}

                  {subjectFilter === 'pathology' && (
                    <Area
                      type="monotone"
                      dataKey="accuracy"
                      stroke="#e11d48"
                      strokeWidth={2.5}
                      fill="url(#colorPathology)"
                      dot={{ r: 4, fill: '#e11d48', strokeWidth: 1.5, stroke: '#ffffff' }}
                      activeDot={{ r: 6, fill: '#881337' }}
                      name="Pathology %"
                    />
                  )}

                  {subjectFilter === 'microbiology' && (
                    <Area
                      type="monotone"
                      dataKey="accuracy"
                      stroke="#059669"
                      strokeWidth={2.5}
                      fill="url(#colorMicro)"
                      dot={{ r: 4, fill: '#059669', strokeWidth: 1.5, stroke: '#ffffff' }}
                      activeDot={{ r: 6, fill: '#064e3b' }}
                      name="Microbiology %"
                    />
                  )}

                  {subjectFilter === 'biochemistry' && (
                    <Area
                      type="monotone"
                      dataKey="accuracy"
                      stroke="#d97706"
                      strokeWidth={2.5}
                      fill="url(#colorBiochem)"
                      dot={{ r: 4, fill: '#d97706', strokeWidth: 1.5, stroke: '#ffffff' }}
                      activeDot={{ r: 6, fill: '#78350f' }}
                      name="Biochemistry %"
                    />
                  )}
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={comparisonData}
                  margin={{ top: 12, right: 16, left: -10, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis
                    dataKey="subject"
                    tickLine={false}
                    axisLine={{ stroke: '#cbd5e1' }}
                    tick={{ fill: '#475569', fontSize: 12, fontWeight: 600 }}
                    dy={10}
                  />
                  <YAxis
                    domain={[0, 100]}
                    ticks={[0, 20, 40, 60, 80, 100]}
                    tickLine={false}
                    axisLine={{ stroke: '#cbd5e1' }}
                    tick={{ fill: '#64748b', fontSize: 11 }}
                    unit="%"
                  />
                  <Tooltip
                    formatter={(value: any, name: any) => [`${value}%`, name === 'avgAccuracy' ? 'Average Accuracy' : 'Highest Accuracy']}
                    labelFormatter={(label) => `${label} Performance`}
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '12px',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      fontSize: '12px'
                    }}
                  />
                  {showBenchmark && (
                    <ReferenceLine
                      y={83.3}
                      stroke="#10b981"
                      strokeDasharray="4 4"
                      strokeWidth={1.5}
                      label={{
                        value: 'Passing 83.3%',
                        position: 'insideTopRight',
                        fill: '#059669',
                        fontSize: 10,
                        fontWeight: 600
                      }}
                    />
                  )}
                  <Bar dataKey="avgAccuracy" name="Average Accuracy" radius={[8, 8, 0, 0]}>
                    {comparisonData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                  <Bar
                    dataKey="highestAccuracy"
                    name="Peak Accuracy"
                    fill="#94a3b8"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Legend Guide & Insights */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-600">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500" />
                <span className="font-medium text-slate-700">Pathology</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="font-medium text-slate-700">Microbiology</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="font-medium text-slate-700">Biochemistry</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-0.5 border-t-2 border-dashed border-emerald-500" />
                <span className="font-medium text-emerald-700">Passing Bar (83.3%)</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-600 flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-slate-600" />
              <span>Click or hover on data points for test details</span>
            </div>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="py-12 px-6 text-center bg-slate-50/60 rounded-2xl border border-dashed border-slate-200 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">
            No Test Trend History Available Yet
          </h4>
          <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
            Take topic MCQ tests to automatically graph your chronological accuracy and identify subject strengths between Pathology, Microbiology, and Biochemistry.
          </p>
          <div className="pt-2">
            <button
              onClick={handleSeedDemo}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Load 10-Test Diagnostic Demo</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
