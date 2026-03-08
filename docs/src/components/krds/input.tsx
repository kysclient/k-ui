"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";

const inputVariants = cva(
  "flex w-full bg-white text-[#0F172A] border border-[#CBD5E1] rounded-[4px] placeholder:text-[#94A3B8] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#306DE0] focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#F8FAFC] read-only:bg-[#F8FAFC] read-only:focus-visible:ring-0 dark:bg-[#1E293B] dark:text-[#F8FAFC] dark:border-[#475569] dark:placeholder:text-[#64748B] dark:disabled:bg-[#0F172A] dark:focus-visible:ring-[#9EBEF4]",
  {
    variants: {
      inputSize: {
        lg: "h-12 px-4 text-base",
        md: "h-10 px-3 text-sm",
        sm: "h-8 px-2.5 text-xs",
      },
      error: {
        true: "border-[#D32F2F] focus-visible:ring-[#D32F2F] dark:border-[#EF9A9A] dark:focus-visible:ring-[#EF9A9A]",
      },
    },
    defaultVariants: {
      inputSize: "md",
    },
  },
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  required?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", inputSize, error, label, helperText, errorMessage, required, id: propId, ...props }, ref) => {
    const generatedId = React.useId();
    const id = propId ?? generatedId;
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;
    const hasError = !!errorMessage || error;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-[#334155] dark:text-[#E2E8F0]">
            {label}
            {required && <span className="text-[#D32F2F] ml-0.5" aria-hidden="true">*</span>}
          </label>
        )}
        <input
          type={type}
          id={id}
          ref={ref}
          className={cn(inputVariants({ inputSize, error: hasError, className }))}
          aria-invalid={hasError || undefined}
          aria-describedby={[hasError ? errorId : undefined, helperText ? helperId : undefined].filter(Boolean).join(" ") || undefined}
          aria-required={required || undefined}
          {...props}
        />
        {hasError && errorMessage && (
          <p id={errorId} className="text-xs text-[#D32F2F] dark:text-[#EF9A9A]" role="alert">{errorMessage}</p>
        )}
        {!hasError && helperText && (
          <p id={helperId} className="text-xs text-[#64748B] dark:text-[#94A3B8]">{helperText}</p>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input, inputVariants };
