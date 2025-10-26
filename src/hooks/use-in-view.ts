"use client"

import { useState, useEffect, useRef, type RefObject } from 'react';

type UseInViewOptions = {
    threshold?: number | number[];
    triggerOnce?: boolean;
};

export function useInView<T extends HTMLElement>(options: UseInViewOptions = {}): { ref: RefObject<T>; inView: boolean } {
  const { threshold = 0.1, triggerOnce = false } = options;
  const [inView, setInView] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else {
          if (!triggerOnce) {
            setInView(false);
          }
        }
      },
      {
        threshold,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [triggerOnce, threshold]);

  return { ref, inView };
}
