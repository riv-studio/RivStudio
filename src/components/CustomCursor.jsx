import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState('default'); // 'default', 'pointer', 'view', 'contact'
  
  // Motion values for snappy dot (exact coordinates)
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  // Motion values for smooth trailing ring
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);
  
  // Spring settings for the floating ring follower
  const springConfig = { damping: 30, stiffness: 350, mass: 0.5 };
  const ringXSpring = useSpring(ringX, springConfig);
  const ringYSpring = useSpring(ringY, springConfig);

  useEffect(() => {
    // Only load cursor on mouse-supporting desktop screens
    const hasHover = window.matchMedia('(hover: hover)').matches;
    if (!hasHover) return;

    document.body.classList.add('custom-cursor-active');
    setIsVisible(true);

    const moveCursor = (e) => {
      // Snappy dot matches mouse exactly (offset by radius)
      dotX.set(e.clientX - 3);
      dotY.set(e.clientY - 3);

      // Trailing ring follows (offset by default radius)
      ringX.set(e.clientX - 16);
      ringY.set(e.clientY - 16);
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        setCursorType(target.getAttribute('data-cursor') || 'pointer');
      } else if (
        e.target.tagName === 'A' || 
        e.target.tagName === 'BUTTON' || 
        e.target.closest('a') || 
        e.target.closest('button') ||
        e.target.getAttribute('role') === 'button'
      ) {
        setCursorType('pointer');
      } else {
        setCursorType('default');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [dotX, dotY, ringX, ringY]);

  if (!isVisible) return null;

  // Outer ring animations depending on hover states (Lando Papaya Orange)
  const ringVariants = {
    default: {
      width: 32,
      height: 32,
      backgroundColor: 'transparent',
      border: '1.5px solid #FF5500',
      borderRadius: '50%',
      scale: 1,
    },
    pointer: {
      width: 48,
      height: 48,
      backgroundColor: 'rgba(255, 85, 0, 0.05)',
      border: '1.5px solid #FF5500',
      borderRadius: '50%',
      scale: 1.1,
      x: -8, // Recenter offset when expanding
      y: -8,
    },
    view: {
      width: 80,
      height: 80,
      backgroundColor: '#FF5500',
      border: '1.5px solid #FF5500',
      borderRadius: '50%',
      scale: 1,
      x: -24,
      y: -24,
    },
    contact: {
      width: 80,
      height: 80,
      backgroundColor: '#FFFFFF',
      border: '1.5px solid #FFFFFF',
      borderRadius: '50%',
      scale: 1,
      x: -24,
      y: -24,
    }
  };

  // Inner dot animations depending on hover states
  const dotVariants = {
    default: { scale: 1, opacity: 1 },
    pointer: { scale: 1.5, opacity: 1 },
    view: { scale: 0, opacity: 0 },
    contact: { scale: 0, opacity: 0 }
  };

  return (
    <>
      {/* Snappy Inner Dot */}
      <motion.div
        style={{
          position: 'fixed',
          left: dotX,
          top: dotY,
          pointerEvents: 'none',
          zIndex: 9999,
          width: 6,
          height: 6,
          backgroundColor: '#FF5500',
          borderRadius: '50%',
        }}
        variants={dotVariants}
        animate={cursorType}
        transition={{ duration: 0.15 }}
      />

      {/* Floating Outer Ring */}
      <motion.div
        style={{
          position: 'fixed',
          left: ringXSpring,
          top: ringYSpring,
          pointerEvents: 'none',
          zIndex: 9998,
        }}
        variants={ringVariants}
        animate={cursorType}
        transition={{ type: 'spring', damping: 20, stiffness: 200, mass: 0.3 }}
        className="flex items-center justify-center font-sora font-semibold text-xs uppercase tracking-wider select-none overflow-hidden"
      >
        {cursorType === 'view' && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] text-black font-extrabold"
          >
            View
          </motion.span>
        )}
        {cursorType === 'contact' && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] text-black font-extrabold"
          >
            Go
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
