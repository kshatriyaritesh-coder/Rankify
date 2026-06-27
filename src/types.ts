export interface BehavioralSignal {
  type: 'open_source' | 'patent' | 'leadership' | 'fast_promotion' | 'high_stability' | 'top_signal' | 'scale_expert' | 'community_rep';
  label: string;
  scoreBonus: number;
  description: string;
}

export interface Candidate {
  id: string;
  name: string;
  avatarUrl: string;
  currentTitle: string;
  currentCompany: string;
  previousCompanies: string[];
  yearsExperience: number;
  location: string;
  education: string;
  skills: string[];
  behavioralSignals: BehavioralSignal[];
  summary: string;
  achievements: string[];
  githubStats?: { repos: number; stars: number; commitsLastYear: number };
  patentsCount?: number;
}

export interface JobDescription {
  id: string;
  title: string;
  level: string;
  department: string;
  activeIntelligenceLabel: string;
  description: string;
  requiredSkills: string[];
  preferredSignals: string[];
  searchPrecision: number;
}

export interface RankedCandidate extends Candidate {
  fitScore: number; // 0 - 100
  rank: number;
  semanticRationale: string;
  keyStrengths: string[];
  matchHighlights: string[];
  aiRecommendation: 'Immediate Finalist' | 'Strong Contender' | 'Potential Fit' | 'Hold';
}

export interface ScreeningMetrics {
  profilesScanned: number;
  behavioralHits: number;
  patentMatches: number;
  techStackFit: number;
  targetedExpertise: string[];
}
