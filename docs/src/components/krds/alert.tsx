"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";

const alertVariants = cva(
  "relative w-full rounded-md border p-4 text-sm [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:translate-y-[-3px] [&:has(svg)]:pl-11",
  {
    variants: {
      variant: {
        default: "bg-white text-[#0F172A] border-[#E2E8F0] dark:bg-[#1E293B] dark:text-[#F8FAFC] dark:border-[#334155]",
        info: "bg-[#E1F5FE] text-[#01579B] border-sky-200 dark:bg-sky-900/30 dark:text-sky-300 dark:border-sky-800",
        success: "bg-[#E8F5E9] text-[#1B5E20] border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800",
        warning: "bg-[#FFF3E0] text-[#E65100] border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800",
        error: "bg-[#FFEBEE] text-[#D32F2F] border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
  )
);
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5 ref={ref} className={cn("mb-1 font-semibold leading-none tracking-tight", className)} {...props} />
  )
);
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm leading-relaxed [&_p]:leading-relaxed", className)} {...props} />
  )
);
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription, alertVariants };
