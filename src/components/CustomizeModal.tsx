import React, { useState } from 'react';
import { JobDescription } from '../types';
import { X, Target, Sparkles, Plus, Trash2 } from 'lucide-react';

interface CustomizeModalProps {
  job: JobDescription;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedJob: JobDescription) => void;
}

export const CustomizeModal: React.FC<CustomizeModalProps> = ({
  job,
  isOpen,
  onClose,
  onSave
}) => {
  const [title, setTitle] = useState(job.title);
  const [description, setDescription] = useState(job.description);
  const [skills, setSkills] = useState<string[]>(job.requiredSkills || []);
  const [newSkill, setNewSkill] = useState('');

  if (!isOpen) return null;

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleSaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...job,
      title: title.trim() || 'Custom Tech Lead Role',
      description: description.trim() || 'Software engineering position requiring scalable systems expertise.',
      requiredSkills: skills.length > 0 ? skills : ['Distributed Systems', 'TypeScript']
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white border border-[#e2e8f0] rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        <div className="bg-[#0f172a] text-white p-5 px-6 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2.5">
            <Target className="w-5 h-5 text-[#4f46e5]" />
            <h2 className="text-lg font-bold tracking-tight">Tune AI Job Signals & Semantic Criteria</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSaveSubmit} className="p-6 overflow-y-auto space-y-5 flex-1 bg-[#f8fafc]">
          <div>
            <label className="block text-xs uppercase font-bold text-slate-600 mb-1">Target Job Role Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-[#e2e8f0] rounded-lg text-sm font-semibold text-[#0f172a] focus:ring-2 focus:ring-[#4f46e5] focus:outline-none"
              placeholder="e.g. Staff Distributed Systems Engineer"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-bold text-slate-600 mb-1 flex justify-between">
              <span>Deep Nuanced Job Description (Interpreted by Gemini)</span>
              <span className="text-indigo-600 font-normal normal-case flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Semantic Fit Engine
              </span>
            </label>
            <textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-[#e2e8f0] rounded-lg text-xs font-sans text-slate-800 focus:ring-2 focus:ring-[#4f46e5] focus:outline-none leading-relaxed"
              placeholder="Paste complex job description with nuanced technical and leadership expectations..."
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-bold text-slate-600 mb-2">Crucial Targeted Expertise Skills</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {skills.map((s, idx) => (
                <span key={idx} className="text-xs bg-indigo-50 text-indigo-900 px-2.5 py-1 rounded-lg font-medium border border-indigo-200 flex items-center gap-1.5 shadow-2xs">
                  <span>{s}</span>
                  <button type="button" onClick={() => handleRemoveSkill(s)} className="text-indigo-400 hover:text-indigo-700">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add required skill (e.g. Kubernetes, Rust)..."
                className="flex-1 px-3 py-2 bg-white border border-[#e2e8f0] rounded-lg text-xs"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-3.5 py-2 bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1 hover:bg-slate-700"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>
          </div>
        </form>

        <div className="bg-white border-t border-[#e2e8f0] p-4 px-6 flex justify-end gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-[#e2e8f0] bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSaveSubmit}
            className="px-5 py-2 rounded-lg bg-[#4f46e5] hover:bg-[#4338ca] text-white text-sm font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Apply & Run AI Ranking</span>
          </button>
        </div>
      </div>
    </div>
  );
};
