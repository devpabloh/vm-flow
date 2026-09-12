import type React from 'react';
import { cx } from 'class-variance-authority';

interface MainContextProps extends React.ComponentProps<'div'> {}

export function MainContent({ children, className, ...props }: MainContextProps) {
  return (
    <main className={cx('min-h-0 flex-1 overflow-auto', className)} {...props}>
      {children}
    </main>
  );
}
