import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

// We import mock data to seed server state
import { INITIAL_JOBS, MOCK_CANDIDATES } from './src/data/mockData';
import { Candidate, RankedCandidate } from './src/types';

const app = express();
app.use(express.json());

// API Endpoints
app.get('/api/jobs', (req, res) => {
  res.json(INITIAL_JOBS);
});

app.get('/api/candidates', (req, res) => {
  res.json(MOCK_CANDIDATES);
});

// Intelligent AI Candidate Ranking Endpoint
app.post('/api/rank', async (req, res) => {
  try {
    const { jobId, jobDescription, requiredSkills, minFitScore = 0 } = req.body;
    
    // Find job or use provided description
    let targetJob = INITIAL_JOBS.find(j => j.id === jobId);
    const descText = jobDescription || targetJob?.description || 'Software Engineering Role';
    const skillsList = requiredSkills || targetJob?.requiredSkills || ['Distributed Systems', 'TypeScript', 'Go', 'Python'];

    const candidatesToRank: Candidate[] = req.body.candidates || MOCK_CANDIDATES;

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
      try {
        const ai = new GoogleGenAI({
          apiKey: apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            }
          }
        });

        const prompt = `You are ApexRank AI Recruiter, an expert AI headhunter.
Analyze this job description and intelligently evaluate the provided list of candidates.
Look beyond simple keyword matching to determine deep semantic fit, trajectory velocity, and crucial behavioral signals (like open source leadership, patents, high stability, and fast promotion).

JOB DESCRIPTION:
"${descText}"
REQUIRED SKILLS: ${skillsList.join(', ')}

CANDIDATES TO EVALUATE:
${JSON.stringify(candidatesToRank.map(c => ({
  id: c.id,
  name: c.name,
  currentTitle: c.currentTitle,
  currentCompany: c.currentCompany,
  yearsExperience: c.yearsExperience,
  skills: c.skills,
  behavioralSignals: c.behavioralSignals.map(s => s.label),
  summary: c.summary,
  achievements: c.achievements
})), null, 2)}

Return a JSON array of evaluated candidates. Each item must have:
- id: string (matching the candidate id)
- fitScore: number (0 to 100, where 95+ is exceptional top 0.1% fit)
- semanticRationale: string (concise 2-sentence expert recruiter justification explaining exact semantic alignment and trajectory fit)
- keyStrengths: string[] (top 3 specific strengths for this exact job)
- matchHighlights: string[] (2 standout proof points or achievements matching job requirements)
- aiRecommendation: one of ["Immediate Finalist", "Strong Contender", "Potential Fit", "Hold"]

Format output strictly as JSON array without Markdown code fences if possible, or standard JSON inside array.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.5-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.2
          }
        });

        const text = response.text || '[]';
        const evaluatedList = JSON.parse(text);

        // Merge AI evaluations with candidate full profiles
        const ranked: RankedCandidate[] = candidatesToRank.map(cand => {
          const evalItem = evaluatedList.find((e: any) => e.id === cand.id);
          const score = evalItem?.fitScore || calculateHeuristicScore(cand, descText, skillsList);
          
          return {
            ...cand,
            fitScore: Math.round(score),
            semanticRationale: evalItem?.semanticRationale || generateHeuristicRationale(cand, skillsList),
            keyStrengths: evalItem?.keyStrengths || cand.skills.slice(0, 3),
            matchHighlights: evalItem?.matchHighlights || cand.achievements.slice(0, 2),
            aiRecommendation: evalItem?.aiRecommendation || getRecommendation(score),
            rank: 0
          };
        });

        // Filter and Sort by fitScore descending
        const filtered = ranked.filter(c => c.fitScore >= minFitScore);
        filtered.sort((a, b) => b.fitScore - a.fitScore);
        filtered.forEach((c, idx) => c.rank = idx + 1);

        return res.json(filtered);

      } catch (geminiErr: any) {
        console.error('Gemini API ranking fallback triggered:', geminiErr?.message || geminiErr);
        // Fall back to heuristic ranking below
      }
    }

    // Heuristic Fallback Ranking Engine
    const ranked: RankedCandidate[] = candidatesToRank.map(cand => {
      const score = calculateHeuristicScore(cand, descText, skillsList);
      return {
        ...cand,
        fitScore: Math.round(score),
        semanticRationale: generateHeuristicRationale(cand, skillsList),
        keyStrengths: cand.skills.filter(s => skillsList.some(rs => rs.toLowerCase().includes(s.toLowerCase()))).slice(0, 3),
        matchHighlights: cand.achievements.slice(0, 2),
        aiRecommendation: getRecommendation(score),
        rank: 0
      };
    });

    const filtered = ranked.filter(c => c.fitScore >= minFitScore);
    filtered.sort((a, b) => b.fitScore - a.fitScore);
    filtered.forEach((c, idx) => c.rank = idx + 1);

    res.json(filtered);

  } catch (err: any) {
    console.error('Error in /api/rank:', err);
    res.status(500).json({ error: 'Failed to rank candidates' });
  }
});

function calculateHeuristicScore(candidate: Candidate, descText: string, skillsList: string[]): number {
  let score = 62;

  // Skill overlap
  const descLower = descText.toLowerCase();
  const candSkillsLower = candidate.skills.map(s => s.toLowerCase());
  
  let skillMatches = 0;
  skillsList.forEach(reqSkill => {
    const rsLower = reqSkill.toLowerCase();
    if (candSkillsLower.some(cs => cs.includes(rsLower) || rsLower.includes(cs))) {
      skillMatches++;
      score += 4.5;
    } else if (descLower.includes(rsLower) && candidate.summary.toLowerCase().includes(rsLower)) {
      score += 2.5;
    }
  });

  // Experience sweet spot alignment
  if (candidate.yearsExperience >= 8 && candidate.yearsExperience <= 15) {
    score += 6;
  } else if (candidate.yearsExperience >= 5) {
    score += 4;
  }

  // Behavioral signals contribution
  candidate.behavioralSignals.forEach(sig => {
    score += (sig.scoreBonus * 0.45);
  });

  // Clamp score
  return Math.min(99, Math.max(54, score));
}

function generateHeuristicRationale(cand: Candidate, skillsList: string[]): string {
  const matched = cand.skills.filter(s => skillsList.some(rs => rs.toLowerCase().includes(s.toLowerCase()))).slice(0, 3);
  const topSig = cand.behavioralSignals[0]?.label || 'Proven Execution';
  return `Strong semantic alignment demonstrated through mastery of ${matched.join(', ') || cand.skills[0]}. Trajectory metadata indicates ${topSig} backed by ${cand.yearsExperience} years of production experience at ${cand.currentCompany}.`;
}

function getRecommendation(score: number): 'Immediate Finalist' | 'Strong Contender' | 'Potential Fit' | 'Hold' {
  if (score >= 93) return 'Immediate Finalist';
  if (score >= 88) return 'Strong Contender';
  if (score >= 78) return 'Potential Fit';
  return 'Hold';
}

// Attach Vite middleware in development or static serving in production
async function setupFrontend() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }
}

const PORT = Number(process.env.PORT) || 3000;

setupFrontend().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ApexRank AI Recruiter Server active on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to start server:', err);
});
