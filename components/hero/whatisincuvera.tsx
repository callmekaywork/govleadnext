import * as motion from 'motion/react-client';
import {
  AlertCircle,
  Building2,
  CheckCircle2,
  ChevronRight,
  Target,
  Users,
} from 'lucide-react';

export default function WhatisIncuvera() {
  return (
    <div className="flex flex-col justify-center items-center min-h-180 md:min-h-screen bg-neutral-50 dark:bg-neutral-900  w-full ">
      {/* Mandate Section */}
      <section className="py-32 px-6 border-y border-neutral-100">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-600">
              The IncuVera Mandate
            </h2>
            <h3 className="text-3xl md:text-5xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 leading-tight">
              Entrepreneurial potential is abundant. <br />
              <span className="text-neutral-400">
                Structured execution is rare.
              </span>
            </h3>
            <p className="text-xl text-neutral-600 leading-relaxed max-w-3xl mx-auto font-light">
              IncuVera exists to close that gap — by providing entrepreneurs,
              professionals, and academics with the systems, strategy,
              governance, and network required to build sustainable businesses.
            </p>

            <div className="pt-12 grid grid-cols-1 md:grid-cols-2 gap-8 data-[cursor=contrast]:overflow-hidden">
              <div
                data-cursor="contrast"
                className="p-8 bg-white dark:bg-neutral-950 rounded-3xl border border-neutral-200 dark:border-neutral-900 shadow-sm text-left"
              >
                <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-6">
                  <AlertCircle size={24} />
                </div>
                <h4 className="text-lg font-bold mb-2">What we don't do</h4>
                <p className="text-neutral-500">
                  We do not offer motivation or generic inspiration. We believe
                  success is a product of discipline, not just desire.
                </p>
              </div>
              <div
                data-cursor="contrast"
                className="p-8 bg-neutral-900 dark:bg-neutral-950 text-white rounded-3xl shadow-xl text-left"
              >
                <div className="w-12 h-12 bg-emerald-500 text-neutral-900 rounded-2xl flex items-center justify-center mb-6">
                  <CheckCircle2 size={24} />
                </div>
                <h4 className="text-lg font-bold mb-2">What we build</h4>
                <p className="text-neutral-400">
                  We build structure. We implement the governance, operational
                  systems, and strategic frameworks that turn ideas into assets.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-32 px-6 bg-neutral-50 dark:bg-neutral-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-600 mb-4">
              The Process
            </h2>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tight text-neutral-900 dark:text-white">
              How IncuVera Works
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-1/4 left-0 w-full h-px bg-neutral-100 -z-10" />

            <StepCard
              number="01"
              title="Exposure & Qualification"
              description="Attend our seminars and strategic networking events. Engage with our ecosystem and determine programme fit."
              icon={<Users className="w-6 h-6" />}
            />
            <StepCard
              number="02"
              title="Structured Incubation"
              description="Selected businesses enter a multi-phase transformation framework designed to build clarity, systems, and market readiness."
              icon={<Building2 className="w-6 h-6" />}
            />
            <StepCard
              number="03"
              title="Growth & Market Activation"
              description="We support implementation, revenue acceleration, and long-term performance governance."
              icon={<Target className="w-6 h-6" />}
            />
          </div>

          {/* <div className="mt-24 text-center">
            <button className="inline-flex items-center gap-2 px-10 py-5 bg-neutral-900 text-white rounded-2xl font-semibold text-lg hover:bg-neutral-800 transition-all shadow-xl">
              Start Your Journey <ChevronRight size={20} />
            </button>
          </div> */}
        </div>
      </section>
    </div>
  );
}

function StepCard({
  number,
  title,
  description,
  icon,
}: {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <motion.div
      data-cursor="contrast"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative p-8 bg-white dark:bg-neutral-950 rounded-3xl border border-neutral-100 dark:border-neutral-900 hover:border-emerald-200 dark:hover:border-emerald-950  transition-all group"
    >
      <div className="absolute -top-6 left-8 text-6xl font-bold text-neutral-50 opacity-0 group-hover:opacity-100 dark:group-hover:border-emerald-950 transition-opacity font-serif italic">
        {number}
      </div>
      <div className="w-14 h-14 bg-neutral-50 text-neutral-900 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-emerald-600 dark:group-hover:border-emerald-950 group-hover:text-white transition-colors">
        {icon}
      </div>
      <h4 className="text-xl font-bold mb-4 text-neutral-900 dark:text-neutral-200">
        {title}
      </h4>
      <p className="text-neutral-500 leading-relaxed">{description}</p>
    </motion.div>
  );
}
