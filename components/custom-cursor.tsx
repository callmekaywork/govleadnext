'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Check if hovering over a "contrast" element
      const target = e.target as HTMLElement;
      //   const isContrast =
      //     target.closest('[data-cursor="contrast"]') ||
      //     target.tagName === 'BUTTON' ||
      //     target.tagName === 'A' ||
      //     target.tagName === 'P' ||
      //     target.tagName === 'H1';
      //   setIsHovering(!!isContrast);
      const isContrast = target.closest('[data-cursor="contrast"]');
      setIsHovering(!!isContrast);
      //   setIsHovering(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Small Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-neutral-900 rounded-full pointer-events-none z-[9999] "
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 0.8 : 1,
          backgroundColor: isHovering ? '#e4f' : '#000',
        }}
      />

      {/* Large Outline */}
      {/* <motion.div
        // className="fixed top-0 left-0 w-10 h-10 border border-neutral-900 rounded-full pointer-events-none z-[9998] mix-blend-difference"
        // style={{
        //   x: cursorXSpring,
        //   y: cursorYSpring,
        //   translateX: '-50%',
        //   translateY: '-50%',
        // }}
        // animate={{
        //   scale: isHovering ? 1.5 : 1,
        //   borderColor: isHovering ? '#fff' : '#000',
        //   borderWidth: isHovering ? '1px' : '1px',
        //   backgroundColor: isHovering
        //     ? 'rgba(255, 255, 255, 0.1)'
        //     : 'transparent',
        // }}
        className="fixed top-0 left-0 w-10 h-10 border rounded-full pointer-events-none z-[9998] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 3.5 : 1,
          borderColor: isHovering ? '#fff' : '#000',
          backgroundColor: isHovering
            ? 'rgba(255, 255, 255, 1)'
            : 'transparent',
        }}
      /> */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border rounded-full pointer-events-none z-[9998] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 1.5 : 1, // enlarge only on hover
          borderColor: isHovering ? '#fff' : '#000', // contrast border
          backgroundColor: isHovering
            ? 'rgba(255, 255, 255, )' // visible background when hovering
            : 'rgba(0,0,0,0)', // keep transparent but still visible outline
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 25 }}
      />
    </>
  );
}
