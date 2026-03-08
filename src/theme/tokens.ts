/**
 * KRDS 디자인 토큰 정의
 * 대한민국 공공기관 표준 디자인 가이드 기반
 */

export const krdsColors = {
  // Primary - 정부 공식 파랑
  primary: {
    DEFAULT: "#004098",
    50: "#E8F0FE",
    100: "#C5D9F9",
    200: "#9EBEF4",
    300: "#749FEE",
    400: "#5286E8",
    500: "#306DE0",
    600: "#1A5BC8",
    700: "#004098",
    800: "#003070",
    900: "#002050",
    950: "#001030",
  },

  // Gray - Slate 계열
  gray: {
    DEFAULT: "#64748B",
    50: "#F8FAFC",
    100: "#F1F5F9",
    200: "#E2E8F0",
    300: "#CBD5E1",
    400: "#94A3B8",
    500: "#64748B",
    600: "#475569",
    700: "#334155",
    800: "#1E293B",
    900: "#0F172A",
    950: "#020617",
  },

  // Semantic colors
  error: {
    DEFAULT: "#D32F2F",
    50: "#FFEBEE",
    100: "#FFCDD2",
    200: "#EF9A9A",
    300: "#E57373",
    400: "#EF5350",
    500: "#D32F2F",
    600: "#C62828",
    700: "#B71C1C",
  },
  success: {
    DEFAULT: "#2E7D32",
    50: "#E8F5E9",
    100: "#C8E6C9",
    500: "#2E7D32",
    700: "#1B5E20",
  },
  warning: {
    DEFAULT: "#ED6C02",
    50: "#FFF3E0",
    100: "#FFE0B2",
    500: "#ED6C02",
    700: "#E65100",
  },
  info: {
    DEFAULT: "#0288D1",
    50: "#E1F5FE",
    100: "#B3E5FC",
    500: "#0288D1",
    700: "#01579B",
  },
} as const;

export const krdsFontFamily = {
  sans: [
    "Pretendard",
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
  ],
};

export const krdsFontSize = {
  xs: ["0.75rem", { lineHeight: "1.6", letterSpacing: "-0.02em" }],
  sm: ["0.875rem", { lineHeight: "1.6", letterSpacing: "-0.02em" }],
  base: ["1rem", { lineHeight: "1.6", letterSpacing: "-0.02em" }],
  lg: ["1.125rem", { lineHeight: "1.6", letterSpacing: "-0.02em" }],
  xl: ["1.25rem", { lineHeight: "1.5", letterSpacing: "-0.02em" }],
  "2xl": ["1.5rem", { lineHeight: "1.4", letterSpacing: "-0.02em" }],
  "3xl": ["1.875rem", { lineHeight: "1.3", letterSpacing: "-0.02em" }],
  "4xl": ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
} as const;

export const krdsBorderRadius = {
  none: "0",
  sm: "2px",
  DEFAULT: "4px",
  md: "4px",
  lg: "6px",
  xl: "8px",
  full: "9999px",
} as const;

export const krdsBoxShadow = {
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  DEFAULT: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
} as const;
