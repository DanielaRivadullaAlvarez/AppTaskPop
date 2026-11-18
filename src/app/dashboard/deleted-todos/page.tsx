import prisma from "../../../lib/prisma";
import { Suspense } from "react";
import { connection } from "next/server";
import { DeletedTodoList } from "@/src/todos";

export const metadata = {
  title: "Tareas anuladas",
  description: "Papelera de tareas eliminadas en TaskPop",
};

async function DeletedTodos() {
  await connection();

  const todos = await prisma.todo.findMany({
    where: { deleted: true },
    orderBy: { updatedAt: "desc" },
  });

  if (todos.length === 0) {
    return (
      <div className="p-8 text-center text-gray-400 bg-white rounded-2xl border border-gray-100">
        No tienes tareas anuladas en este momento.
      </div>
    );
  }

  return <DeletedTodoList todos={todos} />;
}

export default function DeletedTodosPage() {
  return (
    <div className="w-full">
      <Suspense
        fallback={
          <p className="p-4 text-gray-500">Cargando tareas anuladas...</p>
        }
      >
        <DeletedTodos />
      </Suspense>
    </div>
  );
}
