"use client";

import { useRouter } from "next/navigation";
import { IoLogOutOutline } from "react-icons/io5";
import { signOut } from "@/src/lib/auth-client";

interface Props {
  onLogoutSuccess?: () => void;
}

export const LogoutButton = ({ onLogoutSuccess }: Props) => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          onLogoutSuccess?.();
          router.push("/login");
          router.refresh();
        },
      },
    });
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-[#6e6782] transition-colors hover:bg-red-50 hover:text-red-600"
    >
      <IoLogOutOutline size={20} />
      <span>Cerrar sesión</span>
    </button>
  );
};
