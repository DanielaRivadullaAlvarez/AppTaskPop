
import { Todo } from "@prisma/client";

export const updateTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  const body = { complete };

  const res = await fetch(`/api/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Error al actualizar la tarea");
  }

  return res.json();
};

export const createTodo = async (
  description: string
): Promise<Todo> => {
  const body = { description };

  const res = await fetch("/api/todos", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Error al crear la tarea");
  }

  return res.json();
};

export const deleteCompletedTodos = async (): Promise<boolean> => {
  const res = await fetch("/api/todos", {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Error al eliminar las tareas completadas");
  }

  return true;
};
