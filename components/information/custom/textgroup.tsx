'use client';

import React from 'react';

interface TextAreaGroupProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  description?: string;
  error?: string;
}

export const TextAreaGroup = React.forwardRef<
  HTMLTextAreaElement,
  TextAreaGroupProps
>(({ label, description, error, ...props }, ref) => {
  return (
    <div className="space-y-2">
      <div className="flex flex-col">
        <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">
          {label}
        </label>
        {description && (
          <span className="text-xs text-neutral-400 mt-0.5">{description}</span>
        )}
      </div>
      <textarea
        ref={ref}
        {...props}
        rows={4}
        className={`w-full bg-neutral-50 border rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-neutral-900/5 focus:border-neutral-900 transition-all resize-none ${error ? 'border-red-500' : 'border-neutral-200'}`}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
});
