import React from 'react';
import { ScreeningMetrics } from '../types';
import { RefreshCw, Filter, Sparkles, UserPlus, Cpu } from 'lucide-react';

interface SidebarProps {
  metrics: ScreeningMetrics;
  requiredSkills: string[];
  minFitScore: number;
  onMinFitScoreChange: (val: number) => void;
  onRefreshRanking: () => void;
  onAddCandidate: () => void;
  isRanking: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  metrics,
  requiredSkills,
  minFitScore,
  onMinFitScoreChange,
  onRefreshRanking,
  onAddCandidate,
  isRanking
}) => {
  return (
    <aside className="bg-white border border-[#e2e8f0] rounded-xl p-5 flex flex-col gap-5 w-full lg:w-[320px] shrink-0 shadow-sm overflow-y-auto max-h-full">
      <div>
        <div className="text-[11px] uppercase text-[#64748b] font-semibold tracking-wider mb-2 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-[#4f46e5]" />
            Signal Integration
          </span>
          <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">Live Telemetry</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-[#f8fafc] rounded-lg border border-[#e2e8f0]">
            <div className="text-xl font-bold text-[#0f172a]">{metrics.profilesScanned.toLocaleString()}</div>
            <div className="text-[11px] text-[#64748b] mt-0.5">Profiles Scanned</div>
          </div>
          <div className="p-3 bg-[#f8fafc] rounded-lg border border-[#e2e8f0]">
            <div className="text-xl font-bold text-[#0f172a] text-indigo-600">{metrics.behavioralHits}</div>
            <div className="text-[11px] text-[#64748b] mt-0.5">Behavioral Hits</div>
          </div>
          <div className="p-3 bg-[#f8fafc] rounded-lg border border-[#e2e8f0]">
            <div className="text-xl font-bold text-[#0f172a] text-emerald-600">{metrics.patentMatches}</div>
            <div className="text-[11px] text-[#64748b] mt-0.5">Patent Matches</div>
          </div>
          <div className="p-3 bg-[#f8fafc] rounded-lg border border-[#e2e8f0]">
            <div className="text-xl font-bold text-[#0f172a]">{metrics.techStackFit}%</div>
            <div className="text-[11px] text-[#64748b] mt-0.5">Tech Stack Fit</div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100 pt-4">
        <div className="text-[11px] uppercase text-[#64748b] font-semibold tracking-wider mb-2 flex items-center justify-between">
          <span>Targeted Expertise</span>
          <span className="text-[10px] text-indigo-500 font-medium">{requiredSkills.length} Required</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {requiredSkills.map((skill, idx) => (
            <span key={idx} className="text-[11px] bg-[#f1f5f9] text-[#475569] px-2.5 py-1 rounded-md font-medium border border-slate-200/60 shadow-2xs">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-100 pt-4">
        <div className="text-[11px] uppercase text-[#64748b] font-semibold tracking-wider mb-2 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <Filter className="w-3 h-3 text-[#4f46e5]" />
            Min Rank Precision Filter
          </span>
          <span className="text-xs font-bold text-[#4f46e5]">{minFitScore}%</span>
        </div>
        <input
          type="range"
          min="50"
          max="95"
          value={minFitScore}
          onChange={(e) => onMinFitScoreChange(Number(e.target.value))}
          className="w-full accent-[#4f46e5] h-1.5 bg-slate-200 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
          <span>Broad (50%)</span>
          <span>Elite (95%)</span>
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-slate-100 flex flex-col gap-2.5">
        <button
          onClick={onRefreshRanking}
          disabled={isRanking}
          className="w-full bg-[#4f46e5] hover:bg-[#4338ca] text-white py-2.5 px-4 rounded-lg text-sm font-semibold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isRanking ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>AI Re-ranking...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Refresh AI Shortlist</span>
            </>
          )}
        </button>

        <button
          onClick={onAddCandidate}
          className="w-full bg-white hover:bg-slate-50 border border-[#e2e8f0] text-[#0f172a] py-2 px-4 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
        >
          <UserPlus className="w-3.5 h-3.5 text-slate-500" />
          <span>Inject External Profile</span>
        </button>
      </div>
    </aside>
  );
};
