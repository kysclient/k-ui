"use client";

import * as React from "react";
import { cn } from "./utils";

export interface SheetProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

const Sheet: React.FC<SheetProps> = ({ open, onOpenChange, children }) => {
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
      const timer = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  return <>{mounted && React.Children.map(children, child =>
    React.isValidElement(child) ? React.cloneElement(child as React.ReactElement<any>, { _visible: visible }) : child
  )}</>;
};
Sheet.displayName = "Sheet";

export interface SheetTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const SheetTrigger = React.forwardRef<HTMLButtonElement, SheetTriggerProps>(
  ({ className, ...props }, ref) => (
    <button ref={ref} type="button" className={className} {...props} />
  )
);
SheetTrigger.displayName = "SheetTrigger";

const SheetOverlay = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { _visible?: boolean }>(
  ({ className, _visible = true, onClick, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "fixed inset-0 z-50 bg-black/50 dark:bg-black/70 transition-opacity duration-300",
        _visible ? "opacity-100" : "opacity-0",
        className
      )}
      onClick={onClick}
      aria-hidden="true"
      {...props}
    />
  )
);
SheetOverlay.displayName = "SheetOverlay";

const sheetSideStyles = {
  right: { base: "fixed inset-y-0 right-0 z-50 h-full w-3/4 max-w-sm border-l", open: "translate-x-0", closed: "translate-x-full" },
  left: { base: "fixed inset-y-0 left-0 z-50 h-full w-3/4 max-w-sm border-r", open: "translate-x-0", closed: "-translate-x-full" },
  top: { base: "fixed inset-x-0 top-0 z-50 w-full border-b", open: "translate-y-0", closed: "-translate-y-full" },
  bottom: { base: "fixed inset-x-0 bottom-0 z-50 w-full border-t", open: "translate-y-0", closed: "translate-y-full" },
};

export type SheetSide = keyof typeof sheetSideStyles;

export interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: SheetSide;
  onClose?: () => void;
}

const SheetContent = React.forwardRef<HTMLDivElement, SheetContentProps & { _visible?: boolean }>(
  ({ className, children, side = "right", onClose, _visible = true, ...props }, ref) => {
    React.useEffect(() => {
      const handler = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose?.();
      };
      document.addEventListener("keydown", handler);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", handler);
        document.body.style.overflow = "";
      };
    }, [onClose]);

    return (
      <>
        <SheetOverlay onClick={onClose} _visible={_visible} />
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          className={cn(
            "p-6 shadow-lg transition-transform duration-300 ease-in-out",
            "bg-white dark:bg-[#1E293B]",
            "border-[#E2E8F0] dark:border-[#334155]",
            sheetSideStyles[side].base,
            _visible ? sheetSideStyles[side].open : sheetSideStyles[side].closed,
            className
          )}
          {...props}
        >
          {children}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-sm p-1 text-[#94A3B8] hover:text-[#475569] dark:text-[#64748B] dark:hover:text-[#CBD5E1] transition-colors"
              aria-label="닫기"
            >
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </>
    );
  }
);
SheetContent.displayName = "SheetContent";

const SheetHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-1.5 mb-4", className)} {...props} />
  )
);
SheetHeader.displayName = "SheetHeader";

const SheetTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2 ref={ref} className={cn("text-lg font-semibold text-[#0F172A] dark:text-[#F8FAFC]", className)} {...props} />
  )
);
SheetTitle.displayName = "SheetTitle";

const SheetDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-[#64748B] dark:text-[#94A3B8]", className)} {...props} />
  )
);
SheetDescription.displayName = "SheetDescription";

const SheetFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex justify-end gap-2 mt-6", className)} {...props} />
  )
);
SheetFooter.displayName = "SheetFooter";

export interface SheetCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const SheetClose = React.forwardRef<HTMLButtonElement, SheetCloseProps>(
  ({ className, ...props }, ref) => (
    <button ref={ref} type="button" className={className} {...props} />
  )
);
SheetClose.displayName = "SheetClose";

export {
  Sheet,
  SheetTrigger,
  SheetOverlay,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
};
