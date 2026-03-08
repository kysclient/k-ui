"use client";

import * as React from "react";
import { ToastProvider, useToast } from "./toast";
import { cn } from "./utils";

const btnBase =
  "inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap border border-transparent transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#306DE0] focus-visible:ring-offset-2 dark:focus-visible:ring-[#9EBEF4] dark:focus-visible:ring-offset-[#0F172A] disabled:pointer-events-none disabled:opacity-50 select-none h-9 px-4 text-sm rounded-[4px]";

/* -------------------------------------------------------------------------- */
/*  ToastDemo – trigger each variant                                          */
/* -------------------------------------------------------------------------- */

function ToastDemoInner() {
  const { toast } = useToast();

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={() =>
          toast({
            title: "알림",
            description: "기본 알림 메시지입니다.",
          })
        }
        className={cn(
          btnBase,
          "bg-[#F1F5F9] text-[#334155] border-[#E2E8F0] hover:bg-[#E2E8F0] dark:bg-[#1E293B] dark:text-[#E2E8F0] dark:border-[#334155] dark:hover:bg-[#334155]",
        )}
      >
        Default
      </button>
      <button
        onClick={() =>
          toast({
            title: "성공",
            description: "작업이 성공적으로 완료되었습니다.",
            variant: "success",
          })
        }
        className={cn(btnBase, "bg-[#16A34A] text-white hover:bg-[#15803D]")}
      >
        Success
      </button>
      <button
        onClick={() =>
          toast({
            title: "오류",
            description: "요청 처리 중 문제가 발생했습니다.",
            variant: "error",
          })
        }
        className={cn(btnBase, "bg-[#DC2626] text-white hover:bg-[#B91C1C]")}
      >
        Error
      </button>
      <button
        onClick={() =>
          toast({
            title: "주의",
            description: "입력하신 정보를 다시 확인해주세요.",
            variant: "warning",
          })
        }
        className={cn(btnBase, "bg-[#D97706] text-white hover:bg-[#B45309]")}
      >
        Warning
      </button>
      <button
        onClick={() =>
          toast({
            title: "정보",
            description: "새로운 업데이트가 있습니다.",
            variant: "info",
          })
        }
        className={cn(
          btnBase,
          "bg-[#004098] text-white hover:bg-[#003070] dark:bg-[#1A5BC8] dark:hover:bg-[#306DE0]",
        )}
      >
        Info
      </button>
    </div>
  );
}

export function ToastDemo() {
  return (
    <ToastProvider>
      <ToastDemoInner />
    </ToastProvider>
  );
}

/* -------------------------------------------------------------------------- */
/*  ToastActionDemo – toast with action button                                */
/* -------------------------------------------------------------------------- */

function ToastActionDemoInner() {
  const { toast } = useToast();

  return (
    <button
      onClick={() =>
        toast({
          title: "파일이 삭제되었습니다.",
          description: "휴지통에서 30일 후 영구 삭제됩니다.",
          variant: "default",
          duration: 8000,
          action: {
            label: "되돌리기",
            onClick: () => {
              /* undo logic */
            },
          },
        })
      }
      className={cn(
        btnBase,
        "bg-[#004098] text-white hover:bg-[#003070] dark:bg-[#1A5BC8] dark:hover:bg-[#306DE0]",
      )}
    >
      Toast with Action
    </button>
  );
}

export function ToastActionDemo() {
  return (
    <ToastProvider>
      <ToastActionDemoInner />
    </ToastProvider>
  );
}
