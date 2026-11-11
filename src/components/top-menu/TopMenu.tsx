export const TopMenu = () => {
  return (
    <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b border-[#ebe5f8] bg-white/90 px-6 backdrop-blur-md md:px-10">
      <div>
        <p className="text-xs font-semibold text-[#9992ad]">
          TU ESPACIO PERSONAL
        </p>

        <h1 className="text-xl font-extrabold text-[#242038]">
          ¡Hola! ¿Qué toca hoy? ✨
        </h1>
      </div>

      <span className="hidden rounded-full bg-[#f0eaff] px-4 py-2 text-xs font-bold text-[#8058d3] sm:block">
        TaskPop 💜
      </span>
    </header>
  );
};
