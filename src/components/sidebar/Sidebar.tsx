import Link from "next/link";
import { SidebarItem } from "./SidebarItem";
import { IoCalendarOutline } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { FaListUl } from "react-icons/fa";

const menuItem = [
  {
    icon: <IoCalendarOutline size={20} />,
    title: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: <MdDashboard size={20} />,
    title: "Rest TODOS",
    path: "/dashboard/rest-todos",
  },
  {
    icon: <FaListUl size={18} />,
    title: "Server Action",
    path: "/dashboard/server-todos",
  },
];

// 1. Agregamos las propiedades para controlar el estado en móvil
interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: Props) => {
  return (
    <>
      {/* 2. Fondo oscuro (Overlay) que solo aparece en móvil cuando el menú está abierto */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-[#242038]/20 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* 3. Reemplazamos "hidden" por "fixed" y agregamos la animación de deslizar (translate) */}
      <aside
        className={`fixed top-0 left-0 z-50 flex h-screen w-64 shrink-0 flex-col border-r border-[#ebe5f8] bg-white px-6 py-6 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo  */}
        <Link
          href="/dashboard"
          className="flex items-center gap-3"
          onClick={onClose}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[#c8f36d] shadow-sm">
            <div className="h-5 w-5 rounded-full border-[3px] border-[#283020]" />
          </div>

          <span className="text-[22px] font-black tracking-tight">
            Task<span className="text-[#a276e8]">Pop</span>
          </span>
        </Link>

        {/* Navegación */}
        <nav className="mt-12">
          <ul className="space-y-2">
            {menuItem.map((item) => (
              // Envolvemos SidebarItem en un div para que al hacer clic en móvil se cierre el menú automáticamente
              <div key={item.path} onClick={onClose}>
                <SidebarItem {...item} />
              </div>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};
