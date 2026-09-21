import React, { useState, useEffect } from 'react';
import {
  Target,
  Flame,
  CheckCircle2,
  Trophy,
  Edit3,
  Plus,
  RotateCcw,
  ArrowRight,
  Sparkles,
  Zap,
  Check
} from 'lucide-react';
import {
  getDailyGoalStats,
  setDailyGoalTarget,
  recordMCQsForToday,
  resetTodayProgress,
  DAILY_GOAL_EVENT,
  DailyGoalData
} from '../utils/dailyGoal';

interface DailyStudyGoalCardProps {
  onStartTest?: () => void;
}

const PRESET_GOALS = [
  { count: 30, label: '30 MCQs', desc: '1 Test • Light' },
  { count: 60, label: '60 MCQs', desc: '2 Tests • Balanced' },
  { count: 90, label: '90 MCQs', desc: '3 Tests • Intensive' },
  { count: 120, label: '120 MCQs', desc: '4 Tests • Exam Sprint' }
];

export const DailyStudyGoalCard: React.FC<DailyStudyGoalCardProps> = ({ onStartTest }) => {
  const [stats, setStats] = useState<DailyGoalData>(getDailyGoalStats());
  const [isEditing, setIsEditing] = useState(false);
  const [customInput, setCustomInput] = useState<string>(String(stats.target));

  const refreshStats = () => {
    const updated = getDailyGoalStats();
    setStats(updated);
    setCustomInput(String(updated.target));
  };

  useEffect(() => {
    refreshStats();
    const handleUpdate = () => refreshStats();
    window.addEventListener(DAILY_GOAL_EVENT, handleUpdate);
    window.addEventListener('dmlt-progress-updated', handleUpdate);
    return () => {
      window.removeEventListener(DAILY_GOAL_EVENT, handleUpdate);
      window.removeEventListener('dmlt-progress-updated', handleUpdate);
    };
  }, []);

  const handleSelectPreset = (val: number) => {
    setDailyGoalTarget(val);
    setCustomInput(String(val));
    setIsEditing(false);
  };

  const handleSaveCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(customInput, 10);
    if (!isNaN(num) && num >= 5 && num <= 500) {
      setDailyGoalTarget(num);
      setIsEditing(false);
    }
  };

  const handleQuickAdd = (amount: number) => {
    recordMCQsForToday(amount, false);
  };

  const handleResetToday = () => {
    if (window.confirm("Reset today's MCQ count back to 0?")) {
      resetTodayProgress();
    }
  };

  // SVG Progress Ring calculations
  // Circle radius 58 -> circumference = 2 * PI * 58 ≈ 364.42
  const radius = 58;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = Math.min(stats.solvedToday / stats.target, 1);
  const strokeDashoffset = circumference - progressRatio * circumference;

  return (
    <div
      id="daily-study-goal-card"
      className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs relative overflow-hidden transition-all"
    >
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-2xs">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-black text-slate-900 tracking-tight">
                Daily Study Goal
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                {stats.todayDateFormatted}
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Consistent daily MCQ practice accelerates your DMLT board retention
            </p>
          </div>
        </div>

        {/* Streak & Edit Trigger */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-800 text-xs font-bold"
            title="Daily active study streak"
          >
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>{stats.streakDays} Day Streak</span>
          </div>

          <button
            type="button"
            id="btn-edit-daily-goal"
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              isEditing
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Close' : 'Adjust Goal'}</span>
          </button>
        </div>
      </div>

      {/* Goal Adjustment Drawer / Presets */}
      {isEditing && (
        <div className="my-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-indigo-600" /> Choose Daily Target:
            </span>
            <span className="text-[11px] text-slate-600">Current: {stats.target} MCQs / day</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {PRESET_GOALS.map((preset) => {
              const isSelected = stats.target === preset.count;
              return (
                <button
                  key={preset.count}
                  type="button"
                  onClick={() => handleSelectPreset(preset.count)}
                  className={`p-2.5 rounded-xl text-left border transition-all ${
                    isSelected
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-xs'
                      : 'bg-white border-slate-200 hover:border-indigo-300 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm">{preset.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </div>
                  <span
                    className={`text-[10px] block mt-0.5 ${
                      isSelected ? 'text-indigo-100' : 'text-slate-600'
                    }`}
                  >
                    {preset.desc}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Custom goal form */}
          <form onSubmit={handleSaveCustom} className="flex items-center gap-2 pt-1">
            <label htmlFor="custom-goal-input" className="text-xs font-medium text-slate-600">
              Or Custom Target:
            </label>
            <input
              id="custom-goal-input"
              type="number"
              min="5"
              max="500"
              step="5"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              className="w-24 px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
            <span className="text-xs text-slate-600">MCQs</span>
            <button
              type="submit"
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-2xs transition-colors ml-auto"
            >
              Apply
            </button>
          </form>
        </div>
      )}

      {/* Main Card Content: Progress Ring + Highlights */}
      <div className="pt-4 flex flex-col md:flex-row items-center gap-6 sm:gap-8">
        {/* SVG Progress Ring */}
        <div className="relative shrink-0 flex items-center justify-center">
          <svg className="w-36 h-36 sm:w-40 sm:h-40 transform -rotate-90">
            <defs>
              <linearGradient id="goalRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
            {/* Background Track */}
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke="#f1f5f9"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            {/* Animated Progress Ring */}
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke={stats.isAchieved ? '#10b981' : 'url(#goalRingGradient)'}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-700 ease-out"
            />
          </svg>

          {/* Inner Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2 pointer-events-none">
            {stats.isAchieved ? (
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-0.5 animate-bounce">
                <Trophy className="w-3.5 h-3.5" />
              </div>
            ) : null}
            <div className="flex items-baseline justify-center gap-0.5">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-none">
                {stats.solvedToday}
              </span>
              <span className="text-xs font-semibold text-slate-600">
                /{stats.target}
              </span>
            </div>
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider mt-0.5">
              MCQs Solved
            </span>
            <span
              className={`text-[10px] font-black px-1.5 py-0.5 rounded-full mt-1 ${
                stats.isAchieved
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-indigo-50 text-indigo-700'
              }`}
            >
              {stats.percentage}%
            </span>
          </div>
        </div>

        {/* Goal Description & Metrics */}
        <div className="flex-1 w-full space-y-3.5 text-center md:text-left">
          <div>
            {stats.isAchieved ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Today's Target Completed!</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-1">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>
                  {stats.remainingToday} MCQ{stats.remainingToday > 1 ? 's' : ''} to reach daily target
                </span>
              </div>
            )}

            <h4 className="text-lg font-black text-slate-900">
              {stats.isAchieved
                ? 'Outstanding commitment today!'
                : `Complete ${stats.remainingToday} more MCQs today`}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
              {stats.isAchieved
                ? `You have achieved your target of ${stats.target} MCQs solved for today. Every extra test completed now builds exam speed and high-yield question familiarity.`
                : `You have completed ${stats.solvedToday} out of your ${stats.target} daily question goal across ${stats.testsCompletedToday} practice tests.`}
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-2.5 max-w-md mx-auto md:mx-0 text-left">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">
                Target
              </span>
              <span className="text-sm font-black text-slate-900">{stats.target} MCQs</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">
                Tests Today
              </span>
              <span className="text-sm font-black text-slate-900">
                {stats.testsCompletedToday} completed
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">
                Remaining
              </span>
              <span className="text-sm font-black text-indigo-600">
                {stats.remainingToday} MCQs
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1">
            {onStartTest && (
              <button
                type="button"
                id="btn-daily-goal-start-test"
                onClick={onStartTest}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-colors"
              >
                <span>Take a 30-MCQ Test</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              type="button"
              id="btn-daily-goal-quick-log"
              onClick={() => handleQuickAdd(10)}
              title="Log 10 offline or flashcard questions answered"
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-slate-600" />
              <span>+10 Practice MCQs</span>
            </button>

            {stats.solvedToday > 0 && (
              <button
                type="button"
                onClick={handleResetToday}
                title="Reset today's count"
                className="p-2 rounded-xl text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
