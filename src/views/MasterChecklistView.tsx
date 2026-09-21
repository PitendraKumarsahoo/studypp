import React, { useState, useEffect } from 'react';
import {
  CheckSquare,
  Sparkles,
  BookOpen,
  Microscope,
  FlaskConical,
  CalendarCheck,
  CheckCircle2
} from 'lucide-react';
import { MASTER_CHECKLIST_SECTIONS, MasterSection, MasterSectionItem } from '../data/masterChecklistData';
import { getMasterChecklist, toggleMasterChecklist } from '../utils/progress';

export const MasterChecklistView: React.FC = () => {
  const [checkedState, setCheckedState] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setCheckedState(getMasterChecklist());

    const handleUpdate = () => {
      setCheckedState(getMasterChecklist());
    };

    window.addEventListener('dmlt-master-checklist-updated', handleUpdate);
    return () => window.removeEventListener('dmlt-master-checklist-updated', handleUpdate);
  }, []);

  const handleToggle = (id: string) => {
    toggleMasterChecklist(id);
    setCheckedState(getMasterChecklist());
  };

  // Calculate stats
  let totalItems = 0;
  let completedItems = 0;
  MASTER_CHECKLIST_SECTIONS.forEach((sec: MasterSection) => {
    sec.items.forEach((item: MasterSectionItem) => {
      totalItems++;
      if (checkedState[item.id]) {
        completedItems++;
      }
    });
  });

  const percentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  const getSectionIcon = (paperId?: string) => {
    switch (paperId) {
      case 'pathology':
        return <BookOpen className="w-5 h-5 text-rose-600" />;
      case 'microbiology':
        return <Microscope className="w-5 h-5 text-emerald-600" />;
      case 'biochemistry':
        return <FlaskConical className="w-5 h-5 text-amber-600" />;
      default:
        return <CalendarCheck className="w-5 h-5 text-indigo-600" />;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span>Syllabus Page 11 Final Checklist</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Master Revision Checklist
            </h2>
            <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
              Consolidated high-yield review protocols across Pathology, Microbiology, Biochemistry, and weekly revision cycles. You can tick these off as you complete your comprehensive revision notes.
            </p>
          </div>

          {/* Progress Box */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 md:w-64 shrink-0 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-700">Checklist Progress</span>
              <span className="text-indigo-700 font-bold">{percentage}%</span>
            </div>
            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-600 pt-0.5">
              <span>Checked: <strong className="text-emerald-700">{completedItems}</strong></span>
              <span>Total: <strong className="text-slate-700">{totalItems}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Checklist Sections */}
      <div className="space-y-6">
        {MASTER_CHECKLIST_SECTIONS.map((section: MasterSection) => (
          <div
            key={section.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4"
          >
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                {getSectionIcon(section.paperId)}
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {section.title}
                </h3>
                <span className="text-[11px] text-slate-600 font-medium">
                  {section.items.filter((it: MasterSectionItem) => checkedState[it.id]).length} of {section.items.length} reviewed
                </span>
              </div>
            </div>

            <div className="space-y-2.5">
              {section.items.map((item: MasterSectionItem) => {
                const isChecked = Boolean(checkedState[item.id]);

                return (
                  <label
                    key={item.id}
                    onClick={() => handleToggle(item.id)}
                    className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isChecked
                        ? 'bg-emerald-50/40 border-emerald-200 text-slate-900 shadow-2xs'
                        : 'bg-white border-slate-200 hover:border-indigo-300 hover:bg-slate-50/60'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center mt-0.5 shrink-0 transition-colors ${
                        isChecked
                          ? 'bg-emerald-600 text-white'
                          : 'border-2 border-slate-300 bg-white hover:border-indigo-400'
                      }`}
                    >
                      {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                    </div>

                    <div className="flex-1 select-none">
                      <span
                        className={`text-xs font-semibold leading-snug block ${
                          isChecked ? 'line-through text-slate-600' : 'text-slate-800'
                        }`}
                      >
                        {item.title}
                      </span>
                    </div>

                    {isChecked && (
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full shrink-0">
                        Reviewed
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
