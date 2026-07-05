import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-ink">
      <Navbar />

      {/* Main */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {title && (
          <div className="mb-6">
            <h1 className="text-xl font-semibold tracking-tight text-ink font-display">{title}</h1>
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
