import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  [
    "flex w-full bg-white text-krds-gray-900",
    "border border-krds-gray-300 rounded",
    "placeholder:text-krds-gray-400",
    "transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-krds-primary-500 focus-visible:ring-offset-1",
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-krds-gray-50",
    "dark:bg-[#1E293B] dark:text-krds-gray-50 dark:border-krds-gray-600 dark:placeholder:text-krds-gray-500",
    "dark:disabled:bg-krds-gray-900",
    "dark:focus-visible:ring-krds-primary-400",
    "read-only:bg-krds-gray-50 read-only:focus-visible:ring-0",
  ].join(" "),
  {
    variants: {
      inputSize: {
        lg: "h-12 px-4 text-base",
        md: "h-10 px-3 text-sm",
        sm: "h-8 px-2.5 text-xs",
      },
      error: {
        true: "border-krds-error-500 focus-visible:ring-krds-error-500 dark:border-krds-error-400 dark:focus-visible:ring-krds-error-400",
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
  /** 라벨 텍스트 */
  label?: string;
  /** 도움말 텍스트 */
  helperText?: string;
  /** 에러 메시지 (설정 시 에러 스타일 자동 적용) */
  errorMessage?: string;
  /** 필수 입력 여부 */
  required?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      inputSize,
      error,
      label,
      helperText,
      errorMessage,
      required,
      id: propId,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const id = propId ?? generatedId;
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;
    const hasError = !!errorMessage || error;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-krds-gray-700 dark:text-krds-gray-200"
          >
            {label}
            {required && (
              <span className="text-krds-error-500 ml-0.5" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        <input
          type={type}
          id={id}
          ref={ref}
          className={cn(
            inputVariants({ inputSize, error: hasError, className }),
          )}
          aria-invalid={hasError || undefined}
          aria-describedby={
            [
              hasError ? errorId : undefined,
              helperText ? helperId : undefined,
            ]
              .filter(Boolean)
              .join(" ") || undefined
          }
          aria-required={required || undefined}
          {...props}
        />

        {hasError && errorMessage && (
          <p id={errorId} className="text-xs text-krds-error-500 dark:text-krds-error-300" role="alert">
            {errorMessage}
          </p>
        )}

        {!hasError && helperText && (
          <p id={helperId} className="text-xs text-krds-gray-500 dark:text-krds-gray-400">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input, inputVariants };
