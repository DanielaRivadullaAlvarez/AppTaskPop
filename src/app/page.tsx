import Link from "next/link";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { FiArrowRight } from "react-icons/fi";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#f7f4ff] p-6 text-center">
      {/* Círculos decorativos de fondo (Efecto glow pastel) */}
      <div className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-purple-300 opacity-20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-20 h-72 w-72 rounded-full bg-[#c8f36d] opacity-20 blur-3xl" />

      {/* Contenedor Principal */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo gigante */}
        <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-4xl bg-[#c8f36d] shadow-xl shadow-[#c8f36d]/20 transition-transform hover:scale-105 md:h-32 md:w-32">
          <IoCheckmarkCircleOutline className="text-5xl text-[#33421c] md:text-7xl" />
        </div>

        {/* Título de la App */}
        <h1 className="mb-4 text-6xl font-black tracking-tight text-[#242038] md:text-8xl">
          Task<span className="text-[#a276e8]">Pop</span>
        </h1>

        {/* Subtítulo inspirador */}
        <p className="mb-12 max-w-md text-lg font-medium text-[#aaa2bd] md:text-xl">
          Tu espacio personal para darle orden a tus ideas, cumplir tus metas y
          mantener todo bajo control ✨
        </p>

        {/* Botón de Entrada (CTA) */}
        <Link
          href="/dashboard"
          className="group flex items-center gap-3 rounded-full bg-linear-to-r from-purple-600 to-purple-400 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-purple-500/30 transition-all hover:scale-105 hover:shadow-purple-500/50"
        >
          Entrar a mis tareas
          <FiArrowRight
            className="transition-transform group-hover:translate-x-1"
            size={24}
          />
        </Link>
      </div>
    </main>
  );
}
