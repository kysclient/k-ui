"use client";

import React from "react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const steps = [
  { num: 1, label: "기본정보", status: "completed" },
  { num: 2, label: "소득입력", status: "completed" },
  { num: 3, label: "공제항목", status: "active" },
  { num: 4, label: "세액계산", status: "upcoming" },
  { num: 5, label: "신고완료", status: "upcoming" },
] as const;

const dependents = [
  { relation: "부", name: "홍아버지", age: 65 },
  { relation: "모", name: "김어머니", age: 62 },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function fmt(n: number): string {
  return n.toLocaleString("ko-KR");
}

/* ------------------------------------------------------------------ */
/*  Main page                                                          */
/* ------------------------------------------------------------------ */

export default function HomeTaxFilingTemplate() {
  /* -- form state -- */
  const [spouseDeduction, setSpouseDeduction] = React.useState(true);
  const [dependentCount, setDependentCount] = React.useState(2);

  const [healthInsurance, setHealthInsurance] = React.useState(1234000);
  const [employmentInsurance, setEmploymentInsurance] = React.useState(456000);
  const [guaranteeInsurance, setGuaranteeInsurance] = React.useState(890000);
  const insuranceSubtotal = healthInsurance + employmentInsurance + guaranteeInsurance;

  const [eduSelf, setEduSelf] = React.useState(0);
  const [eduChild, setEduChild] = React.useState(2400000);

  /* summary */
  const totalSalary = 48000000;
  const taxBase = 32450000;
  const calculatedTax = 3894000;
  const totalDeduction = insuranceSubtotal;
  const estimatedRefund = -(calculatedTax - totalDeduction - 686000 - (calculatedTax - totalDeduction - 686000));
  /* For the demo, hard-code the final display values */
  const refundAmount = -686000;

  return (
    <div
      className="min-h-screen flex flex-col bg-[#F1F5F9] dark:bg-[#0F172A] text-[#1E293B] dark:text-[#E2E8F0]"
      style={{
        fontFamily:
          "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif",
      }}
    >
      {/* ============================================================ */}
      {/*  HEADER                                                       */}
      {/* ============================================================ */}
      <header className="bg-white dark:bg-[#1E293B] border-b border-[#E2E8F0] dark:border-[#334155] sticky top-0 z-50">
        <div className="max-w-[1100px] mx-auto px-5 h-14 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#004098">
              <path d="M3 21V7l9-4 9 4v14h-7v-5h-4v5H3zm2-2h3v-5h8v5h3V8.2l-7-3.1L5 8.2V19z" />
            </svg>
            <span className="font-bold text-lg text-[#004098]">홈택스</span>
          </div>

          {/* Breadcrumb */}
          <nav className="text-[13px] text-[#94A3B8] dark:text-[#64748B] flex items-center gap-1.5">
            <span>홈</span>
            <span className="text-[10px]">{">"}</span>
            <span>세금신고</span>
            <span className="text-[10px]">{">"}</span>
            <span className="font-semibold text-[#004098]">종합소득세</span>
          </nav>

          {/* User */}
          <div className="flex items-center gap-3 text-[13px]">
            <span className="font-semibold text-[#334155] dark:text-[#CBD5E1]">홍길동</span>
            <button className="bg-transparent border-none text-[#94A3B8] text-xs cursor-pointer underline">
              로그아웃
            </button>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/*  PROGRESS STEPPER                                             */}
      {/* ============================================================ */}
      <div className="bg-white dark:bg-[#1E293B] border-b border-[#E2E8F0] dark:border-[#334155] pt-5 px-5 pb-6">
        <div className="max-w-[700px] mx-auto">
          <div className="flex items-start justify-between relative">
            {steps.map((step, i) => {
              const isCompleted = step.status === "completed";
              const isActive = step.status === "active";

              return (
                <React.Fragment key={step.num}>
                  {/* Connecting line (before this step, except first) */}
                  {i > 0 && (
                    <div
                      className={`flex-1 h-[3px] self-center rounded-sm ${
                        isCompleted || isActive
                          ? "bg-[#004098]"
                          : "bg-[#E2E8F0] dark:bg-[#334155]"
                      }`}
                      style={{
                        marginTop: 17,
                        transform: "translateY(-50%)",
                      }}
                    />
                  )}

                  {/* Step circle + label */}
                  <div className="flex flex-col items-center gap-1.5 min-w-[60px]">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${
                        isCompleted || isActive
                          ? "bg-[#004098] text-white"
                          : "bg-[#E2E8F0] dark:bg-[#334155] text-[#94A3B8]"
                      }`}
                      style={{
                        boxShadow: isActive ? "0 0 0 4px rgba(0,64,152,0.18)" : "none",
                      }}
                    >
                      {isCompleted ? (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path
                            d="M3 8.5L6.5 12L13 4"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        step.num
                      )}
                    </div>
                    <span
                      className={`text-xs ${
                        isActive
                          ? "font-bold text-[#004098] dark:text-[#E2E8F0]"
                          : "font-medium text-[#94A3B8]"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  MAIN CONTENT: Form + Sidebar                                 */}
      {/* ============================================================ */}
      <main className="flex-1 py-8 px-5 pb-12">
        <div className="max-w-[1100px] mx-auto flex gap-6 items-start flex-wrap">
          {/* ── Left: Form ── */}
          <div className="flex-[1_1_620px] min-w-0">
            {/* Step title */}
            <div className="flex items-center gap-2.5 mb-6">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#004098] text-white text-[13px] font-bold">
                3
              </span>
              <h1 className="text-[22px] font-bold m-0">공제항목 입력</h1>
            </div>

            {/* ── Section 1: 인적공제 ── */}
            <div className="bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-xl p-6 mb-5">
              <h2 className="text-base font-bold mb-5 text-[#0F172A] dark:text-[#F8FAFC]">
                인적공제
              </h2>

              {/* 본인 (readonly) */}
              <div className="mb-4">
                <label className="block text-[13px] font-medium text-[#64748B] dark:text-[#94A3B8] mb-1.5">
                  본인
                </label>
                <input
                  type="text"
                  readOnly
                  value="1,500,000원"
                  className="w-full h-[42px] px-3 rounded-lg border border-[#E2E8F0] dark:border-[#334155] bg-[#F1F5F9] dark:bg-[#1a2236] text-sm font-semibold text-[#64748B] dark:text-[#64748B] outline-none box-border"
                />
              </div>

              {/* 배우자 toggle */}
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <label className="text-[13px] font-medium text-[#64748B] dark:text-[#94A3B8]">
                    배우자 공제
                  </label>
                  <button
                    onClick={() => setSpouseDeduction(!spouseDeduction)}
                    className={`relative w-12 h-[26px] rounded-[13px] border-none cursor-pointer transition-colors duration-200 ${
                      spouseDeduction
                        ? "bg-[#004098]"
                        : "bg-[#CBD5E1] dark:bg-[#475569]"
                    }`}
                  >
                    <span
                      className="absolute top-[3px] w-5 h-5 rounded-full bg-white transition-[left] duration-200 shadow-[0_1px_3px_rgba(0,0,0,0.15)]"
                      style={{ left: spouseDeduction ? 24 : 3 }}
                    />
                  </button>
                </div>
                <span className="text-xs text-[#94A3B8] dark:text-[#94A3B8] mt-1 block">
                  {spouseDeduction ? "공제 적용 중 (1,500,000원)" : "미적용"}
                </span>
              </div>

              {/* 부양가족 */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-[13px] font-medium text-[#64748B] dark:text-[#94A3B8]">
                    부양가족
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setDependentCount(Math.max(0, dependentCount - 1))}
                      className="w-[30px] h-[30px] rounded-lg border border-[#E2E8F0] dark:border-[#475569] bg-[#F8FAFC] dark:bg-[#0F172A] text-lg font-semibold cursor-pointer flex items-center justify-center text-[#334155] dark:text-[#CBD5E1] hover:bg-[#E2E8F0] dark:hover:bg-[#1E293B] transition-colors"
                    >
                      −
                    </button>
                    <span className="text-[15px] font-bold min-w-[32px] text-center">
                      {dependentCount}명
                    </span>
                    <button
                      onClick={() => setDependentCount(dependentCount + 1)}
                      className="w-[30px] h-[30px] rounded-lg border border-[#E2E8F0] dark:border-[#475569] bg-[#F8FAFC] dark:bg-[#0F172A] text-lg font-semibold cursor-pointer flex items-center justify-center text-[#334155] dark:text-[#CBD5E1] hover:bg-[#E2E8F0] dark:hover:bg-[#1E293B] transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Dependent detail rows */}
                {dependents.slice(0, dependentCount).map((dep, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between py-2.5 px-3.5 rounded-lg border border-[#E2E8F0] dark:border-[#334155] bg-[#F8FAFC] dark:bg-[#0F172A] text-[13px] ${
                      i < dependentCount - 1 ? "mb-2" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#E8F0FE] dark:bg-[#004098]/20 text-[#004098] dark:text-[#9EBEF4] text-[11px] font-bold">
                        {dep.relation}
                      </span>
                      <span className="font-semibold">{dep.name}</span>
                    </div>
                    <span className="text-[#94A3B8] text-xs">
                      {dep.age}세
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Section 2: 보험료 공제 ── */}
            <div className="bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-xl p-6 mb-5">
              <h2 className="text-base font-bold mb-5 text-[#0F172A] dark:text-[#F8FAFC]">
                보험료 공제
              </h2>

              {[
                { label: "국민건강보험", value: healthInsurance, setter: setHealthInsurance },
                { label: "고용보험", value: employmentInsurance, setter: setEmploymentInsurance },
                { label: "보장성보험", value: guaranteeInsurance, setter: setGuaranteeInsurance },
              ].map((field) => (
                <div key={field.label} className="mb-4">
                  <label className="block text-[13px] font-medium text-[#64748B] dark:text-[#94A3B8] mb-1.5">
                    {field.label}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={fmt(field.value)}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/[^0-9]/g, "");
                        field.setter(raw ? parseInt(raw, 10) : 0);
                      }}
                      className="w-full h-[42px] pl-3 pr-9 rounded-lg border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#0F172A] text-sm font-medium text-[#1E293B] dark:text-[#E2E8F0] outline-none box-border transition-colors duration-150 focus:border-[#004098] dark:focus:border-[#004098]"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[13px] text-[#94A3B8] pointer-events-none">
                      원
                    </span>
                  </div>
                </div>
              ))}

              {/* Subtotal */}
              <div className="flex items-center justify-between py-3 px-3.5 rounded-lg bg-[#F1F5F9] dark:bg-[#0F172A] mt-1">
                <span className="text-[13px] font-semibold">소계</span>
                <span className="text-[15px] font-bold text-[#004098]">
                  {fmt(insuranceSubtotal)}원
                </span>
              </div>
            </div>

            {/* ── Section 3: 교육비 공제 ── */}
            <div className="bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-xl p-6 mb-5">
              <h2 className="text-base font-bold mb-5 text-[#0F172A] dark:text-[#F8FAFC]">
                교육비 공제
              </h2>

              {[
                { label: "본인", value: eduSelf, setter: setEduSelf },
                { label: "자녀", value: eduChild, setter: setEduChild },
              ].map((field, idx) => (
                <div key={field.label} className={idx === 0 ? "mb-4" : ""}>
                  <label className="block text-[13px] font-medium text-[#64748B] dark:text-[#94A3B8] mb-1.5">
                    {field.label}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={fmt(field.value)}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/[^0-9]/g, "");
                        field.setter(raw ? parseInt(raw, 10) : 0);
                      }}
                      className="w-full h-[42px] pl-3 pr-9 rounded-lg border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#0F172A] text-sm font-medium text-[#1E293B] dark:text-[#E2E8F0] outline-none box-border transition-colors duration-150 focus:border-[#004098] dark:focus:border-[#004098]"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[13px] text-[#94A3B8] pointer-events-none">
                      원
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Sticky Summary Sidebar ── */}
          <div className="flex-[0_0_340px] sticky top-20 self-start">
            <div className="bg-white dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#334155] rounded-xl p-6">
              <h3 className="text-[15px] font-bold mb-5 text-[#0F172A] dark:text-[#F8FAFC] flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="1" y="1" width="16" height="16" rx="3" stroke="#004098" strokeWidth="1.5" />
                  <path d="M5 6h8M5 9h8M5 12h5" stroke="#004098" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                세액 요약
              </h3>

              {/* Summary rows */}
              {[
                { label: "총급여", value: totalSalary },
                { label: "과세표준", value: taxBase },
                { label: "산출세액", value: calculatedTax },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex justify-between items-center mb-3 text-[13px]"
                >
                  <span className="text-[#64748B] dark:text-[#94A3B8]">{row.label}</span>
                  <span className="font-semibold text-[#1E293B] dark:text-[#CBD5E1]">
                    {fmt(row.value)}원
                  </span>
                </div>
              ))}

              {/* Deduction total (green negative) */}
              <div className="flex justify-between items-center mb-3 text-[13px]">
                <span className="text-[#64748B] dark:text-[#94A3B8]">공제합계</span>
                <span className="font-semibold text-[#16A34A]">
                  -{fmt(totalDeduction)}원
                </span>
              </div>

              {/* Divider */}
              <div className="border-t border-[#E2E8F0] dark:border-[#334155] my-4" />

              {/* Refund estimate */}
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold">납부/환급 예상</span>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-extrabold text-[#16A34A]">
                    {fmt(Math.abs(refundAmount))}원
                  </span>
                  <span className="inline-block px-2 py-0.5 rounded-md bg-[#DCFCE7] dark:bg-[#16A34A]/20 text-[#15803D] dark:text-[#4ADE80] text-[11px] font-bold">
                    환급
                  </span>
                </div>
              </div>

              {/* Info note */}
              <p className="text-[11px] text-[#94A3B8] mt-4 leading-relaxed">
                * 위 금액은 현재 입력 기준 예상 금액이며,
                <br />
                최종 세액은 신고 완료 후 확정됩니다.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* ============================================================ */}
      {/*  BOTTOM NAVIGATION                                            */}
      {/* ============================================================ */}
      <div className="bg-white dark:bg-[#1E293B] border-t border-[#E2E8F0] dark:border-[#334155] py-4 px-5">
        <div className="max-w-[1100px] mx-auto flex justify-between items-center">
          <button className="h-11 px-7 rounded-[10px] border border-[#CBD5E1] dark:border-[#475569] bg-transparent text-[#475569] dark:text-[#CBD5E1] text-sm font-semibold cursor-pointer transition-colors hover:bg-[#F1F5F9] dark:hover:bg-[#334155]">
            ← 이전 단계
          </button>
          <button className="h-11 px-8 rounded-[10px] border-none bg-[#004098] hover:bg-[#003070] text-white text-sm font-semibold cursor-pointer transition-colors">
            다음 단계 →
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/*  FOOTER                                                       */}
      {/* ============================================================ */}
      <footer className="bg-[#F1F5F9] dark:bg-[#0B1120] py-5 text-center text-xs text-[#94A3B8] dark:text-[#64748B] leading-[1.8]">
        <div>국세청 홈택스 | 고객센터 126</div>
        <div className="mt-1 text-[11px] text-[#CBD5E1] dark:text-[#475569]">
          이 페이지는 K-UI 컴포넌트 라이브러리 데모용 템플릿입니다. 실제 국세청 홈택스 서비스가 아닙니다.
        </div>
      </footer>
    </div>
  );
}
