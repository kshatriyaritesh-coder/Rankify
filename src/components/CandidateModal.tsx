import React from 'react';
import { RankedCandidate } from '../types';
import { X, Award, GitBranch, Lightbulb, CheckCircle, ExternalLink, ShieldCheck, TrendingUp, Sparkles } from 'lucide-react';

interface CandidateModalProps {
  candidate: RankedCandidate | null;
  onClose: () => void;
}

export const CandidateModal: React.FC<CandidateModalProps> = ({ candidate, onClose }) => {
  if (!candidate) return null;

  const getRecBadgeColor = (rec: string) => {
    switch (rec) {
      case 'Immediate Finalist': return 'bg-emerald-100 text-emerald-800 border-emerald-300 ring-4 ring-emerald-500/10';
      case 'Strong Contender': return 'bg-indigo-100 text-indigo-800 border-indigo-300';
      case 'Potential Fit': return 'bg-amber-100 text-amber-800 border-amber-300';
      default: return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white border border-[#e2e8f0] rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="bg-[#0f172a] text-white p-6 flex justify-between items-start shrink-0 relative">
          <div className="flex gap-4 items-center">
            <img
              src={candidate.avatarUrl}
              alt={candidate.name}
              className="w-16 h-16 rounded-xl object-cover border-2 border-[#4f46e5] shadow-lg"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold tracking-tight text-white">{candidate.name}</h2>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${getRecBadgeColor(candidate.aiRecommendation)}`}>
                  {candidate.aiRecommendation}
                </span>
              </div>
              <p className="text-slate-300 text-sm mt-0.5 font-medium">
                {candidate.currentTitle} at <span className="text-white underline decoration-[#4f46e5] decoration-2 underline-offset-4">{candidate.currentCompany}</span>
              </p>
              <div className="flex items-center gap-3 text-xs text-slate-400 mt-2">
                <span>📍 {candidate.location}</span>
                <span>🎓 {candidate.education}</span>
                <span>⏱️ {candidate.yearsExperience} Years Total Exp.</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-[#f8fafc]">
          {/* AI Semantic Rationale Card */}
          <div className="bg-indigo-50/70 border border-indigo-200/80 rounded-xl p-4 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold text-[#4f46e5] uppercase tracking-wider mb-1.5">
              <Sparkles className="w-4 h-4 text-[#4f46e5]" />
              <span>ApexRank Deep Semantic Fit Analysis • {candidate.fitScore}% Match</span>
            </div>
            <p className="text-slate-800 text-sm leading-relaxed font-sans">
              {candidate.semanticRationale}
            </p>
          </div>

          {/* Behavioral & Activity Signals */}
          <div>
            <h3 className="text-[11px] uppercase text-[#64748b] font-semibold tracking-wider mb-3 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-[#4f46e5]" />
              Crucial Activity & Behavioral Signals ({candidate.behavioralSignals.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {candidate.behavioralSignals.map((sig, idx) => (
                <div key={idx} className="bg-white p-3.5 rounded-xl border border-[#e2e8f0] shadow-2xs flex gap-3 items-start">
                  <div className="p-2 bg-[#f1f5f9] rounded-lg text-[#4f46e5] shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm text-[#0f172a]">{sig.label}</span>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                        +{sig.scoreBonus} Signal Weight
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{sig.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Standout Achievements & Match Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-xl border border-[#e2e8f0]">
              <h3 className="text-[11px] uppercase text-[#64748b] font-semibold tracking-wider mb-3 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                Verified Standout Highlights
              </h3>
              <ul className="space-y-2.5">
                {candidate.matchHighlights.map((hl, i) => (
                  <li key={i} className="text-xs text-slate-700 flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="text-[#4f46e5] font-bold shrink-0">✓</span>
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-4 rounded-xl border border-[#e2e8f0]">
              <h3 className="text-[11px] uppercase text-[#64748b] font-semibold tracking-wider mb-3 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                Core Targeted Competencies
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {candidate.skills.map((s, idx) => (
                  <span key={idx} className="text-xs bg-[#f1f5f9] text-[#0f172a] px-2.5 py-1 rounded-md font-medium border border-slate-200">
                    {s}
                  </span>
                ))}
              </div>

              {candidate.githubStats && (
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-mono">
                    <GitBranch className="w-3.5 h-3.5 text-slate-400" />
                    {candidate.githubStats.repos} Open Repos
                  </span>
                  <span className="font-mono text-amber-600 font-semibold">
                    ⭐ {candidate.githubStats.stars.toLocaleString()} Stars
                  </span>
                  <span className="font-mono text-emerald-600 font-semibold">
                    ⚡ {candidate.githubStats.commitsLastYear} Commits/yr
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Previous Trajectory History */}
          <div className="bg-white p-4 rounded-xl border border-[#e2e8f0]">
            <h3 className="text-[11px] uppercase text-[#64748b] font-semibold tracking-wider mb-2">Alumni Career Trajectory</h3>
            <div className="flex items-center gap-2 overflow-x-auto py-1">
              {candidate.previousCompanies.map((comp, i) => (
                <React.Fragment key={i}>
                  <span className="text-xs font-semibold px-3 py-1.5 bg-slate-100 rounded-lg text-slate-700 shrink-0 border border-slate-200/60">
                    {comp}
                  </span>
                  {i < candidate.previousCompanies.length - 1 && <span className="text-slate-300">→</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-white border-t border-[#e2e8f0] p-4 px-6 flex justify-between items-center shrink-0">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Profile signals verified against public repositories and career metadata.</span>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-[#e2e8f0] bg-white hover:bg-slate-50 text-[#0f172a] text-sm font-semibold cursor-pointer"
            >
              Close Profile
            </button>
            <button
              onClick={() => {
                alert(`Interview invite drafted for ${candidate.name} via ATS integration.`);
                onClose();
              }}
              className="px-5 py-2 rounded-lg bg-[#4f46e5] hover:bg-[#4338ca] text-white text-sm font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>Schedule Interview</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
