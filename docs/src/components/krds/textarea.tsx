"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";

const textareaVariants = cva(
  "flex min-h-[80px] w-full bg-white text-[#0F172A] border border-[#CBD5E1] rounded px-3 py-2 text-sm placeholder:text-[#94A3B8] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#306DE0] focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#F8FAFC] dark:bg-[#1E293B] dark:text-[#F8FAFC] dark:border-[#475569] dark:placeholder:text-[#64748B] dark:focus-visible:ring-[#9EBEF4]",
  {
    variants: {
      error: {
        true: "border-[#D32F2F] focus-visible:ring-[#D32F2F] dark:border-[#EF9A9A] dark:focus-visible:ring-[#EF9A9A]",
      },
    },
  }
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  required?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, label, helperText, errorMessage, required, id: propId, ...props }, ref) => {
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
        <textarea
          id={id}
          ref={ref}
          className={cn(textareaVariants({ error: hasError, className }))}
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
  }
);
Textarea.displayName = "Textarea";

export { Textarea, textareaVariants };
