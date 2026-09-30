import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Circuit Blueprint SVG ── */
function CircuitBlueprint({ side = 'right' }) {
  return (
    <div className={`absolute top-0 bottom-0 ${side === 'right' ? 'right-0 translate-x-1/3' : 'left-0 -translate-x-1/3'} w-48 pointer-events-none`}>
      <svg viewBox="0 0 180 260" fill="none" className="w-full h-full opacity-40">
        <line x1="90" y1="10" x2="90" y2="250" stroke="rgba(92,225,230,0.12)" strokeWidth="0.8" />
        {[30, 60, 90, 120, 150, 180, 210].map((y, i) => (
          <g key={y}>
            <line x1={i % 2 === 0 ? 20 : 50} y1={y} x2={i % 2 === 0 ? 80 : 90} y2={y} stroke="rgba(92,225,230,0.1)" strokeWidth="0.6" />
            <line x1={i % 2 === 0 ? 100 : 90} y1={y} x2={i % 2 === 0 ? 160 : 130} y2={y} stroke="rgba(92,225,230,0.1)" strokeWidth="0.6" />
            <circle cx={i % 2 === 0 ? 80 : 90} cy={y} r="2" fill="rgba(92,225,230,0.15)" />
          </g>
        ))}
        <rect x="60" y="95" width="60" height="40" rx="3" fill="rgba(92,225,230,0.04)" stroke="rgba(92,225,230,0.15)" strokeWidth="0.8" />
        <circle cx="90" cy="115" r="3" fill="rgba(92,225,230,0.2)" />
        <circle cx="90" cy="115" r="1.2" fill="#5ce1e6" opacity="0.5" />
        {[68, 78, 88, 98, 108].map((x) => (
          <g key={x}>
            <line x1={x} y1="95" x2={x} y2="85" stroke="rgba(92,225,230,0.12)" strokeWidth="0.6" />
            <line x1={x} y1="135" x2={x} y2="145" stroke="rgba(92,225,230,0.12)" strokeWidth="0.6" />
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ── Tech Stack Badge ── */
function TechBadge({ label }) {
  return (
    <span className="inline-block px-2.5 py-1 rounded-md bg-neon-cyan/5 border border-neon-cyan/15 text-[11px] font-heading text-neon-cyan/70 tracking-wider">
      {label}
    </span>
  );
}

/* ── Developer Tech Card ── */
function DevCard({ name, role, avatar, responsibilities, techStack, index }) {
  const [isHovered, setIsHovered] = useState(false);

  const accentColors = ['#5ce1e6', '#b347ea', '#39ff14'];
  const accent = accentColors[index % 3];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-hoverable
      className={`relative overflow-hidden rounded-xl transition-all duration-500 ease-out
        bg-white/[0.03] backdrop-blur-md
        ${isHovered
          ? `border shadow-[0_0_25px_${accent}30]`
          : 'border border-white/[0.08]'
        }`}
      style={isHovered ? { borderColor: accent, boxShadow: `0 0 25px ${accent}25, 0 0 50px ${accent}08` } : {}}
    >
      {/* Circuit blueprint slide-in */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: index % 2 === 0 ? 40 : -40 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 pointer-events-none z-0"
          >
            <CircuitBlueprint side={index % 2 === 0 ? 'right' : 'left'} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 p-6 md:p-8">
        {/* Top — status */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="absolute inline-flex h-3 w-3 rounded-full animate-ping" style={{ backgroundColor: accent + '60' }} />
              <span className="relative inline-flex h-3 w-3 rounded-full" style={{ backgroundColor: accent }} />
            </div>
            <span className="font-heading text-[10px] text-gray-600 tracking-[0.2em]">
              NODE-{String(index + 1).padStart(2, '0')} // ACTIVE
            </span>
          </div>
          <span className="font-heading text-[9px] tracking-[0.2em] px-2 py-1 rounded-md border"
            style={{ color: accent, borderColor: accent + '30', backgroundColor: accent + '08' }}>
            {avatar}
          </span>
        </div>

        {/* Name & role */}
        <h3 className={`font-heading text-xl md:text-2xl tracking-wider mb-1 transition-colors duration-300`}
          style={{ color: isHovered ? accent : '#fff' }}>
          {name}
        </h3>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent + '80' }} />
          <span className="font-body text-sm tracking-wide" style={{ color: accent + 'aa' }}>
            {role}
          </span>
        </div>

        {/* Responsibilities */}
        <div className="mb-5">
          <span className="font-heading text-[10px] text-gray-600 tracking-[0.2em] block mb-3">CORE RESPONSIBILITIES</span>
          <ul className="space-y-2">
            {responsibilities.map((r, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-xs mt-0.5" style={{ color: accent }}>▸</span>
                <span className="font-body text-sm text-gray-400 leading-relaxed">{r}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech stack */}
        <div>
          <span className="font-heading text-[10px] text-gray-600 tracking-[0.2em] block mb-2">TECH STACK</span>
          <div className="flex flex-wrap gap-1.5">
            {techStack.map((t) => <TechBadge key={t} label={t} />)}
          </div>
        </div>

        {/* Bottom label */}
        <div className={`mt-5 pt-3 border-t transition-colors duration-300`}
          style={{ borderColor: isHovered ? accent + '20' : 'rgba(255,255,255,0.05)' }}>
          <span className="font-heading text-[9px] text-gray-700 tracking-[0.25em]">
            CLEARANCE: FULL-STACK ◆ STATUS: DEPLOYED
          </span>
        </div>
      </div>

      {/* Corner accents */}
      <div className={`absolute top-0 right-0 w-12 h-12 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
          <path d="M48 0 L48 16 L32 16" stroke={accent + '50'} strokeWidth="1" fill="none" />
        </svg>
      </div>
      <div className={`absolute bottom-0 left-0 w-12 h-12 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
          <path d="M0 48 L0 32 L16 32" stroke={accent + '50'} strokeWidth="1" fill="none" />
        </svg>
      </div>
    </motion.div>
  );
}

/* ── Architecture Diagram ── */
function ArchDiagram() {
  const layers = [
    { label: 'USER INTERFACE', items: ['React 19', 'Framer Motion', 'Three.js'], color: '#5ce1e6' },
    { label: 'ANALYSIS ENGINE', items: ['Puter AI API', 'pdfjs-dist', 'Prompt Schema'], color: '#b347ea' },
    { label: 'DATA LAYER', items: ['LocalStorage', 'JSON Pipeline', 'html2canvas'], color: '#39ff14' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="glass-card p-6 md:p-8"
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2 h-2 rounded-full bg-neon-cyan" />
        <h3 className="font-heading text-lg text-white tracking-wider">SYSTEM ARCHITECTURE</h3>
      </div>

      <div className="space-y-4">
        {layers.map((layer, i) => (
          <motion.div
            key={layer.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 + i * 0.15 }}
            className="flex items-stretch gap-4"
          >
            {/* Layer label */}
            <div className="w-40 flex-shrink-0 p-3 rounded-lg border flex items-center"
              style={{ borderColor: layer.color + '25', backgroundColor: layer.color + '08' }}>
              <span className="font-heading text-[11px] tracking-wider" style={{ color: layer.color }}>
                {layer.label}
              </span>
            </div>

            {/* Connector */}
            <div className="flex items-center">
              <div className="w-6 h-px" style={{ backgroundColor: layer.color + '30' }} />
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: layer.color + '40' }} />
            </div>

            {/* Items */}
            <div className="flex-1 flex flex-wrap items-center gap-2">
              {layer.items.map((item) => (
                <span key={item} className="px-3 py-1.5 rounded-md bg-dark-700/50 border border-white/5 font-body text-xs text-gray-400">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Flow arrows */}
      <div className="flex justify-center my-2">
        <div className="flex flex-col items-center gap-1 py-2">
          {[0, 1].map((i) => (
            <div key={i} className="w-px h-3 bg-gradient-to-b from-neon-cyan/20 to-neon-purple/20" />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────
   Main About Page — DEVELOPER LAB & TECH ARCHITECTURE
   ────────────────────────────────────────────────── */
export default function AboutPage({ onNavigate }) {
  const creators = [
    {
      name: 'Kirandeep Kaur',
      role: 'Lead AI Architecture & Data Pipeline',
      avatar: '◈ ARCH',
      responsibilities: [
        'Designed LLM prompting schemas and structured JSON response formatting for AI analysis.',
        'Built the ATS evaluation model with multi-parameter scoring algorithms.',
        'Engineered the data pipeline from PDF extraction through AI processing to result rendering.',
      ],
      techStack: ['Puter AI', 'pdfjs-dist', 'JSON Schema', 'Prompt Engineering'],
    },
    {
      name: 'Vansh',
      role: 'Frontend Systems & Visual Engineering',
      avatar: '◇ ENGR',
      responsibilities: [
        'Architected the React component and state management flow.',
        'Implemented Three.js 3D backgrounds, animated cursor, and Framer Motion transitions.',
        'Crafted the cyberpunk glassmorphism design system with Tailwind CSS v4.',
      ],
      techStack: ['React 19', 'Three.js', 'Framer Motion', 'Tailwind CSS', 'Recharts'],
    },
    {
      name: 'Anurag Singh',
      role: 'Product Strategy & Integration',
      avatar: '◆ STRT',
      responsibilities: [
        'Defined product scope, UX flow architecture, and feature prioritization.',
        'Integrated the analysis history system with localStorage persistence.',
        'Implemented report generation (html2canvas) and Web Share API integration.',
      ],
      techStack: ['html2canvas', 'Web Share API', 'LocalStorage', 'UX Design'],
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto relative">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-14"
      >
        {/* Decorative top */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-20 h-px bg-gradient-to-r from-transparent to-neon-cyan/30" />
          <div className="w-2 h-2 rounded-sm bg-neon-cyan/30 rotate-45" />
          <div className="w-20 h-px bg-gradient-to-l from-transparent to-neon-cyan/30" />
        </div>

        <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02]">
          <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan/40" />
          <span className="font-heading text-[10px] text-gray-500 tracking-[0.3em]">CLASSIFIED // LEVEL-3 ACCESS</span>
          <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan/40" />
        </div>

        <h2 className="font-heading text-3xl md:text-4xl text-white tracking-wider mb-3">
          SYSTEM <span className="text-[#5ce1e6]">ARCHITECTURE</span> & CREDITS
        </h2>

        <p className="font-body text-gray-500 text-base md:text-lg max-w-2xl mx-auto mb-2">
          Students at{' '}
          <span className="text-gray-400">I.K. Gujral Punjab Technical University, Jalandhar</span>
        </p>

        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="w-8 h-px bg-gradient-to-r from-transparent to-neon-purple/30" />
          <span className="font-heading text-[8px] text-gray-700 tracking-[0.3em]">DEVELOPMENT CORE / LAB</span>
          <div className="w-8 h-px bg-gradient-to-l from-transparent to-neon-purple/30" />
        </div>
      </motion.div>

      {/* Developer Tech Cards */}
      <div className="space-y-5 mb-10">
        {creators.map((c, i) => (
          <DevCard key={c.name} {...c} index={i} />
        ))}
      </div>

      {/* Architecture Diagram */}
      <ArchDiagram />

      {/* Terminal status + nav */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-10 mb-12"
      >
        {/* Status bar */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-xl border border-white/[0.05] bg-white/[0.02]">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-500/50 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              <span className="font-heading text-[10px] text-green-500/80 tracking-wider">ALL SYSTEMS ONLINE</span>
            </div>
            <div className="w-px h-3 bg-white/10" />
            <span className="font-heading text-[10px] text-gray-600 tracking-wider">NODES: 3/3</span>
            <div className="w-px h-3 bg-white/10" />
            <span className="font-heading text-[10px] text-gray-600 tracking-wider">UPTIME: 99.9%</span>
          </div>
        </div>

        {/* Back button */}
        <div className="flex justify-center">
          <button onClick={() => onNavigate('home')} className="glow-btn" data-hoverable>
            ← RETURN TO DASHBOARD
          </button>
        </div>
      </motion.div>
    </div>
  );
}