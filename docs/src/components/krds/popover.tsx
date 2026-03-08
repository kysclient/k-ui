"use client";

import * as React from "react";
import { cn } from "./utils";

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */

interface PopoverContextValue {
  open: boolean;
  setOpen: (v: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
}

const PopoverContext = React.createContext<PopoverContextValue | null>(null);

function usePopoverContext() {
  const ctx = React.useContext(PopoverContext);
  if (!ctx) throw new Error("Popover compound components must be used within <Popover>");
  return ctx;
}

/* ------------------------------------------------------------------ */
/*  Popover (root)                                                     */
/* ------------------------------------------------------------------ */

export interface PopoverProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

const Popover: React.FC<PopoverProps> = ({
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  children,
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = React.useCallback(
    (v: boolean) => {
      if (!isControlled) setUncontrolledOpen(v);
      onOpenChange?.(v);
    },
    [isControlled, onOpenChange],
  );

  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const contentRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <PopoverContext.Provider value={{ open, setOpen, triggerRef, contentRef }}>
      <div className="relative inline-block">
        {children}
      </div>
    </PopoverContext.Provider>
  );
};
Popover.displayName = "Popover";

/* ------------------------------------------------------------------ */
/*  PopoverTrigger                                                     */
/* ------------------------------------------------------------------ */

export interface PopoverTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const PopoverTrigger = React.forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  ({ onClick, ...props }, forwardedRef) => {
    const { open, setOpen, triggerRef } = usePopoverContext();

    const ref = useMergeRefs(forwardedRef, triggerRef);

    return (
      <button
        ref={ref}
        type="button"
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={(e) => {
          setOpen(!open);
          onClick?.(e);
        }}
        {...props}
      />
    );
  },
);
PopoverTrigger.displayName = "PopoverTrigger";

/* ------------------------------------------------------------------ */
/*  PopoverContent                                                     */
/* ------------------------------------------------------------------ */

export interface PopoverContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  className?: string;
}

const sidePositionMap = {
  bottom: "top-full left-1/2 -translate-x-1/2",
  top: "bottom-full left-1/2 -translate-x-1/2",
  left: "right-full top-1/2 -translate-y-1/2",
  right: "left-full top-1/2 -translate-y-1/2",
} as const;

const alignOverride = {
  start: { "bottom": "left-0 translate-x-0", "top": "left-0 translate-x-0", "left": "top-0 translate-y-0", "right": "top-0 translate-y-0" },
  center: { "bottom": "", "top": "", "left": "", "right": "" },
  end: { "bottom": "right-0 left-auto translate-x-0", "top": "right-0 left-auto translate-x-0", "left": "bottom-0 top-auto translate-y-0", "right": "bottom-0 top-auto translate-y-0" },
} as const;

const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  (
    {
      side = "bottom",
      align = "center",
      sideOffset = 4,
      className,
      children,
      ...props
    },
    forwardedRef,
  ) => {
    const { open, setOpen, triggerRef, contentRef } = usePopoverContext();
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

    const ref = useMergeRefs(forwardedRef, contentRef);

    // Close on outside click
    React.useEffect(() => {
      if (!open) return;
      const handler = (e: MouseEvent) => {
        const target = e.target as Node;
        if (
          triggerRef.current?.contains(target) ||
          contentRef.current?.contains(target)
        )
          return;
        setOpen(false);
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, [open, setOpen, triggerRef, contentRef]);

    // Close on Escape
    React.useEffect(() => {
      if (!open) return;
      const handler = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
      };
      document.addEventListener("keydown", handler);
      return () => document.removeEventListener("keydown", handler);
    }, [open, setOpen]);

    if (!mounted) return null;

    const offsetStyle: React.CSSProperties = {};
    if (side === "bottom") offsetStyle.marginTop = sideOffset;
    else if (side === "top") offsetStyle.marginBottom = sideOffset;
    else if (side === "left") offsetStyle.marginRight = sideOffset;
    else if (side === "right") offsetStyle.marginLeft = sideOffset;

    return (
      <div
        ref={ref}
        role="dialog"
        style={offsetStyle}
        className={cn(
          "absolute z-50 w-72 rounded-md border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] p-4 shadow-md",
          "text-[#0F172A] dark:text-[#F8FAFC]",
          "transition-all duration-150",
          sidePositionMap[side],
          alignOverride[align][side],
          visible ? "opacity-100 scale-100" : "opacity-0 scale-95",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
PopoverContent.displayName = "PopoverContent";

/* ------------------------------------------------------------------ */
/*  PopoverClose                                                       */
/* ------------------------------------------------------------------ */

export interface PopoverCloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const PopoverClose = React.forwardRef<HTMLButtonElement, PopoverCloseProps>(
  ({ onClick, ...props }, ref) => {
    const { setOpen } = usePopoverContext();

    return (
      <button
        ref={ref}
        type="button"
        onClick={(e) => {
          setOpen(false);
          onClick?.(e);
        }}
        {...props}
      />
    );
  },
);
PopoverClose.displayName = "PopoverClose";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function useMergeRefs<T>(
  ...refs: (React.Ref<T> | undefined | null)[]
): React.RefCallback<T> {
  return React.useCallback(
    (node: T | null) => {
      refs.forEach((r) => {
        if (!r) return;
        if (typeof r === "function") r(node);
        else (r as React.MutableRefObject<T | null>).current = node;
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refs,
  );
}

export { Popover, PopoverTrigger, PopoverContent, PopoverClose };
