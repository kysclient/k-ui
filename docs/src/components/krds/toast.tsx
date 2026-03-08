"use client";

import * as React from "react";
import { cn } from "./utils";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

export type ToastVariant = "default" | "success" | "error" | "warning" | "info";

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastData {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  action?: ToastAction;
}

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ToastVariant;
}

export interface ToastProviderProps {
  children: React.ReactNode;
  maxToasts?: number;
}

/* -------------------------------------------------------------------------- */
/*  Context                                                                   */
/* -------------------------------------------------------------------------- */

interface ToastContextValue {
  toasts: ToastData[];
  toast: (data: Omit<ToastData, "id">) => string;
  dismiss: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextValue | undefined>(undefined);

export function useToast(): ToastContextValue {
  const ctx = React.useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a <ToastProvider>");
  }
  return ctx;
}

/* -------------------------------------------------------------------------- */
/*  Provider                                                                  */
/* -------------------------------------------------------------------------- */

let toastCount = 0;
function genId() {
  toastCount += 1;
  return `toast-${toastCount}`;
}

const MAX_TOASTS_DEFAULT = 5;

export function ToastProvider({ children, maxToasts = MAX_TOASTS_DEFAULT }: ToastProviderProps) {
  const [toasts, setToasts] = React.useState<ToastData[]>([]);

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = React.useCallback(
    (data: Omit<ToastData, "id">) => {
      const id = genId();
      setToasts((prev) => {
        const next = [...prev, { ...data, id }];
        if (next.length > maxToasts) {
          return next.slice(next.length - maxToasts);
        }
        return next;
      });
      return id;
    },
    [maxToasts],
  );

  const value = React.useMemo(() => ({ toasts, toast, dismiss }), [toasts, toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

/* -------------------------------------------------------------------------- */
/*  Container (viewport)                                                      */
/* -------------------------------------------------------------------------- */

function ToastContainer() {
  const { toasts, dismiss } = useToast();

  return (
    <div
      className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 w-full max-w-sm pointer-events-none"
      role="region"
      aria-label="Notifications"
    >
      {toasts.map((t) => (
        <ToastItem key={t.id} data={t} onDismiss={dismiss} />
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Single toast item (handles animation + auto-dismiss)                      */
/* -------------------------------------------------------------------------- */

function ToastItem({ data, onDismiss }: { data: ToastData; onDismiss: (id: string) => void }) {
  const [visible, setVisible] = React.useState(false);
  const [exiting, setExiting] = React.useState(false);

  // Enter animation – double rAF for transition trigger
  React.useEffect(() => {
    let raf1: number;
    let raf2: number;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        setVisible(true);
      });
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, []);

  // Auto-dismiss
  React.useEffect(() => {
    const duration = data.duration ?? 5000;
    if (duration <= 0) return;
    const timer = setTimeout(() => handleClose(), duration);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.duration, data.id]);

  const handleClose = React.useCallback(() => {
    setExiting(true);
    setVisible(false);
    setTimeout(() => {
      onDismiss(data.id);
    }, 200);
  }, [onDismiss, data.id]);

  const variant = data.variant ?? "default";

  return (
    <Toast
      variant={variant}
      className={cn(
        "pointer-events-auto transition-all duration-200 ease-out",
        visible && !exiting
          ? "translate-y-0 opacity-100"
          : "translate-y-2 opacity-0",
      )}
      role="status"
      aria-live="polite"
    >
      <div className="flex-1 min-w-0">
        {data.title && <ToastTitle>{data.title}</ToastTitle>}
        {data.description && <ToastDescription>{data.description}</ToastDescription>}
      </div>
      <div className="flex items-center gap-1 shrink-0">
        {data.action && (
          <ToastActionButton onClick={() => { data.action!.onClick(); handleClose(); }}>
            {data.action.label}
          </ToastActionButton>
        )}
        <ToastClose onClick={handleClose} />
      </div>
    </Toast>
  );
}

/* -------------------------------------------------------------------------- */
/*  Variant styles                                                            */
/* -------------------------------------------------------------------------- */

const variantStyles: Record<ToastVariant, string> = {
  default:
    "bg-white border-[#E2E8F0] text-[#0F172A] dark:bg-[#1E293B] dark:border-[#334155] dark:text-[#F8FAFC]",
  success:
    "bg-white border-l-4 border-l-[#16A34A] border-[#E2E8F0] text-[#0F172A] dark:bg-[#1E293B] dark:border-[#334155] dark:text-[#F8FAFC] dark:border-l-[#16A34A]",
  error:
    "bg-white border-l-4 border-l-[#DC2626] border-[#E2E8F0] text-[#0F172A] dark:bg-[#1E293B] dark:border-[#334155] dark:text-[#F8FAFC] dark:border-l-[#DC2626]",
  warning:
    "bg-white border-l-4 border-l-[#D97706] border-[#E2E8F0] text-[#0F172A] dark:bg-[#1E293B] dark:border-[#334155] dark:text-[#F8FAFC] dark:border-l-[#D97706]",
  info:
    "bg-white border-l-4 border-l-[#004098] border-[#E2E8F0] text-[#0F172A] dark:bg-[#1E293B] dark:border-[#334155] dark:text-[#F8FAFC] dark:border-l-[#004098]",
};

/* -------------------------------------------------------------------------- */
/*  Sub-components                                                            */
/* -------------------------------------------------------------------------- */

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-start gap-3 w-full rounded-md border p-4 shadow-lg",
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  ),
);
Toast.displayName = "Toast";

const ToastTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5 ref={ref} className={cn("text-sm font-semibold leading-tight", className)} {...props} />
  ),
);
ToastTitle.displayName = "ToastTitle";

const ToastDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-[#64748B] dark:text-[#94A3B8] mt-1 leading-relaxed", className)} {...props} />
  ),
);
ToastDescription.displayName = "ToastDescription";

const ToastClose = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-label="Close notification"
      className={cn(
        "inline-flex items-center justify-center rounded-md h-6 w-6 shrink-0",
        "text-[#94A3B8] hover:text-[#475569] dark:text-[#64748B] dark:hover:text-[#CBD5E1]",
        "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#004098] focus-visible:ring-offset-2",
        className,
      )}
      {...props}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  ),
);
ToastClose.displayName = "ToastClose";

const ToastActionButton = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={cn(
        "inline-flex items-center justify-center rounded-md px-3 h-7 text-xs font-medium",
        "border border-[#E2E8F0] bg-transparent text-[#0F172A] hover:bg-[#F1F5F9]",
        "dark:border-[#475569] dark:text-[#F8FAFC] dark:hover:bg-[#334155]",
        "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#004098] focus-visible:ring-offset-2",
        className,
      )}
      {...props}
    />
  ),
);
ToastActionButton.displayName = "ToastActionButton";

export { Toast, ToastTitle, ToastDescription, ToastClose, ToastActionButton };
