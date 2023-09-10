import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <div className="flex flex-grow justify-center w-full dark:bg-neutral-950">
        <div className="max-w-[920px] flex flex-grow flex-col px-4 py-12">
          {children}
        </div>
      </div>
    </div>
  );
}
