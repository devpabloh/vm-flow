interface GaugeMeterProps {
  percentage: number;
  label: string;
  strokeColor?: string; // Hex ou classe Tailwind
}

export function GaugeMeter({ percentage, label, strokeColor = '#3b82f6' }: GaugeMeterProps) {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            className="text-slate-100 dark:text-slate-800"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
          />

          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke={strokeColor}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-500 ease-out"
          />
        </svg>
        <span className="absolute text-sm font-bold text-brand-main">{percentage}%</span>
      </div>
      <span className="mt-2 text-xs font-medium text-brand-muted">{label}</span>
    </div>
  );
}
