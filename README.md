# K-UI

KRDS (Korea Design System)에서 영감을 받은 깔끔하고 접근성 높은 React UI 컴포넌트 라이브러리입니다.

**문서**: [k-ui-theta.vercel.app](https://k-ui-theta.vercel.app)

---

## 특징

- **30개 이상의 컴포넌트** -- Button, Dialog, Select, Sheet, Calendar, Carousel, ContextMenu, Toast, DropdownMenu, Slider, Progress, Popover 등
- **접근성 기본 탑재** -- 모든 컴포넌트가 WCAG 2.1 AA 기준을 준수하며, ARIA 속성과 키보드 내비게이션을 지원합니다.
- **다크 모드** -- 모든 컴포넌트가 라이트/다크 모드를 기본 지원합니다.
- **Tailwind CSS 플러그인** -- 플러그인 한 줄 등록으로 KRDS (Korea Design System) 디자인 토큰(색상, 타이포그래피, border-radius)이 프로젝트에 주입됩니다.
- **TypeScript** -- 전체 코드가 TypeScript로 작성되어 있으며, 모든 타입이 export됩니다.
- **Copy & Paste** -- NPM 패키지를 설치하거나, shadcn/ui처럼 개별 컴포넌트 소스 코드를 직접 복사해서 사용할 수 있습니다.
- **애니메이션** -- Dialog, Sheet, Accordion, Tooltip, Popover, Select, ContextMenu 등 모든 인터랙티브 컴포넌트에 부드러운 진입/퇴장 트랜지션이 적용되어 있습니다.

## 설치

```bash
npm install @kui-ui/react
```

## 설정

### Tailwind CSS 플러그인

`tailwind.config.js`에 플러그인을 등록하면 KRDS (Korea Design System) 디자인 토큰이 자동 주입됩니다:

```js
const kuiPlugin = require("@kui-ui/react/plugin");

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@kui-ui/react/dist/**/*.{js,cjs}",
  ],
  plugins: [kuiPlugin],
};
```

### 사용 예시

```tsx
import { Button, Input, Badge } from "@kui-ui/react";

export default function App() {
  return (
    <div>
      <Button variant="primary" size="md">확인</Button>
      <Input label="이름" required placeholder="홍길동" />
      <Badge variant="success" dot>완료</Badge>
    </div>
  );
}
```

## 컴포넌트

### General

Button, Badge, Separator, Skeleton, Avatar, Tooltip

### Form

Input, Textarea, Select, Checkbox, Switch, Radio Group, Calendar, Label, Slider

### Layout

Card, Accordion, Tabs, Table, Pagination, Breadcrumb, Carousel

### Feedback

Alert, Dialog, Sheet, Progress, Popover, Toast

### Advanced

ContextMenu, Dropdown Menu

## 디자인 토큰

Tailwind 플러그인이 제공하는 토큰 카테고리:

| 카테고리 | 내용 |
|----------|------|
| 색상 | `primary-50` ~ `primary-950`, `gray-50` ~ `gray-950`, `error`, `success`, `warning`, `info` |
| 타이포그래피 | Pretendard 폰트, `xs` ~ `4xl` 사이즈 (한국어 최적화 line-height) |
| Border Radius | `sm` (2px), `DEFAULT` (4px), `lg` (6px), `xl` (8px) |
| 그림자 | `sm`, `DEFAULT`, `md`, `lg` |

모든 토큰은 기존 Tailwind 클래스와의 충돌을 방지하기 위해 `krds-` 접두사가 붙습니다.

## Copy & Paste (Registry)

패키지 설치 없이 문서에서 컴포넌트 소스 코드를 직접 복사해서 사용할 수 있습니다. 각 컴포넌트 문서 페이지에 전체 소스가 포함되어 있습니다.

프로그래밍 방식으로 접근 가능한 레지스트리도 제공됩니다:

```js
import registry from "@kui-ui/react/registry";
```

## 프로젝트 구조

```
k-ui/
  src/                  # 라이브러리 소스
    components/         # 30개 이상의 컴포넌트 디렉토리
    theme/              # Tailwind 플러그인 및 디자인 토큰
    lib/                # 유틸리티 (cn 헬퍼)
    index.ts            # 배럴 익스포트
  docs/                 # 문서 사이트 (Fumadocs + Next.js)
    content/            # MDX 문서 페이지
    src/                # Next.js 앱
  scripts/              # 레지스트리 빌더
```

## 개발

```bash
# 라이브러리 빌드
npm run build

# 워치 모드
npm run dev

# 문서 사이트 실행
cd docs && npm run dev
```

## 기술 스택

| 영역 | 기술 |
|------|------|
| 컴포넌트 | React 18+, TypeScript |
| 스타일링 | Tailwind CSS, class-variance-authority, tailwind-merge |
| 빌드 | Vite (라이브러리 모드), vite-plugin-dts |
| 문서 | Fumadocs, Next.js, MDX |
| 출력 | ESM + CJS 듀얼 빌드, 타입 선언 파일 포함 |

## 라이선스

MIT

## 작성자

kysclient (kysclient@gmail.com)

- GitHub: [github.com/kysclient/k-ui](https://github.com/kysclient/k-ui)
- 문서: [k-ui-theta.vercel.app](https://k-ui-theta.vercel.app)
