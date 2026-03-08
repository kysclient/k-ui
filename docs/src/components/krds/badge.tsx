"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";

const badgeVariants = cva(
  "inline-flex items-center font-medium whitespace-nowrap border rounded-[2px] transition-colors duration-150",
  {
    variants: {
      variant: {
        default: "bg-[#E8F0FE] text-[#004098] border-[#C5D9F9] dark:bg-[#004098]/50 dark:text-[#9EBEF4] dark:border-[#004098]",
        success: "bg-[#E8F5E9] text-[#1B5E20] border-[#C8E6C9] dark:bg-[#14532D]/50 dark:text-[#86EFAC] dark:border-[#15803D]",
        warning: "bg-[#FFF3E0] text-[#E65100] border-[#FFE0B2] dark:bg-[#7C2D12]/50 dark:text-[#FDBA74] dark:border-[#C2410C]",
        error: "bg-[#FFEBEE] text-[#B71C1C] border-[#FFCDD2] dark:bg-[#7F1D1D]/50 dark:text-[#FCA5A5] dark:border-[#B91C1C]",
        info: "bg-[#E1F5FE] text-[#01579B] border-[#B3E5FC] dark:bg-[#0C4A6E]/50 dark:text-[#7DD3FC] dark:border-[#0369A1]",
        neutral: "bg-[#F1F5F9] text-[#334155] border-[#E2E8F0] dark:bg-[#1E293B] dark:text-[#CBD5E1] dark:border-[#475569]",
        outline: "bg-transparent text-[#334155] border-[#CBD5E1] dark:text-[#CBD5E1] dark:border-[#475569]",
      },
      size: {
        sm: "px-1.5 py-0.5 text-xs",
        md: "px-2 py-0.5 text-xs",
        lg: "px-2.5 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, dot, children, ...props }, ref) => {
    return (
      <span ref={ref} className={cn(badgeVariants({ variant, size, className }))} {...props}>
        {dot && <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 shrink-0" aria-hidden="true" />}
        {children}
      </span>
    );
  },
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
