"use client";

import * as React from "react";

/* ------------------------------------------------------------------ */
/*  Data Constants                                                     */
/* ------------------------------------------------------------------ */

const quickLinks = [
  "메일",
  "카페",
  "블로그",
  "지식iN",
  "쇼핑",
  "뉴스",
  "증권",
  "지도",
  "웹툰",
  "VIBE",
];

const newsOutlets = [
  { name: "조선일보", abbr: "조선" },
  { name: "중앙일보", abbr: "중앙" },
  { name: "동아일보", abbr: "동아" },
  { name: "한겨레", abbr: "한겨레" },
  { name: "경향신문", abbr: "경향" },
  { name: "MBC", abbr: "MBC" },
  { name: "KBS", abbr: "KBS" },
  { name: "SBS", abbr: "SBS" },
];

const articles = [
  {
    category: "경제",
    title: "코스피, 외국인 매수세에 2,650선 회복...반도체株 강세",
    source: "한국경제",
    time: "1시간 전",
  },
  {
    category: "IT/과학",
    title: "삼성전자, 차세대 AI 반도체 'HBM4' 양산 본격화",
    source: "전자신문",
    time: "2시간 전",
  },
  {
    category: "사회",
    title: "서울 봄꽃 개화 시기 역대 가장 빨라...기상청 분석",
    source: "연합뉴스",
    time: "3시간 전",
  },
  {
    category: "생활/문화",
    title: "넷플릭스 신작 한국 드라마, 글로벌 차트 1위 등극",
    source: "스포츠조선",
    time: "4시간 전",
  },
  {
    category: "세계",
    title: "미 연준, 기준금리 동결 결정...하반기 인하 가능성 시사",
    source: "조선비즈",
    time: "5시간 전",
  },
];

const trendingSearches = [
  { rank: 1, keyword: "벚꽃 개화 시기", change: "up" as const },
  { rank: 2, keyword: "프로야구 개막전", change: "up" as const },
  { rank: 3, keyword: "환율 전망", change: "down" as const },
  { rank: 4, keyword: "GPT-5 출시일", change: "up" as const },
  { rank: 5, keyword: "서울 맛집 추천", change: "same" as const },
  { rank: 6, keyword: "넷플릭스 인기 순위", change: "down" as const },
  { rank: 7, keyword: "아이폰 17 스펙", change: "up" as const },
  { rank: 8, keyword: "오늘 날씨", change: "same" as const },
  { rank: 9, keyword: "코스피 실시간", change: "down" as const },
  { rank: 10, keyword: "해외여행 추천", change: "up" as const },
];

const shoppingItems = [
  {
    name: "나이키 에어맥스 DN",
    price: "179,000",
    discount: "20%",
    originalPrice: "219,000",
    store: "네이버 스토어",
  },
  {
    name: "삼성 갤럭시 버즈3 프로",
    price: "259,000",
    discount: "15%",
    originalPrice: "299,000",
    store: "삼성 공식몰",
  },
  {
    name: "다이슨 에어랩 멀티 스타일러",
    price: "498,000",
    discount: "10%",
    originalPrice: "549,000",
    store: "다이슨 공식몰",
  },
  {
    name: "스타벅스 텀블러 한정판",
    price: "32,000",
    discount: "",
    originalPrice: "",
    store: "스타벅스 공식몰",
  },
];

const footerLinks = [
  "회사소개",
  "인재채용",
  "제휴제안",
  "이용약관",
  "개인정보처리방침",
  "청소년보호정책",
  "네이버 정책",
  "고객센터",
];

/* ------------------------------------------------------------------ */
/*  Helper Components                                                  */
/* ------------------------------------------------------------------ */

function SearchIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function ArrowUpIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#FF3D00"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m18 15-6-6-6 6" />
    </svg>
  );
}

function ArrowDownIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#2196F3"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function DashIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#9E9E9E"
      strokeWidth="3"
      strokeLinecap="round"
    >
      <path d="M5 12h14" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#FFA000"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" fill="#FFD54F" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page Component                                                */
/* ------------------------------------------------------------------ */

export default function NaverMainPage() {
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <div className="min-h-screen bg-[#F5F6F8] dark:bg-[#0F172A]">
      {/* ============================================================ */}
      {/*  HEADER / SEARCH AREA                                        */}
      {/* ============================================================ */}
      <header className="bg-white dark:bg-[#1E293B] border-b border-[#E5E8EB] dark:border-[#334155]">
        <div className="mx-auto max-w-[1130px] px-4 pt-8 pb-4">
          {/* Logo */}
          <div className="flex items-center justify-center mb-6">
            <span className="text-[38px] font-extrabold tracking-tight text-[#03C75A]">
              NAVER
            </span>
          </div>

          {/* Search Bar */}
          <div className="mx-auto max-w-[560px] mb-5">
            <div className="flex items-center rounded-full border-2 border-[#03C75A] bg-white dark:bg-[#0F172A] overflow-hidden transition-shadow focus-within:shadow-[0_0_0_3px_rgba(3,199,90,0.2)]">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="검색어를 입력해 주세요."
                className="flex-1 px-5 py-3 text-[15px] bg-transparent text-[#080808] dark:text-[#E2E8F0] placeholder:text-[#A0A0A0] dark:placeholder:text-[#64748B] outline-none"
              />
              <button className="flex items-center justify-center w-12 h-11 bg-[#03C75A] text-white hover:bg-[#02b351] transition-colors cursor-pointer rounded-r-full">
                <SearchIcon />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <nav className="flex items-center justify-center gap-1 flex-wrap">
            {quickLinks.map((link) => (
              <button
                key={link}
                className="px-3 py-1.5 text-[13px] font-medium text-[#080808] dark:text-[#E2E8F0] rounded-full hover:bg-[#F0F1F3] dark:hover:bg-[#334155] transition-colors cursor-pointer"
              >
                {link}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* ============================================================ */}
      {/*  MAIN CONTENT                                                 */}
      {/* ============================================================ */}
      <main className="mx-auto max-w-[1130px] px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-5">
          {/* ------------------------------------------------------ */}
          {/*  LEFT COLUMN                                            */}
          {/* ------------------------------------------------------ */}
          <div className="w-full lg:w-[60%] space-y-5">
            {/* 뉴스스탠드 */}
            <section className="rounded-xl bg-white dark:bg-[#1E293B] border border-[#E5E8EB] dark:border-[#334155] overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-[#E5E8EB] dark:border-[#334155]">
                <h2 className="text-[15px] font-bold text-[#080808] dark:text-[#E2E8F0]">
                  뉴스스탠드
                </h2>
                <div className="flex gap-2">
                  <span className="text-[12px] text-[#03C75A] font-semibold cursor-pointer">
                    전체언론사
                  </span>
                  <span className="text-[12px] text-[#888] dark:text-[#64748B] cursor-pointer hover:text-[#080808] dark:hover:text-[#E2E8F0] transition-colors">
                    구독한 언론사
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-8">
                {newsOutlets.map((outlet) => (
                  <button
                    key={outlet.name}
                    className="flex flex-col items-center justify-center py-4 px-2 border-r border-b border-[#E5E8EB] dark:border-[#334155] last:border-r-0 hover:bg-[#F8F9FA] dark:hover:bg-[#273548] transition-colors cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#F0F1F3] dark:bg-[#334155] flex items-center justify-center text-[11px] font-bold text-[#555] dark:text-[#94A3B8] group-hover:text-[#03C75A] transition-colors mb-1.5">
                      {outlet.abbr}
                    </div>
                    <span className="text-[11px] text-[#666] dark:text-[#94A3B8] truncate max-w-full">
                      {outlet.name}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            {/* 오늘 읽을만한 글 */}
            <section className="rounded-xl bg-white dark:bg-[#1E293B] border border-[#E5E8EB] dark:border-[#334155] overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-[#E5E8EB] dark:border-[#334155]">
                <h2 className="text-[15px] font-bold text-[#080808] dark:text-[#E2E8F0]">
                  오늘 읽을만한 글
                </h2>
                <span className="text-[12px] text-[#888] dark:text-[#64748B] cursor-pointer hover:text-[#080808] dark:hover:text-[#E2E8F0] transition-colors">
                  더보기 &gt;
                </span>
              </div>
              <div className="divide-y divide-[#E5E8EB] dark:divide-[#334155]">
                {articles.map((article, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 px-5 py-4 hover:bg-[#F8F9FA] dark:hover:bg-[#273548] transition-colors cursor-pointer group"
                  >
                    <div className="flex-1 min-w-0">
                      <span className="inline-block px-2 py-0.5 mb-1.5 text-[11px] font-semibold rounded bg-[#E8F5E9] dark:bg-[#134e2a] text-[#03C75A]">
                        {article.category}
                      </span>
                      <h3 className="text-[14px] font-medium text-[#080808] dark:text-[#E2E8F0] leading-snug group-hover:text-[#03C75A] transition-colors line-clamp-2 mb-1.5">
                        {article.title}
                      </h3>
                      <div className="flex items-center gap-2 text-[12px] text-[#888] dark:text-[#64748B]">
                        <span>{article.source}</span>
                        <span>|</span>
                        <span>{article.time}</span>
                      </div>
                    </div>
                    {/* Thumbnail placeholder */}
                    <div className="flex-shrink-0 w-[100px] h-[68px] rounded-lg bg-[#F0F1F3] dark:bg-[#334155] flex items-center justify-center">
                      <span className="text-[10px] text-[#BBB] dark:text-[#64748B]">
                        thumbnail
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 실시간 급상승 검색어 */}
            <section className="rounded-xl bg-white dark:bg-[#1E293B] border border-[#E5E8EB] dark:border-[#334155] overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-[#E5E8EB] dark:border-[#334155]">
                <h2 className="text-[15px] font-bold text-[#080808] dark:text-[#E2E8F0]">
                  실시간 급상승 검색어
                </h2>
                <span className="text-[12px] text-[#888] dark:text-[#64748B]">
                  2026.03.09 기준
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2">
                {trendingSearches.map((item) => (
                  <div
                    key={item.rank}
                    className="flex items-center gap-3 px-5 py-2.5 hover:bg-[#F8F9FA] dark:hover:bg-[#273548] transition-colors cursor-pointer border-b border-[#E5E8EB] dark:border-[#334155] last:border-b-0"
                  >
                    <span
                      className={`w-6 text-center text-[14px] font-bold ${
                        item.rank <= 3
                          ? "text-[#03C75A]"
                          : "text-[#888] dark:text-[#64748B]"
                      }`}
                    >
                      {item.rank}
                    </span>
                    <span className="flex-1 text-[13px] text-[#080808] dark:text-[#E2E8F0] truncate">
                      {item.keyword}
                    </span>
                    <span className="flex-shrink-0">
                      {item.change === "up" && <ArrowUpIcon />}
                      {item.change === "down" && <ArrowDownIcon />}
                      {item.change === "same" && <DashIcon />}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* ------------------------------------------------------ */}
          {/*  RIGHT COLUMN                                           */}
          {/* ------------------------------------------------------ */}
          <div className="w-full lg:w-[40%] space-y-5">
            {/* 로그인 영역 */}
            <section className="rounded-xl bg-white dark:bg-[#1E293B] border border-[#E5E8EB] dark:border-[#334155] overflow-hidden p-5">
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="아이디"
                  className="w-full px-4 py-2.5 rounded-lg border border-[#E5E8EB] dark:border-[#334155] bg-[#F8F9FA] dark:bg-[#0F172A] text-[14px] text-[#080808] dark:text-[#E2E8F0] placeholder:text-[#A0A0A0] dark:placeholder:text-[#64748B] outline-none focus:border-[#03C75A] transition-colors"
                />
                <input
                  type="password"
                  placeholder="비밀번호"
                  className="w-full px-4 py-2.5 rounded-lg border border-[#E5E8EB] dark:border-[#334155] bg-[#F8F9FA] dark:bg-[#0F172A] text-[14px] text-[#080808] dark:text-[#E2E8F0] placeholder:text-[#A0A0A0] dark:placeholder:text-[#64748B] outline-none focus:border-[#03C75A] transition-colors"
                />
                <button className="w-full py-2.5 rounded-lg bg-[#03C75A] text-white font-bold text-[14px] hover:bg-[#02b351] transition-colors cursor-pointer">
                  로그인
                </button>
                <div className="flex items-center justify-between text-[12px] text-[#888] dark:text-[#64748B] pt-1">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-3.5 h-3.5 accent-[#03C75A] cursor-pointer"
                    />
                    <span>로그인 상태 유지</span>
                  </label>
                  <div className="flex gap-2">
                    <span className="cursor-pointer hover:text-[#080808] dark:hover:text-[#E2E8F0] transition-colors">
                      아이디 찾기
                    </span>
                    <span>|</span>
                    <span className="cursor-pointer hover:text-[#080808] dark:hover:text-[#E2E8F0] transition-colors">
                      비밀번호 찾기
                    </span>
                  </div>
                </div>
                <div className="pt-2 border-t border-[#E5E8EB] dark:border-[#334155] mt-2">
                  <button className="w-full py-2 rounded-lg border border-[#E5E8EB] dark:border-[#334155] text-[13px] text-[#080808] dark:text-[#E2E8F0] hover:bg-[#F0F1F3] dark:hover:bg-[#334155] transition-colors cursor-pointer">
                    회원가입
                  </button>
                </div>
              </div>
            </section>

            {/* 날씨 */}
            <section className="rounded-xl bg-white dark:bg-[#1E293B] border border-[#E5E8EB] dark:border-[#334155] overflow-hidden">
              <div className="px-5 py-3 border-b border-[#E5E8EB] dark:border-[#334155]">
                <h2 className="text-[15px] font-bold text-[#080808] dark:text-[#E2E8F0]">
                  날씨
                </h2>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-[13px] text-[#888] dark:text-[#64748B] mb-1">
                      서울특별시
                    </p>
                    <p className="text-[36px] font-light text-[#080808] dark:text-[#E2E8F0] leading-none">
                      15<span className="text-[20px]">°C</span>
                    </p>
                  </div>
                  <SunIcon />
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-lg bg-[#F8F9FA] dark:bg-[#0F172A] py-2.5 px-2">
                    <p className="text-[11px] text-[#888] dark:text-[#64748B] mb-0.5">
                      체감온도
                    </p>
                    <p className="text-[14px] font-semibold text-[#080808] dark:text-[#E2E8F0]">
                      13°
                    </p>
                  </div>
                  <div className="rounded-lg bg-[#F8F9FA] dark:bg-[#0F172A] py-2.5 px-2">
                    <p className="text-[11px] text-[#888] dark:text-[#64748B] mb-0.5">
                      습도
                    </p>
                    <p className="text-[14px] font-semibold text-[#080808] dark:text-[#E2E8F0]">
                      45%
                    </p>
                  </div>
                  <div className="rounded-lg bg-[#F8F9FA] dark:bg-[#0F172A] py-2.5 px-2">
                    <p className="text-[11px] text-[#888] dark:text-[#64748B] mb-0.5">
                      풍속
                    </p>
                    <p className="text-[14px] font-semibold text-[#080808] dark:text-[#E2E8F0]">
                      2m/s
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-[#FFF8E1] dark:bg-[#3E2E0F]">
                  <span className="text-[12px]">
                    <span className="font-semibold text-[#F57C00]">
                      미세먼지
                    </span>{" "}
                    <span className="text-[#080808] dark:text-[#E2E8F0]">
                      보통
                    </span>
                  </span>
                  <span className="text-[#CCC] dark:text-[#555]">|</span>
                  <span className="text-[12px]">
                    <span className="font-semibold text-[#F57C00]">
                      초미세먼지
                    </span>{" "}
                    <span className="text-[#080808] dark:text-[#E2E8F0]">
                      좋음
                    </span>
                  </span>
                </div>
                {/* Hourly forecast */}
                <div className="mt-4 flex items-center justify-between text-center">
                  {[
                    { time: "오전 9시", temp: "12°" },
                    { time: "오후 12시", temp: "16°" },
                    { time: "오후 3시", temp: "17°" },
                    { time: "오후 6시", temp: "14°" },
                    { time: "오후 9시", temp: "11°" },
                  ].map((h) => (
                    <div key={h.time}>
                      <p className="text-[10px] text-[#888] dark:text-[#64748B] mb-1">
                        {h.time}
                      </p>
                      <p className="text-[13px] font-semibold text-[#080808] dark:text-[#E2E8F0]">
                        {h.temp}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 쇼핑 NOW */}
            <section className="rounded-xl bg-white dark:bg-[#1E293B] border border-[#E5E8EB] dark:border-[#334155] overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-[#E5E8EB] dark:border-[#334155]">
                <h2 className="text-[15px] font-bold text-[#080808] dark:text-[#E2E8F0]">
                  쇼핑 NOW
                </h2>
                <span className="text-[12px] text-[#888] dark:text-[#64748B] cursor-pointer hover:text-[#080808] dark:hover:text-[#E2E8F0] transition-colors">
                  더보기 &gt;
                </span>
              </div>
              <div className="divide-y divide-[#E5E8EB] dark:divide-[#334155]">
                {shoppingItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 px-5 py-3.5 hover:bg-[#F8F9FA] dark:hover:bg-[#273548] transition-colors cursor-pointer group"
                  >
                    {/* Product image placeholder */}
                    <div className="flex-shrink-0 w-[64px] h-[64px] rounded-lg bg-[#F0F1F3] dark:bg-[#334155] flex items-center justify-center">
                      <span className="text-[9px] text-[#BBB] dark:text-[#64748B]">
                        image
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] text-[#080808] dark:text-[#E2E8F0] truncate group-hover:text-[#03C75A] transition-colors mb-1">
                        {item.name}
                      </p>
                      <div className="flex items-center gap-2">
                        {item.discount && (
                          <span className="text-[14px] font-bold text-[#FF3D00]">
                            {item.discount}
                          </span>
                        )}
                        <span className="text-[14px] font-bold text-[#080808] dark:text-[#E2E8F0]">
                          {item.price}
                          <span className="text-[12px] font-normal">원</span>
                        </span>
                      </div>
                      {item.originalPrice && (
                        <p className="text-[11px] text-[#AAA] dark:text-[#555] line-through">
                          {item.originalPrice}원
                        </p>
                      )}
                      <p className="text-[11px] text-[#888] dark:text-[#64748B] mt-0.5">
                        {item.store}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 광고 배너 */}
            <section className="rounded-xl bg-gradient-to-r from-[#03C75A] to-[#00E676] overflow-hidden cursor-pointer hover:opacity-95 transition-opacity">
              <div className="px-5 py-6 text-center">
                <p className="text-[18px] font-bold text-white mb-1">
                  네이버플러스 멤버십
                </p>
                <p className="text-[13px] text-white/80 mb-3">
                  지금 가입하면 첫 달 무료!
                </p>
                <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-[12px] font-semibold hover:bg-white/30 transition-colors">
                  자세히 보기
                </span>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* ============================================================ */}
      {/*  FOOTER                                                       */}
      {/* ============================================================ */}
      <footer className="bg-white dark:bg-[#1E293B] border-t border-[#E5E8EB] dark:border-[#334155] mt-6">
        <div className="mx-auto max-w-[1130px] px-4 py-8">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mb-4">
            {footerLinks.map((link, idx) => (
              <span
                key={link}
                className={`text-[12px] cursor-pointer transition-colors ${
                  link === "개인정보처리방침"
                    ? "font-bold text-[#080808] dark:text-[#E2E8F0]"
                    : "text-[#888] dark:text-[#64748B] hover:text-[#080808] dark:hover:text-[#E2E8F0]"
                }`}
              >
                {link}
              </span>
            ))}
          </div>
          <div className="text-center">
            <span className="text-[20px] font-extrabold text-[#03C75A]">
              NAVER
            </span>
            <p className="text-[11px] text-[#AAA] dark:text-[#555] mt-2">
              Copyright &copy; NAVER Corp. All Rights Reserved.
            </p>
            <p className="text-[10px] text-[#CCC] dark:text-[#444] mt-1">
              이 페이지는 K-UI 데모 목적으로 제작되었으며, 실제 NAVER 서비스와
              무관합니다.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
