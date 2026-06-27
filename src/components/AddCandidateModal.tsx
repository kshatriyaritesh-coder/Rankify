import React, { useState } from 'react';
import { Candidate } from '../types';
import { X, UserPlus, Sparkles } from 'lucide-react';

interface AddCandidateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newCand: Candidate) => void;
}

export const AddCandidateModal: React.FC<AddCandidateModalProps> = ({
  isOpen,
  onClose,
  onAdd
}) => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [years, setYears] = useState('8');
  const [skillsStr, setSkillsStr] = useState('Distributed Systems, Go, Kubernetes, Rust');
  const [summary, setSummary] = useState('');
  const [signalType, setSignalType] = useState<'top_signal' | 'open_source' | 'patent' | 'fast_promotion'>('top_signal');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !title.trim()) return;

    const skills = skillsStr.split(',').map(s => s.trim()).filter(Boolean);
    const signalLabelMap = {
      top_signal: 'Top 0.1% Signal',
      open_source: 'Active Open Source',
      patent: 'Patent Match',
      fast_promotion: 'Fast Promoted'
    };

    const newCandidate: Candidate = {
      id: `custom-${Date.now()}`,
      name: name.trim(),
      avatarUrl: `https://images.unsplash.com/photo-${1500000000000 + (name.length * 12345)}?auto=format&fit=crop&w=150&q=80`,
      currentTitle: title.trim(),
      currentCompany: company.trim() || 'Tech Innovators Inc.',
      previousCompanies: [company.trim() || 'Tech Innovators Inc.', 'Early Tech Corp'],
      yearsExperience: Number(years) || 6,
      location: 'San Francisco, CA (Remote)',
      education: 'B.S. in Computer Science',
      skills: skills.length > 0 ? skills : ['TypeScript', 'Distributed Systems'],
      behavioralSignals: [
        {
          type: signalType,
          label: signalLabelMap[signalType],
          scoreBonus: 12,
          description: `Custom verified recruiter telemetry signal: ${signalLabelMap[signalType]}.`
        }
      ],
      summary: summary.trim() || `${title} with ${years} years experience building high-throughput infrastructure.`,
      achievements: [
        `Architected key system component at ${company || 'previous company'}.`,
        'Demonstrated strong problem solving under stringent SLA constraints.'
      ]
    };

    onAdd(newCandidate);
    onClose();
    // Reset
    setName('');
    setTitle('');
    setCompany('');
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white border border-[#e2e8f0] rounded-2xl max-w-xl w-full flex flex-col shadow-2xl overflow-hidden">
        <div className="bg-[#0f172a] text-white p-5 px-6 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-[#4f46e5]" />
            <h2 className="text-base font-bold">Inject Profile into Pipeline</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block uppercase font-bold text-slate-600 mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Alex Mercer"
                className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg"
              />
            </div>
            <div>
              <label className="block uppercase font-bold text-slate-600 mb-1">Current Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Staff Systems Engineer"
                className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block uppercase font-bold text-slate-600 mb-1">Current Company</label>
              <input
                type="text"
                value={company}
                onChange={e => setCompany(e.target.value)}
                placeholder="e.g. Stripe / Anthropic"
                className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg"
              />
            </div>
            <div>
              <label className="block uppercase font-bold text-slate-600 mb-1">Years Experience</label>
              <input
                type="number"
                value={years}
                onChange={e => setYears(e.target.value)}
                className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block uppercase font-bold text-slate-600 mb-1">Comma-Separated Skills</label>
            <input
              type="text"
              value={skillsStr}
              onChange={e => setSkillsStr(e.target.value)}
              className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg font-mono"
            />
          </div>

          <div>
            <label className="block uppercase font-bold text-slate-600 mb-1">Key Behavioral Signal Tag</label>
            <select
              value={signalType}
              onChange={e => setSignalType(e.target.value as any)}
              className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg bg-white font-semibold text-[#4f46e5]"
            >
              <option value="top_signal">🔥 Top 0.1% Signal</option>
              <option value="open_source">🌐 Active Open Source Leader</option>
              <option value="patent">⭐ Foundational Patent Match</option>
              <option value="fast_promotion">🚀 Fast Promoted Velocity</option>
            </select>
          </div>

          <div>
            <label className="block uppercase font-bold text-slate-600 mb-1">Profile Summary & Accomplishments</label>
            <textarea
              rows={3}
              value={summary}
              onChange={e => setSummary(e.target.value)}
              placeholder="Brief overview of standout candidate achievements..."
              className="w-full px-3 py-2 border border-[#e2e8f0] rounded-lg font-sans"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border bg-white font-semibold">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded-lg bg-[#4f46e5] text-white font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Rank Candidate</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
