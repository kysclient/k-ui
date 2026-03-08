"use client";

import * as React from "react";
import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from "./popover";
import { cn } from "./utils";

const btnBase =
  "inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap border border-transparent transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#306DE0] focus-visible:ring-offset-2 dark:focus-visible:ring-[#9EBEF4] dark:focus-visible:ring-offset-[#0F172A] disabled:pointer-events-none disabled:opacity-50 select-none h-10 px-4 text-sm rounded-[4px]";

export function PopoverBasicDemo() {
  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          btnBase,
          "bg-[#004098] text-white hover:bg-[#003070] dark:bg-[#1A5BC8] dark:hover:bg-[#306DE0]",
        )}
      >
        Open Popover
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h4 className="font-medium text-sm leading-none">Dimensions</h4>
          <p className="text-sm text-[#64748B] dark:text-[#94A3B8]">
            Set the dimensions for the layer.
          </p>
          <div className="grid gap-2 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#334155] dark:text-[#E2E8F0]">Width</span>
              <span className="text-sm font-medium">100%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#334155] dark:text-[#E2E8F0]">Max Width</span>
              <span className="text-sm font-medium">300px</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#334155] dark:text-[#E2E8F0]">Height</span>
              <span className="text-sm font-medium">25px</span>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function PopoverFormDemo() {
  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          btnBase,
          "bg-white text-[#004098] border-[#004098] hover:bg-[#E8F0FE] dark:bg-[#1E293B] dark:text-[#9EBEF4] dark:border-[#9EBEF4] dark:hover:bg-[#334155]",
        )}
      >
        Update Email
      </PopoverTrigger>
      <PopoverContent align="start">
        <div className="space-y-3">
          <h4 className="font-medium text-sm leading-none">Email Address</h4>
          <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">
            Enter your new email address below.
          </p>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="popover-email"
              className="text-sm font-medium text-[#334155] dark:text-[#E2E8F0]"
            >
              Email
            </label>
            <input
              id="popover-email"
              type="email"
              placeholder="user@example.com"
              className="h-9 px-3 text-sm border border-[#CBD5E1] dark:border-[#475569] rounded-[4px] bg-white dark:bg-[#1E293B] text-[#0F172A] dark:text-[#F8FAFC] placeholder:text-[#94A3B8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#306DE0]"
            />
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <PopoverClose
              className={cn(
                btnBase,
                "h-8 px-3 text-xs text-[#334155] hover:bg-[#F1F5F9] dark:text-[#E2E8F0] dark:hover:bg-[#1E293B]",
              )}
            >
              Cancel
            </PopoverClose>
            <PopoverClose
              className={cn(
                btnBase,
                "h-8 px-3 text-xs bg-[#004098] text-white hover:bg-[#003070] dark:bg-[#1A5BC8] dark:hover:bg-[#306DE0]",
              )}
            >
              Save
            </PopoverClose>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
