import prisma from "@/src/lib/prisma";
import { Todo } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import * as yup from "yup";

interface Segments {
  // 1. Le decimos a TypeScript que params ahora es una "caja" (Promise)
  params: Promise<{ id: string }>;
}

// Función auxiliar para buscar el todo y evitar duplicar código
const getTodo = async (id: string): Promise<Todo | null> => {
  const todo = await prisma.todo.findFirst({ where: { id } });
  return todo;
};

// ==============================================================
// ESQUEMA DE VALIDACIÓN YUP (Para Actualizar)
// ==============================================================

const putSchema = yup.object({
  description: yup
    .string()
    .min(3, "La descripción debe tener al menos 3 letras.")
    .optional(),
  complete: yup
    .boolean()
    .typeError("El estado 'complete' debe ser true o false.")
    .optional(),
});

// ==============================================================
// MÉTODO GET: Buscar una tarea individual por ID
// ==============================================================
export async function GET(request: Request, { params }: Segments) {
  const { id } = await params;

  // Prisma ahora sí buscará estrictamente por el ID que viene en la URL
  const todo = await getTodo(id);

  // Si Prisma no encuentra la tarea, lanzamos el error 404
  if (!todo) {
    return NextResponse.json(
      { message: `La tarea con id ${id} no existe` },
      { status: 404 },
    );
  }
  // Si la encuentra, devolvemos la tarea
  return NextResponse.json(todo);
}

// ==============================================================
// MÉTODO PUT: Actualizar una tarea de forma 100% segura
// ==============================================================
export async function PUT(request: NextRequest, { params }: Segments) {
  try {
    const { id } = await params;

    // 1. Verificamos que la tarea exista antes de modificarla
    const todo = await getTodo(id);

    if (!todo) {
      return NextResponse.json(
        { message: `La tarea con id ${id} no existe` },
        { status: 404 },
      );
    }

    // 2. Validamos con Yup el cuerpo de la petición
    const body = await putSchema.validate(await request.json());

    // 3. Actualizamos en Prisma
    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: body,
    });

    // 4. Devolvemos la tarea modificada
    return NextResponse.json(updatedTodo);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
