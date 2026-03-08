"use client";

import * as React from "react";
import { cn } from "./utils";

/* ------------------------------------------------------------------ */
/*  Context                                                           */
/* ------------------------------------------------------------------ */

interface DropdownMenuContextValue {
  open: boolean;
  setOpen: (v: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  itemCount: React.MutableRefObject<number>;
  itemRefs: React.MutableRefObject<Map<number, HTMLDivElement>>;
  disabledIndices: React.MutableRefObject<Set<number>>;
  registerItem: (index: number, ref: HTMLDivElement, disabled: boolean) => void;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

const DropdownMenuContext = React.createContext<DropdownMenuContextValue | null>(null);

function useDropdownMenuCtx() {
  const ctx = React.useContext(DropdownMenuContext);
  if (!ctx) throw new Error("DropdownMenu compound components must be used within <DropdownMenu>");
  return ctx;
}

/* ------------------------------------------------------------------ */
/*  DropdownMenu (root)                                               */
/* ------------------------------------------------------------------ */

export interface DropdownMenuProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
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
  const itemCount = React.useRef(0);
  const itemRefs = React.useRef<Map<number, HTMLDivElement>>(new Map());
  const disabledIndices = React.useRef<Set<number>>(new Set());
  const [activeIndex, setActiveIndex] = React.useState(-1);

  const registerItem = React.useCallback(
    (index: number, ref: HTMLDivElement, disabled: boolean) => {
      itemRefs.current.set(index, ref);
      if (disabled) {
        disabledIndices.current.add(index);
      } else {
        disabledIndices.current.delete(index);
      }
    },
    [],
  );

  React.useEffect(() => {
    if (!open) setActiveIndex(-1);
  }, [open]);

  return (
    <DropdownMenuContext.Provider
      value={{
        open,
        setOpen,
        triggerRef,
        contentRef,
        itemCount,
        itemRefs,
        disabledIndices,
        registerItem,
        activeIndex,
        setActiveIndex,
      }}
    >
      <div className="relative inline-block">
        {children}
      </div>
    </DropdownMenuContext.Provider>
  );
};
DropdownMenu.displayName = "DropdownMenu";

/* ------------------------------------------------------------------ */
/*  DropdownMenuTrigger                                               */
/* ------------------------------------------------------------------ */

export interface DropdownMenuTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const DropdownMenuTrigger = React.forwardRef<HTMLButtonElement, DropdownMenuTriggerProps>(
  ({ onClick, ...props }, forwardedRef) => {
    const { open, setOpen, triggerRef } = useDropdownMenuCtx();

    const ref = useMergeRefs(forwardedRef, triggerRef);

    return (
      <button
        ref={ref}
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={(e) => {
          setOpen(!open);
          onClick?.(e);
        }}
        {...props}
      />
    );
  },
);
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

/* ------------------------------------------------------------------ */
/*  DropdownMenuContent                                               */
/* ------------------------------------------------------------------ */

export interface DropdownMenuContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

const alignMap = {
  start: "left-0",
  center: "left-1/2 -translate-x-1/2",
  end: "right-0",
} as const;

const DropdownMenuContent = React.forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  ({ align = "start", sideOffset = 4, className, children, ...props }, forwardedRef) => {
    const { open, setOpen, triggerRef, contentRef, itemCount, itemRefs, disabledIndices, activeIndex, setActiveIndex } =
      useDropdownMenuCtx();
    const [mounted, setMounted] = React.useState(false);
    const [visible, setVisible] = React.useState(false);

    const ref = useMergeRefs(forwardedRef, contentRef);

    itemCount.current = 0;

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

    // Keyboard navigation
    React.useEffect(() => {
      if (!open) return;

      const handler = (e: KeyboardEvent) => {
        const total = itemRefs.current.size;
        if (total === 0) return;

        const findNext = (start: number, direction: 1 | -1): number => {
          let idx = start;
          for (let i = 0; i < total; i++) {
            idx = (idx + direction + total) % total;
            if (!disabledIndices.current.has(idx)) return idx;
          }
          return -1;
        };

        if (e.key === "ArrowDown") {
          e.preventDefault();
          const next = findNext(activeIndex, 1);
          if (next !== -1) setActiveIndex(next);
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          const prev = findNext(activeIndex, -1);
          if (prev !== -1) setActiveIndex(prev);
        } else if (e.key === "Enter") {
          e.preventDefault();
          if (activeIndex >= 0) {
            const el = itemRefs.current.get(activeIndex);
            el?.click();
          }
        }
      };

      document.addEventListener("keydown", handler);
      return () => document.removeEventListener("keydown", handler);
    }, [open, activeIndex, setActiveIndex, itemRefs, disabledIndices]);

    // Focus active item
    React.useEffect(() => {
      if (activeIndex >= 0) {
        const el = itemRefs.current.get(activeIndex);
        el?.focus();
      }
    }, [activeIndex, itemRefs]);

    if (!mounted) return null;

    return (
      <div
        ref={ref}
        role="menu"
        style={{ marginTop: sideOffset }}
        className={cn(
          "absolute top-full z-50 min-w-[160px] rounded-md border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] p-1 shadow-md",
          "transition-all duration-150",
          alignMap[align],
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
DropdownMenuContent.displayName = "DropdownMenuContent";

/* ------------------------------------------------------------------ */
/*  DropdownMenuItem                                                  */
/* ------------------------------------------------------------------ */

export interface DropdownMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
}

const DropdownMenuItem = React.forwardRef<HTMLDivElement, DropdownMenuItemProps>(
  ({ className, disabled = false, onClick, children, ...props }, ref) => {
    const { setOpen, itemCount, registerItem } = useDropdownMenuCtx();
    const indexRef = React.useRef<number>(-1);
    const internalRef = React.useRef<HTMLDivElement>(null);

    if (indexRef.current === -1) {
      indexRef.current = itemCount.current++;
    }

    const itemRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        if (node) {
          registerItem(indexRef.current, node, disabled);
          (internalRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref, disabled, registerItem],
    );

    const handleClick = React.useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (disabled) return;
        onClick?.(e);
        setOpen(false);
      },
      [disabled, onClick, setOpen],
    );

    return (
      <div
        ref={itemRef}
        role="menuitem"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled || undefined}
        className={cn(
          "relative flex items-center rounded-sm px-2 py-1.5 text-sm cursor-pointer outline-none",
          "text-[#334155] dark:text-[#CBD5E1]",
          "hover:bg-[#F1F5F9] dark:hover:bg-[#334155]",
          "focus:bg-[#F1F5F9] dark:focus:bg-[#334155]",
          disabled && "text-[#94A3B8] dark:text-[#475569] pointer-events-none",
          className,
        )}
        onClick={handleClick}
        {...props}
      >
        {children}
      </div>
    );
  },
);
DropdownMenuItem.displayName = "DropdownMenuItem";

/* ------------------------------------------------------------------ */
/*  DropdownMenuCheckboxItem                                          */
/* ------------------------------------------------------------------ */

export interface DropdownMenuCheckboxItemProps extends React.HTMLAttributes<HTMLDivElement> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

const DropdownMenuCheckboxItem = React.forwardRef<HTMLDivElement, DropdownMenuCheckboxItemProps>(
  ({ className, checked = false, onCheckedChange, disabled = false, onClick, children, ...props }, ref) => {
    const { itemCount, registerItem } = useDropdownMenuCtx();
    const indexRef = React.useRef<number>(-1);
    const internalRef = React.useRef<HTMLDivElement>(null);

    if (indexRef.current === -1) {
      indexRef.current = itemCount.current++;
    }

    const itemRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        if (node) {
          registerItem(indexRef.current, node, disabled);
          (internalRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref, disabled, registerItem],
    );

    const handleClick = React.useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (disabled) return;
        onCheckedChange?.(!checked);
        onClick?.(e);
      },
      [disabled, checked, onCheckedChange, onClick],
    );

    return (
      <div
        ref={itemRef}
        role="menuitemcheckbox"
        aria-checked={checked}
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled || undefined}
        className={cn(
          "relative flex items-center rounded-sm px-2 py-1.5 pl-8 text-sm cursor-pointer outline-none",
          "text-[#334155] dark:text-[#CBD5E1]",
          "hover:bg-[#F1F5F9] dark:hover:bg-[#334155]",
          "focus:bg-[#F1F5F9] dark:focus:bg-[#334155]",
          disabled && "text-[#94A3B8] dark:text-[#475569] pointer-events-none",
          className,
        )}
        onClick={handleClick}
        {...props}
      >
        <span className="absolute left-2 flex h-4 w-4 items-center justify-center">
          {checked && (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
        {children}
      </div>
    );
  },
);
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

/* ------------------------------------------------------------------ */
/*  DropdownMenuGroup                                                 */
/* ------------------------------------------------------------------ */

export interface DropdownMenuGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

const DropdownMenuGroup = React.forwardRef<HTMLDivElement, DropdownMenuGroupProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="group"
      className={cn("", className)}
      {...props}
    />
  ),
);
DropdownMenuGroup.displayName = "DropdownMenuGroup";

/* ------------------------------------------------------------------ */
/*  DropdownMenuSeparator                                             */
/* ------------------------------------------------------------------ */

export interface DropdownMenuSeparatorProps extends React.HTMLAttributes<HTMLHRElement> {}

const DropdownMenuSeparator = React.forwardRef<HTMLHRElement, DropdownMenuSeparatorProps>(
  ({ className, ...props }, ref) => (
    <hr
      ref={ref}
      className={cn(
        "h-px border-0 bg-[#E2E8F0] dark:bg-[#334155] my-1 -mx-1",
        className,
      )}
      {...props}
    />
  ),
);
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

/* ------------------------------------------------------------------ */
/*  DropdownMenuLabel                                                 */
/* ------------------------------------------------------------------ */

export interface DropdownMenuLabelProps extends React.HTMLAttributes<HTMLDivElement> {}

const DropdownMenuLabel = React.forwardRef<HTMLDivElement, DropdownMenuLabelProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "px-2 py-1.5 text-xs font-semibold text-[#64748B] dark:text-[#94A3B8]",
        className,
      )}
      {...props}
    />
  ),
);
DropdownMenuLabel.displayName = "DropdownMenuLabel";

/* ------------------------------------------------------------------ */
/*  DropdownMenuShortcut                                              */
/* ------------------------------------------------------------------ */

export interface DropdownMenuShortcutProps extends React.HTMLAttributes<HTMLSpanElement> {}

const DropdownMenuShortcut = React.forwardRef<HTMLSpanElement, DropdownMenuShortcutProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "ml-auto text-xs text-[#94A3B8] dark:text-[#64748B]",
        className,
      )}
      {...props}
    />
  ),
);
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
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

/* ------------------------------------------------------------------ */
/*  Exports                                                           */
/* ------------------------------------------------------------------ */

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuShortcut,
};
