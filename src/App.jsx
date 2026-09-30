

import {useState, useEffect, useCallback, lazy, Suspense} from 'react';
import {motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import AnimatedCursor from './components/AnimatedCursor';
import ResumeUploader from './components/ResumeUploader';
import AIAnalyzer from './components/AIAnalyzer';
import ResultsDashboard from './components/ResultsDashboard';
import HistoryPanel from './components/HistoryPanel';
import AdvancedMetrics from './components/AdvancedMetrics';
import {HologramNode, HUDScanner} from './components/CyberDecorations';
import {HeroResumeImage, AIBrainScanVisual, DashboardGlowVisual } from './components/AIResumeVisuals';
import AboutPage from './components/AboutSection';
import { analyzeResume, saveAnalysis} from './utils/puterAI';




// Lazy load Three.js for performance
     const Background3D = lazy(() => import('./components/Background3D'));

    function LoadingScreen() {
            return (
  <div className="fixed inset-0 z-[9999] bg-dark-900 flex flex-col items-center justify-center">
        <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
     animate={{ opacity: 1, scale: 1 }}
     transition={{ duration: 0.5 }}
     className="text-center">
        <div className="w-20 h-20 mx-auto mb-6 relative">
        <div className="absolute inset-0 border-2 border-neon-cyan/30 rounded-xl animate-hex-spin" />
        <div className="absolute inset-3 border-2 border-neon-purple/30 rounded-lg animate-hex-spin" style={{ animationDirection: 'reverse', animationDuration: '2s' }} />
        <div className="absolute inset-6 border-2 border-neon-pink/30 rounded-md animate-hex-spin" style={{ animationDuration: '1.5s' }} />
             </div>
        
        <h2 className="font-heading text-xl text-neon-cyan animate-text-glow tracking-widest">
                     INITIALIZING </h2>
        <p className="font-body text-gray-600 mt-2">Loading 3D Engine...</p>
         </motion.div>
         </div>
         );}

         export default function App() {

  // ── 3-Page View Management ──
  // 'home'     = Page 1 — Core Dashboard (upload → analyzing → results)
  // 'advanced' = Page 2 — Advanced Performance Metrics
  // 'about'    = Page 3 — Developer Lab & Tech Architecture
  const [currentView, setCurrentView] = useState('home');
  const [appState, setAppState] = useState('upload');              // upload | analyzing | results
  const [resumeData, setResumeData] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [fileName, setFileName] = useState('');
  const [isAppLoaded, setIsAppLoaded] = useState(false);

  useEffect(() => {
  const timer = setTimeout(() => setIsAppLoaded(true), 1500);
  return () => clearTimeout(timer);
  }, []);

  // Scroll to top whenever the view changes
  useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });}, [currentView]);

  const handleNavigate = useCallback((view) => {
    setCurrentView(view); }, []);

  const handleTextExtracted = useCallback(async (data) =>{
    setResumeData(data);
    setFileName(data.fileName);
    setAppState('analyzing');
    setAnalysisProgress(0);

    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
      if (prev >= 95) { clearInterval(progressInterval); return 95; }
      return prev + Math.random() * 3 + 1;});
     }, 150);

    try {const result = await analyzeResume(data.text);
      clearInterval(progressInterval);
      setAnalysisProgress(100);
      saveAnalysis(result, data.fileName);
      setTimeout(() =>{
        setAnalysisResult(result);
        setAppState('results');}, 500);} catch (error) {
      clearInterval(progressInterval);
      console.error('Analysis failed:', error);
      setAppState('upload');}
 },[]);

  const handleReset = useCallback(()=>{
    setAppState('upload');
      setResumeData(null);
    setAnalysisResult(null);
    setAnalysisProgress(0);
    setFileName('');
    setCurrentView('home');
  },[]);

  const handleLoadFromHistory = useCallback((analysis, historyFileName)=> {
    setAnalysisResult(analysis);
    setFileName(historyFileName);
    setAppState('results');
    setCurrentView('home');
  }, []);

  return (
    <div className="min-h-screen relative cyber-grid scanlines">
      <AnimatedCursor />

      <Suspense fallback={null}>
        <Background3D />
      </Suspense>

      <AnimatePresence>
        {!isAppLoaded && <LoadingScreen />}
      </AnimatePresence>

      <HistoryPanel onLoadAnalysis={handleLoadFromHistory} />

      {/* ── Page Layout: Header → Main → Footer ── */}
      <div className="relative z-10 min-h-screen flex flex-col items-center">
        <Header onNavigate={handleNavigate} currentView={currentView} />

        <main className="flex-1 w-full flex items-start justify-center px-4 py-8">
        <div className="relative w-full max-w-5xl">
        {/* Cyber decorations — only on home view */}
        {currentView === 'home' && (
              <>
          <HUDScanner />
          <HologramNode />
              </>
        )}

        <AnimatePresence mode="wait">
        {/* ═══════════════════════════════════════════
                  PAGE 1: CORE DASHBOARD
       ═══════════════════════════════════════════ */}
      {currentView === 'home' && (
      <motion.div
       key="view-home"
      initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
       transition={{ duration: 0.4 }}
                >
      <AnimatePresence mode="wait">
        {appState === 'upload' && (
         <motion.div
              key="upload"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
             transition={{ duration: 0.4 }}
                 className="w-full flex flex-col items-center justify-center">
                        
      <HeroResumeImage />
       <ResumeUploader
       onTextExtracted={handleTextExtracted}
          isAnalyzing={appState === 'analyzing'}/>

      {/* Feature showcase cards */}
        <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="max-w-4xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
                >
       <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="glass-card p-6 text-center hover:border-neon-cyan/30 transition-all duration-300 group" data-hoverable>
          <AIBrainScanVisual />
          <h3 className="font-heading text-sm text-neon-cyan mb-2 mt-4 tracking-wider">AI-POWERED</h3>
            <p className="font-body text-gray-500 text-sm leading-relaxed">Advanced AI analyzes your resume for strengths, weaknesses, and ATS compatibility</p>
              </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}
                    className="glass-card p-6 text-center hover:border-neon-cyan/30 transition-all duration-300 group" data-hoverable>
                    <DashboardGlowVisual />
                     <h3 className="font-heading text-sm text-neon-purple mb-2 mt-4 tracking-wider">DEEP ANALYSIS</h3>
                            <p className="font-body text-gray-500 text-sm leading-relaxed">Get scores across 6 categories with a detailed skill radar visualization</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
              className="glass-card p-6 text-center hover:border-neon-cyan/30 transition-all duration-300 group flex flex-col items-center justify-center" data-hoverable>
                 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="w-full max-w-[180px] mb-4">
                    <svg viewBox="0 0 200 140" fill="none" className="w-full animate-holo-pulse" style={{ animationDelay: '1.5s' }}>
                     <defs><radialGradient id="rocketGlow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="rgba(255,45,149,0.1)" /><stop offset="100%" stopColor="rgba(255,45,149,0)" /></radialGradient></defs>
                   <ellipse cx="100" cy="70" rx="90" ry="60" fill="url(#rocketGlow)" />
                                <path d="M100 25 L88 65 L88 95 L100 105 L112 95 L112 65 Z" fill="rgba(92,225,230,0.08)" stroke="rgba(92,225,230,0.25)" strokeWidth="1" />
                                <path d="M100 15 L92 35 L108 35 Z" fill="rgba(92,225,230,0.12)" stroke="rgba(92,225,230,0.3)" strokeWidth="0.8" />
                                <path d="M88 80 L75 100 L88 95 Z" fill="rgba(92,225,230,0.06)" stroke="rgba(92,225,230,0.2)" strokeWidth="0.5" />
                                <path d="M112 80 L125 100 L112 95 Z" fill="rgba(92,225,230,0.06)" stroke="rgba(92,225,230,0.2)" strokeWidth="0.5" />
                                <path d="M95 105 L100 125 L105 105" stroke="rgba(255,45,149,0.3)" strokeWidth="1" fill="rgba(255,45,149,0.05)" />
                                <circle cx="100" cy="55" r="5" fill="rgba(92,225,230,0.1)" stroke="rgba(92,225,230,0.25)" strokeWidth="0.8" />
                                <circle cx="100" cy="55" r="2" fill="rgba(92,225,230,0.3)" />
              </svg>
                    </motion.div>
  <h3 className="font-heading text-sm text-neon-pink mb-2 tracking-wider">ACTIONABLE TIPS</h3>
           <p className="font-body text-gray-500 text-sm leading-relaxed">Receive personalized improvement suggestions to boost your resume score</p>
                          </motion.div>
                          </motion.div>
                         </motion.div>
          )}

       {appState === 'analyzing' && (
             <motion.div key="analyzing" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}
                className="w-full flex items-center justify-center">
                         <AIAnalyzer isAnalyzing={true} progress={analysisProgress} />
           </motion.div>         )}

              {appState === 'results' && analysisResult && (
   <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}
                        className="w-full flex items-center justify-center">
                          <ResultsDashboard
                          analysis={analysisResult}
                          fileName={fileName}
                          onReset={handleReset}
                          onViewAdvanced={() => handleNavigate('advanced')} />
    </motion.div>
                    )}
         </AnimatePresence>
                    </motion.div>  )}

              {/* ═══════════════════════════════════════════
                  PAGE 2: ADVANCED PERFORMANCE METRICS
                  ═══════════════════════════════════════════ */}
  
  {currentView === 'advanced' && analysisResult && (
    <motion.div
                  key="view-advanced"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="w-full">
      <AdvancedMetrics
                analysis={analysisResult}
                fileName={fileName}
                onBack={() => handleNavigate('home')}
                  />
                </motion.div>
              )}

              {/* ═══════════════════════════════════════════
                  PAGE 3: DEVELOPER LAB & TECH ARCHITECTURE
                  ═══════════════════════════════════════════ */}
              
    {currentView === 'about' && (
          <motion.div
                  key="view-about"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                               <AboutPage onNavigate={handleNavigate} />
        </motion.div> )}
                          </AnimatePresence>
                  </div>
    </main>

           {/* Footer */}

    <footer className="w-full py-6 text-center">
           <div className="flex items-center justify-center gap-3 mb-2">
           <div className="w-12 h-px bg-gradient-to-r from-transparent to-neon-cyan/20" />
           <span className="font-heading text-[10px] text-gray-700 tracking-[0.3em]">RESUMEX v1.0</span>
           <div className="w-12 h-px bg-gradient-to-l from-transparent to-neon-cyan/20" />
      </div>
      <p className="font-body text-gray-700 text-xs">
            Powered by AI &bull; Built with React &amp; Three.js
      </p>
            </footer>
           </div>
      </div>
  );
}
