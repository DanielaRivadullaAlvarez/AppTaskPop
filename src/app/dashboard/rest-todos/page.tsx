import { TodoList } from "@/src/todos";
import prisma from "../../../lib/prisma";
import { Suspense } from "react";

export const metadata = {
  title: "Listado de Todos",
  description: "SEO Title",
};

// Componente que consulta la base de datos
async function RestTodos() {
  const todos = await prisma.todo.findMany({
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
