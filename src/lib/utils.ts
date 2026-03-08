import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind CSS 클래스를 안전하게 병합하는 유틸리티.
 * clsx로 조건부 클래스를 처리한 뒤, tailwind-merge로 충돌을 해소합니다.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
