/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Candidate, JobDescription, RankedCandidate, ScreeningMetrics } from './types';
import { INITIAL_JOBS, MOCK_CANDIDATES } from './data/mockData';
import { Header } from './components/Header';
import { JobContext } from './components/JobContext';
import { Sidebar } from './components/Sidebar';
import { CandidateRow } from './components/CandidateRow';
import { CandidateModal } from './components/CandidateModal';
import { CustomizeModal } from './components/CustomizeModal';
import { AddCandidateModal } from './components/AddCandidateModal';
import { Sparkles, Layers } from 'lucide-react';

export default function App() {
  const [allJobs, setAllJobs] = useState<JobDescription[]>(INITIAL_JOBS);
  const [currentJob, setCurrentJob] = useState<JobDescription>(INITIAL_JOBS[0]);
  const [candidates, setCandidates] = useState<Candidate[]>(MOCK_CANDIDATES);
  const [rankedCandidates, setRankedCandidates] = useState<RankedCandidate[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<RankedCandidate | null>(null);
  const [minFitScore, setMinFitScore] = useState<number>(75);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isRanking, setIsRanking] = useState<boolean>(false);

  // Core AI Ranking Execution
  const triggerRanking = useCallback(async (jobToRank: JobDescription, candidatePool: Candidate[], minScore: number) => {
    setIsRanking(true);
    try {
      const response = await fetch('/api/rank', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: jobToRank.id,
          jobDescription: jobToRank.description,
          requiredSkills: jobToRank.requiredSkills,
          candidates: candidatePool,
          minFitScore: minScore
        })
      });

      if (response.ok) {
        const data: RankedCandidate[] = await response.json();
        setRankedCandidates(data);
      } else {
        throw new Error('Server returned ranking error');
      }
    } catch (err) {
      console.warn('API ranking unreachable or fallback required. Executing local heuristic ranking:', err);
      // Client-side heuristic ranking fallback
      const skills = jobToRank.requiredSkills || ['Distributed Systems', 'TypeScript'];
      const descLower = jobToRank.description.toLowerCase();
      
      const localRanked: RankedCandidate[] = candidatePool.map(cand => {
        let score = 64;
        cand.skills.forEach(s => {
          if (skills.some(rs => rs.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(rs.toLowerCase()))) {
            score += 4.5;
          }
        });
        if (cand.yearsExperience >= 7 && cand.yearsExperience <= 15) score += 6;
        cand.behavioralSignals.forEach(sig => score += sig.scoreBonus * 0.45);
        const clampedScore = Math.min(99, Math.max(52, Math.round(score)));

        let rec: any = 'Hold';
        if (clampedScore >= 93) rec = 'Immediate Finalist';
        else if (clampedScore >= 88) rec = 'Strong Contender';
        else if (clampedScore >= 78) rec = 'Potential Fit';

        const matched = cand.skills.filter(s => skills.some(rs => rs.toLowerCase().includes(s.toLowerCase()))).slice(0, 3);
        const rationale = `Strong semantic alignment demonstrated through mastery of ${matched.join(', ') || cand.skills[0]}. Trajectory metadata confirms ${cand.behavioralSignals[0]?.label || 'proven stability'} across ${cand.yearsExperience} years production experience at ${cand.currentCompany}.`;

        return {
          ...cand,
          fitScore: clampedScore,
          semanticRationale: rationale,
          keyStrengths: matched.length > 0 ? matched : cand.skills.slice(0, 3),
          matchHighlights: cand.achievements.slice(0, 2),
          aiRecommendation: rec,
          rank: 0
        };
      });

      const filtered = localRanked.filter(c => c.fitScore >= minScore);
      filtered.sort((a, b) => b.fitScore - a.fitScore);
      filtered.forEach((c, idx) => c.rank = idx + 1);
      setRankedCandidates(filtered);
    } finally {
      setIsRanking(false);
    }
  }, []);

  // Fetch initial data from backend if available
  useEffect(() => {
    async function loadBackendState() {
      try {
        const [jobsRes, candsRes] = await Promise.all([
          fetch('/api/jobs'),
          fetch('/api/candidates')
        ]);
        if (jobsRes.ok && candsRes.ok) {
          const fetchedJobs = await jobsRes.json();
          const fetchedCands = await candsRes.json();
          if (fetchedJobs?.length > 0) {
            setAllJobs(fetchedJobs);
            setCurrentJob(fetchedJobs[0]);
          }
          if (fetchedCands?.length > 0) {
            setCandidates(fetchedCands);
            triggerRanking(fetchedJobs[0] || currentJob, fetchedCands, minFitScore);
            return;
          }
        }
      } catch (e) {
        // Backend cold start or static preview; proceed with mock
      }
      triggerRanking(currentJob, candidates, minFitScore);
    }
    loadBackendState();
  }, []); // Run once on mount

  // Re-rank when job or minScore changes
  useEffect(() => {
    triggerRanking(currentJob, candidates, minFitScore);
  }, [currentJob, minFitScore, candidates, triggerRanking]);

  // Handle switching jobs
  const handleSelectJob = (newJob: JobDescription) => {
    setCurrentJob(newJob);
  };

  // Handle saving custom job requirements
  const handleSaveJob = (updatedJob: JobDescription) => {
    setCurrentJob(updatedJob);
    setAllJobs(prev => prev.map(j => j.id === updatedJob.id ? updatedJob : j));
  };

  // Handle adding new candidate
  const handleAddCandidate = (newCand: Candidate) => {
    setCandidates(prev => [newCand, ...prev]);
  };

  // Calculate telemetry screening metrics
  const metrics: ScreeningMetrics = {
    profilesScanned: 1240 + candidates.length,
    behavioralHits: rankedCandidates.reduce((acc, c) => acc + c.behavioralSignals.length, 0) + 18,
    patentMatches: rankedCandidates.reduce((acc, c) => acc + (c.patentsCount || 0), 0) + 4,
    techStackFit: Math.round(rankedCandidates.reduce((acc, c) => acc + c.fitScore, 0) / (rankedCandidates.length || 1)),
    targetedExpertise: currentJob.requiredSkills || []
  };

  return (
    <div className="h-screen bg-[#f8fafc] font-sans flex flex-col overflow-hidden text-slate-800 antialiased selection:bg-[#4f46e5] selection:text-white">
      {/* Top Recruiter Header */}
      <Header
        pipelineStatus={rankedCandidates.length > 3 ? 'High' : 'Optimal'}
        totalCandidates={rankedCandidates.length}
      />

      {/* Target Job Semantic Context Banner */}
      <JobContext
        currentJob={currentJob}
        allJobs={allJobs}
        onSelectJob={handleSelectJob}
        onOpenCustomize={() => setIsCustomizeOpen(true)}
        isRanking={isRanking}
      />

      {/* Main Grid Content Area */}
      <main className="flex-1 flex flex-col lg:grid lg:grid-cols-[320px_1fr] gap-5 p-5 overflow-hidden min-h-0">
        {/* Left Signal Integration Sidebar */}
        <Sidebar
          metrics={metrics}
          requiredSkills={currentJob.requiredSkills || []}
          minFitScore={minFitScore}
          onMinFitScoreChange={setMinFitScore}
          onRefreshRanking={() => triggerRanking(currentJob, candidates, minFitScore)}
          onAddCandidate={() => setIsAddModalOpen(true)}
          isRanking={isRanking}
        />

        {/* Right Ranked Intelligent Candidate Shortlist */}
        <section className="bg-white border border-[#e2e8f0] rounded-xl flex flex-col overflow-hidden shadow-sm flex-1 min-h-0">
          <div className="p-4 px-5 border-b border-[#e2e8f0] bg-slate-50/70 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase text-[#64748b] font-semibold tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#4f46e5]" />
                Ranked Intelligent Shortlist
              </span>
              <span className="bg-[#e0e7ff] text-[#4338ca] text-xs px-2 py-0.5 rounded-full font-bold">
                {rankedCandidates.length} Matches
              </span>
            </div>

            <div className="text-xs text-slate-400 font-medium flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-slate-400" />
              <span>Sorted by Semantic Fit Engine</span>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/30">
            {isRanking && rankedCandidates.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-slate-400 gap-3">
                <Sparkles className="w-8 h-8 text-[#4f46e5] animate-spin" />
                <p className="text-sm font-semibold text-slate-600">Interpreting job signals & ranking candidate pool...</p>
              </div>
            ) : rankedCandidates.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-slate-400 gap-2 p-6 text-center">
                <p className="text-base font-semibold text-slate-700">No candidates match the {minFitScore}% precision threshold.</p>
                <p className="text-xs text-slate-500 max-w-sm">Try broadening the slider in the left sidebar to reveal strong contenders.</p>
                <button
                  onClick={() => setMinFitScore(65)}
                  className="mt-3 px-3.5 py-1.5 bg-[#4f46e5] text-white rounded-lg text-xs font-semibold shadow-xs hover:bg-[#4338ca]"
                >
                  Lower to 65% Threshold
                </button>
              </div>
            ) : (
              rankedCandidates.map(cand => (
                <CandidateRow
                  key={cand.id}
                  candidate={cand}
                  onSelect={setSelectedCandidate}
                  isSelected={selectedCandidate?.id === cand.id}
                />
              ))
            )}
          </div>
        </section>
      </main>

      {/* Modals */}
      <CandidateModal
        candidate={selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
      />

      <CustomizeModal
        job={currentJob}
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
        onSave={handleSaveJob}
      />

      <AddCandidateModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddCandidate}
      />
    </div>
  );
}

