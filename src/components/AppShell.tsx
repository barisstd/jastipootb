import type { ReactNode } from "react";
import { BrandHeader } from "@/components/BrandHeader";

interface AppShellProps {
  children: ReactNode;
  /** Bigger brand header, used on the home page. */
  largeHeader?: boolean;
}

export function AppShell({ children, largeHeader = false }: AppShellProps) {
  return (
    <div className="flex min-h-dvh flex-col bg-paper">
      <div className="sticky top-0 z-20 border-b border-line/70 bg-paper/90 backdrop-blur-sm">
        <div className={`mx-auto w-full max-w-md px-5 ${largeHeader ? "pb-4 pt-7" : "pb-3 pt-6"}`}>
          <BrandHeader large={largeHeader} />
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col px-5 pb-8 pt-5">
        {children}
      </div>
    </div>
  );
}
