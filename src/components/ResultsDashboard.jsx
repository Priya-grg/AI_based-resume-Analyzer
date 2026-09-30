import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Radar, ResponsiveContainer, Tooltip
} from 'recharts';
import confetti from 'canvas-confetti';
import html2canvas from 'html2canvas';
import { Terminal, Sparkles } from 'lucide-react';

const scoreColor = (score) => {
  if (score >= 80) return '#39ff14';
  if (score >= 60) return '#00f0ff';
  if (score >= 40) return '#f5a623';
  return '#ff2d95';
};

const scoreLabel = (score) => {
  if (score >= 90) return 'EXCEPTIONAL';
  if (score >= 80) return 'EXCELLENT';
  if (score >= 70) return 'GOOD';
  if (score >= 60) return 'FAIR';
  if (score >= 40) return 'NEEDS WORK';
  return 'CRITICAL';
};

function AnimatedScore({ value, color }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [value]);

  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (displayValue / 100) * circumference;

  return (
    <div className="relative w-40 h-40 flex-shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
        <motion.circle
          cx="60" cy="60" r="54" fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 2, ease: 'easeOut' }}
          style={{ filter: `drop-shadow(0 0 8px ${color})` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-heading text-4xl" style={{ color }}>{displayValue}</span>
        <span className="font-body text-gray-500 text-sm">/ 100</span>
      </div>
    </div>
  );
}

function TypewriterText({ text, speed = 30 }) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    setDisplayed('');
    let i = 0;
    const interval = setInterval(() => {
      if (i <= text.length) {
        setDisplayed(text.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span>
      {displayed}
      {displayed.length < text.length && <span className="animate-pulse text-neon-cyan">|</span>}
    </span>
  );
}

export default function ResultsDashboard({ analysis, fileName, onReset, onViewAdvanced }) {
  const dashboardRef = useRef(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [confettiFired, setConfettiFired] = useState(false);

  useEffect(() => {
    if (analysis && !confettiFired) {
      setConfettiFired(true);
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00f0ff', '#b347ea', '#ff2d95', '#39ff14'],
        });
      }, 500);
    }
  }, [analysis, confettiFired]);

  const radarData = [
    { category: 'Formatting', value: analysis.formattingScore, fullMark: 100 },
    { category: 'Readability', value: analysis.readabilityScore, fullMark: 100 },
    { category: 'ATS', value: analysis.atsScore, fullMark: 100 },
    { category: 'Experience', value: analysis.experienceScore, fullMark: 100 },
    { category: 'Skills', value: analysis.skillsScore, fullMark: 100 },
    { category: 'Education', value: analysis.educationScore, fullMark: 100 },
  ];

  const handleDownloadReport = async () => {
    if (!dashboardRef.current) return;
    try {
      const canvas = await html2canvas(dashboardRef.current, {
        backgroundColor: '#0a0a0f',
        scale: 2,
      });
      const link = document.createElement('a');
      link.download = `ResumeX_Report_${fileName || 'analysis'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Failed to generate report:', err);
    }
  };

  const handleShareImage = async () => {
    if (!dashboardRef.current) return;
    try {
      const canvas = await html2canvas(dashboardRef.current, {
        backgroundColor: '#0a0a0f',
        scale: 2,
      });
      canvas.toBlob(async (blob) => {
        if (navigator.share && blob) {
          try {
            const file = new File([blob], 'resume-analysis.png', { type: 'image/png' });
            await navigator.share({ files: [file], title: 'My ResumeX Analysis' });
          } catch {
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');
          }
        } else if (blob) {
          const url = URL.createObjectURL(blob);
          window.open(url, '_blank');
        }
      });
    } catch (err) {
      console.error('Failed to share:', err);
    }
  };

  const tabs = [
    { id: 'overview', label: 'OVERVIEW' },
    { id: 'details', label: 'DETAILS' },
    { id: 'suggestions', label: 'ACTION PLAN' },
  ];

  return (
    <motion.div
      ref={dashboardRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-5xl mx-auto"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <Terminal
            className="w-8 h-8 text-[#5ce1e6] animate-pulse"
            style={{ filter: 'drop-shadow(0 0 12px rgba(92,225,230,0.6))' }}
          />
          <h2 className="font-heading text-3xl md:text-4xl text-white">
            ANALYSIS <span className="text-neon-cyan">COMPLETE</span>
          </h2>
          <Sparkles
            className="w-7 h-7 text-[#5ce1e6] animate-pulse"
            style={{ filter: 'drop-shadow(0 0 12px rgba(92,225,230,0.6))' }}
          />
        </div>
        <p className="font-body text-gray-400 text-lg">
          {fileName} • {analysis.source === 'puter-ai' ? 'AI Powered' : 'Demo Mode'} • {(analysis.responseTime / 1000).toFixed(1)}s
        </p>
      </motion.div>

      {/* Overall Score Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-8 mb-6 flex flex-col md:flex-row items-center gap-8"
      >
        <AnimatedScore value={analysis.overallScore} color={scoreColor(analysis.overallScore)} />
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
            <h3 className="font-heading text-2xl text-white">OVERALL SCORE</h3>
            <span
              className="font-heading text-sm px-3 py-1 rounded-full border"
              style={{
                color: scoreColor(analysis.overallScore),
                borderColor: scoreColor(analysis.overallScore) + '40',
                backgroundColor: scoreColor(analysis.overallScore) + '10',
              }}
            >
              {scoreLabel(analysis.overallScore)}
            </span>
          </div>
          <p className="font-body text-gray-400 text-lg leading-relaxed">
            <TypewriterText text={analysis.summary} speed={20} />
          </p>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            data-hoverable
            className={`font-heading text-sm px-6 py-3 rounded-xl transition-all duration-300 whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30'
                : 'bg-dark-700/30 text-gray-500 border border-transparent hover:text-gray-300 hover:border-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Radar Chart */}
            <div className="glass-card p-6">
              <h4 className="font-heading text-lg text-white mb-4">SKILL RADAR</h4>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis
                    dataKey="category"
                    tick={{ fill: '#9ca3af', fontSize: 12, fontFamily: 'Rajdhani' }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 100]}
                    tick={{ fill: '#6b7280', fontSize: 10 }}
                  />
                  <Radar
                    name="Score"
                    dataKey="value"
                    stroke="#00f0ff"
                    fill="#00f0ff"
                    fillOpacity={0.15}
                    strokeWidth={2}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#12121a',
                      border: '1px solid rgba(0,240,255,0.2)',
                      borderRadius: '8px',
                      fontFamily: 'Rajdhani',
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Score Breakdown */}
            <div className="glass-card p-6">
              <h4 className="font-heading text-lg text-white mb-4">SCORE BREAKDOWN</h4>
              <div className="space-y-4">
                {radarData.map((item, i) => (
                  <motion.div
                    key={item.category}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                  >
                    <div className="flex justify-between mb-1">
                      <span className="font-body text-gray-400">{item.category}</span>
                      <span className="font-heading text-sm" style={{ color: scoreColor(item.value) }}>
                        {item.value}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-dark-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: scoreColor(item.value) }}
                        initial={{ width: '0%' }}
                        animate={{ width: `${item.value}%` }}
                        transition={{ duration: 1, delay: 0.1 * i, ease: 'easeOut' }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Strengths */}
            <div className="glass-card p-6">
              <h4 className="font-heading text-lg text-neon-green mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neon-green" />
                STRENGTHS
              </h4>
              <div className="space-y-3">
                {analysis.strengths.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.15 }}
                    className="flex items-start gap-3 p-3 rounded-lg bg-neon-green/5 border border-neon-green/10"
                  >
                    <span className="text-neon-green mt-0.5">✦</span>
                    <span className="font-body text-gray-300">{s}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Weaknesses */}
            <div className="glass-card p-6">
              <h4 className="font-heading text-lg text-neon-pink mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neon-pink" />
                AREAS TO IMPROVE
              </h4>
              <div className="space-y-3">
                {analysis.weaknesses.map((w, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.15 }}
                    className="flex items-start gap-3 p-3 rounded-lg bg-neon-pink/5 border border-neon-pink/10"
                  >
                    <span className="text-neon-pink mt-0.5">⚠</span>
                    <span className="font-body text-gray-300">{w}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* DETAILS TAB */}
        {activeTab === 'details' && (
          <motion.div
            key="details"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Missing Keywords */}
            <div className="glass-card p-6">
              <h4 className="font-heading text-lg text-neon-cyan mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neon-cyan" />
                MISSING ATS KEYWORDS
              </h4>
              <p className="font-body text-gray-500 mb-4">Adding these keywords can improve your ATS compatibility score.</p>
              <div className="flex flex-wrap gap-3">
                {analysis.missingKeywords.map((kw, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * i }}
                    className="font-body px-4 py-2 rounded-lg bg-neon-cyan/5 border border-neon-cyan/20 text-neon-cyan text-sm"
                  >
                    {kw}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Performance Stats */}
            <div className="glass-card p-6">
              <h4 className="font-heading text-lg text-white mb-4">ANALYSIS STATS</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-dark-700/50 rounded-xl p-4 text-center border border-neon-cyan/10">
                  <p className="font-heading text-2xl text-neon-cyan">{(analysis.responseTime / 1000).toFixed(1)}s</p>
                  <p className="font-body text-gray-500 text-sm">RESPONSE TIME</p>
                </div>
                <div className="bg-dark-700/50 rounded-xl p-4 text-center border border-neon-purple/10">
                  <p className="font-heading text-2xl text-neon-purple">{analysis.source === 'puter-ai' ? 'LIVE' : 'DEMO'}</p>
                  <p className="font-body text-gray-500 text-sm">AI SOURCE</p>
                </div>
                <div className="bg-dark-700/50 rounded-xl p-4 text-center border border-neon-green/10">
                  <p className="font-heading text-2xl text-neon-green">{analysis.strengths.length}</p>
                  <p className="font-body text-gray-500 text-sm">STRENGTHS</p>
                </div>
                <div className="bg-dark-700/50 rounded-xl p-4 text-center border border-neon-pink/10">
                  <p className="font-heading text-2xl text-neon-pink">{analysis.suggestions.length}</p>
                  <p className="font-body text-gray-500 text-sm">SUGGESTIONS</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* SUGGESTIONS TAB */}
        {activeTab === 'suggestions' && (
          <motion.div
            key="suggestions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="glass-card p-6">
              <h4 className="font-heading text-lg text-neon-purple mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neon-purple" />
                IMPROVEMENT ROADMAP
              </h4>
              <div className="space-y-4">
                {analysis.suggestions.map((suggestion, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 * i }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-dark-700/30 border border-neon-purple/10 hover:border-neon-purple/30 transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-neon-purple/10 border border-neon-purple/20 flex items-center justify-center">
                      <span className="font-heading text-neon-purple text-sm">{i + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-body text-gray-300 text-lg">{suggestion}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="flex flex-wrap justify-center gap-4 mt-8 mb-12"
      >
        <button onClick={handleDownloadReport} className="glow-btn" data-hoverable>
          📥 Download Report
        </button>
        <button onClick={handleShareImage} className="glow-btn" data-hoverable>
          🔗 Share Results
        </button>
        <button
          onClick={onReset}
          className="glow-btn"
          style={{ borderColor: 'rgba(179,71,234,0.3)', color: '#b347ea' }}
          data-hoverable
        >
          🔄 Analyze Another
        </button>
      </motion.div>

      {/* Advanced Metrics Link */}
      {onViewAdvanced && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="flex justify-center mb-12"
        >
          <button
            onClick={onViewAdvanced}
            data-hoverable
            className="group flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-neon-cyan/5 via-neon-purple/5 to-neon-cyan/5 border border-neon-cyan/15 hover:border-neon-cyan/40 transition-all duration-500 hover:shadow-[0_0_25px_rgba(92,225,230,0.15)]"
          >
            <span className="w-2 h-2 rounded-full bg-neon-purple animate-pulse" />
            <span className="font-heading text-sm text-gray-400 tracking-wider group-hover:text-neon-cyan transition-colors duration-300">
              ACCESS ADVANCED AI METRICS
            </span>
            <span className="font-heading text-neon-cyan/50 group-hover:text-neon-cyan group-hover:translate-x-1 transition-all duration-300">
              →
            </span>
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
