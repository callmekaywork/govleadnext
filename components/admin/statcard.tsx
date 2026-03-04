'use client';

import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

export const StatCard = ({
  title,
  value,
  icon: Icon,
  colorClass,
  delay,
}: any) => (
  <motion.div
    data-cursor="contrast"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-neutral-800 flex items-center justify-between"
  >
    <div>
      <p className="text-sm font-medium text-slate-500 dark:text-slate-300 mb-1">
        {title}
      </p>
      <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-300">
        {value}
      </h3>
    </div>
    <div className={cn('p-3 rounded-xl', colorClass)}>
      <Icon className="w-6 h-6" />
    </div>
  </motion.div>
);
