import { TodoList } from "@/src/todos";
import prisma from "@/src/lib/prisma";
import { auth } from "@/src/lib/auth";
import { Suspense } from "react";
import { connection } from "next/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Mis tareas",
  description: "Listado de tareas pendientes y completadas",
};

// Componente que consulta la base de datos
async function RestTodos() {
  await connection();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const todos = await prisma.todo.findMany({
    where: { deleted: false, userId: session.user.id }, // SOLO trae las del usuario conectado que NO están en la papelera
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
