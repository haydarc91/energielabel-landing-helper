
import { useEffect, useRef } from 'react';

/**
 * Hook to animate elements when they enter the viewport
 */
export const useIntersectionAnimation = (
  animationClass: string = 'animate-fade-in',
  threshold: number = 0.1,
  delay: number = 0
) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add(animationClass);
            }, delay);
            
            // Once the animation is applied, no need to observe anymore
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [animationClass, threshold, delay]);

  return ref;
};

/**
 * Hook to create a staggered animation for child elements
 */
export const useStaggeredAnimation = (
  childSelector: string,
  animationClass: string = 'animate-fade-in',
  staggerDelay: number = 100
) => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const container = entry.target as HTMLElement;
            const children = container.querySelectorAll(childSelector);
            
            children.forEach((child, index) => {
              setTimeout(() => {
                child.classList.add(animationClass);
              }, index * staggerDelay);
            });
            
            observer.unobserve(container);
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [childSelector, animationClass, staggerDelay]);

  return containerRef;
};
