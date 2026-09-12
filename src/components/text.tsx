import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const textVariants = cva('', {
  variants: {
    variant: {
      'body-sm-bold': 'text-sm leading-5 font-semibold',
      'body-md': 'text-base leading-6 font-normal',
      'body-md-bold': 'text-base leading-6 font-semibold'
    }
  },
  defaultVariants: {
    variant: 'body-md'
  }
});

interface TextProps extends VariantProps<typeof textVariants> {
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  children?: string;
}

export function Text({ as = 'span', variant, className, children, ...props }: TextProps) {
  return React.createElement(
    as,
    {
      className: textVariants({ variant, className }),
      ...props
    },
    children
  );
}
