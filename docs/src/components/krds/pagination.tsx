"use client";

import * as React from "react";
import { cn } from "./utils";

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

    const baseBtn = "inline-flex items-center justify-center h-9 min-w-[36px] px-2 text-sm font-medium rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#004098]";

    return (
      <nav ref={ref} role="navigation" aria-label="페이지 네비게이션" className={cn("flex items-center gap-1", className)} {...props}>
        <button
          type="button"
          className={cn(baseBtn, "text-[#64748B] dark:text-[#94A3B8] hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] disabled:opacity-50 disabled:pointer-events-none")}
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
            <span key={`ellipsis-${i}`} className="px-1 text-[#94A3B8] dark:text-[#64748B]">...</span>
          ) : (
            <button
              key={page}
              type="button"
              className={cn(
                baseBtn,
                page === currentPage
                  ? "bg-[#004098] text-white dark:bg-[#004098]"
                  : "text-[#334155] dark:text-[#CBD5E1] hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B]"
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
          className={cn(baseBtn, "text-[#64748B] dark:text-[#94A3B8] hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] disabled:opacity-50 disabled:pointer-events-none")}
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
