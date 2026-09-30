

import { motion } from 'framer-motion';

/**
 * AIResumeVisuals — Futuristic AI-themed images for the dashboard
 *
 * 1. HeroResumeImage   — The generated holographic resume image (upload area)
 * 2. AIBrainScanVisual — SVG-based neural brain scanning a document
 * 3. DashboardGlowVisual — SVG-based holographic score panel
 */

/* ───────────────────────────────────────────
   1. Hero Resume Image — generated AI image
   ─────────────────────────────────────────── */

   export function HeroResumeImage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative w-full max-w-xl mx-auto mb-10"
    >
      <div className="relative rounded-2xl overflow-hidden border border-neon-cyan/10">
        {/* Glow backdrop */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent z-10" />
        <div className="absolute -inset-1 bg-gradient-to-r from-neon-cyan/5 via-neon-purple/5 to-neon-cyan/5 blur-xl" />
        <img
          src="/hero-resume.png"
          alt="AI-powered resume analysis hologram"
          className="w-full h-48 md:h-56 object-cover opacity-70"
          loading="lazy"
        />
        {/* Scanline overlay on image */}
        <div className="absolute inset-0 z-20 pointer-events-none" style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(92,225,230,0.02) 3px, rgba(92,225,230,0.02) 6px)'
        }} />
      </div>
    </motion.div>
  );
}

/* ───────────────────────────────────────────
   2. AI Brain Scan Visual — SVG animated brain
   ─────────────────────────────────────────── */
export function AIBrainScanVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative w-full max-w-xs mx-auto"
    >
      <svg viewBox="0 0 300 220" fill="none" className="w-full animate-holo-pulse">
        {/* Background glow */}
        <defs>
          <radialGradient id="brainGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(92,225,230,0.12)" />
            <stop offset="100%" stopColor="rgba(92,225,230,0)" />
          </radialGradient>
          <linearGradient id="docGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(92,225,230,0.2)" />
            <stop offset="100%" stopColor="rgba(92,225,230,0.02)" />
          </linearGradient>
        </defs>
        <ellipse cx="150" cy="110" rx="140" ry="100" fill="url(#brainGlow)" />

        {/* Document shape — left */}
        <rect x="30" y="50" width="80" height="110" rx="4" fill="url(#docGrad)" stroke="rgba(92,225,230,0.2)" strokeWidth="1" />
        {/* Doc lines */}
        <line x1="42" y1="70" x2="98" y2="70" stroke="rgba(92,225,230,0.15)" strokeWidth="2" />
        <line x1="42" y1="82" x2="90" y2="82" stroke="rgba(92,225,230,0.1)" strokeWidth="1.5" />
        <line x1="42" y1="92" x2="95" y2="92" stroke="rgba(92,225,230,0.1)" strokeWidth="1.5" />
        <line x1="42" y1="102" x2="80" y2="102" stroke="rgba(92,225,230,0.08)" strokeWidth="1.5" />
        <line x1="42" y1="112" x2="88" y2="112" stroke="rgba(92,225,230,0.08)" strokeWidth="1.5" />
        <line x1="42" y1="122" x2="75" y2="122" stroke="rgba(92,225,230,0.06)" strokeWidth="1.5" />
        <line x1="42" y1="132" x2="92" y2="132" stroke="rgba(92,225,230,0.06)" strokeWidth="1.5" />
        {/* Doc corner fold */}
        <path d="M90 50 L110 50 L110 70 L90 50Z" fill="rgba(92,225,230,0.08)" stroke="rgba(92,225,230,0.15)" strokeWidth="0.5" />

        {/* Data stream lines — doc to brain */}
        <path d="M110 80 Q135 75 155 65" stroke="rgba(92,225,230,0.2)" strokeWidth="1" strokeDasharray="4 3" className="animate-data-stream" fill="none" />
        <path d="M110 100 Q140 95 160 85" stroke="rgba(92,225,230,0.15)" strokeWidth="0.8" strokeDasharray="3 4" className="animate-data-stream" fill="none" />
        <path d="M110 120 Q145 115 165 105" stroke="rgba(92,225,230,0.12)" strokeWidth="0.8" strokeDasharray="3 5" className="animate-data-stream" fill="none" />

        {/* Brain shape — right side */}
        {/* Left hemisphere */}
        <path
          d="M180 50 C155 50, 145 70, 150 90 C145 105, 155 125, 175 130 C170 140, 180 150, 195 148"
          stroke="rgba(92,225,230,0.3)" strokeWidth="1.5" fill="none" strokeLinecap="round"
        />
        {/* Right hemisphere */}
        <path
          d="M200 45 C225 48, 240 65, 235 85 C242 100, 232 120, 215 128 C222 138, 212 150, 195 148"
          stroke="rgba(92,225,230,0.3)" strokeWidth="1.5" fill="none" strokeLinecap="round"
        />
        {/* Center fissure */}
        <path d="M195 48 C192 70, 198 100, 195 148" stroke="rgba(92,225,230,0.15)" strokeWidth="1" fill="none" />

        {/* Neural nodes in brain */}
        <circle cx="170" cy="75" r="3" fill="rgba(92,225,230,0.4)" className="animate-pulse" />
        <circle cx="185" cy="65" r="2.5" fill="rgba(92,225,230,0.3)" className="animate-pulse" style={{animationDelay: '0.3s'}} />
        <circle cx="210" cy="70" r="3" fill="rgba(92,225,230,0.4)" className="animate-pulse" style={{animationDelay: '0.6s'}} />
        <circle cx="225" cy="85" r="2.5" fill="rgba(92,225,230,0.3)" className="animate-pulse" style={{animationDelay: '0.9s'}} />
        <circle cx="195" cy="95" r="4" fill="rgba(92,225,230,0.5)" className="animate-pulse" style={{animationDelay: '0.2s'}} />
        <circle cx="160" cy="100" r="2.5" fill="rgba(92,225,230,0.3)" className="animate-pulse" style={{animationDelay: '0.5s'}} />
        <circle cx="220" cy="105" r="2.5" fill="rgba(92,225,230,0.3)" className="animate-pulse" style={{animationDelay: '0.8s'}} />
        <circle cx="180" cy="120" r="3" fill="rgba(92,225,230,0.4)" className="animate-pulse" style={{animationDelay: '0.4s'}} />
        <circle cx="205" cy="118" r="3" fill="rgba(92,225,230,0.4)" className="animate-pulse" style={{animationDelay: '0.7s'}} />

        {/* Neural connections */}
        <line x1="170" y1="75" x2="185" y2="65" stroke="rgba(92,225,230,0.15)" strokeWidth="0.5" />
        <line x1="185" y1="65" x2="210" y2="70" stroke="rgba(92,225,230,0.15)" strokeWidth="0.5" />
        <line x1="210" y1="70" x2="225" y2="85" stroke="rgba(92,225,230,0.15)" strokeWidth="0.5" />
        <line x1="195" y1="95" x2="170" y2="75" stroke="rgba(92,225,230,0.12)" strokeWidth="0.5" />
        <line x1="195" y1="95" x2="210" y2="70" stroke="rgba(92,225,230,0.12)" strokeWidth="0.5" />
        <line x1="195" y1="95" x2="225" y2="85" stroke="rgba(92,225,230,0.12)" strokeWidth="0.5" />
        <line x1="195" y1="95" x2="160" y2="100" stroke="rgba(92,225,230,0.12)" strokeWidth="0.5" />
        <line x1="195" y1="95" x2="220" y2="105" stroke="rgba(92,225,230,0.12)" strokeWidth="0.5" />
        <line x1="180" y1="120" x2="195" y2="95" stroke="rgba(92,225,230,0.1)" strokeWidth="0.5" />
        <line x1="205" y1="118" x2="195" y2="95" stroke="rgba(92,225,230,0.1)" strokeWidth="0.5" />
        <line x1="180" y1="120" x2="160" y2="100" stroke="rgba(92,225,230,0.08)" strokeWidth="0.5" />
        <line x1="205" y1="118" x2="220" y2="105" stroke="rgba(92,225,230,0.08)" strokeWidth="0.5" />

        {/* Scan pulse ring around brain */}
        <circle
          cx="195" cy="95" r="55"
          fill="none" stroke="rgba(92,225,230,0.08)" strokeWidth="0.8"
          strokeDasharray="5 7"
          className="animate-spin-slow"
          style={{ transformOrigin: '195px 95px' }}
        />

        {/* Label */}
        <text x="150" y="195" textAnchor="middle" fill="rgba(92,225,230,0.2)" fontSize="8" fontFamily="Orbitron, sans-serif" letterSpacing="4">
          AI ANALYSIS
        </text>
      </svg>
    </motion.div>
  );
}

/* ───────────────────────────────────────────
   3. Dashboard Glow Visual — holographic scores
   ─────────────────────────────────────────── */
export function DashboardGlowVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="relative w-full max-w-xs mx-auto"
    >
      <svg viewBox="0 0 280 180" fill="none" className="w-full animate-holo-pulse" style={{ animationDelay: '1s' }}>
        <defs>
          <radialGradient id="dashGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(179,71,234,0.08)" />
            <stop offset="100%" stopColor="rgba(92,225,230,0)" />
          </radialGradient>
        </defs>
        <rect x="0" y="0" width="280" height="180" rx="12" fill="url(#dashGlow)" />

        {/* Panel frame */}
        <rect x="10" y="10" width="260" height="160" rx="8" fill="rgba(92,225,230,0.02)" stroke="rgba(92,225,230,0.1)" strokeWidth="0.8" />

        {/* Mini bar chart */}
        <rect x="30" y="110" width="16" height="40" rx="2" fill="rgba(92,225,230,0.15)" stroke="rgba(92,225,230,0.2)" strokeWidth="0.5" />
        <rect x="55" y="85" width="16" height="65" rx="2" fill="rgba(92,225,230,0.2)" stroke="rgba(92,225,230,0.25)" strokeWidth="0.5" />
        <rect x="80" y="70" width="16" height="80" rx="2" fill="rgba(92,225,230,0.25)" stroke="rgba(92,225,230,0.3)" strokeWidth="0.5" />
        <rect x="105" y="95" width="16" height="55" rx="2" fill="rgba(92,225,230,0.18)" stroke="rgba(92,225,230,0.22)" strokeWidth="0.5" />
        <rect x="130" y="60" width="16" height="90" rx="2" fill="rgba(92,225,230,0.3)" stroke="rgba(92,225,230,0.35)" strokeWidth="0.5" />

        {/* Mini radar shape */}
        <polygon
          points="210,40 240,60 240,90 210,110 180,90 180,60"
          fill="rgba(92,225,230,0.05)"
          stroke="rgba(92,225,230,0.15)"
          strokeWidth="0.8"
        />
        <polygon
          points="210,55 228,65 228,85 210,95 192,85 192,65"
          fill="rgba(92,225,230,0.08)"
          stroke="rgba(92,225,230,0.2)"
          strokeWidth="0.5"
        />
        {/* Radar data shape */}
        <polygon
          points="210,48 235,62 230,88 210,100 188,82 185,58"
          fill="rgba(92,225,230,0.06)"
          stroke="#5ce1e6"
          strokeWidth="1"
          strokeOpacity="0.3"
        />
        <circle cx="210" cy="75" r="2" fill="rgba(92,225,230,0.4)" />

        {/* Score circle */}
        <circle cx="210" cy="145" r="18" fill="none" stroke="rgba(92,225,230,0.1)" strokeWidth="3" />
        <circle
          cx="210" cy="145" r="18"
          fill="none" stroke="#5ce1e6" strokeWidth="3"
          strokeDasharray="82" strokeDashoffset="25"
          strokeLinecap="round"
          opacity="0.3"
        />
        <text x="210" y="149" textAnchor="middle" fill="rgba(92,225,230,0.35)" fontSize="10" fontFamily="Orbitron, sans-serif">
          78
        </text>

        {/* Metric lines top */}
        <line x1="25" y1="30" x2="90" y2="30" stroke="rgba(92,225,230,0.1)" strokeWidth="1" />
        <line x1="25" y1="40" x2="70" y2="40" stroke="rgba(92,225,230,0.07)" strokeWidth="1" />
        <line x1="25" y1="50" x2="80" y2="50" stroke="rgba(92,225,230,0.05)" strokeWidth="1" />

        {/* Corner brackets */}
        <path d="M12 22 L12 12 L22 12" stroke="rgba(92,225,230,0.2)" strokeWidth="1" fill="none" />
        <path d="M268 22 L268 12 L258 12" stroke="rgba(92,225,230,0.2)" strokeWidth="1" fill="none" />
        <path d="M12 158 L12 168 L22 168" stroke="rgba(92,225,230,0.2)" strokeWidth="1" fill="none" />
        <path d="M268 158 L268 168 L258 168" stroke="rgba(92,225,230,0.2)" strokeWidth="1" fill="none" />

        {/* Label */}
        <text x="140" y="177" textAnchor="middle" fill="rgba(92,225,230,0.15)" fontSize="7" fontFamily="Orbitron, sans-serif" letterSpacing="3">
          SCORE MATRIX
        </text>
      </svg>
    </motion.div>
  );
}
