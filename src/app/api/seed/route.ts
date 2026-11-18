import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET() {
  // Protección para que solo funcione en desarrollo
  if (process.env.NODE_ENV !== "development") {
    return new Response("Not Found", { status: 404 });
  }
  await prisma.todo.deleteMany();

  await prisma.todo.createMany({
    data: [
      { description: "Revisar y responder correos pendientes", complete: true },
      { description: "Hacer la compra semanal en el supermercado" },
      { description: "Preparar la presentación del proyecto para mañana" },
      { description: "Hacer 30 minutos de ejercicio", complete: true },
      { description: "Pagar la factura de internet y luz" },
      { description: "Llamar al dentista para pedir cita" },
      {
        description: "Organizar el escritorio y archivos del ordenador",
        deleted: true,
      },
      { description: "Renovar la suscripción del gimnasio", deleted: true },
    ],
  });

  return NextResponse.json({
    message: "Seed Executed",
  });
}
