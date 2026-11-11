import { Suspense } from "react";
import { WidgetItem } from "@/src/components"; // Ajusta tus importaciones según tu proyecto
import { NewTodo, TodoList } from "@/src/todos";
import prisma from "@/src/lib/prisma";
import { FiClipboard, FiCheckCircle } from "react-icons/fi";

// 1. COMPONENTE ASÍNCRONO: Se encarga de llamar a Prisma y preparar la vista
async function DashboardContent() {
  // Traemos las tareas con el doble ordenamiento para que no salten
  const todos = await prisma.todo.findMany({
    orderBy: [{ description: "asc" }, { id: "asc" }],
  });

  const completedTodos = todos.filter((todo) => todo.complete).length;

  const widgetsData = [
    {
      title: "Total tareas",
      value: todos.length.toString(),
      subtitle: "Tareas creadas",
      icon: <FiClipboard size={22} />,
      iconBgColor: "bg-[#f0eaff]",
      iconTextColor: "text-[#8968cf]",
    },
    {
      title: "Completadas",
      value: completedTodos.toString(),
      subtitle: "Tareas finalizadas",
      icon: <FiCheckCircle size={22} />,
      iconBgColor: "bg-[#e6f8d2]",
      iconTextColor: "text-[#62a340]",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Resumen de tareas */}
      <section className="grid gap-5 sm:grid-cols-2">
        {widgetsData.map((widget) => (
          <WidgetItem key={widget.title} {...widget} />
        ))}
      </section>

      {/* Crear tarea */}
      <NewTodo />

      {/* Listado de tareas */}
      <TodoList todos={todos} />
    </div>
  );
}

// 2. PÁGINA PRINCIPAL: Componente normal (NO async) que usa el Suspense
export default function DashboardPage() {
  return (
    // Mientras la base de datos responde, muestra este mensaje bonito estilo TaskPop
    <Suspense
      fallback={
        <div className="flex h-40 items-center justify-center text-sm font-bold text-[#8058d3]">
          Cargando tu espacio... ✨
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
