"use client";

import { useState } from "react";
import { Sidebar, TopMenu } from "@/src/components";
import { FiMenu } from "react-icons/fi";

interface Props {
  children: React.ReactNode;
}

export const DashboardWrapper = ({ children }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#f7f4ff] text-[#242038]">
      {/* Sidebar controlado por el estado */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="min-w-0 flex-1">
        {/* Header móvil con el botón hamburguesa (Oculto en PC) */}
        <header className="flex h-16 items-center gap-4 bg-white px-6 shadow-sm lg:hidden">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f0eaff] text-[#8058d3] transition hover:bg-[#e4d9ff]"
          >
            <FiMenu size={24} />
          </button>
          <span className="text-lg font-black text-[#242038]">
            Task<span className="text-[#a276e8]">Pop</span>
          </span>
        </header>

        {/* TopMenu original (Oculto en móvil para no duplicar encabezados) */}
        <div className="hidden lg:block">
          <TopMenu />
        </div>

        <main className="mx-auto w-full max-w-7xl p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
};
