"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const progressVariants = cva(
  "w-full overflow-hidden rounded-full bg-krds-gray-200 dark:bg-krds-gray-700",
  {
    variants: {
      size: {
        sm: "h-1.5",
        md: "h-2.5",
        lg: "h-4",
      },
      variant: {
        default:
          "[&>.progress-bar]:bg-krds-primary [&>.progress-bar]:dark:bg-krds-primary-500",
        success:
          "[&>.progress-bar]:bg-krds-success [&>.progress-bar]:dark:bg-green-500",
        warning:
          "[&>.progress-bar]:bg-krds-warning [&>.progress-bar]:dark:bg-orange-500",
        error:
          "[&>.progress-bar]:bg-krds-error [&>.progress-bar]:dark:bg-red-500",
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
  /** 현재 진행률 (0-100) */
  value?: number;
  /** 최대값 */
  max?: number;
  /** 퍼센트 텍스트 표시 */
  showValue?: boolean;
  /** 불확정 애니메이션 상태 */
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
          <span className="text-xs text-krds-gray-700 dark:text-krds-gray-300 shrink-0 tabular-nums">
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
