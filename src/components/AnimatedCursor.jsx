


import { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function AnimatedCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const outerX = useSpring(cursorX, { damping: 20, stiffness: 200, mass: 0.8 });
  const outerY = useSpring(cursorY, { damping: 20, stiffness: 200, mass: 0.8 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const setupHoverListeners = () => {
      const interactiveEls = document.querySelectorAll('button, a, input, [data-hoverable], .glow-btn, [role="button"], label[for]');
      interactiveEls.forEach(el => {
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => setIsHovering(false));
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    const observer = new MutationObserver(() => {
      setupHoverListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });
    setupHoverListeners();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      observer.disconnect();
    };
  }, [cursorX, cursorY]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999]"
        style={{
          x: outerX,
          y: outerY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovering ? 56 : 40,
          height: isHovering ? 56 : 40,
          opacity: isVisible ? 1 : 0,
          borderColor: isHovering ? 'rgba(179, 71, 234, 0.8)' : 'rgba(0, 240, 255, 0.5)',
          boxShadow: isHovering
            ? '0 0 20px rgba(179, 71, 234, 0.4), 0 0 40px rgba(179, 71, 234, 0.1), inset 0 0 15px rgba(179, 71, 234, 0.1)'
            : '0 0 10px rgba(0, 240, 255, 0.2), 0 0 20px rgba(0, 240, 255, 0.05)',
        }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="w-full h-full rounded-full border-2"
          style={{
            borderColor: 'inherit',
            boxShadow: 'inherit',
          }}
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isClicking ? 12 : isHovering ? 8 : 6,
          height: isClicking ? 12 : isHovering ? 8 : 6,
          opacity: isVisible ? 1 : 0,
          backgroundColor: isHovering ? '#b347ea' : '#00f0ff',
          boxShadow: isHovering
            ? '0 0 15px #b347ea, 0 0 30px rgba(179,71,234,0.4)'
            : '0 0 10px #00f0ff, 0 0 20px rgba(0,240,255,0.3)',
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Click ripple */}
      {isClicking && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[99998] rounded-full border border-cyan-400/30"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          initial={{ width: 10, height: 10, opacity: 0.5 }}
          animate={{ width: 60, height: 60, opacity: 0 }}
          transition={{ duration: 0.4 }}
        />
      )}
    </>
  );
}
