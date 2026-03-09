'use client';

import React from 'react';

interface InputGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

export const InputGroup = React.forwardRef<HTMLInputElement, InputGroupProps>(
  ({ label, error, icon, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">
          {label}
        </label>
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            {...props}
            className={`w-full bg-neutral-50 border rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-neutral-900/5 focus:border-neutral-900 transition-all ${error ? 'border-red-500' : 'border-neutral-200'} ${icon ? 'pl-11' : ''}`}
          />
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  },
);
