"use server";

import prisma from "@/src/lib/prisma";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";
import * as yup from "yup";

const addTodoSchema = yup.object({
  description: yup
    .string()
    .trim()
    .min(3, "La descripción debe tener al menos 3 caracteres.")
    .required("La descripción es obligatoria."),
});

export const toggleTodo = async (
  id: string,
  complete: boolean,
): Promise<Todo> => {
  const todo = await prisma.todo.findFirst({ where: { id } });

  if (!todo) {
    throw new Error(`Todo con id ${id} no encontrado`);
  }

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { complete },
  });
  revalidatePath("/dashboard", "layout");

  return updatedTodo;
};

export const addTodo = async (description: string) => {
  const { description: validDescription } = await addTodoSchema.validate({
    description,
  });

  const todo = await prisma.todo.create({
    data: { description: validDescription },
  });

  revalidatePath("/dashboard", "layout");

  return todo;
};

// Mueve las completadas a "Tareas anuladas" y no las borra de la BD
export const deleteCompleted = async () => {
  try {
    await prisma.todo.updateMany({
      where: {
        complete: true,
        deleted: false,
      },
      data: {
        deleted: true,
      },
    });
    revalidatePath("/dashboard", "layout");

    return { message: "Completadas movidas a tareas anuladas" };
  } catch {
    return {
      message: "Error al anular tareas",
    };
  }
};

// Recupera las tareas tildadas y las devuelve como pendientes a "Mis tareas"
export const restoreTodos = async (ids: string[]) => {
  try {
    await prisma.todo.updateMany({
      where: { id: { in: ids }, deleted: true },
      data: {
        deleted: false,
        complete: false, // Vuelven como tareas pendientes
      },
    });
    revalidatePath("/dashboard", "layout");

    return { message: "Tareas recuperadas" };
  } catch {
    return {
      message: "Error al recuperar tareas",
    };
  }
};

// Elimina definitivamente de PostgreSQL solo las tareas tildadas en la papelera
export const hardDeleteTodos = async (ids: string[]) => {
  try {
    await prisma.todo.deleteMany({
      where: { id: { in: ids }, deleted: true },
    });
    revalidatePath("/dashboard", "layout");

    return { message: "Tareas eliminadas definitivamente" };
  } catch {
    return {
      message: "Error al eliminar definitivamente",
    };
  }
};
