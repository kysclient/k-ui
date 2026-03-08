"use client";

import * as React from "react";
import { cn } from "./utils";

/* ------------------------------------------------------------------ */
/*  Context                                                           */
/* ------------------------------------------------------------------ */

interface CarouselContextType {
  current: number;
  total: number;
  scrollTo: (index: number) => void;
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
}

const CarouselContext = React.createContext<CarouselContextType>({
  current: 0,
  total: 0,
  scrollTo: () => {},
  scrollPrev: () => {},
  scrollNext: () => {},
  canScrollPrev: false,
  canScrollNext: true,
});

export function useCarousel() {
  return React.useContext(CarouselContext);
}

/* ------------------------------------------------------------------ */
/*  Carousel (root)                                                   */
/* ------------------------------------------------------------------ */

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  autoPlay?: boolean;
  interval?: number;
  loop?: boolean;
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      className,
      children,
      autoPlay = false,
      interval = 5000,
      loop = true,
      ...props
    },
    ref
  ) => {
    const [current, setCurrent] = React.useState(0);
    const [total, setTotal] = React.useState(0);

    const canScrollPrev = loop || current > 0;
    const canScrollNext = loop || current < total - 1;

    const scrollTo = React.useCallback(
      (index: number) => {
        if (total === 0) return;
        if (loop) {
          setCurrent(((index % total) + total) % total);
        } else {
          setCurrent(Math.max(0, Math.min(index, total - 1)));
        }
      },
      [total, loop]
    );

    const scrollPrev = React.useCallback(() => {
      scrollTo(current - 1);
    }, [current, scrollTo]);

    const scrollNext = React.useCallback(() => {
      scrollTo(current + 1);
    }, [current, scrollTo]);

    React.useEffect(() => {
      if (!autoPlay || total === 0) return;
      const timer = setInterval(() => {
        scrollTo(current + 1);
      }, interval);
      return () => clearInterval(timer);
    }, [autoPlay, interval, current, total, scrollTo]);

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          scrollPrev();
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext]
    );

    const ctx = React.useMemo<CarouselContextType>(
      () => ({ current, total, scrollTo, scrollPrev, scrollNext, canScrollPrev, canScrollNext }),
      [current, total, scrollTo, scrollPrev, scrollNext, canScrollPrev, canScrollNext]
    );

    return (
      <CarouselContext.Provider value={ctx}>
        <div
          ref={ref}
          role="region"
          aria-roledescription="carousel"
          aria-label="Carousel"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className={cn("relative focus-visible:outline-none", className)}
          {...props}
        >
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child) && (child.type as any) === CarouselContent) {
              return React.cloneElement(child as React.ReactElement<any>, {
                _onCount: setTotal,
              });
            }
            return child;
          })}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

/* ------------------------------------------------------------------ */
/*  CarouselContent                                                   */
/* ------------------------------------------------------------------ */

export interface CarouselContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** @internal */
  _onCount?: (count: number) => void;
}

const CarouselContent = React.forwardRef<HTMLDivElement, CarouselContentProps>(
  ({ className, children, _onCount, ...props }, ref) => {
    const { current } = useCarousel();
    const itemCount = React.Children.count(children);

    React.useEffect(() => {
      _onCount?.(itemCount);
    }, [itemCount, _onCount]);

    return (
      <div
        ref={ref}
        className={cn("overflow-hidden rounded-md", className)}
        {...props}
      >
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
          aria-live="polite"
        >
          {React.Children.map(children, (child, index) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child as React.ReactElement<any>, {
                "aria-roledescription": "slide",
                "aria-label": `${index + 1} / ${itemCount}`,
              });
            }
            return child;
          })}
        </div>
      </div>
    );
  }
);
CarouselContent.displayName = "CarouselContent";

/* ------------------------------------------------------------------ */
/*  CarouselItem                                                      */
/* ------------------------------------------------------------------ */

export interface CarouselItemProps extends React.HTMLAttributes<HTMLDivElement> {}

const CarouselItem = React.forwardRef<HTMLDivElement, CarouselItemProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="group"
      className={cn("w-full flex-shrink-0", className)}
      {...props}
    />
  )
);
CarouselItem.displayName = "CarouselItem";

/* ------------------------------------------------------------------ */
/*  CarouselPrevious                                                  */
/* ------------------------------------------------------------------ */

export interface CarouselPreviousProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const CarouselPrevious = React.forwardRef<HTMLButtonElement, CarouselPreviousProps>(
  ({ className, ...props }, ref) => {
    const { scrollPrev, canScrollPrev } = useCarousel();

    return (
      <button
        ref={ref}
        type="button"
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        aria-label="Previous slide"
        className={cn(
          "absolute left-2 top-1/2 -translate-y-1/2 z-10",
          "inline-flex items-center justify-center",
          "h-8 w-8 rounded-full",
          "bg-white/80 dark:bg-[#1E293B]/80",
          "border border-[#E2E8F0] dark:border-[#334155]",
          "text-[#334155] dark:text-[#CBD5E1]",
          "hover:bg-white dark:hover:bg-[#1E293B]",
          "shadow-sm",
          "disabled:opacity-50 disabled:pointer-events-none",
          "transition-colors",
          className
        )}
        {...props}
      >
        <svg
          className="h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    );
  }
);
CarouselPrevious.displayName = "CarouselPrevious";

/* ------------------------------------------------------------------ */
/*  CarouselNext                                                      */
/* ------------------------------------------------------------------ */

export interface CarouselNextProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const CarouselNext = React.forwardRef<HTMLButtonElement, CarouselNextProps>(
  ({ className, ...props }, ref) => {
    const { scrollNext, canScrollNext } = useCarousel();

    return (
      <button
        ref={ref}
        type="button"
        onClick={scrollNext}
        disabled={!canScrollNext}
        aria-label="Next slide"
        className={cn(
          "absolute right-2 top-1/2 -translate-y-1/2 z-10",
          "inline-flex items-center justify-center",
          "h-8 w-8 rounded-full",
          "bg-white/80 dark:bg-[#1E293B]/80",
          "border border-[#E2E8F0] dark:border-[#334155]",
          "text-[#334155] dark:text-[#CBD5E1]",
          "hover:bg-white dark:hover:bg-[#1E293B]",
          "shadow-sm",
          "disabled:opacity-50 disabled:pointer-events-none",
          "transition-colors",
          className
        )}
        {...props}
      >
        <svg
          className="h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    );
  }
);
CarouselNext.displayName = "CarouselNext";

/* ------------------------------------------------------------------ */
/*  CarouselDots                                                      */
/* ------------------------------------------------------------------ */

export interface CarouselDotsProps extends React.HTMLAttributes<HTMLDivElement> {}

const CarouselDots = React.forwardRef<HTMLDivElement, CarouselDotsProps>(
  ({ className, ...props }, ref) => {
    const { current, total, scrollTo } = useCarousel();

    return (
      <div
        ref={ref}
        role="tablist"
        aria-label="Slides"
        className={cn("flex gap-1.5 justify-center mt-3", className)}
        {...props}
      >
        {Array.from({ length: total }, (_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={current === i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => scrollTo(i)}
            className={cn(
              "h-2 w-2 rounded-full transition-colors",
              current === i
                ? "bg-[#004098] dark:bg-[#6B9BF2]"
                : "bg-[#CBD5E1] dark:bg-[#475569]"
            )}
          />
        ))}
      </div>
    );
  }
);
CarouselDots.displayName = "CarouselDots";

/* ------------------------------------------------------------------ */
/*  Exports                                                           */
/* ------------------------------------------------------------------ */

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
};
