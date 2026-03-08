"use client";

import * as React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "./sheet";
import { cn } from "./utils";

const btnBase = "inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap border border-transparent transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#306DE0] focus-visible:ring-offset-2 dark:focus-visible:ring-[#9EBEF4] dark:focus-visible:ring-offset-[#0F172A] disabled:pointer-events-none disabled:opacity-50 select-none h-10 px-4 text-sm rounded-[4px]";

export function SheetBasicDemo() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={cn(btnBase, "bg-[#004098] text-white hover:bg-[#003070] dark:bg-[#1A5BC8] dark:hover:bg-[#306DE0]")}
      >
        Open Sheet
      </button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" onClose={() => setOpen(false)}>
          <SheetHeader>
            <SheetTitle>알림 설정</SheetTitle>
            <SheetDescription>
              알림 수신 방법을 설정하세요. 변경 사항은 즉시 적용됩니다.
            </SheetDescription>
          </SheetHeader>
          <div className="py-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#0F172A] dark:text-[#F8FAFC]">이메일 알림</p>
                <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">새로운 민원 접수 시 이메일로 알려드립니다.</p>
              </div>
              <div className="w-10 h-5 bg-[#004098] rounded-full relative cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#0F172A] dark:text-[#F8FAFC]">SMS 알림</p>
                <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">긴급 민원 발생 시 SMS로 알려드립니다.</p>
              </div>
              <div className="w-10 h-5 bg-[#CBD5E1] dark:bg-[#475569] rounded-full relative cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full absolute left-0.5 top-0.5" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#0F172A] dark:text-[#F8FAFC]">푸시 알림</p>
                <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">브라우저 푸시 알림을 받습니다.</p>
              </div>
              <div className="w-10 h-5 bg-[#004098] rounded-full relative cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5" />
              </div>
            </div>
          </div>
          <SheetFooter>
            <button
              onClick={() => setOpen(false)}
              className={cn(btnBase, "bg-[#F1F5F9] text-[#334155] border-[#E2E8F0] hover:bg-[#E2E8F0] dark:bg-[#1E293B] dark:text-[#E2E8F0] dark:border-[#334155] dark:hover:bg-[#334155]")}
            >
              취소
            </button>
            <button
              onClick={() => setOpen(false)}
              className={cn(btnBase, "bg-[#004098] text-white hover:bg-[#003070] dark:bg-[#1A5BC8] dark:hover:bg-[#306DE0]")}
            >
              저장
            </button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}

const sides = ["left", "right", "top", "bottom"] as const;

export function SheetSideDemo() {
  const [openSide, setOpenSide] = React.useState<string | null>(null);

  return (
    <div className="flex flex-wrap items-center gap-3">
      {sides.map((side) => (
        <button
          key={side}
          onClick={() => setOpenSide(side)}
          className={cn(btnBase, "bg-white text-[#004098] border-[#004098] hover:bg-[#E8F0FE] dark:bg-[#1E293B] dark:text-[#9EBEF4] dark:border-[#9EBEF4] dark:hover:bg-[#334155]")}
        >
          {side.charAt(0).toUpperCase() + side.slice(1)}
        </button>
      ))}
      {sides.map((side) => (
        <Sheet key={side} open={openSide === side} onOpenChange={(v) => !v && setOpenSide(null)}>
          <SheetContent side={side} onClose={() => setOpenSide(null)}>
            <SheetHeader>
              <SheetTitle>{side.charAt(0).toUpperCase() + side.slice(1)} Sheet</SheetTitle>
              <SheetDescription>
                화면 {side === "left" ? "왼쪽" : side === "right" ? "오른쪽" : side === "top" ? "위" : "아래"}에서 슬라이드되는 패널입니다.
              </SheetDescription>
            </SheetHeader>
            <div className="py-4">
              <p className="text-sm text-[#64748B] dark:text-[#94A3B8]">
                이 Sheet는 <span className="font-semibold text-[#0F172A] dark:text-[#F8FAFC]">{side}</span> 방향으로 열립니다.
              </p>
            </div>
            <SheetFooter>
              <button
                onClick={() => setOpenSide(null)}
                className={cn(btnBase, "bg-[#004098] text-white hover:bg-[#003070] dark:bg-[#1A5BC8] dark:hover:bg-[#306DE0]")}
              >
                닫기
              </button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
}
