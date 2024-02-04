"use client"

import { useState, useEffect, type RefObject } from "react";

export function useInView(ref: RefObject<HTMLElement>) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (ref?.current) {
      const observer = new IntersectionObserver(([entry]) => {
        setIsInView(entry.isIntersecting);
      });

      observer.observe(ref.current);

      return () => observer.disconnect();
    }
  }, [ref]);

  return { isInView };
};