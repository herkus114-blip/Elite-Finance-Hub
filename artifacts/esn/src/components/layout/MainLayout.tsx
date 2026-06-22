import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-screen bg-background overflow-hidden selection:bg-primary/30">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden relative z-0">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 overflow-x-hidden relative">
          <div className="mx-auto max-w-[1600px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
