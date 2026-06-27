import React from 'react';
import { RankedCandidate } from '../types';
import { Award, CheckCircle2, ChevronRight, Star } from 'lucide-react';

interface CandidateRowProps {
  candidate: RankedCandidate;
  onSelect: (cand: RankedCandidate) => void;
  isSelected?: boolean;
}

export const CandidateRow: React.FC<CandidateRowProps> = ({
  candidate,
  onSelect,
  isSelected
}) => {
  const isWinner = candidate.rank === 1;

  return (
    <div
      onClick={() => onSelect(candidate)}
      className={`p-4 border rounded-xl transition-all cursor-pointer flex flex-col sm:grid sm:grid-cols-[48px_1fr_130px_180px_100px] items-start sm:items-center gap-4 hover:shadow-md ${
        isWinner
          ? 'border-2 border-[#4f46e5] bg-[#f5f3ff] shadow-xs'
          : isSelected
          ? 'border-[#4f46e5] bg-indigo-50/40'
          : 'border-[#e2e8f0] bg-white'
      }`}
    >
      {/* Column 1: Rank Number */}
      <div className="flex items-center gap-3 sm:block">
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 ${
            isWinner ? 'bg-[#4f46e5] text-white shadow-xs' : 'bg-[#f1f5f9] text-[#475569]'
          }`}
        >
          {candidate.rank}
        </div>
        {isWinner && (
          <span className="sm:hidden text-xs font-bold text-[#4f46e5] flex items-center gap-1">
            <Award className="w-3.5 h-3.5" /> Top Ranked Finalist
          </span>
        )}
      </div>

      {/* Column 2: Name & Trajectory Meta */}
      <div className="min-w-0 flex items-center gap-3 w-full">
        <img
          src={candidate.avatarUrl}
          alt={candidate.name}
          className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
        />
        <div className="min-w-0 flex-1">
          <div className="font-semibold text-[#0f172a] text-base truncate flex items-center gap-1.5">
            <span>{candidate.name}</span>
            {candidate.patentsCount && candidate.patentsCount > 0 ? (
              <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-medium shrink-0 flex items-center gap-0.5" title={`${candidate.patentsCount} Patents`}>
                <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" /> {candidate.patentsCount}P
              </span>
            ) : null}
          </div>
          <div className="text-[13px] text-[#64748b] mt-0.5 truncate">
            {candidate.currentCompany} • {candidate.yearsExperience} yrs exp.
          </div>
        </div>
      </div>

      {/* Column 3: Fit Score Bar */}
      <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start border-t border-slate-100 sm:border-0 pt-2 sm:pt-0">
        <div>
          <div className="text-xs font-bold text-[#0f172a] flex items-center gap-1">
            <span className="text-[#4f46e5]">{candidate.fitScore}%</span> Fit
            {candidate.fitScore >= 95 && <CheckCircle2 className="w-3 h-3 text-emerald-500 inline" />}
          </div>
          <div className="h-2 w-[70px] bg-[#e2e8f0] rounded-full overflow-hidden mt-1">
            <div
              className="h-full bg-[#4f46e5] transition-all duration-500 rounded-full"
              style={{ width: `${candidate.fitScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* Column 4: Behavioral Signal / Insight Tags */}
      <div className="flex flex-wrap gap-1 w-full sm:w-auto">
        {candidate.behavioralSignals.slice(0, 2).map((sig, idx) => (
          <span
            key={idx}
            className={`text-[11px] px-2 py-0.5 rounded font-medium border truncate max-w-[170px] ${
              sig.type === 'top_signal'
                ? 'bg-indigo-100 text-indigo-900 border-indigo-200 font-semibold'
                : 'bg-[#f1f5f9] text-[#475569] border-slate-200/80'
            }`}
          >
            {sig.label}
          </span>
        ))}
      </div>

      {/* Column 5: Action Button */}
      <div className="w-full sm:w-auto text-right flex sm:block justify-end">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(candidate);
          }}
          className={`px-4 py-2 rounded-md text-sm font-semibold transition-all flex items-center justify-center gap-1 w-full sm:w-auto cursor-pointer ${
            isWinner
              ? 'bg-[#4f46e5] hover:bg-[#4338ca] text-white shadow-xs'
              : 'bg-white hover:bg-slate-50 border border-[#e2e8f0] text-[#0f172a]'
          }`}
        >
          <span>Review</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
