import prisma from "@/src/lib/prisma";
import { NextResponse } from "next/server";


export async function GET() {
  // Protección para que solo funcione en desarrollo
  if (process.env.NODE_ENV !== "development") {
    return new Response("Not Found", { status: 404 });
  }

  await prisma.todo.deleteMany();
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      id: "seed-user-1",
      name: "Usuario Demo",
      email: "demo@taskpop.com",
    },
  });

  await prisma.todo.createMany({
    data: [
      {
        description: "Revisar y responder correos pendientes",
        userId: user.id,
      },
      {
        description: "Hacer la compra semanal en el supermercado",
        userId: user.id,
      },
      { description: "Preparar la presentación del proyecto", userId: user.id },
      { description: "Hacer 30 minutos de ejercicio", userId: user.id },
      { description: "Pagar la factura de internet y luz", userId: user.id },
      { description: "Llamar al dentista para pedir cita", userId: user.id },
      {
        description: "Organizar el escritorio y archivar documentos",
        deleted: true,
        userId: user.id,
      },
      { description: "Renovar la suscripción del gimnasio", userId: user.id },
    ],
  });

  return NextResponse.json({ message: "Seed ejecutado correctamente" });
}
