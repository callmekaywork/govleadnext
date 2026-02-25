'use client';

import React, { useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from 'motion/react';
import { useRef, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

// function HeroModern(
//   { children }: { children?: React.ReactNode },
//   ref: React.Ref<HTMLDivElement>,
// ) {
function HeroModern() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth - 0.5) * 100);
      mouseY.set((clientY / innerHeight - 0.5) * 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen  bg-white dark:bg-neutral-900  overflow-hidden flex flex-col items-center justify-center p-6 text-center font-sans"
    >
      <div className="md:hidden h-20 w-full" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-5xl z-10 "
      >
        <h1
          data-cursor="contrast"
          className="text-5xl md:text-8xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 mb-8 leading-[1.05] bg-neutral-900/80 md:bg-transparent p-5 rounded-2xl"
        >
          Where Ideas Become <br />
          <span className="text-green-500 italic font-serif">Structured</span>,
          Scalable Businesses.
        </h1>

        <p className="text-lg md:text-xl text-neutral-500 dark:text-neutral-200 mb-12 max-w-3xl mx-auto leading-relaxed font-light  bg-neutral-900/80 md:bg-transparent p-5 rounded-2xl">
          IncuVera is a structured business incubation platform designed to
          transform early-stage ideas, professional expertise, and academic
          innovation into commercially viable enterprises.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            data-cursor="contrast"
            className="group  relative px-10 py-5 flex flex-row bg-emerald-900 text-white rounded-2xl font-semibold text-lg hover:bg-emerald-950 transition-all shadow-2xl shadow-neutral-200 dark:shadow-neutral-950 overflow-hidden data-[cursor=contrast]:overflow-hidden"
          >
            <Link href={'/apply'} className=" cursor-pointer">
              <span className="relative z-10 flex items-center gap-2">
                Apply for Incubation
                <ChevronRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
            </Link>
          </button>

          {/* <button className="px-10 py-5 bg-white text-neutral-900 border border-neutral-200 rounded-2xl font-semibold text-lg hover:bg-neutral-50 hover:border-neutral-300 transition-all">
            Attend a Seminar
          </button> */}
        </div>
      </motion.div>

      {/* Floating Abstract Blocks */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="absolute top-20 right-[10%] w-64 h-64 rounded-[4rem] overflow-hidden rotate-12 shadow-2xl z-0 opacity-80 md:opacity-100"
      >
        <img
          src="/img_3.jpeg"
          alt="Abstract 1"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      <motion.div
        style={{
          x: useTransform(springX, v => v * -1.5),
          y: useTransform(springY, v => v * -1.5),
        }}
        className="absolute bottom-20 left-[5%] w-80 h-96 rounded-[5rem] overflow-hidden -rotate-6 shadow-2xl z-0 opacity-60 md:opacity-100"
      >
        <img
          src="/img_2.jpeg"
          alt="Abstract 2"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </motion.div>
      <motion.div
        style={{
          x: useTransform(springX, v => v * 0.8),
          y: useTransform(springY, v => v * -0.8),
          scale: useTransform(scrollYProgress, [0, 1], [0.8, 1.2]),
        }}
        className="absolute top-1/2 right-[20%] w-40 h-40 rounded-full overflow-hidden shadow-xl z-0"
      >
        <img
          src="/img_1.jpeg"
          alt="Abstract 3"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Decorative lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-neutral-200/5" />
        <div className="absolute top-0 left-2/4 w-px h-full bg-neutral-200/5" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-neutral-200/5" />
      </div>

      {/* <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-emerald-50 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-blue-50 rounded-full blur-[100px] opacity-40" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div> */}
    </div>
  );
}

export default HeroModern;
