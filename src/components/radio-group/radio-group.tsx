"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface RadioGroupContextType {
  name: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const RadioGroupContext = React.createContext<RadioGroupContextType>({
  name: "",
  value: "",
  onChange: () => {},
});

export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  name?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, name: propName, value: controlledValue, defaultValue = "", onValueChange, disabled, children, ...props }, ref) => {
    const generatedName = React.useId();
    const name = propName ?? generatedName;
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const value = controlledValue !== undefined ? controlledValue : internalValue;

    const onChange = React.useCallback(
      (val: string) => {
        if (controlledValue === undefined) setInternalValue(val);
        onValueChange?.(val);
      },
      [controlledValue, onValueChange]
    );

    return (
      <RadioGroupContext.Provider value={{ name, value, onChange, disabled }}>
        <div ref={ref} role="radiogroup" className={cn("flex flex-col gap-2", className)} {...props}>
          {children}
        </div>
      </RadioGroupContext.Provider>
    );
  }
);
RadioGroup.displayName = "RadioGroup";

export interface RadioGroupItemProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  value: string;
  label?: string;
  description?: string;
}

const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ className, value, label, description, id: propId, disabled: itemDisabled, ...props }, ref) => {
    const generatedId = React.useId();
    const id = propId ?? generatedId;
    const ctx = React.useContext(RadioGroupContext);
    const disabled = itemDisabled || ctx.disabled;

    return (
      <div className="flex items-start gap-2">
        <input
          type="radio"
          id={id}
          ref={ref}
          name={ctx.name}
          value={value}
          checked={ctx.value === value}
          onChange={() => ctx.onChange(value)}
          disabled={disabled}
          className={cn(
            "mt-0.5 h-4 w-4 shrink-0",
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
              <label htmlFor={id} className={cn("text-sm font-medium text-krds-gray-900 dark:text-krds-gray-50 cursor-pointer", disabled && "cursor-not-allowed opacity-50")}>
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
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };
