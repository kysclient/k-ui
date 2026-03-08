"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";

const progressVariants = cva(
  "w-full overflow-hidden rounded-full bg-[#E2E8F0] dark:bg-[#334155]",
  {
    variants: {
      size: {
        sm: "h-1.5",
        md: "h-2.5",
        lg: "h-4",
      },
      variant: {
        default:
          "[&>.progress-bar]:bg-[#004098] [&>.progress-bar]:dark:bg-[#306DE0]",
        success:
          "[&>.progress-bar]:bg-[#2E7D32] [&>.progress-bar]:dark:bg-[#2E7D32]",
        warning:
          "[&>.progress-bar]:bg-[#ED6C02] [&>.progress-bar]:dark:bg-[#ED6C02]",
        error:
          "[&>.progress-bar]:bg-[#D32F2F] [&>.progress-bar]:dark:bg-[#D32F2F]",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  },
);

export interface ProgressProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "role">,
    VariantProps<typeof progressVariants> {
  value?: number;
  max?: number;
  showValue?: boolean;
  indeterminate?: boolean;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      value = 0,
      max = 100,
      size,
      variant,
      showValue = false,
      indeterminate = false,
      ...props
    },
    ref,
  ) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    return (
      <div className={showValue ? "flex items-center gap-2" : undefined}>
        <div
          ref={ref}
          role="progressbar"
          aria-valuenow={indeterminate ? undefined : value}
          aria-valuemin={0}
          aria-valuemax={max}
          className={cn(progressVariants({ size, variant }), className)}
          {...props}
        >
          <div
            className={cn(
              "progress-bar h-full rounded-full transition-all duration-300",
              indeterminate && "animate-progress-indeterminate",
            )}
            style={
              indeterminate
                ? {
                    width: "40%",
                    animation:
                      "progress-indeterminate 1.5s ease-in-out infinite",
                  }
                : { width: `${percentage}%` }
            }
          />
        </div>
        {showValue && !indeterminate && (
          <span className="text-xs text-[#334155] dark:text-[#CBD5E1] shrink-0 tabular-nums">
            {Math.round(percentage)}%
          </span>
        )}
        <style
          dangerouslySetInnerHTML={{
            __html: `@keyframes progress-indeterminate{0%{transform:translateX(-100%)}50%{transform:translateX(150%)}100%{transform:translateX(-100%)}}`,
          }}
        />
      </div>
    );
  },
);
Progress.displayName = "Progress";

export { Progress, progressVariants };
