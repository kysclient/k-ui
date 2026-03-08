/**
 * Registry Builder
 *
 * 각 컴포넌트의 소스코드를 JSON으로 변환합니다.
 * 사용자가 특정 컴포넌트만 복사(copy-paste) 방식으로 가져갈 수 있도록 합니다.
 *
 * 출력: dist/registry.json
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(__dirname, "../src");
const DIST = resolve(__dirname, "../dist");

const COMPONENTS_DIR = resolve(SRC, "components");
const UTILS_PATH = resolve(SRC, "lib/utils.ts");

function readFileContent(filePath) {
  return readFileSync(filePath, "utf-8");
}

function buildRegistry() {
  const registry = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "@kui-ui/react",
    version: "0.1.0",
    baseUrl: "src",
    // 공통 의존성
    dependencies: {
      "class-variance-authority": "^0.7.0",
      clsx: "^2.1.0",
      "tailwind-merge": "^2.2.0",
    },
    // 공통 유틸리티 (모든 컴포넌트에 필요)
    utils: [
      {
        name: "utils",
        path: "lib/utils.ts",
        content: readFileContent(UTILS_PATH),
      },
    ],
    // 컴포넌트 목록
    items: [],
  };

  const componentDirs = readdirSync(COMPONENTS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  for (const componentName of componentDirs) {
    const dir = resolve(COMPONENTS_DIR, componentName);
    const files = readdirSync(dir).filter((f) => f.endsWith(".ts") || f.endsWith(".tsx"));

    const item = {
      name: componentName,
      type: "component",
      description: getComponentDescription(componentName),
      files: files.map((fileName) => ({
        name: fileName,
        path: `components/${componentName}/${fileName}`,
        content: readFileContent(resolve(dir, fileName)),
      })),
      // 컴포넌트별 추가 의존성 (현재는 공통만 사용)
      registryDependencies: ["utils"],
    };

    registry.items.push(item);
  }

  writeFileSync(resolve(DIST, "registry.json"), JSON.stringify(registry, null, 2));
  console.log(`Registry built: ${registry.items.length} components`);
}

function getComponentDescription(name) {
  const descriptions = {
    button: "정부 표준 규격(대/중/소) 버튼. 고대비 모드, 로딩 및 비활성 상태 지원.",
    input: "라벨과 유효성 검사 에러 메시지가 포함된 접근성 준수 폼 필드.",
    badge: "공지, 진행중 등 상태를 나타내는 인라인 태그.",
    card: "정보성 공지 및 민원 목록에 적합한 보더 기반 카드 레이아웃.",
  };
  return descriptions[name] || "";
}

buildRegistry();
