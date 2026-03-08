"use client";

import * as React from "react";
import { cn } from "./utils";

export interface TooltipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "content"> {
  content: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  delayMs?: number;
}

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  ({ className, content, side = "top", delayMs = 200, children, ...props }, ref) => {
    const [visible, setVisible] = React.useState(false);
    const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>(undefined);

    const show = () => {
      timeoutRef.current = setTimeout(() => setVisible(true), delayMs);
    };
    const hide = () => {
      clearTimeout(timeoutRef.current);
      setVisible(false);
    };

    React.useEffect(() => () => clearTimeout(timeoutRef.current), []);

    const positionClasses = {
      top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
      bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
      left: "right-full top-1/2 -translate-y-1/2 mr-2",
      right: "left-full top-1/2 -translate-y-1/2 ml-2",
    };

    return (
      <div
        ref={ref}
        className={cn("relative inline-flex", className)}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        {...props}
      >
        {children}
        <div
          role="tooltip"
          className={cn(
            "absolute z-50 px-3 py-1.5 text-xs font-medium rounded shadow-md whitespace-nowrap pointer-events-none",
            "bg-[#0F172A] text-white dark:bg-[#F1F5F9] dark:text-[#0F172A]",
            "transition-all duration-150",
            visible ? "opacity-100 scale-100" : "opacity-0 scale-95",
            positionClasses[side]
          )}
        >
          {content}
        </div>
      </div>
    );
  }
);
Tooltip.displayName = "Tooltip";

export { Tooltip };
