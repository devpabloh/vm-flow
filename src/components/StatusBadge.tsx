export type StatusType = 'running' | 'stopped' | 'alert';

interface StatusBadgeProps {
    status: StatusType;
    label?: string;
}

export function StatusBadge ({status, label}: StatusBadgeProps){
    const configs = {
        running: {
            bg: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800',
            dot: 'bg-emerald-500',
            text: 'text-emerald-700 dark:text-emerald-400',
            defaultLabel: 'Em execução'
        },
        stopped: {
            bg: 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800',
            dot: 'bg-rose-500',
            text: 'text-rose-700 dark:text-rose-400',
            defaultLabel: 'Desligada'
        },
        alert: {
            bg: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800',
            dot: 'bg-amber-500',
            text: 'text-amber-700 dark:text-amber-400',
            defaultLabel: 'Com alerta'
        }
    }

    const config = configs[status];

    return (
        <span className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ring-gray-200 dark:ring-gray-800 ${config.bg} ${config.text}">
            <span className={`size-1.5 rounded-full ${config.dot}`} />
            {label || config.defaultLabel}
        </span>
    )
}

