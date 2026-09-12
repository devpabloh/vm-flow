interface ResourceBarProps {
  name: string;
  percentage: number;
}

export function ResourceBar({ name, percentage }: ResourceBarProps) {
  return (
    <div>
      <span>{name}</span>
      <div>
        <div
          className="bg-blue-600 h-full rounded-full transition-all duration-300"
          style={{ width: `${percentage}` }}
        />
      </div>
      <span className="text-xs font-semibold  text-brand-main min-w-[35px] text-right">
        {percentage}%
      </span>
    </div>
  );
}
