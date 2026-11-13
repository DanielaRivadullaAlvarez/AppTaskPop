import { TodoList } from "@/src/todos";
import prisma from "../../../lib/prisma";
import { Suspense } from "react";

export const metadata = {
  title: "Listado de Todos",
  description: "SEO Title",
};

// Componente que consulta la base de datos
async function ServerTodos() {
  const todos = await prisma.todo.findMany({
    orderBy: { description: "asc" },
  });

  return <TodoList todos={todos} />;
}

// Página principal
export default function ServerTodosPage() {
  return (
    <Suspense fallback={<p>Cargando tareas...</p>}>
      <ServerTodos />
    </Suspense>
  );
}
