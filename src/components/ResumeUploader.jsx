import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { extractTextFromPDF } from '../utils/pdfParser';

export default function ResumeUploader({ onTextExtracted, isAnalyzing }) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadState, setUploadState] = useState('idle'); // idle, uploading, success, error
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const inputRef = useRef(null);

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const simulateProgress = useCallback(() => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return prev;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 100);
    return interval;
  }, []);

  const processFile = useCallback(async (file) => {
    setErrorMessage('');
    setUploadState('uploading');
    setFileName(file.name);
    setFileSize(formatFileSize(file.size));

    const progressInterval = simulateProgress();

    try {
      const result = await extractTextFromPDF(file);
      clearInterval(progressInterval);
      setUploadProgress(100);
      setUploadState('success');

      setTimeout(() => {
        onTextExtracted(result);
      }, 600);
    } catch (error) {
      clearInterval(progressInterval);
      setUploadProgress(0);
      setUploadState('error');
      setErrorMessage(error.message || 'Failed to process PDF');
    }
  }, [onTextExtracted, simulateProgress]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  }, [processFile]);

  const handleFileSelect = useCallback((e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  }, [processFile]);

  const resetUpload = () => {
    setUploadState('idle');
    setUploadProgress(0);
    setFileName('');
    setFileSize('');
    setErrorMessage('');
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full max-w-2xl mx-auto"
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        onChange={handleFileSelect}
        className="hidden"
        id="resume-upload-input"
      />

      <AnimatePresence mode="wait">
        {uploadState === 'idle' && (
          <motion.label
            key="upload-area"
            htmlFor="resume-upload-input"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            data-hoverable
            className={`relative block glass-card p-12 text-center transition-all duration-300 group ${
              isDragging
                ? 'border-neon-cyan/60 shadow-[0_0_30px_rgba(0,240,255,0.2)]'
                : 'border-glass-border hover:border-neon-cyan/40 hover:shadow-[0_0_20px_rgba(0,240,255,0.1)]'
            }`}
          >
            {/* Animated border corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-neon-cyan/50 rounded-tl-2xl" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-neon-purple/50 rounded-tr-2xl" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-neon-purple/50 rounded-bl-2xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-neon-cyan/50 rounded-br-2xl" />

            {/* Upload icon */}
            <motion.div
              animate={isDragging ? { scale: 1.15, y: -5 } : { scale: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-neon-cyan/10 to-neon-purple/10 border border-neon-cyan/20 flex items-center justify-center group-hover:border-neon-cyan/40 transition-all duration-300">
                <svg className="w-10 h-10 text-neon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
              </div>
            </motion.div>

            <h3 className="font-heading text-xl text-white mb-2">
              {isDragging ? 'DROP YOUR RESUME' : 'UPLOAD RESUME'}
            </h3>
            <p className="font-body text-gray-400 text-lg mb-1">
              Drag & drop your PDF here or click to browse
            </p>
            <p className="font-body text-gray-600 text-sm">
              PDF files only • Max 5MB
            </p>

            {/* Scanning line animation when dragging */}
            {isDragging && (
              <motion.div
                className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-neon-cyan to-transparent"
                initial={{ top: '0%' }}
                animate={{ top: '100%' }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              />
            )}
          </motion.label>
        )}

        {uploadState === 'uploading' && (
          <motion.div
            key="uploading"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-card p-10 text-center"
          >
            {/* Hex spinner */}
            <div className="w-16 h-16 mx-auto mb-6 relative">
              <div className="absolute inset-0 border-2 border-neon-cyan/30 rounded-xl animate-hex-spin" />
              <div className="absolute inset-2 border-2 border-neon-purple/30 rounded-lg animate-hex-spin" style={{ animationDirection: 'reverse', animationDuration: '2s' }} />
              <div className="absolute inset-4 border-2 border-neon-pink/30 rounded-md animate-hex-spin" style={{ animationDuration: '1.5s' }} />
            </div>

            <h3 className="font-heading text-lg text-neon-cyan mb-2 animate-text-glow">PROCESSING</h3>
            <p className="font-body text-gray-400 mb-1">{fileName}</p>
            <p className="font-body text-gray-600 text-sm mb-6">{fileSize}</p>

            {/* Progress bar */}
            <div className="w-full max-w-md mx-auto h-2 bg-dark-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink"
                initial={{ width: '0%' }}
                animate={{ width: `${Math.min(uploadProgress, 100)}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="font-body text-neon-cyan/60 text-sm mt-3">
              {Math.round(Math.min(uploadProgress, 100))}% complete
            </p>
          </motion.div>
        )}

        {uploadState === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-card p-10 text-center border-neon-green/30"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className="w-16 h-16 mx-auto mb-4 rounded-full bg-neon-green/10 border border-neon-green/30 flex items-center justify-center"
            >
              <svg className="w-8 h-8 text-neon-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            <h3 className="font-heading text-lg text-neon-green mb-2">EXTRACTION COMPLETE</h3>
            <p className="font-body text-gray-400">{fileName}</p>
            {isAnalyzing && (
              <p className="font-body text-neon-cyan/60 text-sm mt-3 animate-text-glow">Initiating AI analysis...</p>
            )}
          </motion.div>
        )}

        {uploadState === 'error' && (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-card p-10 text-center border-red-500/30"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
              <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3 className="font-heading text-lg text-red-400 mb-2">UPLOAD FAILED</h3>
            <p className="font-body text-gray-400 mb-4">{errorMessage}</p>
            <button onClick={resetUpload} className="glow-btn" data-hoverable>
              Try Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
