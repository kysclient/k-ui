import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "font-medium whitespace-nowrap",
    "border border-transparent",
    "transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-krds-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-krds-primary-400 dark:focus-visible:ring-offset-krds-gray-900",
    "disabled:pointer-events-none disabled:opacity-50",
    "select-none",
  ].join(" "),
  {
    variants: {
      variant: {
        // 기본(Primary) - 정부 공식 파랑 배경
        primary: [
          "bg-krds-primary-700 text-white",
          "hover:bg-krds-primary-800",
          "active:bg-krds-primary-900",
          "dark:bg-krds-primary-600 dark:hover:bg-krds-primary-500 dark:active:bg-krds-primary-700",
        ].join(" "),

        // 보조(Secondary) - 아웃라인 스타일
        secondary: [
          "bg-white text-krds-primary-700 border-krds-primary-700",
          "hover:bg-krds-primary-50",
          "active:bg-krds-primary-100",
          "dark:bg-krds-gray-800 dark:text-krds-primary-200 dark:border-krds-primary-400 dark:hover:bg-krds-gray-700",
        ].join(" "),

        // 서브(Tertiary) - 회색 배경
        tertiary: [
          "bg-krds-gray-100 text-krds-gray-700 border-krds-gray-200",
          "hover:bg-krds-gray-200",
          "active:bg-krds-gray-300",
          "dark:bg-krds-gray-800 dark:text-krds-gray-200 dark:border-krds-gray-700 dark:hover:bg-krds-gray-700",
        ].join(" "),

        // 위험(Danger) - 삭제/경고 액션
        danger: [
          "bg-krds-error-500 text-white",
          "hover:bg-krds-error-600",
          "active:bg-krds-error-700",
          "dark:bg-krds-error-600",
        ].join(" "),

        // 고스트 - 배경 없음
        ghost: [
          "text-krds-gray-700",
          "hover:bg-krds-gray-100",
          "active:bg-krds-gray-200",
          "dark:text-krds-gray-200 dark:hover:bg-krds-gray-800",
        ].join(" "),

        // 링크 스타일
        link: [
          "text-krds-primary-700 underline-offset-4",
          "hover:underline",
          "dark:text-krds-primary-300",
        ].join(" "),
      },

      // 정부 표준 규격: 대(lg) / 중(md) / 소(sm)
      size: {
        lg: "h-12 px-6 text-base rounded-md",
        md: "h-10 px-4 text-sm rounded",
        sm: "h-8 px-3 text-xs rounded-sm",
      },

      // 전체 너비
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

const loadingSpinner = (
  <svg
    className="animate-spin h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
    />
  </svg>
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** 로딩 상태 표시 */
  loading?: boolean;
  /** 버튼 좌측 아이콘 */
  leftIcon?: React.ReactNode;
  /** 버튼 우측 아이콘 */
  rightIcon?: React.ReactNode;
  /** 렌더링할 HTML 엘리먼트 (기본: button) */
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      loading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading ? loadingSpinner : leftIcon}
        {children}
        {!loading && rightIcon}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
