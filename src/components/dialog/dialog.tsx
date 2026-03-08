"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children }) => {
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
      const timer = setTimeout(() => setMounted(false), 200);
      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <>
      {mounted &&
        React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<any>, { _visible: visible })
            : child
        )}
    </>
  );
};
Dialog.displayName = "Dialog";

export interface DialogTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

// Simple trigger - user manages open state externally
const DialogTrigger = React.forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ className, ...props }, ref) => (
    <button ref={ref} type="button" className={className} {...props} />
  )
);
DialogTrigger.displayName = "DialogTrigger";

const DialogOverlay = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { _visible?: boolean }>(
  ({ className, onClick, _visible, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "fixed inset-0 z-50 bg-black/50 dark:bg-black/70 transition-opacity duration-200",
        _visible ? "opacity-100" : "opacity-0",
        className
      )}
      onClick={onClick}
      aria-hidden="true"
      {...props}
    />
  )
);
DialogOverlay.displayName = "DialogOverlay";

export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: () => void;
}

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps & { _visible?: boolean }>(
  ({ className, children, onClose, _visible, ...props }, ref) => {
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
        <DialogOverlay onClick={onClose} _visible={_visible} />
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          className={cn(
            "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
            "w-full max-w-lg p-6 rounded-md shadow-lg",
            "bg-white dark:bg-[#1E293B]",
            "border border-krds-gray-200 dark:border-krds-gray-700",
            "transition-all duration-200",
            _visible ? "opacity-100 scale-100" : "opacity-0 scale-95",
            className
          )}
          {...props}
        >
          {children}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-sm p-1 text-krds-gray-400 hover:text-krds-gray-600 dark:text-krds-gray-500 dark:hover:text-krds-gray-300 transition-colors"
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
DialogContent.displayName = "DialogContent";

const DialogHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-1.5 mb-4", className)} {...props} />
  )
);
DialogHeader.displayName = "DialogHeader";

const DialogTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2 ref={ref} className={cn("text-lg font-semibold text-krds-gray-900 dark:text-krds-gray-50", className)} {...props} />
  )
);
DialogTitle.displayName = "DialogTitle";

const DialogDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-krds-gray-500 dark:text-krds-gray-400", className)} {...props} />
  )
);
DialogDescription.displayName = "DialogDescription";

const DialogFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex justify-end gap-2 mt-6", className)} {...props} />
  )
);
DialogFooter.displayName = "DialogFooter";

export { Dialog, DialogTrigger, DialogOverlay, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter };
