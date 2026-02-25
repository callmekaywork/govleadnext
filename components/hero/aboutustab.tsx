'use client';

import React, { useState } from 'react';
import * as motion from 'motion/react-client';
import {
  ArrowRight,
  Box,
  ChevronRight,
  Globe,
  Layers,
  Zap,
} from 'lucide-react';
import { AnimatePresence } from 'motion/react';

export default function MinimalConcept() {
  const [page, setPage] = useState(1);

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#1a1a1a] font-sans p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          {page === 1 ? (
            <motion.div
              key="page1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-12"
            >
              {/* Page 1: Overview */}
              <div className="grid md:grid-cols-12 gap-12">
                <div className="md:col-span-8 space-y-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold border border-emerald-100">
                    <Box size={14} />
                    <span>IncuVera Initiative</span>
                  </div>
                  <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
                    Building the{' '}
                    <span className="text-emerald-600">Infrastructure</span>{' '}
                    Behind Great Businesses.
                  </h1>
                  <p className="text-xl text-gray-500 leading-relaxed max-w-2xl">
                    We move founders from ambition to operational maturity
                    through structured incubation and strategic clarity.
                  </p>
                </div>
                <div className="md:col-span-4 flex flex-col justify-end">
                  <div className="p-6 bg-white rounded-3xl shadow-sm border border-gray-100 space-y-4">
                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">
                      <Layers className="text-gray-400" size={20} />
                    </div>
                    <p className="text-sm font-medium">
                      Innovation without execution collapses.
                    </p>
                    <p className="text-xs text-gray-400">
                      Our mission is to provide the structural discipline
                      required for scale.
                    </p>
                  </div>
                </div>
              </div>

              {/* Page 2: Details */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-8 bg-white rounded-[32px] shadow-sm border border-gray-100 space-y-6">
                    <h3 className="text-xs uppercase tracking-widest font-bold text-gray-400">
                      Our Approach
                    </h3>
                    <ul className="space-y-4">
                      {[
                        'Strategic clarity',
                        'Commercial viability',
                        'System implementation',
                        'Revenue enablement',
                        'Performance governance',
                      ].map((item, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-3 text-sm font-medium"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-8 bg-white rounded-[32px] shadow-sm border border-gray-100 space-y-6">
                    <h3 className="text-xs uppercase tracking-widest font-bold text-gray-400">
                      Our Model
                    </h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <p className="text-sm font-bold">Seminars & Events</p>
                        <p className="text-xs text-gray-400 mt-1">
                          Foundational exposure
                        </p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <p className="text-sm font-bold">
                          Incubation Framework
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Structured growth
                        </p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <p className="text-sm font-bold">Market Enablement</p>
                        <p className="text-xs text-gray-400 mt-1">
                          Network expansion
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-600 text-white p-8 rounded-[32px] flex flex-col justify-between">
                  <Globe size={32} className="opacity-50" />
                  <div className="space-y-4">
                    <h3 className="text-xs uppercase tracking-widest font-bold opacity-70">
                      Long-Term Vision
                    </h3>
                    <p className="text-xl font-medium leading-snug">
                      To build a generation of African enterprises that operate
                      with global discipline.
                    </p>
                    <button
                      onClick={() => setPage(2)}
                      className="w-full py-3 bg-white text-emerald-600 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-emerald-50 transition-colors"
                    >
                      Explore Programme <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="page2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              {/* Page 3: The Incubation Programme */}
              <div className="space-y-6">
                <button
                  onClick={() => setPage(1)}
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-emerald-600 transition-colors"
                >
                  <ArrowRight size={14} className="rotate-180" /> Back to
                  Overview
                </button>
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                    The IncuVera{' '}
                    <span className="text-emerald-600">
                      Structured Growth Framework™
                    </span>
                  </h2>
                  <p className="text-lg text-gray-500 max-w-2xl">
                    A five-phase transformation journey designed to move
                    businesses from uncertainty to structured scale.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {[
                  {
                    phase: 'Phase 1',
                    title: 'Strategic Diagnostic & Viability Assessment',
                    details: [
                      'Business health (operations, finance, systems)',
                      'Market positioning',
                      'Sales & marketing performance',
                      'Growth bottlenecks',
                      'Founder readiness',
                    ],
                    outcome:
                      'A documented IncuVera Diagnostic Report and structured entry decision.',
                  },
                  {
                    phase: 'Phase 2',
                    title: 'Strategic Architecture & Commercial Blueprint',
                    details: [
                      'Vision & value proposition refinement',
                      'Revenue model optimisation',
                      'Market positioning strategy',
                      '90-day execution blueprint',
                    ],
                    outcome:
                      'A structured commercial roadmap aligned to long-term scale.',
                  },
                  {
                    phase: 'Phase 3',
                    title: 'Structural Build & Brand Systemisation',
                    details: [
                      'Brand positioning alignment',
                      'Digital ecosystem build',
                      'CRM and automation systems',
                      'Financial control structures',
                      'Operational workflows',
                    ],
                    outcome: 'A business built on systems, not hustle.',
                  },
                  {
                    phase: 'Phase 4',
                    title: 'Market Activation & Revenue Acceleration',
                    details: [
                      'Sales frameworks',
                      'Campaign strategy',
                      'Team enablement',
                      'Revenue launch support',
                    ],
                    outcome:
                      'Measured market traction and strategic positioning.',
                  },
                  {
                    phase: 'Phase 5',
                    title: 'Performance Governance & Founder Empowerment',
                    details: [
                      'Weekly KPI tracking',
                      'Financial performance review',
                      'Strategy refinement',
                      'Founder leadership alignment',
                    ],
                    outcome:
                      'A confident founder leading a structured enterprise.',
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-8 bg-white rounded-[32px] shadow-sm border border-gray-100 grid md:grid-cols-12 gap-8 items-start"
                  >
                    <div className="md:col-span-3">
                      <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                        {item.phase}
                      </span>
                      <h3 className="text-lg font-bold mt-1 leading-tight">
                        {item.title}
                      </h3>
                    </div>
                    <div className="md:col-span-5 space-y-4">
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                        Focus Areas
                      </p>
                      <ul className="grid grid-cols-1 gap-2">
                        {item.details.map((detail, di) => (
                          <li
                            key={di}
                            className="text-sm text-gray-600 flex items-start gap-2"
                          >
                            <div className="w-1 h-1 rounded-full bg-gray-300 mt-2 shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="md:col-span-4 p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 mb-2">
                        Outcome
                      </p>
                      <p className="text-sm font-medium text-emerald-900">
                        {item.outcome}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-8 bg-white rounded-[32px] shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center space-y-2">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                    Programme Duration
                  </p>
                  <p className="text-2xl font-bold">3–6 Months</p>
                  <p className="text-xs text-gray-400">
                    Depending on Business Complexity
                  </p>
                </div>
                <div className="p-8 bg-white rounded-[32px] shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center space-y-2">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                    Admission
                  </p>
                  <p className="text-2xl font-bold">Selective Intake</p>
                  <p className="text-xs text-gray-400">
                    Following diagnostic review
                  </p>
                </div>
                <button className="bg-black text-white p-8 rounded-[32px] flex flex-col justify-center items-center text-center space-y-4 hover:bg-gray-900 transition-colors group">
                  <Zap className="text-emerald-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="text-lg font-bold">Apply for Incubation</p>
                    <p className="text-xs opacity-50">
                      Start your transformation journey
                    </p>
                  </div>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
