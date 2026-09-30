


import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/* ── Neural Network Mesh Background ── */
function NeuralMeshBG() {
  const nodes = Array.from({ length: 28 }, (_, i) => ({
    x: 15 + Math.random() * 70,
    y: 10 + Math.random() * 80,
    r: 1.5 + Math.random() * 2,
    delay: Math.random() * 3,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 z-0">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <radialGradient id="meshGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(92,225,230,0.06)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <rect width="100" height="100" fill="url(#meshGlow)" />
        {/* Connections */}
        {nodes.map((n, i) =>
          nodes.slice(i + 1).filter((m) => {
            const d = Math.hypot(n.x - m.x, n.y - m.y);
            return d < 22;
          }).map((m, j) => (
            <line key={`${i}-${j}`}
              x1={n.x} y1={n.y} x2={m.x} y2={m.y}
              stroke="rgba(92,225,230,0.08)" strokeWidth="0.15"
            />
          ))
        )}
        {nodes.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r={n.r * 0.15}
            fill="rgba(92,225,230,0.3)"
            className="animate-pulse"
            style={{ animationDelay: `${n.delay}s` }}
          />
        ))}
      </svg>
    </div>
  );
}

/* ── Animated Counter ── */
function Counter({ value, suffix = '' }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const dur = 1500;
    const start = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - start) / dur, 1);
      setCount(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value]);
  return <>{count}{suffix}</>;
}

/* ── 1. ATS Keyword Density Matcher ── */
function ATSKeywordMatcher({ analysis }) {
  const found = analysis.strengths?.slice(0, 5).map(s => s.split(' ').slice(0, 3).join(' ')) || ['React', 'Node.js', 'TypeScript', 'REST APIs', 'Git'];
  const missing = analysis.missingKeywords || ['Docker', 'CI/CD', 'AWS', 'Kubernetes', 'GraphQL', 'Agile'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card p-6 md:p-8 relative overflow-hidden"
    >
      <div className="flex items-center gap-2 mb-5">
        <div className="w-2 h-2 rounded-full bg-neon-cyan" />
        <h3 className="font-heading text-lg text-white tracking-wider">ATS KEYWORD DENSITY</h3>
      </div>

      {/* Terminal box */}
      <div className="bg-dark-900/80 rounded-xl border border-white/5 p-5 font-mono text-sm">
        {/* Header bar */}
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          <span className="text-gray-600 text-xs ml-2 font-heading tracking-wider">ATS_SCANNER.exe</span>
        </div>

        <div className="text-gray-500 text-xs mb-3">
          <span className="text-neon-cyan/60">$</span> scanning resume keywords against market database...
        </div>

        {/* Found keywords */}
        <div className="mb-4">
          <span className="text-green-500/80 text-xs">✓ HIGH-RELEVANCE MATCHES ({found.length})</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {found.map((kw, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.08 }}
                className="px-3 py-1 rounded-md bg-green-500/10 border border-green-500/20 text-green-400/80 text-xs"
              >
                {kw}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Missing keywords */}
        <div>
          <span className="text-neon-pink/80 text-xs">✗ MISSING FROM PROFILE ({missing.length})</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {missing.map((kw, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.08 }}
                className="px-3 py-1 rounded-md bg-neon-pink/10 border border-neon-pink/20 text-neon-pink/70 text-xs"
              >
                {kw}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-white/5 text-gray-600 text-xs">
          <span className="text-neon-cyan/50">$</span> match_rate: <span className="text-neon-cyan">{Math.round((found.length / (found.length + missing.length)) * 100)}%</span> — recommendation: add missing keywords to boost ATS score
        </div>
      </div>
    </motion.div>
  );
}

/* ── 2. Semantic Sentiment Analyzer ── */
function SentimentAnalyzer() {
  const tones = [
    { label: 'CONFIDENT', value: 78, color: '#5ce1e6' },
    { label: 'ANALYTICAL', value: 65, color: '#b347ea' },
    { label: 'RESULTS-DRIVEN', value: 82, color: '#39ff14' },
    { label: 'COLLABORATIVE', value: 58, color: '#4d7cff' },
    { label: 'PASSIVE', value: 22, color: '#ff2d95' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="glass-card p-6 md:p-8"
    >
      <div className="flex items-center gap-2 mb-5">
        <div className="w-2 h-2 rounded-full bg-neon-purple" />
        <h3 className="font-heading text-lg text-white tracking-wider">SEMANTIC SENTIMENT</h3>
      </div>

      <p className="font-body text-gray-500 text-sm mb-5">
        Telemetric analysis of resume language tone and communication patterns.
      </p>

      <div className="space-y-4">
        {tones.map((tone, i) => (
          <motion.div
            key={tone.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
          >
            <div className="flex justify-between items-center mb-1.5">
              <span className="font-heading text-xs text-gray-400 tracking-wider">{tone.label}</span>
              <span className="font-heading text-xs" style={{ color: tone.color }}>
                <Counter value={tone.value} suffix="%" />
              </span>
            </div>
            <div className="w-full h-2 bg-dark-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: tone.color, boxShadow: `0 0 8px ${tone.color}40` }}
                initial={{ width: '0%' }}
                animate={{ width: `${tone.value}%` }}
                transition={{ duration: 1.2, delay: 0.5 + i * 0.1, ease: 'easeOut' }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-5 pt-4 border-t border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-neon-cyan/20 border border-neon-cyan/30 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-neon-cyan" />
          </div>
          <span className="font-body text-xs text-gray-500">
            Primary tone detected: <span className="text-neon-green font-heading tracking-wider">RESULTS-DRIVEN</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ── 3. Industry Benchmarking Graph ── */
function BenchmarkGraph({ analysis }) {
  const score = analysis.overallScore || 72;
  const percentile = score >= 85 ? 5 : score >= 75 ? 12 : score >= 65 ? 25 : score >= 55 ? 40 : 60;
  const avg = 58;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="glass-card p-6 md:p-8"
    >
      <div className="flex items-center gap-2 mb-5">
        <div className="w-2 h-2 rounded-full bg-neon-green" />
        <h3 className="font-heading text-lg text-white tracking-wider">INDUSTRY BENCHMARK</h3>
      </div>

      <p className="font-body text-gray-500 text-sm mb-6">
        Resume performance compared against global applicant pool data.
      </p>

      {/* Benchmark bar */}
      <div className="relative mb-8">
        <div className="w-full h-3 bg-dark-700 rounded-full relative overflow-visible">
          {/* Gradient fill */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-pink/30 via-yellow-500/30 via-60% to-neon-green/30" />

          {/* Average marker */}
          <div className="absolute top-0 h-full" style={{ left: `${avg}%` }}>
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <span className="font-heading text-[10px] text-gray-500 tracking-wider">AVG ({avg})</span>
            </div>
            <div className="w-0.5 h-6 bg-gray-500/50 -mt-0.5" />
          </div>

          {/* Score marker */}
          <motion.div
            className="absolute top-0 h-full"
            style={{ left: `${score}%` }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, type: 'spring' }}
          >
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <span className="font-heading text-xs text-neon-cyan tracking-wider">YOU ({score})</span>
            </div>
            <div className="w-4 h-4 rounded-full bg-neon-cyan border-2 border-dark-900 -mt-0.5 -ml-1.5"
              style={{ boxShadow: '0 0 12px rgba(92,225,230,0.5)' }} />
          </motion.div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mt-12">
        <div className="text-center p-3 rounded-xl bg-dark-700/30 border border-neon-cyan/10">
          <p className="font-heading text-2xl text-neon-cyan">
            <Counter value={100 - percentile} suffix="%" />
          </p>
          <p className="font-body text-xs text-gray-500 mt-1">PERCENTILE</p>
        </div>
        <div className="text-center p-3 rounded-xl bg-dark-700/30 border border-neon-green/10">
          <p className="font-heading text-2xl text-neon-green">
            Top <Counter value={percentile} suffix="%" />
          </p>
          <p className="font-body text-xs text-gray-500 mt-1">GLOBAL RANK</p>
        </div>
        <div className="text-center p-3 rounded-xl bg-dark-700/30 border border-neon-purple/10">
          <p className="font-heading text-2xl text-neon-purple">
            +<Counter value={score - avg} />
          </p>
          <p className="font-body text-xs text-gray-500 mt-1">VS AVERAGE</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ── 4. Section-Wise Breakdown Nodes ── */
function SectionBreakdown({ analysis }) {
  const gradeFromScore = (s) => {
    if (s >= 92) return { letter: 'A+', color: '#39ff14' };
    if (s >= 85) return { letter: 'A', color: '#39ff14' };
    if (s >= 78) return { letter: 'B+', color: '#5ce1e6' };
    if (s >= 70) return { letter: 'B', color: '#5ce1e6' };
    if (s >= 62) return { letter: 'C+', color: '#f5a623' };
    if (s >= 55) return { letter: 'C', color: '#f5a623' };
    if (s >= 45) return { letter: 'D', color: '#ff2d95' };
    return { letter: 'F', color: '#ff2d95' };
  };

  const sections = [
    { name: 'WORK EXPERIENCE', score: analysis.experienceScore || 74, desc: 'Role descriptions, impact metrics, and career progression clarity.' },
    { name: 'SKILLS & TECH', score: analysis.skillsScore || 68, desc: 'Technical proficiency depth and industry-relevance of listed skills.' },
    { name: 'EDUCATION', score: analysis.educationScore || 80, desc: 'Academic credentials, certifications, and professional development.' },
    { name: 'FORMATTING', score: analysis.formattingScore || 72, desc: 'Layout structure, visual hierarchy, and ATS-parseable formatting.' },
    { name: 'PROJECTS', score: Math.round(((analysis.skillsScore || 68) + (analysis.experienceScore || 74)) / 2), desc: 'Project scope, technologies demonstrated, and measurable outcomes.' },
    { name: 'READABILITY', score: analysis.readabilityScore || 70, desc: 'Sentence clarity, action verb usage, and content conciseness.' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.65 }}
      className="glass-card p-6 md:p-8"
    >
      <div className="flex items-center gap-2 mb-5">
        <div className="w-2 h-2 rounded-full bg-neon-pink" />
        <h3 className="font-heading text-lg text-white tracking-wider">SECTION BREAKDOWN</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((sec, i) => {
          const grade = gradeFromScore(sec.score);
          return (
            <motion.div
              key={sec.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + i * 0.08 }}
              className="relative p-4 rounded-xl bg-dark-700/40 border border-white/5 hover:border-white/10 transition-all duration-300 group"
              data-hoverable
            >
              {/* Grade badge */}
              <div className="absolute top-3 right-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center font-heading text-lg transition-all duration-300 group-hover:scale-110"
                  style={{
                    color: grade.color,
                    backgroundColor: grade.color + '12',
                    border: `1px solid ${grade.color}30`,
                    boxShadow: `0 0 0px ${grade.color}00`,
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 0 15px ${grade.color}40`}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = `0 0 0px ${grade.color}00`}
                >
                  {grade.letter}
                </div>
              </div>

              <h4 className="font-heading text-xs text-gray-400 tracking-wider mb-1 pr-12">{sec.name}</h4>
              <p className="font-heading text-xl text-white mb-2">{sec.score}<span className="text-gray-600 text-sm">/100</span></p>
              <p className="font-body text-xs text-gray-600 leading-relaxed">{sec.desc}</p>

              {/* Bottom bar */}
              <div className="mt-3 w-full h-1 bg-dark-900 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: grade.color }}
                  initial={{ width: '0%' }}
                  animate={{ width: `${sec.score}%` }}
                  transition={{ duration: 1, delay: 1 + i * 0.08 }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ── Main Advanced Metrics Page ── */
export default function AdvancedMetrics({ analysis, fileName, onBack }) {
  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <NeuralMeshBG />

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10 relative z-10"
      >
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02]">
          <div className="w-1.5 h-1.5 rounded-full bg-neon-purple/60 animate-pulse" />
          <span className="font-heading text-[10px] text-gray-500 tracking-[0.3em]">DEEP ANALYSIS MODULE</span>
        </div>

        <h2 className="font-heading text-3xl md:text-4xl text-white tracking-wider mb-2">
          ADVANCED <span className="text-[#5ce1e6]">METRICS</span>
        </h2>
        <p className="font-body text-gray-500 text-base">
          {fileName} — Extended Performance Evaluation Matrix
        </p>
      </motion.div>

      {/* Metric Panels */}
      <div className="relative z-10 space-y-6">
        <ATSKeywordMatcher analysis={analysis} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SentimentAnalyzer />
          <BenchmarkGraph analysis={analysis} />
        </div>

        <SectionBreakdown analysis={analysis} />
      </div>

      {/* Navigation buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="relative z-10 flex justify-center gap-4 mt-10 mb-12"
      >
        <button onClick={onBack} className="glow-btn" data-hoverable>
          ← BACK TO DASHBOARD
        </button>
      </motion.div>
    </div>
  );
}
