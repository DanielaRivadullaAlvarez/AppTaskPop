"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  icon: React.ReactNode;
  path: string;
  title: string;
}

export const SidebarItem = ({ path, icon, title }: Props) => {
  const pathname = usePathname();
  const isActive = path === pathname;

  return (
    <li>
      <Link
        href={path}
        className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
          isActive
            ? "bg-linear-to-r from-purple-600 to-purple-400 text-white" // ACTIVO
            : "bg-transparent text-[#8d879f] hover:bg-[#f0eaff] hover:text-[#8058d3]" //  INACTIVO
        }`}
      >
        {icon}
        {title}
      </Link>
    </li>
  );
};
