"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./dialog";
import { cn } from "./utils";

// Reusable button styles (inline to avoid import issues in MDX)
const btnBase = "inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap border border-transparent transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#306DE0] focus-visible:ring-offset-2 dark:focus-visible:ring-[#9EBEF4] dark:focus-visible:ring-offset-[#0F172A] disabled:pointer-events-none disabled:opacity-50 select-none h-10 px-4 text-sm rounded-[4px]";

export function DialogDemo() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={cn(btnBase, "bg-[#004098] text-white hover:bg-[#003070] dark:bg-[#1A5BC8] dark:hover:bg-[#306DE0]")}
      >
        Open Dialog
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent onClose={() => setOpen(false)}>
          <DialogHeader>
            <DialogTitle>민원 삭제 확인</DialogTitle>
            <DialogDescription>
              이 민원을 삭제하시겠습니까? 삭제된 민원은 복구할 수 없습니다.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-[#64748B] dark:text-[#94A3B8]">
              민원번호: <span className="font-medium text-[#0F172A] dark:text-[#F8FAFC]">2024-00125</span>
            </p>
            <p className="text-sm text-[#64748B] dark:text-[#94A3B8]">
              민원유형: <span className="font-medium text-[#0F172A] dark:text-[#F8FAFC]">건축 허가 신청</span>
            </p>
          </div>
          <DialogFooter>
            <button
              onClick={() => setOpen(false)}
              className={cn(btnBase, "bg-[#F1F5F9] text-[#334155] border-[#E2E8F0] hover:bg-[#E2E8F0] dark:bg-[#1E293B] dark:text-[#E2E8F0] dark:border-[#334155] dark:hover:bg-[#334155]")}
            >
              취소
            </button>
            <button
              onClick={() => setOpen(false)}
              className={cn(btnBase, "bg-[#D32F2F] text-white hover:bg-[#C62828]")}
            >
              삭제
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function DialogFormDemo() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={cn(btnBase, "bg-white text-[#004098] border-[#004098] hover:bg-[#E8F0FE] dark:bg-[#1E293B] dark:text-[#9EBEF4] dark:border-[#9EBEF4] dark:hover:bg-[#334155]")}
      >
        Open Form Dialog
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent onClose={() => setOpen(false)}>
          <DialogHeader>
            <DialogTitle>민원 접수</DialogTitle>
            <DialogDescription>
              아래 양식을 작성하여 민원을 접수해주세요.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#334155] dark:text-[#E2E8F0]">
                민원인 성명 <span className="text-[#D32F2F]">*</span>
              </label>
              <input
                type="text"
                placeholder="홍길동"
                className="h-10 px-3 text-sm border border-[#CBD5E1] dark:border-[#475569] rounded-[4px] bg-white dark:bg-[#1E293B] text-[#0F172A] dark:text-[#F8FAFC] placeholder:text-[#94A3B8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#306DE0]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#334155] dark:text-[#E2E8F0]">
                민원 내용 <span className="text-[#D32F2F]">*</span>
              </label>
              <textarea
                placeholder="민원 내용을 상세히 입력해주세요."
                rows={3}
                className="px-3 py-2 text-sm border border-[#CBD5E1] dark:border-[#475569] rounded-[4px] bg-white dark:bg-[#1E293B] text-[#0F172A] dark:text-[#F8FAFC] placeholder:text-[#94A3B8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#306DE0]"
              />
            </div>
          </div>
          <DialogFooter>
            <button
              onClick={() => setOpen(false)}
              className={cn(btnBase, "text-[#334155] hover:bg-[#F1F5F9] dark:text-[#E2E8F0] dark:hover:bg-[#1E293B]")}
            >
              취소
            </button>
            <button
              onClick={() => setOpen(false)}
              className={cn(btnBase, "bg-[#004098] text-white hover:bg-[#003070] dark:bg-[#1A5BC8] dark:hover:bg-[#306DE0]")}
            >
              접수하기
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function AlertDialogDemo() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={cn(btnBase, "bg-[#D32F2F] text-white hover:bg-[#C62828]")}
      >
        Delete Account
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent onClose={() => setOpen(false)}>
          <DialogHeader>
            <DialogTitle>정말 탈퇴하시겠습니까?</DialogTitle>
            <DialogDescription>
              회원 탈퇴 시 모든 데이터가 영구적으로 삭제됩니다. 이 작업은 되돌릴 수 없습니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button
              onClick={() => setOpen(false)}
              className={cn(btnBase, "bg-[#F1F5F9] text-[#334155] border-[#E2E8F0] hover:bg-[#E2E8F0] dark:bg-[#1E293B] dark:text-[#E2E8F0] dark:border-[#334155] dark:hover:bg-[#334155]")}
            >
              취소
            </button>
            <button
              onClick={() => setOpen(false)}
              className={cn(btnBase, "bg-[#D32F2F] text-white hover:bg-[#C62828]")}
            >
              탈퇴하기
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
