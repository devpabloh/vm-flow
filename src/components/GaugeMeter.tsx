interface GaugeMeterProps {
  percentage: number;
  label: string;
  color?: string;
  trackColor?: string;
}

export function GaugeMeter({
  percentage,
  label,
  color = '#2563eb',
  trackColor = '#e2e8f0'
}: GaugeMeterProps) {
  const size = 110;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Label superior */}
      <span className="text-xs font-semibold text-text-primary">{label}</span>

      {/* Anel SVG */}
      <div className="relative flex items-center justify-center">
        <svg width={size} height={size} className="-rotate-90">
          {/* Trilha de fundo */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={trackColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            className="transition-all duration-500"
          />
          {/* Barra de progresso preenchida */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Porcentagem central */}
        <span className="absolute text-base font-bold text-text-primary">{percentage}%</span>
      </div>
    </div>
  );
}
