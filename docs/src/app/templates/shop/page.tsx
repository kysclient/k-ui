"use client";

import * as React from "react";

/* ------------------------------------------------------------------ */
/*  Data Constants                                                     */
/* ------------------------------------------------------------------ */

const navTabs = ["베스트", "신상품", "브랜드", "세일", "카테고리"];

const categories = [
  { name: "아우터", color: "from-amber-300 to-amber-500" },
  { name: "상의", color: "from-sky-300 to-sky-500" },
  { name: "하의", color: "from-indigo-300 to-indigo-500" },
  { name: "원피스", color: "from-pink-300 to-pink-500" },
  { name: "가방", color: "from-emerald-300 to-emerald-500" },
  { name: "신발", color: "from-orange-300 to-orange-500" },
  { name: "악세서리", color: "from-violet-300 to-violet-500" },
  { name: "뷰티", color: "from-rose-300 to-rose-500" },
];

const recommendedProducts = [
  {
    id: 1,
    brand: "MUSINSA STANDARD",
    name: "릴랙스드 코튼 크루넥 반팔 티셔츠",
    originalPrice: 29900,
    salePrice: 19900,
    discount: 33,
    gradient: "from-slate-200 to-slate-400",
  },
  {
    id: 2,
    brand: "COVERNAT",
    name: "C 로고 볼캡 블랙",
    originalPrice: 39900,
    salePrice: 27930,
    discount: 30,
    gradient: "from-zinc-300 to-zinc-500",
  },
  {
    id: 3,
    brand: "NIKE",
    name: "에어포스 1 '07 화이트",
    originalPrice: 139000,
    salePrice: 97300,
    discount: 30,
    gradient: "from-gray-100 to-gray-300",
  },
  {
    id: 4,
    brand: "HOKA",
    name: "본디 8 블랙 러닝화",
    originalPrice: 199000,
    salePrice: 139300,
    discount: 30,
    gradient: "from-neutral-200 to-neutral-400",
  },
];

const timeSaleProducts = [
  {
    id: 5,
    brand: "ADIDAS",
    name: "오리지널 트레포일 후디",
    originalPrice: 99000,
    salePrice: 39600,
    discount: 60,
    gradient: "from-blue-200 to-blue-400",
    remaining: 12,
  },
  {
    id: 6,
    brand: "LEVI'S",
    name: "501 오리지널 스트레이트 진",
    originalPrice: 129000,
    salePrice: 51600,
    discount: 60,
    gradient: "from-indigo-200 to-indigo-400",
    remaining: 5,
  },
  {
    id: 7,
    brand: "THE NORTH FACE",
    name: "1996 레트로 눕시 자켓",
    originalPrice: 349000,
    salePrice: 174500,
    discount: 50,
    gradient: "from-yellow-200 to-yellow-400",
    remaining: 3,
  },
];

const brandRankings = [
  {
    name: "MUSINSA STANDARD",
    desc: "합리적인 가격의 베이직 아이템",
    tag: "베이직",
  },
  {
    name: "COVERNAT",
    desc: "캐주얼 스트리트 브랜드",
    tag: "스트릿",
  },
  {
    name: "NIKE",
    desc: "글로벌 스포츠 브랜드",
    tag: "스포츠",
  },
  {
    name: "HOKA",
    desc: "프리미엄 러닝 슈즈 브랜드",
    tag: "러닝",
  },
  {
    name: "ADIDAS",
    desc: "스포츠 라이프스타일 브랜드",
    tag: "스포츠",
  },
];

const recentProducts = [
  { id: 1, gradient: "from-rose-200 to-rose-400", name: "데님 자켓" },
  { id: 2, gradient: "from-sky-200 to-sky-400", name: "스트라이프 셔츠" },
  { id: 3, gradient: "from-amber-200 to-amber-400", name: "카고 팬츠" },
  { id: 4, gradient: "from-emerald-200 to-emerald-400", name: "니트 베스트" },
  { id: 5, gradient: "from-violet-200 to-violet-400", name: "레더 토트백" },
  { id: 6, gradient: "from-pink-200 to-pink-400", name: "미니 크로스백" },
  { id: 7, gradient: "from-teal-200 to-teal-400", name: "캔버스 스니커즈" },
  { id: 8, gradient: "from-orange-200 to-orange-400", name: "버킷햇" },
];

const footerLinks = ["이용약관", "개인정보처리방침", "입점문의", "제휴문의", "광고안내"];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function formatPrice(n: number) {
  return n.toLocaleString("ko-KR");
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ShopTemplatePage() {
  const [activeTab, setActiveTab] = React.useState("베스트");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [cartCount] = React.useState(3);
  const [liked, setLiked] = React.useState<Record<number, boolean>>({});
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const toggleLike = (id: number) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-white text-[#111111] dark:bg-[#0F172A] dark:text-gray-100">
      {/* ============================================================ */}
      {/*  HEADER                                                       */}
      {/* ============================================================ */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-[#111111]">
        {/* Top bar */}
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          {/* Logo */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mr-2 flex flex-col gap-1 lg:hidden"
            aria-label="메뉴 열기"
          >
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
          </button>
          <h1 className="shrink-0 text-xl font-black tracking-tight md:text-2xl">
            K-SHOP
          </h1>

          {/* Search bar */}
          <div className="relative mx-4 hidden max-w-xl flex-1 sm:block">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="브랜드, 상품, 스타일 검색"
              className="w-full rounded-full border border-gray-300 bg-gray-50 py-2 pl-4 pr-10 text-sm outline-none transition-colors focus:border-[#111111] dark:border-gray-700 dark:bg-gray-900 dark:focus:border-gray-400"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 5.1 5.1a7.5 7.5 0 0 0 11.55 11.55z"
                />
              </svg>
            </span>
          </div>

          {/* Right icons */}
          <div className="flex shrink-0 items-center gap-3 text-xs md:gap-5 md:text-sm">
            <button className="flex flex-col items-center gap-0.5 transition-colors hover:text-[#FF4D4D]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0"
                />
              </svg>
              <span className="hidden md:inline">마이페이지</span>
            </button>
            <button className="relative flex flex-col items-center gap-0.5 transition-colors hover:text-[#FF4D4D]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -right-1.5 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#FF4D4D] text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
              <span className="hidden md:inline">장바구니</span>
            </button>
            <button className="flex flex-col items-center gap-0.5 transition-colors hover:text-[#FF4D4D]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15a2.25 2.25 0 0 1 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z"
                />
              </svg>
              <span className="hidden md:inline">주문조회</span>
            </button>
          </div>
        </div>

        {/* Navigation tabs */}
        <nav className="mx-auto max-w-7xl overflow-x-auto px-4">
          <ul className="flex gap-1">
            {navTabs.map((tab) => (
              <li key={tab}>
                <button
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap px-4 py-2.5 text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? "border-b-2 border-[#111111] text-[#111111] dark:border-white dark:text-white"
                      : "text-gray-500 hover:text-[#111111] dark:text-gray-400 dark:hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="border-t border-gray-200 bg-white px-4 py-3 lg:hidden dark:border-gray-700 dark:bg-[#111111]">
            <div className="relative mb-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="검색어를 입력하세요"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 py-2 pl-3 pr-9 text-sm outline-none dark:border-gray-700 dark:bg-gray-900"
              />
            </div>
            {navTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setMobileMenuOpen(false);
                }}
                className="block w-full py-2 text-left text-sm text-gray-700 hover:text-[#111111] dark:text-gray-300 dark:hover:text-white"
              >
                {tab}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ============================================================ */}
      {/*  HERO BANNER                                                  */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#111111] via-[#1e293b] to-[#334155] py-16 text-white md:py-24">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-[#FF4D4D] blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-blue-500 blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-gray-400">
            2026 SPRING COLLECTION
          </p>
          <h2 className="mb-4 text-4xl font-black tracking-tight md:text-6xl">
            SPRING SALE
          </h2>
          <p className="mb-2 text-2xl font-bold text-[#FF4D4D] md:text-4xl">
            최대 70% OFF
          </p>
          <p className="mb-8 text-sm text-gray-300 md:text-base">
            봄 시즌 한정 특별 할인 | 3월 9일 ~ 3월 31일
          </p>
          <button className="rounded-full bg-white px-8 py-3 text-sm font-bold text-[#111111] transition-transform hover:scale-105 active:scale-95">
            지금 쇼핑하기
          </button>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  카테고리 아이콘 바                                            */}
      {/* ============================================================ */}
      <section className="border-b border-gray-100 bg-white py-6 dark:border-gray-800 dark:bg-[#0F172A]">
        <div className="mx-auto max-w-7xl overflow-x-auto px-4">
          <div className="flex justify-between gap-4 md:justify-center md:gap-10">
            {categories.map((cat) => (
              <button
                key={cat.name}
                className="flex shrink-0 flex-col items-center gap-2 transition-transform hover:scale-105"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${cat.color} shadow-sm md:h-16 md:w-16`}
                >
                  <span className="text-lg font-bold text-white">
                    {cat.name.charAt(0)}
                  </span>
                </div>
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-8">
        {/* ============================================================ */}
        {/*  오늘의 추천                                                  */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h3 className="text-xl font-bold md:text-2xl">오늘의 추천</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                스타일리스트가 엄선한 인기 아이템
              </p>
            </div>
            <button className="text-sm font-medium text-gray-500 transition-colors hover:text-[#111111] dark:text-gray-400 dark:hover:text-white">
              전체보기 &rarr;
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {recommendedProducts.map((product) => (
              <div
                key={product.id}
                className="group cursor-pointer overflow-hidden rounded-xl border border-gray-100 bg-white transition-shadow hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
              >
                {/* Image placeholder */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <div
                    className={`h-full w-full bg-gradient-to-br ${product.gradient} transition-transform duration-300 group-hover:scale-105`}
                  />
                  {/* Discount badge */}
                  <span className="absolute left-2 top-2 rounded bg-[#FF4D4D] px-2 py-0.5 text-xs font-bold text-white">
                    {product.discount}%
                  </span>
                  {/* Heart icon */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(product.id);
                    }}
                    className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm transition-colors hover:bg-white dark:bg-black/50 dark:hover:bg-black/70"
                    aria-label="좋아요"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4 transition-colors ${
                        liked[product.id]
                          ? "fill-[#FF4D4D] text-[#FF4D4D]"
                          : "fill-none text-gray-600 dark:text-gray-300"
                      }`}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                  </button>
                </div>
                {/* Info */}
                <div className="p-3">
                  <p className="text-xs font-semibold text-gray-400">
                    {product.brand}
                  </p>
                  <p className="mt-0.5 line-clamp-2 text-sm font-medium leading-snug">
                    {product.name}
                  </p>
                  <div className="mt-2 flex items-baseline gap-1.5">
                    <span className="text-sm font-bold text-[#FF4D4D]">
                      {product.discount}%
                    </span>
                    <span className="text-sm font-bold">
                      {formatPrice(product.salePrice)}원
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}원
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/*  타임 세일                                                    */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold md:text-2xl">타임 세일</h3>
                <span className="flex items-center gap-1 rounded-full bg-[#FF4D4D] px-3 py-1 text-xs font-bold text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  LIVE
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                놓치면 후회할 특가 상품
              </p>
            </div>
            {/* Countdown */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                종료까지
              </span>
              {["02", "34", "15"].map((unit, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && (
                    <span className="text-lg font-bold text-[#FF4D4D]">:</span>
                  )}
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#111111] text-base font-bold tabular-nums text-white dark:bg-white dark:text-[#111111]">
                    {unit}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
            {timeSaleProducts.map((product) => (
              <div
                key={product.id}
                className="group cursor-pointer overflow-hidden rounded-xl border border-gray-100 bg-white transition-shadow hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <div
                    className={`h-full w-full bg-gradient-to-br ${product.gradient} transition-transform duration-300 group-hover:scale-105`}
                  />
                  <span className="absolute left-2 top-2 rounded bg-[#FF4D4D] px-2 py-0.5 text-xs font-bold text-white">
                    {product.discount}% OFF
                  </span>
                  <span className="absolute right-2 top-2 rounded bg-[#111111] px-2 py-0.5 text-xs font-bold text-white dark:bg-white dark:text-[#111111]">
                    잔여 {product.remaining}개
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(product.id);
                    }}
                    className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm transition-colors hover:bg-white dark:bg-black/50 dark:hover:bg-black/70"
                    aria-label="좋아요"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4 transition-colors ${
                        liked[product.id]
                          ? "fill-[#FF4D4D] text-[#FF4D4D]"
                          : "fill-none text-gray-600 dark:text-gray-300"
                      }`}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="p-3">
                  <p className="text-xs font-semibold text-gray-400">
                    {product.brand}
                  </p>
                  <p className="mt-0.5 line-clamp-2 text-sm font-medium leading-snug">
                    {product.name}
                  </p>
                  <div className="mt-2 flex items-baseline gap-1.5">
                    <span className="text-sm font-bold text-[#FF4D4D]">
                      {product.discount}%
                    </span>
                    <span className="text-sm font-bold">
                      {formatPrice(product.salePrice)}원
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}원
                  </span>
                  {/* Progress bar */}
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className="h-full rounded-full bg-[#FF4D4D]"
                      style={{ width: `${100 - product.remaining * 8}%` }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-[#FF4D4D]">
                    {product.remaining}개 남음
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/*  브랜드 랭킹                                                  */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="mb-6">
            <h3 className="text-xl font-bold md:text-2xl">브랜드 랭킹</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              이번 주 가장 인기 있는 브랜드
            </p>
          </div>

          <div className="divide-y divide-gray-100 overflow-hidden rounded-xl border border-gray-100 bg-white dark:divide-gray-800 dark:border-gray-800 dark:bg-gray-900">
            {brandRankings.map((brand, idx) => (
              <div
                key={brand.name}
                className="flex cursor-pointer items-center gap-4 px-4 py-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 md:px-6"
              >
                {/* Rank number */}
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-black ${
                    idx < 3
                      ? "bg-[#111111] text-white dark:bg-white dark:text-[#111111]"
                      : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                  }`}
                >
                  {idx + 1}
                </span>
                {/* Brand circle */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gray-200 to-gray-400 text-xs font-bold text-white dark:from-gray-600 dark:to-gray-800">
                  {brand.name.charAt(0)}
                </div>
                {/* Info */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold">{brand.name}</p>
                  <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                    {brand.desc}
                  </p>
                </div>
                {/* Tag */}
                <span className="shrink-0 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                  {brand.tag}
                </span>
                {/* Arrow */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 shrink-0 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/*  최근 본 상품                                                  */}
        {/* ============================================================ */}
        <section className="mb-12">
          <div className="mb-4 flex items-end justify-between">
            <h3 className="text-xl font-bold md:text-2xl">최근 본 상품</h3>
            <button className="text-sm font-medium text-gray-500 transition-colors hover:text-[#111111] dark:text-gray-400 dark:hover:text-white">
              전체삭제
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
            {recentProducts.map((item) => (
              <div
                key={item.id}
                className="group shrink-0 cursor-pointer"
              >
                <div className="relative h-24 w-24 overflow-hidden rounded-xl md:h-28 md:w-28">
                  <div
                    className={`h-full w-full bg-gradient-to-br ${item.gradient} transition-transform duration-200 group-hover:scale-105`}
                  />
                </div>
                <p className="mt-1.5 w-24 truncate text-center text-xs text-gray-600 dark:text-gray-400 md:w-28">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ============================================================ */}
      {/*  FOOTER                                                       */}
      {/* ============================================================ */}
      <footer className="border-t border-gray-200 bg-[#F9FAFB] dark:border-gray-800 dark:bg-[#111111]">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Company info */}
            <div>
              <h4 className="mb-3 text-sm font-black">K-SHOP</h4>
              <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                (주)케이샵코리아
                <br />
                대표이사: 홍길동
                <br />
                사업자등록번호: 123-45-67890
                <br />
                통신판매업신고: 제2026-서울강남-00001호
                <br />
                서울특별시 강남구 테헤란로 123, 15층
              </p>
            </div>

            {/* Customer center */}
            <div>
              <h4 className="mb-3 text-sm font-bold">고객센터</h4>
              <p className="text-2xl font-black tracking-tight">1234-5678</p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                평일 09:00 ~ 18:00 (점심 12:00 ~ 13:00)
                <br />
                토/일/공휴일 휴무
              </p>
              <div className="mt-3 flex gap-2">
                <button className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800">
                  1:1 문의
                </button>
                <button className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800">
                  FAQ
                </button>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="mb-3 text-sm font-bold">바로가기</h4>
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <li key={link}>
                    <button
                      className={`text-xs transition-colors hover:text-[#111111] dark:hover:text-white ${
                        link === "개인정보처리방침"
                          ? "font-bold text-[#111111] dark:text-white"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom disclaimer */}
          <div className="mt-8 border-t border-gray-200 pt-6 dark:border-gray-800">
            <p className="text-center text-xs text-gray-400 dark:text-gray-500">
              이 페이지는 K-UI 컴포넌트 라이브러리 데모용 템플릿입니다. 실제 서비스가 아닙니다.
            </p>
            <p className="mt-1 text-center text-xs text-gray-400 dark:text-gray-500">
              &copy; 2026 K-SHOP. All rights reserved. Powered by KRDS-UI.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
