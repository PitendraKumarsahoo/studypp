import React from 'react';
import { ChevronRight, BookOpen, Microscope, FlaskConical, CheckCircle2 } from 'lucide-react';
import { DMLTPaper } from '../types';
import { calculatePaperProgress } from '../utils/progress';

interface PaperCardProps {
  paper: DMLTPaper;
  onOpenPaper: (paper: DMLTPaper) => void;
}

export const PaperCard: React.FC<PaperCardProps> = ({ paper, onOpenPaper }) => {
  const stats = calculatePaperProgress(paper.id);

  const getTheme = () => {
    switch (paper.id) {
      case 'pathology':
        return {
          icon: <BookOpen className="w-5 h-5 text-rose-600" />,
          badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
          barColor: 'bg-rose-500',
          btnHover: 'hover:bg-rose-600 hover:text-white',
          hoverBorder: 'hover:border-rose-300'
        };
      case 'microbiology':
        return {
          icon: <Microscope className="w-5 h-5 text-emerald-600" />,
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          barColor: 'bg-emerald-500',
          btnHover: 'hover:bg-emerald-600 hover:text-white',
          hoverBorder: 'hover:border-emerald-300'
        };
      case 'biochemistry':
      default:
        return {
          icon: <FlaskConical className="w-5 h-5 text-amber-600" />,
          badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
          barColor: 'bg-amber-500',
          btnHover: 'hover:bg-amber-600 hover:text-white',
          hoverBorder: 'hover:border-amber-300'
        };
    }
  };

  const theme = getTheme();
  const isAllDone = stats.percentage === 100 && stats.totalTopics > 0;

  return (
    <div
      id={`paper-card-${paper.id}`}
      className={`bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between transition-all ${theme.hoverBorder} hover:shadow-md`}
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
              {theme.icon}
            </div>
            <div>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm border ${theme.badgeBg}`}>
                {paper.subtitle}
              </span>
              <h3 className="font-bold text-slate-900 text-base mt-0.5">
                {paper.title}
              </h3>
            </div>
          </div>

          {isAllDone && (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              100% Done
            </span>
          )}
        </div>

        {/* Paper Description */}
        <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
          {paper.description}
        </p>

        {/* Key Stats Grid */}
        <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 text-center mb-4">
          <div>
            <span className="text-[11px] text-slate-600 block">Chapters</span>
            <span className="font-bold text-slate-800 text-sm">{stats.totalChapters}</span>
          </div>
          <div>
            <span className="text-[11px] text-slate-600 block">Completed</span>
            <span className="font-bold text-emerald-600 text-sm">{stats.completedTopics}</span>
          </div>
          <div>
            <span className="text-[11px] text-slate-600 block">Remaining</span>
            <span className="font-bold text-slate-700 text-sm">{stats.remainingTopics}</span>
          </div>
        </div>
      </div>

      {/* Progress bar and button */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        <div>
          <div className="flex items-center justify-between text-xs font-medium mb-1.5">
            <span className="text-slate-600">Completion</span>
            <span className="font-bold text-slate-900">{stats.percentage}%</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${theme.barColor}`}
              style={{ width: `${stats.percentage}%` }}
            />
          </div>
        </div>

        <button
          onClick={() => onOpenPaper(paper)}
          className={`w-full py-2.5 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 text-xs font-bold flex items-center justify-center gap-2 transition-all ${theme.btnHover} shadow-2xs`}
        >
          <span>Open Paper & Chapters</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
