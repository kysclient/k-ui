/**
 * @krds-ui/react Tailwind CSS Plugin
 *
 * 사용법 (tailwind.config.js):
 *
 *   const krdsPlugin = require("@krds-ui/react/plugin");
 *
 *   module.exports = {
 *     plugins: [krdsPlugin],
 *   };
 *
 * 또는 테마만 선택적으로 확장:
 *
 *   const { krdsPreset } = require("@krds-ui/react/plugin");
 *
 *   module.exports = {
 *     presets: [krdsPreset],
 *   };
 */

import plugin from "tailwindcss/plugin";
import {
  krdsColors,
  krdsFontFamily,
  krdsFontSize,
  krdsBorderRadius,
  krdsBoxShadow,
} from "./tokens";

const krdsPlugin = plugin(
  // 기본 스타일 & 유틸리티 추가
  function ({ addBase, addUtilities }) {
    addBase({
      // Pretendard 웹폰트 로드
      "@font-face": {
        fontFamily: "Pretendard",
        src: 'url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css")',
        fontDisplay: "swap",
      },
      // 기본 바디 스타일
      body: {
        fontFamily: krdsFontFamily.sans.join(", "),
        letterSpacing: "-0.02em",
        lineHeight: "1.6",
        color: krdsColors.gray[900],
        "-webkit-font-smoothing": "antialiased",
        "-moz-osx-font-smoothing": "grayscale",
      },
    });

    // 고대비 모드 유틸리티
    addUtilities({
      ".krds-high-contrast": {
        "--krds-text": krdsColors.gray[950],
        "--krds-border": krdsColors.gray[900],
        "--krds-bg": "#FFFFFF",
      },
    });
  },
  // 테마 확장
  {
    theme: {
      extend: {
        colors: {
          krds: krdsColors,
        },
        fontFamily: krdsFontFamily,
        fontSize: krdsFontSize as any,
        borderRadius: krdsBorderRadius,
        boxShadow: krdsBoxShadow,
        // 포커스 링 스타일 (접근성)
        ringColor: {
          krds: krdsColors.primary[500],
        },
        ringOffsetWidth: {
          krds: "2px",
        },
      },
    },
  },
);

// Preset 방식으로도 사용 가능하도록 export
export const krdsPreset = {
  theme: {
    extend: {
      colors: { krds: krdsColors },
      fontFamily: krdsFontFamily,
      fontSize: krdsFontSize,
      borderRadius: krdsBorderRadius,
      boxShadow: krdsBoxShadow,
    },
  },
};

export default krdsPlugin;
