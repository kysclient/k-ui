"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  description?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, id: propId, ...props }, ref) => {
    const generatedId = React.useId();
    const id = propId ?? generatedId;

    return (
      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          id={id}
          ref={ref}
          className={cn(
            "mt-0.5 h-4 w-4 shrink-0 rounded-sm",
            "border border-krds-gray-300 dark:border-krds-gray-600",
            "text-krds-primary-700 dark:text-krds-primary-400",
            "focus:ring-2 focus:ring-krds-primary-500 focus:ring-offset-1 dark:focus:ring-krds-primary-400 dark:focus:ring-offset-krds-gray-900",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "accent-krds-primary-700 dark:accent-krds-primary-500",
            className
          )}
          {...props}
        />
        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <label htmlFor={id} className="text-sm font-medium text-krds-gray-900 dark:text-krds-gray-50 cursor-pointer">
                {label}
              </label>
            )}
            {description && (
              <p className="text-xs text-krds-gray-500 dark:text-krds-gray-400">{description}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
