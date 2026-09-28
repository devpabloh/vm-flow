import { cva, type VariantProps } from 'class-variance-authority';
import { CircleCheck, CircleX, Info, TriangleAlert, X, type LucideIcon } from 'lucide-react';
import { ButtonIcon } from './button-icon';

const alertVariants = cva('flex items-start gap-3 rounded-lg border px-4 py-3 fixed bottom-4 right-4 z-50', {
  variants: {
    variant: {
      info: 'bg-action-primary/10 border-action-primary/30 text-action-primary',
      success: 'bg-status-success/10 border-status-success/30 text-status-success',
      warning: 'bg-status-warning/10 border-status-warning/30 text-status-warning',
      error: 'bg-status-error/10 border-status-error/30 text-status-error'
    }
  },
  defaultVariants: {
    variant: 'info'
  }
});

type AlertVariant = NonNullable<VariantProps<typeof alertVariants>['variant']>;

// Ícone padrão de cada variante
const alertIcons: Record<AlertVariant, LucideIcon> = {
  info: Info,
  success: CircleCheck,
  warning: TriangleAlert,
  error: CircleX
};

interface AlertProps
  extends Omit<React.ComponentProps<'div'>, 'title'>, VariantProps<typeof alertVariants> {
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
}

export function Alert({
  variant = 'info',
  title,
  children,
  onClose,
  className,
  ...props
}: AlertProps) {
  const IconComponent = alertIcons[variant ?? 'info'];

  return (
    <div
      // Erros e avisos são anunciados na hora por leitores de tela; os demais, com calma
      role={variant === 'error' || variant === 'warning' ? 'alert' : 'status'}
      className={alertVariants({ variant, className })}
      {...props}
    >
      <IconComponent className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />

      <div className="flex flex-col gap-0.5 flex-1 text-sm leading-5">
        {title && <strong className="font-semibold">{title}</strong>}
        <p>{children}</p>
      </div>

      {onClose && (
        <ButtonIcon
          type="button"
          icon={X}
          variant="none"
          aria-label="Fechar alerta"
          onClick={onClose}
          className="text-inherit opacity-70 hover:opacity-100"
        />
      )}
    </div>
  );
}
