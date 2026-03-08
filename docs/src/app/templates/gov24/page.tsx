"use client";

import * as React from "react";
import Link from "next/link";
import type { Metadata } from "next";

/* ------------------------------------------------------------------ */
/*  Service category data                                              */
/* ------------------------------------------------------------------ */

const serviceCategories = [
  { icon: "ID", label: "주민등록", color: "#004098" },
  { icon: "Car", label: "자동차/운전", color: "#0288D1" },
  { icon: "Plane", label: "여권/출입국", color: "#00838F" },
  { icon: "Home", label: "주택/부동산", color: "#2E7D32" },
  { icon: "Docs", label: "민원신청", color: "#ED6C02" },
  { icon: "Health", label: "건강/복지", color: "#D32F2F" },
  { icon: "Edu", label: "교육", color: "#5C6BC0" },
  { icon: "Tax", label: "세금/재정", color: "#6D4C41" },
];

const quickServices = [
  "주민등록등본 발급",
  "운전면허증 갱신",
  "여권 발급 신청",
  "건축물대장 열람",
  "가족관계증명서",
  "사업자등록증명",
  "납세증명서 발급",
  "건강보험 자격확인",
];

const notices = [
  {
    category: "공지",
    title: "2026년 상반기 정부24 시스템 정기 점검 안내",
    date: "2026-03-07",
  },
  {
    category: "안내",
    title: "모바일 전자증명서 발급 서비스 확대 시행",
    date: "2026-03-05",
  },
  {
    category: "공지",
    title: "개인정보처리방침 변경 사전 안내 (3월)",
    date: "2026-03-03",
  },
  {
    category: "소식",
    title: "디지털 정부혁신 우수사례 공모전 개최",
    date: "2026-03-01",
  },
  {
    category: "안내",
    title: "정부24 앱 업데이트 안내 (v5.2.0)",
    date: "2026-02-28",
  },
];

const footerLinks = [
  "이용약관",
  "개인정보처리방침",
  "저작권 정책",
  "접근성 안내",
  "시스템 이용안내",
  "관련 사이트",
];

/* ------------------------------------------------------------------ */
/*  Icon components (simple SVG)                                       */
/* ------------------------------------------------------------------ */

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  );
}

function BellIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  );
}

function ServiceIcon({ type, className, style }: { type: string; className?: string; style?: React.CSSProperties }) {
  const icons: Record<string, React.ReactNode> = {
    ID: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
      </svg>
    ),
    Car: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H6.75m11.25 0h2.625c.621 0 1.125-.504 1.125-1.125v-4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v4.875c0 .621.504 1.125 1.125 1.125" />
      </svg>
    ),
    Plane: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
      </svg>
    ),
    Home: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75" />
      </svg>
    ),
    Docs: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    Health: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    Edu: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
      </svg>
    ),
    Tax: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75" />
      </svg>
    ),
  };
  return <span style={style}>{icons[type] || null}</span>;
}

/* ------------------------------------------------------------------ */
/*  Main page component                                                */
/* ------------------------------------------------------------------ */

export default function Gov24Template() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeTab, setActiveTab] = React.useState<"notice" | "news">("notice");

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A]">
      {/* ── Top utility bar ── */}
      <div className="bg-[#F1F5F9] dark:bg-[#1E293B] border-b border-[#E2E8F0] dark:border-[#334155]">
        <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between h-9 text-xs text-[#64748B] dark:text-[#94A3B8]">
          <div className="flex items-center gap-4">
            <span>대한민국 정부 포털</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="hover:text-[#004098] dark:hover:text-[#9EBEF4] transition-colors flex items-center gap-1">
              <BellIcon className="h-3.5 w-3.5" />
              알림
            </button>
            <span className="text-[#CBD5E1] dark:text-[#475569]">|</span>
            <button className="hover:text-[#004098] dark:hover:text-[#9EBEF4] transition-colors">로그인</button>
            <span className="text-[#CBD5E1] dark:text-[#475569]">|</span>
            <button className="hover:text-[#004098] dark:hover:text-[#9EBEF4] transition-colors">회원가입</button>
          </div>
        </div>
      </div>

      {/* ── Header ── */}
      <header className="bg-white dark:bg-[#0F172A] border-b border-[#E2E8F0] dark:border-[#334155]">
        <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-[#004098] flex items-center justify-center text-white text-xs font-bold">
                G24
              </div>
              <span className="text-lg font-bold text-[#004098] dark:text-[#9EBEF4]">정부24</span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#334155] dark:text-[#CBD5E1]">
              <button className="hover:text-[#004098] dark:hover:text-[#9EBEF4] transition-colors">서비스</button>
              <button className="hover:text-[#004098] dark:hover:text-[#9EBEF4] transition-colors">정책정보</button>
              <button className="hover:text-[#004098] dark:hover:text-[#9EBEF4] transition-colors">참여/소통</button>
              <button className="hover:text-[#004098] dark:hover:text-[#9EBEF4] transition-colors">기관안내</button>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-md hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] transition-colors">
              <UserIcon className="h-5 w-5 text-[#64748B] dark:text-[#94A3B8]" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero / Search ── */}
      <section className="relative bg-gradient-to-br from-[#004098] via-[#003070] to-[#001030] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/20 blur-[100px] -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/10 blur-[80px] translate-y-1/2 -translate-x-1/3" />
        </div>
        <div className="relative max-w-[1200px] mx-auto px-4 py-16 md:py-20">
          <h1 className="text-2xl md:text-3xl font-bold mb-3">
            정부 서비스, 한 곳에서.
          </h1>
          <p className="text-sm md:text-base text-white/70 mb-8 max-w-lg">
            민원 신청, 증명서 발급, 정책 정보까지 정부의 모든 서비스를 이곳에서 이용하세요.
          </p>

          {/* Search bar */}
          <div className="max-w-xl">
            <div className="flex items-center bg-white dark:bg-[#1E293B] rounded-lg shadow-lg overflow-hidden">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="어떤 서비스를 찾고 계신가요?"
                className="flex-1 h-12 px-4 text-sm text-[#0F172A] dark:text-[#F8FAFC] placeholder:text-[#94A3B8] bg-transparent outline-none"
              />
              <button className="h-12 px-5 bg-[#004098] hover:bg-[#003070] transition-colors flex items-center gap-2 text-sm font-medium text-white">
                <SearchIcon className="h-4 w-4" />
                검색
              </button>
            </div>
            <div className="flex gap-2 mt-3 flex-wrap">
              {["주민등록등본", "여권 발급", "전입신고", "사업자등록"].map((tag) => (
                <button
                  key={tag}
                  className="px-3 py-1 text-xs rounded-full bg-white/10 hover:bg-white/20 text-white/80 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Service categories ── */}
      <section className="max-w-[1200px] mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-white dark:bg-[#1E293B] rounded-xl shadow-md border border-[#E2E8F0] dark:border-[#334155] p-6">
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {serviceCategories.map((cat) => (
              <button
                key={cat.label}
                className="group flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-[#F8FAFC] dark:hover:bg-[#0F172A]/50 transition-colors"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${cat.color}12` }}
                >
                  <ServiceIcon type={cat.icon} className="h-6 w-6" style={{ color: cat.color } as React.CSSProperties} />
                </div>
                <span className="text-xs font-medium text-[#334155] dark:text-[#CBD5E1] text-center leading-tight">
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quick services ── */}
      <section className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">
            자주 찾는 서비스
          </h2>
          <button className="flex items-center gap-1 text-sm text-[#004098] dark:text-[#9EBEF4] hover:underline">
            전체보기
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickServices.map((service) => (
            <button
              key={service}
              className="group flex items-center justify-between h-14 px-4 rounded-lg border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] hover:border-[#004098]/30 dark:hover:border-[#60A5FA]/30 hover:shadow-sm transition-all text-left"
            >
              <span className="text-sm font-medium text-[#334155] dark:text-[#CBD5E1] group-hover:text-[#004098] dark:group-hover:text-[#9EBEF4] transition-colors">
                {service}
              </span>
              <ChevronRightIcon className="h-4 w-4 text-[#CBD5E1] dark:text-[#475569] group-hover:text-[#004098] dark:group-hover:text-[#9EBEF4] transition-colors" />
            </button>
          ))}
        </div>
      </section>

      {/* ── Notice & Banner section ── */}
      <section className="max-w-[1200px] mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Notice list */}
          <div className="lg:col-span-2 bg-white dark:bg-[#1E293B] rounded-xl border border-[#E2E8F0] dark:border-[#334155] p-6">
            <div className="flex items-center gap-4 mb-5">
              <button
                className={`text-sm font-semibold pb-1 border-b-2 transition-colors ${
                  activeTab === "notice"
                    ? "text-[#004098] dark:text-[#9EBEF4] border-[#004098] dark:border-[#9EBEF4]"
                    : "text-[#94A3B8] border-transparent hover:text-[#64748B]"
                }`}
                onClick={() => setActiveTab("notice")}
              >
                공지사항
              </button>
              <button
                className={`text-sm font-semibold pb-1 border-b-2 transition-colors ${
                  activeTab === "news"
                    ? "text-[#004098] dark:text-[#9EBEF4] border-[#004098] dark:border-[#9EBEF4]"
                    : "text-[#94A3B8] border-transparent hover:text-[#64748B]"
                }`}
                onClick={() => setActiveTab("news")}
              >
                정부뉴스
              </button>
            </div>
            <ul className="divide-y divide-[#F1F5F9] dark:divide-[#334155]">
              {notices.map((item, i) => (
                <li key={i} className="py-3 first:pt-0 last:pb-0">
                  <button className="w-full flex items-start gap-3 text-left group">
                    <span className={`shrink-0 mt-0.5 px-2 py-0.5 text-[10px] font-semibold rounded ${
                      item.category === "공지"
                        ? "bg-[#E8F0FE] text-[#004098] dark:bg-[#004098]/20 dark:text-[#9EBEF4]"
                        : item.category === "안내"
                        ? "bg-[#E8F5E9] text-[#2E7D32] dark:bg-[#2E7D32]/20 dark:text-[#66BB6A]"
                        : "bg-[#FFF3E0] text-[#ED6C02] dark:bg-[#ED6C02]/20 dark:text-[#FFA726]"
                    }`}>
                      {item.category}
                    </span>
                    <span className="flex-1 text-sm text-[#334155] dark:text-[#CBD5E1] group-hover:text-[#004098] dark:group-hover:text-[#9EBEF4] transition-colors truncate">
                      {item.title}
                    </span>
                    <span className="shrink-0 text-xs text-[#94A3B8] dark:text-[#64748B]">
                      {item.date}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Side banners */}
          <div className="flex flex-col gap-4">
            <div className="rounded-xl bg-gradient-to-br from-[#004098] to-[#306DE0] p-6 text-white flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs text-white/60 mb-1">간편 인증</p>
                <h3 className="text-lg font-bold mb-2">디지털 원패스</h3>
                <p className="text-xs text-white/70 leading-relaxed">
                  하나의 인증으로 정부 서비스를<br />편리하게 이용하세요.
                </p>
              </div>
              <button className="self-start mt-4 px-4 py-2 text-xs font-medium bg-white/20 hover:bg-white/30 rounded-md transition-colors">
                자세히 보기
              </button>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6 text-white flex-1 flex flex-col justify-between border border-[#334155]">
              <div>
                <p className="text-xs text-white/60 mb-1">모바일</p>
                <h3 className="text-lg font-bold mb-2">정부24 앱</h3>
                <p className="text-xs text-white/70 leading-relaxed">
                  전자증명서를 스마트폰에서<br />바로 발급받으세요.
                </p>
              </div>
              <button className="self-start mt-4 px-4 py-2 text-xs font-medium bg-white/10 hover:bg-white/20 rounded-md transition-colors border border-white/20">
                다운로드
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="bg-white dark:bg-[#1E293B] border-y border-[#E2E8F0] dark:border-[#334155]">
        <div className="max-w-[1200px] mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "6,400+", label: "민원 서비스" },
              { value: "2,100+", label: "증명서 발급 종류" },
              { value: "52,000+", label: "일 평균 이용건수" },
              { value: "24/7", label: "서비스 운영" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl md:text-3xl font-bold text-[#004098] dark:text-[#9EBEF4]">
                  {stat.value}
                </div>
                <div className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#0F172A] text-white">
        <div className="max-w-[1200px] mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-white/10 flex items-center justify-center text-white text-[10px] font-bold">
                G24
              </div>
              <span className="font-bold">정부24</span>
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-[#94A3B8]">
              {footerLinks.map((link) => (
                <button key={link} className="hover:text-white transition-colors">
                  {link === "개인정보처리방침" ? (
                    <span className="font-bold text-white">{link}</span>
                  ) : (
                    link
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className="border-t border-[#1E293B] pt-6 text-xs text-[#64748B] leading-relaxed space-y-1">
            <p>행정안전부 (06750) 서울특별시 서초구 관악로 1</p>
            <p>정부민원안내 콜센터 110 (해외 +82-2-6196-0110)</p>
            <p className="mt-3 text-[#475569]">
              이 페이지는 K-UI 컴포넌트 라이브러리 데모용 템플릿입니다. 실제 정부24 서비스가 아닙니다.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
