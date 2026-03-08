"use client";

import * as React from "react";
import { cn } from "./utils";

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
            "border border-[#CBD5E1] dark:border-[#475569]",
            "text-[#004098] dark:text-[#9EBEF4]",
            "focus:ring-2 focus:ring-[#306DE0] focus:ring-offset-1 dark:focus:ring-[#9EBEF4] dark:focus:ring-offset-[#0F172A]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "accent-[#004098] dark:accent-[#306DE0]",
            className
          )}
          {...props}
        />
        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <label htmlFor={id} className="text-sm font-medium text-[#0F172A] dark:text-[#F8FAFC] cursor-pointer">
                {label}
              </label>
            )}
            {description && (
              <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">{description}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
