import { useEffect, useRef, type ComponentProps } from 'react';
import { cn } from '@/lib/cn';

/**
 * HomeLayout's default container is a `<main>` that wraps the header; replacing it keeps
 * one `<main>` landmark, leaves header/footer as `banner`/`contentinfo`, puts the skip
 * link before the repeated navigation, and distinguishes the primary `<nav>` landmark.
 */
export function PageShellContainer({ className, children, ...rest }: ComponentProps<'main'>) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.querySelector('#nd-nav nav')?.setAttribute('aria-label', '主导航');
  }, []);

  return (
    <div
      ref={ref}
      className={cn('flex flex-1 flex-col [--fd-layout-width:1400px]', className)}
      {...(rest as ComponentProps<'div'>)}
    >
      <a href="#lp-content" className="skip-link">
        跳到主要内容
      </a>
      {children}
    </div>
  );
}
