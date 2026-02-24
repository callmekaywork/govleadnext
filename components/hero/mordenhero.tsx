'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function HeroModern() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 relative overflow-hidden flex flex-col items-center justify-center p-6 text-center font-sans">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-5xl z-10"
      >
        <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 mb-8 leading-[1.05]">
          Where Ideas Become <br />
          <span className="text-green-500 italic font-serif">Structured</span>,
          Scalable Businesses.
        </h1>

        <p className="text-lg md:text-xl text-neutral-500 dark:text-neutral-200 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
          IncuVera is a structured business incubation platform designed to
          transform early-stage ideas, professional expertise, and academic
          innovation into commercially viable enterprises.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="group relative px-10 py-5 flex flex-row bg-neutral-900 text-white rounded-2xl font-semibold text-lg hover:bg-neutral-800 transition-all shadow-2xl shadow-neutral-200 dark:shadow-neutral-950 overflow-hidden">
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
