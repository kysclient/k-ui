import Link from 'next/link';

const features = [
  {
    title: "Accessible by Default",
    description: "WCAG 2.1 AA 기준을 준수하며, 모든 컴포넌트에 ARIA 속성이 기본 탑재됩니다.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "Copy & Paste",
    description: "필요한 컴포넌트만 복사해서 사용하거나, NPM으로 설치할 수 있습니다.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
      </svg>
    ),
  },
  {
    title: "Dark Mode",
    description: "모든 컴포넌트가 라이트/다크 모드를 지원하며, 시스템 설정에 자동 대응합니다.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
      </svg>
    ),
  },
  {
    title: "Tailwind Plugin",
    description: "한 줄의 플러그인 등록으로 KRDS (Korea Design System) 디자인 토큰이 프로젝트에 주입됩니다.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
  {
    title: "TypeScript First",
    description: "모든 컴포넌트가 TypeScript로 작성되어 완전한 타입 안전성을 제공합니다.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  {
    title: "Composable",
    description: "CVA 기반의 variant 시스템으로 자유롭게 확장하고 커스터마이징할 수 있습니다.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.959.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />
      </svg>
    ),
  },
];

const components = [
  { name: "Button", href: "/docs/components/button" },
  { name: "Input", href: "/docs/components/input" },
  { name: "Badge", href: "/docs/components/badge" },
  { name: "Card", href: "/docs/components/card" },
  { name: "Tabs", href: "/docs/components/tabs" },
  { name: "Dialog", href: "/docs/components/dialog" },
  { name: "Table", href: "/docs/components/table" },
  { name: "Checkbox", href: "/docs/components/checkbox" },
  { name: "Switch", href: "/docs/components/switch" },
  { name: "Select", href: "/docs/components/select" },
  { name: "Accordion", href: "/docs/components/accordion" },
  { name: "Alert", href: "/docs/components/alert" },
  { name: "Pagination", href: "/docs/components/pagination" },
  { name: "Textarea", href: "/docs/components/textarea" },
  { name: "Tooltip", href: "/docs/components/tooltip" },
  { name: "Avatar", href: "/docs/components/avatar" },
  { name: "Separator", href: "/docs/components/separator" },
  { name: "Skeleton", href: "/docs/components/skeleton" },
  { name: "Radio Group", href: "/docs/components/radio-group" },
  { name: "Label", href: "/docs/components/label" },
  { name: "Sheet", href: "/docs/components/sheet" },
  { name: "Calendar", href: "/docs/components/calendar" },
  { name: "Breadcrumb", href: "/docs/components/breadcrumb" },
  { name: "Carousel", href: "/docs/components/carousel" },
  { name: "ContextMenu", href: "/docs/components/context-menu" },
  { name: "Progress", href: "/docs/components/progress" },
  { name: "Popover", href: "/docs/components/popover" },
];

const stats = [
  { value: "27+", label: "Components" },
  { value: "AA", label: "WCAG 2.1" },
  { value: "100%", label: "TypeScript" },
  { value: "0", label: "Dependencies*" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Hero with gradient background */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 py-28 md:py-40">
        {/* Gradient orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-[40%] -left-[20%] h-[600px] w-[600px] rounded-full bg-[#004098]/20 blur-[120px] dark:bg-[#004098]/30" />
          <div className="absolute -top-[20%] -right-[10%] h-[500px] w-[500px] rounded-full bg-[#60A5FA]/15 blur-[100px] dark:bg-[#3B82F6]/20" />
          <div className="absolute -bottom-[30%] left-[30%] h-[400px] w-[400px] rounded-full bg-[#818CF8]/10 blur-[100px] dark:bg-[#6366F1]/15" />
        </div>
        {/* Grid pattern */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,64,152,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,64,152,0.03)_1px,transparent_1px)] bg-[size:64px_64px] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-[#0F172A] dark:text-[#F8FAFC]">
            <span className="bg-gradient-to-r from-[#004098] via-[#3B82F6] to-[#818CF8] bg-clip-text text-transparent dark:from-[#60A5FA] dark:via-[#818CF8] dark:to-[#A78BFA]">
              K-UI
            </span>
          </h1>
          <p className="text-xl md:text-2xl font-medium text-[#334155] dark:text-[#CBD5E1] mb-4">
            Build accessible interfaces with confidence.
          </p>
          <p className="text-base md:text-lg text-[#64748B] dark:text-[#94A3B8] mb-10 leading-relaxed max-w-2xl mx-auto">
            KRDS (Korea Design System)에서 영감을 받은 깔끔하고 접근성 높은 React UI 라이브러리.
            <br className="hidden sm:block" />
            필요한 컴포넌트만 복사하거나, NPM으로 설치하세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/docs"
              className="group inline-flex items-center justify-center h-12 px-8 text-sm font-medium text-white bg-[#004098] rounded-lg hover:bg-[#003070] transition-all shadow-lg shadow-[#004098]/25 hover:shadow-xl hover:shadow-[#004098]/30 dark:bg-[#1A5BC8] dark:hover:bg-[#306DE0] dark:shadow-[#1A5BC8]/25"
            >
              Get Started
              <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href="/docs/components/button"
              className="inline-flex items-center justify-center h-12 px-8 text-sm font-medium text-[#004098] border border-[#004098]/30 rounded-lg hover:bg-[#004098]/5 transition-all dark:text-[#9EBEF4] dark:border-[#9EBEF4]/30 dark:hover:bg-[#9EBEF4]/5"
            >
              Browse Components
            </Link>
          </div>

          {/* Install Command */}
          <div className="mt-8 inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-[#0F172A] text-[#94A3B8] text-sm font-mono border border-[#1E293B] shadow-2xl dark:bg-black/60 dark:border-[#334155]">
            <span className="text-[#64748B]">$</span>
            <span className="text-[#E2E8F0]">npm install @kui-ui/react</span>
            <button className="ml-2 text-[#475569] hover:text-[#94A3B8] transition-colors" title="Copy">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15.75h7.5c.621 0 1.125-.504 1.125-1.125V3.375c0-.621-.504-1.125-1.125-1.125h-7.5c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 py-12 border-t border-[#E2E8F0] dark:border-[#1E293B]">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-[#004098] to-[#3B82F6] bg-clip-text text-transparent dark:from-[#60A5FA] dark:to-[#A78BFA]">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-[#64748B] dark:text-[#94A3B8]">{stat.label}</div>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-[#94A3B8] dark:text-[#475569] mt-4">
          * Zero runtime dependencies beyond React
        </p>
      </section>

      {/* Features */}
      <section className="px-4 py-16 md:py-24 border-t border-[#E2E8F0] dark:border-[#1E293B]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-[#0F172A] dark:text-[#F8FAFC]">
            Why K-UI?
          </h2>
          <p className="text-center text-[#64748B] dark:text-[#94A3B8] mb-12 max-w-2xl mx-auto">
            공공 서비스 수준의 신뢰성과 현대적인 개발 경험을 동시에.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group flex flex-col gap-3 p-6 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] hover:border-[#004098]/30 dark:hover:border-[#60A5FA]/30 transition-all bg-white dark:bg-[#0F172A]/50 hover:shadow-lg hover:shadow-[#004098]/5 dark:hover:shadow-[#60A5FA]/5"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#004098]/10 text-[#004098] dark:bg-[#60A5FA]/10 dark:text-[#60A5FA] group-hover:bg-[#004098]/15 dark:group-hover:bg-[#60A5FA]/15 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-[#0F172A] dark:text-[#F8FAFC]">{feature.title}</h3>
                <p className="text-sm text-[#64748B] dark:text-[#94A3B8] leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Components Grid */}
      <section className="relative px-4 py-16 md:py-24 border-t border-[#E2E8F0] dark:border-[#1E293B]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-[#004098]/5 blur-[80px] dark:bg-[#3B82F6]/10" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-[#0F172A] dark:text-[#F8FAFC]">
            {components.length}+ Components
          </h2>
          <p className="text-center text-[#64748B] dark:text-[#94A3B8] mb-12">
            프로덕션 환경에서 바로 사용할 수 있는 컴포넌트들.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {components.map((comp) => (
              <Link
                key={comp.name}
                href={comp.href}
                className="group flex items-center justify-between h-12 px-4 text-sm font-medium rounded-lg border border-[#E2E8F0] dark:border-[#1E293B] text-[#334155] dark:text-[#CBD5E1] hover:border-[#004098] hover:text-[#004098] dark:hover:border-[#60A5FA] dark:hover:text-[#60A5FA] transition-all bg-white dark:bg-[#0F172A]/50 hover:shadow-md hover:shadow-[#004098]/5"
              >
                <span>{comp.name}</span>
                <svg className="h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#004098] dark:text-[#60A5FA]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative px-4 py-20 md:py-28 border-t border-[#E2E8F0] dark:border-[#1E293B]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] rounded-full bg-gradient-to-r from-[#004098]/10 via-[#3B82F6]/10 to-[#818CF8]/10 blur-[80px] dark:from-[#004098]/20 dark:via-[#3B82F6]/15 dark:to-[#818CF8]/15" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0F172A] dark:text-[#F8FAFC]">
            Start building today.
          </h2>
          <p className="text-lg text-[#64748B] dark:text-[#94A3B8] mb-8">
            문서를 읽고 첫 번째 컴포넌트를 추가해보세요.
          </p>
          <Link
            href="/docs"
            className="group inline-flex items-center justify-center h-12 px-10 text-sm font-medium text-white bg-[#004098] rounded-lg hover:bg-[#003070] transition-all shadow-lg shadow-[#004098]/25 hover:shadow-xl hover:shadow-[#004098]/30 dark:bg-[#1A5BC8] dark:hover:bg-[#306DE0] dark:shadow-[#1A5BC8]/25"
          >
            Read the Docs
            <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
