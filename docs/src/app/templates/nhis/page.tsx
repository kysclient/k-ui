"use client";

import React from "react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const sidebarMenu = [
  { label: "대시보드", icon: "dashboard", active: true },
  { label: "자격/보험료", icon: "card", active: false },
  { label: "진료비/급여", icon: "receipt", active: false },
  { label: "건강검진", icon: "checkup", active: false },
  { label: "증명서 발급", icon: "cert", active: false },
  { label: "민원신청", icon: "request", active: false },
  { label: "알림", icon: "bell", active: false },
  { label: "설정", icon: "settings", active: false },
];

const recentVisits = [
  { date: "2026-03-05", hospital: "서울대학교병원", dept: "내과", amount: "45,200" },
  { date: "2026-02-20", hospital: "연세세브란스병원", dept: "정형외과", amount: "128,000" },
  { date: "2026-02-11", hospital: "삼성서울병원", dept: "피부과", amount: "32,500" },
  { date: "2026-01-28", hospital: "서울아산병원", dept: "이비인후과", amount: "67,800" },
  { date: "2026-01-15", hospital: "강남성모병원", dept: "안과", amount: "69,300" },
];

const healthResults = [
  { label: "혈압", status: "정상", pct: 72, color: "#22C55E" },
  { label: "혈당", status: "주의", pct: 58, color: "#F59E0B" },
  { label: "콜레스테롤", status: "정상", pct: 68, color: "#22C55E" },
  { label: "BMI", status: "과체중", pct: 82, color: "#EF4444" },
];

const notifications = [
  { time: "1시간 전", text: "2026년 3월 건강보험료 고지서가 발행되었습니다." },
  { time: "2일 전", text: "건강검진 사전문진표 작성이 필요합니다." },
  { time: "5일 전", text: "2월 진료비 확인서가 발급 가능합니다." },
];

/* ------------------------------------------------------------------ */
/*  SVG icon components                                                */
/* ------------------------------------------------------------------ */

function IconDashboard() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function IconCard() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
    </svg>
  );
}

function IconReceipt() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 2v20l3-2 3 2 3-2 3 2 3-2 3 2V2l-3 2-3-2-3 2-3-2-3 2-3-2z" />
      <path d="M8 10h8M8 14h5" />
    </svg>
  );
}

function IconCheckup() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
      <path d="M12 8v4l3 3" />
    </svg>
  );
}

function IconCert() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}

function IconRequest() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function IconBell() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  );
}

function IconSettings() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

const iconMap: Record<string, React.ReactNode> = {
  dashboard: <IconDashboard />,
  card: <IconCard />,
  receipt: <IconReceipt />,
  checkup: <IconCheckup />,
  cert: <IconCert />,
  request: <IconRequest />,
  bell: <IconBell />,
  settings: <IconSettings />,
};

/* ------------------------------------------------------------------ */
/*  Main page component                                                */
/* ------------------------------------------------------------------ */

export default function NhisTemplate() {
  const [activeMenu, setActiveMenu] = React.useState("대시보드");

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F4F6] dark:bg-[#0F172A] text-[#374151] dark:text-[#CBD5E1] font-[Pretendard,'Apple_SD_Gothic_Neo',sans-serif]">
      {/* ── Top bar ── */}
      <div className="h-10 bg-[#1E293B] dark:bg-[#0B0F19] border-b border-[#334155] dark:border-[#1C2333] flex items-center justify-between px-6 text-[13px] text-[#CBD5E1] dark:text-[#A0AEC0] shrink-0">
        <span className="font-bold tracking-tight">국민건강보험공단</span>
        <div className="flex items-center gap-4">
          <span>홍길동님</span>
          <button className="bg-transparent border border-[#475569] dark:border-[#374151] text-[#CBD5E1] dark:text-[#A0AEC0] rounded px-2.5 py-0.5 text-xs cursor-pointer">
            로그아웃
          </button>
        </div>
      </div>

      {/* ── Body: Sidebar + Main ── */}
      <div className="flex flex-1 min-h-0">
        {/* ── Sidebar ── */}
        <aside className="w-60 shrink-0 bg-white dark:bg-[#111827] border-r border-[#E5E7EB] dark:border-[#1F2937] flex flex-col justify-between">
          <div>
            {/* Logo */}
            <div className="pt-6 pb-5 px-5 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#059669] flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M9 2h6v6h6v6h-6v8H9v-8H3V8h6V2z" />
                </svg>
              </div>
              <span className="font-extrabold text-base text-[#111827] dark:text-[#F1F5F9] tracking-tight">건강보험</span>
            </div>

            {/* Nav */}
            <nav className="px-2">
              {sidebarMenu.map((item) => {
                const isActive = activeMenu === item.label;
                return (
                  <button
                    key={item.label}
                    onClick={() => setActiveMenu(item.label)}
                    className={`flex items-center gap-2.5 w-full py-2.5 px-3 mb-0.5 border-none rounded-md text-sm text-left cursor-pointer transition-all ${
                      isActive
                        ? "border-l-[3px] border-l-[#059669] bg-[#059669]/[0.08] dark:bg-[#059669]/10 text-[#059669] dark:text-[#34D399] font-semibold"
                        : "border-l-[3px] border-l-transparent text-[#6B7280] dark:text-[#9CA3AF] font-normal hover:bg-[#F3F4F6] dark:hover:bg-[#1F2937]"
                    }`}
                  >
                    <span className="flex items-center">{iconMap[item.icon]}</span>
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom: Customer center */}
          <div className="py-4 px-5 border-t border-[#E5E7EB] dark:border-[#1F2937] text-xs text-[#9CA3AF] dark:text-[#64748B]">
            <div className="flex items-center gap-1.5 mb-1">
              <IconPhone />
              <span className="font-semibold">고객센터</span>
            </div>
            <div className="text-lg font-extrabold text-[#111827] dark:text-[#F1F5F9] tracking-tight">1577-1000</div>
            <div className="mt-1 leading-relaxed">평일 09:00 ~ 18:00</div>
          </div>
        </aside>

        {/* ── Main content ── */}
        <main className="flex-1 overflow-auto p-8">
          {/* Welcome banner */}
          <div className="bg-gradient-to-br from-[#ECFDF5] to-[#D1FAE5] dark:from-[#064E3B] dark:to-[#065F46] rounded-xl py-6 px-7 mb-6 border border-[#A7F3D0] dark:border-[#065F46]">
            <div className="text-xl font-bold text-[#065F46] dark:text-[#D1FAE5] mb-1.5">
              홍길동님, 오늘도 건강한 하루 보내세요.
            </div>
            <div className="text-[13px] text-[#047857] dark:text-[#6EE7B7] opacity-80">
              마지막 접속: 2026-03-07 14:23
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {/* 건강보험료 */}
            <div className="bg-[#EFF6FF] dark:bg-[#1E3A5F] border border-[#BFDBFE] dark:border-[#1E40AF] rounded-[10px] py-5 px-[18px]">
              <div className="text-xs text-[#2563EB] dark:text-[#3B82F6] font-semibold mb-2">건강보험료 (이번 달)</div>
              <div className="text-2xl font-extrabold text-[#2563EB] dark:text-[#3B82F6] tracking-tight">124,500원</div>
            </div>

            {/* 납부 상태 */}
            <div className="bg-[#F0FDF4] dark:bg-[#14532D] border border-[#BBF7D0] dark:border-[#166534] rounded-[10px] py-5 px-[18px]">
              <div className="text-xs text-[#16A34A] dark:text-[#22C55E] font-semibold mb-2">납부 상태</div>
              <div className="flex items-center gap-2">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="stroke-[#16A34A] dark:stroke-[#22C55E]" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-xl font-extrabold text-[#16A34A] dark:text-[#22C55E]">정상 납부</span>
              </div>
            </div>

            {/* 올해 진료비 */}
            <div className="bg-[#F9FAFB] dark:bg-[#1E293B] border border-[#E5E7EB] dark:border-[#334155] rounded-[10px] py-5 px-[18px]">
              <div className="text-xs text-[#9CA3AF] dark:text-[#64748B] font-semibold mb-2">올해 진료비</div>
              <div className="text-2xl font-extrabold text-[#111827] dark:text-[#F1F5F9] tracking-tight">342,800원</div>
            </div>

            {/* 건강검진 */}
            <div className="bg-[#FFFBEB] dark:bg-[#78350F] border border-[#FDE68A] dark:border-[#92400E] rounded-[10px] py-5 px-[18px]">
              <div className="text-xs text-[#D97706] dark:text-[#F59E0B] font-semibold mb-2">건강검진</div>
              <div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="stroke-[#D97706] dark:stroke-[#F59E0B]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span className="text-xl font-extrabold text-[#D97706] dark:text-[#F59E0B]">D-23일</span>
              </div>
            </div>
          </div>

          {/* 2-column: Table + Health results */}
          <div className="grid grid-cols-2 gap-5 mb-6">
            {/* 최근 진료 내역 */}
            <div className="bg-white dark:bg-[#1E293B] border border-[#E5E7EB] dark:border-[#334155] rounded-[10px] py-5 px-[22px]">
              <div className="text-[15px] font-bold text-[#111827] dark:text-[#F1F5F9] mb-4">최근 진료 내역</div>
              <table className="w-full border-collapse text-[13px]">
                <thead>
                  <tr className="border-b-2 border-[#E5E7EB] dark:border-[#334155]">
                    {["날짜", "병원명", "진료과", "금액"].map((h) => (
                      <th
                        key={h}
                        className="text-left py-2 px-1.5 font-semibold text-[#9CA3AF] dark:text-[#64748B] text-xs"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentVisits.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-[#E5E7EB] dark:border-[#334155] hover:bg-[#F9FAFB] dark:hover:bg-[#253348]"
                    >
                      <td className="py-2.5 px-1.5 text-[#9CA3AF] dark:text-[#64748B]">{row.date}</td>
                      <td className="py-2.5 px-1.5 font-medium text-[#111827] dark:text-[#F1F5F9]">{row.hospital}</td>
                      <td className="py-2.5 px-1.5 text-[#374151] dark:text-[#CBD5E1]">{row.dept}</td>
                      <td className="py-2.5 px-1.5 font-semibold text-[#111827] dark:text-[#F1F5F9] text-right">{row.amount}원</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 건강검진 결과 요약 */}
            <div className="bg-white dark:bg-[#1E293B] border border-[#E5E7EB] dark:border-[#334155] rounded-[10px] py-5 px-[22px]">
              <div className="text-[15px] font-bold text-[#111827] dark:text-[#F1F5F9] mb-4">건강검진 결과 요약</div>
              <div className="flex flex-col gap-4">
                {healthResults.map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-[13px] font-medium text-[#111827] dark:text-[#F1F5F9]">{item.label}</span>
                      <span
                        className="text-xs font-semibold rounded px-2 py-0.5"
                        style={{
                          color: item.color,
                          background: `${item.color}18`,
                        }}
                      >
                        {item.status}
                      </span>
                    </div>
                    <div className="w-full h-2 rounded bg-[#E5E7EB] dark:bg-[#374151] overflow-hidden">
                      <div
                        className="h-full rounded transition-[width] duration-[600ms] ease-out"
                        style={{
                          width: `${item.pct}%`,
                          background: item.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white dark:bg-[#1E293B] border border-[#E5E7EB] dark:border-[#334155] rounded-[10px] py-5 px-[22px] mb-6">
            <div className="text-[15px] font-bold text-[#111827] dark:text-[#F1F5F9] mb-3.5">알림</div>
            <div className="flex flex-col">
              {notifications.map((n, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 py-3 ${
                    i < notifications.length - 1 ? "border-b border-[#E5E7EB] dark:border-[#334155]" : ""
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      i === 0
                        ? "bg-[#059669] opacity-100"
                        : "bg-[#9CA3AF] dark:bg-[#64748B] opacity-50"
                    }`}
                  />
                  <span className="flex-1 text-[13px] text-[#374151] dark:text-[#CBD5E1]">{n.text}</span>
                  <span className="text-xs text-[#9CA3AF] dark:text-[#64748B] shrink-0">{n.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="text-center py-4 text-xs text-[#6B7280] dark:text-[#475569]">
            이 페이지는 K-UI 컴포넌트 라이브러리 데모용 템플릿입니다.
          </div>
        </main>
      </div>
    </div>
  );
}
