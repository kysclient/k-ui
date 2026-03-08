"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap border border-transparent transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#306DE0] focus-visible:ring-offset-2 dark:focus-visible:ring-[#9EBEF4] dark:focus-visible:ring-offset-[#0F172A] disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        primary: "bg-[#004098] text-white hover:bg-[#003070] active:bg-[#002050] dark:bg-[#1A5BC8] dark:hover:bg-[#2563EB] dark:active:bg-[#004098]",
        secondary: "bg-white text-[#004098] border-[#004098] hover:bg-[#E8F0FE] active:bg-[#C5D9F9] dark:bg-[#1E293B] dark:text-[#9EBEF4] dark:border-[#9EBEF4] dark:hover:bg-[#334155]",
        tertiary: "bg-[#F1F5F9] text-[#334155] border-[#E2E8F0] hover:bg-[#E2E8F0] active:bg-[#CBD5E1] dark:bg-[#1E293B] dark:text-[#E2E8F0] dark:border-[#334155] dark:hover:bg-[#334155]",
        danger: "bg-[#D32F2F] text-white hover:bg-[#C62828] active:bg-[#B71C1C] dark:bg-[#7F1D1D]",
        ghost: "text-[#334155] hover:bg-[#F1F5F9] active:bg-[#E2E8F0] dark:text-[#E2E8F0] dark:hover:bg-[#1E293B]",
        link: "text-[#004098] underline-offset-4 hover:underline dark:text-[#9EBEF4]",
      },
      size: {
        lg: "h-12 px-6 text-base rounded-[4px]",
        md: "h-10 px-4 text-sm rounded-[4px]",
        sm: "h-8 px-3 text-xs rounded-[2px]",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, loading = false, leftIcon, rightIcon, disabled, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : leftIcon}
        {children}
        {!loading && rightIcon}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
