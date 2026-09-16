import { type VariantProps, cva } from 'class-variance-authority';

const cardVariants = cva(
  'bg-background-secondary border border-border-default rounded-2xl transition-all',
  {
    variants: {
      padding: {
        none: 'p-0',
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6'
      },
      hover: {
        true: 'hover: border-slate-400 dark:hover:border-slate-600 transition-colors',
        false: ''
      }
    },
    defaultVariants: {
      padding: 'md',
      hover: false
    }
  }
);

interface cardProps extends React.ComponentProps<'div'>, VariantProps<typeof cardVariants> {
  children: React.ReactNode;
}

export function Card({ padding, hover, className, children, ...props }: cardProps) {
  return (
    <div className={cardVariants({ padding, hover, className })} {...props}>
      {children}
    </div>
  );
}
