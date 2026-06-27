import React from 'react';
import { Sparkles, Activity, UserCheck } from 'lucide-react';

interface HeaderProps {
  pipelineStatus?: string;
  totalCandidates: number;
}

export const Header: React.FC<HeaderProps> = ({ pipelineStatus = 'High', totalCandidates }) => {
  return (
    <header className="h-16 bg-[#0f172a] flex items-center px-6 justify-between text-white shrink-0 shadow-sm z-10">
      <div className="flex items-center gap-3 font-bold text-xl tracking-tight">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#4f46e5]" />
          <span>Rankify</span>
        </div>
        <span className="bg-[#4f46e5] px-2 py-1 rounded-md text-sm font-semibold tracking-normal text-white shadow-inner">
          RECRUITER
        </span>
      </div>

      <div className="flex gap-6 items-center text-sm">
        <div className="flex items-center gap-2 text-[#94a3b8]">
          <Activity className="w-4 h-4 text-[#10b981]" />
          <span>Pipeline Velocity: <strong className="text-[#10b981] font-semibold">{pipelineStatus}</strong></span>
        </div>
        
        <div className="hidden sm:flex items-center gap-1.5 text-[#94a3b8] border-l border-slate-700 pl-4">
          <UserCheck className="w-4 h-4 text-indigo-400" />
          <span>Active Shortlist: <strong className="text-white font-semibold">{totalCandidates}</strong></span>
        </div>

        <div className="w-8 h-8 bg-[#475569] rounded-full flex items-center justify-center font-bold text-xs ring-2 ring-[#4f46e5]/30">
          R
        </div>
      </div>
    </header>
  );
};
