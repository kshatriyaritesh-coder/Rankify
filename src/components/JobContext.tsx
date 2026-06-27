import React from 'react';
import { JobDescription } from '../types';
import { Sparkles, Target, Briefcase, ChevronDown, Edit3 } from 'lucide-react';

interface JobContextProps {
  currentJob: JobDescription;
  allJobs: JobDescription[];
  onSelectJob: (job: JobDescription) => void;
  onOpenCustomize: () => void;
  isRanking: boolean;
}

export const JobContext: React.FC<JobContextProps> = ({
  currentJob,
  allJobs,
  onSelectJob,
  onOpenCustomize,
  isRanking
}) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  return (
    <div className="bg-white border-b border-[#e2e8f0] py-4 px-6 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center shrink-0 shadow-sm">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] uppercase text-[#64748b] font-semibold tracking-wider flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-[#4f46e5]" />
            {currentJob.activeIntelligenceLabel || 'Active Intelligence Search'}
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-[11px] text-[#64748b] font-medium">{currentJob.department}</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="group flex items-center gap-2 text-left text-lg md:text-xl font-bold text-[#0f172a] hover:text-[#4f46e5] transition-colors focus:outline-none"
            >
              <span className="truncate max-w-xl">{currentJob.title}</span>
              <ChevronDown className="w-5 h-5 text-[#64748b] group-hover:text-[#4f46e5] transition-transform duration-150" />
            </button>

            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-30">
                <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase">Switch Target Job Role</div>
                {allJobs.map(job => (
                  <button
                    key={job.id}
                    onClick={() => {
                      onSelectJob(job);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between hover:bg-slate-50 transition-colors ${
                      job.id === currentJob.id ? 'bg-indigo-50/60 font-semibold text-[#4f46e5]' : 'text-slate-700'
                    }`}
                  >
                    <div className="truncate pr-2">
                      <div className="font-medium">{job.title}</div>
                      <div className="text-xs text-slate-400">{job.level}</div>
                    </div>
                    {job.id === currentJob.id && <span className="w-2 h-2 rounded-full bg-[#4f46e5]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <span className="bg-[#e0e7ff] text-[#4338ca] text-xs px-3 py-0.5 rounded-full font-medium tracking-tight">
            {currentJob.level}
          </span>
        </div>

        <p className="text-xs text-slate-500 mt-1.5 line-clamp-1 max-w-3xl font-sans">
          {currentJob.description}
        </p>
      </div>

      <div className="flex items-center gap-6 self-stretch md:self-auto border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-6">
        <button
          onClick={onOpenCustomize}
          className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[#e2e8f0] bg-slate-50 hover:bg-slate-100 text-[#0f172a] text-xs font-semibold transition-all shadow-sm"
          title="Deep Job Analyzer & Custom Requirements"
        >
          <Edit3 className="w-3.5 h-3.5 text-[#4f46e5]" />
          <span>Tune Job Signals</span>
        </button>

        <div className="text-right ml-auto md:ml-0">
          <div className="text-[11px] uppercase text-[#64748b] font-semibold tracking-wider flex items-center justify-end gap-1">
            <Target className="w-3 h-3 text-[#4f46e5]" />
            <span>Search Precision</span>
          </div>
          <div className="text-xl md:text-2xl font-bold text-[#4f46e5] flex items-center justify-end gap-1.5">
            {isRanking ? (
              <span className="text-sm font-semibold text-indigo-500 animate-pulse flex items-center gap-1">
                <Sparkles className="w-4 h-4 animate-spin" /> Ranking...
              </span>
            ) : (
              <span>{currentJob.searchPrecision}%</span>
            )}
          </div>
          <div className="text-[11px] text-[#64748b] flex items-center justify-end gap-1">
            <span className="w-2 h-2 rounded-full bg-[#10b981]" />
            <span>Semantic Fit Confirmed</span>
          </div>
        </div>
      </div>
    </div>
  );
};
