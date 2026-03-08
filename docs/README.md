# K-UI 문서 사이트

K-UI 컴포넌트 라이브러리의 문서 사이트입니다. [Fumadocs](https://fumadocs.dev)와 Next.js 기반.

**배포 주소**: [k-ui-theta.vercel.app](https://k-ui-theta.vercel.app)

## 개발

```bash
npm install
npm run dev
```

http://localhost:3000 에서 확인할 수 있습니다.

## 구조

| 경로 | 설명 |
|------|------|
| `content/docs/` | MDX 문서 페이지 |
| `content/docs/components/` | 개별 컴포넌트 문서 |
| `src/components/krds/` | 라이브 프리뷰용 컴포넌트 구현체 |
| `src/app/(home)/` | 랜딩 페이지 |
| `src/app/docs/` | 문서 레이아웃 및 페이지 |
| `public/` | 정적 파일 (로고, 파비콘, 매니페스트) |

## 컴포넌트 문서 추가 방법

1. `content/docs/components/{name}.mdx` 생성
2. `src/components/krds/{name}.tsx` 에 컴포넌트 구현
3. `src/mdx-components.tsx` 에 등록
4. `content/docs/components/meta.json` 사이드바에 추가
