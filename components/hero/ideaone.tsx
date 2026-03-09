'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { AlertCircle, Check, CheckCircle2, X } from 'lucide-react';

export default function IdeaOne() {
  return (
    <section className="py-24  max-w-7xl mx-auto">
      <section className="py-32 px-2 ">
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
          </motion.div>
        </div>
        <div className="mt-5 md:mt-10 grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-[2rem] overflow-hidden border border-zinc-200 shadow-2xl">
          {/* What We Do */}
          <div className="relative bg-white dark:bg-gray-300 p-12 lg:p-20 flex flex-col justify-between min-h-[500px]">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-gray-300 text-emerald-600 text-xs font-bold uppercase tracking-wider mb-8">
                <Check className="w-3 h-3" /> What We Do
              </div>
              <h4 className="text-5xl font-bold tracking-tighter mb-6 leading-none">
                <span className="text-black dark:text-black">We build</span>
                <br />
                <span className="text-emerald-500 dark:text-emerald-700">
                  Future-Proof
                </span>{' '}
                <br />
                <span className="text-black dark:text-black">
                  Digital Products.
                </span>
              </h4>
              <ul className="space-y-4 text-zinc-600">
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-fullbg-emerald-500" />
                  Custom Software Engineering
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  High-End UI/UX Design
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Scalable Cloud Infrastructure
                </li>
              </ul>
            </div>
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
              <Image
                src="/img_5.jpeg"
                alt="Abstract"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* What We Don't */}
          <div className="relative bg-zinc-900 p-12 lg:p-20 flex flex-col justify-between min-h-[500px] text-white">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-zinc-400 text-xs font-bold uppercase tracking-wider mb-8">
                <X className="w-3 h-3" /> What We Don&apos;t
              </div>
              <h4 className="text-5xl font-bold tracking-tighter mb-6 leading-none">
                We don&apos;t <br />
                <span className="text-zinc-500 line-through">
                  Cut Corners
                </span>{' '}
                <br />
                for Speed.
              </h4>
              <p className="text-neutral-400">
                We build structure. We implement the governance, operational
                systems, and strategic frameworks that turn ideas into assets.
              </p>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1/2 opacity-20 pointer-events-none grayscale">
              <Image
                src="/img_5.jpeg"
                alt="Abstract Dark"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
