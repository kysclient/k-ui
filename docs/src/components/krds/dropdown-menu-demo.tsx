"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuShortcut,
} from "./dropdown-menu";
import { cn } from "./utils";

const btnBase =
  "inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap border border-transparent transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#306DE0] focus-visible:ring-offset-2 dark:focus-visible:ring-[#9EBEF4] dark:focus-visible:ring-offset-[#0F172A] disabled:pointer-events-none disabled:opacity-50 select-none h-10 px-4 text-sm rounded-[4px]";

export function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          btnBase,
          "bg-white text-[#004098] border-[#004098] hover:bg-[#E8F0FE] dark:bg-[#1E293B] dark:text-[#9EBEF4] dark:border-[#9EBEF4] dark:hover:bg-[#334155]",
        )}
      >
        Open Menu
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem>
          Edit
          <DropdownMenuShortcut>Ctrl+E</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Copy
          <DropdownMenuShortcut>Ctrl+C</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Delete
          <DropdownMenuShortcut>Del</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function DropdownMenuCheckboxDemo() {
  const [showStatus, setShowStatus] = React.useState(true);
  const [showActivity, setShowActivity] = React.useState(false);
  const [showPanel, setShowPanel] = React.useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          btnBase,
          "bg-white text-[#004098] border-[#004098] hover:bg-[#E8F0FE] dark:bg-[#1E293B] dark:text-[#9EBEF4] dark:border-[#9EBEF4] dark:hover:bg-[#334155]",
        )}
      >
        View Options
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuCheckboxItem
          checked={showStatus}
          onCheckedChange={setShowStatus}
        >
          Status Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showActivity}
          onCheckedChange={setShowActivity}
        >
          Activity Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showPanel}
          onCheckedChange={setShowPanel}
        >
          Panel
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
