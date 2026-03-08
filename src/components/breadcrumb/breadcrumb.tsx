"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* -------------------------------- Breadcrumb ------------------------------ */

export interface BreadcrumbProps extends React.ComponentPropsWithoutRef<"nav"> {
  separator?: React.ReactNode;
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, ...props }, ref) => (
    <nav ref={ref} aria-label="breadcrumb" className={className} {...props} />
  )
);
Breadcrumb.displayName = "Breadcrumb";

/* ------------------------------ BreadcrumbList ----------------------------- */

export interface BreadcrumbListProps
  extends React.ComponentPropsWithoutRef<"ol"> {}

const BreadcrumbList = React.forwardRef<HTMLOListElement, BreadcrumbListProps>(
  ({ className, ...props }, ref) => (
    <ol
      ref={ref}
      className={cn(
        "flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
        className
      )}
      {...props}
    />
  )
);
BreadcrumbList.displayName = "BreadcrumbList";

/* ------------------------------ BreadcrumbItem ----------------------------- */

export interface BreadcrumbItemProps
  extends React.ComponentPropsWithoutRef<"li"> {}

const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ className, ...props }, ref) => (
    <li
      ref={ref}
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  )
);
BreadcrumbItem.displayName = "BreadcrumbItem";

/* ------------------------------ BreadcrumbLink ----------------------------- */

export interface BreadcrumbLinkProps
  extends React.ComponentPropsWithoutRef<"a"> {
  asChild?: boolean;
}

const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ asChild, className, children, ...props }, ref) => {
    const classes = cn(
      "text-krds-gray-500 dark:text-krds-gray-400 hover:text-krds-gray-900 dark:hover:text-krds-gray-50 transition-colors",
      className
    );

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<any>, {
        ref,
        className: cn(classes, (children as React.ReactElement<any>).props.className),
        ...props,
      });
    }

    return (
      <a ref={ref} className={classes} {...props}>
        {children}
      </a>
    );
  }
);
BreadcrumbLink.displayName = "BreadcrumbLink";

/* ------------------------------ BreadcrumbPage ----------------------------- */

export interface BreadcrumbPageProps
  extends React.ComponentPropsWithoutRef<"span"> {}

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn(
        "text-krds-gray-900 dark:text-krds-gray-50 font-medium",
        className
      )}
      {...props}
    />
  )
);
BreadcrumbPage.displayName = "BreadcrumbPage";

/* --------------------------- BreadcrumbSeparator --------------------------- */

export interface BreadcrumbSeparatorProps
  extends React.ComponentPropsWithoutRef<"li"> {}

const BreadcrumbSeparator = React.forwardRef<
  HTMLLIElement,
  BreadcrumbSeparatorProps
>(({ className, children, ...props }, ref) => (
  <li
    ref={ref}
    role="presentation"
    aria-hidden="true"
    className={cn(
      "text-krds-gray-400 dark:text-krds-gray-600 [&>svg]:h-3.5 [&>svg]:w-3.5",
      className
    )}
    {...props}
  >
    {children ?? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 5l7 7-7 7"
        />
      </svg>
    )}
  </li>
));
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

/* --------------------------- BreadcrumbEllipsis ---------------------------- */

export interface BreadcrumbEllipsisProps
  extends React.ComponentPropsWithoutRef<"span"> {}

const BreadcrumbEllipsis = React.forwardRef<
  HTMLSpanElement,
  BreadcrumbEllipsisProps
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="presentation"
    aria-hidden="true"
    className={cn(
      "flex h-9 w-9 items-center justify-center text-krds-gray-500 dark:text-krds-gray-400",
      className
    )}
    {...props}
  >
    &#8230;
    <span className="sr-only">More pages</span>
  </span>
));
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

/* -------------------------------- Exports --------------------------------- */

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
