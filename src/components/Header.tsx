import React, { useState, useRef, useEffect } from 'react';
import { Search, Sparkles, BookOpen, ChevronRight, X } from 'lucide-react';
import { DMLT_PAPERS } from '../data/dmltData';
import { Topic, Chapter, DMLTPaper } from '../types';

interface HeaderProps {
  onSelectTopic: (paper: DMLTPaper, chapter: Chapter, topic: Topic) => void;
  overallPercent: number;
}

export const Header: React.FC<HeaderProps> = ({ onSelectTopic, overallPercent }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search results on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search through all papers, chapters, and topics
  const results: { paper: DMLTPaper; chapter: Chapter; topic: Topic }[] = [];
  if (query.trim().length >= 2) {
    const q = query.toLowerCase();
    for (const paper of DMLT_PAPERS) {
      for (const chapter of paper.chapters) {
        for (const topic of chapter.topics) {
          if (
            topic.title.toLowerCase().includes(q) ||
            chapter.title.toLowerCase().includes(q)
          ) {
            results.push({ paper, chapter, topic });
            if (results.length >= 8) break;
          }
        }
        if (results.length >= 8) break;
      }
      if (results.length >= 8) break;
    }
  }

  return (
    <header className="hidden md:flex items-center justify-between px-8 py-3.5 bg-white border-b border-slate-200 sticky top-0 z-20 shadow-2xs">
      {/* Global Search Bar */}
      <div ref={searchRef} className="relative w-96">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-600 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onFocus={() => setIsOpen(true)}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            placeholder="Search all syllabus chapters & topics..."
            className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all placeholder:text-slate-600"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setIsOpen(false);
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Search Results Dropdown */}
        {isOpen && query.trim().length >= 2 && (
          <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-xl shadow-xl border border-slate-200 max-h-80 overflow-y-auto z-50 divide-y divide-slate-100">
            {results.length > 0 ? (
              results.map((res, i) => (
                <div
                  key={i}
                  onClick={() => {
                    onSelectTopic(res.paper, res.chapter, res.topic);
                    setIsOpen(false);
                    setQuery('');
                  }}
                  className="p-3 hover:bg-indigo-50/50 cursor-pointer flex items-center justify-between gap-3 text-xs transition-colors"
                >
                  <div className="flex items-start gap-2.5">
                    <BookOpen className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-900 block">
                        {res.topic.title}
                      </span>
                      <span className="text-[11px] text-slate-600">
                        {res.paper.title} • {res.chapter.title}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-xs text-slate-600">
                No matching topics found for "{query}"
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Badges */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-indigo-50/80 border border-indigo-100 px-3 py-1.5 rounded-xl">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span className="text-xs font-semibold text-slate-700">DMLT 2nd Year Master</span>
        </div>

        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs">
          <span className="text-slate-600 font-medium">Verified Mastery:</span>
          <span className="font-extrabold text-indigo-600">{overallPercent}%</span>
        </div>
      </div>
    </header>
  );
};
