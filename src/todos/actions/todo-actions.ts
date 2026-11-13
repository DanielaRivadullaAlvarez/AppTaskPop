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
    throw `Todo con id ${id} no encontrado`;
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

export const deleteCompleted = async () => {
  try {
    await prisma.todo.deleteMany({
      where: { complete: true },
    });
    revalidatePath("/dashboard", "layout");

    return { message: "Completadas borradas" };
  } catch (error) {
    return {
      message: "Error al borrar tareas",
    };
  }
};
