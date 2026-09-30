

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAnalysisHistory } from '../utils/puterAI';

export default function HistoryPanel({ onLoadAnalysis }) {
const [isOpen, setIsOpen] = useState(false);
const history = getAnalysisHistory();

  if (history.length === 0) return null;

  return (
    <>
      {/* Toggle button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-6 top-6 z-50 w-12 h-12 rounded-xl glass-card flex items-center justify-center hover:border-neon-cyan/40 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        data-hoverable
        title="Analysis History"
      >
        <svg className="w-5 h-5 text-neon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-neon-purple text-white text-xs flex items-center justify-center font-heading">
          {history.length}
        </span>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-80 z-50 glass-card rounded-none rounded-l-2xl border-r-0 p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading text-lg text-neon-cyan">HISTORY</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-white transition-colors"
                  data-hoverable
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3">
                {history.map((entry, i) => (
                  <motion.button
                    key={entry.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => {
                      onLoadAnalysis(entry.analysis, entry.fileName);
                      setIsOpen(false);
                    }}
                    className="w-full text-left p-4 rounded-xl bg-dark-700/50 border border-glass-border hover:border-neon-cyan/30 transition-all duration-300"
                    data-hoverable
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-body text-white text-sm truncate pr-2">{entry.fileName}</span>
                      <span
                        className="font-heading text-lg"
                        style={{
                          color: entry.overallScore >= 70 ? '#39ff14' : entry.overallScore >= 50 ? '#00f0ff' : '#ff2d95'
                        }}
                      >
                        {entry.overallScore}
                      </span>
                    </div>
                    <p className="font-body text-gray-600 text-xs">
                      {new Date(entry.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
