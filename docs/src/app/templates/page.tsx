import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Templates',
  description: 'K-UI 컴포넌트로 구현한 실제 서비스 템플릿 모음',
};

const templates = [
  {
    title: '정부24',
    description: '대한민국 정부 포털 메인페이지 클론. 검색, 서비스 카드, 공지사항, 퀵메뉴 등 K-UI 컴포넌트를 활용한 풀페이지 템플릿.',
    href: '/templates/gov24',
    tags: ['Portal', 'Full Page', 'Dashboard'],
  },
  {
    title: '국민건강보험',
    description: '국민건강보험공단 포털 메인페이지 클론. 건강보험 자격확인, 보험료 조회, 건강검진 예약 등 공공 건강보험 서비스 템플릿.',
    href: '/templates/nhis',
    tags: ['Healthcare', 'Portal', 'Full Page'],
  },
  {
    title: '홈택스',
    description: '국세청 홈택스 포털 클론. 세금 신고, 전자세금계산서, 세무일정 등 세금 관련 공공 서비스 템플릿.',
    href: '/templates/hometax',
    tags: ['Tax', 'Portal', 'Full Page'],
  },
  {
    title: 'NAVER',
    description: '네이버 메인페이지 클론. 검색, 뉴스스탠드, 실시간 급상승 검색어, 날씨, 쇼핑 등 포털 서비스 템플릿.',
    href: '/templates/naver',
    tags: ['Portal', 'Search', 'Full Page'],
  },
  {
    title: 'K-SHOP',
    description: '쇼핑몰 메인페이지 클론. 상품 카드, 타임 세일, 브랜드 랭킹, 카테고리 등 이커머스 템플릿.',
    href: '/templates/shop',
    tags: ['E-Commerce', 'Shopping', 'Full Page'],
  },
  {
    title: '회원가입',
    description: '회원가입 폼 템플릿. 소셜 로그인, 실시간 유효성 검사, 비밀번호 강도 표시, 약관 동의 등 인터랙티브 폼.',
    href: '/templates/signup',
    tags: ['Form', 'Auth', 'Interactive'],
  },
];

export default function TemplatesPage() {
  return (
    <div className="flex flex-col flex-1">
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#0F172A] dark:text-[#F8FAFC]">
            Templates
          </h1>
          <p className="text-lg text-[#64748B] dark:text-[#94A3B8] mb-12 max-w-2xl">
            K-UI 컴포넌트로 구현한 실제 서비스 수준의 페이지 템플릿입니다.
            소스 코드를 참고하여 프로젝트에 활용할 수 있습니다.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="group flex flex-col rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#0F172A]/50 hover:border-[#004098]/30 dark:hover:border-[#60A5FA]/30 hover:shadow-lg transition-all overflow-hidden"
              >
                <div className="h-40 bg-gradient-to-br from-[#004098]/10 via-[#3B82F6]/5 to-[#818CF8]/10 dark:from-[#004098]/20 dark:via-[#3B82F6]/10 dark:to-[#818CF8]/15 flex items-center justify-center">
                  <span className="text-4xl font-bold text-[#004098]/20 dark:text-[#60A5FA]/20 group-hover:text-[#004098]/40 dark:group-hover:text-[#60A5FA]/40 transition-colors">
                    {t.title}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-semibold text-[#0F172A] dark:text-[#F8FAFC] mb-2">
                    {t.title}
                  </h3>
                  <p className="text-sm text-[#64748B] dark:text-[#94A3B8] mb-4 flex-1">
                    {t.description}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {t.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs rounded-full bg-[#E8F0FE] text-[#004098] dark:bg-[#004098]/20 dark:text-[#9EBEF4]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
