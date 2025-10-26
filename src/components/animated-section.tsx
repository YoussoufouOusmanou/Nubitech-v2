"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { useInView } from '@/hooks/use-in-view';

interface AnimatedSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function AnimatedSection({ children, className, ...props }: AnimatedSectionProps) {
  const { ref, inView } = useInView<HTMLDivElement>({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={cn(
        'fade-in-up',
        { 'fade-in-up-visible': inView },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
