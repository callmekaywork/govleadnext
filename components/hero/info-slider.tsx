'use client';

import React, { useState, cloneElement, ReactElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ClipboardCheck,
  Users,
  GraduationCap,
  Sun,
  Moon,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { Button } from '../ui/button';

// Types
type TabType = 'audit' | 'training' | 'coaching';

interface TabData {
  id: TabType;
  title: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
  color: string;
}

const tabs: TabData[] = [
  {
    id: 'audit',
    title: 'Business Audit',
    icon: <ClipboardCheck className="w-5 h-5" />,
    description:
      'A comprehensive 360° evaluation of your current business processes, financial health, and market positioning.',
    features: [
      'Efficiency Gap Analysis',
      'Financial Health Check',
      'Risk Assessment',
    ],
    color: 'green', // We'll map these to our specific green/red colors
  },
  {
    id: 'training',
    title: 'Mentor Training',
    icon: <Users className="w-5 h-5" />,
    description:
      'Specialized programs designed to turn your senior leads into world-class mentors who drive team performance.',
    features: ['Leadership Frameworks', 'Feedback Cycles', 'EQ Development'],
    color: 'red',
  },
  {
    id: 'coaching',
    title: 'Coaching',
    icon: <GraduationCap className="w-5 h-5" />,
    description:
      'One-on-one executive sessions focused on strategic growth, decision-making, and scaling operations.',
    features: [
      'Executive Presence',
      'Strategic Planning',
      'Conflict Resolution',
    ],
    color: 'green',
  },
];

export default function InformationSlider() {
  const [activeTab, setActiveTab] = useState<TabType>('audit');
  const [isDarkMode, setIsDarkMode] = useState(false);

  //   const [size, isSize] = useState(32);

  // Determine active index for sliding logic
  const activeIndex = tabs.findIndex(tab => tab.id === activeTab);

  return (
    <div
      className={`${isDarkMode ? 'dark' : ''} transition-colors duration-500`}
    >
      <div className="relative min-h-screen  bg-slate-50 dark:bg-neutral-900 flex items-center justify-center p-6 text-slate-900 dark:text-slate-100">
        {/* Main Card Container */}
        <div className=" w-full  lg:max-w-360 bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-zinc-800">
          {/* Header & Theme Toggle */}
          <div className="px-8 pt-8 pb-4 my-4 flex justify-between items-center lg:flex lg:justify-center">
            <h2 className="text-2xl lg:text-5xl font-bold tracking-tight">
              Our Services
            </h2>
            {/* <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
            >
              {isDarkMode ? (
                <Sun className="text-yellow-400" />
              ) : (
                <Moon className="text-slate-600" />
              )}
            </button> */}
          </div>

          {/* Mobile slider */}
          {/* Animated Background Pill */}

          <Button
            className={`${activeTab == tabs[0].id ? 'hidden' : 'flex'} md:hidden bg-amber-200 dark:bg-white absolute top-1/2 z-10 left-1 justify-center items-center h-10 w-10 rounded-full`}
            onClick={() => {
              const currentIndex = tabs.findIndex(t => t.id === activeTab);

              // If we're at the first tab, allow moving forward
              // if (currentIndex === 0) {
              //   setActiveTab(tabs[currentIndex + 1].id);
              // }

              // If we're at the last tab, allow moving backward
              if (currentIndex != 0) {
                setActiveTab(tabs[currentIndex - 1].id);
              }
            }}
          >
            <ChevronLeft size={40} />
          </Button>

          <Button
            className={`${activeTab == tabs[tabs.length - 1].id ? 'hidden' : 'flex'}  md:hidden bg-amber-200 dark:bg-white absolute top-1/2 z-10 right-1 justify-center items-center h-10 w-10 rounded-full`}
            onClick={() => {
              const currentIndex = tabs.findIndex(t => t.id === activeTab);

              // If we're at the last tab, allow moving backward
              if (currentIndex != tabs.length - 1) {
                setActiveTab(tabs[currentIndex + 1].id);
              }
            }}
          >
            <ChevronRight size={40} />
          </Button>

          {/* Navigation Tabs */}
          <div className="px-8 mb-8 lg:flex lg:justify-center">
            <div className="relative hidden md:flex bg-slate-100 dark:bg-zinc-800 p-1.5 rounded-2xl w-fit ">
              {/* Animated Background Pill */}
              <motion.div
                className="absolute top-1.5 bottom-1.5 bg-white dark:bg-zinc-700 rounded-xl shadow-sm z-0"
                initial={false}
                animate={{
                  x: `${activeIndex * 100}%`,
                  width: `${100 / tabs.length}%`,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                style={{ width: `calc((100% - 12px) / ${tabs.length})` }}
              />

              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative z-10 flex items-center gap-2 px-6 py-2.5 text-sm font-medium transition-colors duration-200
                    ${activeTab === tab.id ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-zinc-400 hover:text-slate-700'}
                  `}
                >
                  {tab.icon}
                  {tab.title}
                </button>
              ))}
            </div>
          </div>

          {/* Content Slider Area */}
          <div className="relative overflow-hidden px-8 pb-12 min-h-[320px] lg:w-full lg:h-full lg:flex lg:justify-center ">
            <AnimatePresence mode="wait">
              <motion.div
                className="flex lg:w-3/5 "
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 25,
                  duration: 0.8,
                }}
              >
                {/* {tabs.map(tab => (
                <div key={tab.id} className="w-full shrink-0 pr-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    <div className="space-y-4">
                      <div
                        className={`inline-flex p-3 rounded-2xl 
                        ${
                          tab.color === 'green'
                            ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
                            : 'bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400'
                        }
                      `}
                      >
                        {cloneElement(tab.icon as ReactElement)}
                      </div>
                      <h3 className="text-3xl font-bold">{tab.title}</h3>
                      <p className="text-slate-600 dark:text-zinc-400 leading-relaxed text-lg">
                        {tab.description}
                      </p>
                    </div>

                    <div className="bg-slate-50 dark:bg-zinc-800/50 rounded-2xl p-6 border border-slate-100 dark:border-zinc-700/50">
                      <h4 className="font-semibold mb-4 text-slate-500 uppercase tracking-wider text-xs">
                        What's Included
                      </h4>
                      <ul className="space-y-3">
                        {tab.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-3">
                            <div
                              className={`w-1.5 h-1.5 rounded-full 
                              ${tab.color === 'green' ? 'bg-emerald-500' : 'bg-rose-500'}`}
                            />
                            <span className="font-medium">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <button
                        className={`mt-8 w-full py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-all
                        ${
                          tab.color === 'green'
                            ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                            : 'bg-rose-500 hover:bg-rose-600 text-white'
                        }
                        active:scale-95 shadow-lg shadow-emerald-500/20 dark:shadow-none
                      `}
                      >
                        Get Started <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))} */}

                <div className="w-full shrink-0 pr-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8 items-start">
                    {/* Left Side: Info */}
                    <div className="space-y-4">
                      <div
                        className={`inline-flex p-3 rounded-2xl 
                        ${
                          tabs[activeIndex].color === 'green'
                            ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
                            : 'bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400'
                        }
                      `}
                      >
                        {cloneElement(tabs[activeIndex].icon as ReactElement)}
                      </div>
                      <h3 className="text-3xl font-bold">
                        {tabs[activeIndex].title}
                      </h3>
                      <p className="text-slate-600 dark:text-zinc-400 leading-relaxed text-lg">
                        {tabs[activeIndex].description}
                      </p>
                    </div>

                    {/* Right Side: Features */}
                    <div className="bg-slate-50 dark:bg-zinc-800/50 rounded-2xl p-6 border border-slate-100 dark:border-zinc-700/50">
                      <h4 className="font-semibold mb-4 text-slate-500 uppercase tracking-wider text-xs">
                        What's Included
                      </h4>
                      <ul className="space-y-3">
                        {tabs[activeIndex].features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-3">
                            <div
                              className={`w-1.5 h-1.5 rounded-full 
                              ${tabs[activeIndex].color === 'green' ? 'bg-emerald-500' : 'bg-rose-500'}`}
                            />
                            <span className="font-medium">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <button
                        className={`mt-8 w-full py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-all
                        ${
                          tabs[activeIndex].color === 'green'
                            ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                            : 'bg-rose-500 hover:bg-rose-600 text-white'
                        }
                        active:scale-95 shadow-lg shadow-emerald-500/20 dark:shadow-none
                      `}
                      >
                        Get Started <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
