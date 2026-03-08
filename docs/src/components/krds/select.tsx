"use client";

import * as React from "react";
import { cn } from "./utils";

/* ─── Context ─── */
interface SelectContextType {
  open: boolean;
  setOpen: (v: boolean) => void;
  value: string;
  onValueChange: (v: string) => void;
  displayText: string;
  setDisplayText: (v: string) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  disabled?: boolean;
}

const SelectContext = React.createContext<SelectContextType | null>(null);

function useSelect() {
  const ctx = React.useContext(SelectContext);
  if (!ctx) throw new Error("Select compound components must be used within <Select>");
  return ctx;
}

/* ─── Root ─── */
export interface SelectProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  disabled,
  children,
}) => {
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const [displayText, setDisplayText] = React.useState("");
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleValueChange = React.useCallback(
    (v: string) => {
      if (controlledValue === undefined) setInternalValue(v);
      onValueChange?.(v);
      setOpen(false);
      triggerRef.current?.focus();
    },
    [controlledValue, onValueChange],
  );

  // Close on outside click
  React.useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!triggerRef.current?.contains(target) && !contentRef.current?.contains(target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Close on Escape
  React.useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  return (
    <SelectContext.Provider
      value={{ open, setOpen, value, onValueChange: handleValueChange, displayText, setDisplayText, triggerRef, contentRef, disabled }}
    >
      <div className="relative inline-flex flex-col">{children}</div>
    </SelectContext.Provider>
  );
};
Select.displayName = "Select";

/* ─── Label ─── */
export interface SelectLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

const SelectLabel = React.forwardRef<HTMLLabelElement, SelectLabelProps>(
  ({ className, required, children, ...props }, ref) => (
    <label
      ref={ref}
      className={cn("text-sm font-medium text-[#334155] dark:text-[#E2E8F0] mb-1.5", className)}
      {...props}
    >
      {children}
      {required && <span className="text-[#D32F2F] ml-0.5" aria-hidden="true">*</span>}
    </label>
  ),
);
SelectLabel.displayName = "SelectLabel";

/* ─── Trigger ─── */
export interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  error?: boolean;
}

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, placeholder, size = "md", error, ...props }, ref) => {
    const { open, setOpen, displayText, triggerRef, disabled } = useSelect();

    const sizeClasses = {
      sm: "h-8 px-2.5 text-xs",
      md: "h-10 px-3 text-sm",
      lg: "h-12 px-4 text-base",
    };

    // Merge refs
    const mergedRef = React.useCallback(
      (node: HTMLButtonElement | null) => {
        (triggerRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
      },
      [ref, triggerRef],
    );

    return (
      <button
        ref={mergedRef}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        disabled={disabled}
        onClick={() => !disabled && setOpen(!open)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (!open) setOpen(true);
          }
        }}
        className={cn(
          "flex w-full items-center justify-between gap-2 bg-white rounded border",
          "border-[#CBD5E1] dark:border-[#475569]",
          "dark:bg-[#1E293B]",
          "transition-colors duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#306DE0] focus-visible:ring-offset-1",
          "dark:focus-visible:ring-[#5286E8]",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#F8FAFC] dark:disabled:bg-[#0F172A]",
          error && "border-[#D32F2F] focus-visible:ring-[#D32F2F] dark:border-[#EF5350]",
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        <span className={cn("truncate", displayText ? "text-[#0F172A] dark:text-[#F8FAFC]" : "text-[#94A3B8] dark:text-[#64748B]")}>
          {displayText || placeholder || "\uC120\uD0DD\uD558\uC138\uC694"}
        </span>
        <svg
          className={cn("h-4 w-4 shrink-0 text-[#64748B] dark:text-[#94A3B8] transition-transform duration-200", open && "rotate-180")}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    );
  },
);
SelectTrigger.displayName = "SelectTrigger";

/* ─── Content (Dropdown) ─── */
export interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: "popper" | "item-aligned";
}

const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({ className, children, ...props }, ref) => {
    const { open, contentRef } = useSelect();
    const [mounted, setMounted] = React.useState(false);
    const [visible, setVisible] = React.useState(false);

    React.useEffect(() => {
      if (open) {
        setMounted(true);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setVisible(true));
        });
      } else {
        setVisible(false);
        const timer = setTimeout(() => setMounted(false), 150);
        return () => clearTimeout(timer);
      }
    }, [open]);

    const mergedRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref, contentRef],
    );

    if (!mounted) return null;

    return (
      <div
        ref={mergedRef}
        role="listbox"
        className={cn(
          "absolute z-50 top-full left-0 mt-1 w-full",
          "max-h-60 overflow-auto rounded border",
          "bg-white dark:bg-[#1E293B]",
          "border-[#E2E8F0] dark:border-[#334155]",
          "shadow-lg",
          "py-1",
          "transition-all duration-150",
          visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-1",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
SelectContent.displayName = "SelectContent";

/* ─── Item ─── */
export interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className, value: itemValue, disabled, children, ...props }, ref) => {
    const { value, onValueChange, setDisplayText } = useSelect();
    const isSelected = value === itemValue;
    const textRef = React.useRef<HTMLSpanElement>(null);

    // Update display text when this item is selected
    React.useEffect(() => {
      if (isSelected && textRef.current) {
        setDisplayText(textRef.current.textContent || "");
      }
    }, [isSelected, setDisplayText]);

    return (
      <div
        ref={ref}
        role="option"
        aria-selected={isSelected}
        aria-disabled={disabled}
        data-disabled={disabled || undefined}
        onClick={() => {
          if (!disabled) {
            onValueChange(itemValue);
            if (textRef.current) setDisplayText(textRef.current.textContent || "");
          }
        }}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && !disabled) {
            e.preventDefault();
            onValueChange(itemValue);
            if (textRef.current) setDisplayText(textRef.current.textContent || "");
          }
        }}
        tabIndex={disabled ? -1 : 0}
        className={cn(
          "relative flex items-center px-3 py-2 text-sm cursor-pointer select-none",
          "text-[#0F172A] dark:text-[#F8FAFC]",
          "hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B]",
          "focus-visible:bg-[#F1F5F9] dark:focus-visible:bg-[#1E293B] focus-visible:outline-none",
          isSelected && "bg-[#E8F0FE] text-[#004098] dark:bg-[#002050]/30 dark:text-[#9EBEF4]",
          disabled && "pointer-events-none opacity-50",
          className,
        )}
        {...props}
      >
        <span ref={textRef} className="flex-1 truncate">{children}</span>
        {isSelected && (
          <svg className="h-4 w-4 shrink-0 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
    );
  },
);
SelectItem.displayName = "SelectItem";

/* ─── Group ─── */
const SelectGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} role="group" className={cn("", className)} {...props} />
  ),
);
SelectGroup.displayName = "SelectGroup";

/* ─── Group Label ─── */
const SelectGroupLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("px-3 py-1.5 text-xs font-semibold text-[#64748B] dark:text-[#94A3B8]", className)}
      {...props}
    />
  ),
);
SelectGroupLabel.displayName = "SelectGroupLabel";

/* ─── Separator ─── */
const SelectSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("h-px my-1 bg-[#E2E8F0] dark:bg-[#334155]", className)} {...props} />
  ),
);
SelectSeparator.displayName = "SelectSeparator";

/* ─── Error Message ─── */
export interface SelectErrorProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const SelectError = React.forwardRef<HTMLParagraphElement, SelectErrorProps>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-xs text-[#D32F2F] dark:text-[#E57373] mt-1.5", className)} role="alert" {...props} />
  ),
);
SelectError.displayName = "SelectError";

/* ─── Helper Text ─── */
const SelectHelper = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-xs text-[#64748B] dark:text-[#94A3B8] mt-1.5", className)} {...props} />
  ),
);
SelectHelper.displayName = "SelectHelper";

export {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectGroupLabel,
  SelectSeparator,
  SelectLabel,
  SelectError,
  SelectHelper,
};
