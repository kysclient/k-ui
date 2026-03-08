"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Context                                                           */
/* ------------------------------------------------------------------ */

interface ContextMenuState {
  open: boolean;
  position: { x: number; y: number };
  activeIndex: number;
}

type ContextMenuAction =
  | { type: "OPEN"; position: { x: number; y: number } }
  | { type: "CLOSE" }
  | { type: "SET_ACTIVE"; index: number };

function reducer(state: ContextMenuState, action: ContextMenuAction): ContextMenuState {
  switch (action.type) {
    case "OPEN":
      return { open: true, position: action.position, activeIndex: -1 };
    case "CLOSE":
      return { ...state, open: false, activeIndex: -1 };
    case "SET_ACTIVE":
      return { ...state, activeIndex: action.index };
    default:
      return state;
  }
}

const ContextMenuContext = React.createContext<{
  state: ContextMenuState;
  dispatch: React.Dispatch<ContextMenuAction>;
  itemCount: React.MutableRefObject<number>;
  itemRefs: React.MutableRefObject<Map<number, HTMLDivElement>>;
  disabledIndices: React.MutableRefObject<Set<number>>;
  registerItem: (index: number, ref: HTMLDivElement, disabled: boolean) => void;
} | null>(null);

function useContextMenuCtx() {
  const ctx = React.useContext(ContextMenuContext);
  if (!ctx) throw new Error("ContextMenu compound components must be used within <ContextMenu>");
  return ctx;
}

/* ------------------------------------------------------------------ */
/*  ContextMenu (root)                                                */
/* ------------------------------------------------------------------ */

export interface ContextMenuProps {
  children: React.ReactNode;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, {
    open: false,
    position: { x: 0, y: 0 },
    activeIndex: -1,
  });

  const itemCount = React.useRef(0);
  const itemRefs = React.useRef<Map<number, HTMLDivElement>>(new Map());
  const disabledIndices = React.useRef<Set<number>>(new Set());

  const registerItem = React.useCallback(
    (index: number, ref: HTMLDivElement, disabled: boolean) => {
      itemRefs.current.set(index, ref);
      if (disabled) {
        disabledIndices.current.add(index);
      } else {
        disabledIndices.current.delete(index);
      }
    },
    []
  );

  return (
    <ContextMenuContext.Provider
      value={{ state, dispatch, itemCount, itemRefs, disabledIndices, registerItem }}
    >
      {children}
    </ContextMenuContext.Provider>
  );
};
ContextMenu.displayName = "ContextMenu";

/* ------------------------------------------------------------------ */
/*  ContextMenuTrigger                                                */
/* ------------------------------------------------------------------ */

export interface ContextMenuTriggerProps extends React.HTMLAttributes<HTMLDivElement> {}

const ContextMenuTrigger = React.forwardRef<HTMLDivElement, ContextMenuTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const { dispatch } = useContextMenuCtx();

    const handleContextMenu = React.useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        dispatch({ type: "OPEN", position: { x: e.clientX, y: e.clientY } });
      },
      [dispatch]
    );

    return (
      <div
        ref={ref}
        className={className}
        onContextMenu={handleContextMenu}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ContextMenuTrigger.displayName = "ContextMenuTrigger";

/* ------------------------------------------------------------------ */
/*  ContextMenuContent                                                */
/* ------------------------------------------------------------------ */

export interface ContextMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const ContextMenuContent = React.forwardRef<HTMLDivElement, ContextMenuContentProps>(
  ({ className, children, ...props }, ref) => {
    const { state, dispatch, itemCount, itemRefs, disabledIndices } = useContextMenuCtx();
    const internalRef = React.useRef<HTMLDivElement>(null);
    const menuRef = (ref as React.RefObject<HTMLDivElement>) || internalRef;

    // Reset item count each render so items can re-register
    itemCount.current = 0;

    // Click outside
    React.useEffect(() => {
      if (!state.open) return;
      const handler = (e: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
          dispatch({ type: "CLOSE" });
        }
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, [state.open, dispatch, menuRef]);

    // Escape key
    React.useEffect(() => {
      if (!state.open) return;
      const handler = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          dispatch({ type: "CLOSE" });
        }
      };
      document.addEventListener("keydown", handler);
      return () => document.removeEventListener("keydown", handler);
    }, [state.open, dispatch]);

    // Keyboard navigation
    React.useEffect(() => {
      if (!state.open) return;

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
          const next = findNext(state.activeIndex, 1);
          if (next !== -1) dispatch({ type: "SET_ACTIVE", index: next });
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          const prev = findNext(state.activeIndex, -1);
          if (prev !== -1) dispatch({ type: "SET_ACTIVE", index: prev });
        } else if (e.key === "Enter") {
          e.preventDefault();
          if (state.activeIndex >= 0) {
            const el = itemRefs.current.get(state.activeIndex);
            el?.click();
          }
        }
      };

      document.addEventListener("keydown", handler);
      return () => document.removeEventListener("keydown", handler);
    }, [state.open, state.activeIndex, dispatch, itemRefs, disabledIndices]);

    // Focus active item
    React.useEffect(() => {
      if (state.activeIndex >= 0) {
        const el = itemRefs.current.get(state.activeIndex);
        el?.focus();
      }
    }, [state.activeIndex, itemRefs]);

    const [mounted, setMounted] = React.useState(false);
    const [visible, setVisible] = React.useState(false);

    React.useEffect(() => {
      if (state.open) {
        setMounted(true);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setVisible(true));
        });
      } else {
        setVisible(false);
        const timer = setTimeout(() => setMounted(false), 150);
        return () => clearTimeout(timer);
      }
    }, [state.open]);

    if (!mounted) return null;

    return (
      <div
        ref={menuRef}
        role="menu"
        className={cn(
          "fixed z-50 min-w-[160px] rounded-md border border-krds-gray-200 dark:border-krds-gray-700 bg-white dark:bg-krds-gray-800 p-1 shadow-md",
          "transition-all duration-150",
          visible ? "opacity-100 scale-100" : "opacity-0 scale-95",
          className
        )}
        style={{ left: state.position.x, top: state.position.y }}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ContextMenuContent.displayName = "ContextMenuContent";

/* ------------------------------------------------------------------ */
/*  ContextMenuItem                                                   */
/* ------------------------------------------------------------------ */

export interface ContextMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
}

const ContextMenuItem = React.forwardRef<HTMLDivElement, ContextMenuItemProps>(
  ({ className, disabled = false, onClick, children, ...props }, ref) => {
    const { dispatch, itemCount, registerItem } = useContextMenuCtx();
    const indexRef = React.useRef<number>(-1);
    const internalRef = React.useRef<HTMLDivElement>(null);

    // Assign index on mount
    React.useEffect(() => {
      // index is captured at render time below
    }, []);

    // Capture index at render time
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
      [ref, disabled, registerItem]
    );

    const handleClick = React.useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (disabled) return;
        onClick?.(e);
        dispatch({ type: "CLOSE" });
      },
      [disabled, onClick, dispatch]
    );

    return (
      <div
        ref={itemRef}
        role="menuitem"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled || undefined}
        className={cn(
          "relative flex items-center rounded-sm px-2 py-1.5 text-sm cursor-pointer outline-none",
          "text-krds-gray-700 dark:text-krds-gray-300",
          "hover:bg-krds-gray-100 dark:hover:bg-krds-gray-700",
          "focus:bg-krds-gray-100 dark:focus:bg-krds-gray-700",
          disabled && "text-krds-gray-400 dark:text-krds-gray-600 pointer-events-none",
          className
        )}
        onClick={handleClick}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ContextMenuItem.displayName = "ContextMenuItem";

/* ------------------------------------------------------------------ */
/*  ContextMenuSeparator                                              */
/* ------------------------------------------------------------------ */

export interface ContextMenuSeparatorProps extends React.HTMLAttributes<HTMLHRElement> {}

const ContextMenuSeparator = React.forwardRef<HTMLHRElement, ContextMenuSeparatorProps>(
  ({ className, ...props }, ref) => (
    <hr
      ref={ref}
      className={cn(
        "h-px border-0 bg-krds-gray-200 dark:bg-krds-gray-700 my-1 -mx-1",
        className
      )}
      {...props}
    />
  )
);
ContextMenuSeparator.displayName = "ContextMenuSeparator";

/* ------------------------------------------------------------------ */
/*  ContextMenuLabel                                                  */
/* ------------------------------------------------------------------ */

export interface ContextMenuLabelProps extends React.HTMLAttributes<HTMLDivElement> {}

const ContextMenuLabel = React.forwardRef<HTMLDivElement, ContextMenuLabelProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "px-2 py-1.5 text-xs font-semibold text-krds-gray-500 dark:text-krds-gray-400",
        className
      )}
      {...props}
    />
  )
);
ContextMenuLabel.displayName = "ContextMenuLabel";

/* ------------------------------------------------------------------ */
/*  ContextMenuShortcut                                               */
/* ------------------------------------------------------------------ */

export interface ContextMenuShortcutProps extends React.HTMLAttributes<HTMLSpanElement> {}

const ContextMenuShortcut = React.forwardRef<HTMLSpanElement, ContextMenuShortcutProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "ml-auto text-xs text-krds-gray-400 dark:text-krds-gray-500",
        className
      )}
      {...props}
    />
  )
);
ContextMenuShortcut.displayName = "ContextMenuShortcut";

/* ------------------------------------------------------------------ */
/*  Exports                                                           */
/* ------------------------------------------------------------------ */

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuLabel,
  ContextMenuShortcut,
};
