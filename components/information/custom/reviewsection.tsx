'use client';

export function ReviewSection({
  title,
  icon,
  children,
  className = '',
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center gap-2 pb-2 border-bottom border-neutral-100">
        <div className="text-neutral-400">{icon}</div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400">
          {title}
        </h3>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

export function ReviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-neutral-400 mb-1">{label}</dt>
      <dd className="text-sm font-medium text-neutral-800">
        {value || <span className="text-neutral-300 italic">Not provided</span>}
      </dd>
    </div>
  );
}
