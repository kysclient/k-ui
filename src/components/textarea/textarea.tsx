import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textareaVariants = cva(
  [
    "flex min-h-[80px] w-full bg-white text-krds-gray-900",
    "border border-krds-gray-300 rounded",
    "px-3 py-2 text-sm",
    "placeholder:text-krds-gray-400",
    "transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-krds-primary-500 focus-visible:ring-offset-1",
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-krds-gray-50",
    "dark:bg-[#1E293B] dark:text-krds-gray-50 dark:border-krds-gray-600 dark:placeholder:text-krds-gray-500",
    "dark:focus-visible:ring-krds-primary-400",
  ].join(" "),
  {
    variants: {
      error: {
        true: "border-krds-error-500 focus-visible:ring-krds-error-500 dark:border-krds-error-400 dark:focus-visible:ring-krds-error-400",
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
          <label htmlFor={id} className="text-sm font-medium text-krds-gray-700 dark:text-krds-gray-200">
            {label}
            {required && <span className="text-krds-error-500 ml-0.5" aria-hidden="true">*</span>}
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
          <p id={errorId} className="text-xs text-krds-error-500 dark:text-krds-error-300" role="alert">{errorMessage}</p>
        )}
        {!hasError && helperText && (
          <p id={helperId} className="text-xs text-krds-gray-500 dark:text-krds-gray-400">{helperText}</p>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea, textareaVariants };
