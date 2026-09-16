import { cva, type VariantProps } from 'class-variance-authority';
import SpinnerIcon from '../assets/spinner-loading.svg?react';
import { Icon } from './icon';
import { Text } from './text';

const buttonVariants = cva(
  'flex items-center gap-2 px-5 py-2.5 bg-action-primary rounded-lg hover:bg-action-primary-hover transition-colors shadow-sm cursor-pointer',
  {
    variants: {
      variant: {
        primary: 'bg-gray-200 hover:bg-pink-light',
        link: 'bg-transparent p-0 h-auto rounded-none text-action-primary hover:text-action-primary-hover'
      },
      size: {
        md: 'h-14 py-4 px-5',
        auto: 'h-auto p-0'
      },
      disabled: {
        true: 'opacity-50 pointer-events-none'
      },
      handling: {
        true: 'pointer-events-none'
      }
    },
    defaultVariants: {
      size: 'md',
      disabled: false,
      handling: false
    }
  }
);

const buttonTextVariants = cva('text-white font-medium text-xs', {
  variants: {
    variant: {
      primary: 'text-gray-400',
      link: 'text-xs font-semibold text-action-primary group-hover:text-action-primary-hover'
    }
  },
  defaultVariants: {
    variant: 'primary'
  }
});

const buttonIconVariants = cva('transition', {
  variants: {
    variant: {
      primary: 'fill-pink-base',
      link: 'text-action-primary group-hover:text-action-primary-hover' // ✅ Adicionado
    },
    size: {
      md: 'w-5 h-5',
      auto: 'w-4 h-4'
    }
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md'
  }
});

interface ButtonProps
  extends
    Omit<React.ComponentProps<'button'>, 'children' | 'disabled' | 'size'>,
    VariantProps<typeof buttonVariants> {
  children: string;
  icon?: React.ComponentProps<typeof Icon>['svg'];
}

export function Button({
  variant,
  size,
  disabled,
  className,
  children,
  icon,
  handling,
  ...props
}: ButtonProps) {
  const IconComponent = handling ? SpinnerIcon : icon;

  const computedSize = variant === 'link' && !size ? 'auto' : size;

  return (
    <button
      {...props}
      type={props.type ?? 'button'}
      aria-busy={handling || undefined}
      disabled={Boolean(disabled || handling)}
      className={buttonVariants({
        variant,
        size: computedSize,
        disabled,
        handling,
        className
      })}
    >
      {IconComponent && (
        <Icon
          svg={IconComponent}
          animate={handling}
          aria-hidden="true"
          focusable="false"
          className={buttonIconVariants({ variant, size: computedSize })}
        />
      )}
      <Text variant="body-md-bold" className={buttonTextVariants({ variant })}>
        {children}
      </Text>
    </button>
  );
}
