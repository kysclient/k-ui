"use client";

import * as React from "react";

export function ComponentPreview({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`not-prose flex min-h-[150px] w-full items-center justify-center rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white p-6 dark:bg-[#0F172A] ${className ?? ""}`}>
      {children}
    </div>
  );
}
