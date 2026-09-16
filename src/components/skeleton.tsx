import { cva, type VariantProps } from 'class-variance-authority';
import type React from 'react';

const skeletonVariants = cva('animate-pulse bg-gray-200 pointer-events-none', {
  variants: {
    variant: {
      default: '',
      // Atalho para títulos
      title: 'h-8 w-48 rounded-lg',
      // Atalho para linhas de texto comuns
      text: 'h-4 w-full rounded-md',
      // Atalho para elementos circulares (avatares, badges)
      circular: 'rounded-full shrink-0',
      // Atalho para o formato de card completo
      card: 'rounded-2xl border border-border-default bg-background-secondary p-4'
    },
    rounded: {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      full: 'rounded-full'
    }
  },
  defaultVariants: {
    variant: 'default',
    rounded: 'lg'
  }
});

interface skeletonProps
  extends VariantProps<typeof skeletonVariants>, React.ComponentProps<'div'> {}

export function Skeleton({ variant, rounded, className, ...props }: skeletonProps) {
  return <div className={skeletonVariants({ variant, rounded, className })} {...props} />;
}
