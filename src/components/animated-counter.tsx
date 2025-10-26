"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useInView } from '@/hooks/use-in-view';

interface AnimatedCounterProps {
  endValue: number;
  duration?: number;
  isFloat?: boolean;
}

export function AnimatedCounter({ endValue, duration = 2000, isFloat = false }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (inView) {
      let startTime: number;
      const animateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const currentProgress = Math.min(progress / duration, 1);
        const newCount = currentProgress * endValue;
        
        setCount(newCount);

        if (progress < duration) {
          requestAnimationFrame(animateCount);
        } else {
            setCount(endValue);
        }
      };
      requestAnimationFrame(animateCount);
    }
  }, [inView, endValue, duration]);

  const formatValue = (value: number) => {
    if(isFloat) {
        return value.toFixed(1);
    }
    return Math.floor(value).toLocaleString();
  }

  return <span ref={ref}>{formatValue(count)}</span>;
}
