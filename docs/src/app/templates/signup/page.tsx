"use client";

import type { FormEvent } from "react";
import { useState, useCallback, useMemo } from "react";

/* ------------------------------------------------------------------ */
/*  SVG Icon helpers (inline, no external deps)                        */
/* ------------------------------------------------------------------ */

function EyeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Validation helpers                                                 */
/* ------------------------------------------------------------------ */

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function getPasswordStrength(pw: string): {
  score: number;
  label: string;
  color: string;
  bgColor: string;
} {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;

  if (score <= 1)
    return {
      score: 1,
      label: "약함",
      color: "text-[#DC2626]",
      bgColor: "bg-[#DC2626]",
    };
  if (score <= 3)
    return {
      score: 2,
      label: "보통",
      color: "text-[#CA8A04]",
      bgColor: "bg-[#CA8A04]",
    };
  return {
    score: 3,
    label: "강함",
    color: "text-[#16A34A]",
    bgColor: "bg-[#16A34A]",
  };
}

function generateYears() {
  const current = new Date().getFullYear();
  const years: number[] = [];
  for (let y = current; y >= current - 100; y--) years.push(y);
  return years;
}

function generateMonths() {
  return Array.from({ length: 12 }, (_, i) => i + 1);
}

function generateDays() {
  return Array.from({ length: 31 }, (_, i) => i + 1);
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function SignupPage() {
  /* --- Field state --- */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");

  /* --- UI state --- */
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [phoneSent, setPhoneSent] = useState(false);

  /* --- Touched state (show errors after blur) --- */
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const markTouched = useCallback(
    (field: string) => setTouched((p) => ({ ...p, [field]: true })),
    []
  );

  /* --- Agreement state --- */
  const [agreeService, setAgreeService] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);

  const allAgreed = agreeService && agreePrivacy && agreeMarketing;

  function handleToggleAll() {
    const next = !allAgreed;
    setAgreeService(next);
    setAgreePrivacy(next);
    setAgreeMarketing(next);
  }

  /* --- Success modal --- */
  const [showSuccess, setShowSuccess] = useState(false);

  /* --- Validation --- */
  const emailError =
    touched.email && email.length > 0 && !isValidEmail(email)
      ? "올바른 이메일 형식을 입력해주세요."
      : "";

  const passwordStrength = useMemo(
    () => (password.length > 0 ? getPasswordStrength(password) : null),
    [password]
  );

  const passwordConfirmMatch =
    passwordConfirm.length > 0 && password === passwordConfirm;
  const passwordConfirmError =
    touched.passwordConfirm &&
    passwordConfirm.length > 0 &&
    password !== passwordConfirm;

  const canSubmit =
    isValidEmail(email) &&
    password.length >= 8 &&
    password === passwordConfirm &&
    name.trim().length > 0 &&
    phone.trim().length > 0 &&
    agreeService &&
    agreePrivacy;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setShowSuccess(true);
  }

  /* --- Shared styles --- */
  const inputBase =
    "w-full rounded-lg border px-4 py-3 text-sm outline-none transition-colors " +
    "bg-white dark:bg-gray-900 " +
    "border-gray-300 dark:border-gray-600 " +
    "text-gray-900 dark:text-gray-100 " +
    "placeholder-gray-400 dark:placeholder-gray-500 " +
    "focus:border-[#004098] focus:ring-2 focus:ring-[#004098]/20 " +
    "dark:focus:border-[#3B82F6] dark:focus:ring-[#3B82F6]/20";

  const inputError =
    "border-[#DC2626] dark:border-[#DC2626] focus:border-[#DC2626] focus:ring-[#DC2626]/20 dark:focus:border-[#DC2626] dark:focus:ring-[#DC2626]/20";

  const labelClass =
    "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5";

  /* ---------------------------------------------------------------- */
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      {/* ---- Header ---- */}
      <header className="w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <a
            href="/templates/signup"
            className="text-xl font-bold tracking-tight text-[#004098] dark:text-[#3B82F6]"
          >
            K-UI
          </a>
          <a
            href="#"
            className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-[#004098] dark:hover:text-[#3B82F6] transition-colors"
          >
            로그인
          </a>
        </div>
      </header>

      {/* ---- Main ---- */}
      <main className="flex flex-1 items-start justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Title */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              회원가입
            </h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              K-UI에 오신 것을 환영합니다
            </p>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#FEE500] px-4 py-3 text-sm font-medium text-gray-900 transition-opacity hover:opacity-90"
            >
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path
                  d="M9 1C4.58 1 1 3.87 1 7.4c0 2.25 1.49 4.24 3.74 5.37l-.95 3.5a.26.26 0 0 0 .4.28l4.05-2.68c.25.03.5.04.76.04 4.42 0 8-2.87 8-6.41C17 3.87 13.42 1 9 1"
                  fill="#3C1E1E"
                />
              </svg>
              카카오로 시작하기
            </button>

            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#03C75A] px-4 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path
                  d="M9 1.5A7.5 7.5 0 0 0 1.5 9 7.5 7.5 0 0 0 9 16.5 7.5 7.5 0 0 0 16.5 9 7.5 7.5 0 0 0 9 1.5zm-2.04 4.2h1.32v5.1H9.6l-.01 1.2H5.64V10.8h1.32V5.7zm3.48 0h1.38l1.62 3.54V5.7h1.32v6.3h-1.38L11.76 8.46V12h-1.32V5.7z"
                  fill="#fff"
                />
              </svg>
              네이버로 시작하기
            </button>

            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path
                  d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
                  fill="#4285F4"
                />
                <path
                  d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
                  fill="#34A853"
                />
                <path
                  d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.997 8.997 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
                  fill="#FBBC05"
                />
                <path
                  d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
                  fill="#EA4335"
                />
              </svg>
              Google로 시작하기
            </button>
          </div>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
            <span className="text-xs font-medium text-gray-400 dark:text-gray-500">
              또는
            </span>
            <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className={labelClass}>
                이메일
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                  <MailIcon />
                </span>
                <input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => markTouched("email")}
                  className={`${inputBase} pl-10 ${emailError ? inputError : ""}`}
                />
              </div>
              {emailError && (
                <p className="mt-1.5 text-xs text-[#DC2626]">{emailError}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className={labelClass}>
                비밀번호
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="8자 이상, 영문/숫자/특수문자 포함"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => markTouched("password")}
                  className={`${inputBase} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {/* Strength indicator */}
              {passwordStrength && (
                <div className="mt-2">
                  <div className="flex gap-1.5">
                    {[1, 2, 3].map((level) => (
                      <div
                        key={level}
                        className={`h-1.5 flex-1 rounded-full transition-colors ${
                          passwordStrength.score >= level
                            ? passwordStrength.bgColor
                            : "bg-gray-200 dark:bg-gray-700"
                        }`}
                      />
                    ))}
                  </div>
                  <p className={`mt-1 text-xs ${passwordStrength.color}`}>
                    비밀번호 강도: {passwordStrength.label}
                  </p>
                </div>
              )}
            </div>

            {/* Password Confirm */}
            <div>
              <label htmlFor="passwordConfirm" className={labelClass}>
                비밀번호 확인
              </label>
              <div className="relative">
                <input
                  id="passwordConfirm"
                  type={showPasswordConfirm ? "text" : "password"}
                  placeholder="비밀번호를 다시 입력해주세요"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  onBlur={() => markTouched("passwordConfirm")}
                  className={`${inputBase} pr-20 ${passwordConfirmError ? inputError : ""}`}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                  {passwordConfirm.length > 0 &&
                    (passwordConfirmMatch ? (
                      <CheckIcon className="text-[#16A34A]" />
                    ) : (
                      <XIcon className="text-[#DC2626]" />
                    ))}
                  <button
                    type="button"
                    onClick={() => setShowPasswordConfirm((p) => !p)}
                    className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    aria-label={
                      showPasswordConfirm
                        ? "비밀번호 숨기기"
                        : "비밀번호 보기"
                    }
                  >
                    {showPasswordConfirm ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>
              {passwordConfirmError && (
                <p className="mt-1.5 text-xs text-[#DC2626]">
                  비밀번호가 일치하지 않습니다.
                </p>
              )}
            </div>

            {/* Name */}
            <div>
              <label htmlFor="name" className={labelClass}>
                이름
              </label>
              <input
                id="name"
                type="text"
                placeholder="홍길동"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => markTouched("name")}
                className={inputBase}
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className={labelClass}>
                휴대폰 번호
              </label>
              <div className="flex gap-2">
                <input
                  id="phone"
                  type="tel"
                  placeholder="01012345678"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/[^0-9]/g, ""))
                  }
                  onBlur={() => markTouched("phone")}
                  className={`${inputBase} flex-1`}
                />
                <button
                  type="button"
                  onClick={() => setPhoneSent(true)}
                  disabled={phone.length < 10}
                  className="shrink-0 rounded-lg border border-[#004098] dark:border-[#3B82F6] px-4 py-3 text-sm font-medium text-[#004098] dark:text-[#3B82F6] transition-colors hover:bg-[#004098]/5 dark:hover:bg-[#3B82F6]/10 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {phoneSent ? "재발송" : "인증번호 발송"}
                </button>
              </div>
              {phoneSent && (
                <p className="mt-1.5 text-xs text-[#16A34A]">
                  인증번호가 발송되었습니다.
                </p>
              )}
            </div>

            {/* Birth Date */}
            <div>
              <label className={labelClass}>생년월일</label>
              <div className="grid grid-cols-3 gap-2">
                <select
                  value={birthYear}
                  onChange={(e) => setBirthYear(e.target.value)}
                  className={`${inputBase} appearance-none`}
                >
                  <option value="">년</option>
                  {generateYears().map((y) => (
                    <option key={y} value={y}>
                      {y}년
                    </option>
                  ))}
                </select>
                <select
                  value={birthMonth}
                  onChange={(e) => setBirthMonth(e.target.value)}
                  className={`${inputBase} appearance-none`}
                >
                  <option value="">월</option>
                  {generateMonths().map((m) => (
                    <option key={m} value={m}>
                      {m}월
                    </option>
                  ))}
                </select>
                <select
                  value={birthDay}
                  onChange={(e) => setBirthDay(e.target.value)}
                  className={`${inputBase} appearance-none`}
                >
                  <option value="">일</option>
                  {generateDays().map((d) => (
                    <option key={d} value={d}>
                      {d}일
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Agreements */}
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
              {/* Toggle All */}
              <label className="flex cursor-pointer items-center gap-3 pb-3 border-b border-gray-200 dark:border-gray-700">
                <input
                  type="checkbox"
                  checked={allAgreed}
                  onChange={handleToggleAll}
                  className="h-5 w-5 rounded border-gray-300 dark:border-gray-600 text-[#004098] dark:text-[#3B82F6] focus:ring-[#004098] dark:focus:ring-[#3B82F6] accent-[#004098] dark:accent-[#3B82F6]"
                />
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  전체 동의
                </span>
              </label>

              <div className="mt-3 space-y-3">
                {/* Service */}
                <div className="flex items-center justify-between">
                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={agreeService}
                      onChange={(e) => setAgreeService(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-[#004098] dark:text-[#3B82F6] accent-[#004098] dark:accent-[#3B82F6]"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      <span className="font-medium text-[#004098] dark:text-[#3B82F6]">
                        [필수]
                      </span>{" "}
                      서비스 이용약관 동의
                    </span>
                  </label>
                  <a
                    href="#"
                    className="text-xs text-gray-400 dark:text-gray-500 underline hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    보기
                  </a>
                </div>

                {/* Privacy */}
                <div className="flex items-center justify-between">
                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={agreePrivacy}
                      onChange={(e) => setAgreePrivacy(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-[#004098] dark:text-[#3B82F6] accent-[#004098] dark:accent-[#3B82F6]"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      <span className="font-medium text-[#004098] dark:text-[#3B82F6]">
                        [필수]
                      </span>{" "}
                      개인정보 수집 및 이용 동의
                    </span>
                  </label>
                  <a
                    href="#"
                    className="text-xs text-gray-400 dark:text-gray-500 underline hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    보기
                  </a>
                </div>

                {/* Marketing */}
                <div className="flex items-center justify-between">
                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={agreeMarketing}
                      onChange={(e) => setAgreeMarketing(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-[#004098] dark:text-[#3B82F6] accent-[#004098] dark:accent-[#3B82F6]"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      <span className="text-gray-400 dark:text-gray-500">
                        [선택]
                      </span>{" "}
                      마케팅 정보 수신 동의
                    </span>
                  </label>
                  <a
                    href="#"
                    className="text-xs text-gray-400 dark:text-gray-500 underline hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    보기
                  </a>
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full rounded-lg bg-[#004098] dark:bg-[#3B82F6] px-4 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#003080] dark:hover:bg-[#2563EB] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              가입하기
            </button>
          </form>

          {/* Bottom link */}
          <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            이미 계정이 있으신가요?{" "}
            <a
              href="#"
              className="font-medium text-[#004098] dark:text-[#3B82F6] hover:underline"
            >
              로그인
            </a>
          </p>
        </div>
      </main>

      {/* ---- Footer ---- */}
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 py-6">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            &copy; {new Date().getFullYear()} K-UI. All rights reserved.
          </p>
          <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
            이 페이지는 K-UI 컴포넌트 데모용 템플릿입니다.
          </p>
        </div>
      </footer>

      {/* ---- Success Modal ---- */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-gray-900 p-8 text-center shadow-2xl">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#16A34A]/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#16A34A"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              가입 완료!
            </h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              K-UI에 가입해주셔서 감사합니다.
              <br />
              이메일 인증 후 서비스를 이용하실 수 있습니다.
            </p>
            <button
              type="button"
              onClick={() => setShowSuccess(false)}
              className="mt-6 w-full rounded-lg bg-[#004098] dark:bg-[#3B82F6] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#003080] dark:hover:bg-[#2563EB]"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
