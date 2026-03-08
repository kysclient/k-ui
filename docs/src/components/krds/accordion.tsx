"use client";

import * as React from "react";
import { cn } from "./utils";

interface AccordionContextType {
  openItems: string[];
  toggle: (value: string) => void;
  type: "single" | "multiple";
}

const AccordionContext = React.createContext<AccordionContextType>({
  openItems: [],
  toggle: () => {},
  type: "single",
});

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple";
  defaultValue?: string[];
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ className, type = "single", defaultValue = [], children, ...props }, ref) => {
    const [openItems, setOpenItems] = React.useState<string[]>(defaultValue);

    const toggle = React.useCallback(
      (value: string) => {
        setOpenItems((prev) => {
          if (type === "single") {
            return prev.includes(value) ? [] : [value];
          }
          return prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value];
        });
      },
      [type]
    );

    return (
      <AccordionContext.Provider value={{ openItems, toggle, type }}>
        <div ref={ref} className={cn("divide-y divide-[#E2E8F0] dark:divide-[#334155] border-b border-[#E2E8F0] dark:border-[#334155]", className)} {...props}>
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);
Accordion.displayName = "Accordion";

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, value, children, ...props }, ref) => (
    <div ref={ref} className={cn("", className)} data-value={value} {...props}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? React.cloneElement(child as React.ReactElement<any>, { _value: value }) : child
      )}
    </div>
  )
);
AccordionItem.displayName = "AccordionItem";

export interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  _value?: string;
}

const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, children, _value, ...props }, ref) => {
    const { openItems, toggle } = React.useContext(AccordionContext);
    const isOpen = _value ? openItems.includes(_value) : false;

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "flex w-full items-center justify-between py-4 text-sm font-medium transition-all",
          "text-[#0F172A] dark:text-[#F8FAFC]",
          "hover:text-[#004098] dark:hover:text-[#9EBEF4]",
          "[&[data-state=open]>svg]:rotate-180",
          className
        )}
        onClick={() => _value && toggle(_value)}
        aria-expanded={isOpen}
        data-state={isOpen ? "open" : "closed"}
        {...props}
      >
        {children}
        <svg
          className="h-4 w-4 shrink-0 text-[#64748B] dark:text-[#94A3B8] transition-transform duration-200"
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
  }
);
AccordionTrigger.displayName = "AccordionTrigger";

export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  _value?: string;
}

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, children, _value, ...props }, ref) => {
    const { openItems } = React.useContext(AccordionContext);
    const isOpen = _value ? openItems.includes(_value) : false;

    return (
      <div
        ref={ref}
        className={cn(
          "grid transition-all duration-200 ease-in-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
        {...props}
      >
        <div className="overflow-hidden">
          <div className={cn("pb-4 text-sm text-[#475569] dark:text-[#CBD5E1]", className)}>
            {children}
          </div>
        </div>
      </div>
    );
  }
);
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
