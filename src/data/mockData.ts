import { Candidate, JobDescription } from '../types';

export const INITIAL_JOBS: JobDescription[] = [
  {
    id: 'job-1',
    title: 'Principal Distributed Systems Engineer',
    level: 'Staff / Principal',
    department: 'Core Infrastructure',
    activeIntelligenceLabel: 'Active Intelligence Search',
    description: `We are looking for a Principal Distributed Systems Engineer to architect our hyper-scale low-latency storage and consensus engine. You will design fault-tolerant distributed algorithms (Raft/Paxos), optimize C++/Rust/Go network stacks for sub-millisecond p99 latency, and scale vector databases across global Kubernetes clusters. Proven track record in high-throughput systems at companies like Google Brain, AWS, Datadog, or Stripe is highly desired.`,
    requiredSkills: ['Kubernetes', 'Go', 'Rust', 'Vector DBs', 'Raft/Paxos', 'Low Latency', 'Hyper-scale', 'Distributed Systems'],
    preferredSignals: ['Top 0.1% Signal', 'Active Open Source', 'Patent Match', 'Scale Specialist'],
    searchPrecision: 99.4,
  },
  {
    id: 'job-2',
    title: 'Lead AI Agent Architect',
    level: 'Staff Level',
    department: 'Applied AI & Reasoning',
    activeIntelligenceLabel: 'Cognitive Pipeline Search',
    description: `Seeking a Lead AI Architect to spearhead autonomous multi-agent reasoning frameworks powered by LLMs and tool orchestration. You will build resilient memory indexing, agentic self-reflection loops, and real-time execution pipelines. Deep expertise in TypeScript, Python, GenAI SDKs, LangGraph/LlamaIndex paradigms, and high-reliability production engineering.`,
    requiredSkills: ['TypeScript', 'Python', 'LLM Orchestration', 'Multi-Agent', 'Vector Search', 'Prompt Engineering', 'Production AI'],
    preferredSignals: ['Active Open Source', 'Fast Promoted', 'Top 0.1% Signal'],
    searchPrecision: 98.8,
  },
  {
    id: 'job-3',
    title: 'VP of Engineering, Cloud Security',
    level: 'Executive',
    department: 'Enterprise Security',
    activeIntelligenceLabel: 'Executive Talent Radar',
    description: `Executive leadership role directing 50+ engineers across zero-trust cloud architecture, compliance automation, and threat intelligence. Requires high stability, proven org scaling from Series B to IPO, deep mastery of AWS/GCP cloud native security enclaves, and exceptional engineering mentorship.`,
    requiredSkills: ['Org Leadership', 'Zero Trust', 'Cloud Security', 'SOC2/ISO', 'Executive Mentorship', 'Enterprise Scale'],
    preferredSignals: ['High Stability', 'Team Lead', 'Top 0.1% Signal'],
    searchPrecision: 97.5,
  },
  {
    id: 'job-4',
    title: 'Senior Frontend Performance Architect',
    level: 'Senior Level',
    department: 'Web Core & Experience',
    activeIntelligenceLabel: 'UI Fluidity Search',
    description: `Looking for a Senior Frontend Architect obsessed with web vitals, React 19 concurrent features, Vite bundling optimization, and micro-frontend orchestration. You will eliminate layout shifts, build design systems with Tailwind CSS, and ensure 60fps animations across complex data visualization dashboards.`,
    requiredSkills: ['React 19', 'TypeScript', 'Tailwind CSS', 'Web Vitals', 'Vite', 'Frontend Architecture', 'Data Viz (D3)'],
    preferredSignals: ['Active Open Source', 'Fast Promoted', 'High Stability'],
    searchPrecision: 99.1,
  }
];

export const MOCK_CANDIDATES: Candidate[] = [
  {
    id: 'cand-1',
    name: 'Dr. Sarah Chen',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    currentTitle: 'Principal Systems Architect',
    currentCompany: 'DeepMind Alumni / Ex-Google Brain',
    previousCompanies: ['Google Brain', 'Meta AI', 'MIT CSAIL'],
    yearsExperience: 12,
    location: 'San Francisco, CA',
    education: 'Ph.D. in Computer Science, MIT',
    skills: ['Distributed Systems', 'Rust', 'C++', 'Go', 'Raft/Paxos', 'Vector DBs', 'Kubernetes', 'Low Latency', 'Hyper-scale'],
    behavioralSignals: [
      { type: 'top_signal', label: 'Top 0.1% Signal', scoreBonus: 15, description: 'Ranked in top 0.1% of distributed systems contributors globally.' },
      { type: 'open_source', label: 'Active Open Source', scoreBonus: 10, description: 'Core maintainer of high-star Rust consensus library.' },
      { type: 'patent', label: 'Patent Holder (6)', scoreBonus: 12, description: 'Holds 6 foundational patents in asynchronous state replication.' }
    ],
    summary: 'Pioneered low-latency distributed consensus engines at Google Brain. Architected multi-petabyte vector indexing clusters handling 10M QPS with sub-millisecond p99 latency.',
    achievements: [
      'Reduced global sync latency by 45% across 10,000+ node clusters at Google Brain.',
      'Authored 4 IEEE top-tier papers on distributed fault tolerance.',
      'Mentored 15+ senior engineers into Staff/Principal roles.'
    ],
    githubStats: { repos: 48, stars: 3420, commitsLastYear: 1420 },
    patentsCount: 6
  },
  {
    id: 'cand-2',
    name: 'Marcus Thorne',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    currentTitle: 'Lead Infrastructure Engineer',
    currentCompany: 'Datadog',
    previousCompanies: ['AWS (Core S3)', 'Twilio'],
    yearsExperience: 9,
    location: 'New York, NY',
    education: 'M.S. in Computer Engineering, Georgia Tech',
    skills: ['Go', 'Kubernetes', 'Distributed Systems', 'Hyper-scale', 'Low Latency', 'Observability', 'Kafka', 'AWS'],
    behavioralSignals: [
      { type: 'high_stability', label: 'High Stability', scoreBonus: 10, description: '4+ year average tenure at hyper-growth cloud providers.' },
      { type: 'leadership', label: 'Team Lead', scoreBonus: 8, description: 'Directly leads an agile pod of 12 distributed systems engineers.' }
    ],
    summary: 'Key architect behind Datadog streaming telemetry ingestion pipeline. Specialist in Go memory allocation and zero-copy packet processing at scale.',
    achievements: [
      'Engineered streaming telemetry pipeline processing 400TB/day with zero downtime.',
      'Spearheaded migration of core services from EC2 to bare-metal Kubernetes enclaves.',
      'Received Datadog Engineering Excellence Award 2024.'
    ],
    githubStats: { repos: 22, stars: 890, commitsLastYear: 840 },
    patentsCount: 2
  },
  {
    id: 'cand-3',
    name: 'Elena Rodriguez',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
    currentTitle: 'Senior Staff Engineer',
    currentCompany: 'Stripe',
    previousCompanies: ['Lyft', 'Coinbase'],
    yearsExperience: 7,
    location: 'Seattle, WA',
    education: 'B.S. in Computer Science, Stanford University',
    skills: ['Rust', 'Go', 'Distributed Systems', 'FinTech Security', 'Low Latency', 'Idempotency Algorithms', 'Kubernetes'],
    behavioralSignals: [
      { type: 'scale_expert', label: 'Scale Specialist', scoreBonus: 12, description: 'Designed high-availability ledger engines handling $100B+ annual volume.' },
      { type: 'fast_promotion', label: 'Fast Promoted', scoreBonus: 12, description: 'Promoted L4 to L7 Staff Engineer in just 3.5 years at Stripe.' }
    ],
    summary: 'Architected Stripe core global idempotency ledger and payment routing gateway. Exceptional problem solver known for pristine code quality and rapid execution.',
    achievements: [
      'Redesigned payment routing gateway saving $14M annually in transaction failures.',
      'Fastest promotion track in Stripe core infrastructure division history.',
      'Keynote speaker at QCon San Francisco on Rust concurrency.'
    ],
    githubStats: { repos: 31, stars: 1540, commitsLastYear: 1100 },
    patentsCount: 1
  },
  {
    id: 'cand-4',
    name: 'James Wu',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    currentTitle: 'Principal Cloud Systems Architect',
    currentCompany: 'Amazon Web Services (AWS)',
    previousCompanies: ['Oracle', 'Cisco Systems'],
    yearsExperience: 15,
    location: 'Austin, TX',
    education: 'B.S. in Electrical Engineering, UT Austin',
    skills: ['C++', 'Java', 'Distributed Systems', 'Paxos', 'AWS', 'Hyper-scale', 'Storage Engines'],
    behavioralSignals: [
      { type: 'high_stability', label: 'Legacy Expertise', scoreBonus: 8, description: '15 years mastering enterprise-grade storage hardware and consensus.' },
      { type: 'patent', label: 'Patent Holder (4)', scoreBonus: 8, description: '4 patents in block storage replication.' }
    ],
    summary: 'Veteran systems architect behind AWS EBS volume replication protocols. Unmatched deep knowledge in kernel tuning, POSIX storage semantics, and Paxos variants.',
    achievements: [
      'Authored core replication protocol for AWS EBS storage volumes.',
      'Resolved critical network partitioning edge cases affecting multi-AZ clusters.',
      'Served on AWS Principal Engineering Review Board.'
    ],
    patentsCount: 4
  },
  {
    id: 'cand-5',
    name: 'Leila Hassan',
    avatarUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=150&q=80',
    currentTitle: 'Head of AI Infrastructure',
    currentCompany: 'Vercel',
    previousCompanies: ['Cloudflare', 'Supabase'],
    yearsExperience: 8,
    location: 'Remote (Toronto, Canada)',
    education: 'B.S. in Software Engineering, University of Waterloo',
    skills: ['TypeScript', 'Rust', 'LLM Orchestration', 'Edge Computing', 'Vector DBs', 'Kubernetes', 'Multi-Agent', 'Vite'],
    behavioralSignals: [
      { type: 'top_signal', label: 'Cloud Native', scoreBonus: 10, description: 'Leader in serverless AI edge runtime performance.' },
      { type: 'open_source', label: 'Active Open Source', scoreBonus: 10, description: 'Creator of popular edge vector caching npm package (2M weekly DLs).' }
    ],
    summary: 'Built Vercel AI SDK streaming engine and edge inference routing layer. Bridge between hyper-fast web UX and heavy distributed AI workloads.',
    achievements: [
      'Co-authored Vercel AI SDK streaming architecture used by 100k+ developers.',
      'Reduced edge AI cold-start latency from 800ms to 45ms.',
      'Angel investor & advisor to 4 AI infrastructure startups.'
    ],
    githubStats: { repos: 64, stars: 8920, commitsLastYear: 2150 }
  },
  {
    id: 'cand-6',
    name: 'David Kim',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    currentTitle: 'Senior AI Research Engineer',
    currentCompany: 'OpenAI',
    previousCompanies: ['Scale AI', 'Tesla Autopilot'],
    yearsExperience: 6,
    location: 'San Francisco, CA',
    education: 'M.S. in AI, Stanford University',
    skills: ['Python', 'PyTorch', 'LLM Orchestration', 'Multi-Agent', 'Vector Search', 'Prompt Engineering', 'C++'],
    behavioralSignals: [
      { type: 'fast_promotion', label: 'Fast Promoted', scoreBonus: 10, description: 'Key contributor to autonomous agent reasoning loops at OpenAI.' },
      { type: 'top_signal', label: 'Top 0.1% Signal', scoreBonus: 12, description: 'Co-inventor of tool-calling retrieval optimization.' }
    ],
    summary: 'Research engineer focusing on agentic memory search and recursive tool planning. Expert in reinforcement learning from human feedback (RLHF) and vector indexing.',
    achievements: [
      'Optimized vector context window retrieval speed by 3x.',
      'Contributed core reasoning benchmarks for model evaluation suites.',
      'Published 3 papers at NeurIPS on multi-agent collaboration.'
    ],
    githubStats: { repos: 19, stars: 4200, commitsLastYear: 980 }
  },
  {
    id: 'cand-7',
    name: 'Aisha Al-Mansoor',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    currentTitle: 'VP of Engineering',
    currentCompany: 'Auth0 / Okta Security',
    previousCompanies: ['CrowdStrike', 'Palantir'],
    yearsExperience: 16,
    location: 'Boston, MA',
    education: 'M.B.A. & B.S. CS, Harvard University',
    skills: ['Org Leadership', 'Zero Trust', 'Cloud Security', 'SOC2/ISO', 'Executive Mentorship', 'Enterprise Scale', 'Distributed Systems'],
    behavioralSignals: [
      { type: 'leadership', label: 'Team Lead (80+ Eng)', scoreBonus: 15, description: 'Directly managed org expansion from 15 to 85 engineers through IPO.' },
      { type: 'high_stability', label: 'High Stability', scoreBonus: 10, description: 'Average tenure 5.5 years across top tier cybersecurity firms.' }
    ],
    summary: 'Executive engineering leader specializing in zero-trust enterprise security architectures. Scaled global engineering orgs while maintaining elite engineering velocity and 95% retention.',
    achievements: [
      'Led engineering organization through successful $6.5B acquisition.',
      'Implemented zero-trust cloud enclaves achieving SOC2 Type II compliance in record time.',
      'Champion of women in engineering mentorship programs globally.'
    ]
  },
  {
    id: 'cand-8',
    name: 'Alexei Ivanov',
    avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80',
    currentTitle: 'Staff Distributed Systems Engineer',
    currentCompany: 'Cockroach Labs',
    previousCompanies: ['Yandex', 'Uber'],
    yearsExperience: 11,
    location: 'New York, NY',
    education: 'M.S. in Applied Math, Moscow State University',
    skills: ['Go', 'Rust', 'Raft/Paxos', 'Distributed Systems', 'Vector DBs', 'Storage Engines', 'Low Latency'],
    behavioralSignals: [
      { type: 'open_source', label: 'Active Open Source', scoreBonus: 10, description: 'Major contributor to CockroachDB distributed SQL storage layer.' },
      { type: 'scale_expert', label: 'Scale Specialist', scoreBonus: 10, description: 'Architected multi-region transactional consensus.' }
    ],
    summary: 'Database internal architect specializing in distributed SQL execution engines and Raft consensus performance under extreme network jitter.',
    achievements: [
      'Eliminated distributed deadlock conditions in high-contention SQL transactions.',
      'Built custom storage engine cache reducing NVMe write amplification by 30%.',
      'Top StackOverflow contributor in Go concurrency tag.'
    ],
    githubStats: { repos: 35, stars: 2100, commitsLastYear: 1650 }
  },
  {
    id: 'cand-9',
    name: 'Chloe Bennett',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    currentTitle: 'Staff Frontend Architect',
    currentCompany: 'Figma',
    previousCompanies: ['Airbnb', 'Shopify'],
    yearsExperience: 9,
    location: 'San Francisco, CA',
    education: 'B.S. in Design & CS, Carnegie Mellon University',
    skills: ['React 19', 'TypeScript', 'Tailwind CSS', 'Web Vitals', 'Vite', 'Frontend Architecture', 'WebGL', 'Data Viz (D3)'],
    behavioralSignals: [
      { type: 'top_signal', label: 'UI Fluidity Expert', scoreBonus: 12, description: 'Architected Figma multiplayer web canvas rendering engine.' },
      { type: 'fast_promotion', label: 'Fast Promoted', scoreBonus: 10, description: 'Rapid promotion track at Figma core editor team.' }
    ],
    summary: 'Frontend performance savant behind Figma web editor buttery smooth 60fps canvas interactions. Creator of bleeding-edge React concurrent UI patterns.',
    achievements: [
      'Rewrote Figma UI shell in modern TypeScript & CSS grid reducing bundle by 40%.',
      'Maintained 99.9 percentile INP (Interaction to Next Paint) under 16ms.',
      'Regular guest on Syntax.fm podcast discussing modern frontend bundling.'
    ],
    githubStats: { repos: 42, stars: 6100, commitsLastYear: 1300 }
  },
  {
    id: 'cand-10',
    name: 'Rajesh Patel',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
    currentTitle: 'Principal Security Architect',
    currentCompany: 'Cloudflare',
    previousCompanies: ['Google (Project Zero)', 'Akamai'],
    yearsExperience: 14,
    location: 'London, UK',
    education: 'M.S. in Information Security, Imperial College London',
    skills: ['Zero Trust', 'Cloud Security', 'Rust', 'Go', 'Distributed Systems', 'Low Latency', 'SOC2/ISO'],
    behavioralSignals: [
      { type: 'patent', label: 'Patent Holder (5)', scoreBonus: 10, description: '5 patents in DDoS mitigation and BGP route verification.' },
      { type: 'high_stability', label: 'High Stability', scoreBonus: 8, description: '6 years at Cloudflare securing edge traffic.' }
    ],
    summary: 'Principal security engineer protecting 20% of global web traffic against volumetric DDoS attacks. Pioneer in Rust eBPF kernel packet filtering.',
    achievements: [
      'Architected autonomous DDoS mitigation shield neutralizing 100M+ rps attacks.',
      'Discovered and patched 4 critical CVEs in core TLS libraries.',
      'Advisor to UK National Cyber Security Centre.'
    ],
    patentsCount: 5
  },
  {
    id: 'cand-11',
    name: 'Maya Lin',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    currentTitle: 'Senior AI Agent Engineer',
    currentCompany: 'LangChain / Anthropic Alumni',
    previousCompanies: ['Replit', 'Hugging Face'],
    yearsExperience: 5,
    location: 'San Francisco, CA',
    education: 'B.A. in Cognitive Science, UC Berkeley',
    skills: ['TypeScript', 'Python', 'LLM Orchestration', 'Multi-Agent', 'Prompt Engineering', 'Vector Search'],
    behavioralSignals: [
      { type: 'open_source', label: 'Active Open Source', scoreBonus: 12, description: 'Core contributor to LangGraph agent workflow engine.' },
      { type: 'fast_promotion', label: 'Rising Star', scoreBonus: 10, description: 'One of the most prolific young GenAI engineers in Silicon Valley.' }
    ],
    summary: 'Obsessed with autonomous code repair agents and structured tool orchestration. Authored core streaming tool call middleware.',
    achievements: [
      'Built multi-agent coding sandbox executing 50,000 automated PR fixes.',
      'Featured in Forbes 30 Under 30 Enterprise Technology 2025.',
      'Speaker at AI Engineer World Fair.'
    ],
    githubStats: { repos: 52, stars: 11200, commitsLastYear: 2890 }
  },
  {
    id: 'cand-12',
    name: 'Liam O’Connor',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80',
    currentTitle: 'Staff Backend Engineer',
    currentCompany: 'Snowflake',
    previousCompanies: ['MongoDB', 'Microsoft'],
    yearsExperience: 10,
    location: 'Bellevue, WA',
    education: 'B.S. in Computer Science, Trinity College Dublin',
    skills: ['C++', 'Java', 'Go', 'Distributed Systems', 'Vector DBs', 'Hyper-scale', 'Storage Engines'],
    behavioralSignals: [
      { type: 'scale_expert', label: 'Scale Specialist', scoreBonus: 10, description: 'Key engineer on Snowflake elastic query execution engine.' },
      { type: 'high_stability', label: 'High Stability', scoreBonus: 8, description: 'Reliable execution with zero prod incidents caused over 5 years.' }
    ],
    summary: 'Backend query optimization engineer specializing in columnar storage formats, SIMD vectorized processing, and cloud warehouse elasticity.',
    achievements: [
      'Engineered vectorized SIMD query scanner increasing analytics throughput by 65%.',
      'Optimized cold storage data dehydration saving Snowflake multi-millions in cloud compute.',
      'Granted patent in distributed query scheduling.'
    ],
    patentsCount: 1
  }
];
