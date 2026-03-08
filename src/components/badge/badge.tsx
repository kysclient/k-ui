import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  [
    "inline-flex items-center",
    "font-medium whitespace-nowrap",
    "border rounded-sm",
    "transition-colors duration-150",
  ].join(" "),
  {
    variants: {
      variant: {
        // 기본 - 파랑 계열
        default: "bg-krds-primary-50 text-krds-primary-700 border-krds-primary-200 dark:bg-krds-primary-900/50 dark:text-krds-primary-200 dark:border-krds-primary-700",
        // 성공/완료
        success: "bg-krds-success-50 text-krds-success-700 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700",
        // 경고/주의
        warning: "bg-krds-warning-50 text-krds-warning-700 border-orange-200 dark:bg-orange-900/50 dark:text-orange-300 dark:border-orange-700",
        // 오류/긴급
        error: "bg-krds-error-50 text-krds-error-700 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-700",
        // 정보
        info: "bg-krds-info-50 text-krds-info-700 border-sky-200 dark:bg-sky-900/50 dark:text-sky-300 dark:border-sky-700",
        // 중립/회색
        neutral: "bg-krds-gray-100 text-krds-gray-700 border-krds-gray-200 dark:bg-krds-gray-800 dark:text-krds-gray-300 dark:border-krds-gray-600",
        // 아웃라인만
        outline: "bg-transparent text-krds-gray-700 border-krds-gray-300 dark:text-krds-gray-300 dark:border-krds-gray-600",
      },
      size: {
        sm: "px-1.5 py-0.5 text-xs",
        md: "px-2 py-0.5 text-xs",
        lg: "px-2.5 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /** 좌측 도트 인디케이터 표시 */
  dot?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, dot, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size, className }))}
        {...props}
      >
        {dot && (
          <span
            className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 shrink-0"
            aria-hidden="true"
          />
        )}
        {children}
      </span>
    );
  },
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
