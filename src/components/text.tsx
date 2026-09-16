import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

export const textVariants = cva('text-text-primary transition-colors', {
  variants: {
    variant: {
      // Títulos (Headings)
      h1: 'text-3xl font-bold tracking-tight md:text-4xl',
      h2: 'text-2xl font-bold tracking-tight md:text-3xl',
      h3: 'text-xl font-semibold tracking-tight md:text-2xl',
      h4: 'text-lg font-semibold md:text-xl',

      // Parágrafos e Textos de Corpo (Body)
      'body-lg': 'text-lg leading-7 font-normal',
      'body-lg-bold': 'text-lg leading-7 font-semibold',
      'body-md': 'text-base leading-6 font-normal',
      'body-md-bold': 'text-base leading-6 font-semibold',
      'body-sm': 'text-sm leading-5 font-normal',
      'body-sm-bold': 'text-sm leading-5 font-semibold',
      'body-xs': 'text-xs leading-4 font-normal',
      'body-xs-bold': 'text-xs leading-4 font-semibold',

      // Textos de Apoio / Legenda / Explicação
      caption: 'text-sm leading-relaxed text-text-secondary',
      explanation: 'text-xs leading-relaxed text-text-secondary',
      helper: 'text-[11px] leading-tight text-text-secondary'
    }
  },
  defaultVariants: {
    variant: 'body-md'
  }
});

type AsElement = keyof React.JSX.IntrinsicElements;

// Mapeamento automático de tag semântica de acordo com a variante escolhida
const defaultElementMap: Partial<
  Record<NonNullable<VariantProps<typeof textVariants>['variant']>, AsElement>
> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  'body-lg': 'p',
  'body-md': 'p',
  'body-sm': 'p',
  caption: 'p',
  explanation: 'p',
  helper: 'span'
};

interface TextProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof textVariants> {
  as?: AsElement;
  children?: React.ReactNode;
}

export function Text({ as, variant = 'body-md', className, children, ...props }: TextProps) {
  // Se o usuário não passou 'as' explicitamente, usa a tag semântica padrão da variante ou 'span'
  const Component = as || (variant ? defaultElementMap[variant] : undefined) || 'span';

  return React.createElement(
    Component,
    {
      className: textVariants({ variant, className }),
      ...props
    },
    children
  );
}
