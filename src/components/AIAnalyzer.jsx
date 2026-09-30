

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ScanText,
  BrainCircuit,
  Target,
  Bot,
  LineChart,
  Award,
} from 'lucide-react';

/* ── Glow-wrapped icon component ── */
function GlowIcon({ Icon, color, size = 28 }) {
  return (
    <div
      className="flex items-center justify-center animate-pulse"
      style={{ filter: `drop-shadow(0 0 6px ${color}) drop-shadow(0 0 12px ${color}50)` }}
    >
      <Icon size={size} color={color} strokeWidth={1.8} />
    </div>
  );
}

const analysisStages = [
  {
    label: 'SCANNING DOCUMENT',
    icon: (props) => <GlowIcon Icon={ScanText} color="#5ce1e6" {...props} />,
    duration: 15,
  },
  {
    label: 'ANALYZING CONTENT',
    icon: (props) => <GlowIcon Icon={BrainCircuit} color="#e0e0e0" {...props} />,
    duration: 30,
  },
  {
    label: 'EVALUATING SKILLS',
    icon: (props) => <GlowIcon Icon={Target} color="#f5a623" {...props} />,
    duration: 50,
  },
  {
    label: 'CHECKING ATS COMPATIBILITY',
    icon: (props) => <GlowIcon Icon={Bot} color="#4d7cff" {...props} />,
    duration: 70,
  },
  {
    label: 'GENERATING INSIGHTS',
    icon: (props) => <GlowIcon Icon={LineChart} color="#b347ea" {...props} />,
    duration: 85,
  },
  {
    label: 'COMPILING RESULTS',
    icon: (props) => <GlowIcon Icon={Award} color="#39ff14" {...props} />,
    duration: 95,
  },
];

export default function AIAnalyzer({ isAnalyzing, progress }) {
  const [currentStage, setCurrentStage] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [statValues, setStatValues] = useState({
    tokens: 0,
    accuracy: 0,
    modules: 0,
  });

  useEffect(() => {
    if (!isAnalyzing) {
      setCurrentStage(0);
      setDisplayedText('');
      return;
    }

    const stageIndex = analysisStages.findIndex(s => progress < s.duration);
    setCurrentStage(stageIndex === -1 ? analysisStages.length - 1 : stageIndex);
  }, [isAnalyzing, progress]);

  // Typing effect for current stage
  useEffect(() => {
    if (!isAnalyzing) return;
    const text = analysisStages[currentStage]?.label || '';
    setDisplayedText('');
    let i = 0;
    const interval = setInterval(() => {
      if (i <= text.length) {
        setDisplayedText(text.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [currentStage, isAnalyzing]);

  // Animate stat counters
  useEffect(() => {
    if (!isAnalyzing) return;
    const interval = setInterval(() => {
      setStatValues({
        tokens: Math.floor(Math.random() * 500) + progress * 20,
        accuracy: Math.min(99.9, (progress * 1.05)).toFixed(1),
        modules: Math.min(6, Math.floor(progress / 16) + 1),
      });
    }, 200);
    return () => clearInterval(interval);
  }, [isAnalyzing, progress]);

  if (!isAnalyzing) return null;

  const StageIcon = analysisStages[currentStage]?.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl mx-auto mt-8"
    >
      <div className="glass-card p-8">
        {/* Header */}
        <div className="flex items-center justify-center mb-8">
          <div className="relative">
            {/* Spinning hex border */}
            <div className="w-24 h-24 relative">
              <svg viewBox="0 0 100 100" className="w-full h-full animate-hex-spin">
                <circle cx="50" cy="50" r="45" fill="none" stroke="url(#analyzerGradient)" strokeWidth="2" strokeDasharray="8 4" />
                <defs>
                  <linearGradient id="analyzerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00f0ff" />
                    <stop offset="50%" stopColor="#b347ea" />
                    <stop offset="100%" stopColor="#ff2d95" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                {StageIcon && <StageIcon size={32} />}
              </div>
            </div>
          </div>
        </div>

        {/* Stage label with typing effect */}
        <div className="text-center mb-6">
          <h3 className="font-heading text-xl text-neon-cyan animate-text-glow tracking-widest">
            {displayedText}
            <span className="animate-pulse">_</span>
          </h3>
        </div>

        {/* Progress bar */}
        <div className="relative mb-8">
          <div className="w-full h-3 bg-dark-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full relative"
              style={{
                background: 'linear-gradient(90deg, #00f0ff, #b347ea, #ff2d95)',
              }}
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <div className="absolute inset-0 animate-shimmer" />
            </motion.div>
          </div>
          <div className="flex justify-between mt-2">
            <span className="font-body text-gray-500 text-sm">Progress</span>
            <span className="font-heading text-neon-cyan text-sm">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-dark-700/50 rounded-xl p-4 text-center border border-neon-cyan/10">
            <p className="font-heading text-2xl text-neon-cyan">{statValues.tokens}</p>
            <p className="font-body text-gray-500 text-sm">TOKENS</p>
          </div>
          <div className="bg-dark-700/50 rounded-xl p-4 text-center border border-neon-purple/10">
            <p className="font-heading text-2xl text-neon-purple">{statValues.accuracy}%</p>
            <p className="font-body text-gray-500 text-sm">ACCURACY</p>
          </div>
          <div className="bg-dark-700/50 rounded-xl p-4 text-center border border-neon-pink/10">
            <p className="font-heading text-2xl text-neon-pink">{statValues.modules}/6</p>
            <p className="font-body text-gray-500 text-sm">MODULES</p>
          </div>
        </div>

        {/* Stage indicators */}
        <div className="mt-6 flex justify-center gap-2">
          {analysisStages.map((stage, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i < currentStage
                  ? 'bg-neon-green w-3'
                  : i === currentStage
                  ? 'bg-neon-cyan animate-pulse w-4'
                  : 'bg-dark-600 w-2'
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
