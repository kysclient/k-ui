"use client";

import * as React from "react";
import { cn } from "./utils";

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, id: propId, checked, defaultChecked, onChange, disabled, ...props }, ref) => {
    const generatedId = React.useId();
    const id = propId ?? generatedId;
    const [isChecked, setIsChecked] = React.useState(defaultChecked ?? false);
    const controlled = checked !== undefined;
    const on = controlled ? checked : isChecked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!controlled) setIsChecked(e.target.checked);
      onChange?.(e);
    };

    return (
      <div className="flex items-center gap-2">
        <label
          htmlFor={id}
          className={cn(
            "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors",
            on ? "bg-[#004098] dark:bg-[#1A5BC8]" : "bg-[#CBD5E1] dark:bg-[#475569]",
            disabled && "cursor-not-allowed opacity-50",
            className
          )}
        >
          <input
            type="checkbox"
            id={id}
            ref={ref}
            checked={on}
            onChange={handleChange}
            disabled={disabled}
            className="sr-only"
            role="switch"
            aria-checked={on}
            {...props}
          />
          <span
            className={cn(
              "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-sm ring-0 transition-transform",
              on ? "translate-x-5" : "translate-x-0"
            )}
          />
        </label>
        {label && (
          <label htmlFor={id} className={cn("text-sm font-medium text-[#0F172A] dark:text-[#F8FAFC] cursor-pointer", disabled && "cursor-not-allowed opacity-50")}>
            {label}
          </label>
        )}
      </div>
    );
  }
);
Switch.displayName = "Switch";

export { Switch };
