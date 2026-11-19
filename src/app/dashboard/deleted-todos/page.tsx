import prisma from "@/src/lib/prisma";
import { auth } from "@/src/lib/auth";
import { Suspense } from "react";
import { connection } from "next/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { DeletedTodoList } from "@/src/todos";

export const metadata = {
  title: "Tareas anuladas",
  description: "Papelera de tareas eliminadas en TaskPop",
};

async function DeletedTodos() {
  await connection();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const todos = await prisma.todo.findMany({
    where: { deleted: true, userId: session.user.id },
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
