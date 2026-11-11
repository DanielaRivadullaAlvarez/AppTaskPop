import { NextResponse, NextRequest } from "next/server"; // Importante: usar NextRequest
import prisma from "../../../lib/prisma";
import * as yup from "yup";

// ==============================================================
// MÉTODO GET: Listar todas las tareas (con paginación)
// ==============================================================
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const take = searchParams.get("take") ?? "10";
  const skip = searchParams.get("skip") ?? "0";

  const takeNumber = Number(take);
  const skipNumber = Number(skip);

  if (isNaN(takeNumber)) {
    return NextResponse.json(
      { message: "Take tiene que ser un número" },
      { status: 400 },
    );
  }

  if (isNaN(skipNumber)) {
    return NextResponse.json(
      { message: "Skip tiene que ser un número" },
      { status: 400 },
    );
  }

  const todos = await prisma.todo.findMany({
    take: takeNumber,
    skip: skipNumber,
  });

  return NextResponse.json(todos);
}

// ==============================================================
// ESQUEMA DE VALIDACIÓN YUP (PARA CREAR))
// ==============================================================
const postSchema = yup.object({
  description: yup
    .string()
    .required("La descripción es obligatoria.")
    .min(3, "La descripción debe tener al menos 3 letras."),
  complete: yup
    .boolean()
    .typeError("El estado 'complete' solo acepta true o false.")
    .optional()
    .default(false),
});

// ==============================================================
// MÉTODO POST: Crear una nueva tarea de forma 100% segura
// ==============================================================
export async function POST(request: NextRequest) {
  try {
    // 1. Yup revisa los datos. Si rompen las reglas, salta automáticamente al catch.
    const body = await postSchema.validate(await request.json());

    // 2. Extraemos estrictamente lo que permitimos.
    // Todo lo que sea extra o malicioso (como un ID inventado) se destruye aquí.
    const { description, complete } = body;

    // 3. Enviamos a Prisma el paquete de datos totalmente limpio.
    const todo = await prisma.todo.create({
      data: { description, complete },
    });

    // 4. Devolvemos la tarea recién creada con su ID y fechas reales de la BD.
    return NextResponse.json(todo);
  } catch (error: any) {
    // 5. Si ocurre un error, extraemos el mensaje de Yup y se lo mostramos al usuario.
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
// ==============================================================
// MÉTODO DELETE: Eliminar tarea
// ==============================================================
export async function DELETE(request: NextRequest) {
  try {
    await prisma.todo.deleteMany({
      where: { complete: true },
    });

    // 4. Devolvemos la tarea recién borrada con su ID y fechas reales de la BD.
    return NextResponse.json("Tarea borrada");
  } catch (error: any) {
    // 5. Si ocurre un error, extraemos el mensaje de Yup y se lo mostramos al usuario.
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
