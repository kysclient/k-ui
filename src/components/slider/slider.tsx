"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SliderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
  /** 현재 값 (제어 컴포넌트) */
  value?: number;
  /** 초기 값 (비제어 컴포넌트) */
  defaultValue?: number;
  /** 값 변경 콜백 */
  onValueChange?: (value: number) => void;
  /** 최소값 */
  min?: number;
  /** 최대값 */
  max?: number;
  /** 증가 단위 */
  step?: number;
  /** 비활성 상태 */
  disabled?: boolean;
  /** 현재 값 표시 */
  showValue?: boolean;
  /** 라벨 텍스트 */
  label?: string;
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      className,
      value: valueProp,
      defaultValue = 0,
      onValueChange,
      min = 0,
      max = 100,
      step = 1,
      disabled = false,
      showValue = false,
      label,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const isControlled = valueProp !== undefined;
    const currentValue = isControlled ? valueProp : internalValue;

    const trackRef = React.useRef<HTMLDivElement>(null);
    const isDragging = React.useRef(false);

    const clampValue = React.useCallback(
      (val: number) => {
        const stepped = Math.round((val - min) / step) * step + min;
        return Math.min(max, Math.max(min, stepped));
      },
      [min, max, step],
    );

    const updateValue = React.useCallback(
      (val: number) => {
        const clamped = clampValue(val);
        if (!isControlled) {
          setInternalValue(clamped);
        }
        onValueChange?.(clamped);
      },
      [clampValue, isControlled, onValueChange],
    );

    const getValueFromPosition = React.useCallback(
      (clientX: number) => {
        const track = trackRef.current;
        if (!track) return currentValue;
        const rect = track.getBoundingClientRect();
        const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
        return min + ratio * (max - min);
      },
      [currentValue, min, max],
    );

    const handlePointerDown = React.useCallback(
      (e: React.PointerEvent) => {
        if (disabled) return;
        e.preventDefault();
        isDragging.current = true;
        const val = getValueFromPosition(e.clientX);
        updateValue(val);
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      },
      [disabled, getValueFromPosition, updateValue],
    );

    const handlePointerMove = React.useCallback(
      (e: React.PointerEvent) => {
        if (!isDragging.current || disabled) return;
        const val = getValueFromPosition(e.clientX);
        updateValue(val);
      },
      [disabled, getValueFromPosition, updateValue],
    );

    const handlePointerUp = React.useCallback(() => {
      isDragging.current = false;
    }, []);

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent) => {
        if (disabled) return;
        let newValue = currentValue;
        switch (e.key) {
          case "ArrowRight":
          case "ArrowUp":
            e.preventDefault();
            newValue = currentValue + step;
            break;
          case "ArrowLeft":
          case "ArrowDown":
            e.preventDefault();
            newValue = currentValue - step;
            break;
          case "Home":
            e.preventDefault();
            newValue = min;
            break;
          case "End":
            e.preventDefault();
            newValue = max;
            break;
          default:
            return;
        }
        updateValue(newValue);
      },
      [disabled, currentValue, step, min, max, updateValue],
    );

    const percentage = ((currentValue - min) / (max - min)) * 100;

    return (
      <div
        ref={ref}
        className={cn("w-full", disabled && "opacity-50", className)}
        {...props}
      >
        {(label || showValue) && (
          <div className="flex items-center justify-between mb-2">
            {label && (
              <span className="text-sm font-medium text-krds-gray-700 dark:text-krds-gray-300">
                {label}
              </span>
            )}
            {showValue && (
              <span className="text-sm tabular-nums text-krds-gray-600 dark:text-krds-gray-400">
                {currentValue}
              </span>
            )}
          </div>
        )}
        <div
          ref={trackRef}
          className={cn(
            "relative h-2 w-full rounded-full bg-krds-gray-200 dark:bg-krds-gray-700 select-none",
            !disabled && "cursor-pointer",
          )}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <div
            className="absolute h-full rounded-full bg-krds-primary dark:bg-krds-primary-500"
            style={{ width: `${percentage}%` }}
          />
          <div
            role="slider"
            tabIndex={disabled ? -1 : 0}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={currentValue}
            aria-label={label}
            aria-disabled={disabled || undefined}
            onKeyDown={handleKeyDown}
            className={cn(
              "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-5 w-5 rounded-full border-2 bg-white shadow-sm transition-shadow",
              "border-krds-primary dark:border-krds-primary-500",
              "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-krds-primary/20 dark:focus-visible:ring-krds-primary-500/20",
              !disabled && "hover:shadow-md",
            )}
            style={{ left: `${percentage}%` }}
          />
        </div>
      </div>
    );
  },
);
Slider.displayName = "Slider";

export { Slider };
