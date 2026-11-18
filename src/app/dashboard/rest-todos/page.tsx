import { TodoList } from "@/src/todos";
import prisma from "../../../lib/prisma";
import { Suspense } from "react";
import { connection } from "next/server";

export const metadata = {
  title: "Mis tareas",
  description: "Listado de tareas pendientes y completadas",
};

// Componente que consulta la base de datos
async function RestTodos() {
  await connection();

  const todos = await prisma.todo.findMany({
    where: { deleted: false }, // SOLO trae las que NO están en la papelera
    orderBy: { description: "asc" },
  });

  return <TodoList todos={todos} />;
}

// Página principal
export default function RestTodosPage() {
  return (
    <Suspense fallback={<p>Cargando tareas...</p>}>
      <RestTodos />
    </Suspense>
  );
}
