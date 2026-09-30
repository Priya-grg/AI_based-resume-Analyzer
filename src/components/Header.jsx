

import { motion } from 'framer-motion';
import { Cpu, BrainCircuit } from 'lucide-react';
import { AICoreBadge } from './CyberDecorations';

export default function Header({ onNavigate, currentView }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative z-10 pt-8 pb-6 text-center w-full"
    >
      {/* Nav bar */}
      <nav className="flex items-center justify-center gap-8 mb-6">
        <button
          onClick={() => onNavigate?.('home')}
          data-hoverable
          className={`font-heading text-sm tracking-widest transition-all duration-300 hover:text-[#5ce1e6] hover:drop-shadow-[0_0_5px_#5ce1e6] ${
            currentView === 'home'
              ? 'text-[#5ce1e6] drop-shadow-[0_0_5px_#5ce1e6]'
              : 'text-gray-400'
          }`}
        >
          HOME
        </button>
        <button
          onClick={() => onNavigate?.('about')}
          data-hoverable
          className={`font-heading text-sm tracking-widest transition-all duration-300 hover:text-[#5ce1e6] hover:drop-shadow-[0_0_5px_#5ce1e6] ${
            currentView === 'about'
              ? 'text-[#5ce1e6] drop-shadow-[0_0_5px_#5ce1e6]'
              : 'text-gray-400'
          }`}
        >
          ABOUT
        </button>
      </nav>

      <div className="flex items-center justify-center gap-4 mb-3">
        {/* AI node icon — left */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="hidden md:flex"
        >
          <BrainCircuit
            className="w-7 h-7 text-[#5ce1e6] animate-pulse"
            style={{ filter: 'drop-shadow(0 0 10px rgba(92,225,230,0.6))' }}
          />
        </motion.div>

        {/* AI Core Microchip — pulsing neon badge */}
        <AICoreBadge />

        <h1 className="font-heading text-3xl md:text-4xl tracking-wider">
          <span className="text-white">RESUME</span>
          <span className="text-neon-cyan animate-text-glow">X</span>
        </h1>

        {/* AI node icon — right */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="hidden md:flex"
        >
          <Cpu
            className="w-7 h-7 text-[#5ce1e6] animate-pulse"
            style={{ filter: 'drop-shadow(0 0 10px rgba(92,225,230,0.6))' }}
          />
        </motion.div>
      </div>

      <p className="font-body text-gray-500 text-lg tracking-wide">
        AI-POWERED RESUME ANALYZER
      </p>

      {/* Decorative line */}
      <div className="flex items-center justify-center gap-2 mt-4">
      <div className="w-12 h-px bg-gradient-to-r from-transparent to-neon-cyan/50" />
        <div className="w-2 h-2 rounded-full bg-neon-cyan/50" />
        <div className="w-24 h-px bg-gradient-to-r from-neon-cyan/50 via-neon-purple/50 to-neon-pink/50" />
        <div className="w-2 h-2 rounded-full bg-neon-pink/50" />
        <div className="w-12 h-px bg-gradient-to-l from-transparent to-neon-pink/50" />
      </div>
    </motion.header>
  );
}
