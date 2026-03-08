"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  siblingCount?: number;
}

function getPageRange(current: number, total: number, siblings: number) {
  const range: (number | "...")[] = [];
  const left = Math.max(2, current - siblings);
  const right = Math.min(total - 1, current + siblings);

  range.push(1);
  if (left > 2) range.push("...");
  for (let i = left; i <= right; i++) range.push(i);
  if (right < total - 1) range.push("...");
  if (total > 1) range.push(total);

  return range;
}

const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  ({ className, currentPage, totalPages, onPageChange, siblingCount = 1, ...props }, ref) => {
    const pages = getPageRange(currentPage, totalPages, siblingCount);

    const baseBtn = "inline-flex items-center justify-center h-9 min-w-[36px] px-2 text-sm font-medium rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-krds-primary-500";

    return (
      <nav ref={ref} role="navigation" aria-label="페이지 네비게이션" className={cn("flex items-center gap-1", className)} {...props}>
        <button
          type="button"
          className={cn(baseBtn, "text-krds-gray-500 dark:text-krds-gray-400 hover:bg-krds-gray-100 dark:hover:bg-krds-gray-800 disabled:opacity-50 disabled:pointer-events-none")}
          onClick={() => onPageChange?.(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="이전 페이지"
        >
          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {pages.map((page, i) =>
          page === "..." ? (
            <span key={`ellipsis-${i}`} className="px-1 text-krds-gray-400 dark:text-krds-gray-500">...</span>
          ) : (
            <button
              key={page}
              type="button"
              className={cn(
                baseBtn,
                page === currentPage
                  ? "bg-krds-primary-700 text-white dark:bg-krds-primary-600"
                  : "text-krds-gray-700 dark:text-krds-gray-300 hover:bg-krds-gray-100 dark:hover:bg-krds-gray-800"
              )}
              onClick={() => onPageChange?.(page as number)}
              aria-current={page === currentPage ? "page" : undefined}
              aria-label={`${page}페이지`}
            >
              {page}
            </button>
          )
        )}

        <button
          type="button"
          className={cn(baseBtn, "text-krds-gray-500 dark:text-krds-gray-400 hover:bg-krds-gray-100 dark:hover:bg-krds-gray-800 disabled:opacity-50 disabled:pointer-events-none")}
          onClick={() => onPageChange?.(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="다음 페이지"
        >
          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </nav>
    );
  }
);
Pagination.displayName = "Pagination";

export { Pagination };
