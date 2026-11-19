import Link from "next/link";
import { SidebarItem } from "./SidebarItem";
import { LogoutButton } from "./LogoutButton";
import { IoCalendarOutline, IoHomeOutline } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";

const menuItem = [
  {
    icon: <IoHomeOutline size={20} />,
    title: "Home",
    path: "/dashboard",
  },
  {
    icon: <IoCalendarOutline size={20} />,
    title: "Mis tareas",
    path: "/dashboard/rest-todos",
  },
  {
    icon: <MdDashboard size={18} />,
    title: "Tareas anuladas",
    path: "/dashboard/deleted-todos",
  },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user?: {
    name: string;
    email: string;
  };
}

export const Sidebar = ({ isOpen, onClose, user }: Props) => {
  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-[#242038]/20 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 flex h-screen w-64 shrink-0 flex-col justify-between border-r border-[#ebe5f8] bg-white px-6 py-6 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Logo */}
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
                <div key={item.path} onClick={onClose}>
                  <SidebarItem {...item} />
                </div>
              ))}
            </ul>
          </nav>
        </div>

        {/* Usuario (viene del servidor) y botón de Cerrar sesión */}
        <div className="border-t border-[#ebe5f8] pt-4">
          {user && (
            <div className="mb-3 px-3">
              <p className="truncate text-sm font-bold text-[#242038]">
                {user.name}
              </p>
              <p className="truncate text-xs text-[#aaa2bd]">{user.email}</p>
            </div>
          )}

          <LogoutButton onLogoutSuccess={onClose} />
        </div>
      </aside>
    </>
  );
};
